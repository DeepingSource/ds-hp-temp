import { config, fields, singleton, collection } from '@keystatic/core';
import { wrapper, block } from '@keystatic/core/content-components';

/**
 * 블로그 본문 커스텀 블록 — src/components/blog/mdx-components.tsx 와 1:1 매핑.
 * Stat = block(children 없음 → self-closing), 나머지 = wrapper(children 있음).
 * ContentView 는 Keystatic 에디터 내 프리뷰 표시용(렌더 자체는 사이트가 담당).
 * 직렬화 충실도는 Phase B-S 스파이크에서 검증됨(docs/blog-keystatic-spike-B-S-findings.md).
 */
const blogComponents = {
  Stat: block({
    label: 'Stat (통계 셀)',
    schema: {
      label: fields.text({ label: '라벨' }),
      value: fields.text({ label: '값' }),
      change: fields.text({ label: '변화 (선택)' }),
    },
    ContentView: ({ value }) => (
      <div>
        <strong>{value.value}</strong> — {value.label}
        {value.change ? ` (${value.change})` : ''}
      </div>
    ),
  }),
  StatGroup: wrapper({
    label: 'StatGroup (통계 묶음)',
    schema: {},
    ContentView: ({ children }) => <div>{children}</div>,
  }),
  Tip: wrapper({
    label: 'Tip',
    schema: { title: fields.text({ label: '제목' }) },
    ContentView: ({ value, children }) => (
      <div>
        <strong>{value.title}</strong>
        {children}
      </div>
    ),
  }),
  Checklist: wrapper({
    label: 'Checklist',
    schema: {},
    ContentView: ({ children }) => <div>{children}</div>,
  }),
  Callout: wrapper({
    label: 'Callout',
    schema: {
      variant: fields.select({
        label: '유형',
        options: [
          { label: 'Info', value: 'info' },
          { label: 'Warning', value: 'warning' },
          { label: 'Success', value: 'success' },
        ],
        defaultValue: 'info',
      }),
    },
    ContentView: ({ children }) => <div>{children}</div>,
  }),
  Quote: wrapper({
    label: 'Quote',
    schema: { author: fields.text({ label: '저자' }) },
    ContentView: ({ value, children }) => (
      <div>
        {children} — {value.author}
      </div>
    ),
  }),
  Source: wrapper({
    label: 'Source (출처)',
    schema: {},
    ContentView: ({ children }) => <div>{children}</div>,
  }),
  PrivacyNote: wrapper({
    label: 'PrivacyNote',
    schema: {},
    ContentView: ({ children }) => <div>{children}</div>,
  }),
};

// B-5: 블로그 카드 아이콘 — src/components/blog/ArticleCard.tsx 의 iconMap 키와 1:1.
// 목록에 없는 이름을 넣으면 사이트가 조용히 Newspaper 로 폴백하므로 select 로 제한.
// 신규 아이콘은 ArticleCard iconMap 에 추가한 뒤 이 목록에도 추가.
const BLOG_ICON_NAMES = [
  'Newspaper', 'Lightbulb', 'BarChart3', 'Users', 'ShieldCheck', 'Thermometer',
  'Sun', 'Zap', 'Package', 'Moon', 'Clock', 'Building2', 'Sparkles', 'LayoutGrid',
  'Heart', 'Gift', 'Eye', 'Coffee', 'Calendar', 'UserCheck', 'Tag', 'Rocket',
  'Flower2', 'CloudRain', 'Umbrella', 'TrendingDown', 'Sparkle', 'Snowflake',
  'ShoppingCart', 'PiggyBank', 'MapPin', 'Leaf', 'Handshake', 'GraduationCap',
  'ChefHat', 'BookOpen', 'Bike', 'Trophy', 'Trash2', 'Share2', 'PartyPopper',
  'MessageCircle', 'CreditCard', 'CalendarDays',
] as const;
const blogIconOptions = BLOG_ICON_NAMES.map((n) => ({ label: n, value: n }));

/** Industry icons for case studies — must exist in CaseStudyCard's iconMap.
 *  New icons: add here AND to the iconMap in src/components/case-studies/CaseStudyCard.tsx. */
const INDUSTRY_ICON_NAMES = [
  'Store', 'Building2', 'Pill', 'Coffee', 'Landmark', 'Warehouse',
  'ShoppingBag', 'ShoppingCart', 'Hospital', 'Factory', 'MapPin', 'Building',
] as const;
const industryIconOptions = INDUSTRY_ICON_NAMES.map((n) => ({ label: n, value: n }));

/** Doc list/sidebar icons — must exist in src/components/docs/docIcons.tsx docIconMap. */
const DOC_ICON_NAMES = [
  'BookOpen', 'Rocket', 'Server', 'BarChart3', 'Camera', 'CreditCard', 'LayoutGrid', 'Code',
  'ShieldCheck', 'Database', 'UserCheck', 'Scale', 'Grid3x3', 'TrendingUp', 'FileText', 'Calendar',
  'HelpCircle', 'Lightbulb', 'SlidersHorizontal', 'ShieldAlert',
] as const;
const docIconOptions = DOC_ICON_NAMES.map((n) => ({ label: n, value: n }));

/** An id-keyed array item: a fixed id (structure lives in code) + localized copy fields. */
const idItem = (
  label: string,
  itemLabel: string,
  copy: Record<string, ReturnType<typeof fields.object>>,
) =>
  fields.array(
    fields.object({ id: fields.text({ label: 'ID (코드와 연결 — 변경 금지)' }), ...copy }),
    { label, itemLabel: (p) => p.fields.id.value || itemLabel },
  );

/**
 * Keystatic CMS — Phase 0 (local mode).
 * Proof slice: the homepage master copy as an editable, per-locale singleton.
 * Admin UI at /keystatic (dev/server only — stripped from the static export).
 * Storage stays in-repo (content/) so edits become git commits.
 */

/** A KO/EN/JP text triple — mirrors the site's i18n shape. */
const localized = (label: string) =>
  fields.object(
    {
      ko: fields.text({ label: 'KO', multiline: true }),
      en: fields.text({ label: 'EN', multiline: true }),
      jp: fields.text({ label: 'JP', multiline: true }),
    },
    { label },
  );

/** A KO/EN/JP list of strings (e.g. a plan's bullet items). */
const localizedList = (label: string) =>
  fields.object(
    {
      ko: fields.array(fields.text({ label: 'KO' }), { label: 'KO', itemLabel: (p) => p.value }),
      en: fields.array(fields.text({ label: 'EN' }), { label: 'EN', itemLabel: (p) => p.value }),
      jp: fields.array(fields.text({ label: 'JP' }), { label: 'JP', itemLabel: (p) => p.value }),
    },
    { label },
  );

/** solutions 업종 허브 4종(retail·drug·food-beverage·large-space)의 공통 베이스 스키마.
 *  Retail(beforeAfter)·LargeSpace(mtmc)는 이 위에 추가 필드를 스프레드한다. */
const solBaseSchema = {
  badge: localized('업종 배지 (badge)'),
  heroTitle: localizedList('Hero 제목 · 2줄 (heroTitle)'),
  heroSub: localized('Hero 서브 (heroSub)'),
  heroCta: localized('Hero CTA (heroCta)'),
  scenariosEyebrow: localized('시나리오 eyebrow (scenariosEyebrow)'),
  scenariosHeading: localized('시나리오 제목 (scenariosHeading)'),
  scenarios: idItem('시나리오 (scenarios)', 'scenario', {
    tag: localized('태그 (tag)'),
    title: localized('제목 (title)'),
    body: localized('본문 (body)'),
  }),
  quote: localized('후기 인용 (quote)'),
  quoteName: localized('후기 이름 (quoteName)'),
  quoteRole: localized('후기 역할 (quoteRole)'),
  resultsLine: localized('사례 수치 한 줄 (resultsLine)'),
  resultsNote: localized('사례 수치 각주 (resultsNote)'),
  ctaEyebrow: localized('CTA eyebrow (ctaEyebrow)'),
  ctaTitle: localizedList('CTA 제목 · 2줄 (ctaTitle)'),
  ctaSub: localized('CTA 서브 (ctaSub)'),
  ctaButton: localized('CTA 버튼 (ctaButton)'),
};

export default config({
  // GitHub 모드: 편집이 DeepingSource/ds-hp-temp 에 커밋됨. 편집자는 /keystatic 에서
  // GitHub 로그인(App: deepingsource-hp-cms). env(KEYSTATIC_GITHUB_*·KEYSTATIC_SECRET·
  // NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG) 필요 — docs/PHASE_C_github-mode-setup.md 참고.
  storage: {
    kind: 'github',
    repo: { owner: 'DeepingSource', name: 'ds-hp-temp' },
  },
  ui: {
    brand: { name: 'DEEPINGSOURCE' },
    // 그룹명이 온보딩 역할 — 시작하기 → 자주 편집 순으로 시선 유도 (C-1·G-1).
    navigation: {
      '시작하기': ['editorGuide'],
      '블로그': ['articles'],
      '케이스스터디': ['caseStudies'],
      '문서 · 용어 사전': ['docs', 'glossary'],
      'FAQ': ['faq'],
      '이벤트': ['events'],
      '자주 편집': ['home', 'pricing', 'news', 'company'],
      '페이지 카피 · 제품': ['products', 'storeAgent', 'saai', 'technology', 'agenticAi'],
      '페이지 카피 · 회사': ['about', 'solutions', 'contact', 'enterprise', 'resources', 'leadership', 'team', 'milestones', 'career'],
      '페이지 카피 · 업종': ['retail', 'drug', 'foodBeverage', 'largeSpace', 'solutionPages'],
      '문제 진단': ['diagnosisQuestions', 'diagnosisFlow'],
      '법무 (검토 후 편집)': ['privacyDoc', 'termsDoc'],
    },
  },
  collections: {
    // 블로그 글 — Velite 가 읽는 것과 같은 content/articles/*.mdx 를 직접 편집.
    // 플랫 구조(Phase B-1)라 path 의 * 가 곧 slug/파일명. 중간 싱크 불필요.
    articles: collection({
      label: '블로그 글',
      path: 'content/articles/*',
      slugField: 'slug',
      format: { contentField: 'body' },
      // 본문 전체 폭 + 메타데이터 사이드 패널 (KEYSTATIC_ENHANCEMENT_PLAN C-2).
      entryLayout: 'content',
      // 196편+ 스캔성 — 제목·날짜 외에 카테고리·언어·초안 노출 (C-3).
      columns: ['title', 'date', 'category', 'lang', 'draft'],
      schema: {
        title: fields.text({
          label: '제목',
          description: 'OG·검색결과 제목. 70자 이내 권장(잘림 방지).',
          validation: { isRequired: true, length: { max: 70 } },
        }),
        slug: fields.slug({ name: { label: 'URL 슬러그 (파일명 = URL 경로)' } }),
        excerpt: fields.text({
          label: '요약 (목록·OG용 한 줄)',
          description: '목록 카드·검색결과·SNS 공유에 노출되는 1~2문장.',
          multiline: true,
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: '카테고리',
          description: '가이드·주간은 회사 블로그 목록에서 제외됨(saai.store 성격).',
          options: [
            { label: '가이드', value: 'guide' },
            { label: '케이스스터디', value: 'case-study' },
            { label: '인사이트', value: 'insight' },
            { label: '주간', value: 'weekly' },
          ],
          defaultValue: 'insight',
        }),
        date: fields.date({
          label: '게시일',
          description: '미래 날짜 = 해당일 00시(KST) 이후 자동 발행(예약). 재빌드 시 반영.',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        readTime: fields.integer({
          label: '읽기 시간(분) — 비우면 자동 계산',
          description: '비우면 본문 분량으로 자동 추정. 특별한 경우만 직접 입력.',
        }),
        tags: fields.array(fields.text({ label: '태그' }), {
          label: '태그',
          description: '항목별 추가. 기존 태그를 재사용하면 묶임이 좋아집니다.',
          itemLabel: (p) => p.value,
        }),
        icon: fields.select({
          label: '아이콘 (목록 카드)',
          description: '목록 카드에 표시되는 Lucide 아이콘. 목록에서 선택(직접 입력 시 조용히 기본 아이콘으로 대체됨).',
          options: blogIconOptions,
          defaultValue: 'Newspaper',
        }),
        cover: fields.image({
          label: '커버 이미지',
          description: '2:1 비율 권장, webp·500KB 이하. 목록·글 상단·OG에 사용.',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        coverAlt: fields.text({
          label: '커버 대체텍스트',
          description: '커버를 넣었다면 접근성을 위해 꼭 채워주세요(비우면 제목 사용).',
        }),
        lang: fields.select({
          label: '언어',
          options: [
            { label: '한국어', value: 'ko' },
            { label: 'English', value: 'en' },
            { label: '日本語', value: 'jp' },
          ],
          defaultValue: 'ko',
        }),
        target: fields.select({
          label: '타깃',
          options: [
            { label: 'company (회사 블로그)', value: 'company' },
            { label: 'saai (이관 큐)', value: 'saai' },
          ],
          defaultValue: 'company',
        }),
        // B-2: 초안 — 체크 시 사이트에 노출 안 됨(리포엔 커밋됨). 쓰다 만 글 저장용.
        draft: fields.checkbox({
          label: '초안 (사이트에 노출 안 됨)',
          description: '체크하면 발행되지 않고 리포에만 저장됩니다. 발행하려면 체크 해제.',
          defaultValue: false,
        }),
        // A-1: relatedSlugs 는 Velite·getRelatedArticles 가 쓰는 필드. 스키마에 없으면
        // 편집자가 저장만 해도 프론트매터에서 삭제됨 → relationship 배열로 편입(오타 방지).
        relatedSlugs: fields.array(
          fields.relationship({ label: '관련 글', collection: 'articles' }),
          { label: '관련 글 (수동 지정)', itemLabel: (p) => p.value ?? '(선택)' },
        ),
        // B-1: 본문 인라인 이미지 업로드 대상 — 미설정 시 content/ 옆에 저장돼 사이트에서 안 보임.
        body: fields.mdx({
          label: '본문',
          components: blogComponents,
          options: {
            image: { directory: 'public/images/blog', publicPath: '/images/blog/' },
          },
        }),
      },
    }),
    // 케이스스터디 — content/case-studies/*.mdx (Velite 가 읽는 것과 동일). 블로그와
    // 같은 -ko/-jp 접미사 컨벤션(파일명 = slug). 지표·인용은 구조화 배열이라 카드 UI 를
    // 코드가 자동 렌더. 새 케이스를 저장하면 재빌드에 목록·상세로 누적됨(코드 PR 불필요).
    caseStudies: collection({
      label: '케이스스터디',
      path: 'content/case-studies/*',
      slugField: 'slug',
      format: { contentField: 'body' },
      entryLayout: 'content',
      columns: ['title', 'industry', 'goldenStep', 'lang', 'draft'],
      schema: {
        title: fields.text({
          label: '헤드라인',
          description: '카드·상세페이지 제목. 70자 이내 권장.',
          validation: { isRequired: true, length: { max: 70 } },
        }),
        slug: fields.slug({ name: { label: 'URL 슬러그 (파일명 = URL 경로. ko/jp 는 -ko/-jp 접미사)' } }),
        sub: fields.text({
          label: '서브헤드라인 (목록 카드용 한 줄)',
          multiline: true,
          validation: { isRequired: true },
        }),
        context: fields.text({
          label: '도입부 본문 (상세페이지 상단 서술)',
          multiline: true,
          validation: { isRequired: true },
        }),
        industry: fields.text({
          label: '산업 (예: 편의점 · 무인매장)',
          validation: { isRequired: true },
        }),
        industryIcon: fields.select({
          label: '산업 아이콘',
          description: '목록·상세 배지 아이콘. 새 아이콘은 개발자에게 요청(코드의 iconMap 과 동기화 필요).',
          options: industryIconOptions,
          defaultValue: 'Store',
        }),
        audience: fields.text({ label: '청자 (예: 점주, 본사 임원)' }),
        goldenStep: fields.select({
          label: 'Golden Case 단계',
          description: '더 이상 "1건당 1단계 고정"이 아님 — 같은 단계에 여러 케이스가 쌓일 수 있음.',
          options: [
            { label: '01 발견 (Discover)', value: 'discover' },
            { label: '02 검증 (Verify)', value: 'verify' },
            { label: '03 번역 (Translate)', value: 'translate' },
            { label: '04 전파 (Sync)', value: 'sync' },
            { label: '05 재측정 (Re-measure)', value: 'remeasure' },
          ],
          defaultValue: 'discover',
        }),
        products: fields.array(fields.text({ label: '제품 태그' }), {
          label: '사용 제품',
          itemLabel: (p) => p.value,
        }),
        before: fields.text({ label: 'Before', multiline: true }),
        after: fields.text({ label: 'After', multiline: true }),
        metrics: fields.array(
          fields.object({
            label: fields.text({ label: '지표명' }),
            value: fields.text({ label: '값' }),
            verified: fields.checkbox({ label: '실측 여부 (체크 해제 = 예시/가상)' }),
          }),
          { label: '핵심 숫자', itemLabel: (p) => p.fields.label.value || '(지표)' },
        ),
        quotes: fields.array(
          fields.object({
            text: fields.text({ label: '인용문', multiline: true }),
            who: fields.text({ label: '출처 (예: 서초구 편의점 조OO)' }),
          }),
          { label: '인용', itemLabel: (p) => p.fields.who.value || '(인용)' },
        ),
        note: fields.text({ label: '마무리 노트 (카드 하단 회색 문구)', multiline: true }),
        cover: fields.image({
          label: '커버 이미지 (선택 — 없으면 아이콘 배지로 대체)',
          directory: 'public/images/case-studies',
          publicPath: '/images/case-studies/',
        }),
        coverAlt: fields.text({ label: '커버 대체텍스트' }),
        showAdoptionChart: fields.checkbox({
          label: '도입 전후 차트 표시 (store care 53개 매장 차트)',
          defaultValue: false,
        }),
        lang: fields.select({
          label: '언어',
          options: [
            { label: '한국어', value: 'ko' },
            { label: 'English', value: 'en' },
            { label: '日本語', value: 'jp' },
          ],
          defaultValue: 'ko',
        }),
        date: fields.date({
          label: '게시일',
          description: '미래 날짜 = 해당일 이후 자동 발행(예약). 재빌드 시 반영.',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        featured: fields.checkbox({
          label: '대표 노출 (목록 상단 고정)',
          defaultValue: false,
        }),
        draft: fields.checkbox({
          label: '초안 (사이트에 노출 안 됨)',
          defaultValue: false,
        }),
        body: fields.mdx({
          label: '심화 서술 (선택 — 상세페이지 하단, 없으면 미노출)',
          options: {
            image: { directory: 'public/images/case-studies', publicPath: '/images/case-studies/' },
          },
        }),
      },
    }),
    // 제품 문서(위키) — content/docs/*.mdx (Velite 가 읽는 것과 동일). URL 은
    // /resources/docs/[slug] 고정, 로케일 번역은 파일명 -en/-jp 접미사(URL 은 접미사 없음).
    // 사이드바·prev/next 는 section·order 에서 자동 생성.
    docs: collection({
      label: '제품 문서 (docs)',
      path: 'content/docs/*',
      slugField: 'slug',
      format: { contentField: 'body' },
      entryLayout: 'content',
      columns: ['title', 'section', 'order', 'lang', 'draft'],
      schema: {
        title: fields.text({
          label: '제목',
          description: '문서 제목(사이드바·목록·메타). 70자 이내 권장.',
          validation: { isRequired: true, length: { max: 70 } },
        }),
        slug: fields.slug({ name: { label: 'URL 슬러그 (파일명. 번역은 -en/-jp 접미사, URL 은 접미사 없음)' } }),
        excerpt: fields.text({
          label: '요약 (목록·메타용 한 줄)',
          multiline: true,
        }),
        section: fields.select({
          label: '사이드바 섹션',
          options: [
            { label: '시작하기', value: 'getting-started' },
            { label: '연동 가이드', value: 'integration' },
            { label: '프라이버시 & 보안', value: 'privacy' },
            { label: '분석 활용', value: 'analytics' },
            { label: '제품 매뉴얼', value: 'manual' },
          ],
          defaultValue: 'getting-started',
        }),
        order: fields.integer({
          label: '섹션 내 순서',
          description: '작을수록 위. prev/next 자동 내비게이션의 근거.',
          defaultValue: 0,
        }),
        parent: fields.text({ label: '상위 문서 슬러그 (선택 — 매뉴얼 챕터 중첩)' }),
        icon: fields.select({
          label: '아이콘',
          options: docIconOptions,
          defaultValue: 'BookOpen',
        }),
        lang: fields.select({
          label: '언어',
          options: [
            { label: '한국어', value: 'ko' },
            { label: 'English', value: 'en' },
            { label: '日本語', value: 'jp' },
          ],
          defaultValue: 'ko',
        }),
        draft: fields.checkbox({
          label: '초안 (사이트에 노출 안 됨 · "준비 중" 스텁)',
          defaultValue: false,
        }),
        access: fields.select({
          label: '접근',
          description: 'gated = 공유 액세스 코드 필요(코드 입력 전엔 열람 불가). 활성화 조건: Vercel env DOCS_ACCESS_SECRET·DOCS_ACCESS_CODES 설정. 미설정 시 fail-closed(누구도 열람 불가).',
          options: [
            { label: '공개 (public)', value: 'public' },
            { label: '제한 (gated)', value: 'gated' },
          ],
          defaultValue: 'public',
        }),
        updated: fields.date({ label: '최종 수정일 (선택)' }),
        relatedSlugs: fields.array(fields.text({ label: '슬러그' }), {
          label: '이어서 읽기 (관련 문서 슬러그)',
          itemLabel: (p) => p.value,
        }),
        relatedTerms: fields.array(fields.text({ label: '용어 슬러그' }), {
          label: '관련 용어 (glossary 슬러그)',
          itemLabel: (p) => p.value,
        }),
        body: fields.mdx({
          label: '본문',
          components: blogComponents,
          options: {
            image: { directory: 'public/images/docs', publicPath: '/images/docs/' },
          },
        }),
      },
    }),
    // FAQ — content/faq/*.mdx. 질문=frontmatter, 답변=본문(MDX). group·order 로
    // /resources/faq 섹션·정렬 자동. 번역은 -en/-jp 접미사(질문/답변 각 로케일 파일).
    // 답변 안의 내부 링크는 `/contact` 처럼 plain 경로로 쓰면 렌더러가 로케일화한다.
    faq: collection({
      label: 'FAQ',
      path: 'content/faq/*',
      slugField: 'slug',
      format: { contentField: 'body' },
      entryLayout: 'content',
      columns: ['question', 'group', 'order', 'lang'],
      schema: {
        question: fields.text({ label: '질문', validation: { isRequired: true } }),
        slug: fields.slug({ name: { label: 'URL 슬러그 (파일명. 번역은 -en/-jp 접미사)' } }),
        group: fields.select({
          label: '그룹 (FAQ 섹션)',
          options: [
            { label: '공통', value: 'common' },
            { label: 'store care', value: 'store-care' },
            { label: 'store insight', value: 'store-insight' },
            { label: 'store agent', value: 'store-agent' },
          ],
          defaultValue: 'common',
        }),
        order: fields.integer({ label: '그룹 내 순서', defaultValue: 0 }),
        lang: fields.select({
          label: '언어',
          options: [
            { label: '한국어', value: 'ko' },
            { label: 'English', value: 'en' },
            { label: '日本語', value: 'jp' },
          ],
          defaultValue: 'ko',
        }),
        draft: fields.checkbox({ label: '초안 (노출 안 됨)', defaultValue: false }),
        body: fields.mdx({ label: '답변', components: blogComponents }),
      },
    }),

    // 이벤트 — content/events/*.mdx. 컨벤션·박람회·웨비나 페이지(SITE_IMPROVEMENT P2-2).
    // URL /events/<슬러그> 고정. 번역은 -en/-jp 접미사. publishUntil 경과 시 목록에서 빠지고
    // 페이지는 "지난 이벤트" 아카이브로 남는다. noindex = 초청 전용(검색·sitemap 제외).
    events: collection({
      label: '이벤트',
      path: 'content/events/*',
      slugField: 'slug',
      format: { contentField: 'body' },
      entryLayout: 'content',
      columns: ['title', 'startDate', 'venue', 'lang', 'draft'],
      schema: {
        title: fields.text({ label: '제목', validation: { isRequired: true } }),
        slug: fields.slug({ name: { label: 'URL 슬러그 (/events/<슬러그>. 번역은 -en/-jp 접미사)' } }),
        subtitle: fields.text({ label: '부제 (한 줄 소개)', multiline: true }),
        venue: fields.text({ label: '장소 (venue · 예: COEX Hall C)' }),
        startDate: fields.date({ label: '시작일', validation: { isRequired: true } }),
        endDate: fields.date({ label: '종료일 (선택 · 하루면 비움)' }),
        publishFrom: fields.date({ label: '노출 시작일 (선택 · 이 날짜부터 목록 노출)' }),
        publishUntil: fields.date({ label: '노출 종료일 (선택 · 경과 시 목록에서 제외, 페이지는 아카이브 유지)' }),
        cover: fields.text({ label: '커버 이미지 경로 (선택 · /images/events/...)' }),
        coverAlt: fields.text({ label: '커버 대체텍스트' }),
        ctaLabel: fields.text({ label: 'CTA 버튼 라벨 (선택 · 예: 사전 등록)' }),
        ctaHref: fields.text({ label: 'CTA 링크 (선택)' }),
        lang: fields.select({
          label: '언어',
          options: [
            { label: '한국어', value: 'ko' },
            { label: 'English', value: 'en' },
            { label: '日本語', value: 'jp' },
          ],
          defaultValue: 'ko',
        }),
        draft: fields.checkbox({ label: '초안 (노출 안 됨)', defaultValue: false }),
        noindex: fields.checkbox({ label: '검색 비노출 (noindex · 초청 전용 페이지)', defaultValue: false }),
        body: fields.mdx({
          label: '본문',
          components: blogComponents,
          options: { image: { directory: 'public/images/events', publicPath: '/images/events/' } },
        }),
      },
    }),

    // 용어 사전 — content/glossary/*.yaml (구조화 데이터, MDX 아님). 한 파일 = 한 용어.
    // URL /glossary/<슬러그> 고정. title/tagline/definition 은 KO/EN/JP 3벌; body(섹션)·
    // saaiUsage·metaDescription 은 KO. definition 은 DefinedTerm JSON-LD(AEO) 로 소비되니
    // 정확히 작성. gen-site-content 가 order 순으로 컴파일한다.
    glossary: collection({
      label: '용어 사전',
      path: 'content/glossary/*',
      slugField: 'slug',
      format: { data: 'yaml' },
      columns: ['slug', 'category', 'order'],
      schema: {
        slug: fields.slug({ name: { label: 'URL 슬러그 (파일명 = /glossary/<슬러그>. 영문 kebab-case, 변경 시 URL 변경)' } }),
        order: fields.integer({
          label: '정렬 순서',
          description: '용어 사전 페이지에서 카테고리 안 표시 순서(오름차순).',
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: '카테고리',
          options: [
            { label: 'AI 기술 (ai)', value: 'ai' },
            { label: '데이터 분석 (analytics)', value: 'analytics' },
            { label: '리테일 (retail)', value: 'retail' },
            { label: '매장 운영 (operations)', value: 'operations' },
          ],
          defaultValue: 'analytics',
        }),
        englishTitle: fields.text({
          label: '영문 명칭 (englishTitle)',
          description: '카드·상세 부제로 노출. 예: Store Heatmap',
          validation: { isRequired: true },
        }),
        title: localized('용어명 (title)'),
        tagline: localized('한 줄 요약 (tagline)'),
        definition: localized('핵심 정의 (definition · DefinedTerm JSON-LD 소비 — AEO 핵심)'),
        relatedTerms: fields.array(fields.text({ label: '용어 슬러그' }), {
          label: '관련 용어 (glossary 슬러그)',
          itemLabel: (p) => p.value,
        }),
        relatedIndustries: fields.array(fields.text({ label: '업종 슬러그' }), {
          label: '관련 업종 (industry 슬러그)',
          itemLabel: (p) => p.value,
        }),
        // 상세 본문도 ko/en/jp. en/jp를 비워두면 화면은 ko로 폴백한다(기존 동작 유지).
        saaiUsage: localized('SAAI에서의 활용 (saaiUsage) — 상세 하단 다크 박스'),
        metaDescription: localized('메타 설명 (metaDescription · 검색결과 스니펫)'),
        body: fields.array(
          fields.object({
            heading: localized('소제목 (heading)'),
            paragraphs: localizedList('문단들 (paragraphs)'),
          }),
          { label: '본문 섹션', itemLabel: (p) => p.fields.heading.fields.ko.value || '섹션' },
        ),
      },
    }),

    // 솔루션 시나리오 — content/solutions/*.yaml (구조화 데이터, MDX 아님). 한 파일 = 한
    // /solutions/<슬러그> 랜딩페이지. title/excerpt/impact/impactLabel·background.heading·
    // cause/step 제목·result 라벨은 KO/EN/JP; problem·본문·desc·stat·metaDescription 은 KO.
    // step 의 productLabel(01 감지 · saai care)·색상, 업종 라벨은 코드에서 파생(저장 안 함).
    solutionPages: collection({
      label: '솔루션 시나리오',
      path: 'content/solutions/*',
      slugField: 'slug',
      format: { data: 'yaml' },
      columns: ['slug', 'industry', 'order'],
      schema: {
        slug: fields.slug({ name: { label: 'URL 슬러그 (/solutions/<슬러그>. 영문 kebab-case)' } }),
        order: fields.integer({
          label: '정렬 순서',
          description: '/solutions 목록에서 업종 안 표시 순서(오름차순).',
          validation: { isRequired: true },
        }),
        industry: fields.select({
          label: '업종',
          options: [
            { label: '편의점 (convenience)', value: 'convenience' },
            { label: '카페·음식점 (cafe)', value: 'cafe' },
            { label: '무인매장 (unmanned)', value: 'unmanned' },
            { label: '드럭스토어 (drugstore)', value: 'drugstore' },
            { label: '대형마트 (mart)', value: 'mart' },
            { label: '전시 공간 (exhibition)', value: 'exhibition' },
            { label: '물류·창고 (logistics)', value: 'logistics' },
            { label: '패션·의류 (fashion)', value: 'fashion' },
          ],
          defaultValue: 'convenience',
        }),
        title: localized('제목 (title)'),
        excerpt: localized('한 줄 요약 (excerpt)'),
        impact: localized('핵심 지표 값 (impact · 예: -68%. 보통 EN/JP 는 비워 KO 공유)'),
        impactLabel: localized('지표 라벨 (impactLabel)'),
        problem: fields.text({ label: '문제 정의 (problem · KO)', multiline: true, validation: { isRequired: true } }),
        background: fields.object(
          {
            heading: localized('배경 소제목 (heading)'),
            body: fields.text({ label: '배경 본문 (body · KO)', multiline: true }),
          },
          { label: '배경 (background)' },
        ),
        causes: fields.array(
          fields.object({
            title: localized('원인 제목 (title)'),
            desc: fields.text({ label: '원인 설명 (desc · KO)', multiline: true }),
          }),
          { label: '원인 (causes)', itemLabel: (p) => p.fields.title.fields.ko.value || '원인' },
        ),
        steps: fields.array(
          fields.object({
            product: fields.select({
              label: '제품 (단계 = 감지→분석→실행)',
              options: [
                { label: 'saai care (01 감지)', value: 'StoreCare' },
                { label: 'saai insight (02 분석)', value: 'StoreInsight' },
                { label: 'saai agent (03 실행)', value: 'StoreAgent' },
              ],
              defaultValue: 'StoreCare',
            }),
            title: localized('단계 제목 (title)'),
            desc: fields.text({ label: '단계 설명 (desc · KO)', multiline: true }),
          }),
          { label: '해결 단계 (steps)', itemLabel: (p) => p.fields.title.fields.ko.value || '단계' },
        ),
        results: fields.array(
          fields.object({
            stat: fields.text({ label: '수치 (stat · 예: -68% · 98.2%)' }),
            label: localized('라벨 (label)'),
          }),
          { label: '성과 (results)', itemLabel: (p) => p.fields.stat.value || '성과' },
        ),
        metaDescription: fields.text({ label: '메타 설명 (KO · 검색결과 스니펫)', multiline: true }),
        relatedTerms: fields.array(fields.text({ label: '용어 슬러그' }), {
          label: '관련 용어 (glossary 슬러그)',
          itemLabel: (p) => p.value,
        }),
        relatedSolutions: fields.array(fields.text({ label: '솔루션 슬러그' }), {
          label: '관련 솔루션 (solution 슬러그)',
          itemLabel: (p) => p.value,
        }),
        diagnosis: fields.object({
          cluster: fields.select({
            label: '문제 클러스터 (cluster)',
            options: [
              { label: '도난·손실 (theft_loss)', value: 'theft_loss' },
              { label: '재고 (inventory)', value: 'inventory' },
              { label: '진열·머천다이징 (merchandising)', value: 'merchandising' },
              { label: '혼잡·대기 (congestion)', value: 'congestion' },
              { label: '작업 효율·안전 (ops_safety)', value: 'ops_safety' },
              { label: '보안·이상 감지 (security_ops)', value: 'security_ops' },
            ],
            defaultValue: 'merchandising',
          }),
          attributes: fields.object({
            symptom: fields.array(fields.text({ label: '증상 값' }), {
              label: '증상 태그 (symptom — 증상 질문 옵션과 대응, 빌드 검증 ②의 어휘)',
              itemLabel: (p) => p.value,
            }),
            persona: fields.array(fields.text({ label: 'persona' }), {
              label: '적합 페르소나 (owner/hq_sv/exec)',
              itemLabel: (p) => p.value,
            }),
            scale: fields.array(fields.text({ label: 'scale' }), {
              label: '적합 규모 (single/small/mid/large)',
              itemLabel: (p) => p.value,
            }),
          }, { label: '속성 태그 (attributes)' }),
          prior: fields.number({ label: '사전 가중치 (prior · 기본 1)', defaultValue: 1 }),
        }, { label: '진단 태그 (diagnosis — 문제 진단이 이 시나리오를 결과로 고르는 근거)' }),
      },
    }),
    // 문제 진단 질문 뱅크 (diagnosis-v4-engine-plan §2-2 · MASTER 3-4).
    // 편집 후 빌드 시 gen-site-content 검증 5종이 오류를 한국어로 알려준다
    // (3로케일 누락·고아 증거·존재하지 않는 결과 slug 등은 빌드가 중단됨).
    diagnosisQuestions: collection({
      label: '진단 질문 (diagnosis)',
      path: 'content/diagnosis/questions/*',
      slugField: 'id',
      format: { data: 'yaml' },
      columns: ['id', 'phase', 'order'],
      schema: {
        id: fields.slug({ name: { label: '질문 ID (id · 코드/flow와 연결 — 변경 금지)' } }),
        group: fields.text({ label: '그룹 (group · flow의 @group 참조)' }),
        phase: fields.select({
          label: '단계 (phase)',
          options: [
            { label: 'context (역할·업종·규모)', value: 'context' },
            { label: 'problem (문제 영역)', value: 'problem' },
            { label: 'refine (증상·타이브레이크)', value: 'refine' },
            { label: 'confirm (확인 — E3)', value: 'confirm' },
          ],
          defaultValue: 'refine',
        }),
        kind: fields.select({
          label: '렌더 종류 (kind)',
          options: [
            { label: '칩 랩 (chip-wrap)', value: 'chip-wrap' },
            { label: '업종 그리드 (industry-grid)', value: 'industry-grid' },
            { label: '클러스터 리스트 (cluster-list)', value: 'cluster-list' },
            { label: '옵션 리스트 (option-list)', value: 'option-list' },
          ],
          defaultValue: 'option-list',
        }),
        order: fields.integer({ label: '순서 (order · 그룹 내 우선순위)', defaultValue: 50 }),
        signal: fields.text({ label: '신호 (signal · persona/industry/scale/cluster/symptom/goal — 없으면 빈칸)' }),
        appliesWhen: fields.object({
          industry: fields.array(fields.text({ label: '업종 slug' }), { label: '업종 조건', itemLabel: (p) => p.value }),
          persona: fields.array(fields.text({ label: 'persona' }), { label: '역할 조건', itemLabel: (p) => p.value }),
          cluster: fields.array(fields.text({ label: '클러스터 복합키' }), { label: '클러스터 조건 (industry:cluster)', itemLabel: (p) => p.value }),
        }, { label: '출제 조건 (appliesWhen — 전부 비우면 항상 출제)' }),
        text: localized('질문 문장 (text)'),
        ack: localized('반응 멘트 (ack · {label} 보간 가능 — 선택)'),
        confirm: fields.object({
          text: localized('확인 질문 ({label} 보간)'),
          yes: localized('긍정 칩'),
          no: localized('부정 칩'),
        }, { label: '프리셋 확인 칩 (industry 질문 전용)' }),
        options: fields.array(
          fields.object({
            id: fields.text({ label: '옵션 ID (id)' }),
            label: localized('라벨 (label)'),
            result: fields.text({ label: '결과 slug (result · 타이브레이크 전용)' }),
            ack: localized('옵션 반응 멘트 (선택)'),
            evidence: fields.array(
              fields.object({
                attribute: fields.text({ label: '속성 (symptom/persona/scale/goal)' }),
                value: fields.text({ label: '값' }),
                weight: fields.number({ label: '가중치 (E1은 1)', defaultValue: 1 }),
              }),
              { label: '증거 (evidence)', itemLabel: (p) => `${p.fields.attribute.value}=${p.fields.value.value}` },
            ),
          }),
          { label: '선택지 (options — industry/cluster 질문은 비움: 런타임 파생)', itemLabel: (p) => p.fields.id.value || '옵션' },
        ),
        universalOptions: fields.array(
          fields.object({
            id: fields.text({ label: '옵션 ID' }),
            label: localized('라벨'),
          }),
          { label: '공통 탈출 옵션 (problem-cluster 전용)', itemLabel: (p) => p.fields.id.value || '옵션' },
        ),
      },
    }),
  },
  singletons: {
    // 문제 진단 흐름 (diagnosis-v4-engine-plan §2-3) — selector 한 줄이 E1(fixed)
    // ↔ E3(adaptive) 전환 스위치. exits·순서도 여기서만 정의한다(단일 지점).
    diagnosisFlow: singleton({
      label: '진단 흐름 (diagnosis flow)',
      path: 'content/diagnosis/flow',
      format: { data: 'yaml' },
      schema: {
        selector: fields.select({
          label: '질문 선택기 (selector)',
          options: [
            { label: '고정 순서 (fixed — E1)', value: 'fixed' },
            { label: '적응형 (adaptive — E3)', value: 'adaptive' },
          ],
          defaultValue: 'fixed',
        }),
        fixedOrder: fields.array(fields.text({ label: '질문 id 또는 @group' }), {
          label: '고정 순서 (fixedOrder)',
          itemLabel: (p) => p.value,
        }),
        adaptive: fields.object({
          minQuestions: fields.integer({ label: '최소 질문 수', defaultValue: 4 }),
          maxQuestions: fields.integer({ label: '최대 질문 수', defaultValue: 7 }),
          confirmThreshold: fields.number({ label: '확인 스텝 임계 (top1/top2 점수비)', defaultValue: 2 }),
          maxRejects: fields.integer({ label: '확인 부정 허용 횟수', defaultValue: 1 }),
        }, { label: '적응형 설정 (adaptive — E3 예약)' }),
        exits: fields.array(
          fields.object({
            question: fields.text({ label: '질문 id' }),
            option: fields.text({ label: '옵션 id' }),
            to: fields.text({ label: '이탈 종류 (exit-owner/exit-privacy/exit-unsure)' }),
          }),
          { label: '이탈 규칙 (exits)', itemLabel: (p) => `${p.fields.question.value}:${p.fields.option.value} → ${p.fields.to.value}` },
        ),
      },
    }),
    // G-1: CMS 안의 편집 가이드. 편집자는 /keystatic 에서 읽고, 이 문서 자체도 CMS 로
    // 유지보수됨. 같은 파일을 사이트 /help(noindex) 에서도 렌더한다.
    editorGuide: singleton({
      label: '📖 편집 가이드 (먼저 읽어주세요)',
      path: 'content/editor/guide',
      format: { contentField: 'body' },
      schema: {
        body: fields.mdx({ label: '가이드 본문' }),
      },
    }),
    home: singleton({
      label: 'Home — master copy',
      path: 'content/site/home',
      format: { data: 'yaml' },
      schema: {
        masterCompany: localized('본사 마스터 카피 (masterCompany)'),
        masterOwner: localized('점주 마스터 카피 (masterOwner)'),
        heroSub: localized('Hero 서브카피 (heroSub)'),
        ctaPrimary: localized('CTA · Primary (ctaPrimary)'),
        ctaSecondary: localized('CTA · Secondary (ctaSecondary)'),
      },
    }),
    products: singleton({
      label: 'Products — 제품 허브 카피',
      path: 'content/site/products',
      format: { data: 'yaml' },
      schema: {
        eyebrow: localized('Eyebrow'),
        heroTitle: localized('Hero 제목 (heroTitle)'),
        heroSub: localized('Hero 서브 (heroSub)'),
        loopEyebrow: localized('운영 루프 Eyebrow (loopEyebrow)'),
        ownersEyebrow: localized('점주용 Eyebrow (ownersEyebrow)'),
        categoryTitle: localized('카테고리 제목 (categoryTitle)'),
        categoryBody: localized('카테고리 본문 (categoryBody)'),
        casesCta: localized('사례 CTA (casesCta)'),
        detail: localized('“자세히 보기” 라벨 (detail)'),
        visit: localized('“바로가기” 라벨 (visit)'),
        seedLine: localized('SEED 기술 한 줄 (seedLine)'),
        seedCta: localized('SEED CTA (seedCta)'),
        cta: localized('하단 CTA (cta)'),
        loop: idItem('운영 루프 제품 (loop)', 'product', {
          desc: localized('카드 한 줄 (desc)'),
        }),
        owners: idItem('점주용 사이트 (owners)', 'site', {
          desc: localized('카드 한 줄 (desc)'),
        }),
      },
    }),
    storeAgent: singleton({
      label: 'store agent — 제품 상세 카피',
      path: 'content/site/store-agent',
      format: { data: 'yaml' },
      schema: {
        heroTitle: localized('Hero 제목 (heroTitle)'),
        heroSub: localized('Hero 서브 (heroSub)'),
        ctaPrimary: localized('CTA · Primary (ctaPrimary)'),
        ctaSecondary: localized('CTA · Secondary (ctaSecondary)'),
        evolutionEyebrow: localized('진화 eyebrow (evolutionEyebrow)'),
        evolutionHeading: localized('진화 제목 (evolutionHeading)'),
        evolutionSub: localized('진화 서브 (evolutionSub)'),
        evolution: idItem('진화 3단계 — Viewer→Interactive→Proactive (evolution)', 'stage', {
          tag: localized('태그 (tag)'),
          title: localized('제목 (title)'),
          desc: localized('설명 (desc)'),
        }),
        evolutionProactiveCta: localized('Proactive 카드 앵커 CTA (evolutionProactiveCta)'),
        techBridgeText: localized('기술 페이지 링크 밴드 문구 (techBridgeText)'),
        techBridgeCta: localized('기술 페이지 링크 밴드 CTA (techBridgeCta)'),
        stepsHeading: localized('How-it-works 제목 (stepsHeading)'),
        stepsSub: localized('How-it-works 서브 (stepsSub)'),
        pricingHeading: localized('요금 티저 제목 (pricingHeading)'),
        pricingSub: localized('요금 티저 서브 (pricingSub)'),
        pricingCta: localized('요금 티저 CTA (pricingCta)'),
        finalHeading: localized('하단 CTA 제목 (finalHeading)'),
        finalSub: localized('하단 CTA 서브 (finalSub)'),
        finalCta: localized('하단 CTA 버튼 (finalCta)'),
        steps: idItem('운영 단계 (steps)', 'step', {
          title: localized('단계 제목 (title)'),
          desc: localized('단계 설명 (desc)'),
        }),
      },
    }),
    saai: singleton({
      label: 'saai.store — B2C 제품 카피',
      path: 'content/site/saai',
      format: { data: 'yaml' },
      schema: {
        heroBadge: localized('Hero 배지 (heroBadge)'),
        heroTitle: localized('Hero 제목 (heroTitle)'),
        heroSub: localized('Hero 서브 (heroSub)'),
        heroCta: localized('Hero CTA (heroCta)'),
        heroNote: localized('Hero 보조문구 (heroNote)'),
        loopEyebrow: localized('루프 Eyebrow (loopEyebrow)'),
        loopHeading: localized('루프 제목 (loopHeading)'),
        loopSub: localized('루프 서브 (loopSub)'),
        loopFootnote: localized('루프 각주 (loopFootnote)'),
        toolsEyebrow: localized('도구 Eyebrow (toolsEyebrow)'),
        toolsHeading: localized('도구 제목 (toolsHeading)'),
        toolsSub: localized('도구 서브 (toolsSub)'),
        trendNote: localized('trend fit 주석 (trendNote)'),
        planEyebrow: localized('요금 Eyebrow (planEyebrow)'),
        planHeading: localized('요금 제목 (planHeading)'),
        planSub: localized('요금 서브 (planSub)'),
        planNote: localized('요금 각주 (planNote)'),
        featureCta: localized('하단 CTA (featureCta)'),
        featureNote: localized('하단 보조문구 (featureNote)'),
        otherProducts: localized('“다른 제품” 링크 (otherProducts)'),
        loop: idItem('주간 운영 루프 (loop)', 'step', {
          name: localized('단계 이름 (name)'),
          role: localized('단계 역할 (role)'),
        }),
        tools: idItem('도구 (tools)', 'tool', {
          name: localized('도구 이름 (name)'),
          desc: localized('도구 설명 (desc)'),
        }),
        plans: idItem('요금제 (plans)', 'plan', {
          tier: localized('티어 (tier)'),
          price: localized('가격 (price)'),
          desc: localized('한 줄 설명 (desc)'),
          items: localizedList('포함 항목 (items)'),
        }),
      },
    }),
    solutions: singleton({
      label: 'Solutions — 업종 허브 카피',
      path: 'content/site/solutions',
      format: { data: 'yaml' },
      schema: {
        badge: localized('Hero 배지 (badge)'),
        heroTitle: localizedList('Hero 제목 · 2줄 (heroTitle)'),
        heroSub: localized('Hero 서브 (heroSub)'),
        total: localized('총 가이드 수 템플릿 — {n} 유지 (total)'),
        perIndustry: localized('업종별 카운트 템플릿 — {label} {n} 유지 (perIndustry)'),
        industryDetail: localized('“업종 상세” 라벨 (industryDetail)'),
        viewSolution: localized('“솔루션 보기” 라벨 (viewSolution)'),
        ctaEyebrow: localized('CTA Eyebrow (ctaEyebrow)'),
        ctaTitle: localizedList('CTA 제목 · 2줄 (ctaTitle)'),
        ctaSub: localizedList('CTA 서브 · 2줄 (ctaSub)'),
        ctaPrimary: localized('CTA · Primary (ctaPrimary)'),
        ctaSecondary: localized('CTA · Secondary (ctaSecondary)'),
      },
    }),
    enterprise: singleton({
      label: 'Enterprise — 본사 카피',
      path: 'content/site/enterprise',
      format: { data: 'yaml' },
      schema: {
        badge: localized('Hero 배지 (badge)'),
        category: localized('카테고리 라벨 (category)'),
        heroTitleA: localized('Hero 제목 A행 (heroTitleA)'),
        heroTitleB: localized('Hero 제목 B행 · 하이라이트 (heroTitleB)'),
        heroSub: localized('Hero 서브 (heroSub)'),
        ctaEmail: localized('보조 CTA · 이메일 (ctaEmail)'),
        emailSubject: localized('이메일 제목 (emailSubject)'),
        ownerEscape: localized('점주 분기 링크 (ownerEscape)'),
        challengesTitle: localized('Pain 제목 (challengesTitle)'),
        challengesSub: localized('Pain 서브 (challengesSub)'),
        challengesRoot: localized('Pain 한 뿌리 문장 (challengesRoot)'),
        spineEyebrow: localized('Spine Eyebrow (spineEyebrow)'),
        spineTitle: localized('Spine 제목 (spineTitle)'),
        spineBody: localized('Spine 본문 (spineBody)'),
        goldenDetailLabel: localized('Golden 5단계 아코디언 라벨 (goldenDetailLabel)'),
        goldenLink: localized('사례 5건 링크 라벨 (goldenLink)'),
        evidenceEyebrow: localized('증거 밴드 Eyebrow (evidenceEyebrow)'),
        evidenceQuote: localized('증거 밴드 인용 1줄 (evidenceQuote)'),
        dashboardEyebrow: localized('대시보드 Eyebrow (dashboardEyebrow)'),
        dashboardTitle: localized('대시보드 제목 (dashboardTitle)'),
        dashboardSub: localized('대시보드 서브 (dashboardSub)'),
        midCtaLead: localized('미드 CTA 리드 문장 (midCtaLead)'),
        processTitle: localized('도입 프로세스 제목 (processTitle)'),
        processSub: localized('도입 프로세스 서브 (processSub)'),
        faqEyebrow: localized('FAQ Eyebrow (faqEyebrow)'),
        faqTitle: localized('FAQ 제목 (faqTitle)'),
        faqSub: localized('FAQ 서브 (faqSub)'),
        ctaTitleA: localized('클로징 제목 A행 (ctaTitleA)'),
        ctaTitleB: localized('클로징 제목 B행 (ctaTitleB)'),
        ctaSub: localized('클로징 서브 (ctaSub)'),
        ctaReassure: localized('클로징 안심 문구 (ctaReassure)'),
      },
    }),
    about: singleton({
      label: 'About — 회사 소개 카피',
      path: 'content/site/about',
      format: { data: 'yaml' },
      // E-1 폼 다이어트: 섹션 중첩 — yaml 동일 중첩, gen-site-content가 평탄화(공개 shape 불변).
      schema: {
        hero: fields.object({
          badge: localized('Hero 배지 (badge)'),
          heroFactValues: localizedList('사실 스트립 값 · 4개 — {foundingYear}/{patents} 토큰 유지 (heroFactValues)'),
          heroFactLabels: localizedList('사실 스트립 라벨 · 4개 (heroFactLabels)'),
        }, { label: '히어로' }),
        vm: fields.object({
          missionStatement: localized('미션 스테이트먼트 (missionStatement)'),
          missionStatementSub: localized('미션 스테이트먼트 병기 (missionStatementSub)'),
          vision: localized('비전 문장 (vision) — Stage 6에서 렌더 연결 예정'),
          mission: localized('미션 문장 (mission) — Stage 6에서 렌더 연결 예정'),
        }, { label: '비전 · 미션' }),
        story: fields.object({
          storyHeading: localized('스토리 제목 (storyHeading)'),
          storySub: localized('스토리 서브 (storySub)'),
          namingDetail: localized('네이밍 카드 펼침 상세 — 창업 배경 (namingDetail)'),
        }, { label: '스토리' }),
        leadership: fields.object({
          leadershipEyebrow: localized('리더십 Eyebrow (leadershipEyebrow)'),
          leadershipHeading: localized('리더십 제목 (leadershipHeading)'),
          leadershipSub: localized('리더십 서브 (leadershipSub)'),
        }, { label: '리더십' }),
        partners: fields.object({
          partnersEyebrow: localized('파트너 Eyebrow (partnersEyebrow)'),
          partnersHeading: localized('파트너 제목 — {partnerBrands} 유지 (partnersHeading)'),
          partnersSub: localized('파트너 서브 — {industries} {nvidiaPartner} 유지 (partnersSub)'),
          partnerStatsNote: localized('파트너 통계 각주 (partnerStatsNote)'),
          partnerStatLabels: localizedList('파트너 통계 라벨 · 4개 (partnerStatLabels)'),
          certsLabel: localized('인증 섹션 라벨 (certsLabel)'),
          certs: idItem('인증 (certs · sub만 편집)', 'cert', {
            sub: localized('설명 (sub)'),
          }),
        }, { label: '파트너 · 인증' }),
        method: fields.object({
          methodEyebrow: localized('Method Eyebrow (methodEyebrow)'),
          methodHeading: localized('Method 제목 (methodHeading)'),
          methodIntro: localized('Method 인트로 (methodIntro)'),
          methodSteps: idItem('Method 단계 — 3층 다이어그램 카드 (methodSteps)', 'step', {
            title: localized('층 제목 (title)'),
            desc: localized('층 설명 (desc)'),
            tag: localized('층 태그 칩 (tag)'),
          }),
        }, { label: '일하는 방식 (3층 구조)' }),
        cta: fields.object({
          ctaHeading: localized('CTA 제목 — 줄바꿈 \\n 유지 (ctaHeading)'),
          ctaSub: localized('CTA 서브 (ctaSub)'),
          ctaButton: localized('CTA 버튼 (ctaButton)'),
        }, { label: 'CTA' }),
      },
    }),
    contact: singleton({
      label: 'Contact — 상담 폼 카피 (display)',
      path: 'content/site/contact',
      format: { data: 'yaml' },
      schema: {
        loading: localized('로딩 문구 (loading)'),
        eyebrow: localized('Eyebrow (eyebrow)'),
        provenLabel: localized('도입 효과 라벨 (provenLabel)'),
        provenText: localized('도입 효과 본문 (provenText)'),
        partnerLabel: localized('파트너 라벨 (partnerLabel)'),
        partnerText: localized('파트너 본문 (partnerText)'),
        contextFooter: localized('컨텍스트 푸터 (contextFooter)'),
        mobileTrustLabel: localized('모바일 신뢰 라벨 (mobileTrustLabel)'),
        mobileTrustBrands: localized('모바일 신뢰 브랜드 (mobileTrustBrands)'),
        formTitle: localized('폼 제목 (formTitle)'),
        formSubtitle: localized('폼 서브 (formSubtitle)'),
        nameLabel: localized('이름 라벨 (nameLabel)'),
        namePlaceholder: localized('이름 placeholder (namePlaceholder)'),
        contactLabel: localized('연락처 라벨 (contactLabel)'),
        contactPlaceholder: localized('연락처 placeholder (contactPlaceholder)'),
        storeCountLabel: localized('매장 수 라벨 (storeCountLabel)'),
        affiliationLabel: localized('소속 라벨 (affiliationLabel)'),
        brandLabel: localized('브랜드 라벨 (brandLabel)'),
        brandOptional: localized('“(선택)” (brandOptional)'),
        brandPlaceholder: localized('브랜드 placeholder (brandPlaceholder)'),
        selectPlaceholder: localized('선택 placeholder (selectPlaceholder)'),
        submit: localized('제출 버튼 (submit)'),
        submitting: localized('제출 중 (submitting)'),
        noticeBold: localized('안내 강조문 (noticeBold)'),
        backToHome: localized('홈으로 (backToHome)'),
        successTitle: localized('완료 제목 (successTitle)'),
        successSubtitle: localized('완료 서브 (successSubtitle)'),
        insightPrompt: localized('인사이트 프롬프트 (insightPrompt)'),
        insightLink: localized('인사이트 링크 (insightLink)'),
        errSubmitFailed: localized('오류 · 제출 실패 (errSubmitFailed)'),
        errTimeout: localized('오류 · 타임아웃 (errTimeout)'),
        errGeneric: localized('오류 · 일반 (errGeneric)'),
        cards: idItem('컨텍스트 카드 (cards)', 'card', {
          label: localized('제품명 (label)'),
          desc: localized('한 줄 설명 (desc)'),
        }),
      },
    }),
    pricing: singleton({
      label: 'Pricing — 요금 카피',
      path: 'content/site/pricing',
      format: { data: 'yaml' },
      // E-1 폼 다이어트: flat ~89필드 → 페이지 구조 그대로 9개 섹션(fields.object).
      // yaml도 동일 중첩 — gen-site-content.mjs가 평탄화해 생성 JSON(공개 shape)은 불변.
      schema: {
        hero: fields.object({
          heroTitle: localized('히어로 제목 (heroTitle)'),
          heroSub: localized('히어로 서브 (heroSub)'),
          toggleB2c: localized('토글 · 개별 매장 (toggleB2c)'),
          toggleB2b: localized('토글 · 프랜차이즈 (toggleB2b)'),
        }, { label: '히어로 · 토글' }),
        b2c: fields.object({
          b2cHeading: localized('B2C 제목 (b2cHeading)'),
          b2cSub: localized('B2C 서브 (b2cSub)'),
          careStep: localized('care 단계 (careStep)'),
          careDesc: localized('care 설명 (careDesc)'),
          carePerMonth: localized('care 월 단위 (carePerMonth)'),
          careFeatures: localizedList('care 특징 (careFeatures)'),
          insightStep: localized('insight 단계 (insightStep)'),
          insightDesc: localized('insight 설명 (insightDesc)'),
          insightPerMonth: localized('insight 월 단위 (insightPerMonth)'),
          insightBasis: localized('insight 기준 (insightBasis)'),
          insightFeatures: localizedList('insight 특징 (insightFeatures)'),
          agentStep: localized('agent 단계 (agentStep)'),
          agentDesc: localized('agent 설명 (agentDesc)'),
          agentFree: localized('agent 무료 (agentFree)'),
          agentPriceTail: localized('agent 가격 꼬리 (agentPriceTail)'),
          agentFeatures: localizedList('agent 특징 (agentFeatures)'),
          freeConsult: localized('무료 상담 (freeConsult)'),
          startFree: localized('무료 시작 (startFree)'),
        }, { label: 'B2C 플랜 카드' }),
        diff: fields.object({
          diffTitle: localized('차이 박스 제목 (diffTitle)'),
          freeBadge: localized('무료 배지 (freeBadge)'),
          paidBadge: localized('유료 배지 (paidBadge)'),
          saaiBasic: localized('saai agent 기본형 라벨 (saaiBasic)'),
          storeCare: localized('saai care 라벨 (storeCare)'),
          saaiFeatures: localizedList('기본형 특징 (saaiFeatures)'),
          careDiffFeatures: localizedList('care 차이 특징 (careDiffFeatures)'),
          simLink: localized('시뮬레이터 링크 (simLink)'),
          agentCompareLink: localized('agent 비교 링크 (agentCompareLink)'),
        }, { label: '무료 vs 유료 차이 박스' }),
        b2bSim: fields.object({
          b2bHeading: localized('B2B 제목 (b2bHeading)'),
          b2bSub: localized('B2B 서브 (b2bSub)'),
          b2bSimTitle: localized('B2B 시뮬 제목 (b2bSimTitle)'),
          b2bSimSub: localized('B2B 시뮬 서브 (b2bSimSub)'),
          b2bCamLabel: localized('카메라 수 라벨 (b2bCamLabel)'),
          unitDevice: localized('단위 · 대 (unitDevice)'),
          b2bSmall: localized('소형 (b2bSmall)'),
          b2bMid: localized('중형 (b2bMid)'),
          b2bLarge: localized('대형 (b2bLarge)'),
          b2bStoreLabel: localized('매장 수 라벨 (b2bStoreLabel)'),
          unitStore: localized('단위 · 매장 (unitStore)'),
          b2b3: localized('눈금 3 (b2b3)'),
          b2b50: localized('눈금 50 (b2b50)'),
          b2b100: localized('눈금 100 (b2b100)'),
          discountLabel: localized('할인율 라벨 (discountLabel)'),
          perStoreCost: localized('매장당 비용 라벨 (perStoreCost)'),
          perStoreBasis: localized('매장당 비용 기준 (perStoreBasis)'),
          totalMonthly: localized('전체 월 비용 라벨 (totalMonthly)'),
          won: localized('통화 단위 (won)'),
          estimateDisclaimer: localized('견적 고지 (estimateDisclaimer)'),
          b2bEmailLabel: localized('이메일 라벨 (b2bEmailLabel)'),
          emailPlaceholder: localized('이메일 placeholder (emailPlaceholder)'),
          getQuote: localized('견적 받기 버튼 (getQuote)'),
          b2bEmailNote: localized('이메일 안내 (b2bEmailNote)'),
          submittedTitle: localized('접수 제목 (submittedTitle)'),
          submittedSub: localized('접수 서브 (submittedSub)'),
          recalc: localized('다시 계산 (recalc)'),
        }, { label: 'B2B 견적 시뮬레이터' }),
        count: fields.object({
          countBadge: localized('count 배지 (countBadge)'),
          countDesc: localized('count 설명 (countDesc)'),
          countPrice: localized('count 가격 라인 (countPrice)'),
          countOptions: localizedList('count 부가 옵션 (countOptions)'),
          countCta: localized('count CTA (countCta)'),
        }, { label: 'saai count 진단 카드' }),
        enterprise: fields.object({
          entBadge: localized('엔터프라이즈 배지 (entBadge)'),
          entTitle: localized('엔터프라이즈 제목 (entTitle)'),
          entDesc: localized('엔터프라이즈 설명 (entDesc)'),
          entFeatures: localizedList('엔터프라이즈 특징 (entFeatures)'),
          entCta: localized('엔터프라이즈 CTA (entCta)'),
          backToB2c: localized('B2C로 돌아가기 (backToB2c)'),
        }, { label: '엔터프라이즈 카드' }),
        inlineSim: fields.object({
          simHeading: localized('인라인 시뮬 제목 (simHeading)'),
          simSub: localized('인라인 시뮬 서브 (simSub)'),
          simSelectLabel: localized('솔루션 선택 라벨 (simSelectLabel)'),
          simCamLabel: localized('카메라 대수 라벨 (simCamLabel)'),
          simSmall: localized('시뮬 소형 (simSmall)'),
          simLarge: localized('시뮬 대형 (simLarge)'),
          simEmailLabel: localized('시뮬 이메일 라벨 (simEmailLabel)'),
          simEmailNote: localized('시뮬 이메일 안내 (simEmailNote)'),
          simResultLabel: localized('시뮬 결과 라벨 (simResultLabel)'),
          simEmptyHint: localized('시뮬 빈 힌트 (simEmptyHint)'),
          simResultDisclaimer: localized('시뮬 결과 고지 (simResultDisclaimer)'),
          detailSimLink: localized('상세 시뮬 링크 (detailSimLink)'),
        }, { label: '인라인 시뮬레이터' }),
        bundle: fields.object({
          bundleHeading: localized('번들 제목 (bundleHeading)'),
          bundleBodyPre: localized('번들 본문 · 앞 (bundleBodyPre)'),
          bundleBodyStrong: localized('번들 본문 · 강조 (bundleBodyStrong)'),
          bundleBodyPost: localized('번들 본문 · 뒤 (bundleBodyPost)'),
          bundleCta: localized('번들 CTA (bundleCta)'),
          bundleSimLink: localized('번들 시뮬 링크 (bundleSimLink)'),
        }, { label: '번들 배너' }),
        errors: fields.object({
          errSubmitFailed: localized('오류 · 제출 실패 (errSubmitFailed)'),
          errGeneric: localized('오류 · 일반 (errGeneric)'),
        }, { label: '오류 문구' }),
      },
    }),
    agenticAi: singleton({
      label: 'Agentic AI — 기술 카피',
      path: 'content/site/agentic-ai',
      format: { data: 'yaml' },
      schema: {
        eyebrow: localized('eyebrow (eyebrow)'),
        heroTitle: localized('히어로 제목 (heroTitle)'),
        heroSub: localized('히어로 서브 (heroSub)'),
        heroNote: localized('히어로 각주 — 3축 서사 연결 (heroNote)'),
        problemEyebrow: localized('배경 eyebrow (problemEyebrow)'),
        problemTitle: localized('배경 제목 (problemTitle)'),
        problemSub: localized('배경 서브 (problemSub)'),
        philosophyEyebrow: localized('철학 eyebrow (philosophyEyebrow)'),
        philosophyHeading: localized('철학 제목 (philosophyHeading)'),
        philosophySub: localized('철학 서브 (philosophySub)'),
        philosophy: idItem('철학 3원칙 (philosophy)', 'principle', {
          title: localized('제목 (title)'),
          desc: localized('설명 (desc)'),
        }),
        differentiatorEyebrow: localized('차별점 eyebrow (differentiatorEyebrow)'),
        differentiatorHeading: localized('차별점 제목 (differentiatorHeading)'),
        differentiatorBody1: localized('차별점 본문 1 (differentiatorBody1)'),
        differentiatorBody2: localized('차별점 본문 2 — 하네스·온톨로지·도메인 지식 (differentiatorBody2)'),
        differentiatorBody3: localized('차별점 본문 3 — 공간 데이터 (differentiatorBody3)'),
        differentiatorBody4: localized('차별점 본문 4 — LLM은 만들지 않는다 (differentiatorBody4)'),
        pillars: idItem('3기둥 카드 (pillars) — 제목은 코드 유지', 'pillar', {
          desc: localized('설명 (desc)'),
          footer: localized('푸터 라벨 (footer)'),
        }),
        baselineEyebrow: localized('베이스라인 eyebrow (baselineEyebrow)'),
        baselineHeading: localized('베이스라인 제목 (baselineHeading)'),
        baselineSub: localized('베이스라인 서브 (baselineSub)'),
        baseline: idItem('베이스라인 4항목 (baseline)', 'baseline', {
          title: localized('제목 (title)'),
          desc: localized('설명 (desc)'),
          linkLabel: localized('링크 라벨 (linkLabel) — href는 코드 유지'),
        }),
        linkedSourcesLabel: localized('연결 소스 라벨 (linkedSourcesLabel)'),
        linkedSources: idItem('연결되는 데이터 4종 (linkedSources)', 'source', {
          label: localized('라벨 (label)'),
        }),
        ladderEyebrow: localized('자율화 단계 eyebrow (ladderEyebrow)'),
        ladderHeading: localized('자율화 단계 제목 (ladderHeading)'),
        ladderSub: localized('자율화 단계 서브 (ladderSub)'),
        ladderNote: localized('승급 조건 각주 — 수치 비공개 (ladderNote)'),
        ladder: idItem('자율화 단계 L0~L5 (ladder)', 'level', {
          label: localized('단계명 (label)'),
          line: localized('한 줄 설명 (line)'),
        }),
        bridgeEyebrow: localized('제품 브릿지 eyebrow (bridgeEyebrow)'),
        bridgeHeading: localized('제품 브릿지 제목 (bridgeHeading)'),
        bridgeSub: localized('제품 브릿지 서브 (bridgeSub)'),
        bridgeCta: localized('제품 브릿지 CTA (bridgeCta)'),
        bridgeCtaSecondary: localized('제품 브릿지 보조 CTA (bridgeCtaSecondary)'),
      },
    }),
    technology: singleton({
      label: 'Technology — 기술 카피',
      path: 'content/site/technology',
      format: { data: 'yaml' },
      schema: {
        heroBadge: localized('히어로 배지 (heroBadge)'),
        heroTitleA: localized('히어로 제목 1행 (heroTitleA)'),
        heroTitleB: localized('히어로 제목 2행 (heroTitleB)'),
        heroSub: localized('히어로 서브 (heroSub)'),
        heroPatentsLabel: localized('히어로 특허 라벨 (heroPatentsLabel)'),
        heroStackLine: localized('히어로 스택 라인 (heroStackLine)'),
        problemEyebrow: localized('문제 eyebrow (problemEyebrow)'),
        problemTitle: localized('문제 제목 (problemTitle)'),
        problemSub: localized('문제 서브 (problemSub)'),
        oldTag: localized('기존 태그 (oldTag)'),
        oldTitle: localized('기존 제목 (oldTitle)'),
        dilemmaOld: localizedList('기존 불릿 (dilemmaOld)'),
        newTag: localized('해법 태그 (newTag)'),
        newTitle: localized('해법 제목 (newTitle)'),
        dilemmaNew: localizedList('해법 불릿 (dilemmaNew)'),
        dilemmaNote: localized('대비 각주 — 익명화가 먼저 (dilemmaNote)'),
        howEyebrow: localized('How eyebrow (howEyebrow)'),
        howTitle: localized('How 제목 (howTitle)'),
        howSub: localized('How 서브 (howSub)'),
        demoEyebrow: localized('데모 eyebrow (demoEyebrow)'),
        demoTitle: localized('데모 제목 (demoTitle)'),
        demoSub: localized('데모 서브 (demoSub)'),
        demoItems: idItem('데모 항목 (demoItems)', 'item', {
          label: localized('라벨 (label)'),
          desc: localized('설명 (desc)'),
        }),
        demoCaption: localized('데모 캡션 (demoCaption)'),
        demoAria: localized('데모 aria (demoAria)'),
        coreEyebrow: localized('코어 eyebrow (coreEyebrow)'),
        coreTitle: localized('코어 제목 (coreTitle)'),
        coreSub: localized('코어 서브 (coreSub)'),
        stack: idItem('기술 스택 (stack)', 'axis', {
          tag: localized('태그 (tag)'),
          title: localized('제목 (title)'),
          desc: localized('설명 (desc)'),
        }),
        learnMore: localized('자세히 링크 (learnMore)'),
        complianceEyebrow: localized('규제 eyebrow (complianceEyebrow)'),
        complianceTitle: localized('규제 제목 (complianceTitle)'),
        complianceSub: localized('규제 서브 (complianceSub)'),
        complianceDataSpec: localized('로우데이터 명세 (complianceDataSpec)'),
        complianceItems: idItem('규제 항목 (complianceItems)', 'item', {
          region: localized('지역 (region)'),
          law: localized('법령 (law)'),
          desc: localized('설명 (desc)'),
        }),
        patentsLabel: localized('특허 라벨 (patentsLabel)'),
        patentsStackLine: localized('특허 스택 라인 (patentsStackLine)'),
        poweredLabel: localized('구동 제품 라벨 (poweredLabel)'),
        poweredProducts: idItem('구동 제품 (poweredProducts)', 'product', {
          name: localized('제품명 (name)'),
          desc: localized('설명 (desc)'),
        }),
        ctaBadge: localized('CTA 배지 (ctaBadge)'),
        ctaTitle: localized('CTA 제목 (ctaTitle)'),
        ctaSub: localized('CTA 서브 (ctaSub)'),
        ctaPrimary: localized('CTA 주 버튼 (ctaPrimary)'),
        ctaSecondary: localized('CTA 보조 버튼 (ctaSecondary)'),
      },
    }),
    resources: singleton({
      label: 'Resources — 리소스 카피',
      path: 'content/site/resources',
      format: { data: 'yaml' },
      schema: {
        eyebrow: localized('Eyebrow (eyebrow)'),
        heroTitle: localized('히어로 제목 (heroTitle)'),
        heroSub: localized('히어로 서브 (heroSub)'),
        featuredLabel: localized('추천 라벨 (featuredLabel)'),
        featuredTitle: localized('추천 제목 (featuredTitle)'),
        featuredDesc: localized('추천 설명 (featuredDesc)'),
        featuredCta: localized('추천 CTA (featuredCta)'),
        cardCta: localized('카드 CTA (cardCta)'),
        resources: idItem('리소스 카드 (resources)', 'card', {
          title: localized('제목 (title)'),
          description: localized('설명 (description)'),
          label: localized('라벨 (label)'),
        }),
      },
    }),
    // 뉴스/미디어 커버리지 — 보도자료마다 추가되는 고빈도 목록. date·url 은 공용,
    // 언론사·분류·제목은 로케일별. content/site/news.yaml → gen-site-content → NewsView.
    news: singleton({
      label: '뉴스 · 미디어 커버리지',
      path: 'content/site/news',
      format: { data: 'yaml' },
      schema: {
        coverage: fields.array(
          fields.object({
            date: fields.text({ label: '날짜 (예: 2026.01)' }),
            url: fields.url({ label: '기사 URL' }),
            outlet: localized('언론사'),
            category: localized('분류 (예: 보도자료 · 미디어 언급)'),
            title: localized('제목'),
          }),
          {
            label: '미디어 커버리지 (최신순)',
            itemLabel: (p) => `${p.fields.date.value || ''} · ${p.fields.title.fields.ko.value || '(제목)'}`,
          },
        ),
      },
    }),
    // 회사 정보 상수 — 특허 수·설립연도·주소·태그라인 등 사이트 전역 소비.
    // content/site/company.yaml → gen-site-content → COMPANY(src/lib/company-data.ts).
    // ⚠️ patents 는 전역 CountUp 등에 노출되므로 정수 검증 필수(오타 시 전역 파급).
    company: singleton({
      label: '회사 정보 (상수)',
      path: 'content/site/company',
      format: { data: 'yaml' },
      schema: {
        name: fields.text({ label: '영문 사명' }),
        nameKo: fields.text({ label: '국문 사명' }),
        platform: fields.text({ label: '플랫폼명' }),
        foundingYear: fields.integer({ label: '설립 연도', validation: { isRequired: true, min: 1990, max: 2100 } }),
        patents: fields.integer({ label: '특허 총계 (⚠️ 사이트 전역 노출)', validation: { isRequired: true, min: 0 } }),
        patentsRegistered: fields.integer({ label: '등록 특허', validation: { isRequired: true, min: 0 } }),
        patentsPending: fields.integer({ label: '출원 특허', validation: { isRequired: true, min: 0 } }),
        patentsLabel: fields.text({ label: '특허 표기 (예: 등록 66개 · 출원 37개)' }),
        partnerBrands: fields.integer({ label: '파트너 브랜드 수', validation: { isRequired: true, min: 0 } }),
        industries: fields.integer({ label: '적용 업종 수', validation: { isRequired: true, min: 0 } }),
        fundingCumulativeBillionKrw: fields.integer({ label: '누적 투자 (억 원, ⚠️ 신뢰 스트립 노출)', validation: { isRequired: true, min: 0 } }),
        seriesABillionKrw: fields.integer({ label: '시리즈 A 규모 (억 원)', validation: { isRequired: true, min: 0 } }),
        certLabel: fields.text({ label: '인증 표기 (예: SOC 2 · PIPA)' }),
        nvidiaPartner: fields.text({ label: 'NVIDIA 파트너 라벨' }),
        site: fields.text({ label: '미니사이트 URL' }),
        corporate: fields.text({ label: '코퍼레이트 URL' }),
        email: fields.text({ label: '대표 이메일' }),
        contactEmail: fields.text({ label: '문의 이메일' }),
        address: fields.text({ label: '주소' }),
        tagline: fields.text({ label: '태그라인' }),
        companyIntro: fields.text({ label: '기업 한 줄 소개', multiline: true }),
        platformIntro: fields.text({ label: '제품 한 줄 정의', multiline: true }),
        vision: fields.text({ label: '핵심 비전', multiline: true }),
        privacyPrinciple: fields.text({ label: '프라이버시 원칙', multiline: true }),
      },
    }),
    // 경영진 — About(필수)·Career(선택)에서 공유. key 는 코드 아바타 매핑용(변경 금지).
    // photo 미지정 시 initials 로 아바타 렌더. content/site/leadership.yaml.
    leadership: singleton({
      label: '경영진 (About · Career)',
      path: 'content/site/leadership',
      format: { data: 'yaml' },
      schema: {
        leaders: fields.array(
          fields.object({
            key: fields.text({ label: 'key (코드 아바타 매핑 — 변경 금지)' }),
            name: localized('이름 (name)'),
            role: localized('직책 (role)'),
            focus: localized('책임 영역 (focus)'),
            bio: localized('약력 (bio · 1~2문장)'),
            initials: localized('이니셜 (사진 없을 때 아바타)'),
            photo: fields.text({ label: '사진 경로 (선택, 예: /images/team/ceo.webp)' }),
          }),
          { label: '경영진', itemLabel: (p) => p.fields.key.value || '경영진' },
        ),
      },
    }),
    // 팀 페이지 인물 — /company/team 벽·스포트라이트·문화 증언 (PLAN_TEAM_VOICES).
    // content/site/team.yaml → gen-site-content(predev/prebuild) 가 site-content.json 으로
    // 컴파일. 저장 후 dev 재시작 또는 `npm run gen:content` 로 반영. id 는 문화 증언
    // (TeamView CULTURE_ITEMS.voiceOf)·endorses 연결 키 — 변경 금지. 배열 순서 = 표시 순서.
    team: singleton({
      label: '팀 페이지 인물 (Team)',
      path: 'content/site/team',
      format: { data: 'yaml' },
      schema: {
        members: fields.array(
          fields.object({
            id: fields.text({ label: 'id (문화 증언·동료 자랑 연결 키 — 변경 금지)' }),
            group: fields.select({
              label: '그룹 (필터)',
              options: [
                { label: 'Leadership', value: 'Leadership' },
                { label: 'Research & AI', value: 'Research & AI' },
                { label: 'Engineering', value: 'Engineering' },
                { label: 'Product & Design', value: 'Product & Design' },
                { label: 'Business & Operations', value: 'Business & Operations' },
              ],
              defaultValue: 'Engineering',
            }),
            isLeadership: fields.checkbox({ label: '리더십 섹션에 노출', defaultValue: false }),
            avatar: fields.image({
              label: '아바타 이미지',
              description: '정사각 webp 권장 (벽에서는 56~72px 원형, 스포트라이트에서 대형).',
              directory: 'public/images/team',
              publicPath: '/images/team/',
            }),
            avatarColor: fields.text({ label: '아바타 배경색 (선택 · 예: #EEF3FE — 비우면 자동 파스텔)' }),
            name: localized('이름 (name · JP 비우면 KO 사용)'),
            role: localized('직함 (role)'),
            quote: localized('기본 인용구 (quote · voice 없을 때 폴백)'),
            voiceTheme: fields.select({
              label: 'Voice 주제 — 없음이면 아래 voice 필드 무시(quote 폴백)',
              options: [
                { label: '— 없음 (quote 사용)', value: 'none' },
                { label: '제품·기술 (craft)', value: 'craft' },
                { label: '팀·문화 (culture)', value: 'culture' },
                { label: '철학 (philosophy)', value: 'philosophy' },
              ],
              defaultValue: 'none',
            }),
            voiceShort: localized('한 줄 자랑 (voice.short · KO 비우면 voice 미적용)'),
            voiceStory: localized('스토리 (voice.story · 2~3문단, 문단은 빈 줄로 구분 · 선택)'),
            askMeAbout: fields.array(fields.text({ label: '키워드' }), {
              label: 'Ask me about 칩 (선택 · 스포트라이트 노출)',
              itemLabel: (p) => p.value,
            }),
            endorses: fields.text({ label: '동료 자랑 대상 id (선택 · 스포트라이트 상호 링크)' }),
          }),
          { label: '팀원 (배열 순서 = 표시 순서)', itemLabel: (p) => p.fields.id.value || '팀원' },
        ),
      },
    }),
    // 회사 연혁 — About 요약(highlight)·Investors 전체. content/site/milestones.yaml.
    // year/title/desc 안의 {foundingYear} {patents} {patentsLabel} {vision} 토큰은
    // 빌드 시 회사 정보(company) 값으로 자동 치환된다(그대로 두면 최신값 유지).
    milestones: singleton({
      label: '회사 연혁 (About · Investors)',
      path: 'content/site/milestones',
      format: { data: 'yaml' },
      schema: {
        items: fields.array(
          fields.object({
            id: fields.text({ label: 'id (라벨용)' }),
            highlight: fields.checkbox({ label: 'About 요약 카드에 노출 (highlight)', defaultValue: false }),
            year: localized('연도 (year · {foundingYear} 토큰 가능)'),
            title: localized('제목 (title · {patents} 토큰 가능)'),
            desc: localized('설명 (desc · {patentsLabel}/{vision} 토큰 가능)'),
          }),
          { label: '연혁 (오래된→최신)', itemLabel: (p) => p.fields.id.value || '연혁' },
        ),
      },
    }),
    // 채용 페이지 카피 — /company/career. content/site/career.yaml. culture 카드 desc 의
    // {nvidiaPartner}/{patents} 토큰은 빌드 시 치환. mailto·아이콘은 코드 유지.
    career: singleton({
      label: '채용 페이지 (Careers)',
      path: 'content/site/career',
      format: { data: 'yaml' },
      schema: {
        badge: localized('배지 (badge)'),
        heroMaster: localized('Hero 제목 (heroMaster)'),
        heroMasterAccent: localized('Hero 강조줄 (heroMasterAccent)'),
        heroSub: localized('Hero 서브 (heroSub)'),
        cultureEyebrow: localized('컬처 eyebrow (cultureEyebrow)'),
        cultureHeading: localized('컬처 제목 (cultureHeading)'),
        cultureSub: localized('컬처 서브 (cultureSub)'),
        benefitsEyebrow: localized('복지 eyebrow (benefitsEyebrow)'),
        benefitsHeading: localized('복지 제목 (benefitsHeading)'),
        benefitsSub: localized('복지 서브 (benefitsSub)'),
        rolesEyebrow: localized('인재풀 eyebrow (rolesEyebrow)'),
        rolesHeading: localized('인재풀 제목 (rolesHeading)'),
        rolesSub: localized('인재풀 서브 (rolesSub)'),
        rolesApply: localized('인재풀 CTA (rolesApply)'),
        processEyebrow: localized('절차 eyebrow (processEyebrow)'),
        processHeading: localized('절차 제목 (processHeading)'),
        processSub: localized('절차 서브 (processSub)'),
        mailSubject: localized('지원 메일 제목 (mailSubject)'),
        ctaHeading: localized('CTA 제목 (ctaHeading)'),
        ctaSub: localized('CTA 서브 (ctaSub)'),
        ctaApply: localized('CTA 지원 버튼 (ctaApply)'),
        ctaGeneral: localized('CTA 일반문의 버튼 (ctaGeneral)'),
        culture: idItem('컬처 카드 · 4개 (culture)', 'culture', {
          title: localized('제목 (title)'),
          desc: localized('설명 (desc · {nvidiaPartner}/{patents} 토큰 가능)'),
        }),
        benefits: idItem('복지 카드 · 4개 (benefits)', 'benefit', {
          title: localized('제목 (title)'),
          desc: localized('설명 (desc)'),
        }),
        process: idItem('채용 절차 · 4단계 (process)', 'step', {
          step: localized('번호 (step · 예: 01)'),
          title: localized('제목 (title)'),
          desc: localized('설명 (desc)'),
        }),
      },
    }),
    retail: singleton({
      label: 'Retail — 리테일 카피',
      path: 'content/site/retail',
      format: { data: 'yaml' },
      schema: {
        ...solBaseSchema,
        baEyebrow: localized('Before/After eyebrow (baEyebrow)'),
        baHeading: localized('Before/After 제목 (baHeading)'),
        beforeAfter: idItem('Before/After (beforeAfter)', 'pair', {
          before: localized('Before (before)'),
          after: localized('After (after)'),
        }),
      },
    }),
    drug: singleton({
      label: 'Drug — 드럭스토어 카피',
      path: 'content/site/drug',
      format: { data: 'yaml' },
      schema: { ...solBaseSchema },
    }),
    foodBeverage: singleton({
      label: 'Food & Beverage — F&B 카피',
      path: 'content/site/food-beverage',
      format: { data: 'yaml' },
      schema: { ...solBaseSchema },
    }),
    largeSpace: singleton({
      label: 'Large Space — 대형공간 카피',
      path: 'content/site/large-space',
      format: { data: 'yaml' },
      schema: {
        ...solBaseSchema,
        mtmcBadge: localized('MTMC 배지 (mtmcBadge)'),
        mtmcHeading: localized('MTMC 제목 (mtmcHeading)'),
        mtmcBody: localized('MTMC 본문 (mtmcBody)'),
        mtmcLink: localized('MTMC 링크 (mtmcLink)'),
        mtmcItems: localizedList('MTMC 항목 (mtmcItems)'),
      },
    }),
    // 법무 문서 — 한국어 단문 마크다운. ⚠️ 변경 전 법무 검토 필수(편집도 검토 후 반영).
    privacyDoc: singleton({
      label: '⚖️ 개인정보 처리방침 (법무 검토 후)',
      path: 'content/legal/privacy',
      format: { contentField: 'body' },
      schema: { body: fields.mdx({ label: '개인정보 처리방침 본문' }) },
    }),
    termsDoc: singleton({
      label: '⚖️ 이용약관 (법무 검토 후)',
      path: 'content/legal/terms',
      format: { contentField: 'body' },
      schema: { body: fields.mdx({ label: '이용약관 본문' }) },
    }),
  },
});
