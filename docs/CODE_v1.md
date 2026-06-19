# 코드 변환 플랜 v1 — Phase 4 의 PR 분할·라우팅·redirects·자산 박음

> **버전** v1.0 · **작성** 2026-05-29 · **상위 SOT** [PLAN_v1.1.md](./PLAN_v1.1.md) §0.3 (D1–D10) · §2.1 IA · §2.3 redirects · §7 Phase 4 · **자매 문서** [BRAND_v2.md](./BRAND_v2.md) §3 마스터 카피 사용처 · [DESIGN_v2.md](./DESIGN_v2.md) §4 컴포넌트 인벤토리 · [CASE_STUDIES_v1.md](./CASE_STUDIES_v1.md) 5건 spec · [ASSET_COLLECTION_v1.md](./ASSET_COLLECTION_v1.md) D10 자산 일정 · **상속** `src/` (Next.js 16 · React 19 · Tailwind 4 · framer-motion · velite · react-hook-form/zod)
>
> 본 v1 은 PLAN v1.1 의 30 라우트 IA 결정과 BRAND v2 의 카피 매핑과 DESIGN v2 의 컴포넌트 인벤토리 위에 *현 src/* (storeagent-b2c-landing) 를 새 *deepingsource.io 회사 사이트* 의 Next.js 코드베이스로 변환하는 *PR 단위 분할 플랜* 을 박는다.

---

## 0. 한 페이지 요약

### 0.1 v1 의 목적

`src/` 는 패키지명 `storeagent-b2c-landing` 으로 출발한 코드가 22 라우트 + 17 컴포넌트 디렉토리 + 14 데이터 모듈 + 196 MDX 글 + minisite 라우팅까지 *우산 사이트* 로 이미 성장한 두꺼운 base 다. PLAN v1.1 의 §2.1 IA 결정 (30 라우트 · path-prefix i18n · 4 도메인 분리) 와 BRAND v2 의 30 라우트 카피 매핑과 DESIGN v2 의 30 라우트 컴포넌트 인벤토리 가 모두 정렬된 지금, 남은 일은 *현 src/ 의 22 라우트 폴더를 어느 PR 단위로 어느 새 라우트로 옮기느냐* 의 문제다.

본 v1 은 — (a) 현 src/app 22 라우트 → 새 IA 30 라우트의 *결정 표 한 장*, (b) PR 18 개의 *의존 그래프 + 라인 추정 + 병렬화 가능 영역*, (c) i18n path-prefix 라우팅의 *구현 단계 4*, (d) redirects 일괄 박음 (D3·D5) 의 *next.config.ts 예시*, (e) velite MDX 풀의 *새 4 카테고리 분류*, (f) briefingData live demo (D7) 의 *흡수 경로*, (g) 자산 박음 (D10) 의 *PR-17 합류 지점*, (h) Webflow 즉시 교체 (D8) 의 *DNS 직전 체크리스트*, (i) 매 PR 회귀 체크리스트 — 를 한 문서에 박는다.

### 0.2 본 v1 이 다루는 것 / 다루지 않는 것

**다룬다.**
- 현 src/app 22 라우트 → 새 IA 30 라우트 매핑 (§1.1)
- src/components 17 디렉토리·src/data 14 모듈의 *운명* (§1.2·1.3)
- PR 18 개 (PR-00 ~ PR-18) 의 *의존 그래프* (§2)
- i18n path-prefix 라우팅 구현 (D6) — 옵션 비교 + 권고 + 단계 (§3)
- redirects 일괄 박음 (D3·D5) — next.config.ts 예시 (§4)
- velite MDX 풀 새 분류 (D2 · PR-16) (§5)
- /products/store-agent live demo 섹션 (D7 · PR-03) (§6)
- 자산 박음 (D10 · PR-17) 의 합류 지점 (§7)
- Webflow 즉시 교체 (D8 · PR-18) 의 체크리스트 (§8)
- 매 PR 회귀 체크리스트 (§9)
- 데이터 마이그레이션 sub-track (§10)
- 본 v1 안에서 결정해야 할 Open Q 5종 (§11)

**다루지 않는다.**
- 실제 코드 작성 (각 PR 안에서 작업)
- 디자인 컴포넌트 구현 (DESIGN v2 §4 참조)
- 카피 본문 작성 (BRAND v2 §3·§5 참조)
- 자산 가공 (ASSET_COLLECTION v1 별도 트랙)
- 외부 도메인 (storecare.ai · saai.store · app.deepingsource.io) 의 코드
- 인증 페이지의 app.deepingsource.io 신설 (D5 — 별도 트랙으로 분리, 본 v1 의 PR 범위 밖)

### 0.3 결론 세 줄

1. **22 → 30 라우트는 *대부분 재구성* 이지 *대부분 신설* 이 아니다.** 22 라우트 중 12 라우트는 *카피·디자인만 갈아끼우면* 새 라우트로 옮길 수 있다. 신설은 9 라우트, 외부분기 카드만 2 라우트, 삭제(redirects 만) 5 라우트. PR-01 ~ PR-14 의 13 개 PR 안에서 모두 처리 가능.
2. **PR-00 (i18n) + PR-00.5 (CSS) 가 머지되면, PR-01 ~ PR-14 의 13 개 PR 은 *대부분 병렬* 진행 가능하다.** 라우트 별 독립이라 충돌 적음. PR-15 (redirects) · PR-17 (자산) · PR-18 (Webflow 교체) 만 *마지막 통합* 자리.
3. **i18n 은 옵션 B 변형 (route group + middleware path 분기) 을 권고한다.** D6 의 *en 은 prefix 없음* 결정 때문에 `[lang]` 동적 세그먼트는 자동으로 기각, 단일 라우트 + 헤더 분기 (옵션 C) 는 SEO·hreflang 자동화에 약하다. 옵션 B 가 *D6·SEO·middleware 확장성* 셋 다 잡는다.

---

## 1. 현 코드베이스 정리

### 1.1 현 src/app 22 라우트 → 새 IA 30 라우트 매핑 표

기준: src/app 의 폴더 단위 + 시스템 파일 (layout/error/not-found/loading/opengraph-image/twitter-image/icon/favicon/robots/sitemap/globals/page) 은 별도로 다룬다.

| 현 경로 | 결정 | 새 경로 | PR 번호 | 의존 |
|---|---|---|---|---|
| `/` (page.tsx + HomeHero.tsx) | 재구성 | `/` (en 기본 · `/ko` · `/jp`) | PR-01 | PR-00, PR-00.5 |
| `/about` | 통합 → company | `/company/about` | PR-11 | PR-00 |
| `/company` | 통합 → company | `/company/about` (흡수) | PR-11 | PR-00 |
| `/contact` | 재구성 | `/contact` | PR-14 | PR-00 |
| `/enterprise` | 재구성 | `/enterprise` | PR-09 | PR-00 |
| `/faq` | 통합 → resources | `/resources/faq` | PR-12 | PR-00 |
| `/glossary` (+ `[slug]`) | 통합 → resources | `/resources/glossary` (+ `[slug]`) | PR-12 | PR-00 |
| `/industries` (+ `[slug]`) | 통합 → solutions | `/solutions/{retail,food-beverage,drug,large-space}` | PR-08 | PR-00 |
| `/ms-agent` | 통합 → company | `/company/partnership` | PR-11 | PR-00 |
| `/pricing` (+ `simulator`) | 재구성 | `/pricing` (+ `/simulator`) | PR-10 | PR-00 |
| `/privacy` | 재구성 | `/legal/privacy` | PR-14 | PR-00 |
| `/solutions` (+ `[slug]`) | 재구성 | `/solutions` (+ `{slug}`) | PR-08 | PR-00 |
| `/storeagent` | 재구성 (D3 인라인) | `/products/store-agent` | PR-03 | PR-02 |
| `/storeagent/blog` | 외부분기 (D3) | (redirects → saai.store) | PR-15 | — |
| `/storeagent/how-it-works` | 흡수 (D3) | `/products/store-agent#how-it-works` | PR-03 | PR-02 |
| `/storeagent/newsletter` | 외부분기 (D3) | (redirects → saai.store) | PR-15 | — |
| `/storeagent/pricing` | 흡수 (D3) | `/pricing` (또는 `#pricing` 섹션) | PR-10 | PR-00 |
| `/storeagent/sample` | 외부분기 (D3) | (redirects → app.deepingsource.io) | PR-15 | — |
| `/storecare` | 외부분기 카드 (D4) | `/products/store-care` (카드만) | PR-05 | PR-02 |
| `/storeinsight` | 재구성 풍부 (D4) | `/products/store-insight` | PR-04 | PR-02 |
| `/technology` | 재구성 + 분할 | `/technology` + `/technology/{anonymizer,seal,spatial-ai,models}` | PR-07 | PR-00 |
| `/terms` | 재구성 | `/legal/terms` | PR-14 | PR-00 |
| `/thank-you` | 유지 | `/thank-you` | PR-14 | PR-00 |
| `(신설)` | 신설 | `/products` (4 카드 진열대, D1) | PR-02 | PR-00 |
| `(신설)` | 신설 | `/products/saai` (외부분기 카드, D1) | PR-06 | PR-02 |
| `(신설)` | 신설 | `/company/news` | PR-11 | PR-00 |
| `(신설)` | 신설 | `/company/career` | PR-11 | PR-00 |
| `(신설)` | 신설 | `/company/investors` | PR-11 | PR-00 |
| `(신설)` | 신설 | `/resources/blog` | PR-12 | PR-00 + PR-16 |
| `(신설)` | 신설 | `/resources/case-studies` (5 건, D9) | PR-13 | PR-12 |
| `(신설)` | 신설 | `/resources/docs` | PR-12 | PR-00 |
| `(이관, D5)` | 외부분기 | `/log-in · /sign-up · /user-account · /reset-password · /update-password` → app.deepingsource.io | PR-15 | — |
| `/api/{auth,callback,contact,newsletter}` | 유지 | (그대로) | (별도) | — |

총 — 유지/재구성 12 · 통합 5 · 외부분기 카드 2 · redirects 만 7 · 신설 9. 인증 페이지 5 종은 별도 트랙으로 분리되어 본 PR 범위에서 redirects 만 다룸.

### 1.2 src/components 17 디렉토리의 운명

| 디렉토리 | 파일 수 | 운명 | PR |
|---|---|---|---|
| ui/ (15) | 15 원자·분자 | 유지 + 4-레이어 토큰 적용 | PR-00.5 |
| sections/ (14) | 14 큰 블록 | 유지 + 새 IA 섹션 추가 | PR-01 · PR-03 · PR-04 |
| shared/ (2) | 2 | 유지 | — |
| layout/ (7) | Header·Footer·Wrapper 등 | 유지 + 회사 사이트 Header/Footer 추가 또는 분기 | PR-00 |
| mockups/ (30) | iPhone·Tablet·MacBook + 시나리오 12 + 제품 6 등 | 유지 (Products live demo D7 의 입력) | PR-03 · PR-04 |
| about/ (1) | OriginStoryTimeline | `/company/about` 로 이전 | PR-11 |
| company/ (1) | VisionDiagram | `/company/about` 로 이전 | PR-11 |
| industries/ (10) | 10 종 | `/solutions/{slug}` 로 이전 | PR-08 |
| pages/ (1) | StoreAgentContent | `/products/store-agent` 로 이전 | PR-03 |
| pricing/ (4) | Camera*·PlanComparison·PricingCard·PricingClientView | `/pricing` 로 이전 | PR-10 |
| solutions/ (1) | SolutionMockupPreview | `/solutions` 로 이전 | PR-08 |
| storecare/ (3) | DetectionGallery·HowItWorksStepper·DeviceSwitcher | `/products/store-care` 카드의 미리보기로 축소 (D4) | PR-05 |
| storeinsight/ (2) | DeviceSwitcher·HowItWorksInsightStepper | `/products/store-insight` 로 이전 | PR-04 |
| storeagent/ (별도 폴더 없음, src/components/sections/AgentMockupShowcase + pages/StoreAgentContent) | — | `/products/store-agent` 로 통합 | PR-03 |
| technology/ (1) | AnonymizationPipeline | `/technology` + `/technology/anonymizer` 로 이전 | PR-07 |
| blog/ (7) | ArticleCard·ArticleRenderer·FloatingCta·ReadingProgress·TableOfContents·mdx-components 등 | `/resources/blog` 로 이전 | PR-12 |
| HomeHero.tsx | 1 | `/` 의 새 Hero 로 재구성 (BRAND v2 §3 의 두 마스터 카피 박음) | PR-01 |
| Analytics.tsx | 1 | 유지 (Umami) | — |

### 1.3 src/data 14 데이터 모듈의 운명

| 파일·폴더 | 운명 | 새 자리 | PR |
|---|---|---|---|
| briefingData.ts | 흡수 (D7) | `/products/store-agent` live demo 섹션 | PR-03 |
| cctvImages.ts | 정돈 | `/products/*` + `/technology/*` 의 자산 인덱스 | PR-04 · PR-05 · PR-07 |
| siteImages.ts | 정돈 | 전역 자산 인덱스 | PR-17 |
| glossaryTerms.ts | 유지 | `/resources/glossary` | PR-12 |
| industryContent.ts | 이전 | `/solutions/{slug}` 의 본문 | PR-08 |
| industryList.ts | 이전 | `/solutions` 카드 그리드 | PR-08 |
| solutionsData.ts | 이전 | `/solutions` 카탈로그 | PR-08 |
| posAnalysisData.ts | 유지 | mockups · POSAnalysisSection | PR-01 |
| storecare-page-data.ts | 축소 (D4) | `/products/store-care` 카드의 미리보기 | PR-05 |
| storeCareScenarios.ts | 외부분기 (D4) | `/products/store-care` 카드의 일부 + storecare.ai | PR-05 |
| storeinsight-page-data.ts | 풍부 (D4) | `/products/store-insight` 의 본문 | PR-04 |
| mockup-scenarios/ (4) | 유지 | enterprise · storeagent · storecare-extended · storeinsight 각자의 자리 | PR-03 · PR-04 · PR-05 · PR-09 |
| seasonal/ (9) | 외부분기 (D2) | saai.store 시즌 카드의 입력 | PR-16 |
| articles/types.ts | 유지 | velite/MDX 타입 | PR-16 |

src/data 의 정돈 원칙 — *카피·시각 자산을 분리한 jsdoc-free 풀* 이라는 결을 그대로 유지. PR 안에서 *경로만 옮기고 import path 갱신* 이 핵심.

---

## 2. PR 분할 전략

### 2.1 19 개 PR 의 의존 그래프

| PR # | 제목 | 범위 | 의존 | 라인 추정 |
|---|---|---|---|---|
| PR-00 | i18n 라우팅 + middleware 확장 (D6) | path-prefix 라우팅 + middleware 의 minisite + i18n 분기 통합 + `src/lib/i18n.ts` 신설 | 없음 | 200-400 |
| PR-00.5 | dist CSS 갱신 (Phase 3 W4 산출 박음) | DESIGN v2 §3 의 13 CSS 갱신 + `corporate-audience` body 클래스 + en typography 보강 | 없음 (병렬) | 100-300 |
| PR-01 | 홈 `/` 재구성 | `src/app/page.tsx` 재작성 + `HomeHero.tsx` 재구성 + DomainShowcase · MasterPair · Weaving4Step · PartnerGrid 신설 | PR-00, PR-00.5 | 500-800 |
| PR-02 | `/products` 진열대 (D1 4 카드) | 신규 `src/app/products/page.tsx` + 4 카드 컴포넌트 (Store Insight · Store Agent · Store Care 외부 · SAAI 외부) | PR-00 | 300-500 |
| PR-03 | `/products/store-agent` (D3 + D7) | `src/app/storeagent/page.tsx` 통합 + 새 라우트 + briefingData live demo 흡수 + how-it-works · pricing 인라인 섹션 | PR-02 | 400-700 |
| PR-04 | `/products/store-insight` (D4 풍부 페이지) | `src/app/storeinsight/page.tsx` 통합 + 새 라우트 + 카피 정돈 (PLUS INSIGHT 잔재 제거) | PR-02 | 300-500 |
| PR-05 | `/products/store-care` 외부분기 카드 (D4) | `src/app/storecare/page.tsx` → 카드 페이지 축소 + storecare.ai CTA + 미리보기 | PR-02 | 100-200 |
| PR-06 | `/products/saai` 외부분기 카드 (D1) | 신규 카드 페이지 + saai.store CTA + 메타 | PR-02 | 100-200 |
| PR-07 | `/technology` + 4 서브 | `src/app/technology/page.tsx` 분할 + `/anonymizer · /seal · /spatial-ai · /models` 4 신규 라우트 | PR-00 | 500-800 |
| PR-08 | `/solutions` + 4 업종 + `/industries` 통합 | `src/app/solutions` + `src/app/industries` 흡수 + `/large-space` 신설 + 4 업종 슬러그 정돈 | PR-00 | 400-600 |
| PR-09 | `/enterprise` 재구성 + Golden Case 5단계 | `src/app/enterprise/page.tsx` 재구성 + HQ Sales Deck v1 흡수 + Golden Case 5단계 본문 | PR-00 | 300-500 |
| PR-10 | `/pricing` + simulator | `src/app/pricing/page.tsx` + `simulator/page.tsx` 재구성 + 4 시작점 카드 | PR-00 | 200-400 |
| PR-11 | `/company/*` 5 페이지 | `src/app/{about,company,ms-agent}` 통합 + `/news · /career · /partnership · /investors` 분기 | PR-00 | 500-800 |
| PR-12 | `/resources/*` 4 페이지 | `src/app/{faq,glossary}` + 신규 `/blog · /case-studies · /docs` | PR-00, PR-16 | 400-700 |
| PR-13 | `/resources/case-studies/` 5 건 발행 (D9) | CASE_STUDIES_v1 의 5 건 → MDX 페이지 + 자산 박음 | PR-12 | 200-400 |
| PR-14 | `/contact` + `/legal/*` + `/thank-you` | 시스템 페이지 — `src/app/{contact,privacy,terms,thank-you}` 재구성 | PR-00 | 200-300 |
| PR-15 | redirects 일괄 박음 (D3·D5) + sitemap + robots + OG | `next.config.ts` + `sitemap.ts` + `robots.ts` + `opengraph-image.tsx` + `twitter-image.tsx` 다국어 hreflang | PR-01 ~ PR-14 | 300-500 |
| PR-16 | velite MDX 풀 새 분류 | `velite.config.ts` 갱신 + content/articles 재정돈 (insight · tip · guide · case-study 4 카테고리) | 없음 (병렬) | 200-400 |
| PR-17 | 자산 박음 (D10) | ASSET_COLLECTION v1 의 가공 끝난 자산 — 임원·오피스·매체·파트너·인포그래픽·hero | PR-01 ~ PR-11 + ASSET_COLLECTION 진행 | 100-200 (자산 import) |
| PR-18 | Webflow 즉시 교체 준비 (D8) | DNS · 404 캐치 · 회귀 체크 · 외부 발행 | PR-01 ~ PR-17 모두 | 100-200 |

라인 추정은 *(추정)* — 실제 라인은 디자인 컴포넌트의 깊이에 따라 ±30%.

### 2.2 PR 의존 그래프 시각

```
PR-00 (i18n) ──┬─→ PR-01 (홈) ──→ PR-02 (/products) ──┬─→ PR-03 (store-agent)
PR-00.5 (CSS) ─┤                                       ├─→ PR-04 (store-insight)
               │                                       ├─→ PR-05 (store-care 카드)
               │                                       └─→ PR-06 (saai 카드)
               │
               ├─→ PR-07 (/technology)
               ├─→ PR-08 (/solutions + /industries 흡수)
               ├─→ PR-09 (/enterprise)
               ├─→ PR-10 (/pricing)
               ├─→ PR-11 (/company/*)
               ├─→ PR-12 (/resources/*) ──┬─→ PR-13 (case-studies 5 건)
               │                          │
               └─→ PR-14 (/contact · /legal/*)
                                                       ↓
PR-16 (velite) ──→ PR-12, PR-13                       ↓
                                                       ↓
                                                      PR-15 (redirects · sitemap · OG)
                                                       ↓
                                                      PR-17 (자산 박음)
                                                       ↓
                                                      PR-18 (Webflow 즉시 교체)
```

### 2.3 병렬화 가능 영역

- **PR-00 · PR-00.5 · PR-16** — 세 PR 은 처음부터 *동시 진행 가능*. PR-00 은 라우팅, PR-00.5 는 CSS, PR-16 은 콘텐츠 풀.
- **PR-02 후 PR-03 ~ PR-06** — 4 제품 카드 PR 은 *완전 병렬*. 각자 다른 라우트, 의존 없음.
- **PR-07 ~ PR-14 의 7 개 PR** — PR-00 이 머지된 후 *대부분 병렬* 가능. 라우트별 독립.
- **PR-12 후 PR-13** — case-studies 5 건은 `/resources/case-studies/` 폴더 만들어진 후 *글 단위 병렬* 가능.
- **PR-15 · PR-17 · PR-18** — *순차 마지막 단계*. PR-15 → PR-17 → PR-18 의 셋은 *직렬*.

병렬 진행 권고 — *2-3 명* 작업자가 동시에 라우트별 PR 진행 시 *Phase 4 전체 4-6 주* 가능 (추정).

---

## 3. i18n path-prefix 라우팅 구현 (D6)

### 3.1 Next.js App Router 의 path-prefix 패턴 3 옵션 비교

| 옵션 | 설명 | 장점 | 단점 | 권고 |
|---|---|---|---|---|
| **A. `[lang]` 동적 세그먼트** | 모든 페이지 `app/[lang]/...` 안에 박음 | 표준 패턴, hreflang 자동 | en 도 prefix 필요 (D6 와 모순) | **기각** |
| **B. route group + middleware 분기** | `(en)`, `(ko)`, `(jp)` 그룹 동시 정의 + middleware path 분기 | en prefix 없음 + ko/jp prefix + hreflang 가능 | route group 안에서 중복 페이지 정의 필요, 또는 단일 페이지 + locale prop | **권고** |
| **C. 단일 라우트 + 헤더/쿠키** | locale 을 header/cookie 로 결정 | 가장 단순 | SEO·hreflang 약함, sitemap 자동화 어려움 | **기각** |

**v1 권고: 옵션 B 변형** — 현 src/app 의 page.tsx 들을 *content provider* 로 두고, `/` 는 prefix 없는 기본 영문 (또는 ko 기본 — Q1), `/ko/*` 와 `/jp/*` 는 별도 prefix 라우트로 처리. middleware 가 cookie/Accept-Language 로 자동 redirect.

옵션 B 변형의 구체 형태 — *page.tsx 하나에 locale prop 받기*, *route group 으로 polling 차단*, *middleware 가 `/` 와 `/ko` · `/jp` 의 진입을 분기*.

### 3.2 구현 단계 (PR-00 안에서)

1. **`src/lib/i18n.ts` 신설** — `Locale` 타입 (`'en' | 'ko' | 'jp'`), `locales` 배열, `defaultLocale`, `getTranslation()` 함수.
2. **route group 또는 `[lang]` 신설** — 옵션 B 변형 권고. 단일 `src/app/page.tsx` 가 locale prop 받아 콘텐츠 분기, ko/jp 는 `src/app/ko/page.tsx` · `src/app/jp/page.tsx` 가 동일 컴포넌트에 다른 locale 넘김.
3. **middleware.ts 확장** — 현 minisite 호스트 분기 + path 첫 세그먼트 (`/ko` · `/jp`) 분기. cookie `NEXT_LOCALE` 우선, 없으면 Accept-Language 헤더, 그래도 없으면 default.
4. **콘텐츠 분기 패턴** — 페이지 컴포넌트는 locale 받아 *콘텐츠만 분기*, 컴포넌트 자체는 한 벌. 카피는 BRAND v2 §3 의 다국어 풀에서 가져옴.
5. **sitemap.ts · robots.ts 갱신** — hreflang 자동 생성 (`x-default`, `en`, `ko`, `ja`).

### 3.3 콘텐츠 분기 패턴 (코드 스케치, 추정)

```tsx
// src/lib/i18n.ts (신설)
export type Locale = 'en' | 'ko' | 'jp';
export const locales = ['en', 'ko', 'jp'] as const;
export const defaultLocale: Locale = 'en';

// src/app/page.tsx (en 기본)
export default function HomePage() {
  return <Home locale="en" />;
}

// src/app/ko/page.tsx
export default function KoHomePage() {
  return <Home locale="ko" />;
}

// src/components/Home.tsx (재사용)
export function Home({ locale }: { locale: Locale }) {
  const t = getTranslation(locale, 'home');
  return <HomeHero copy={t.hero} />;
}
```

**대안 — 단일 dynamic catch-all**: `src/app/[[...slug]]/page.tsx` 안에서 locale 분기. *너무 큰 단일 페이지* 가 되어 권고 안 함.

---

## 4. redirects 일괄 박음 (D3·D5)

PLAN v1.1 §2.3 의 redirects 표를 `next.config.ts` 의 `redirects()` 함수에 박는다. 현 src/middleware.ts 의 minisite 분기는 *유지*, redirects 는 *next.config.ts 와 middleware 분담*.

### 4.1 next.config.ts 갱신 예시 (PR-15)

```ts
async redirects() {
  return [
    // 제품 라우트 정돈 (301 영구)
    { source: '/store-insight', destination: '/products/store-insight', permanent: true },
    { source: '/storeagent', destination: '/products/store-agent', permanent: true },
    { source: '/storeagent/how-it-works', destination: '/products/store-agent#how-it-works', permanent: true },
    { source: '/storeagent/pricing', destination: '/pricing', permanent: true },
    { source: '/storecare', destination: '/products/store-care', permanent: true },

    // 기술 라우트 정돈
    { source: '/seal', destination: '/technology/seal', permanent: true },
    { source: '/tech-anonymizer', destination: '/technology/anonymizer', permanent: true },
    { source: '/tech-spatial-ai', destination: '/technology/spatial-ai', permanent: true },
    { source: '/tech-store-care-ai', destination: '/products/store-care', permanent: true },

    // 회사 라우트 정돈
    { source: '/about-us', destination: '/company/about', permanent: true },
    { source: '/news', destination: '/company/news', permanent: true },
    { source: '/career', destination: '/company/career', permanent: true },
    { source: '/ms-agent', destination: '/company/partnership', permanent: true },

    // 리소스 라우트 정돈
    { source: '/blog', destination: '/resources/blog', permanent: true },
    { source: '/post/:slug', destination: '/resources/blog/:slug', permanent: true },
    { source: '/pi-docs', destination: '/resources/docs', permanent: true },
    { source: '/pi-manual/:slug', destination: '/resources/docs/:slug', permanent: true },

    // 외부 도메인 분기 (302 임시 — D3·D5)
    { source: '/storeagent/blog', destination: 'https://saai.store/archive', permanent: false, basePath: false },
    { source: '/storeagent/newsletter', destination: 'https://saai.store/landing', permanent: false, basePath: false },
    { source: '/storeagent/sample', destination: 'https://app.deepingsource.io/sample', permanent: false, basePath: false },
    { source: '/log-in', destination: 'https://app.deepingsource.io/log-in', permanent: false, basePath: false },
    { source: '/sign-up', destination: 'https://app.deepingsource.io/sign-up', permanent: false, basePath: false },
    { source: '/user-account', destination: 'https://app.deepingsource.io/user-account', permanent: false, basePath: false },
    { source: '/reset-password', destination: 'https://app.deepingsource.io/reset-password', permanent: false, basePath: false },
    { source: '/update-password', destination: 'https://app.deepingsource.io/update-password', permanent: false, basePath: false },
  ];
}
```

총 약 **24-28 건** 의 redirects. Webflow → Next 교체 후 *외부 deepingsource.io 의 구 URL* 도 새 Next 사이트가 다 받아내야 함 — D8 의 즉시 교체 안전성의 핵심.

### 4.2 middleware 와의 분담

- **next.config.ts redirects()** — *path 기반 단순 매핑* (대부분의 D3·D5 redirects 가 여기 속함)
- **middleware.ts** — *host 기반 분기* (minisite 라우팅) + *locale 자동 redirect* (PR-00 에서 확장)

현 middleware.ts 의 `mainSiteRedirects` 객체는 PR-15 머지 시 *next.config.ts 로 이관* — 두 자리에서 redirects 가 박히면 충돌 가능.

---

## 5. velite MDX 풀 새 분류 (D2 · PR-16)

### 5.1 현 content/articles 6 카테고리 → 새 4 카테고리

현 velite.config.ts 의 `category` enum 은 `['guide', 'case-study', 'insight', 'weekly']` 4 종으로 이미 좁혀져 있다. 그러나 `content/articles/` 의 실제 카테고리는 6 종 (`tip · season · weekly` 추가). 정합이 필요.

| 현 카테고리 | 글 수 | 새 분류 | 새 위치 | 비고 |
|---|---|---|---|---|
| insight | 73 | insight (회사 인사이트) | `/resources/blog` | B2B 위주 큐레이션 (D2) |
| tip | 53 | (이관) | saai.store 외부분기 | 점주 운영 팁 (D2) |
| guide | 19 | guide (회사 가이드) | `/resources/blog` 또는 `/resources/docs` | 도구·기술 가이드는 docs, 운영 가이드는 blog |
| season | 25 | (이관) | saai.store 시즌 카드 | D2 |
| weekly | 26 | (이관) | saai.store 스토어레터 | D2 |
| case-study | 0 | case-study (신설, D9) | `/resources/case-studies` | Phase 4 에서 5 건 발행 |

총 — *회사 사이트 잔류 92 글* (insight 73 + guide 19) + *saai.store 이관 104 글* (tip 53 + season 25 + weekly 26) + *case-study 신설 5 건*. 현 풀 196 의 약 47% 가 회사 사이트로, 53% 가 saai.store 로 분리.

### 5.2 velite.config.ts 갱신 (PR-16)

```ts
const articles = defineCollection({
  name: 'Article',
  pattern: 'articles/**/*.mdx',
  schema: s.object({
    slug: s.string(),
    title: s.string(),
    excerpt: s.string(),
    category: s.enum(['guide', 'case-study', 'insight']),  // 4 → 3 (weekly 빠짐, 이관)
    lang: s.enum(['en', 'ko', 'jp']).default('ko'),  // 다국어 추가 (D6)
    date: s.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    readTime: s.number(),
    tags: s.array(s.string()).default([]),
    icon: s.string().default('Newspaper'),
    relatedSlugs: s.array(s.string()).optional(),
    target: s.enum(['company', 'saai']).default('company'),  // 분배 (D2)
    body: s.raw(),
  }),
});
```

- **`lang` 필드 추가** — 다국어 풀 분배
- **`target` 필드 추가** — `company` (회사 블로그) vs `saai` (saai.store 이관 큐) — *빌드 시 target=saai 는 빌드 결과에서 제외 또는 외부 export* (PR-16 의 부속 작업)

### 5.3 이관 작업 (Q3 의 결정 필요)

`target=saai` 의 154 글 (tip·season·weekly) 의 saai.store 이관 방법 — 자동 스크립트 vs 수동 발행. *자동 스크립트* (frontmatter 추출 → saai.store 의 데이터 모델로 변환 → API 또는 CMS import) 권고 (추정).

---

## 6. /products/store-agent live demo 섹션 (D7 · PR-03)

### 6.1 briefingData.ts → live demo 변환

- **현 src/data/briefingData.ts** — `/storeagent` · `/storeagent/sample` 의 모닝 브리핑 시뮬 데이터
- **새 자리** — `/products/store-agent` 의 인터랙티브 데모 섹션 (D7)
- **컴포넌트** — `<LiveDemo data={briefingData} />` (신설, src/components/products/LiveDemo.tsx 추정)
- **디자인** — DESIGN v2 §4 의 Products 모드 (KPI 차트 + before/after + 인터랙션)

### 6.2 흡수 경로

PR-03 안에서 — (a) `src/app/storeagent/page.tsx` + `pages/StoreAgentContent.tsx` + `sections/AgentMockupShowcase` 를 `src/app/products/store-agent/page.tsx` 로 통합, (b) `how-it-works` · `pricing` 의 본문을 인라인 섹션으로 박음, (c) `briefingData.ts` 를 `LiveDemo` 컴포넌트의 데이터로 박음, (d) `mockups/Briefing*` 등 모닝 브리핑 mockup 30 개 중 관련 자산을 live demo 의 시각 입력으로.

`/storeagent/sample` 는 외부분기 (D3) — *live demo 와 sample 은 별개*. live demo 는 *회사 사이트 안의 인터랙션*, sample 은 *외부 app 의 체험 계정*.

---

## 7. 자산 박음 (D10 · PR-17)

ASSET_COLLECTION_v1 §3 일정과 정합 — Phase 3 W1-W3 의 *가공 끝난 자산* 을 PR-17 에서 박음.

### 7.1 박음 위치 (PR-17)

```
public/images/new/
├ executives/      (임원 사진 — Phase 2-3 발주 결과)
├ office/          (오피스 사진 — Phase 2-3 발주 결과)
├ media-logos/     (88+ 매체 로고 — 흑백 통일 후)
├ partner-logos/   (파트너 로고 — 저작권 정리 후)
├ infographics/    (4단계 루프 · MTMC 등 — 재제작)
└ hero/            (en/ko/jp 별 hero key visual)
```

### 7.2 박음 작업 (PR-17 안에서)

- 각 페이지의 import 갱신 — `/company/about` → executives + office, `/company/news` → media-logos, `/` + `/products` → partner-logos, `/technology` → infographics, `/` → hero
- 다국어 alt 텍스트 박음 (Q5 의 결정 필요)
- OG 이미지 자동 생성 (PR-15 와 함께)

### 7.3 합류 지점

PR-17 은 *ASSET_COLLECTION_v1 의 진행 상황에 의존*. ASSET_COLLECTION Phase 3 W1-W3 가 *완료* 된 후 PR-17 진행 가능. 진행이 지연되면 *플레이스홀더 박고 일단 발행* 후 *나중에 자산 교체* 도 가능 (추정).

---

## 8. Webflow 즉시 교체 (D8 · PR-18)

### 8.1 DNS 교체 직전 체크리스트

- [ ] 새 Next 사이트의 모든 30 라우트 빌드 성공 (en/ko/jp)
- [ ] PLAN v1.1 §2.3 의 redirects 모두 적용 (PR-15 머지)
- [ ] sitemap.xml 의 hreflang 정확 (`x-default`, `en`, `ko`, `ja`)
- [ ] robots.txt 의 Sitemap 지시 정확
- [ ] OG 이미지 자동 생성 (en/ko/jp 별)
- [ ] Webflow 의 catchsecu 외부 개인정보 처리방침 링크 → 새 사이트 `/legal/privacy` 가 받아내거나 외부 유지 결정
- [ ] DS 라이브의 88+ news 외부 링크 모두 새 사이트 `/company/news` 에 박힘
- [ ] DS 라이브의 19 blog 글 모두 새 사이트 `/resources/blog` 에 박힘 (en 우선, ko 동시)
- [ ] DS 라이브의 pi-manual 10 페이지 모두 새 사이트 `/resources/docs/` 에 박힘
- [ ] 5 건 case-study (D9) 발행 완료 (PR-13 머지)
- [ ] 자산 박음 완료 (PR-17 머지)
- [ ] 다국어 (en/ko/jp) 모두 빌드 통과
- [ ] api routes (auth · callback · contact · newsletter) 동작 확인
- [ ] DNS TTL 단축 (1주 전)
- [ ] 404 모니터링 도구 준비 (Sentry · Umami · 또는 Vercel Analytics)

### 8.2 즉시 교체 액션 (PR-18 의 산출)

1. **DNS A 레코드 (또는 CNAME) 변경** — Webflow → Vercel (또는 새 호스팅) 으로
2. **1시간 후 404 모니터링 확인** — 예상 못한 구 URL 이 404 로 떨어지는지
3. **미해결 404 → 추가 redirects 박음** — PR-15 의 next.config.ts 갱신 + 즉시 재배포
4. **1주 후 Webflow 본 사이트 종료** — 안정성 확인 후 Webflow 구독 종료

### 8.3 Webflow 교체 시 SEO sitemap 일시 변동 관리 (Q2)

D8 의 즉시 교체는 *SEO 인덱스 변동* 을 의미 — Google Search Console 에 새 sitemap 즉시 제출, 구 URL 의 301 redirects 가 작동하는지 확인, *수주 단위 인덱스 안정화 기간* 필요.

---

## 9. 회귀 체크리스트 (Phase 4 안에서 매 PR 마다)

각 PR 머지 전 자동/수동 체크:

- [ ] `npm run build` 통과
- [ ] `npm run lint` 통과
- [ ] `npm test` 통과 (vitest)
- [ ] 새 라우트의 OG 메타·hreflang 정확
- [ ] 4-레이어 토큰 적용 확인 (DESIGN v2 §2.2 — Company / Products / Technologies / Vision Models)
- [ ] BRAND v2 §3 카피 매핑 정합 (두 마스터 사용처)
- [ ] 다국어 (en/ko/jp) 모두 빌드
- [ ] redirects 동작 (PR-15 머지 후 모든 PR)
- [ ] 자산 import path 정확 (PR-17 머지 후)
- [ ] minisite 라우팅 영향 없음 (`agent.saai.store` 호스트 유지)

추가 — PR-01 (홈) · PR-03 (store-agent) · PR-04 (store-insight) · PR-11 (about) 처럼 *시그니처 자리* 는 *카피 한 자 한 자 의 정합* 까지 확인 (BRAND v2 §3 의 카피 매핑 표 참조).

---

## 10. 데이터 마이그레이션 sub-track

### 10.1 단계

1. **현 content/articles 의 카테고리 정합 확인** (PR-16 직전) — 196 글의 실제 frontmatter `category` 가 6 종 중 어디인지 카운트
2. **velite.config.ts 갱신** — `category` enum 갱신 + `lang` · `target` 필드 추가 (PR-16)
3. **`target=saai` 의 154 글 분리** — 별도 폴더 `content/articles-saai/` 또는 frontmatter 만 분기 후 빌드 시 제외
4. **빌드 후 새 데이터 사용** — `/resources/blog` 는 `target=company` 글만 노출
5. **saai.store 이관 작업** (별도 트랙) — 자동 스크립트 또는 수동 발행

### 10.2 src/data 의 JSON 데이터 마이그레이션

- `briefingData.ts` → PR-03 안에서 LiveDemo 의 데이터로
- `industryContent.ts · industryList.ts · solutionsData.ts` → PR-08 안에서 `/solutions/{slug}` 로
- `storecare-page-data.ts · storeCareScenarios.ts` → PR-05 안에서 축소 카드의 미리보기로
- `storeinsight-page-data.ts` → PR-04 안에서 풍부 페이지로
- `glossaryTerms.ts` → PR-12 안에서 `/resources/glossary` 로
- 다국어 (en/ko/jp) 분기 — Q4 의 결정 필요

---

## 11. Open Questions (Phase 4 안에서 결정 필요)

- **Q1. 기본 locale 의 선택 — en vs ko.** D6 는 `/` = en, `/ko · /jp` prefix 로 명시. 그러나 현 사이트는 ko 가 1등 청자라 *en 기본은 상권 손실 위험*. v1 권고: **en 기본 + middleware 가 Accept-Language `ko` 면 자동 `/ko` redirect** — D6 와 한국 상권 둘 다 잡음.
- **Q2. Webflow 교체 시 *기간 한정 병존* 여부.** D8 는 *즉시 교체* 결정. v1 권고: **즉시 교체 + 1주 모니터링** (PLAN v1.1 §0.3 D8 정합).
- **Q3. saai.store 로 이관할 tip/season/weekly 154 글의 *실제 이관 방법*.** 자동 스크립트 vs 수동. v1 권고: **frontmatter 추출 → saai.store CMS import 자동 스크립트**, 단 *발행 큐레이션은 수동* (saai.store 인벤토리의 18 archive 글 수준에 맞춰).
- **Q4. src/data 의 JSON 다국어 (en/ko/jp) 분기 방법.** 한 파일 안에 다국어 키 vs 파일 분리 (`industryContent.{en,ko,jp}.ts`). v1 권고: **파일 분리** — velite frontmatter `lang` 필드와 정합.
- **Q5. PR 머지 순서의 *주차 일정* — PR-00·01 후 *몇 주에 걸쳐* PR-02~14 를 진행할지.** v1 권고: **PR-00·00.5·16 동시 (1주차) → PR-01 + 병렬로 PR-02·07·08·11 (2-3주차) → PR-03·04·05·06·09·10·12·14 (3-4주차) → PR-13 (4주차) → PR-15·17 (5주차) → PR-18 (6주차)** — 총 *4-6 주* (추정, 2-3 작업자 가정).

---

## 12. 다음 단계

1. **본 v1 검토·승인** — 19 PR 의존 그래프와 라인 추정의 정합 확인
2. **PR-00 (i18n) + PR-00.5 (CSS) + PR-16 (velite) 즉시 시작** — 세 PR 은 의존 없음
3. **ASSET_COLLECTION 진행 동기 확인** — PR-17 의 진입 가능 시점 결정
4. **BRAND v2 §5 의 신설 카피 11 자리 작성 진행 확인** — PR-02 이후의 카피 필요
5. **DESIGN v2 §4 의 corporate 컴포넌트 구현 진행 확인** — PR-01 이후의 컴포넌트 필요
6. **Phase 5 (Webflow 즉시 교체 + 발행)** — 본 v1 의 PR-18 이 Phase 5 의 입력

---

## 부록 A — PR 별 카피·자산·컴포넌트 의존 매트릭스

| PR | BRAND v2 § | DESIGN v2 § | ASSET_COLLECTION v1 § | CASE_STUDIES_v1 § |
|---|---|---|---|---|
| PR-01 (홈) | §3 마스터 카피 사용처 | §4 Hero · DomainShowcase · MasterPair · Weaving4Step · PartnerGrid | §1.3 · §1.4 (Hero · 파트너 로고) | — |
| PR-02 (/products) | §3 4 카드 카피 + §5 신설 11 자리 중 SAAI 카드 | §4 4 카드 컴포넌트 | — | — |
| PR-03 (store-agent) | §3 store-agent + §5 신설 (live demo 카피) | §4 Products 모드 + LiveDemo | — | Case 2 (편의점 100 점포) |
| PR-04 (store-insight) | §3 store-insight | §4 Products 모드 | — | Case 3 (드럭스토어) |
| PR-05 (store-care 카드) | §3 store-care 카드 (점주 마스터) | §4 외부분기 카드 | — | Case 1 (53명) · Case 4 (카페) |
| PR-06 (saai 카드) | §5 신설 SAAI 카드 카피 | §4 외부분기 카드 | — | — |
| PR-07 (/technology) | §3 technology + §5 신설 (Vision Models) | §4 Technologies 모드 | §2.1 인포그래픽 (MTMC 등) | Case 5 (대형 공간 익명화) |
| PR-08 (/solutions) | §3 solutions + §5 신설 (large-space) | §4 Solutions 모드 | — | — |
| PR-09 (/enterprise) | §3 enterprise + §5 신설 (Golden Case 5단계) | §4 Hero + KPI | — | 5 건 모두 (요약 박스) |
| PR-10 (/pricing) | §3 pricing | §4 가격 카드 | — | — |
| PR-11 (/company/*) | §3 company + §5 신설 (investors) | §4 Company 모드 | §1.1 · §1.2 임원 · 오피스 | — |
| PR-12 (/resources/*) | §3 resources | §4 블로그 · docs | — | — |
| PR-13 (case-studies 5건) | §3 case-studies | §4 case-study 카드 | §2.2 (case 자산) | 5 건 전체 |
| PR-14 (/contact · /legal/*) | §3 legal | §4 폼·시스템 | — | — |

---

## 부록 B — 본 v1 의 한 줄

*22 라우트 + 17 컴포넌트 디렉토리 + 14 데이터 모듈 + 196 MDX 글 + minisite 라우팅의 두꺼운 base 를 — 19 PR 의 의존 그래프와 path-prefix i18n 한 자리와 redirects 24 건과 4 카테고리 velite 풀과 5 건 case-study 발행과 D10 자산 박음과 D8 Webflow 즉시 교체 — 8 자리에 정렬한 한 페이지.*

— *끝.*
