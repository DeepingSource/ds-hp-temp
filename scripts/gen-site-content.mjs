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

/** [{ id, f:{ko,en,jp} }] → locale-major ORDERED array { en: [{f}], ko: …, jp: … }.
 *  id 는 편집자용 라벨로만 쓰고 출력에서 제외 — 뷰가 인덱스로 소비(순서=구조). */
function arrayItemsLocaleMajor(arr, fields) {
  const out = {};
  for (const loc of LOCALES) {
    out[loc] = (arr ?? []).map((item) => {
      const entry = {};
      for (const f of fields) entry[f] = item?.[f]?.[loc] ?? '';
      return entry;
    });
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

// ── about — flat copy (partnersHeading/Sub are {…} templates, partnerStatLabels is
//    an array) + id-keyed certs/methodSteps. Cert labels/icons + the closing line
//    (a brand-canon SOT value) stay in code. ──
const ABOUT_FLAT = [
  'badge', 'heroEyebrowCompany', 'heroMasterCompany', 'heroEyebrowOwner', 'heroMasterOwner',
  'companyIntro', 'companyIntro2', 'vmEyebrow', 'vision', 'visionLabel', 'missionLabel', 'mission',
  'storyEyebrow', 'storyHeading', 'storySub', 'leadershipEyebrow', 'leadershipHeading', 'leadershipSub',
  'partnersEyebrow', 'partnersHeading', 'partnersSub', 'partnerStatsNote', 'certsLabel',
  'ctaHeading', 'ctaSub', 'ctaButton', 'partnerStatLabels',
  'methodEyebrow', 'methodHeading', 'methodIntro',
];
const aboutYaml = load('content/site/about.yaml');
const aboutFlat = toLocaleMajor(aboutYaml, ABOUT_FLAT);
const aboutCerts = arrayByIdLocaleMajor(aboutYaml.certs, ['sub']);
const aboutMethodSteps = arrayByIdLocaleMajor(aboutYaml.methodSteps, ['term', 'promise']);
const about = {};
for (const loc of LOCALES) {
  about[loc] = { ...aboutFlat[loc], certs: aboutCerts[loc], methodSteps: aboutMethodSteps[loc] };
}

// ── contact — display prose only (form options/validation/label-maps/ReactNodes
//    and the title interpolations stay in code). ──
const CONTACT_FLAT = [
  'loading', 'eyebrow', 'provenLabel', 'provenText', 'partnerLabel', 'partnerText',
  'contextFooter', 'mobileTrustLabel', 'mobileTrustBrands', 'formTitle', 'formSubtitle',
  'nameLabel', 'namePlaceholder', 'contactLabel', 'contactPlaceholder', 'storeCountLabel',
  'affiliationLabel', 'brandLabel', 'brandOptional', 'brandPlaceholder', 'selectPlaceholder',
  'submit', 'submitting', 'noticeBold', 'backToHome', 'successTitle', 'successSubtitle',
  'insightPrompt', 'insightLink', 'errSubmitFailed', 'errTimeout', 'errGeneric',
];
const contactYaml = load('content/site/contact.yaml');
const contactFlat = toLocaleMajor(contactYaml, CONTACT_FLAT);
const contactCards = arrayByIdLocaleMajor(contactYaml.cards, ['label', 'desc']);
const contact = {};
for (const loc of LOCALES) {
  contact[loc] = { ...contactFlat[loc], cards: contactCards[loc] };
}

// ── pricing — flat copy + list fields (localizedList values pass through toLocaleMajor).
//    Discount tiers (numeric SOT), interpolation functions, lead-payload labels, and the
//    store-agent-vs-care footer tuple stay in code; see PricingClientView.tsx CODE. ──
const PRICING_FLAT = [
  'heroTitle', 'heroSub', 'toggleB2c', 'toggleB2b', 'b2cHeading', 'b2cSub', 'careStep', 'careDesc',
  'carePerMonth', 'careFeatures', 'insightStep', 'insightDesc', 'insightPerMonth', 'insightBasis', 'insightFeatures', 'agentStep',
  'agentDesc', 'agentFree', 'agentPriceTail', 'agentFeatures', 'freeConsult', 'startFree', 'diffTitle', 'freeBadge',
  'paidBadge', 'saaiBasic', 'storeCare', 'saaiFeatures', 'careDiffFeatures', 'simLink', 'agentCompareLink', 'b2bHeading',
  'b2bSub', 'b2bSimTitle', 'b2bSimSub', 'b2bCamLabel', 'unitDevice', 'b2bSmall', 'b2bMid', 'b2bLarge',
  'b2bStoreLabel', 'unitStore', 'b2b3', 'b2b50', 'b2b100', 'discountLabel', 'perStoreCost', 'perStoreBasis',
  'totalMonthly', 'won', 'estimateDisclaimer', 'b2bEmailLabel', 'emailPlaceholder', 'getQuote', 'b2bEmailNote', 'submittedTitle',
  'submittedSub', 'recalc', 'entBadge', 'entTitle', 'entDesc', 'entFeatures', 'entCta', 'backToB2c',
  'simHeading', 'simSub', 'simSelectLabel', 'simCamLabel', 'simSmall', 'simLarge', 'simEmailLabel', 'simEmailNote',
  'simResultLabel', 'simEmptyHint', 'simResultDisclaimer', 'detailSimLink', 'bundleHeading', 'bundleBodyPre', 'bundleBodyStrong', 'bundleBodyPost',
  'bundleCta', 'bundleSimLink', 'errSubmitFailed', 'errGeneric',
];
const pricing = toLocaleMajor(load('content/site/pricing.yaml'), PRICING_FLAT);

// ── technology — flat copy + 2 string lists + 4 ordered object-arrays (icons/hrefs/
//    특허수/다이어그램 라벨은 코드 유지). coreTitle·ctaBadge 는 인자 미사용 상수라 문자열. ──
const TECH_FLAT = [
  'heroBadge', 'heroTitleA', 'heroTitleB', 'heroSub', 'heroPatentsLabel', 'heroStackLine',
  'problemEyebrow', 'problemTitle', 'problemSub', 'oldTag', 'oldTitle', 'newTag',
  'newTitle', 'howEyebrow', 'howTitle', 'howSub', 'demoEyebrow', 'demoTitle',
  'demoSub', 'demoCaption', 'demoAria', 'coreEyebrow', 'coreTitle', 'coreSub',
  'learnMore', 'complianceEyebrow', 'complianceTitle', 'complianceSub', 'patentsLabel', 'patentsStackLine',
  'poweredLabel', 'ctaBadge', 'ctaTitle', 'ctaSub', 'ctaPrimary', 'ctaSecondary',
  'dilemmaOld', 'dilemmaNew',
];
const technologyYaml = load('content/site/technology.yaml');
const technologyFlat = toLocaleMajor(technologyYaml, TECH_FLAT);
const techDemoItems = arrayItemsLocaleMajor(technologyYaml.demoItems, ['label', 'desc']);
const techStack = arrayItemsLocaleMajor(technologyYaml.stack, ['tag', 'title', 'desc']);
const techCompliance = arrayItemsLocaleMajor(technologyYaml.complianceItems, ['region', 'law', 'desc']);
const techPowered = arrayItemsLocaleMajor(technologyYaml.poweredProducts, ['name', 'desc']);
const technology = {};
for (const loc of LOCALES) {
  technology[loc] = {
    ...technologyFlat[loc],
    demoItems: techDemoItems[loc],
    stack: techStack[loc],
    complianceItems: techCompliance[loc],
    poweredProducts: techPowered[loc],
  };
}

// ── resources — flat copy + 1 ordered card array (href/아이콘은 코드 유지, 인덱스 매핑). ──
const RESOURCES_FLAT = [
  'eyebrow', 'heroTitle', 'heroSub', 'featuredLabel', 'featuredTitle',
  'featuredDesc', 'featuredCta', 'cardCta',
];
const resourcesYaml = load('content/site/resources.yaml');
const resourcesFlat = toLocaleMajor(resourcesYaml, RESOURCES_FLAT);
const resourceCards = arrayItemsLocaleMajor(resourcesYaml.resources, ['title', 'description', 'label']);
const resources = {};
for (const loc of LOCALES) {
  resources[loc] = { ...resourcesFlat[loc], resources: resourceCards[loc] };
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(
  path.join(OUT_DIR, 'site-content.json'),
  JSON.stringify({ homeCopy, products, storeAgent, saai, solutions, about, contact, pricing, technology, resources }, null, 2) + '\n',
);
console.log('✓ generated src/data/generated/site-content.json (homeCopy, products, storeAgent, saai, solutions, about, contact, pricing, technology, resources)');
