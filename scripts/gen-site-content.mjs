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

// ── store-agent — flat copy + id-keyed steps (icons/labels stay in code) ──────
const STORE_AGENT_FLAT = [
  'heroTitle', 'heroSub', 'ctaPrimary', 'ctaSecondary',
  'stepsHeading', 'stepsSub', 'pricingHeading', 'pricingSub', 'pricingCta',
  'finalHeading', 'finalSub', 'finalCta',
];
const storeAgentYaml = load('content/site/store-agent.yaml');
const storeAgentFlat = toLocaleMajor(storeAgentYaml, STORE_AGENT_FLAT);
const storeAgentSteps = arrayByIdLocaleMajor(storeAgentYaml.steps, ['title', 'desc']);
const storeAgent = {};
for (const loc of LOCALES) {
  storeAgent[loc] = { ...storeAgentFlat[loc], steps: storeAgentSteps[loc] };
}

// ── saai — flat copy + id-keyed loop/tools/plans (stage/icon/highlight in code) ─
const SAAI_FLAT = [
  'heroBadge', 'heroTitle', 'heroSub', 'heroCta', 'heroNote',
  'loopEyebrow', 'loopHeading', 'loopSub', 'loopFootnote',
  'toolsEyebrow', 'toolsHeading', 'toolsSub', 'trendNote',
  'planEyebrow', 'planHeading', 'planSub', 'planNote',
  'featureCta', 'featureNote', 'otherProducts',
];
const saaiYaml = load('content/site/saai.yaml');
const saaiFlat = toLocaleMajor(saaiYaml, SAAI_FLAT);
const saaiLoop = arrayByIdLocaleMajor(saaiYaml.loop, ['name', 'role']);
const saaiTools = arrayByIdLocaleMajor(saaiYaml.tools, ['name', 'desc']);
const saaiPlans = arrayByIdLocaleMajor(saaiYaml.plans, ['tier', 'price', 'desc', 'items']);
const saai = {};
for (const loc of LOCALES) {
  saai[loc] = { ...saaiFlat[loc], loop: saaiLoop[loc], tools: saaiTools[loc], plans: saaiPlans[loc] };
}

// ── solutions — flat copy; heroTitle/ctaTitle/ctaSub are 2-line arrays, and
//    total/perIndustry are interpolation templates ({n}/{label}) rebuilt in code. ──
const SOLUTIONS_FLAT = [
  'badge', 'heroTitle', 'heroSub', 'total', 'perIndustry',
  'industryDetail', 'viewSolution', 'ctaEyebrow', 'ctaTitle', 'ctaSub',
  'ctaPrimary', 'ctaSecondary',
];
const solutions = toLocaleMajor(load('content/site/solutions.yaml'), SOLUTIONS_FLAT);

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(
  path.join(OUT_DIR, 'site-content.json'),
  JSON.stringify({ homeCopy, products, storeAgent, saai, solutions }, null, 2) + '\n',
);
console.log('✓ generated src/data/generated/site-content.json (homeCopy, products, storeAgent, saai, solutions)');
