#!/usr/bin/env node
/**
 * Design-token drift guard. Run: `npm run lint:tokens`.
 * - HARD FAIL: the deprecated blue (#1E88E5 / rgb(30,136,229)) appearing anywhere.
 * - HARD FAIL: brand-primary drift — the hand-mirrored primary hexes in
 *   globals.css `:root` must equal BRAND.* in src/lib/tokens.ts.
 * - WARN: hardcoded brand blue (#376AE2 / rgb(55,106,226)) or arbitrary color
 *   literals (bg/text/border/from/via/to/ring/stroke/fill-[#…]) outside the
 *   token Sources of Truth — these should use a token/utility instead.
 * Exempt (legitimately hold literals): the SoT files + the /demo mockup palette.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const SRC = 'src';
const EXEMPT = [
  /^src\/lib\/tokens\.ts$/,
  /^src\/lib\/mockup-tokens\.ts$/,
  /^src\/app\/globals\.css$/,
  /^src\/app\/icon\.svg$/,
  /^src\/components\/mockups\//, // SVG/canvas mockups use mockup-tokens.ts
];
const OLD_BLUE = /#1E88E5\b|rgba?\(\s*30\s*,\s*136\s*,\s*229/i;
const HARDCODED_PRIMARY = /#376AE2\b|rgb\(\s*55\s*,\s*106\s*,\s*226/i;
const ARB_COLOR = /\b(?:bg|text|border|from|via|to|ring|stroke|fill|shadow)-\[#[0-9a-fA-F]{3,8}/;

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|css|svg)$/.test(e)) out.push(p);
  }
  return out;
}

let failures = 0;
let warnings = 0;
for (const file of walk(SRC)) {
  const rel = relative('.', file);
  if (EXEMPT.some((re) => re.test(rel))) continue;
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (OLD_BLUE.test(line)) {
      console.error(`✗ OLD BLUE  ${rel}:${i + 1}  ${line.trim().slice(0, 100)}`);
      failures++;
    } else if (HARDCODED_PRIMARY.test(line) || ARB_COLOR.test(line)) {
      console.warn(`⚠ hardcoded color  ${rel}:${i + 1}  ${line.trim().slice(0, 100)}`);
      warnings++;
    }
  });
}

// --- brand-primary sync guard: globals.css :root  ==  tokens.ts BRAND.* ---
function grab(content, re) {
  const m = content.match(re);
  return m ? m[1].toLowerCase() : null;
}
const cssSrc = readFileSync('src/app/globals.css', 'utf8');
const tokensSrc = readFileSync('src/lib/tokens.ts', 'utf8');
const SYNC_PAIRS = [
  ['primary', /--primary:\s*(#[0-9a-fA-F]{6})/, /\bprimary:\s*'(#[0-9a-fA-F]{6})'/],
  ['primary-dark', /--primary-dark:\s*(#[0-9a-fA-F]{6})/, /\bprimaryDark:\s*'(#[0-9a-fA-F]{6})'/],
  ['primary-light', /--primary-light:\s*(#[0-9a-fA-F]{6})/, /\bprimaryLight:\s*'(#[0-9a-fA-F]{6})'/],
  ['primary-lighter', /--primary-lighter:\s*(#[0-9a-fA-F]{6})/, /\bprimaryLighter:\s*'(#[0-9a-fA-F]{6})'/],
];
for (const [name, cssRe, tsRe] of SYNC_PAIRS) {
  const c = grab(cssSrc, cssRe);
  const t = grab(tokensSrc, tsRe);
  if (!c || !t) {
    console.error(`✗ TOKEN SYNC  could not read ${name} (globals.css=${c}, tokens.ts=${t})`);
    failures++;
  } else if (c !== t) {
    console.error(`✗ TOKEN SYNC  ${name} drift: globals.css ${c} != tokens.ts ${t}`);
    failures++;
  }
}

console.log(`\ndesign-token check: ${failures} error(s), ${warnings} warning(s).`);
if (failures > 0) {
  console.error('Deprecated blue must be 0. Use --primary / BRAND.primary / text-primary.');
  process.exit(1);
}
