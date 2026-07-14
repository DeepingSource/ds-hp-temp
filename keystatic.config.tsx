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
    // 그룹명이 온보딩 역할 — 자주 편집하는 문서를 위로 (KEYSTATIC_ENHANCEMENT_PLAN C-1).
    navigation: {
      '블로그': ['articles'],
      '자주 편집': ['home', 'pricing'],
      '페이지 카피 · 제품': ['products', 'storeAgent', 'saai'],
      '페이지 카피 · 회사': ['about', 'solutions', 'contact'],
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
        icon: fields.text({ label: 'Lucide 아이콘', defaultValue: 'Newspaper' }),
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
  },
  singletons: {
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
    about: singleton({
      label: 'About — 회사 소개 카피',
      path: 'content/site/about',
      format: { data: 'yaml' },
      schema: {
        badge: localized('Hero 배지 (badge)'),
        heroEyebrowCompany: localized('Hero Eyebrow · 회사 (heroEyebrowCompany)'),
        heroMasterCompany: localized('Hero 마스터 · 회사 — 줄바꿈 \\n 유지 (heroMasterCompany)'),
        heroEyebrowOwner: localized('Hero Eyebrow · 현장 (heroEyebrowOwner)'),
        heroMasterOwner: localized('Hero 마스터 · 현장 — 줄바꿈 \\n 유지 (heroMasterOwner)'),
        companyIntro: localized('회사 소개 1 (companyIntro)'),
        companyIntro2: localized('회사 소개 2 · 펀치라인 (companyIntro2)'),
        vmEyebrow: localized('Vision/Mission Eyebrow (vmEyebrow)'),
        vision: localized('비전 문장 (vision)'),
        visionLabel: localized('Vision 라벨 (visionLabel)'),
        missionLabel: localized('Mission 라벨 (missionLabel)'),
        mission: localized('미션 문장 (mission)'),
        storyEyebrow: localized('스토리 Eyebrow (storyEyebrow)'),
        storyHeading: localized('스토리 제목 (storyHeading)'),
        storySub: localized('스토리 서브 (storySub)'),
        leadershipEyebrow: localized('리더십 Eyebrow (leadershipEyebrow)'),
        leadershipHeading: localized('리더십 제목 (leadershipHeading)'),
        leadershipSub: localized('리더십 서브 (leadershipSub)'),
        partnersEyebrow: localized('파트너 Eyebrow (partnersEyebrow)'),
        partnersHeading: localized('파트너 제목 — {partnerBrands} 유지 (partnersHeading)'),
        partnersSub: localized('파트너 서브 — {industries} {nvidiaPartner} 유지 (partnersSub)'),
        partnerStatsNote: localized('파트너 통계 각주 (partnerStatsNote)'),
        certsLabel: localized('인증 섹션 라벨 (certsLabel)'),
        ctaHeading: localized('CTA 제목 — 줄바꿈 \\n 유지 (ctaHeading)'),
        ctaSub: localized('CTA 서브 (ctaSub)'),
        ctaButton: localized('CTA 버튼 (ctaButton)'),
        partnerStatLabels: localizedList('파트너 통계 라벨 · 4개 (partnerStatLabels)'),
        methodEyebrow: localized('Method Eyebrow (methodEyebrow)'),
        methodHeading: localized('Method 제목 (methodHeading)'),
        methodIntro: localized('Method 인트로 (methodIntro)'),
        certs: idItem('인증 (certs · sub만 편집)', 'cert', {
          sub: localized('설명 (sub)'),
        }),
        methodSteps: idItem('Method 단계 (methodSteps)', 'step', {
          term: localized('용어 (term)'),
          promise: localized('약속 (promise)'),
        }),
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
      schema: {
        heroTitle: localized('히어로 제목 (heroTitle)'),
        heroSub: localized('히어로 서브 (heroSub)'),
        toggleB2c: localized('토글 · 개별 매장 (toggleB2c)'),
        toggleB2b: localized('토글 · 프랜차이즈 (toggleB2b)'),
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
        diffTitle: localized('차이 박스 제목 (diffTitle)'),
        freeBadge: localized('무료 배지 (freeBadge)'),
        paidBadge: localized('유료 배지 (paidBadge)'),
        saaiBasic: localized('store agent 기본형 라벨 (saaiBasic)'),
        storeCare: localized('store care 라벨 (storeCare)'),
        saaiFeatures: localizedList('기본형 특징 (saaiFeatures)'),
        careDiffFeatures: localizedList('care 차이 특징 (careDiffFeatures)'),
        simLink: localized('시뮬레이터 링크 (simLink)'),
        agentCompareLink: localized('agent 비교 링크 (agentCompareLink)'),
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
        entBadge: localized('엔터프라이즈 배지 (entBadge)'),
        entTitle: localized('엔터프라이즈 제목 (entTitle)'),
        entDesc: localized('엔터프라이즈 설명 (entDesc)'),
        entFeatures: localizedList('엔터프라이즈 특징 (entFeatures)'),
        entCta: localized('엔터프라이즈 CTA (entCta)'),
        backToB2c: localized('B2C로 돌아가기 (backToB2c)'),
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
        bundleHeading: localized('번들 제목 (bundleHeading)'),
        bundleBodyPre: localized('번들 본문 · 앞 (bundleBodyPre)'),
        bundleBodyStrong: localized('번들 본문 · 강조 (bundleBodyStrong)'),
        bundleBodyPost: localized('번들 본문 · 뒤 (bundleBodyPost)'),
        bundleCta: localized('번들 CTA (bundleCta)'),
        bundleSimLink: localized('번들 시뮬 링크 (bundleSimLink)'),
        errSubmitFailed: localized('오류 · 제출 실패 (errSubmitFailed)'),
        errGeneric: localized('오류 · 일반 (errGeneric)'),
      },
    }),
  },
});
