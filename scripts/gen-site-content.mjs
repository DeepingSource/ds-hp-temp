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
  'companyIntro2', 'missionStatement', 'missionStatementSub', 'vision', 'mission',
  'storyHeading', 'storySub', 'namingHeading', 'namingBody', 'leadershipEyebrow', 'leadershipHeading', 'leadershipSub',
  'partnersEyebrow', 'partnersHeading', 'partnersSub', 'partnerStatsNote', 'certsLabel',
  'ctaHeading', 'ctaSub', 'ctaButton', 'partnerStatLabels',
  'methodEyebrow', 'methodHeading', 'methodIntro',
];
// E-1 폼 다이어트: about.yaml도 섹션 중첩 — 평탄화해 공개 shape 유지.
const aboutYamlNested = load('content/site/about.yaml');
const aboutYaml = Object.assign({}, ...Object.values(aboutYamlNested));
const aboutFlat = toLocaleMajor(aboutYaml, ABOUT_FLAT);
const aboutCerts = arrayByIdLocaleMajor(aboutYaml.certs, ['sub']);
const aboutMethodSteps = arrayByIdLocaleMajor(aboutYaml.methodSteps, ['title', 'desc', 'tag']);
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
  'differentiatorEyebrow', 'differentiatorHeading',
  'differentiatorBody1', 'differentiatorBody2', 'differentiatorBody3', 'differentiatorBody4',
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
const agenticPillars = arrayItemsLocaleMajor(agenticYaml.pillars, ['desc', 'footer']);
const agenticAi = {};
for (const loc of LOCALES) {
  agenticAi[loc] = {
    ...agenticFlat[loc],
    philosophy: agenticPhilosophy[loc],
    baseline: agenticBaseline[loc],
    ladder: agenticLadder[loc],
    linkedSources: agenticSources[loc],
    pillars: agenticPillars[loc],
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

// ── team — /company/team 인물 데이터 (PLAN_TEAM_VOICES). content/site/team.yaml.
//    출력은 TeamMember 인터페이스와 동일한 field-major 형태(로케일 분기는 뷰가 담당).
//    voiceTheme='none' 또는 voiceShort.ko 공백이면 voice 미적용 → 기존 quote 폴백. ──
const teamYaml = load('content/site/team.yaml');
const team = (teamYaml.members ?? [])
  .filter((m) => m?.id && m?.name?.ko)
  .map((m) => {
    const o = {
      id: m.id,
      nameKo: m.name?.ko ?? '',
      nameEn: m.name?.en || m.name?.ko || '',
      group: m.group || 'Engineering',
      roleKo: m.role?.ko ?? '',
      roleEn: m.role?.en || m.role?.ko || '',
      roleJp: m.role?.jp || m.role?.ko || '',
      quoteKo: m.quote?.ko ?? '',
      quoteEn: m.quote?.en || m.quote?.ko || '',
      avatarUrl: m.avatar || '',
    };
    if (m.quote?.jp) o.quoteJp = m.quote.jp;
    if (m.isLeadership) o.isLeadership = true;
    if (m.avatarColor) o.avatarColor = m.avatarColor;
    if (m.voiceTheme && m.voiceTheme !== 'none' && m.voiceShort?.ko) {
      o.voice = {
        theme: m.voiceTheme,
        shortKo: m.voiceShort.ko,
        shortEn: m.voiceShort.en || m.voiceShort.ko,
      };
      if (m.voiceShort.jp) o.voice.shortJp = m.voiceShort.jp;
      if (m.voiceStory?.ko) o.voice.storyKo = m.voiceStory.ko;
      if (m.voiceStory?.en) o.voice.storyEn = m.voiceStory.en;
      if (m.voiceStory?.jp) o.voice.storyJp = m.voiceStory.jp;
      if (Array.isArray(m.askMeAbout) && m.askMeAbout.length) o.voice.askMeAbout = m.askMeAbout;
    }
    if (m.endorses) o.endorses = m.endorses;
    return o;
  });

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
//    per-term data passed through as-is. ALL copy is {ko,en,jp} now — title/tagline/
//    definition plus saaiUsage/metaDescription/body(heading + paragraphs[]). en/jp may be
//    empty strings/arrays until translated; the view falls back to ko. Ordered by `order`. Edited via
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

// ── diagnosis — E1 지식 베이스 (diagnosis-v4-engine-plan §2 · MASTER Stage 3).
//    content/diagnosis/flow.yaml 이 존재할 때만 활성(스테이지드 도입 게이트 —
//    질문 뱅크가 랜딩하기 전 커밋들도 빌드 그린 유지). 산출물은 site-content.json이
//    아니라 별도 diagnosis.json — 진단과 무관한 페이지 청크에 444KB 공용 페이로드를
//    키우지 않기 위함(gated-docs.json 이중 산출 선례). 빌드 타임 검증 5종은
//    무조건 throw(한국어 메시지, [diagnosis] 태그) — Keystatic 편집 실수의 방어선. ──
const DIAG_DIR = path.join(ROOT, 'content/diagnosis');
const DIAG_FLOW_PATH = path.join(DIAG_DIR, 'flow.yaml');
let diagnosis = null;
if (fs.existsSync(DIAG_FLOW_PATH)) {
  const flow = yaml.load(fs.readFileSync(DIAG_FLOW_PATH, 'utf8'));
  const qDir = path.join(DIAG_DIR, 'questions');
  const questions = fs.existsSync(qDir)
    ? fs
        .readdirSync(qDir)
        .filter((f) => f.endsWith('.yaml'))
        .map((f) => yaml.load(fs.readFileSync(path.join(qDir, f), 'utf8')))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : [];
  const fxDir = path.join(DIAG_DIR, 'fixtures');
  const fixtures = fs.existsSync(fxDir)
    ? fs
        .readdirSync(fxDir)
        .filter((f) => f.endsWith('.yaml'))
        .map((f) => yaml.load(fs.readFileSync(path.join(fxDir, f), 'utf8')))
    : [];

  // 시나리오 태그: content/solutions/*.yaml 의 diagnosis 블록에서 수집 (v4 §2-1 —
  // 시나리오와 태그가 한 파일에 있어야 신규 시나리오의 태깅 누락이 구조적으로 어렵다)
  const scenarios = {};
  for (const p of solutionPages) {
    // 검증 ①: 모든 솔루션 시나리오에 diagnosis 블록 존재
    if (!p.diagnosis || !p.diagnosis.cluster) {
      throw new Error(`[diagnosis] content/solutions/${p.slug}.yaml: diagnosis 블록(cluster 필수)이 없습니다 — 진단 결과로 도달할 수 없는 시나리오가 생기므로 빌드 중단`);
    }
    scenarios[p.slug] = {
      industry: p.industry,
      cluster: p.diagnosis.cluster,
      attributes: p.diagnosis.attributes ?? {},
      prior: p.diagnosis.prior ?? 1,
    };
  }

  // 증거 어휘: attribute → 허용 값 집합. symptom은 시나리오 태그의 합집합(고아 증거
  // 금지의 기준), persona/scale/goal은 신호 스키마 고정 어휘(v3 §3).
  const VOCAB = {
    persona: new Set(['owner', 'hq_sv', 'exec']),
    scale: new Set(['single', 'small', 'mid', 'large']),
    goal: new Set(['urgent', 'planning', 'research']),
    symptom: new Set(Object.values(scenarios).flatMap((s) => s.attributes.symptom ?? [])),
  };
  const LOCALES3 = ['ko', 'en', 'jp'];
  const requireTri = (obj, where) => {
    for (const loc of LOCALES3) {
      if (!obj || typeof obj[loc] !== 'string' || obj[loc].trim() === '') {
        throw new Error(`[diagnosis] ${where}: ${loc} 라벨이 비어 있습니다 — 3로케일 동시 원칙 위반으로 빌드 중단`);
      }
    }
  };

  const qById = new Map();
  for (const q of questions) {
    if (!q.id) throw new Error('[diagnosis] questions: id 없는 질문 파일이 있습니다 — 빌드 중단');
    if (qById.has(q.id)) throw new Error(`[diagnosis] questions/${q.id}: id 중복 — 빌드 중단`);
    qById.set(q.id, q);
    // 검증 ③: 3로케일 라벨 완전성 (text · options.label · ack)
    requireTri(q.text, `questions/${q.id}.text`);
    if (q.ack) requireTri(q.ack, `questions/${q.id}.ack`);
    for (const opt of q.options ?? []) {
      if (!opt.id) throw new Error(`[diagnosis] questions/${q.id}: id 없는 옵션 — 빌드 중단`);
      requireTri(opt.label, `questions/${q.id}.options.${opt.id}.label`);
      // 검증 ②: 고아 증거 금지 — evidence의 attribute·value가 어휘에 존재
      for (const ev of opt.evidence ?? []) {
        if (!VOCAB[ev.attribute]) {
          throw new Error(`[diagnosis] questions/${q.id}.options.${opt.id}: 알 수 없는 evidence attribute "${ev.attribute}" — 빌드 중단`);
        }
        if (!VOCAB[ev.attribute].has(ev.value)) {
          throw new Error(`[diagnosis] questions/${q.id}.options.${opt.id}: evidence ${ev.attribute}="${ev.value}" 가 어느 시나리오 태그/신호 어휘에도 없습니다(고아 증거) — 빌드 중단`);
        }
      }
      // tiebreak 결과 slug 실존
      if (opt.result && !scenarios[opt.result]) {
        throw new Error(`[diagnosis] questions/${q.id}.options.${opt.id}: result "${opt.result}" 는 존재하지 않는 시나리오 slug — 빌드 중단`);
      }
    }
  }

  // 검증 ④: fixedOrder의 항목(id 또는 @group)이 질문 뱅크에 존재
  for (const entry of flow.fixedOrder ?? []) {
    if (entry.startsWith('@')) {
      const group = entry.slice(1);
      if (!questions.some((q) => q.group === group)) {
        throw new Error(`[diagnosis] flow.yaml fixedOrder "${entry}": group "${group}" 질문이 하나도 없습니다 — 빌드 중단`);
      }
    } else if (!qById.has(entry)) {
      throw new Error(`[diagnosis] flow.yaml fixedOrder "${entry}": 질문 뱅크에 없는 id — 빌드 중단`);
    }
  }

  // 검증 ⑤: 모든 slug가 최소 1개 질문 조합으로 도달 가능 —
  // cluster의 slug가 1개면 클러스터 선택 직행으로 도달, 2개 이상이면 그 cluster를
  // appliesWhen으로 받는 refine 질문의 options[].result 가 전 slug를 커버해야 한다.
  const byCluster = new Map();
  for (const [slug, s] of Object.entries(scenarios)) {
    const key = `${s.industry}:${s.cluster}`;
    if (!byCluster.has(key)) byCluster.set(key, []);
    byCluster.get(key).push(slug);
  }
  for (const [key, slugs] of byCluster) {
    if (slugs.length < 2) continue;
    const refineQs = questions.filter(
      (q) => q.phase === 'refine' && (q.appliesWhen?.cluster ?? []).includes(key),
    );
    const covered = new Set(refineQs.flatMap((q) => (q.options ?? []).map((o) => o.result).filter(Boolean)));
    const missing = slugs.filter((s) => !covered.has(s));
    if (missing.length > 0) {
      throw new Error(`[diagnosis] 클러스터 ${key}: slug ${missing.join(', ')} 로 도달하는 refine 질문 옵션이 없습니다(도달 불가 시나리오) — 빌드 중단`);
    }
  }

  diagnosis = { flow, questions, scenarios, fixtures };
}

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
if (diagnosis) {
  fs.writeFileSync(path.join(OUT_DIR, 'diagnosis.json'), JSON.stringify(diagnosis, null, 2) + '\n');
  console.log(`✓ generated src/data/generated/diagnosis.json (${diagnosis.questions.length} questions, ${Object.keys(diagnosis.scenarios).length} scenarios, ${diagnosis.fixtures.length} fixtures)`);
}
fs.writeFileSync(path.join(OUT_DIR, 'gated-docs.json'), JSON.stringify(gatedDocs, null, 2) + '\n');
fs.writeFileSync(
  path.join(OUT_DIR, 'site-content.json'),
  JSON.stringify({ homeCopy, products, storeAgent, saai, solutions, about, contact, pricing, technology, agenticAi, resources, retail, drug, foodBeverage, largeSpace, news, company, glossary, leadership, team, milestones, career, solutionPages }, null, 2) + '\n',
);
console.log('✓ generated src/data/generated/site-content.json (…, leadership, team, milestones, career, solutionPages)');
console.log(`✓ generated src/data/generated/gated-docs.json (${gatedDocs.gatedSlugs.length} gated)`);
