# 케이스스터디 상시발행화 계획 — Keystatic 전환 v1

> ✅ **구현 완료 (2026-07-15)** — Phase 0~5 실행됨(옵션 B). `caseStudies` Keystatic·Velite 컬렉션 신설, 5건×3언어=15개 `content/case-studies/*.mdx`로 마이그레이션(`scripts/migrate-case-studies.mjs`), index/detail 2단 라우팅(blogRoutes 패턴), Golden Case 슬롯→태그, sitemap·proxy·편집 가이드 연동. 레거시 `CaseStudiesView.tsx` 삭제. 빌드 그린·3로케일 프리렌더 실측. **Phase 6(필터 UI)은 볼륨 누적 후로 보류.** 상세=`STATUS.md §8`.

> **일자** 2026-07-15 · **입력** `keystatic.config.tsx` · `velite.config.ts` · `src/lib/articles.ts` · `src/components/blog/*`(blogRoutes.tsx·BlogIndexView.tsx·BlogArticleView.tsx) · `src/components/corporate/views/CaseStudiesView.tsx` · `docs/CASE_STUDIES_v1.md` · `docs/KEYSTATIC_ENHANCEMENT_PLAN_v1.md` · `docs/blog-keystatic-phase2-proposal.md`
> **현재** `/resources/case-studies`(ko·en·jp) = `CaseStudiesView.tsx` 한 파일에 5건 × 3언어가 **하드코딩**. Keystatic은 블로그(`articles` 컬렉션)에서만 이미 GitHub 모드로 운영 중.
> **목표** 새 케이스를 **코드 PR 없이 Keystatic에서 작성 → 커밋 → 목록에 누적**되게 한다 — 블로그와 동일한 편집 루프. 5건 고정 제약을 풀고, 개별 URL(SEO·공유)을 가진 상시 발행 컬렉션으로 전환한다.
> **상위 참고** [`CASE_STUDIES_v1.md`](./CASE_STUDIES_v1.md) §5 *발행 후 운영 룰* (본 계획이 그 밑그림을 구체화함) · [`KEYSTATIC_ENHANCEMENT_PLAN_v1.md`](./KEYSTATIC_ENHANCEMENT_PLAN_v1.md)(블로그 고도화 트랙, 같은 패턴 상속) · [`blog-keystatic-phase2-proposal.md`](./blog-keystatic-phase2-proposal.md)(블로그 전환 시 썼던 스파이크 방법론, 재사용)

---

## 0. 한 페이지 요약

`/resources/case-studies`는 지금 **5건이 3개 언어로 박제된 단일 페이지**다. 새 케이스가 생기면 개발자가 `CaseStudiesView.tsx`를 열어 배열 인덱스로 묶인 5개 데이터(아이콘·단계·제품·본문)를 코드로 고쳐야 한다 — 블로그가 196편을 Keystatic에서 셀프 발행하는 것과 정반대 구조다.

다행히 **인프라 절반은 이미 있다**. Velite의 블로그 스키마(`velite.config.ts`)에는 `category` enum에 `'case-study'`가 이미 정의돼 있고, `src/lib/articles.ts`는 이를 블로그 목록에서만 제외하도록 필터링해뒀다 — 즉 케이스스터디를 콘텐츠 컬렉션으로 다루겠다는 설계 의도는 있었지만 실제 라우트·전용 스키마·마이그레이션은 안 됐다.

**핵심 설계 결정 3가지**(§3·§6·§7에서 상술):
1. 블로그 `articles` 컬렉션에 얹지 않고 **전용 `caseStudies` 컬렉션을 신설**한다 — 케이스스터디는 지표(before/after·metrics·quotes)가 구조화된 데이터라 자유서술 MDX 본문 하나로는 현재의 카드 레이아웃(Before/After 박스·실측/예시 배지·인용 2매)을 못 담는다.
2. **Golden Case 5단계를 "고정 슬롯"에서 "태그"로 바꾼다** — 지금은 배열 인덱스 0~4가 각 케이스·아이콘·단계에 1:1로 못박혀 있어 6번째 케이스가 들어갈 자리가 없다. 이 결합을 끊는 게 "블로그처럼 쌓이게" 하는 작업의 실질적 핵심이다.
3. **목록(index) + 상세(detail) 2단 라우팅**을 블로그와 동일 패턴으로 신설한다 — 케이스가 쌓일수록 각 건이 자기 URL·OG·hreflang을 가져야 영업팀 공유·SEO가 성립한다.

**공수 총량(개략)**: 스키마·마이그레이션·라우팅 핵심 경로 3~4일, 편집 가이드·필터 UI·연동 정리까지 포함 총 1.5~2주. 블로그 전환 때 쓴 스파이크 방법론을 그대로 재사용하므로 리스크는 낮다(§9 참고).

---

## 1. 현황 진단 (AS-IS)

### 1.1 콘텐츠가 코드에 박혀 있다

`src/components/corporate/views/CaseStudiesView.tsx`(약 680줄) 하나가 `/resources/case-studies`(en) · `/ko/resources/case-studies` · `/jp/resources/case-studies` 3개 라우트를 전부 렌더링한다. 케이스 5건 × 언어 3개 = 15개의 텍스트 블록(headline·sub·context·before·after·metrics 4개·quotes 2개·note)이 `C: Record<Locale, {...}>` 객체 리터럴 안에 있다.

구조적으로 **6개의 병렬 배열이 인덱스로 묶여 있다**:

```ts
const caseIcons = [Store, Building2, Pill, Coffee, Landmark];      // 산업 아이콘
const caseIds = ['smb-53', 'cvs-100', ...];                        // id
const caseSteps = ['01', '02', '03', '04', '05'];                  // Golden Case 단계
const caseProducts = [[...], [...], ...];                          // 제품 태그
const metricVerified = [[true,true,true,true], [false,...], ...];  // 실측/예시 배지
// + C[locale].cases[0..4] 의 headline/sub/context/metrics/quotes/note
```

새 케이스를 추가하려면 이 6곳을 **모두 같은 순서로** 늘려야 하고, 언어별로 3벌을 동시에 맞춰야 한다. 실수하면 아이콘과 단계가 어긋난다. 이게 지금 "새 케이스 = 개발자 PR" 인 이유다.

### 1.2 이미 갖춰진 인프라 (블로그 트랙에서 상속 가능)

- **Keystatic GitHub 모드**가 이미 `DeepingSource/ds-hp-temp`에서 동작 중(`keystatic.config.tsx`, [PHASE_C](./PHASE_C_github-mode-setup.md)). 새 컬렉션을 추가하는 것만으로 편집자는 같은 로그인·같은 UI로 접근한다.
- **Velite 빌드 파이프라인**(`velite.config.ts`)이 `content/**/*.mdx` → `.velite` → 타입 안전 객체를 만드는 구조가 확립돼 있다. `articles` 컬렉션과 나란히 `caseStudies` 컬렉션을 추가하면 된다.
- **`category` enum에 `'case-study'`가 이미 존재**한다(`velite.config.ts` 20번째 줄 근방) — 그런데 `src/lib/articles.ts`의 `RESOURCE_BLOG_CATEGORIES = ['insight', 'guide']`가 명시적으로 이를 블로그 목록에서 뺀다. 즉 "케이스스터디를 컬렉션화한다"는 설계 의도는 있었으나 이후 손대지 않은 자리다. 이 값을 살리기보다는 §3에서처럼 **별도 컬렉션으로 분리**하는 게 맞다(이유는 §3).
- **`blogRoutes.tsx` 패턴**이 3-locale 라우트 파일에서 index/detail 메타데이터·정적 파라미터·렌더를 함수 3~4개로 캡슐화해 재사용성이 검증됐다. 케이스스터디에도 그대로 복제 가능한 청사진이다.
- **예약 발행·초안(draft)·`draft`-checkbox 필터·매일 재빌드 크론**이 블로그에 이미 구현돼 있다([`KEYSTATIC_ENHANCEMENT_PLAN_v1.md`](./KEYSTATIC_ENHANCEMENT_PLAN_v1.md) B-2·B-3) — 케이스스터디도 같은 배관을 공유하면 새로 만들 게 없다.

### 1.3 지금 구조로는 "블로그처럼" 쌓일 수 없는 지점

| 제약 | 현재 상태 | 영향 |
|---|---|---|
| Golden Case 5단계 = 5슬롯 고정 | 배열 인덱스 0~4에 1건씩 하드매핑 | 6번째 케이스를 넣을 자리가 없음 — 스키마가 "정확히 5건"을 전제 |
| 상세 URL 없음 | 5건이 `/resources/case-studies` 한 페이지의 앵커일 뿐 | 케이스 1건을 영업팀이 개별 링크로 공유·OG 미리보기 불가, 개별 SEO 인덱싱 불가 |
| 다국어가 코드 객체 리터럴 | `C.ko`/`C.en`/`C.jp` 각각 별도 유지 | 블로그처럼 "언어별 파일 1개"가 아니라 한 파일 안에서 3벌을 동시 수정해야 함 |
| 편집 권한 = 개발자 전용 | Keystatic 미연결 | 마케팅·영업팀이 자체 발행 불가 — `CASE_STUDIES_v1.md` §5가 예정한 "분기 1건 → 월 1건" 상시 큐 운영이 현재 구조로는 물리적으로 불가능 |

---

## 2. 목표 (TO-BE)

1. **편집자가 Keystatic `/keystatic`에서 새 케이스스터디를 작성 → 저장(커밋) → 다음 재빌드에 `/resources/case-studies` 목록에 자동 노출.** 코드 변경·PR 불필요.
2. **"정확히 5건" 제약 해제** — 몇 건이든 누적 가능. Golden Case 단계는 분류 태그로 남되 slot 강제 없음.
3. **케이스 1건 = URL 1개**(`/resources/case-studies/{slug}`) — 개별 OG·메타·hreflang·sitemap 엔트리.
4. **초안·예약 발행·언어별 발행 시점 분리**를 블로그와 동일하게 지원(영문 우선 발행이 필요한 Case 5류 케이스가 실제로 있음 — `CASE_STUDIES_v1.md` §2 참고).
5. **기존 5건의 디자인·정보 밀도는 최대한 보존** — Before/After 박스, 실측/예시 배지, 인용 2매, Golden Case 5단계 안내 배너, 면책 문구는 마이그레이션 후에도 그대로 보인다(단, 카드 레이아웃은 목록/상세로 분리됨 — §5).

---

## 3. 설계 옵션 비교 — `articles`에 얹을까, 전용 컬렉션을 만들까

### 옵션 A — 블로그 `articles` 컬렉션에 `category: 'case-study'`로 편입

- **장점**: 컬렉션·Velite 스키마·라우트를 새로 안 만들어도 됨. `RESOURCE_BLOG_CATEGORIES`에서만 제외 해제하면 즉시 목록에 뜸.
- **문제**: `articles` 스키마는 `title/excerpt/category/date/tags/icon/cover/body(MDX)`뿐이다. 케이스스터디의 핵심 정보 — **산업/청자, Before/After, 실측 vs 예시 배지가 붙은 지표 배열, 인용 2매, Golden Case 단계** — 를 담을 필드가 없다. 이걸 전부 `body` MDX 자유서술로 밀어넣으면 (a) 편집자가 매번 마크다운으로 표·배지를 손으로 그려야 해서 오류가 잦고, (b) 지금 카드 UI(배지 색상 분기·정렬된 4칸 그리드)를 코드가 자동으로 그릴 수 없다 — 결국 디자인이 블로그 본문처럼 밋밋해진다.

### 옵션 B — 전용 `caseStudies` 컬렉션 신설 (권장)

- 케이스스터디 고유 필드(§4)를 구조화된 스키마로 정의 → 편집자는 "지표 추가" 버튼으로 항목을 늘리고, 사이트는 지금과 동일한 배지·그리드 UI를 코드로 자동 렌더링한다.
- 블로그와 인프라(Keystatic GitHub 모드·Velite·draft/예약발행 배관)는 100% 공유하되, 스키마·라우트만 분리 — 유지보수 비용 증가는 미미하다(신규 파일 6~8개, 기존 blogRoutes.tsx 패턴 복제).
- `body: fields.mdx`도 옵션으로 남겨 상세페이지 하단에 "더 읽어보기" 심화 서술을 원할 때만 쓰게 한다(선택 필드, 없으면 카드 정보만으로 상세페이지 구성).

**권장: 옵션 B.** 옵션 A는 단기로는 빠르지만 지금 디자인 품질을 포기해야 한다.

---

## 4. 데이터 모델 설계

### 4.1 Keystatic 컬렉션 (`keystatic.config.tsx`에 추가)

```ts
caseStudies: collection({
  label: '케이스스터디',
  path: 'content/case-studies/*',
  slugField: 'slug',
  format: { contentField: 'body' },
  entryLayout: 'content',
  columns: ['title', 'industry', 'goldenStep', 'date', 'lang', 'draft'],
  schema: {
    title: fields.text({
      label: '헤드라인',
      description: '카드·상세페이지 제목. 70자 이내 권장.',
      validation: { isRequired: true, length: { max: 70 } },
    }),
    slug: fields.slug({ name: { label: 'URL 슬러그' } }),
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
      description: '목록·상세 배지에 쓰이는 Lucide 아이콘. 신규 아이콘은 개발자에게 요청.',
      options: industryIconOptions, // Store·Building2·Pill·Coffee·Landmark·Warehouse·Hospital ...
      defaultValue: 'Store',
    }),
    audience: fields.text({ label: '청자 (예: 점주, 본사 임원)' }),
    goldenStep: fields.select({
      label: 'Golden Case 단계',
      description: '더 이상 "1건당 1단계 고정"이 아님 — 같은 단계에 여러 케이스가 쌓일 수 있음.',
      options: [
        { label: '01 발견', value: 'discover' },
        { label: '02 검증', value: 'verify' },
        { label: '03 번역', value: 'translate' },
        { label: '04 동기화', value: 'sync' },
        { label: '05 재측정', value: 'remeasure' },
      ],
      validation: { isRequired: true },
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
      label: '커버 이미지',
      directory: 'public/images/case-studies',
      publicPath: '/images/case-studies/',
    }),
    coverAlt: fields.text({ label: '커버 대체텍스트' }),
    lang: fields.select({
      label: '언어',
      options: [{ label: '한국어', value: 'ko' }, { label: 'English', value: 'en' }, { label: '日本語', value: 'jp' }],
      defaultValue: 'ko',
    }),
    date: fields.date({ label: '게시일', defaultValue: { kind: 'today' } }),
    featured: fields.checkbox({
      label: '대표 노출 (목록 상단 고정)',
      description: '체크한 케이스가 목록 최상단에 우선 노출.',
      defaultValue: false,
    }),
    draft: fields.checkbox({ label: '초안 (사이트에 노출 안 됨)', defaultValue: false }),
    body: fields.mdx({
      label: '심화 서술 (선택 — 상세페이지 하단, 없으면 미노출)',
      options: { image: { directory: 'public/images/case-studies', publicPath: '/images/case-studies/' } },
    }),
  },
}),
```

### 4.2 Velite 컬렉션 (`velite.config.ts`에 추가)

```ts
const caseStudies = defineCollection({
  name: 'CaseStudy',
  pattern: 'case-studies/**/*.mdx',
  schema: s.object({
    slug: s.string(),
    title: s.string(),
    sub: s.string(),
    context: s.string(),
    industry: s.string(),
    industryIcon: s.string().default('Store'),
    audience: s.string().default(''),
    goldenStep: s.enum(['discover', 'verify', 'translate', 'sync', 'remeasure']),
    products: s.array(s.string()).default([]),
    before: s.string().default(''),
    after: s.string().default(''),
    metrics: s.array(s.object({ label: s.string(), value: s.string(), verified: s.boolean().default(false) })).default([]),
    quotes: s.array(s.object({ text: s.string(), who: s.string() })).default([]),
    note: s.string().default(''),
    cover: s.string().optional(),
    coverAlt: s.string().optional(),
    lang: s.enum(['en', 'ko', 'jp']).default('ko'),
    date: s.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    featured: s.boolean().default(false),
    draft: s.boolean().default(false),
    body: s.raw().optional(),
  }),
});

export default defineConfig({
  // ...
  collections: { articles, caseStudies },
});
```

`content/articles`와 나란히 `content/case-studies/*.mdx`가 새 루트가 된다. 파일명 = slug (블로그와 동일 컨벤션), 언어별로 별도 파일(`smb-53.mdx`(en) · `smb-53-ko.mdx` · `smb-53-jp.mdx` — 블로그의 `-ko`/`-jp` 접미사 컨벤션을 그대로 따름, 별도 cross-locale join 필드 불필요).

---

## 5. 라우팅 · 컴포넌트 설계

### 5.1 목록(index) — 블로그와 동일 톤의 카드 그리드로 축소

지금 `/resources/case-studies`는 5건 전체를 풀 디테일(지표 4칸+인용 2매+before/after)로 나열한다. 케이스가 10건, 20건으로 늘면 이 방식은 스크롤이 감당 안 된다. **목록은 압축 카드로, 풀 디테일은 상세페이지로 분리**한다(블로그의 `BlogIndexView`(컴팩트 카드) vs `BlogArticleView`(전체 본문) 분리와 동일 원칙).

- 상단 Golden Case 5단계 안내 배너·면책 문구 섹션(현재 `CaseStudiesView.tsx`의 정적 부분)은 그대로 유지 — 다만 5단계 배너는 이제 "각 슬롯 = 1건"이 아니라 순수 설명용 인포그래픽으로 남는다.
- 카드: 헤드라인·서브·산업 배지·Golden Case 단계 배지·대표 지표 1개(최고 강조 수치)·"자세히 보기 →" 링크. `ArticleCard.tsx` 패턴을 참고해 `CaseStudyCard.tsx` 신설.
- **필터(선택, Phase 3)**: 케이스가 8건을 넘어가면 산업/제품/Golden Case 단계 필터 칩 추가 — 지금 블로그 목록에는 필터가 없으므로 이 부분만 신규 UI.
- 정렬: `featured` 먼저, 그다음 `date desc`.

### 5.2 상세(detail) — 신규 라우트, 지금 카드의 풀 디테일을 그대로 이관

`/resources/case-studies/{slug}` 신설(현재 없음). 지금 `CaseStudiesView.tsx`의 `<article className="card p-7 sm:p-9">` 블록 내부 전체(헤더 배지·헤드라인·제품 태그·context·Before/After·지표 4칸·인용·note)를 그대로 `CaseStudyDetailView.tsx`로 옮긴다 — **디자인 변경 없음**, 위치만 개별 페이지로 이동. `body`(선택 MDX)가 있으면 note 아래에 추가 렌더.

### 5.3 라우트 헬퍼 — `blogRoutes.tsx` 패턴 복제

```
src/lib/case-studies.ts                          # getAllCaseStudies / getCaseStudyBySlug / getCaseStudiesByLocale
src/components/case-studies/
  CaseStudyCard.tsx                               # 목록 카드 (ArticleCard.tsx 참고)
  CaseStudiesIndexView.tsx                        # 목록 페이지 (현재 CaseStudiesView.tsx의 정적 섹션 + 카드 그리드)
  CaseStudyDetailView.tsx                          # 상세 페이지 (현재 CaseStudiesView.tsx의 article 블록)
  caseStudyRoutes.tsx                              # blogRoutes.tsx 1:1 대응 — index/detail 메타데이터·정적 파라미터·렌더
src/app/resources/case-studies/page.tsx            # → caseStudyRoutes 위임으로 축소
src/app/resources/case-studies/[slug]/page.tsx     # 신규
src/app/ko/resources/case-studies/page.tsx          # → 동일
src/app/ko/resources/case-studies/[slug]/page.tsx   # 신규
src/app/jp/resources/case-studies/page.tsx          # → 동일
src/app/jp/resources/case-studies/[slug]/page.tsx   # 신규
```

각 `page.tsx`는 블로그처럼 3~5줄로 줄어든다(`blogIndexMetadata`/`BlogIndexPage`/`blogStaticParams`/`blogArticleMetadata`/`BlogArticlePage`와 대응되는 `caseStudyIndexMetadata`/`CaseStudyIndexPage`/`caseStudyStaticParams`/`caseStudyDetailMetadata`/`CaseStudyDetailPage`).

### 5.4 sitemap · 연동 지점

- `src/app/sitemap.ts`: 현재 `{ path: '/resources/case-studies', priority: 0.7, freq: 'monthly' }` 고정 1줄뿐. 블로그처럼(87~97번째 줄 패턴) 개별 슬러그를 순회하는 루프를 추가.
- `src/components/corporate/views/ResourcesView.tsx`: `/resources/case-studies` 카드 문구(`featuredDesc` 등)가 "5건"을 전제한 카피라면 "누적형" 문구로 재검토(카피 자체는 Keystatic `resources` 싱글톤에서 편집 가능하므로 코드 변경 불필요, 문구만 갱신).
- `src/components/corporate/views/EnterpriseView.tsx` · `Header.tsx` · `Footer.tsx` · `src/lib/breadcrumb-labels.ts`: `case-studies` 문자열 참조 지점 — 링크 구조(`/resources/case-studies`)는 안 바뀌므로 대부분 무변경, breadcrumb 라벨만 상세페이지용 항목 추가 필요.
- `src/components/corporate/CaseBand.tsx`(홈 화면 "Field scenarios" 배너)는 **별개 자산**이다 — 케이스스터디 컬렉션과 무관하게 자체 예시(비귀속 "Illustrative") 3건을 하드코딩 중. 본 계획 범위 밖으로 둔다(연동하려면 별도 후속 과제).
- `CaseStudyChartMockup.tsx`(Case 1과 짝지어진 before/after 차트)는 범용화하지 않고 `showAdoptionChart: fields.checkbox` 같은 단일 boolean 필드로 남겨 "이 케이스에 차트를 붙일지"만 편집자가 토글하게 한다(과설계 방지).

---

## 6. Golden Case 5단계 — "슬롯"에서 "태그"로

현재 UX의 핵심 메시지("한 매장의 성공이 5단계를 거쳐 전국으로 퍼진다")는 **유지**하되, 데이터 구조는 다음처럼 바뀐다:

| | 지금 | 전환 후 |
|---|---|---|
| 케이스 수 | 정확히 5건 | 무제한 |
| 단계당 케이스 수 | 정확히 1건 | 0건 이상 (같은 단계에 여러 건 누적 가능) |
| 안내 배너 | "이 5건이 각 단계를 대표" | "각 단계의 대표 사례들" — 배너는 설명용으로 남고 각 단계 옆에 해당 단계 케이스 수를 표시하거나, 단계 필터 칩과 연결 |
| 대표 사례 지정 | 암묵적(5건이 곧 대표) | `featured` 체크박스로 명시 지정 — 신규 케이스가 쌓여도 상단 고정 사례는 편집자가 결정 |

`CASE_STUDIES_v1.md` §5가 이미 이 방향을 예고했다("다음 5건의 후보 그릇 — 대형마트 2026 Q4·다른 드럭스토어 2027 Q1…") — 본 계획은 그 운영 룰이 돌아갈 수 있는 **기술적 바닥**을 놓는 작업이다.

---

## 7. 마이그레이션 계획 (기존 5건 × 3언어 = 15개 문서)

1. **필드 매핑** — `CaseStudiesView.tsx`의 `C[locale].cases[i]` 각 항목과 병렬 배열(`caseIcons[i]`·`caseIds[i]`·`caseSteps[i]`·`caseProducts[i]`·`metricVerified[i]`)을 §4.1 스키마 필드로 1:1 매핑하는 표를 작성(스크립트 입력값).
2. **변환 스크립트** — `scripts/`에 `migrate-case-studies.mjs` 신설(기존 `scripts/` 안의 블로그 신규글 스크립트 패턴 참고). `CaseStudiesView.tsx`의 데이터 객체를 파싱해 `content/case-studies/{slug}.mdx`(en) · `{slug}-ko.mdx` · `{slug}-jp.mdx` 15개 프론트매터 파일을 생성. `goldenStep`은 `caseSteps[i]`(01~05)를 `discover|verify|translate|sync|remeasure`로 매핑.
3. **검증 게이트** — `npm run build` 그린 + 신규 상세페이지 15개(5 slug × 3 locale) 렌더 확인 + 기존 카드 텍스트와 `git diff` 없는 손실 검증(블로그 전환 때 쓴 "라운드트립 무손실" 기준과 동일, [`blog-keystatic-phase2-proposal.md`](./blog-keystatic-phase2-proposal.md) §4 참고).
4. **`CaseStudyChartMockup` 연결** — 마이그레이션된 `smb-53` 문서에 `showAdoptionChart: true` 세팅.
5. **레거시 정리** — 검증 통과 후 `CaseStudiesView.tsx`(기존 하드코딩 버전)를 삭제하고 `caseStudyRoutes.tsx` 기반 `page.tsx`로 전면 교체.

---

## 8. 에디터 워크플로 — 블로그 배관 재사용

- **`editorGuide` 싱글톤**(Keystatic 안의 편집 가이드, [`KEYSTATIC_ENHANCEMENT_PLAN_v1.md`](./KEYSTATIC_ENHANCEMENT_PLAN_v1.md) G-1)에 "케이스스터디 작성법" 절 추가 — 특히 `verified` 체크박스("실측 vs 예시" 배지)는 **신뢰 관련 필드라 오사용 시 리스크**가 크므로("가상 수치를 실측으로 표기" 사고 방지) 가이드에 굵게 명시.
- **초안(draft)·예약 발행**은 블로그와 동일 배관(B-2·B-3) 그대로 적용 — 별도 구현 불필요.
- **내비게이션 그룹**(`keystatic.config.tsx`의 `ui.navigation`)에 `caseStudies`를 `'자주 편집'` 또는 신설 `'케이스스터디'` 그룹으로 노출.
- **본사 실명·데이터 정확성 승인 절차**는 기술 범위 밖이지만, `CASE_STUDIES_v1.md` §5의 "발행 트리거(도입 후 6개월 + 합의 + KPI 측정 완료)" 운영 룰을 가이드 문서에 함께 기재해 편집자가 "언제 새 케이스를 올려도 되는지" 판단 기준을 갖게 한다.

---

## 9. 단계별 실행 계획

| Phase | 내용 | 게이트 | 개략 공수 |
|---|---|---|---|
| **0. 스파이크** | `caseStudies` 컬렉션 1건 로컬 왕복(Keystatic 저장 → Velite 빌드 → 상세페이지 렌더) — metrics/quotes 같은 `fields.array(fields.object())` 중첩 배열의 직렬화 확인(블로그에서 검증 안 된 필드 타입이라 리스크 지점) | 1건 무손실 왕복 | 0.5일 |
| **1. 스키마·인프라** | §4 Keystatic·Velite 컬렉션 추가, `src/lib/case-studies.ts` | 로컬 빌드 그린 | 1일 |
| **2. 라우팅·컴포넌트** | §5 `CaseStudyCard`·`Index/DetailView`·`caseStudyRoutes.tsx`·6개 `page.tsx` | 목업 데이터로 목록·상세 렌더 확인 | 1.5일 |
| **3. 마이그레이션** | §7 15개 문서 변환 + 검증 + 레거시 삭제 | `npm run build` 그린, `git diff` 무손실 | 1일 |
| **4. 연동 정리** | §5.4 sitemap·breadcrumb·ResourcesView 카피 갱신 | 링크·sitemap 수동 확인 | 0.5일 |
| **5. 편집자 온보딩** | §8 가이드 절 추가 + GitHub 모드로 케이스 1건 실편집 테스트 | 비개발자 1명 실편집 성공 | 0.5일 |
| **6(선택). 필터 UI** | 케이스 8건 이상 누적 시 산업/단계 필터 칩 | UX 검토 | 0.5~1일 |

**총 공수**: Phase 0~5 = 약 4.5~5일(스파이크 포함), Phase 6은 볼륨이 실제로 쌓인 뒤 착수.

---

## 10. 확인이 필요한 의사결정

1. **상세페이지를 지금 만들 것인가, 5건 상태로는 목록 유지 후 6건째부터 만들 것인가?** — 본 계획은 "처음부터 만드는 것"을 권장(§5.2 이유: SEO·공유 단위가 애초에 필요한 게 이번 요청의 본질). 다만 당장 리소스가 빠듯하면 Phase 2를 늦추고 Phase 1(컬렉션화)만 먼저 해도 편집자 셀프 발행은 가능(목록 페이지가 카드+앵커로 여전히 5건을 다 보여주는 현재 방식 유지, 상세페이지는 후속).
2. **Golden Case 5단계를 "1건당 1개 필수 태그"로 유지할지, 다중 선택(`fields.multiselect`)으로 열지?** — 현재 안은 단일 select 권장(단계 배지가 카드 하나에 하나만 보이는 지금 UI를 유지하기 위함). 한 케이스가 두 단계에 걸치는 사례(예: 카페 체인 케이스는 "동기화"이자 "검증" 성격)가 늘면 재검토.
3. **커버 이미지 필수 여부** — 지금 5건은 이미지 자산이 없는 텍스트 중심 카드다. 목록 카드에 이미지가 없으면 블로그보다 밋밋해 보일 수 있는데, 실제 매장 사진 확보(`CASE_STUDIES_v1.md` §6 자산 수집)가 완료되기 전까지는 선택 필드로 두고 이미지 없을 시 아이콘 배지로 대체 렌더링 권장.
4. **`articles`의 `category: 'case-study'` enum 값 처리** — 현재 미사용 상태를 그대로 둘지(사장된 옵션이지만 제거 시 기존 데이터 영향 없음 확인됨, 15개 마이그레이션과 무관), 아니면 정리 차원에서 제거할지는 우선순위 낮은 별건.

---

## 11. 리스크 · 참고했으나 보류

- **중첩 배열 필드(`fields.array(fields.object())`) 직렬화 리스크** — 블로그 컬렉션은 단순 스칼라 배열(`tags`)만 써봤고, `metrics`·`quotes`처럼 객체 배열은 이번이 처음이라 Keystatic ↔ MDX 프론트매터 왕복이 매끄러운지 Phase 0 스파이크에서 반드시 먼저 검증한다.
- **가상(illustrative) 수치를 실측으로 오표기할 리스크** — `verified` 체크박스 하나로 배지가 갈리는 구조라, 편집 가이드에 강조 문구가 없으면 사고 가능성이 있다. §8에서 가이드 보강을 명시했다.
- **CaseBand.tsx(홈) 연동은 범위 밖** — 별도 "Illustrative" 배너로 이미 분리돼 있고 데이터 소스가 다르므로 이번 계획에서 손대지 않는다. 필요 시 후속 과제로 분리.
- **다국어 3벌 동시 발행 강제는 하지 않음** — 블로그처럼 언어별로 파일이 따로 있고 없으면 그 언어 목록에서 단순히 빠진다(en/jp가 비어도 페이지가 깨지지 않는 현재 블로그 동작을 그대로 상속).

---

*— Keystatic 전환 트랙 · 2026-07-15*
