# 사이트 개선 계획 — 리뷰 반영 (2026-07-16)

> 대상: https://ds-hp-temp.vercel.app/ (deepingsource.io 신규 홈페이지)
> 입력: 2026-07-16 내부 리뷰 8개 항목
> 관련 문서: DeepingSource_제품라인업_SAAI_재정비안.md · AEO-SEO-개발계획-260714.md · PLAN_v1.1.md

## 0. 결정 사항 (2026-07-16 확정)

- 가이드 글: **삭제 아닌 숨김**(draft: true). weekly는 유지. 파일 보존, 복구 가능.
- store → saai 네이밍: **표기 + URL 모두 전환**. 기존 store-* URL은 301 리다이렉트.
- 이번 세션에서 P0 즉시 실행, 나머지는 본 계획서 기준으로 순차 진행.

## 1. 현황 진단 (코드 기준)

- 콘텐츠: articles 242개 (insight 118 · guide 97 · weekly 26). velite 스키마에 `draft` 필드와
  목록 필터(`articles.ts` / `article-metadata.ts`)가 이미 존재 → 숨김은 frontmatter만 추가하면 됨.
- **ko 느림 원인**: `BlogIndexView`가 로케일 전체 글을 페이지네이션 없이 한 번에 렌더.
  ko가 글 수가 가장 많아 목록 페이지가 가장 무거움. guide 97개 숨김만으로도 목록이 ~40% 감소.
- /demo: 목업 갤러리(MockupGallery). `robots: noindex`는 있으나 **CtaBand "라이브 데모 보기"
  링크로 전 페이지에 노출** 중. /styleguide도 같은 성격의 내부용 페이지.
- 네이밍: `brand-canon.ts`에 saai = 가치 브랜드 / store = 도메인 구현이라는 재정비안(§14/§15)이
  이미 정의됨. 그러나 라우트·컴포넌트(`ProductsView` 등)는 여전히 store-* 기준.
- 한글 타이포: `globals.css`에 전역 `word-break: keep-all` 있음. 그러나 수동 줄바꿈·긴 헤드라인
  balance 미적용 구간에서 어색한 줄바꿈 발생.
- 이벤트/특별 페이지: 전용 구조 없음 (velite 컬렉션·라우트·운영 가이드 모두 부재).

## 2. 우선순위 로드맵

### P0 — 즉시 (이번 세션 실행)

| # | 항목 | 작업 | 파일 |
|---|------|------|------|
| P0-1 | guide 글 숨김 | category: guide인 mdx 97개에 `draft: true` 추가 | content/articles/*.mdx |
| P0-2 | /demo 숨김 | CtaBand의 데모 링크 제거 + /demo·/styleguide는 프로덕션에서 404 (개발 모드에서만 접근) | CtaBand.tsx, app/demo/page.tsx, app/styleguide/page.tsx |

효과: ko 블로그 목록 242→145건으로 축소(성능 즉효), 내부용 화면 비노출.

### P1 — 1주 내

**P1-1. ko 성능 최적화**
- 블로그 인덱스 페이지네이션(12~18건/페이지) 또는 "더 보기" 점진 로드.
- 카테고리·태그 필터를 서버 컴포넌트 유지한 채 쿼리 파라미터 기반으로.
- 커버 이미지 `loading="lazy"` + `sizes` 지정 확인, 목록에서 본문 MDX 미로드 확인.
- 측정 기준: Lighthouse(모바일) LCP < 2.5s, /ko/resources/blog 기준 before/after 기록.

**P1-2. 한글 타이포 정리**
- 헤드라인(h1/h2)에 `text-wrap: balance`, 본문 리드에 `text-wrap: pretty` 적용.
- copy-review 산출물(export-copy.mjs) 기준으로 ko 전 페이지 줄바꿈·띄어쓰기 감사 1회.
- 어색한 지점은 `<br className="hidden sm:block">` 대신 문장 재작성 우선 (SOT 카피는 brand-canon 경유).

**P1-3. store → saai 네이밍 전환 (표기 + URL)**
- 라우트: `/products/saai-{count,insight,care,agent}` 신설 (en/ko/jp 3로케일 모두).
- 301: `next.config.ts` redirects에 `/products/store-* → /products/saai-*` 추가.
  기존 구 URL(`/storeinsight` 등) 리다이렉트 체인은 최종 목적지로 직접 갱신 (체인 1회 초과 금지).
- 표기: `brand-canon.ts`의 `productNaming`을 단일 소스로 컴포넌트 표기 교체
  (ProductsView, SaaiView, FeatureCarousel, Footer, FAQ, pricing-data 등 grep 기준 20+ 파일).
- SEO: sitemap·JSON-LD(softwareApplication name/alternateName)·og 타이틀 동시 갱신.
  alternateName에 구명(store insight 등) 유지해 검색 연속성 확보.
- 리스크: 외부 유입 링크·광고 랜딩 URL 존재 여부 확인 후 전환일 확정.

### P2 — 2~4주

**P2-1. /products = SAAI 브랜드 허브로 발전**
- 현 ProductsView(4단계 루프 나열)를 SAAI 우산 브랜드 스토리 구조로 재편:
  ① SAAI 정의(Spatial·Anonymized·Agentic·Intelligence) → ② 4제품 루프(Observe→Analyze→Suggest→Learn)
  → ③ 카테고리 키워드(익명화 공간 AI) 섹션 → ④ 도메인 구현(saai.store / storecare.ai) → ⑤ 사례·CTA.
- SaaiView(251줄)와 ProductsView(197줄)의 역할 중복 해소: /products가 허브, /products/saai는 흡수 검토.

**P2-2. 컨벤션/박람회 특별 페이지 체계**
- velite `events` 컬렉션 신설: `slug, title, venue, startDate, endDate, publishFrom, publishUntil, hero, body, cta, lang, draft`.
- 라우트: `/events/[slug]` (+ko/jp). `publishUntil` 경과 시 목록 제외 + 페이지는 "지난 이벤트" 아카이브 표기.
- Keystatic 컬렉션 추가로 비개발자가 생성·관리 가능하게.
- noindex 옵션(초청 전용 페이지용) + QR용 단축 경로(`/e/[slug]`) 지원.

**P2-3. 미디어 커버리지 확충**
- 키워드 검색: "deepingsource", "딥핑소스", "Deeping Source" + 제품명/수상명 조합.
- 발굴 기사를 company/news 커버리지 목록에 추가 (매체·날짜·링크·요약 스키마).
- 분기 1회 정기 검색을 운영 가이드에 포함.

### P3 — 운영 체계 (문서·프로세스)

**P3-1. 운영 가이드 (docs/OPERATIONS_GUIDE.md 신설)**
- 콘텐츠 생성 파이프라인: Keystatic 작성 → draft 검수 → velite 빌드 → 배포. `new:post` 스크립트,
  frontmatter 린트(`lint:frontmatter`), 카테고리 기준(insight만 공개 중) 명시.
- PR 파이프라인: 보도자료 초안 → 검수 → 배포처 → 게재 확인 → news 페이지 등록 → 블로그 insight 전환 여부.
- 이벤트 페이지 운영: 생성 → 노출 기간 설정 → 종료 후 아카이브 절차.
- 네이밍 규칙: saai {insight·care·agent} 우선, store는 도메인 구현 표기로만. (brand-canon SOT 링크)

## 3. 리뷰 항목 ↔ 계획 매핑

| 리뷰 항목 | 계획 |
|---|---|
| 가이드 글 숨김/삭제 | P0-1 (숨김, weekly 유지) |
| ko 느림 | P0-1 + P1-1 |
| 데모 페이지 숨김 | P0-2 |
| /products 발전 (SAAI 브랜드) | P2-1 |
| 컨벤션/박람회 특별 페이지 + 운영 가이드 | P2-2 + P3-1 |
| 콘텐츠/PR 파이프라인 | P3-1 |
| store x → saai x 네이밍 | P1-3 |
| 미디어 커버리지 확대 | P2-3 |
| ko 줄바꿈·띄어쓰기 | P1-2 |

## 4. 검증 기준

- P0: `npm run gen:content && npm run build` 통과, 블로그 목록에 guide 미노출, /demo 프로덕션 404.
- P1-1: Lighthouse 모바일 LCP before/after 기록.
- P1-3: store-* 전 URL 301 응답 + sitemap에 saai-* 만 존재 + 리다이렉트 체인 ≤1.
- P2-2: 이벤트 생성→노출→아카이브 전 주기를 Keystatic만으로 수행 가능.
