# 새 deepingsource.io 홈페이지 마스터 플랜 v1.0

> **목적** — `deepingsource.io` 를 회사(Corporate) 사이트로 다시 짓는다. `storecare.ai`(SMB·점주 라인)와 `saai.store`(B2C 콘텐츠·POP)는 별도 도메인으로 유지하되, 회사 사이트가 두 도메인을 *우산* 으로 포괄·진열·연결한다.
>
> **입력** — 4개 인벤토리(`docs/inventory/{deepingsource.io,storecare.ai,saai.store,local}/INVENTORY.md`) + 본 워크스페이스의 41 브랜드 문서 + 13 디자인 CSS dist + 196편 MDX 풀.
>
> **본 문서가 다루는 것** — IA·콘텐츠 소스 매핑·기능 복원 우선순위·에셋 격차·로드맵·Open Questions. *어떻게 만들 것인가가 아니라, 무엇을 어디에 박을 것인가*.
>
> **본 문서가 다루지 않는 것** — 브랜드 시스템의 정돈(Phase 2)·디자인 토큰 업데이트(Phase 3)·코드 변환 PR 분할(Phase 4)은 별도 산출물.
>
> **버전** v1.0 · **작성** 2026-05-29 · **작성자** SA Team · Jamin

---

## 0. 한 페이지 요약

### 0.1 결론 세 줄
1. **3 도메인 = 1 우산** — 새 `deepingsource.io` 가 회사 사이트(법인·기술·전략·B2B 영업)로 자리잡고, `storecare.ai`(SMB·점주)와 `saai.store`(B2C 콘텐츠·POP)는 *외부분기 도메인*으로 유지한다. 회사 사이트는 두 도메인을 *진열·연결*하되 흡수하지 않는다.
2. **카피·디자인 토큰은 거의 다 갖춰져 있다** — 카피 85% · 디자인 토큰 90% · 컴포넌트 80% · 콘텐츠 70%. 부족한 자리는 IA 결정(35%) · i18n(10%) · 회사 사이트 고유 자산(IR·임원/오피스/뉴스 영문 카피 등).
3. **현 라이브 사이트의 잔재가 IA 설계의 첫 번째 가위 자리** — `PLUS INSIGHT`/`STORE INSIGHT` 리브랜딩 잔재, `/untitled/untitled-2`, 발음 그대로 slug, 다국어 본문 불균형(ko 40-50% 짧음, jp 8개 누락), 동일 meta description 3개 — 이 모든 것을 *옮겨 박지 않는다*. 새 IA는 잔재 없는 자리로 출발한다.

### 0.2 시작 준비도 (영역별, 정성)
| 영역 | % | 출처 | 부족분 |
|---|---|---|---|
| 마케팅 카피 | 85 | brand-system 41 문서 (Master Copy Decision · Copy Master v2 · 11 페이지 spec) | 회사 사이트 고유 카피(IR·뉴스 영문) |
| 디자인 토큰 | 90 | design-system/dist 13 CSS (Primitive→Semantic→Audience→Charts→Dark) | 회사 사이트만의 시각 모드(예: dark hero) |
| 컴포넌트 | 80 | src/components 17 디렉토리 (sections, mockups, ui, shared, layout) | 회사 사이트 전용 컴포넌트(투자자 타임라인·임원 카드·기술 페이퍼 카드) |
| 콘텐츠 | 70 | content/articles 196편 MDX (insight 73 + tip 53 + season 25 + weekly 26 + guide 19) | case-study 0편 · 영문 0편 · 뉴스/IR 카피 |
| 에셋 | 60 | 138 deepingsource 이미지 + 123 storecare 이미지 + 4 saai 이미지 + 22 로컬 톱레벨 + Asset Candidate 98 + public/images 113 | 임원·오피스·이벤트 사진 · 인포그래픽 신규 · 영문 OG 이미지 |
| 코드 라우트 | 55 | src/app 22 마케팅 + 4 API + minisite 분기 패턴 | 새 IA로의 재배치 · i18n 라우팅 · /products 진열대 |
| IA | 35 | 두 기존 계획서가 골격은 잡았지만, 본 통합본은 처음 | 다국어 라우팅·redirects·sitemap·OG 자동화 |
| i18n | 10 | middleware.ts 호스트 분기 패턴만 있음 | en/ko/jp 풀 라우팅 · 카피 영문화 · OG 다국어 |

---

## 1. 회사·브랜드 아키텍처

### 1.1 3 도메인 모델

새 회사 사이트는 *한 회사 + 세 얼굴* 의 아키텍처로 짓는다.

```
                    ┌──────────────────────────────┐
                    │     (주) 딥핑소스 Inc.        │
                    │     Deeping Source            │
                    └─────────────┬────────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        ▼                         ▼                         ▼
  deepingsource.io          storecare.ai             saai.store
  회사·기술·B2B 영업        SMB·점주·구독            B2C·콘텐츠·POP
  ─────────────────         ───────────────          ──────────────
  Corporate site            Product site (SaaS)      Content/B2C app
  법인·R&D·뉴스·채용        4 모듈 + 가격 + 결제     POP 메이커 + 아카이브
  About · Tech · Products   /refrig /anomaly         /landing /pop /archive
  Solutions · Industries    /shelf /clean
  Enterprise · Pricing      pf.kakao.com/_fZHln
  (영문 main / ko / jp)     (KR 단일, 자영업자 채널) (KR 단일, 편의점 점주)
```

세 도메인의 *법인 연결 고리* 는 푸터의 동일 저작권(© 2026 Deeping Source Inc.) 과 회사 사이트의 `/products` 진열대.

### 1.2 회사 사이트의 두 마스터 카피

`SAAI_Master_Copy_Decision_v1.md` 가 확정한 두 카피를 회사 사이트의 시그니처 자리에 박는다.

- **본사 마스터** — *모든 매장을 한 매장처럼.* (Every store, like one.)
- **점주 마스터** — *우리 매장이 대표 매장처럼.* (Our store, like the best.)

회사 사이트의 1차 청자는 *본사* 와 *기술 의사결정자* 이므로 **본사 마스터** 가 Hero의 주축. 점주 마스터는 `/products/storecare` 카드 + `storecare.ai` 외부분기 입구의 보조 카피로 사용.

### 1.3 제품·기술 스택의 평면화 해소

현 deepingsource.io 의 GNB는 `Store Insight | Store Agent | SEAL | Anonymizer | Spatial AI | Store Care AI` 6개가 *평면* 으로 노출되어, 사용자는 어느 것이 *원천 기술* 인지, 어느 것이 *대시보드* 인지, 어느 것이 *외부 제품* 인지 구분할 수 없다. 새 사이트는 3-레이어 스택으로 명시한다.

```
Layer 3 — Products (외부 도메인 포함)
  ├ Store Insight  — 대시보드 (deepingsource.io 내부)
  ├ Store Agent    — AI 매장운영 에이전트 (deepingsource.io 내부)
  ├ Store Care     — SMB SaaS (외부 storecare.ai)
  └ SAAI           — B2C 콘텐츠·POP (외부 saai.store)

Layer 2 — Technologies (회사 사이트 내부)
  ├ Anonymizer     — 원천 비식별화
  ├ SEAL           — SDK 패키지
  └ Spatial AI     — MTMC 다중 카메라 추적

Layer 1 — Vision Models (20+ catalog)
  └ Anonymization · People Counting · Queue Monitoring · Attention Monitoring ·
    Loss Prevention · Behavior Analysis · 등 20+
```

`/products` 가 Layer 3 진열대, `/technology` 가 Layer 2 진열대, `/technology/models` 또는 `/technology` 안 섹션이 Layer 1 카탈로그.

### 1.4 잔재 정리 룰 (출발 직전 가위)

새 사이트의 첫 IA 결정은 *옮기지 않을 것* 의 목록.

- `PLUS INSIGHT` 명칭 전면 폐기 — `Store Insight` 단일 명칭으로 통일
- `/pi-docs`, `/pi-manual/*` → `/docs/store-insight/*` 로 재배치 (또는 별도 docs.deepingsource.io 분리)
- `/untitled/untitled-2` 등 잔재 페이지 삭제
- 발음 그대로 slug(`seoljeong-kategori-teseuteu`) → 영문 의미 slug로 일괄 교체
- 중복 slug(`heatmap-by-time-analysis` vs `heatmapbytime-analysis`) → 표준 slug 단일화
- 3개 기술 페이지(Anonymizer/Spatial/StoreCare)의 동일 meta description → 각 페이지 고유로 분리

---

## 2. 새 deepingsource.io 사이트 IA

### 2.1 톱-레벨 IA (8 섹션)

```
deepingsource.io
├ /                         홈 (회사 hero + 3 도메인 진열대 + 두 마스터)
├ /products/                Layer 3 — 제품 진열대
│  ├ /store-insight          대시보드
│  ├ /store-agent            에이전트
│  ├ /store-care             SMB SaaS → 외부분기 storecare.ai (안내 카드)
│  └ /saai                   B2C → 외부분기 saai.store (안내 카드)
├ /technology/              Layer 2 — 기술 진열대
│  ├ /anonymizer             원천 비식별화
│  ├ /seal                   SDK
│  ├ /spatial-ai             MTMC
│  └ /models                 Layer 1 — 20+ Vision AI 카탈로그
├ /solutions/               업종·시나리오·통합 솔루션
│  ├ /retail                 리테일
│  ├ /food-beverage          F&B
│  ├ /drug                   드럭스토어
│  └ /large-space            대형 공간 (몰·물류·복합)
├ /enterprise               본사 관점 — Golden Case의 전국 전파
├ /pricing                  4 시작점 + 시뮬레이터
├ /company/                 회사·관계자 자리
│  ├ /about                  Vision·Mission·History·Team
│  ├ /news                   미디어 노출 (en 88+ 외부 링크)
│  ├ /career                 채용
│  ├ /partnership            파트너십 (구 ms-agent)
│  └ /investors              IR (신설)
├ /resources/               콘텐츠·신뢰 자산
│  ├ /blog                   블로그 (en 19+ 풀 + saai.store 16 트렌드 흡수 옵션)
│  ├ /case-studies           사례 (신설, 콘텐츠 풀 0편 → 우선 신설 필요)
│  ├ /docs                   제품 매뉴얼 (구 pi-docs)
│  ├ /glossary               용어집
│  └ /faq                    FAQ
├ /contact                  미팅·문의·데모
└ /legal/
   ├ /privacy
   └ /terms
```

총 톱-레벨 8 섹션(`/`, `/products`, `/technology`, `/solutions`, `/enterprise`, `/pricing`, `/company`, `/resources`) + 시스템(`/contact`, `/legal/*`).

### 2.2 IA 매트릭스 — 페이지별 결정

| 새 경로 | 결정 | 소스 | 비고 |
|---|---|---|---|
| `/` | 신설(통합) | DS 라이브 home + Brand Copy Master + Master Copy Decision | Hero 두 마스터 · 3 도메인 진열대 · 4-step Weaving · 파트너 그리드 |
| `/products` | 신설 | Product_Pages_Index_v1 | Layer 3 진열대 (4 카드: SI, SA, SC 외부, SAAI 외부) |
| `/products/store-insight` | 재구성 | DS `/store-insight` + Page_Store_Insight_v1 + storeinsight-page-data.ts | PLUS INSIGHT 잔재 제거 |
| `/products/store-agent` | 재구성 | DS `/storeagent` + Page_StoreAgent_v1 + 현 `/storeagent` 코드 | 10 Zone 풀 카피 |
| `/products/store-care` | 신설(외부분기) | Page_StoreCare_v1 + storecare.ai 카드 | 외부 `storecare.ai` 안내 + 핵심 차별점 |
| `/products/saai` | 신설(외부분기) | saai.store 카드 + 18 archive 미리보기 | 외부 `saai.store` 안내 |
| `/technology` | 재구성 | DS `/tech-*` 3개 + Page_Tech_Group_v1 + 현 `/technology` | Layer 2 진열대 |
| `/technology/anonymizer` | 유지·강화 | DS `/tech-anonymizer` | 고유 meta description으로 분리 |
| `/technology/seal` | 재구성 | DS `/seal` | FAQ 강화 |
| `/technology/spatial-ai` | 신설 | Page_Tech_Group_v1 spatial-ai 분기 | MTMC 본본문 |
| `/technology/models` | 신설 | DS home 의 20+ AI 모델 카탈로그 | 카드 그리드 |
| `/solutions` | 재구성 | 현 `/solutions[/slug]` + Page_Solutions_Group_v1 | 4 업종 진입 |
| `/solutions/{retail,food-beverage,drug,large-space}` | 재구성 | 현 industries 데이터 + Solutions spec | 대형 공간 신설 (현 SMB 3종만 있음) |
| `/enterprise` | 재구성 | 현 `/enterprise` + HQ_Sales_Deck_v1 + Page_Company_Group | 본사 관점 + Golden Case 5단계 |
| `/pricing` | 재구성 | 현 `/pricing[/simulator]` + Page_Pricing_v1 | 4 시작점 + 시뮬레이터 |
| `/company/about` | 재구성 | DS `/about-us` + Brand_Brief + External_Brand_Brief | Vision/Mission/History/Team |
| `/company/news` | 재구성 | DS `/news` (88+ 링크) | 매체 로고 자산 신규 필요 |
| `/company/career` | 유지 | DS `/career` + 현 코드 | 한국어 본문 영문화 필요 |
| `/company/partnership` | 재구성 | 현 `/ms-agent` 명칭 변경 | Page_Company_Group v1 partnership spec |
| `/company/investors` | 신설 | (없음 — 필요시 신설) | IR 자료·재무·투자 컨택 |
| `/resources/blog` | 재구성 | DS `/blog` (19 글) + 현 코드 + saai 16 트렌드(흡수 옵션) | 카테고리 4종(Trend/Tech/Company/Product) |
| `/resources/case-studies` | 신설 | (없음 — 우선 신설 필요) | 53명 실측 + Golden Case |
| `/resources/docs` | 재구성 | DS `/pi-docs` + `/pi-manual/*` | 10 매뉴얼 페이지 |
| `/resources/glossary` | 유지 | 현 `/glossary[/slug]` + 라이브 데이터 | — |
| `/resources/faq` | 유지 | 현 `/faq` + Page_Reference_Group_v1 | — |
| `/contact` | 재구성 | DS `/contact` + 현 코드 + Page_Company_Group | 폼 + 사무실 정보 |
| `/legal/privacy` | 유지 | DS `/privacy` + 현 코드 | 영문판 필요 |
| `/legal/terms` | 유지 | 현 `/terms` | 영문판 필요 |
| `/log-in`, `/sign-up`, `/reset-password`, `/update-password`, `/user-account` | 외부분기 | DS 인증 페이지 | 별도 product app으로 이동 (app.deepingsource.io 추정) |
| `/search`, `/access-denied` | 시스템 | 자동 | 자동 생성 |
| `/untitled/*`, `/post/*` (slug 변형) | 삭제 | DS 잔재 | redirects만 유지 |

총 새 마케팅·콘텐츠 라우트 약 **30개** (인증/시스템 제외).

### 2.3 redirects 매핑 (요약)

| 구 경로 | → 새 경로 | 메서드 |
|---|---|---|
| `/store-insight` | `/products/store-insight` | 301 |
| `/storeagent` | `/products/store-agent` | 301 |
| `/seal` | `/technology/seal` | 301 |
| `/tech-anonymizer` | `/technology/anonymizer` | 301 |
| `/tech-spatial-ai` | `/technology/spatial-ai` | 301 |
| `/tech-store-care-ai` | `/products/store-care` (외부분기) | 301 |
| `/about-us` | `/company/about` | 301 |
| `/news` | `/company/news` | 301 |
| `/career` | `/company/career` | 301 |
| `/blog` | `/resources/blog` | 301 |
| `/post/{slug}` | `/resources/blog/{slug}` | 301 |
| `/pi-docs` | `/resources/docs` | 301 |
| `/pi-manual/{slug}` | `/resources/docs/{slug}` | 301 |
| `/ms-agent` | `/company/partnership` | 301 |
| `/cases`, `/cases/{slug}` | `/resources/case-studies[/{slug}]` | 301 |

---

## 3. 페이지별 콘텐츠 소스 매핑

각 새 페이지의 *카피* 와 *데이터* 가 어디에서 오는지 단일 표로 박는다. **C** = `brand-system/*.md` 카피 spec, **L** = 라이브 사이트(`docs/inventory/{domain}/pages/*.md`), **D** = `src/data/*.ts`, **M** = `content/articles/*.mdx`, **A** = 에셋(`assets/` 또는 `public/images/`), **N** = 신설 필요.

| 새 페이지 | 카피 소스 | 데이터 소스 | 에셋 소스 | 신설 필요 |
|---|---|---|---|---|
| `/` | C: Brand_Copy_Master_v2, Master_Copy_Decision · L: DS home (en+ko) | D: siteImages, briefingData | A: DS 138 + assets/Asset Candidate hero · saai_symbol/wordmark · 세 제품 로고 | 3 도메인 진열대 시각 |
| `/products` | C: Product_Pages_Index_v1 | D: storecare-page-data, storeinsight-page-data | A: 세 제품 로고 svg | Layer 3 진열대 카드 |
| `/products/store-insight` | C: Page_Store_Insight_v1 · L: DS `/store-insight` | D: storeinsight-page-data | A: DS dashboard webp + public/images | PLUS INSIGHT 카피 제거 |
| `/products/store-agent` | C: Page_StoreAgent_v1 · L: DS `/storeagent` · 현 src/app/storeagent/page.tsx | D: storeagent 코드 직속 | A: DS Store Agent 23 이미지 + 현 mockups | 10 Zone 풀 |
| `/products/store-care` (외부분기) | C: Page_StoreCare_v1 · L: storecare.ai home + 4 모듈 | D: storeCareScenarios, storecare-page-data | A: storecare 123 이미지(P0 카피만, 비주얼 신규) | "스토어케어 보러가기" CTA → storecare.ai |
| `/products/saai` (외부분기) | C: (신설) · L: saai.store landing + archive | D: (신설) | A: saai_symbol, saai_wordmark | SAAI 라인업 카드 신설 |
| `/technology` | C: Page_Tech_Group_v1 | D: solutionsData | A: 현 public/images/technology | Layer 2 진열대 |
| `/technology/anonymizer` | C: Page_Tech_Group_v1 · L: DS `/tech-anonymizer` | — | A: DS anonymizer 자산 + assets/ai-anonymizer.png | 고유 meta · 비주얼 강화 |
| `/technology/seal` | C: (Page spec 없음 — 신설) · L: DS `/seal` (5,049자) | — | A: DS SEAL 자산 + 3 약속 일러스트 | MTMC/Pre-Purchase Data 추가 |
| `/technology/spatial-ai` | C: Page_Tech_Group_v1 · L: DS `/tech-spatial-ai` | — | A: DS spatial-ai + 현 mockups/heatmap | 본본문 분량 강화 |
| `/technology/models` | C: (DS home의 20+ AI 모듈 인라인 카피 추출) | — | A: 4 status icon + DS 모듈 svg | 카탈로그 그리드 |
| `/solutions` | C: Page_Solutions_Group_v1 | D: solutionsData, industryList | A: public/images/industries | 4 업종 진입 |
| `/solutions/{slug}` | C: Page_Solutions_Group_v1 · 현 industries 데이터 | D: industryContent, cctvImages | A: public/images/industries · public/images/cctv | 대형 공간 카드 신설 |
| `/enterprise` | C: HQ_Sales_Deck_v1, Page_Company_Group_v1, Upgrade_Spec A4(2031 비전) | D: 현 enterprise | A: 본사 자료 신규 | Golden Case 5단계 |
| `/pricing` | C: Page_Pricing_v1 · 현 pricing | D: storeCareScenarios, posAnalysisData | A: public/images | 4 시작점 |
| `/pricing/simulator` | C: Page_Pricing_v1 | D: 시뮬레이터 데이터 신설 | — | 시뮬레이터 로직 |
| `/company/about` | C: Brand_Brief_v1, External_Brand_Brief_v1, Page_Company_Group · L: DS `/about-us` | — | A: 임원 사진(신설) · 오피스 사진(신설) | 임원/오피스 사진 |
| `/company/news` | L: DS `/news` (88+ 외부 링크) | M: weekly 26 + 신설 뉴스 | A: 매체 로고 자산(신설) | 매체 로고 |
| `/company/career` | C: Page_Company_Group · L: DS `/career` | — | A: 채용 이미지(신설) | 영문 본문 |
| `/company/partnership` | C: Page_Company_Group v1 partnership spec · 현 ms-agent | — | A: 현 ms-agent | 명칭/카피 일괄 |
| `/company/investors` | C: (신설) | — | — | 전체 신설 |
| `/resources/blog` | M: content/articles (insight 73 + tip 53 등) · L: DS `/blog` (19 글) | — | A: public/images/blog | en 영문 글 풀 |
| `/resources/case-studies` | C: (신설) · 53명 실측 + Golden Case | M: case-study 폴더 0편 → 신설 | A: 사례 비주얼(신설) | 전체 신설 |
| `/resources/docs` | L: DS `/pi-docs` + 10 `/pi-manual/*` | — | A: 매뉴얼 스크린샷 | slug 일괄 정돈 |
| `/resources/glossary` | C: Page_Reference_Group | D: glossaryTerms | — | — |
| `/resources/faq` | C: Page_Reference_Group | D: 현 faq | — | — |
| `/contact` | C: Page_Company_Group · L: DS `/contact` | D: 현 contact form | — | 영문 본문 |
| `/legal/privacy` | L: DS `/privacy` (catchsecu) | — | — | en/jp 별도 페이지 |
| `/legal/terms` | 현 `/terms` | — | — | en/jp 별도 페이지 |

---

## 4. 기능 인벤토리 & 복원 우선순위

라이브 3 사이트와 현 코드베이스의 기능을 *복원·재구성·신설·외부유지* 4 범주로 정렬한다.

### 4.1 P0 — 회사 사이트 동작에 필수

| 기능 | 출처 | 결정 | 비고 |
|---|---|---|---|
| Contact form (B2B 영업 입력) | DS Webflow form + 현 src/app/api/contact + react-hook-form/zod | **재구성** | 영업팀 라우팅·언어별 필드·이메일 알림 |
| Newsletter 구독 (회사 인사이트) | DS 자체 폼 없음 + 현 src/app/api/newsletter | **신설** | 이메일·관심사·산업 — 회사 인사이트용 |
| 다국어 라우팅 (en/ko/jp) | 현 middleware.ts 호스트 분기 + 라이브 `/ko`·`/jp` | **신설(코드)** | path-prefix 또는 sub-route 정책 결정 필요 |
| Sitemap / Robots / OG | 현 src/app/sitemap.ts, robots.ts, opengraph-image.tsx, twitter-image.tsx | **재구성** | 새 IA 반영 + 다국어 hreflang |
| Cookie / Privacy banner | 라이브 미확인 (catchsecu 외부) | **신설** | GDPR/PIPA 대응 |

### 4.2 P1 — 콘텐츠·자산의 깊이

| 기능 | 출처 | 결정 | 비고 |
|---|---|---|---|
| Blog (카테고리·검색·필터) | DS `/blog` Webflow + velite MDX 풀 196편 | **재구성** | velite 기반 정적 빌드 |
| News (외부 매체 카드 그리드) | DS `/news` 88+ 링크 | **재구성** | 매체 로고 자산 신설 필요 |
| Docs (제품 매뉴얼) | DS `/pi-manual/*` 10 페이지 | **재구성** | slug 일괄 정돈 · 사이드바 |
| Glossary | 현 src/app/glossary + glossaryTerms.ts | **유지** | — |
| FAQ | 현 src/app/faq | **유지** | — |
| Search (사이트 전체) | DS `/search` 페이지 (Webflow 자체) | **신설(코드)** | velite 인덱스 또는 외부 검색 |
| Career list | DS `/career` | **유지·강화** | 한국어 단일 → 영문 추가 |
| Partner grid | DS home 파트너 섹션 | **재구성** | 파트너 로고 자산 신설 |

### 4.3 P2 — 영업·전환의 깊이

| 기능 | 출처 | 결정 | 비고 |
|---|---|---|---|
| Pricing simulator | 현 src/app/pricing/simulator + Page_Pricing_v1 | **재구성** | 4 시작점 + 매장 수 시뮬 |
| Case Studies (사례) | 현 content/articles/case-study 0편 + 53명 실측 + Golden Case | **신설(콘텐츠)** | 우선 5건 작성 — 회사 신뢰의 척추 |
| Mockup / Demo 인라인 | 현 src/components/mockups (다수) | **유지** | 본 디자인 시스템과 정렬 |
| Industry pages | 현 industries[slug] + industryContent + cctvImages | **재구성** | 대형 공간 신설 |
| Solutions page | 현 src/app/solutions[/slug] + solutionsData | **재구성** | Page_Solutions_Group_v1 정렬 |
| Enterprise (본사 관점) | 현 src/app/enterprise + HQ_Sales_Deck_v1 | **재구성** | 신규 hero 영역 |
| Briefing page (AI 모닝 브리핑) | 현 src/data/briefingData.ts | **이관/검토** | 회사 사이트와 결이 다름 — saai.store 또는 store-agent product app으로 이관 검토 |

### 4.4 P3 — 외부 도메인에 유지 (절대 흡수 X)

| 기능 | 도메인 | 결정 |
|---|---|---|
| StoreCare 제품 결제·구독·관리 | storecare.ai | **외부유지** — `/products/store-care` 안내 카드만 |
| StoreCare 4 모듈 상세 (refrig/anomaly/shelf/clean) | storecare.ai | **외부유지** — 카드에 핵심 차별점 3-5개만 요약 |
| SAAI 편의점 가이드 아카이브 18글 | saai.store/archive | **외부유지** — `/resources/blog` 에 *흡수 옵션* 검토 (Open Q) |
| SAAI POP 메이커 (`/pop`) | saai.store | **외부유지** — `/products/saai` 안내 |
| SAAI 뉴스레터 구독 | saai.store | **외부유지** — 회사 뉴스레터와 분리 |
| 카카오톡 채널 `pf.kakao.com/_fZHln` | storecare.ai | **외부유지** — 회사 사이트에서 노출 X |

### 4.5 인증·계정 (P-1, 후순위)

| 기능 | 결정 | 비고 |
|---|---|---|
| `/log-in`, `/sign-up`, `/reset-password`, `/update-password`, `/user-account` | **외부분기** | 별도 product app(`app.deepingsource.io` 추정). 회사 사이트에서는 제거 |
| `/access-denied`, `/search` | **시스템** | 자동 생성 |

---

## 5. 에셋 매핑 & 격차

### 5.1 자산 풀 4 영역 합계

| 풀 | 카운트 | 위치 | 사용 가능성 |
|---|---|---|---|
| 라이브 deepingsource.io 이미지 | 138 | `assets/inventory/deepingsource.io/` | 카피 retrieval 용 reference (저작권은 Deeping Source 본인) |
| 라이브 storecare.ai 이미지 | 123 | `assets/inventory/storecare.ai/` | reference + 일부 직접 활용 (Framer 빌더 자산) |
| 라이브 saai.store 이미지 | 4 | `assets/inventory/saai.store/` | saai_logotype, saai_symbol — 직접 활용 |
| 로컬 톱레벨 | 22 | `assets/` | ds_logo, saai_symbol/wordmark, 세 제품 로고, 4 status icon — **즉시 활용** |
| Asset Candidate | 98 | `assets/Asset Candidate/` | dashboard·hero·industry 후보 — 큐레이션 필요 |
| public/images | ~113 | `public/images/{cctv,technology,storecare,industries,blog}/` | 현 코드에서 사용 중 — 일부 직접 활용 |

### 5.2 카테고리별 격차

| 카테고리 | 보유 | 격차 | 신설 우선순위 |
|---|---|---|---|
| 로고·심볼 | ds_logo svg/png, saai_symbol·wordmark, 세 제품 로고 | 본 회사 사이트의 영문 워드마크 정돈 | P0 |
| 아이콘 | 4 status icon + design-system/assets/icons | 새 IA 매핑 아이콘 | P1 |
| Hero key visual | DS home 의 indeximg001.webp (사용 가능) | 회사 사이트만의 신규 hero (Brand Book Key Visual v1 가이드 기반) | P0 |
| 제품 대시보드 스크린샷 | dashboard-sample-heatmap-and-pathway (Asset Candidate) + storecare 123 + DS 138 | 새 디자인 시스템 정렬 신규 스크린샷 | P2 |
| 인물 사진 (임원·팀) | 0 | About / Career / Investors 용 임원 사진 | P0 (회사 사이트의 신뢰 자리) |
| 오피스 사진 | 0 | About · Contact 용 사무실 사진 | P1 |
| 파트너 로고 그리드 | 0 (라이브에서 직접 가져와야 함) | 회사 파트너 로고 정돈 (저작권 정리) | P1 |
| 매체 로고 (News용) | 0 (현 라이브는 placeholder 아이콘) | 88+ 매체 로고 raw 수집 → 흑백 통일 | P1 |
| 인포그래픽 (4단계 루프·MTMC·Pre-Purchase Data) | 부분(라이브에 있음) | 새 디자인 시스템으로 재제작 | P2 |
| 영문 OG 이미지 | en 페이지 별도 없음 | en/ko/jp 별 OG 이미지 자동 생성 | P1 |

---

## 6. 다국어 (i18n) 전략

### 6.1 결정 사항

- **로케일 3종** — `en` (기본, prefix 없음) · `ko` (`/ko/...`) · `jp` (`/jp/...`)
- **라우팅 정책** — Next.js App Router 의 `[lang]` 동적 세그먼트 또는 path-prefix middleware
- **콘텐츠 우선순위** — 회사·법무는 3개 모두, 기술·제품은 3개 모두, 블로그는 *원본 언어 + 번역 보유 시 노출*, Solutions·Pricing·Industries는 3개 모두
- **번역 출처** — 현 brand-system 카피 spec은 ko 기준. en은 라이브 DS 사이트 (Webflow) + 번역 미흡 보강. jp는 라이브 DS 사이트 jp 페이지 (8개 누락 보완 필요)

### 6.2 i18n 격차

| 영역 | 현 상태 | 격차 | 결정 |
|---|---|---|---|
| en 카피 | 라이브 DS 사이트 47 페이지 | 본 brand-system 카피 풀(ko 중심)의 영문 동기화 | P0 — en 영문 마스터 카피 풀 작성 |
| jp 카피 | 라이브 DS 사이트 45 페이지 (8 누락) | 본 brand-system 의 jp 부재 | P1 — jp 후순위 |
| ko 카피 | brand-system 41 문서 + 라이브 ko 52 페이지 | ko 본문이 라이브에서 en 대비 40-50% 짧음 | P0 — ko 깊이 보강 |
| 번역 인프라 | velite + i18n 코드 없음 | Next.js i18n routing + 번역 메타 구조 | P0 — 코드 작업 |

### 6.3 콘텐츠 풀 vs 라이브 비대칭

| 영역 | content/articles 풀 | 라이브 발행 | 차이 |
|---|---|---|---|
| insight | 73 | 0 (라이브 미공개) | 73 글 — 회사 사이트 블로그/리소스로 발행 가능 |
| tip | 53 | 0 | 53 글 — 점주·실무자 콘텐츠 |
| season | 25 | 1 (saai 시즌 글) | 24 글 |
| weekly | 26 | 18 (saai 주간 트렌드) | 8 글 풀 추가 보유 |
| guide | 19 | 9 (saai 가이드) | 10 글 풀 추가 |
| case-study | 0 | 0 | 신설 필요 (P0) |
| **합계** | **196편 (ko 중심)** | **DS 19 + saai 18 = 37편** | 약 80% 미발행 풀 → 회사 사이트 블로그·리소스로 단계 발행 |

---

## 7. 단계별 로드맵

### Phase 1 — 인벤토리 & 마스터 플랜 (현 단계)
- ✅ 3 라이브 사이트 크롤 → INVENTORY 3종
- ✅ 로컬 자산 인벤토리 → INVENTORY 1종
- ✅ 통합 마스터 플랜 v1.0 (본 문서)
- 다음: 사용자 검토 → v1.1 (Open Q 해소)

### Phase 2 — 브랜드 시스템 정비
- 41 brand-system 문서를 *회사 사이트 우선순위* 로 재정렬
- 두 마스터 카피의 사용처 매핑 (페이지별)
- 회사·제품·기술 3-레이어의 보이스 차별화 룰 명문화
- 신설 필요 카피 식별 (SEAL FAQ, /products 진열대, /company/investors, /resources/case-studies)
- 산출물: `docs/BRAND_v2.md` + 카피 풀 인덱스

### Phase 3 — 디자인 시스템 업데이트
- design-system/dist 13 CSS 의 회사 사이트 적용 모드 정의
- 회사 사이트 전용 시각 정체성 (예: Hero dark mode, IR 톤, Tech Spec 그리드)
- 새 IA 의 컴포넌트 인벤토리 → ui_kits/storeagent 처럼 *ui_kits/corporate* 신설
- 색·타이포·차트 토큰의 회사 사이트 모드 정렬
- 산출물: `docs/DESIGN_v2.md` + `ui_kits/corporate/` + dist CSS 갱신

### Phase 4 — 코드 변환 플랜
- 현 src/app 22 라우트 → 새 IA 30 라우트로의 매핑 PR 분할
- middleware.ts 의 i18n 라우팅 추가
- redirects 일괄 박음 (next.config.ts)
- velite MDX 풀의 새 분류 적용 (insight·tip·guide·case-study 4 카테고리)
- 산출물: `docs/CODE_v1.md` + `redirects.ts` + i18n routing spec

### Phase 5 — 빌드·발행
- 우선순위 페이지부터 단계 빌드 (Phase 4.1: `/`, `/products`, `/products/store-agent` 먼저)
- en/ko/jp 단계 발행
- 검색 인덱스·OG 자동화
- 외부분기 URL 안정화 (storecare.ai, saai.store)

---

## 8. Open Questions

본 v1.0 의 의사결정 대기 항목. *각 항목은 한 줄 의사결정으로 v1.1 에 반영*.

1. **`/products/saai` 카드의 위치** — 회사 사이트의 제품 진열대에 *SAAI* 를 4번째 카드로 둘 것인가? (옵션 A: 둠 — 회사가 B2C 자산까지 보여줌 / 옵션 B: 둠 안 함 — 회사 사이트는 B2B만)
2. **블로그 통합 vs 분리** — saai.store 의 18 archive 글을 회사 사이트 `/resources/blog` 에 *흡수* 할 것인가, *외부유지* 할 것인가? (SEO와 점주 검색의도 충돌 가능)
3. **인증·계정의 분리 위치** — `/log-in` 등을 어디로 보낼지. 별도 `app.deepingsource.io` 신설 vs 본 사이트 후순위 유지
4. **i18n 라우팅 정책** — en/ko/jp 의 라우팅 패턴. (옵션 A: `/` `/ko` `/jp` path-prefix / 옵션 B: `[lang]` 동적 세그먼트 / 옵션 C: 서브도메인 분리)
5. **회사 사이트만의 신규 자산** — 임원·오피스·매체 로고 자산의 *수집/촬영 일정* — Phase 1 후 수집 시작 가능한지
6. **case-study 5건 우선 신설** — 53명 실측 + Golden Case 5단계를 *우선 5건 case-study* 로 즉시 작성할 것인가
7. **`/storeagent` B2C 자산의 향방** — 현 코드의 `/storeagent/blog`, `/storeagent/sample`, `/storeagent/newsletter`, `/storeagent/how-it-works`, `/storeagent/pricing` 5 서브의 운명. (옵션 A: store-agent product app으로 이관 / 옵션 B: 회사 사이트 `/products/store-agent` 의 서브로 일부 유지 / 옵션 C: saai.store로 흡수)
8. **briefingData (AI 모닝 브리핑)** — 현 src/data/briefingData.ts 의 콘텐츠. 회사 사이트의 *데모 자산* 으로 활용할지, 외부 product app으로 이관할지
9. **`/storecare` 와 `/storeinsight` 코드** — 현 src/app 의 두 라우트 + 컴포넌트의 운명 — 회사 사이트로 흡수하면서 카피만 정돈할 것인가, 별도 도메인으로 완전 분리할 것인가
10. **Webflow → Next.js 마이그레이션 시점** — 회사 사이트의 Webflow CMS 의존을 어느 시점에 종료할지 (현재는 Webflow 본 사이트와 새 코드베이스가 병존)

---

## 9. 부록 — 두 기존 계획서와의 관계

### 9.1 SAAI_Website_Upgrade_Spec_v1 (Tier A/B/C)
- *이 문서가 다룬 것* — 현 saai-web(현 코드베이스)를 한 세트의 깊이로 *보강* 하는 spec. Tier A 5자리 + Tier B 5자리 + Tier C 3자리.
- *본 마스터 플랜과의 관계* — Tier A 의 *전략적 빈자리 5종* 은 본 플랜의 §2.1 IA 의 신설 페이지에 흡수됨 (예: Tier A1 다섯 질문/행동 강령 → `/company/about` Vision 섹션, Tier A2/B1 매장의 세 얼굴 → `/products` 진열대, Tier A3/A4 Beyond Retail → `/enterprise`, Tier A5/B4 SEAL 3 약속 → `/technology/seal`).
- *상태* — Tier A 의 5 카피·시각화 사양은 본 플랜의 *콘텐츠 소스* 로 활용. 본 플랜의 §3 표에서 직접 참조.

### 9.2 Deepingsource_Web_Transition_Plan_v0.2 (saai-web → deepingsource.io 전환)
- *이 문서가 다룬 것* — 현 saai-web 32 한글 페이지를 *유지·재구성·외부분기·통합·삭제·신설* 6 결정으로 분류한 IA 매트릭스. /en/* 10 페이지의 i18n 실측 포함.
- *본 마스터 플랜과의 관계* — v0.2의 골격은 *현 saai-web 기준* 인 반면, 본 플랜은 *백지 + 3 라이브 사이트 + 로컬 자산* 전체 기준. 따라서 v0.2의 IA 매트릭스는 본 플랜의 §2.2 표에 흡수되되, *현 코드의 라우트 운명* 결정에서 v0.2 의 6 결정 패턴을 그대로 활용.
- *상태* — v0.2 의 한글 페이지별 결정은 본 플랜의 *Phase 4 코드 변환* 에서 *현 라우트 → 새 라우트* 매핑의 입력으로 직접 활용.

### 9.3 두 계획서가 본 플랜에 흡수된 결과
- *Upgrade_Spec_v1* → Tier A/B/C 의 카피·시각화 사양 → 본 플랜 §3 페이지별 콘텐츠 소스 매핑
- *Transition_Plan_v0.2* → 32 한글 페이지의 유지·재구성·외부분기·통합·삭제·신설 결정 → 본 플랜 §2.2 IA 매트릭스 + §2.3 redirects

본 v1.0 이후 두 기존 계획서는 *참고 부록* 으로 archive. v1.0 의 모든 결정이 두 문서의 결정을 *포함하거나 재정의* 한다.

---

## 10. 다음 행동

1. **사용자 검토** — Open Questions 10개에 의사결정 → v1.1 갱신
2. **Phase 2 시작** — 브랜드 시스템 정비
3. **자산 수집 일정** — 임원·오피스·매체 로고 자산 수집 시작 (병렬)
4. **Phase 5 빌드 직전** — 본 플랜의 §2.2 IA 매트릭스를 *최종 IA Lock* 으로 별도 문서화 (`docs/IA_LOCK.md`)

— *끝.*
