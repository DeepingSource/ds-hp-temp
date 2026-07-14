// export-copy — one-command copy review surface.
//
// Pulls ALL user-facing copy into a small set of reviewable Markdown files under
// copy-review/ (gitignored, regenerate on demand). Two sources:
//   1) src/data/generated/site-content.json — the Keystatic-managed singletons (exact).
//   2) Source files that hold inline `Record<Locale>` copy dicts (brand SOT, data i18n
//      overlays, View/component dicts) + page.tsx SEO metadata — extracted by a tolerant
//      line scan for ko/en/jp string triples (no TS import; robust to JSX).
//
// This is a REVIEW surface (read + spot inconsistencies). Edits still happen at the
// source (Keystatic for singletons, the listed files for code copy). Run: npm run copy:review
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'copy-review');
const LOCALES = ['ko', 'en', 'jp'];

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));
const esc = (s) => String(s).replace(/\|/g, '\\|').replace(/\n+/g, ' ⏎ ').trim();

// ── recursive walk of a directory for files matching a predicate ──
function walk(dir, test, acc = []) {
  for (const name of fs.readdirSync(path.join(ROOT, dir))) {
    const rel = path.join(dir, name);
    const stat = fs.statSync(path.join(ROOT, rel));
    if (stat.isDirectory()) walk(rel, test, acc);
    else if (test(rel)) acc.push(rel);
  }
  return acc;
}

// ── 1. CMS singletons from generated JSON (locale-major per singleton) ──
function flattenLeaves(node, prefix, out) {
  if (node == null) return;
  if (typeof node === 'string' || typeof node === 'number') {
    out[prefix] = String(node);
  } else if (Array.isArray(node)) {
    node.forEach((v, i) => flattenLeaves(v, `${prefix}[${i}]`, out));
  } else if (typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) flattenLeaves(v, prefix ? `${prefix}.${k}` : k, out);
  }
}

function cmsSingletons() {
  const rel = 'src/data/generated/site-content.json';
  if (!exists(rel)) return `> \`${rel}\` not found — run \`npm run gen:content\` first.\n`;
  const data = JSON.parse(read(rel));
  let md = '';
  let rows = 0;
  for (const [key, byLocale] of Object.entries(data)) {
    if (!byLocale || typeof byLocale !== 'object') continue;
    const leaves = {};
    for (const loc of LOCALES) flattenLeaves(byLocale[loc], '', (leaves[loc] = {}));
    const paths = [...new Set(LOCALES.flatMap((l) => Object.keys(leaves[l] || {})))].sort();
    if (!paths.length) continue;
    md += `\n### ${key}\n\n| path | ko | en | jp |\n|---|---|---|---|\n`;
    for (const p of paths) {
      md += `| \`${p}\` | ${esc(leaves.ko[p] ?? '')} | ${esc(leaves.en[p] ?? '')} | ${esc(leaves.jp[p] ?? '')} |\n`;
      rows++;
    }
  }
  return { md, rows };
}

// ── 2. Locale triples from source files (tolerant brace-aware scan) ──
// Handles the three real shapes: own-line triples (`ko: '..'` on separate lines),
// inline triples (`your: { ko: '..', en: '..', jp: '..' }`), and locale-major nested
// blocks (`entity: { en: { title: '..' }, jp: { title: '..' } }`). Best-effort — labels
// come from the nearest object key; multi-line/template strings may be partial.
const LOC_STR_G = /\b(ko|en|jp)\s*:\s*(['"`])((?:\\.|(?!\2).)*)\2/g;
const LOC_OPEN = /\b(ko|en|jp)\s*:\s*\{/;
const KEY_ANY = /(?:^|[{,]|\bexport const\s+)\s*['"]?([A-Za-z_$][\w$-]*)['"]?\s*:/;
const LEAF_STR = /\b([A-Za-z_$][\w$]*)\s*:\s*(['"`])((?:\\.|(?!\2).)*)\2/g;

function extractTriples(rel) {
  const lines = read(rel).split('\n');
  const map = new Map(); // label -> {ko,en,jp}
  const put = (label, loc, val) => {
    if (!val) return;
    if (!map.has(label)) map.set(label, { ko: '', en: '', jp: '', label });
    if (!map.get(label)[loc]) map.get(label)[loc] = val;
  };
  let entity = ''; // nearest non-locale object key (context for triples)
  let localeBlock = ''; // set while inside `ko|en|jp: { ... }`
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (localeBlock) {
      // inside a locale-major block: capture nested `leaf: 'string'` leaves
      for (const m of line.matchAll(LEAF_STR)) {
        if (['ko', 'en', 'jp'].includes(m[1])) continue;
        put(`${entity}.${m[1]}`, localeBlock, m[3]);
      }
      if (line.includes('}')) localeBlock = '';
      continue;
    }
    const openLoc = LOC_OPEN.exec(line);
    if (openLoc && !/\}/.test(line.slice(openLoc.index))) {
      localeBlock = openLoc[1]; // entered a locale-major block that spans lines
      continue;
    }
    // inline / own-line locale strings → attach to current entity (or the line's own key)
    const locs = [...line.matchAll(LOC_STR_G)];
    if (locs.length) {
      const km = KEY_ANY.exec(line);
      const label = km && !['ko', 'en', 'jp'].includes(km[1]) ? km[1] : entity || `L${i + 1}`;
      for (const m of locs) put(label, m[1], m[3]);
      continue;
    }
    // track entity context from `key: {` openers
    const km = KEY_ANY.exec(line);
    if (km && !['ko', 'en', 'jp'].includes(km[1]) && /\{\s*$/.test(line)) entity = km[1];
  }
  return [...map.values()].filter((t) => t.ko || t.en || t.jp);
}

function sourceCopy(files, title) {
  let md = '';
  let rows = 0;
  for (const rel of files) {
    if (!exists(rel)) continue;
    const triples = extractTriples(rel);
    if (!triples.length) continue;
    md += `\n### \`${rel}\`\n\n| key | ko | en | jp |\n|---|---|---|---|\n`;
    for (const t of triples) {
      md += `| ${esc(t.label)} | ${esc(t.ko)} | ${esc(t.en)} | ${esc(t.jp)} |\n`;
      rows++;
    }
  }
  return { md: md || `\n> No locale triples found for ${title}.\n`, rows };
}

// ── 3. page.tsx metadata (title/description) ──
function metadata() {
  const files = walk('src/app', (r) => r.endsWith('page.tsx'));
  let md = `\n| route file | title | description |\n|---|---|---|\n`;
  let rows = 0;
  for (const rel of files.sort()) {
    const src = read(rel);
    // main metadata block only (first title:/description: — skip openGraph dupes best-effort)
    const t = /(?:^|\n)\s*title:\s*(['"`])((?:\\.|(?!\1).)*)\1/.exec(src);
    const d = /(?:^|\n)\s*description:\s*\n?\s*(['"`])((?:\\.|(?!\1).)*)\1/.exec(src);
    if (!t && !d) continue;
    md += `| \`${rel.replace('src/app/', '')}\` | ${esc(t?.[2] ?? '')} | ${esc(d?.[2] ?? '')} |\n`;
    rows++;
  }
  return { md, rows };
}

// ── write outputs ──
fs.mkdirSync(OUT, { recursive: true });
const stamp = process.argv[2] || 'generated by npm run copy:review';

const cms = cmsSingletons();
const brand = sourceCopy(['src/lib/brand-canon.ts'], 'brand SOT');
const dataI18n = sourceCopy(
  walk('src/data', (r) => /-i18n\.(ts|tsx)$/.test(r)).concat(['src/data/models.ts', 'src/data/leadership.ts'].filter(exists)),
  'data i18n overlays',
);
const viewDicts = sourceCopy(
  walk('src/components', (r) => r.endsWith('.tsx')),
  'View/component dicts',
);
const meta = metadata();

fs.writeFileSync(
  path.join(OUT, '00-cms-singletons.md'),
  `# Copy review — CMS singletons (Keystatic-managed)\n\n> ${stamp}. Source: \`content/site/*.yaml\` → \`site-content.json\`. **Edit at /keystatic** (or the yaml). ${cms.rows} rows.\n${cms.md}`,
);
fs.writeFileSync(
  path.join(OUT, '01-brand-canon.md'),
  `# Copy review — brand SOT (\`src/lib/brand-canon.ts\`)\n\n> ${stamp}. **Edit in code** (brand SOT — sign-off gated). ${brand.rows} rows.\n${brand.md}`,
);
fs.writeFileSync(
  path.join(OUT, '02-data-i18n.md'),
  `# Copy review — data i18n overlays (\`src/data/*-i18n.*\`, models, leadership)\n\n> ${stamp}. **Edit in code.** ${dataI18n.rows} rows.\n${dataI18n.md}`,
);
fs.writeFileSync(
  path.join(OUT, '03-component-dicts.md'),
  `# Copy review — View/component inline dicts (\`src/components/**\`)\n\n> ${stamp}. **Edit in code.** Best-effort ko/en/jp extraction. ${viewDicts.rows} rows.\n${viewDicts.md}`,
);
fs.writeFileSync(
  path.join(OUT, '04-page-metadata.md'),
  `# Copy review — page SEO metadata (\`src/app/**/page.tsx\`)\n\n> ${stamp}. **Edit in code.** title + description per route. ${meta.rows} rows.\n${meta.md}`,
);

const total = cms.rows + brand.rows + dataI18n.rows + viewDicts.rows + meta.rows;
fs.writeFileSync(
  path.join(OUT, 'README.md'),
  `# Copy review surface\n\n> ${stamp}. Regenerate: \`npm run copy:review\`. This folder is gitignored (a snapshot, not source).\n\n` +
    `All user-facing copy in one place for fast review across ko/en/jp. **Editing** still happens at the source noted in each file.\n\n` +
    `| file | what | edit where | rows |\n|---|---|---|---|\n` +
    `| [00-cms-singletons.md](./00-cms-singletons.md) | 14 page singletons | **/keystatic** or content/site/*.yaml | ${cms.rows} |\n` +
    `| [01-brand-canon.md](./01-brand-canon.md) | brand SOT constants | src/lib/brand-canon.ts (sign-off) | ${brand.rows} |\n` +
    `| [02-data-i18n.md](./02-data-i18n.md) | solutions/faq/glossary/storeagent overlays | src/data/*-i18n.* | ${dataI18n.rows} |\n` +
    `| [03-component-dicts.md](./03-component-dicts.md) | View/component inline dicts | the listed .tsx | ${viewDicts.rows} |\n` +
    `| [04-page-metadata.md](./04-page-metadata.md) | SEO title/description | src/app/**/page.tsx | ${meta.rows} |\n` +
    `\n**Total ≈ ${total} localized rows.** CMS singletons + blog are editor-self-serve; the rest is code-edited (the migration backlog — see docs/STATUS.md §3).\n\n` +
    `> Extraction note: 00 is exact (JSON); 01–04 are a tolerant line scan for \`ko:/en:/jp:\` string triples, so multi-line/template/JSX-embedded copy may be partial. Use it to spot gaps and missing translations, then edit at source.\n`,
);

console.log(`copy-review/ written — ${total} rows across 5 files (cms ${cms.rows}, brand ${brand.rows}, data ${dataI18n.rows}, components ${viewDicts.rows}, metadata ${meta.rows}).`);
