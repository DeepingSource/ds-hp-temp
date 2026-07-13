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
    brand: { name: 'DeepingSource' },
  },
  collections: {
    // 블로그 글 — Velite 가 읽는 것과 같은 content/articles/*.mdx 를 직접 편집.
    // 플랫 구조(Phase B-1)라 path 의 * 가 곧 slug/파일명. 중간 싱크 불필요.
    articles: collection({
      label: '블로그 글',
      path: 'content/articles/*',
      slugField: 'slug',
      format: { contentField: 'body' },
      columns: ['title', 'date'],
      schema: {
        title: fields.text({ label: '제목', validation: { isRequired: true } }),
        slug: fields.slug({ name: { label: 'URL 슬러그 (파일명 = URL 경로)' } }),
        excerpt: fields.text({ label: '요약 (목록·OG용 한 줄)', multiline: true }),
        category: fields.select({
          label: '카테고리',
          options: [
            { label: '가이드', value: 'guide' },
            { label: '케이스스터디', value: 'case-study' },
            { label: '인사이트', value: 'insight' },
            { label: '주간', value: 'weekly' },
          ],
          defaultValue: 'insight',
        }),
        date: fields.date({ label: '게시일' }),
        readTime: fields.integer({ label: '읽기 시간(분) — 비우면 자동 계산' }),
        tags: fields.array(fields.text({ label: '태그' }), {
          label: '태그',
          itemLabel: (p) => p.value,
        }),
        icon: fields.text({ label: 'Lucide 아이콘', defaultValue: 'Newspaper' }),
        cover: fields.image({
          label: '커버 이미지',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        coverAlt: fields.text({ label: '커버 대체텍스트' }),
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
        body: fields.mdx({ label: '본문', components: blogComponents }),
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
  },
});
