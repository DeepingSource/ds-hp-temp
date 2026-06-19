# 새 deepingsource.io 홈페이지 마스터 플랜 v1.1

> **변경 사항** — v1.0 의 Open Questions 10종이 사용자 결정으로 모두 해소되어, 본 v1.1 은 *확정된 결정* 을 §0.3 으로 격상하고 본문(§2 IA · §4 기능 인벤토리 · §6 i18n · §7 로드맵)에 결정 결과를 인라인으로 박았다. v1.0 은 `docs/PLAN_v1.md` 에 변경 없이 보존(archive). 본 v1.1 이 *현행 SOT*.
>
> **버전** v1.1 · **갱신** 2026-05-29 · **이전 버전** v1.0 (2026-05-29)

---

## 0. 한 페이지 요약

### 0.1 v1.0 → v1.1 변경 요약

| 영역 | v1.0 | v1.1 |
|---|---|---|
| Open Questions | 10개 미해소 | **10개 모두 결정** (§0.3) |
| 인증·계정 라우팅 | 후순위 미정 | **`app.deepingsource.io` 분리 신설** |
| i18n 라우팅 | 옵션 A/B/C 미정 | **path-prefix 확정 — `/` / `/ko` / `/jp`** |
| /products 진열대 | SAAI 카드 미정 | **4 카드 확정 (SI · SA · SC외부 · SAAI외부)** |
| 블로그 흡수 | saai 18글 미정 | **외부유지** — 회사 블로그는 B2B/기업 콘텐츠만 |
| /storeagent 5 서브 | 운명 미정 | **B2B만 회사 사이트, B2C는 product app으로 이관** |
| /storecare · /storeinsight 코드 | 운명 미정 | **`/products/*` 로 흡수 + 카피 정돈** |
| briefingData | 운명 미정 | **/products/store-agent 의 'live demo' 섹션으로 활용** |
| Webflow 종료 | 시점 미정 | **Phase 4 완료 직후 즉시 교체** |
| case-study 신설 | 시점 미정 | **Phase 2 골격 · Phase 4 발행** |
| 회사 자산 수집 | 일정 미정 | **Phase 2와 병렬 진행** |

### 0.2 결론 세 줄 (v1.1)
1. **3 도메인 = 1 우산** — `deepingsource.io` 가 회사·B2B, `storecare.ai` · `saai.store` 는 외부분기 유지. 회사 사이트는 두 도메인을 *진열·연결* 하되 흡수하지 않는다. **`app.deepingsource.io` 분리 신설** — 인증·계정·SaaS 대시보드는 본 사이트에서 빠진다.
2. **카피·디자인 토큰은 거의 다 갖춰져 있다** — 카피 85% · 토큰 90% · 컴포넌트 80% · 콘텐츠 70%. 부족분은 IA 결정(35→90%) · i18n(10%) · 회사 사이트 고유 자산(IR · 임원 · 오피스 · 매체 로고 · 영문).
3. **i18n은 path-prefix · Webflow 는 Phase 4 직후 종료** — 새 사이트 IA 는 첫날부터 다국어 라우팅(`/` `/ko` `/jp`) 위에서 짓고, 사이트가 완성되는 순간 Webflow 본 사이트를 *즉시 교체* 한다. 병존 기간 최소화.

### 0.3 확정된 결정 10종 (v1.0 의 Open Q → v1.1 의 SOT)

본 10종은 본문(§2 · §4 · §6 · §7)에 인라인으로 박혀 있으나, 한 자리에서 다시 확인 가능하도록 본 §0.3 에 명시.

1. **D1. /products 진열대 = 4 카드** — Store Insight · Store Agent · Store Care(외부 storecare.ai) · SAAI(외부 saai.store)
2. **D2. 블로그 = 외부유지** — saai.store 의 18 archive 글은 회사 블로그로 흡수 안 함. `/resources/blog` 는 B2B/기업 콘텐츠만
3. **D3. /storeagent 5 서브 분리** — `/products/store-agent` 는 단일 페이지(B2B 위주). `blog · sample · newsletter · how-it-works · pricing` 5 서브 중 `how-it-works · pricing` 은 페이지 내 섹션으로 흡수, 나머지 3(`blog · sample · newsletter`)는 saai.store 또는 storeagent product app 으로 이관
4. **D4. /storecare · /storeinsight 코드 = /products/* 로 흡수 + 카피 정돈** — `/products/store-insight` 는 풍부한 회사 제품 페이지로 윤색, `/products/store-care` 는 외부분기 카드로 축소
5. **D5. 인증·계정 = `app.deepingsource.io` 신설로 이관** — `/log-in · /sign-up · /user-account · /reset-password · /update-password` 모두 본 사이트에서 제거
6. **D6. i18n 라우팅 = path-prefix** — `/` (en, 기본) · `/ko` · `/jp`. 서브도메인·`[lang]` 동적 세그먼트 미채택
7. **D7. briefingData = Store Agent live demo** — `/products/store-agent` 페이지의 *live demo* 섹션으로 활용. 외부 이관 X
8. **D8. Webflow 종료 = Phase 4 완료 직후** — 새 Next.js 사이트가 Phase 4 끝나면 즉시 Webflow 본 사이트를 교체. 병존 기간 최소화
9. **D9. case-study 5건 = Phase 2 골격 + Phase 4 발행** — 53명 실측 + Golden Case 5단계로 5건의 case-study 스토리 구조·카피는 Phase 2 에서, 실제 페이지 발행은 Phase 4 에서
10. **D10. 회사 자산 수집 = Phase 2와 병렬** — 임원 사진 · 오피스 사진 · 매체 로고 · 파트너 로고 수집은 Phase 4 이전 완료 목표. Phase 2 의 브랜드 정비와 병렬 진행

---

## 1. 회사·브랜드 아키텍처

### 1.1 4 도메인 모델 (v1.0 의 3 → v1.1 의 4)

D5 에 따라 `app.deepingsource.io` 가 명시적으로 추가된다.

```
                       ┌──────────────────────────────┐
                       │     (주) 딥핑소스 Inc.        │
                       │     Deeping Source            │
                       └─────────────┬────────────────┘
                                     │
        ┌────────────────┬───────────┴────────────┬──────────────┐
        ▼                ▼                        ▼              ▼
  deepingsource.io  app.deepingsource.io    storecare.ai    saai.store
  회사·기술·B2B 영업  Product app          SMB·점주·구독    B2C·콘텐츠·POP
  ─────────────────  ─────────────         ─────────────    ──────────────
  Corporate site   Authenticated app       SaaS product     Content/B2C
  법인·R&D·뉴스·채용  로그인·계정·대시보드   4 모듈+가격+결제   POP+아카이브
  About·Tech·       /log-in /sign-up        /refrig /anomaly  /landing /pop
  Products·         /user-account            /shelf /clean     /archive
  Solutions·        Store Insight/Agent    pf.kakao.com/
  Enterprise·       대시보드 SaaS           _fZHln
  Pricing
  (en·ko·jp,       (다국어 추정,           (KR 단일,         (KR 단일,
   path-prefix)     별도 결정)             자영업자 채널)    편의점 점주)
```

법인 연결 고리는 4 도메인 공통 푸터의 © 2026 Deeping Source Inc. 와 회사 사이트의 `/products` 진열대 + 푸터의 4 도메인 링크.

### 1.2 두 마스터 카피 (v1.0 그대로)

`SAAI_Master_Copy_Decision_v1.md` 가 확정한 두 카피.

- **본사 마스터** — *모든 매장을 한 매장처럼.* (Every store, like one.) — 회사 사이트 Hero 주축
- **점주 마스터** — *우리 매장이 대표 매장처럼.* (Our store, like the best.) — `/products/store-care` 외부분기 카드 · storecare.ai 입구

### 1.3 제품·기술 스택 3-레이어 (v1.0 그대로, D1·D4 반영)

```
Layer 3 — Products (4 카드, D1)
  ├ Store Insight  — 대시보드 (deepingsource.io 내부, D4: 풍부 페이지)
  ├ Store Agent    — AI 매장운영 에이전트 (deepingsource.io 내부)
  ├ Store Care     — SMB SaaS (외부 storecare.ai, D4: 카드만)
  └ SAAI           — B2C 콘텐츠·POP (외부 saai.store)

Layer 2 — Technologies (회사 사이트 내부)
  ├ Anonymizer     — 원천 비식별화
  ├ SEAL           — SDK 패키지
  └ Spatial AI     — MTMC 다중 카메라 추적

Layer 1 — Vision Models (20+ catalog)
  └ Anonymization · People Counting · Queue Monitoring · 등 20+
```

### 1.4 잔재 정리 룰 (v1.0 그대로)

- `PLUS INSIGHT` 명칭 전면 폐기 → `Store Insight` 단일화
- `/pi-docs`, `/pi-manual/*` → `/resources/docs/*` 재배치
- `/untitled/*` 삭제
- 발음 그대로 slug → 영문 의미 slug
- 중복 slug → 표준 slug 단일화
- 3개 기술 페이지 동일 meta description → 각 페이지 고유

---

## 2. 새 deepingsource.io 사이트 IA

### 2.1 톱-레벨 IA (D1·D3·D4·D5 반영)

```
deepingsource.io           [path-prefix i18n: / /ko /jp, D6]
├ /                         홈 (회사 hero + 4 도메인 진열대 + 두 마스터)
├ /products/                Layer 3 — 4 카드 진열대 (D1)
│  ├ /store-insight          대시보드 (풍부 페이지, D4)
│  ├ /store-agent            에이전트 + live demo (D7) + how-it-works·pricing 섹션 (D3)
│  ├ /store-care             외부분기 카드 (D4: 카드만) → storecare.ai
│  └ /saai                   외부분기 카드 (D1) → saai.store
├ /technology/              Layer 2 — 기술 진열대
│  ├ /anonymizer             원천 비식별화
│  ├ /seal                   SDK
│  ├ /spatial-ai             MTMC
│  └ /models                 Layer 1 — 20+ Vision AI 카탈로그
├ /solutions/               업종·시나리오·통합 솔루션
│  ├ /retail · /food-beverage · /drug · /large-space
├ /enterprise               본사 관점 — Golden Case의 전국 전파
├ /pricing                  4 시작점 + 시뮬레이터
├ /company/                 회사·관계자
│  ├ /about · /news · /career · /partnership · /investors
├ /resources/               콘텐츠·신뢰 자산
│  ├ /blog                   B2B/기업 콘텐츠만 (D2: saai 18 archive 흡수 X)
│  ├ /case-studies           53명 실측 + Golden Case 5건 (D9)
│  ├ /docs                   제품 매뉴얼 (구 pi-docs)
│  ├ /glossary · /faq
├ /contact                  미팅·문의·데모
└ /legal/
   ├ /privacy · /terms

[제외 — D5 에 따라 app.deepingsource.io 로 이관]
✗ /log-in · /sign-up · /user-account · /reset-password · /update-password
[이관 — D3 에 따라 saai.store 또는 storeagent product app 으로]
✗ /storeagent/blog · /storeagent/sample · /storeagent/newsletter
```

총 톱-레벨 8 섹션 (인증·계정 페이지가 빠져 *더 가벼워짐*).

### 2.2 IA 매트릭스 — 페이지별 결정 (v1.0 표 갱신)

| 새 경로 | 결정 | 소스 | 비고 |
|---|---|---|---|
| `/` | 신설(통합) | DS home + Brand Copy Master + Master Copy Decision | Hero 두 마스터 · **4 도메인 진열대** (D1) · 4-step Weaving · 파트너 그리드 |
| `/products` | 신설 | Product_Pages_Index_v1 | **4 카드** (D1): SI · SA · SC외부 · SAAI외부 |
| `/products/store-insight` | 재구성 | DS `/store-insight` + Page_Store_Insight_v1 + storeinsight-page-data.ts | **풍부 페이지** (D4) · PLUS INSIGHT 잔재 제거 |
| `/products/store-agent` | 재구성 | DS `/storeagent` + Page_StoreAgent_v1 + 현 `/storeagent` 코드 | **live demo (D7) + how-it-works · pricing 섹션 (D3) 인라인 흡수** · 10 Zone 풀 |
| `/products/store-care` | 신설(외부분기) | Page_StoreCare_v1 + storecare.ai 카드 | **카드 페이지만** (D4) · CTA → storecare.ai |
| `/products/saai` | 신설(외부분기) | (신설 카피) + saai.store 메타 | **카드 페이지만** (D1) · CTA → saai.store |
| `/technology` | 재구성 | DS `/tech-*` 3개 + Page_Tech_Group_v1 | Layer 2 진열대 |
| `/technology/anonymizer` | 유지·강화 | DS `/tech-anonymizer` | 고유 meta · 비주얼 강화 |
| `/technology/seal` | 재구성 | DS `/seal` (5,049자) | MTMC/Pre-Purchase Data 추가 |
| `/technology/spatial-ai` | 신설 | Page_Tech_Group_v1 spatial-ai 분기 | MTMC 본문 |
| `/technology/models` | 신설 | DS home의 20+ AI 모듈 카피 | 카탈로그 그리드 |
| `/solutions` · `/solutions/{slug}` | 재구성 | 현 industries + Page_Solutions_Group_v1 | 4 업종 (대형 공간 신설) |
| `/enterprise` | 재구성 | 현 + HQ_Sales_Deck_v1 + Page_Company_Group | Golden Case 5단계 + 2031 비전 |
| `/pricing` · `/pricing/simulator` | 재구성 | 현 + Page_Pricing_v1 | 4 시작점 |
| `/company/about` | 재구성 | DS `/about-us` + Brand_Brief + External_Brand_Brief | Vision/Mission/History/Team |
| `/company/news` | 재구성 | DS `/news` (88+ 외부 링크) | 매체 로고 자산 신설(D10) |
| `/company/career` | 유지 | DS `/career` + 현 코드 | 영문 추가 |
| `/company/partnership` | 재구성 | 현 `/ms-agent` 명칭 변경 + Page_Company_Group v1 partnership spec | — |
| `/company/investors` | 신설 | (신설) | IR 자료·재무·투자 컨택 |
| `/resources/blog` | 재구성 | DS `/blog` (19) + 현 코드 + velite 풀 | **B2B/기업 콘텐츠만** (D2) · 카테고리 4종 |
| `/resources/case-studies` | 신설 | 53명 실측 + Golden Case 5건 | **Phase 2 골격 · Phase 4 발행** (D9) |
| `/resources/docs` | 재구성 | DS `/pi-docs` + `/pi-manual/*` | slug 일괄 정돈 · 사이드바 |
| `/resources/glossary` · `/faq` | 유지 | 현 + Page_Reference_Group | — |
| `/contact` | 재구성 | DS `/contact` + 현 코드 | 영문 본문 |
| `/legal/privacy` · `/legal/terms` | 유지 | DS + 현 | en/jp 신설 |
| **이관 (D3)** | | | |
| `/storeagent/blog` | 이관 → saai.store 또는 product app | | 회사 사이트 제거 |
| `/storeagent/sample` | 이관 → product app | | 회사 사이트 제거 |
| `/storeagent/newsletter` | 이관 → saai.store 뉴스레터로 흡수 | | 회사 사이트 제거 |
| `/storeagent/how-it-works` | 흡수 → /products/store-agent 섹션 | | 단일 페이지 내 인라인 |
| `/storeagent/pricing` | 흡수 → /pricing 또는 /products/store-agent 섹션 | | 단일 페이지 내 인라인 |
| **이관 (D5)** | | | |
| `/log-in · /sign-up · /reset-password · /update-password · /user-account` | 이관 → app.deepingsource.io | | 회사 사이트 제거 |
| **시스템** | | | |
| `/search · /access-denied` | 자동 | — | — |
| `/untitled/*` · slug 변형 | 삭제 (redirects만) | DS 잔재 | — |

총 새 마케팅·콘텐츠 라우트 약 **30개** (인증·계정 5종 제외로 v1.0 보다 더 가벼움).

### 2.3 redirects 매핑 (D3·D5 반영 추가)

| 구 경로 | → 새 경로 | 메서드 |
|---|---|---|
| `/store-insight` | `/products/store-insight` | 301 |
| `/storeagent` | `/products/store-agent` | 301 |
| `/storeagent/how-it-works` | `/products/store-agent#how-it-works` | 301 |
| `/storeagent/pricing` | `/pricing` (또는 `/products/store-agent#pricing`) | 301 |
| `/storeagent/blog` | `https://saai.store/archive` | 302 (외부) |
| `/storeagent/sample` | `https://app.deepingsource.io/sample` (대안: 제거) | 302 (외부) |
| `/storeagent/newsletter` | `https://saai.store/landing` | 302 (외부) |
| `/log-in · /sign-up · /reset-password · /update-password · /user-account` | `https://app.deepingsource.io/{slug}` | 302 (외부) |
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

---

## 3. 페이지별 콘텐츠 소스 매핑 (v1.0 §3 그대로, D7 만 보강)

`/products/store-agent` 의 데이터 소스 행에 `briefingData.ts → live demo 섹션 (D7)` 명시. 그 외 표 항목은 v1.0 §3 와 동일. (지면 절약을 위해 본 v1.1 에서는 변경 행만 재기재)

| 새 페이지 | 카피 소스 | 데이터 소스 | 에셋 소스 | 신설 필요 |
|---|---|---|---|---|
| `/products/store-agent` | C: Page_StoreAgent_v1 · L: DS `/storeagent` · 현 src/app/storeagent/page.tsx | 현 storeagent 코드 + **briefingData.ts → live demo 섹션 (D7)** | DS Store Agent 23 이미지 + 현 mockups | 10 Zone 풀 + live demo 인터랙션 |

---

## 4. 기능 인벤토리 & 복원 우선순위 (v1.0 §4 + D 결정 반영)

### 4.1 P0 — 회사 사이트 동작에 필수 (v1.0 그대로)

| 기능 | 출처 | 결정 |
|---|---|---|
| Contact form (B2B 영업) | DS Webflow form + 현 api/contact | **재구성** |
| Newsletter 구독 (회사 인사이트) | (신설) | **신설** |
| 다국어 라우팅 | 현 middleware + 라이브 ko/jp | **신설(코드)** — **path-prefix (D6)** |
| Sitemap / Robots / OG | 현 | **재구성** — 다국어 hreflang |
| Cookie / Privacy banner | (신설) | **신설** |

### 4.2 P1 — 콘텐츠·자산의 깊이 (D2 반영)

| 기능 | 출처 | 결정 |
|---|---|---|
| Blog | DS `/blog` + velite MDX 풀 | **재구성** — **B2B/기업 콘텐츠만 (D2)** |
| News | DS `/news` 88+ 링크 | **재구성** — 매체 로고 자산 신설 (D10) |
| Docs | DS `/pi-manual/*` 10 페이지 | **재구성** — slug 일괄 정돈 |
| Glossary · FAQ | 현 | **유지** |
| Search | DS `/search` | **신설(코드)** |
| Career list | DS `/career` | **유지·강화** |
| Partner grid | DS home 파트너 | **재구성** — 로고 자산 신설 |

### 4.3 P2 — 영업·전환의 깊이 (D7·D9 반영)

| 기능 | 출처 | 결정 |
|---|---|---|
| Pricing simulator | 현 + Page_Pricing_v1 | **재구성** |
| Case Studies | 53명 실측 + Golden Case | **신설** — **Phase 2 골격 + Phase 4 발행 (D9)** |
| Mockup / Demo 인라인 | 현 src/components/mockups | **유지** |
| **Store Agent live demo** | **briefingData.ts (D7)** | **재구성** — `/products/store-agent` 의 인터랙티브 섹션 |
| Industry pages | 현 industries + 데이터 | **재구성** — 대형 공간 신설 |
| Solutions page | 현 + Page_Solutions_Group | **재구성** |
| Enterprise | 현 + HQ_Sales_Deck_v1 | **재구성** — 신규 hero |

### 4.4 P3 — 외부 도메인에 유지 (D1·D2 반영)

| 기능 | 도메인 | 결정 |
|---|---|---|
| StoreCare 제품 결제·구독 | storecare.ai | **외부유지** — 회사는 카드 안내만 |
| StoreCare 4 모듈 상세 | storecare.ai | **외부유지** |
| SAAI 18 archive 글 | saai.store/archive | **외부유지 (D2)** — 회사 블로그로 흡수 X |
| SAAI POP 메이커 (`/pop`) | saai.store | **외부유지** — `/products/saai` (D1) 안내 |
| SAAI 뉴스레터 | saai.store | **외부유지** — 회사 뉴스레터와 분리 |
| 카카오톡 채널 | storecare.ai | **외부유지** |

### 4.5 P4 — `app.deepingsource.io` 로 이관 (D3·D5 신설)

| 기능 | 도메인 | 결정 |
|---|---|---|
| **로그인 · 회원가입 · 계정** (D5) | app.deepingsource.io | **이관** — 회사 사이트에서 제거 |
| Store Insight / Agent **대시보드** | app.deepingsource.io | **이관** — SaaS 본체 |
| `/storeagent/sample` (D3) | app.deepingsource.io 또는 saai.store | **이관** |
| `/storeagent/blog · /newsletter` (D3) | saai.store | **이관** |

---

## 5. 에셋 매핑 & 격차 (D10 일정 명시)

### 5.1 자산 풀 4 영역 합계 (v1.0 그대로)

| 풀 | 카운트 | 위치 | 사용 가능성 |
|---|---|---|---|
| 라이브 deepingsource.io 이미지 | 138 | `assets/inventory/deepingsource.io/` | reference (저작권 본인) |
| 라이브 storecare.ai 이미지 | 123 | `assets/inventory/storecare.ai/` | reference + 일부 직접 |
| 라이브 saai.store 이미지 | 4 | `assets/inventory/saai.store/` | saai_logotype, saai_symbol — 즉시 활용 |
| 로컬 톱레벨 | 22 | `assets/` | **즉시 활용** |
| Asset Candidate | 98 | `assets/Asset Candidate/` | 큐레이션 필요 |
| public/images | ~113 | `public/images/{cctv,technology,storecare,industries,blog}/` | 현 코드에서 사용 중 |

### 5.2 카테고리별 격차 (D10: Phase 2 와 병렬 진행)

| 카테고리 | 보유 | 격차 | 우선순위 | 일정 |
|---|---|---|---|---|
| 로고·심볼 | ds_logo, saai_symbol·wordmark, 세 제품 로고 | 회사 영문 워드마크 정돈 | P0 | Phase 2 |
| 아이콘 | 4 status icon + design-system/assets/icons | 새 IA 매핑 아이콘 | P1 | Phase 3 |
| Hero key visual | DS home의 indeximg001.webp | 회사 사이트만의 신규 hero | P0 | Phase 3 |
| 제품 대시보드 스크린샷 | dashboard-* + storecare 123 + DS 138 | 새 디자인 시스템 정렬 신규 | P2 | Phase 4 |
| **임원 사진** | 0 | About / Career / Investors | **P0 (D10)** | **Phase 2 병렬** |
| **오피스 사진** | 0 | About · Contact | **P1 (D10)** | **Phase 2 병렬** |
| **파트너 로고 그리드** | 0 | 회사 파트너 로고 (저작권 정리) | **P1 (D10)** | **Phase 2 병렬** |
| **매체 로고 (News용)** | 0 (라이브는 placeholder) | 88+ 매체 로고 raw 수집 → 흑백 통일 | **P1 (D10)** | **Phase 2 병렬** |
| 인포그래픽 (4단계 루프·MTMC) | 부분(라이브에 있음) | 새 디자인 시스템으로 재제작 | P2 | Phase 3 |
| 영문 OG 이미지 | en 별도 없음 | en/ko/jp OG 자동 생성 | P1 | Phase 4 |

### 5.3 자산 수집 일정 (D10 — Phase 2 와 병렬)

| 단계 | 산출물 | 마감 |
|---|---|---|
| 자리 식별 | 필요한 자산 종류·수량 표 (위 §5.2 의 P0·P1) | Phase 2 시작 시 |
| 외부 발주 | 임원·오피스 촬영 작가 섭외 (필요시) · 매체 로고 raw 수집 | Phase 2 + 1주 |
| 촬영·수집 | 임원·오피스 촬영 · 매체 로고 흑백 통일 · 파트너 로고 저작권 정리 | Phase 3 시작 전 |
| 가공·정돈 | 새 디자인 시스템에 맞춰 크롭·압축·OG 변환 | Phase 4 시작 전 |
| 박음 | 새 사이트 코드에 적용 | Phase 4 |

---

## 6. 다국어 (i18n) 전략 (D6 확정)

### 6.1 결정 사항 (D6)

- **로케일 3종** — `en` (기본, prefix 없음) · `ko` (`/ko/...`) · `jp` (`/jp/...`)
- **라우팅 정책** — **path-prefix** (D6 확정 — Next.js App Router 의 `(en)` `(ko)` `(jp)` 그룹 라우트 또는 middleware path 분기)
- **콘텐츠 우선순위** — 회사·법무·기술·제품 = 3개 모두 / Solutions·Pricing·Industries = 3개 모두 / 블로그 = *원본 언어 + 번역 보유 시 노출*
- **번역 출처** — 본 brand-system 카피 spec(ko 중심) + 라이브 DS 사이트(en/ko/jp) + 부족분 영문화

### 6.2 i18n 격차 (v1.0 그대로)

| 영역 | 현 상태 | 격차 | 결정 |
|---|---|---|---|
| en 카피 | 라이브 DS 47 페이지 | brand-system 영문 동기화 부족 | P0 — en 마스터 카피 풀 작성 |
| jp 카피 | 라이브 DS 45 페이지 (8 누락) | brand-system jp 부재 | P1 — 후순위 |
| ko 카피 | brand-system 41 문서 + 라이브 ko 52 페이지 | ko 본문이 라이브에서 40-50% 짧음 | P0 — ko 깊이 보강 |
| 번역 인프라 | velite + i18n 코드 없음 | **path-prefix 라우팅** (D6) | P0 — Phase 4 |

### 6.3 콘텐츠 풀 vs 라이브 비대칭 (v1.0 그대로)

196편 MDX 풀 중 약 80% 미발행. 회사 사이트 블로그·리소스로 단계 발행.

---

## 7. 단계별 로드맵 (D8·D9·D10 반영)

### Phase 1 — 인벤토리 & 마스터 플랜 (✅ 완료)
- 3 라이브 사이트 크롤 → INVENTORY 3종
- 로컬 자산 인벤토리 → INVENTORY 1종
- 통합 마스터 플랜 v1.0 → v1.1 (Open Q 10종 해소)
- 다음: Phase 2 시작

### Phase 2 — 브랜드 시스템 정비 (+ 병렬 자산 수집 D10 + case-study 골격 D9)
- 41 brand-system 문서를 *회사 사이트 우선순위* 로 재정렬
- 두 마스터 카피의 사용처 매핑 (페이지별)
- 회사·제품·기술 3-레이어의 보이스 차별화 룰 명문화
- 신설 필요 카피 식별 (SEAL FAQ, /products 진열대, /company/investors)
- **case-study 5건 스토리 구조·카피 골격 (D9)** — 53명 실측 + Golden Case 5단계
- **병렬: 자산 수집 시작 (D10)** — 임원·오피스 촬영 발주 · 매체 로고 raw 수집 · 파트너 로고 저작권 정리
- 산출물: `docs/BRAND_v2.md` · 카피 풀 인덱스 · `docs/CASE_STUDIES_v1.md` (5건 골격)

### Phase 3 — 디자인 시스템 업데이트 (+ 병렬 자산 가공)
- design-system/dist 13 CSS 의 회사 사이트 적용 모드 정의
- 회사 사이트 전용 시각 정체성 (Hero · IR 톤 · Tech Spec 그리드)
- `ui_kits/corporate/` 신설 + 새 IA 컴포넌트 인벤토리
- 색·타이포·차트 토큰의 회사 사이트 모드 정렬
- **병렬: 수집된 자산을 새 디자인 시스템에 맞춰 크롭·압축·OG 변환**
- 산출물: `docs/DESIGN_v2.md` · `ui_kits/corporate/` · dist CSS 갱신

### Phase 4 — 코드 변환 + 발행 (D3·D5·D7·D8·D9 반영)
- 현 src/app 22 라우트 → 새 IA 30 라우트 매핑 PR 분할
- **i18n path-prefix 라우팅 적용 (D6)** — middleware.ts 확장
- **redirects 일괄 박음 (D3·D5)** — next.config.ts
- velite MDX 풀의 새 분류 적용 (insight·tip·guide·case-study 4 카테고리)
- **/products/store-agent 의 live demo 섹션 (D7)** — briefingData.ts 흡수
- **case-study 5건 페이지 발행 (D9)**
- **자산 박음 (D10)** — 임원·오피스·매체 로고
- 산출물: `docs/CODE_v1.md` · `redirects.ts` · 사이트 빌드 완료

### Phase 5 — Webflow 즉시 교체 & 발행 (D8 확정)
- **Phase 4 끝나는 순간 Webflow 본 사이트 → 새 Next.js 로 DNS 교체 (D8)** — 병존 기간 최소화
- en/ko/jp 단계 발행 (en 우선, ko 동시, jp 후순위)
- 검색 인덱스 · OG 자동화 · sitemap 갱신
- 외부분기 URL 안정화 (storecare.ai · saai.store · app.deepingsource.io)

---

## 8. Open Questions — *모두 해소* (v1.0 → v1.1)

v1.0 의 10개 Open Q 는 v1.1 의 §0.3 D1–D10 결정으로 모두 해소. v1.1 시점의 미해소 Q 는 없음.

추후 v1.2 에서 등장할 가능성이 있는 *2차 Q*(현재는 결정 불필요):
- D5 의 `app.deepingsource.io` 의 자체 다국어 정책
- D8 의 Webflow 교체 시 SEO sitemap 의 일시 변동 관리
- D9 의 case-study 5건 이후 *상시 발행 큐* 운영
- D10 의 임원·오피스 사진의 정기 갱신 (1년 1회 등)

---

## 9. 부록 — 두 기존 계획서와의 관계 (v1.0 §9 그대로)

### 9.1 SAAI_Website_Upgrade_Spec_v1 → 본 플랜의 §3 콘텐츠 소스
### 9.2 Deepingsource_Web_Transition_Plan_v0.2 → 본 플랜의 §2 IA + §2.3 redirects
### 9.3 두 계획서 흡수 후 archive — v1.1 이 SOT

---

## 10. 다음 행동 (v1.1 발행 직후)

1. **Phase 2 시작** — 브랜드 시스템 정비 (TaskList #4)
2. **자산 수집 일정 발주 (D10)** — Phase 2와 병렬
3. **case-study 5건 스토리 구조 (D9)** — Phase 2 안에서
4. **Phase 4 직전** — `docs/IA_LOCK.md` 최종 IA Lock 문서화
5. **검증 (TaskList #7)** — v1.1 의 결정이 라이브·코드베이스·기존 계획서와 모순 없는지 서브에이전트 교차검증

— *끝.*
