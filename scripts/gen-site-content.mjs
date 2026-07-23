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
  'eyebrow', 'heroTitle', 'heroSub', 'loopEyebrow', 'suiteTitle', 'suiteSub', 'ownersEyebrow',
  'categoryTitle', 'categoryBody', 'casesCta',
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
  'evolutionEyebrow', 'evolutionHeading', 'evolutionSub', 'evolutionProactiveCta',
  'techBridgeText', 'techBridgeCta',
];
const storeAgentYaml = load('content/site/store-agent.yaml');
const storeAgentFlat = toLocaleMajor(storeAgentYaml, STORE_AGENT_FLAT);
const storeAgentSteps = arrayByIdLocaleMajor(storeAgentYaml.steps, ['title', 'desc']);
const storeAgentEvolution = arrayItemsLocaleMajor(storeAgentYaml.evolution, ['tag', 'title', 'desc']);
const storeAgent = {};
for (const loc of LOCALES) {
  storeAgent[loc] = {
    ...storeAgentFlat[loc],
    steps: storeAgentSteps[loc],
    evolution: storeAgentEvolution[loc],
  };
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
  'badge', 'heroTitle', 'heroSub', 'viewSolution', 'ctaEyebrow', 'ctaTitle', 'ctaSub',
  'ctaPrimary', 'ctaSecondary',
];
const solutions = toLocaleMajor(load('content/site/solutions.yaml'), SOLUTIONS_FLAT);

// ── about — flat copy (partnersHeading/Sub are {…} templates, partnerStatLabels is
//    an array) + id-keyed certs/methodSteps. Cert labels/icons + the closing line
//    (a brand-canon SOT value) stay in code. ──
const ABOUT_FLAT = [
  'badge', 'heroEyebrowCompany', 'heroMasterCompany', 'heroEyebrowOwner', 'heroMasterOwner',
  'companyIntro', 'companyIntro2', 'vmEyebrow', 'missionStatement', 'missionStatementSub', 'vision', 'visionLabel', 'missionLabel', 'mission',
  'storyEyebrow', 'storyHeading', 'storySub', 'namingHeading', 'namingBody', 'leadershipEyebrow', 'leadershipHeading', 'leadershipSub',
  'partnersEyebrow', 'partnersHeading', 'partnersSub', 'partnerStatsNote', 'certsLabel',
  'ctaHeading', 'ctaSub', 'ctaButton', 'partnerStatLabels',
  'methodEyebrow', 'methodHeading', 'methodIntro',
];
// E-1 폼 다이어트: about.yaml도 섹션 중첩 — 평탄화해 공개 shape 유지.
const aboutYamlNested = load('content/site/about.yaml');
const aboutYaml = Object.assign({}, ...Object.values(aboutYamlNested));
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
  'submittedSub', 'recalc', 'countBadge', 'countDesc', 'countPrice', 'countOptions', 'countCta',
  'entBadge', 'entTitle', 'entDesc', 'entFeatures', 'entCta', 'backToB2c',
  'simHeading', 'simSub', 'simSelectLabel', 'simCamLabel', 'simSmall', 'simLarge', 'simEmailLabel', 'simEmailNote',
  'simResultLabel', 'simEmptyHint', 'simResultDisclaimer', 'detailSimLink', 'bundleHeading', 'bundleBodyPre', 'bundleBodyStrong', 'bundleBodyPost',
  'bundleCta', 'bundleSimLink', 'errSubmitFailed', 'errGeneric',
];
// E-1 폼 다이어트: pricing.yaml은 섹션 중첩(hero/b2c/…) — 평탄화해 공개 shape 유지.
const pricingYamlNested = load('content/site/pricing.yaml');
const pricing = toLocaleMajor(Object.assign({}, ...Object.values(pricingYamlNested)), PRICING_FLAT);

// ── technology — flat copy + 2 string lists + 4 ordered object-arrays (icons/hrefs/
//    특허수/다이어그램 라벨은 코드 유지). coreTitle·ctaBadge 는 인자 미사용 상수라 문자열. ──
const TECH_FLAT = [
  'heroBadge', 'heroTitleA', 'heroTitleB', 'heroSub', 'heroPatentsLabel', 'heroStackLine',
  'problemEyebrow', 'problemTitle', 'problemSub', 'oldTag', 'oldTitle', 'newTag',
  'newTitle', 'howEyebrow', 'howTitle', 'howSub', 'demoEyebrow', 'demoTitle',
  'demoSub', 'demoCaption', 'demoAria', 'coreEyebrow', 'coreTitle', 'coreSub',
  'learnMore', 'complianceEyebrow', 'complianceTitle', 'complianceSub', 'complianceDataSpec', 'patentsLabel', 'patentsStackLine',
  'poweredLabel', 'ctaBadge', 'ctaTitle', 'ctaSub', 'ctaPrimary', 'ctaSecondary',
  'dilemmaOld', 'dilemmaNew', 'dilemmaNote',
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

// ── agentic-ai — flat copy + 3 ordered object-arrays (아이콘·링크·L0~L5 라벨은 코드 유지). ──
const AGENTIC_FLAT = [
  'eyebrow', 'heroTitle', 'heroSub', 'heroNote',
  'problemEyebrow', 'problemTitle', 'problemSub',
  'philosophyEyebrow', 'philosophyHeading', 'philosophySub',
  'baselineEyebrow', 'baselineHeading', 'baselineSub', 'linkedSourcesLabel',
  'ladderEyebrow', 'ladderHeading', 'ladderSub', 'ladderNote',
  'bridgeEyebrow', 'bridgeHeading', 'bridgeSub', 'bridgeCta', 'bridgeCtaSecondary',
];
const agenticYaml = load('content/site/agentic-ai.yaml');
const agenticFlat = toLocaleMajor(agenticYaml, AGENTIC_FLAT);
const agenticPhilosophy = arrayItemsLocaleMajor(agenticYaml.philosophy, ['title', 'desc']);
const agenticBaseline = arrayItemsLocaleMajor(agenticYaml.baseline, ['title', 'desc', 'linkLabel']);
const agenticLadder = arrayItemsLocaleMajor(agenticYaml.ladder, ['label', 'line']);
const agenticSources = arrayItemsLocaleMajor(agenticYaml.linkedSources, ['label']);
const agenticAi = {};
for (const loc of LOCALES) {
  agenticAi[loc] = {
    ...agenticFlat[loc],
    philosophy: agenticPhilosophy[loc],
    baseline: agenticBaseline[loc],
    ladder: agenticLadder[loc],
    linkedSources: agenticSources[loc],
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

// ── solutions 업종 허브 4종 — 공통 베이스(flat + 2줄 heroTitle/ctaTitle + scenarios[3]) +
//    Retail(beforeAfter[3]) · LargeSpace(mtmc* + mtmcItems 리스트). 이미지/아이콘/metadata 코드 유지. ──
const SOL_BASE_FLAT = [
  'badge', 'heroTitle', 'heroSub', 'heroCta', 'scenariosEyebrow', 'scenariosHeading',
  'quote', 'quoteName', 'quoteRole', 'resultsLine', 'resultsNote',
  'ctaEyebrow', 'ctaTitle', 'ctaSub', 'ctaButton',
];
function solBase(yamlObj, extraFlat = []) {
  const flat = toLocaleMajor(yamlObj, [...SOL_BASE_FLAT, ...extraFlat]);
  const scenarios = arrayItemsLocaleMajor(yamlObj.scenarios, ['tag', 'title', 'body']);
  const out = {};
  for (const loc of LOCALES) out[loc] = { ...flat[loc], scenarios: scenarios[loc] };
  return out;
}
const retailYaml = load('content/site/retail.yaml');
const retail = solBase(retailYaml, ['baEyebrow', 'baHeading']);
const retailBeforeAfter = arrayItemsLocaleMajor(retailYaml.beforeAfter, ['before', 'after']);
for (const loc of LOCALES) retail[loc].beforeAfter = retailBeforeAfter[loc];
const drug = solBase(load('content/site/drug.yaml'));
const foodBeverage = solBase(load('content/site/food-beverage.yaml'));
const largeSpace = solBase(load('content/site/large-space.yaml'), ['mtmcBadge', 'mtmcHeading', 'mtmcBody', 'mtmcLink', 'mtmcItems']);

// ── news — media coverage list. date/url are shared; outlet/category/title per-locale. ──
const newsYaml = load('content/site/news.yaml');
const news = {};
for (const loc of LOCALES) {
  news[loc] = {
    coverage: (newsYaml.coverage ?? []).map((item) => ({
      date: item.date,
      outlet: item.outlet?.[loc] ?? '',
      category: item.category?.[loc] ?? '',
      title: item.title?.[loc] ?? '',
      url: item.url,
    })),
  };
}

// ── company — site-wide constants (flat, not per-locale). Edited via the `company` singleton. ──
const company = load('content/site/company.yaml');

// ── leadership · milestones · career — About/Career 저빈도 콘텐츠 (DOCS_WIKI_PLAN 6-W2).
//    {patents}/{foundingYear}/{nvidiaPartner}/{patentsLabel}/{vision} 토큰은 company 값으로
//    빌드 시 치환(SOT 유지 — company 싱글톤이 바뀌면 재생성 시 반영). mailto/아이콘은 코드 유지. ──
const subst = (s) =>
  typeof s === 'string'
    ? s
        .replaceAll('{patents}', String(company.patents))
        .replaceAll('{foundingYear}', String(company.foundingYear))
        .replaceAll('{nvidiaPartner}', company.nvidiaPartner)
        .replaceAll('{patentsLabel}', company.patentsLabel)
        .replaceAll('{vision}', company.vision)
    : s;

const leadershipYaml = load('content/site/leadership.yaml');
const LEADER_FIELDS = ['name', 'role', 'focus', 'bio', 'initials'];
const leadership = {};
for (const loc of LOCALES) {
  leadership[loc] = (leadershipYaml.leaders ?? []).map((l) => {
    const o = { key: l.key };
    for (const f of LEADER_FIELDS) o[f] = l[f]?.[loc] ?? '';
    if (l.photo) o.photo = l.photo;
    return o;
  });
}

const milestonesYaml = load('content/site/milestones.yaml');
const MILESTONE_FIELDS = ['year', 'title', 'desc'];
const milestones = {};
for (const loc of LOCALES) {
  milestones[loc] = (milestonesYaml.items ?? []).map((m) => {
    const o = {};
    for (const f of MILESTONE_FIELDS) o[f] = subst(m[f]?.[loc] ?? '');
    if (m.highlight) o.highlight = true;
    return o;
  });
}

const CAREER_FLAT = [
  'badge', 'heroMaster', 'heroMasterAccent', 'heroSub', 'cultureEyebrow', 'cultureHeading', 'cultureSub',
  'benefitsEyebrow', 'benefitsHeading', 'benefitsSub', 'rolesEyebrow', 'rolesHeading', 'rolesSub', 'rolesApply',
  'processEyebrow', 'processHeading', 'processSub', 'mailSubject', 'ctaHeading', 'ctaSub', 'ctaApply', 'ctaGeneral',
];
const careerYaml = load('content/site/career.yaml');
const careerFlat = toLocaleMajor(careerYaml, CAREER_FLAT);
const careerCulture = arrayItemsLocaleMajor(careerYaml.culture, ['title', 'desc']);
const careerBenefits = arrayItemsLocaleMajor(careerYaml.benefits, ['title', 'desc']);
const careerProcess = arrayItemsLocaleMajor(careerYaml.process, ['step', 'title', 'desc']);
const career = {};
for (const loc of LOCALES) {
  career[loc] = {
    ...careerFlat[loc],
    culture: careerCulture[loc].map((c) => ({ title: c.title, desc: subst(c.desc) })),
    benefits: careerBenefits[loc],
    process: careerProcess[loc],
  };
}

// ── glossary — CMS collection (content/glossary/*.yaml, one file per term). Structured
//    per-term data passed through as-is: title/tagline/definition are {ko,en,jp}; body
//    (sections) + saaiUsage + metaDescription are ko-only. Ordered by `order`. Edited via
//    the `glossary` collection; consumed by the glossaryTerms.ts/glossary-i18n.ts re-exports. ──
const GLOSSARY_DIR = path.join(ROOT, 'content/glossary');
const glossary = fs.existsSync(GLOSSARY_DIR)
  ? fs
      .readdirSync(GLOSSARY_DIR)
      .filter((f) => f.endsWith('.yaml'))
      .map((f) => yaml.load(fs.readFileSync(path.join(GLOSSARY_DIR, f), 'utf8')))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  : [];

// ── solutionPages — CMS collection (content/solutions/*.yaml, one file per scenario).
//    Structured per-solution data: title/excerpt/impact/impactLabel + background.heading,
//    cause titles, step titles, result labels are {ko,en,jp}; the rest (problem, bodies,
//    descs, stats, metaDescription) is ko-only. productLabel/productColor/industryLabel are
//    NOT stored (re-export derives them). Consumed by solutionsData.ts/solutions-i18n.ts. ──
const SOLUTION_PAGES_DIR = path.join(ROOT, 'content/solutions');
const solutionPages = fs.existsSync(SOLUTION_PAGES_DIR)
  ? fs
      .readdirSync(SOLUTION_PAGES_DIR)
      .filter((f) => f.endsWith('.yaml'))
      .map((f) => yaml.load(fs.readFileSync(path.join(SOLUTION_PAGES_DIR, f), 'utf8')))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  : [];

// ── gated docs — logical slugs of access:gated docs (DOCS_WIKI_PLAN Phase 4). The
//    proxy gate + GH-Pages export exclusion read this. Parsed from content/docs/*.mdx
//    frontmatter so it's independent of velite build order. Currently gates nothing. ──
const DOCS_DIR = path.join(ROOT, 'content/docs');
const gatedSet = new Set();
if (fs.existsSync(DOCS_DIR)) {
  for (const f of fs.readdirSync(DOCS_DIR).filter((n) => n.endsWith('.mdx'))) {
    const raw = fs.readFileSync(path.join(DOCS_DIR, f), 'utf8');
    // Fail CLOSED: if a file *looks* gated but we cannot confirm it, break the build
    // rather than silently omitting it from the allowlist (which would serve it ungated).
    const looksGated = /^access:\s*["']?gated/m.test(raw);
    const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/); // CRLF-tolerant
    if (!fmMatch) {
      if (looksGated) throw new Error(`[gated-docs] ${f}: access:gated 로 보이나 frontmatter 파싱 실패 — fail-open 방지 위해 빌드 중단`);
      continue;
    }
    let fm;
    try {
      fm = yaml.load(fmMatch[1]) || {};
    } catch (e) {
      if (looksGated) throw new Error(`[gated-docs] ${f}: frontmatter YAML 파싱 실패(access:gated 의심) — 빌드 중단: ${e.message}`);
      continue;
    }
    if (fm.access === 'gated' && !fm.draft) {
      const base = String(fm.slug || f.replace(/\.mdx$/, ''));
      gatedSet.add(base.replace(/-(en|jp)$/, '')); // logical (locale-agnostic) slug
    }
  }
}
const gatedDocs = { gatedSlugs: [...gatedSet].sort() };

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, 'gated-docs.json'), JSON.stringify(gatedDocs, null, 2) + '\n');
fs.writeFileSync(
  path.join(OUT_DIR, 'site-content.json'),
  JSON.stringify({ homeCopy, products, storeAgent, saai, solutions, about, contact, pricing, technology, agenticAi, resources, retail, drug, foodBeverage, largeSpace, news, company, glossary, leadership, milestones, career, solutionPages }, null, 2) + '\n',
);
console.log('✓ generated src/data/generated/site-content.json (…, leadership, milestones, career, solutionPages)');
console.log(`✓ generated src/data/generated/gated-docs.json (${gatedDocs.gatedSlugs.length} gated)`);
