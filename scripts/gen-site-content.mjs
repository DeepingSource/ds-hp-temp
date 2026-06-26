// Compile Keystatic-edited site copy (content/site/*.yaml, field-major per-locale)
// into a synchronous JSON module the app can import in BOTH server and client
// components (Reader API is async/server-only, so we pre-compile instead).
// Run by predev/prebuild + the gh-pages build; output is committed for tsc.
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'src/data/generated');
const LOCALES = ['en', 'ko', 'jp'];

const load = (rel) => yaml.load(fs.readFileSync(path.join(ROOT, rel), 'utf8'));

/** field-major { f: {ko,en,jp} } → locale-major { en: {f}, ko: {f}, jp: {f} }. */
function toLocaleMajor(data, fields) {
  const out = {};
  for (const loc of LOCALES) {
    out[loc] = {};
    for (const f of fields) out[loc][f] = data?.[f]?.[loc] ?? '';
  }
  return out;
}

/** [{ id, f:{ko,en,jp} }] → locale-major { en: { [id]: {f} }, ko: …, jp: … }. */
function arrayByIdLocaleMajor(arr, fields) {
  const out = {};
  for (const loc of LOCALES) {
    out[loc] = {};
    for (const item of arr ?? []) {
      const entry = {};
      for (const f of fields) entry[f] = item?.[f]?.[loc] ?? '';
      out[loc][item.id] = entry;
    }
  }
  return out;
}

// ── home — flat master copy ──────────────────────────────────────────────────
const HOME_FIELDS = ['masterCompany', 'masterOwner', 'heroSub', 'ctaPrimary', 'ctaSecondary'];
const homeCopy = toLocaleMajor(load('content/site/home.yaml'), HOME_FIELDS);

// ── products — flat copy + id-keyed nested arrays (structure stays in code) ───
const PRODUCTS_FLAT = [
  'eyebrow', 'heroTitle', 'heroSub', 'loopEyebrow', 'ownersEyebrow',
  'detail', 'visit', 'seedLine', 'seedCta', 'cta',
];
const productsYaml = load('content/site/products.yaml');
const productsFlat = toLocaleMajor(productsYaml, PRODUCTS_FLAT);
const productsLoop = arrayByIdLocaleMajor(productsYaml.loop, ['desc']);
const productsOwners = arrayByIdLocaleMajor(productsYaml.owners, ['desc']);
const products = {};
for (const loc of LOCALES) {
  products[loc] = { ...productsFlat[loc], loop: productsLoop[loc], owners: productsOwners[loc] };
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(
  path.join(OUT_DIR, 'site-content.json'),
  JSON.stringify({ homeCopy, products }, null, 2) + '\n',
);
console.log('✓ generated src/data/generated/site-content.json (homeCopy, products)');
