# AUDIT v1 — Phase 1-4 산출 7종 × 인벤토리 4종 × 코드 × 기존 2 계획서 교차검증

> **버전** v1.0 · **작성일** 2026-05-29 · **상위 SOT** [PLAN_v1.1.md](./PLAN_v1.1.md)
> **검증 대상** PLAN_v1.1 · PLAN_v1 · BRAND_v2 · CASE_STUDIES_v1 · ASSET_COLLECTION_v1 · DESIGN_v2 · CODE_v1 (Phase 1–4 산출 7종)
> **참조 자산** 4 INVENTORY (deepingsource.io · storecare.ai · saai.store · local) · 현 src · brand-system/SAAI_Website_Upgrade_Spec_v1 · design-system/Deepingsource_Web_Transition_Plan_v0.2
> **상태** Phase 5 진입 전 *결재 필요* 결함 다수 발견 — v1.2 갱신 권고

---

## 0. 요약

### 0.1 검증 범위

| 차원 | 대상 |
|---|---|
| Phase 1-4 산출 | 7 문서 (PLAN_v1.1·PLAN_v1·BRAND_v2·CASE_STUDIES_v1·ASSET_COLLECTION_v1·DESIGN_v2·CODE_v1) |
| 라이브 인벤토리 | 4 도메인 (deepingsource.io 58 경로 / storecare.ai 5 / saai.store 21 / local 워크스페이스) |
| 현 코드 | src/app 22 라우트 · src/components 19 디렉토리(톱레벨 2 포함) · src/data 14 모듈 · velite 풀 196 |
| 기존 계획서 | Upgrade_Spec_v1 (Tier A 5 + Tier B 5 + Tier C 3) · Transition_Plan_v0.2 (한글 32 페이지 × 6 결정 + 영문 10 + 신설 6) |

### 0.2 결함 카운트

| 분류 | 카운트 | 비고 |
|---|---|---|
| Critical (빌드 막힘) | **3** | F-01·F-02·F-08 |
| High (품질 손실) | **9** | F-03·F-04·F-05·F-06·F-07·F-09·F-10·F-11·F-12 |
| Medium (완성도 손실) | **11** | F-13 ~ F-23 |
| Low (미세) | **6** | F-24 ~ F-29 |
| **총 결함** | **29** | PASS 인정 5종 별도 |

### 0.3 핵심 결함 5종 (가장 임팩트 큰)

1. **F-01 (Critical) · `/cases` 라우트의 운명 누락** — Transition_Plan_v0.2 §1.2 가 `/cases` + `/cases/[slug]` 의 *통합 → `/products/saai#cases`* 를 외부분기 5건의 하나로 *명시*. 그러나 v1.1 §2.3 redirects 표 · CODE_v1 §4.1 의 next.config.ts 예시 · CODE_v1 §1.1 매핑 표 모두에 `/cases` 가 *0번* 등장. 라이브 deepingsource.io 에는 `/cases` 가 *경로상 존재* (Transition_Plan 실측 32 한글 페이지의 일부). Webflow 교체 시 *301 redirect 누락* 으로 외부 백링크가 404로 떨어진다. PLAN_v1.1 §0.3 D9 가 `/resources/case-studies` 5건을 *신설* 만 다루고, 구 `/cases` 의 *흡수 또는 redirect* 를 다루지 않음.

2. **F-02 (Critical) · `/search` · `/access-denied` 의 구현 결정 부재** — PLAN_v1.1 §2.1 IA 표에는 *제외* 가 아니라 *시스템(자동)* 으로 표기됐으나, CODE_v1 §1.1 의 22 라우트 매핑 표에 *전혀 등장하지 않음*. deepingsource.io 의 `/search` 는 Webflow native search 였고, 새 Next.js 사이트는 *검색 엔진 신설* 필요 (PLAN_v1.0 §4.2 P1 *Search* = 신설(코드) 였음). PLAN_v1.1 에서 *신설 결정이 유실됨* — Phase 5 발행 후 구 `/search` URL 의 SEO 인덱스가 404 처리.

3. **F-03 (High) · `/storeagent/sample` 의 destination 모순** — PLAN_v1.1 §2.3 와 CODE_v1 §4.1 의 redirects 예시는 `/storeagent/sample` → `https://app.deepingsource.io/sample` (302). 그러나 BRAND_v2 §5.1 의 D1 카드 spec 과 PLAN_v1.0 §4.4 의 P3 *외부유지* 룰은 `sample` 을 *saai.store 측* 또는 *체험계정* 으로 분기. CASE_STUDIES_v1 §0 의 *4 도메인 분리* 에서 app.deepingsource.io 는 *대시보드 SaaS*, 체험계정·샘플은 보통 product app 또는 saai.store. *D3 결정의 sample 분기 destination 이 두 자리에서 다르게 박힘* (PLAN v1.1 §2.3 → app.ds.io · PLAN v1.0 §4.4 → saai.store).

4. **F-04 (High) · briefingData · /storeagent/sample 의 *live demo* vs *sample* 의 경계 모호** — CODE_v1 §6.2 는 *live demo 는 회사 사이트 안의 인터랙션, sample 은 외부 app 의 체험 계정* 으로 명시. 그러나 PLAN_v1.1 §0.3 D7 *briefingData = Store Agent live demo* 의 활용은 *흡수* 이고, 현 src/data/briefingData.ts 는 `/storeagent/sample` 의 *원천* 자산. CODE_v1 PR-03 (live demo 흡수) 와 PR-15 (sample → 외부 redirect) 가 *같은 briefingData* 의 *내부 활용·외부 redirect* 두 자리를 동시에 결정 — sample 외부 redirect 시 briefingData 가 *현 코드에 남은 채 절반만 동작* 하는 상태.

5. **F-05 (High) · case-study 5건의 시점 자산 vs Phase 4 발행 일정 모순** — CASE_STUDIES_v1 §6 은 사진 13컷 + 대시보드 13장 + KPI 그래프 10장 + 인포그래픽 1장 = *총 약 37 자산* 을 Phase 2-3 자산 수집(D10) 의 case-study 트랙으로 박음. 그러나 ASSET_COLLECTION_v1 §2 (부수 영역) · §3 (단계별 일정 표) 에 *case-study 자산 트랙이 별도 라인으로 명시되지 않음* — §2.1 인포그래픽 5종에 *Golden Case 5단계* 는 들어있으나, *대시보드 13장 · KPI 그래프 10장* 의 발주·일정·결재는 누락. Phase 4 PR-13 (5건 발행) 직전에 자산 부족으로 *플레이스홀더 발행* 불가피.

### 0.4 본 v1 의 결론 한 줄

*결정 D1-D10 의 본문 반영은 대체로 정합하나, 라이브 deepingsource.io 58 경로 중 13 경로의 운명이 누락되고 (특히 `/cases` · `/search` · jp 누락 8 · pi-manual ko-only 2), 자산 수집 일정의 case-study 트랙이 별도 라인 없이 묻혀 있으며, 인증 페이지 5종의 `app.deepingsource.io` 신설은 본 v1 의 PR 범위 밖이지만 *그 시점·발주 책임* 이 어디에서도 잡혀 있지 않다 — Phase 5 진입 전 v1.2 갱신과 `app.deepingsource.io` 트랙의 결재 1건이 필요하다.*

---

## 1. 검증 차원 A — 결정 정합성 (D1–D10 × 후속 문서)

PLAN_v1.1 §0.3 의 10 결정 각각이 §2 IA · §4 기능 인벤토리 · §6 i18n · §7 로드맵 + 후속 문서 (BRAND_v2 · DESIGN_v2 · CODE_v1 · CASE_STUDIES_v1 · ASSET_COLLECTION_v1) 에 *모순 없이* 박혔는지 1행씩 확인.

| D | 본문 (§2/§4/§6/§7) | BRAND_v2 | DESIGN_v2 | CODE_v1 | CASE/ASSET | 정합 |
|---|---|---|---|---|---|---|
| D1. /products 4 카드 | §2.1 4 카드 IA 확정 · §2.2 표 4 카드 행 | §3.1 4 카드 라우트별 표 · §5.1 신설 카피 | §4 4 카드 컴포넌트 인벤토리 · §2.1 audience-corporate.layer-products | §1.1 PR-02 신설 · 부록 A PR-02 행 | CASE §1 *원칙 3* 4 제품 매핑 / ASSET — | **PASS** |
| D2. 블로그 외부유지 | §2.1 *D2 표기* · §4.2 P1 *B2B/기업 콘텐츠만* | §1.3 *외부분기 카드만 다룸* | §4 `/resources/blog` 카드 | §5.1 *target=saai 154글 이관* | — | **PASS** (단, F-19 참조) |
| D3. /storeagent 5 서브 분리 | §2.1 `/storeagent/*` 이관 표기 · §4.5 P4 | §6 StoreAgent_v1 갱신 룰 (5→1) | §4 store-agent 컴포넌트 | §1.1 PR-03 흡수 + PR-15 redirects | — | **PASS** (단, F-03 sample destination 모순) |
| D4. storecare/storeinsight 코드 → /products/* | §2.1 카드 페이지 · §2.2 SI 풍부 SC 카드 | §6 StoreCare_v1 *축소*·SI 풍부 | §4 SI 풍부 카드, SC 외부분기 카드 | §1.1 PR-04 풍부 · PR-05 축소 | — | **PASS** |
| D5. 인증·계정 → app.deepingsource.io | §1.1 4 도메인 · §2.1 *제외 표기* · §4.5 P4 | §1.3 *외부 도메인 본문 다루지 않음* | §3.1 app.ds.io 분리 — *디자인은 본 v2 밖* | §0.2 *PR 범위 밖 명시* · §1.1 redirects | — | **PASS** (단, F-08 app.ds.io 신설 트랙 부재) |
| D6. i18n path-prefix | §2.1 표기 · §4.1 *path-prefix (D6)* · §6 | §3 *영문 변주 라우트별 표* · §5.8 en 카피 풀 | §6.3 en 변주 (typography) | §3 옵션 B 권고 · PR-00 | — | **PASS** |
| D7. briefingData → Store Agent live demo | §2.2 *live demo 인라인 흡수* · §3 표 · §4.3 | §3 `/products/store-agent` 점주 보조 | §4 LiveDemo 신설 · 자율도 사다리 | §6 흡수 경로 PR-03 | — | **PASS** (단, F-04 live demo vs sample 경계 모호) |
| D8. Webflow 즉시 교체 | §0.3 · §7 Phase 5 | (해당 없음) | (해당 없음) | §8 PR-18 체크리스트 | — | **PASS** |
| D9. case-study 5건 골격→발행 | §2.1 신설 · §4.3 P2 · §7 Phase 2·4 | §5.10 식별 → CASE_STUDIES_v1 분리 | §4 case-study 카드 · §5.1 CaseStudyHero spec | §1.1 PR-13 + 부록 A | CASE 전체 | **PASS** (단, F-05 자산 일정 누락) |
| D10. 자산 수집 = Phase 2 병렬 | §5.3 자산 일정 표 · §7 Phase 2 병렬 | §5 신설 카피 §7.3 병렬 | §7 신설 자산 표 · §8.3 W3 자산 가공 | §7 PR-17 합류 | ASSET 전체 | **PASS** (단, F-05 case-study 트랙 누락 · F-13 임원 실명 미정) |

**A 차원 요약** — D1-D10 *결정 본문 반영* 은 *형식적으로는 모두 PASS*. 그러나 D3·D5·D7·D9·D10 의 *세부 자리* 에서 모순 또는 누락이 발견 (F-03·F-04·F-05·F-08 참조).

---

## 2. 검증 차원 B — 라우트 정합성

PLAN_v1.1 §2.1 의 새 IA 30 라우트가 BRAND_v2 §3 / DESIGN_v2 §4 / CODE_v1 §1.1 매핑 표 4 곳에서 일치하는지 확인.

### 2.1 30 라우트 × 4 문서 매핑 표

| # | PLAN v1.1 §2.1 | BRAND_v2 §3.1 | DESIGN_v2 §4 | CODE_v1 §1.1 | 정합 |
|---|---|---|---|---|---|
| 1 | `/` | ✓ Hero h1 + sub | ✓ Company | ✓ PR-01 | PASS |
| 2 | `/products` | ✓ 우산 | ✓ Products | ✓ PR-02 | PASS |
| 3 | `/products/store-insight` | ✓ | ✓ | ✓ PR-04 | PASS |
| 4 | `/products/store-agent` | ✓ | ✓ | ✓ PR-03 | PASS |
| 5 | `/products/store-care` | ✓ 점주 정면 | ✓ 외부분기 | ✓ PR-05 | PASS |
| 6 | `/products/saai` | ✓ | ✓ | ✓ PR-06 | PASS |
| 7 | `/technology` | ✓ | ✓ | ✓ PR-07 | PASS |
| 8 | `/technology/anonymizer` | ✓ | ✓ | ✓ PR-07 | PASS |
| 9 | `/technology/seal` | ✓ | ✓ | ✓ PR-07 | PASS |
| 10 | `/technology/spatial-ai` | ✓ | ✓ | ✓ PR-07 | PASS |
| 11 | `/technology/models` | ✓ | ✓ | ✓ PR-07 | PASS |
| 12 | `/solutions` | ✓ | ✓ | ✓ PR-08 | PASS |
| 13 | `/solutions/retail` | ✓ | ✓ | ✓ PR-08 | PASS |
| 14 | `/solutions/food-beverage` | ✓ | ✓ | ✓ PR-08 | PASS |
| 15 | `/solutions/drug` | ✓ | ✓ | ✓ PR-08 | PASS |
| 16 | `/solutions/large-space` | ✓ 본사 정면 | ✓ | ✓ PR-08 | PASS |
| 17 | `/enterprise` | ✓ 본사 정면 | ✓ | ✓ PR-09 | PASS |
| 18 | `/pricing` | ✓ | ✓ | ✓ PR-10 | PASS |
| 19 | `/pricing/simulator` | ✓ | ✓ | ✓ PR-10 | PASS |
| 20 | `/company/about` | ✓ 두 마스터 대칭 | ✓ | ✓ PR-11 | PASS |
| 21 | `/company/news` | ✓ | ✓ MediaGrid | ✓ PR-11 | PASS |
| 22 | `/company/career` | ✓ | ✓ TeamSection | ✓ PR-11 | PASS |
| 23 | `/company/partnership` | ✓ | ✓ PartnerLogoGrid | ✓ PR-11 | PASS |
| 24 | `/company/investors` (신설) | ✓ 본사 정면 | ✓ | ✓ PR-11 | PASS |
| 25 | `/resources/blog` | ✓ | ✓ | ✓ PR-12 | PASS |
| 26 | `/resources/case-studies` | ✓ | ✓ | ✓ PR-13 | PASS |
| 27 | `/resources/docs` | ✗ (BRAND §3.1 표에 누락) | ✓ DocsSidebar | ✓ PR-12 | **WARN — F-13** |
| 28 | `/resources/glossary` | ✓ (`/resources/faq` 와 묶음) | ✓ | ✓ PR-12 | PASS |
| 29 | `/resources/faq` | ✓ | ✓ | ✓ PR-12 | PASS |
| 30 | `/contact` | ✓ | ✓ | ✓ PR-14 | PASS |
| 31 | `/legal/privacy` | ✓ | ✓ | ✓ PR-14 | PASS |
| 32 | `/legal/terms` | ✓ (privacy 와 묶음) | ✓ (LegalBody) | ✓ PR-14 | PASS |

### 2.2 30 vs 32 — 카운트 불일치

- PLAN_v1.1 §2.1 은 *톱-레벨 8 섹션, 총 약 30 라우트* 라고 명시. 그러나 *실 라우트* 는 `/resources/glossary` 와 `/resources/faq` 가 분리, `/legal/privacy` 와 `/legal/terms` 가 분리되어 *32 라우트* 가 실제 카운트.
- DESIGN_v2 §4 표는 *31 라우트* (`/resources/glossary` · `/resources/faq` 한 행), CODE_v1 §1.1 도 *32 라우트 매핑* 으로 박힘.
- **F-14 (Medium)** — 30 vs 32 의 카운트 표기가 세 문서에서 불일치. CASE_STUDIES_v1·CODE_v1 부록 B 가 *30 라우트* 그대로 인용 → 본문은 *32* 처리.

### 2.3 BRAND v2 §3.1 의 누락

- `/resources/docs` 가 BRAND v2 §3.1 의 30 라우트 표에 *행으로 없음* (DESIGN_v2 · CODE_v1 에는 있음). BRAND_v2 §3.1 표는 *카피 사용처* 의 자리 — 카피가 거의 없는 자리이긴 하나 *마스터 카피 사용처 표* 의 *행 누락* 으로 검수 시 *조회 안 되는* 위험. → **F-13 (High)**.

### 2.4 누락 라우트·중복 라우트·이름 불일치

- 누락: 없음 (32 라우트 모두 4 문서에 등장)
- 중복: 없음
- 이름 불일치: 없음 (`/products/store-agent` · `/products/store-insight` · `/products/store-care` slug 정합)
- 실 이름 불일치 1자리 — **F-15 (Medium)**: Transition_Plan_v0.2 의 *신설 6 페이지* 는 `/products`·`/products/saai`·`/careers`·`/history`·`/press`·`/investors`. 그러나 PLAN_v1.1 은 `/careers` → `/company/career`, `/history` → `/company/about` 안 (History 섹션), `/press` → `/company/news`, `/investors` → `/company/investors`. 이름·prefix *재정렬* 결정의 *근거가 본문에서 명시 안 됨* — Transition_Plan 의 6 페이지가 *흡수* 된 매핑이 PLAN v1.1 §9 부록에 짧게만 언급.

---

## 3. 검증 차원 C — 라이브 사이트 흡수의 완전성

### 3.1 deepingsource.io — 58 고유 경로 매핑

deepingsource.io INVENTORY §2 의 58 경로를 새 IA·외부분기·이관·삭제 중 어디에 박혔는지.

| 라이브 경로 (그룹) | 카운트 | 새 IA 매핑 | 정합 |
|---|---|---|---|
| `/` | 1 | `/` (PR-01) | PASS |
| 제품 2 (`/store-insight`, `/storeagent`) | 2 | `/products/store-insight` · `/products/store-agent` (PR-04·PR-03) + redirects | PASS |
| 기술 4 (`/seal` · `/tech-anonymizer` · `/tech-spatial-ai` · `/tech-store-care-ai`) | 4 | `/technology/{seal,anonymizer,spatial-ai}` + `/products/store-care` (PR-07·PR-05) | PASS |
| 회사 5 (`/about-us` · `/career` · `/contact` · `/news` · `/privacy`) | 5 | `/company/{about,career,news}` · `/contact` · `/legal/privacy` (PR-11·PR-14) | PASS |
| 블로그 허브 1 + post/* 19 | 20 | `/resources/blog` + `/resources/blog/{slug}` 19 (D2: B2B 위주 큐레이션) | **WARN — F-16** |
| pi-docs 1 + pi-manual 10 | 11 | `/resources/docs` (PR-12) | PASS |
| 인증·계정 5 | 5 | app.deepingsource.io 외부분기 (PR-15) | PASS |
| 시스템 4 (`/access-denied` · `/search` · `/untitled/untitled-2` + 시스템 1) | 4 | ✗ **F-02 search/access-denied 누락 · F-17 untitled 매핑 표기 약함** | **FAIL** |
| /cases · /cases/[slug] (Transition_Plan_v0.2 실측) | 2 | ✗ **F-01 매핑 표·redirects 누락** | **FAIL** |
| **합계** | **58** | 53 (PASS) + 5 (FAIL/WARN) | 91% 정합 |

### 3.2 deepingsource.io 의 *외부 매체 88+ 링크* · *블로그 19* · *매뉴얼 10* · *인증 5* · *시스템 4* 처리

| 자산 | 라이브 카운트 | 새 사이트 처리 | 정합 |
|---|---|---|---|
| 외부 매체 링크 (88+) | 88 (News 본문) | `/company/news` 의 매체 로고 sprite (D10 자산 수집 §1.3 매체 로고 P1) | **WARN — F-09**: 88+ 매체의 *외부 링크 자체* 가 어디에 박힐지 (각 카드의 dest URL) ASSET_COLLECTION 에 없음. PLAN v1.1 §5.2 에 *88+ 매체 로고 raw 수집 → 흑백 통일* 만 박힘. *링크 dest 보존* 의 책임 미명시. |
| 블로그 글 19 | 19 (DS `/post/*`) | `/resources/blog/{slug}` (PR-15 redirect `/post/:slug` → `/resources/blog/:slug`) | **WARN — F-16**: 19 글의 *원본 본문* 이 어디서 옴? DS 라이브의 19 글은 *Webflow Collections* 의 데이터. PLAN_v1.0 §3 의 표에서는 *DS 19 + velite 풀 196* 합쳐서 *카테고리 4종* 발행. CODE_v1 §5 의 새 카테고리 분류 (insight·tip·guide·case-study) 는 *velite 풀* 만 분류 → *DS 19 글* 의 마이그레이션 책임 누락. |
| 제품 매뉴얼 10 + pi-docs 1 | 11 | `/resources/docs/{slug}` (PR-15 redirect `/pi-manual/:slug` → `/resources/docs/:slug`) | **WARN — F-18**: 10 슬러그 중 *3 자리* 가 정돈 필요 (`heatmap-analysis` ko-only, `heatmapbytime-analysis` 중복, `seoljeong-kategori-teseuteu` 발음 slug). PLAN_v1.1 §1.4 의 *발음 slug → 영문 의미 slug 일괄 교체* 룰은 명시. 그러나 CODE_v1 §1.1 에 *각 slug 별 새 영문 이름의 결정 표* 가 없음. |
| 인증 5 | 5 | redirects → app.deepingsource.io (PR-15) | PASS (단, F-08 app.ds.io 트랙 부재) |
| 시스템 4 (`/access-denied`·`/search`·`/untitled/untitled-2` + 시스템 1) | 4 | ✗ 결정 누락 (F-02·F-17) | **FAIL** |

### 3.3 storecare.ai — 5 페이지 외부분기 정합

| 라이브 경로 | 새 사이트 처리 | 정합 |
|---|---|---|
| `/` (home) | `/products/store-care` 카드의 *미리보기* (PR-05) + CTA → storecare.ai | PASS |
| `/anomaly` · `/clean` · `/refrig` · `/shelf` | 외부유지 (D4) — 회사 사이트는 *카드 페이지만* (PR-05) | PASS |
| 카카오톡 채널 `pf.kakao.com/_fZHln` | 외부유지 (PLAN_v1.0 §4.4 P3) | PASS |
| `mystore.storecare.ai` 콘솔 | 외부유지 | PASS |

**storecare.ai 정합: PASS** — D4 결정 (storecare 코드 → /products/store-care 카드 축소) 이 BRAND_v2 §6 의 갱신 룰 (StoreCare_v1 *재구성*) · DESIGN_v2 §4 (외부분기 카드) · CODE_v1 PR-05 (100-200 라인) 에 모두 박힘.

### 3.4 saai.store — 21 페이지 외부분기/이관 정합

| 라이브 경로 (그룹) | 카운트 | 새 사이트 처리 | 정합 |
|---|---|---|---|
| `/landing` | 1 | `/products/saai` 카드 (PR-06) + CTA → saai.store/landing | PASS |
| `/pop` | 1 | 외부유지 (PLAN v1.0 §4.4 P3 *SAAI POP 메이커*) | PASS |
| `/archive/` 인덱스 + 18 글 | 19 | 외부유지 (D2) — 회사 블로그로 흡수 X | PASS |
| **velite 풀 154 글의 이관** (CODE_v1 §5.1) | 154 (tip 53 + season 25 + weekly 26 + ...) | saai.store CMS 자동 이관 (CODE_v1 §5.3 Q3) | **WARN — F-19**: saai.store 의 *현 archive 18 글* 과 *이관 후 154 글* 의 *큐레이션·발행 일정* 이 새 사이트의 책임 밖. saai.store *측 산출물* 이 본 워크스페이스의 어디서도 추적되지 않음. *외부유지* 의 *외부* 가 *책임 없음* 으로 해석될 위험. |

### 3.5 외부 매체 88+ 링크의 본문 보존

deepingsource.io INVENTORY §6.2 는 30+ 매체의 헤드라인·일자를 추출. 본 헤드라인이 *새 `/company/news`* 의 *카드 콘텐츠* 로 옮겨질 책임 자리가 *DESIGN_v2 §4 MediaGrid* 와 *ASSET_COLLECTION §1.3 매체 로고* 에 *부분적으로만 박힘*. **88+ 헤드라인·일자·외부 URL 세 자리의 *내용 마이그레이션 표*** 가 아무 산출에도 없음 → **F-09 (High)**.

### 3.6 C 차원 요약

- deepingsource.io 58 경로 중 53 정합 + 5 누락/약함 (91% 정합)
- storecare.ai 5 페이지 100% 정합
- saai.store 21 페이지 100% 외부유지 정합 + 이관 154 글의 *외부 책임* 모호
- 외부 자산 88+ 매체 링크 + 19 블로그 본문 + 10 매뉴얼 slug 의 *콘텐츠 마이그레이션 표* 가 누락 또는 약함

---

## 4. 검증 차원 D — 코드베이스 흡수

### 4.1 src/app 22 라우트 (실측)

실측 src/app 폴더 (시스템 파일 제외): `about · api · company · contact · enterprise · faq · glossary · industries · ms-agent · pricing · privacy · solutions · storeagent · storecare · storeinsight · technology · terms · thank-you` = **18 라우트 폴더** + storeagent 5 서브 (`blog · how-it-works · newsletter · pricing · sample`) = **23 라우트**.

| src/app 폴더 | CODE_v1 §1.1 매핑 | 정합 |
|---|---|---|
| `/` | ✓ PR-01 | PASS |
| `/about` | ✓ PR-11 → `/company/about` | PASS |
| `/api/*` | ✓ 유지 (별도) | PASS |
| `/company` | ✓ PR-11 → `/company/about` 흡수 | PASS |
| `/contact` | ✓ PR-14 | PASS |
| `/enterprise` | ✓ PR-09 | PASS |
| `/faq` | ✓ PR-12 → `/resources/faq` | PASS |
| `/glossary` (+ `[slug]`) | ✓ PR-12 → `/resources/glossary` | PASS |
| `/industries` (+ `[slug]`) | ✓ PR-08 → `/solutions/{slug}` | PASS |
| `/ms-agent` | ✓ PR-11 → `/company/partnership` | PASS |
| `/pricing` (+ `simulator`) | ✓ PR-10 | PASS |
| `/privacy` | ✓ PR-14 → `/legal/privacy` | PASS |
| `/solutions` (+ `[slug]`) | ✓ PR-08 | PASS |
| `/storeagent` | ✓ PR-03 | PASS |
| `/storeagent/blog` | ✓ PR-15 → saai.store | PASS |
| `/storeagent/how-it-works` | ✓ PR-03 흡수 (`#how-it-works`) | PASS |
| `/storeagent/newsletter` | ✓ PR-15 → saai.store | PASS |
| `/storeagent/pricing` | ✓ PR-10 → `/pricing` | PASS |
| `/storeagent/sample` | ✓ PR-15 → app.ds.io | PASS (F-03 destination 모순 별도) |
| `/storecare` | ✓ PR-05 | PASS |
| `/storeinsight` | ✓ PR-04 | PASS |
| `/technology` | ✓ PR-07 | PASS |
| `/terms` | ✓ PR-14 → `/legal/terms` | PASS |
| `/thank-you` | ✓ PR-14 유지 | PASS |

**22 라우트 (api 1 + storeagent 5 포함 23) 100% 매핑.** CODE_v1 §1.1 의 22 라우트 카운트는 (api 별도 + storeagent를 1로 셈) 일관.

### 4.2 src/components 17 디렉토리 (실측)

실측 src/components: `Analytics.tsx · HomeHero.tsx (톱레벨 2)` + `about · blog · company · industries · layout · mockups · pages · pricing · sections · shared · solutions · storecare · storeinsight · technology · ui` = **15 디렉토리 + 톱레벨 2** = **17 자리**.

| 디렉토리 | CODE_v1 §1.2 운명 | 정합 |
|---|---|---|
| Analytics.tsx | ✓ "유지 (Umami)" | PASS |
| HomeHero.tsx | ✓ "PR-01 재구성" | PASS |
| about/ | ✓ PR-11 이전 | PASS |
| blog/ | ✓ PR-12 이전 | PASS |
| company/ | ✓ PR-11 이전 | PASS |
| industries/ | ✓ PR-08 이전 | PASS |
| layout/ | ✓ PR-00 분기 | PASS |
| mockups/ | ✓ PR-03·PR-04 | PASS |
| pages/ | ✓ PR-03 이전 | PASS |
| pricing/ | ✓ PR-10 이전 | PASS |
| sections/ | ✓ PR-01·PR-03·PR-04 | PASS |
| shared/ | ✓ "유지" | PASS |
| solutions/ | ✓ PR-08 이전 | PASS |
| storecare/ | ✓ PR-05 축소 | PASS |
| storeinsight/ | ✓ PR-04 이전 | PASS |
| technology/ | ✓ PR-07 이전 | PASS |
| ui/ | ✓ PR-00.5 토큰 적용 | PASS |
| storeagent/ | ✓ "별도 폴더 없음, 위 sections + pages 통합" | PASS |

**17 디렉토리 모두 매핑 (storeagent 가상 디렉토리 포함).** **PASS**

### 4.3 src/data 14 모듈 (실측)

실측 src/data: `articles/ · briefingData.ts · cctvImages.ts · glossaryTerms.ts · industryContent.ts · industryList.ts · mockup-scenarios/ · posAnalysisData.ts · seasonal/ · siteImages.ts · solutionsData.ts · storeCareScenarios.ts · storecare-page-data.ts · storeinsight-page-data.ts` = **14 자리** (articles/types.ts 포함).

| 모듈 | CODE_v1 §1.3 운명 | 정합 |
|---|---|---|
| articles/types.ts | ✓ 유지 (velite/MDX 타입) | PASS |
| briefingData.ts | ✓ PR-03 흡수 (D7) | PASS (F-04 별도) |
| cctvImages.ts | ✓ PR-04·05·07 정돈 | PASS |
| glossaryTerms.ts | ✓ PR-12 유지 | PASS |
| industryContent.ts | ✓ PR-08 이전 | PASS |
| industryList.ts | ✓ PR-08 이전 | PASS |
| mockup-scenarios/ | ✓ PR-03·04·05·09 | PASS |
| posAnalysisData.ts | ✓ PR-01 유지 | PASS |
| seasonal/ | ✓ PR-16 외부분기 (D2) | PASS |
| siteImages.ts | ✓ PR-17 정돈 | PASS |
| solutionsData.ts | ✓ PR-08 이전 | PASS |
| storeCareScenarios.ts | ✓ PR-05 외부분기 | PASS |
| storecare-page-data.ts | ✓ PR-05 축소 | PASS |
| storeinsight-page-data.ts | ✓ PR-04 풍부 | PASS |

**14 데이터 모듈 100% 매핑. PASS**

### 4.4 D 차원 요약

- src/app 22 라우트 = 100% 매핑
- src/components 17 디렉토리 (톱레벨 2 + 15 폴더) = 100% 매핑
- src/data 14 모듈 = 100% 매핑

**D 차원은 가장 정합도 높은 자리.** 단 *컴포넌트 운명* 의 *세부* 까지 (예: sections/AgentMockupShowcase.tsx 의 PR-03 흡수 시점) 는 CODE_v1 의 *디렉토리 단위* 표만 박혔고 *파일 단위* 는 아님 — Phase 4 진입 시 PR-03 안에서 검수 필요.

---

## 5. 검증 차원 E — 기존 두 계획서의 흡수

### 5.1 Upgrade_Spec_v1 — Tier A 5 + Tier B 5 + Tier C 3 흡수

| Tier 항목 | 한 줄 | 새 IA 흡수 | 정합 |
|---|---|---|---|
| A1. 다섯 질문 — 헌장 행동 강령 | 헌장의 5 행동 강령 | `/company/about` Vision 섹션 (BRAND v2 §5.6 `/company/investors` 도 포함) | **WARN — F-10**: PLAN_v1.0 §9.1 부록에 *A1 → /about Vision 섹션* 매핑됨. PLAN_v1.1 의 §3 카피 소스 표는 *Brand Brief + External Brief* 만 명시. *Upgrade_Spec A1 의 5 행동 강령* 이 본문에서 *위치 결정* 누락. |
| A2. 세 제품의 함께 서는 자리 — 통합 루프 | 3 제품의 4-step loop | `/products` 진열대 (D1 4 카드의 통합 루프) | PASS |
| A3. 자율 주행 매장 진화 곡선 L0→L5 | StoreAgent 의 자율도 사다리 | `/products/store-agent` live demo 의 자율도 사다리 (DESIGN_v2 §4 AutonomyLadder) | PASS |
| A4. 5년 좌표 / Vision 2031 | 2031 비전 | `/enterprise` + `/company/investors` (BRAND_v2 §5.6) | PASS |
| A5. MTMC Tracking / Spatial AI 깊이 | MTMC 본본문 | `/technology/spatial-ai` (BRAND_v2 §5.4) | PASS |
| B1. 세 제품 카드의 공식 마스터 카피 추가 | 3 제품 카드의 마스터 | `/products` 진열대 카드 (BRAND_v2 §5.1) | PASS |
| B2. *vs* 도발 비교 — 카테고리어 또렷이 | CCTV vs StoreInsight 도발 | `/products/store-insight` 본문 + 홈 도발 섹션 | **WARN — F-20**: PR 도발 카피 *CCTV가, 보는 것 이상을 합니다.* 는 brand-system 의 시그니처. 그러나 새 IA 표에 *도발 자리* 의 라우트가 명시 안 됨. |
| B3. 업종별 — 매장 외 공간으로 확장 | 대형 공간 신설 | `/solutions/large-space` (BRAND_v2 §5.7) | PASS |
| B4. Pre-Purchase Data 개념 추가 | Pre-Purchase Data | `/technology/seal` FAQ 강화 (BRAND_v2 §5.3) | PASS |
| B5. 본사 카드의 깊이 — Golden Case 5단계 | Golden Case 5단계 | `/enterprise` + CASE_STUDIES_v1 5건 | PASS |
| C1. 헌장 인용 — 한 페이지 링크 추가 | 헌장 인용 시 한 페이지 링크 | `/company/about` 의 *헌장 1-pager* | **WARN — F-21**: 헌장은 *외부 Notion* (local INVENTORY §3.1). 회사 사이트의 *헌장 1-pager 자리* 가 어디인지 결정 없음. |
| C2. 회사(About) 페이지 채우기 | About 본문 깊이 | `/company/about` (BRAND_v2 §6 Company Group v1 갱신) | PASS |
| C3. 시각화·다이어그램 보강 | 다이어그램 신설 | DESIGN_v2 §7 인포그래픽 5종 + ASSET_COLLECTION §2.1 | PASS |

**Upgrade_Spec_v1 흡수: 10 PASS · 3 WARN (A1·B2·C1).** Tier A·B·C 총 13 자리 중 10 정합. 3 자리 (A1 행동 강령 위치 · B2 도발 라우트 · C1 헌장 1-pager) 의 *위치 결정* 이 본문에서 명시 안 됨.

### 5.2 Transition_Plan_v0.2 — 32 한글 페이지 × 6 결정 흡수

Transition_Plan v0.2 §1.1 의 6 결정 (유지 19 · 재구성 5 · 외부분기 5 · 통합 2 · 삭제 0 · 신설 6).

| 결정 | v0.2 카운트 | 새 IA 흡수 정합 |
|---|---|---|
| **유지 19** | 19 한글 페이지 | CODE_v1 §1.1 22 라우트 매핑에 *유지* 표기 12 (PR 안 재구성) — *유지의 정의* 가 v0.2 와 v1.1 에서 다름. v0.2 *유지* = *건드리지 않음*, v1.1 *유지* = *유지·강화*. 19 페이지 중 어느 것이 *유지·강화* 또는 *재구성* 인지 표가 다름. → **WARN — F-22** |
| **재구성 5** | 5 페이지 | CODE_v1 §1.1 *재구성* 12 라우트 — v0.2 의 5 와 충돌. *재구성의 결의 격상* 으로 보임 (v0.2 보다 v1.1 이 더 큼). 추적 가능. PASS |
| **외부분기 5** | `/cases` · `/cases/[slug]` · `/storecare` · `/storeagent/sample` · `/storeagent/pricing` | 새 IA 매핑: `/cases` 누락 (F-01), `/cases/[slug]` 누락 (F-01), `/storecare` ✓ (PR-05), `/storeagent/sample` ✓ (PR-15 단 F-03), `/storeagent/pricing` ✓ (PR-10) → **3/5 정합, 2 누락**. **FAIL — F-01** |
| **통합 2** | `/cases` · `/cases/[slug]` (→ `/products/saai#cases`) | 새 IA: `/products/saai` 는 *외부분기 카드* (saai.store 입구) 로 결정. v0.2 의 *`/cases` → `/products/saai#cases` 흡수* 가 *외부분기 카드 안의 cases 섹션* 으로 해석 가능 — 그러나 D9 의 5건은 *`/resources/case-studies` 자리* 로 박힘. *v0.2 의 통합 결정과 D9 의 신설 결정의 관계* 가 *충돌* 또는 *변경* 인데 본문에서 다루지 않음. → **FAIL — F-01** (`/cases` redirect 누락) |
| **삭제 0** | 0 | 새 IA: `/untitled/untitled-2` 삭제 표기 (PLAN v1.1 §2.2 *redirects만*) → v0.2 의 *삭제 0* 과 v1.1 의 *redirects 만* 의 정합 OK | PASS |
| **신설 6** | `/products` · `/products/saai` · `/careers` · `/history` · `/press` · `/investors` | 새 IA 매핑: `/products` ✓, `/products/saai` ✓, `/careers` → `/company/career` 흡수 (이름 변경), `/history` → `/company/about` 내 섹션 (페이지 격하), `/press` → `/company/news` (이름 변경), `/investors` → `/company/investors` (prefix 추가) → *6 신설이 4 신설 + 2 흡수 섹션* 으로 재구성. **F-15 (Medium)** 참조. |

**Transition_Plan_v0.2 흡수: 3 PASS · 1 WARN · 2 FAIL.** *통합 2* (F-01) 와 *신설 6 의 재구성* (F-15) 자리에서 결함.

### 5.3 E 차원 요약

- Upgrade_Spec_v1 13 자리 = 10 PASS + 3 WARN
- Transition_Plan_v0.2 6 결정 = 3 PASS + 1 WARN + 2 FAIL (F-01, F-15)

---

## 6. 검증 차원 F — 자산 매핑

### 6.1 ASSET_COLLECTION_v1 × CASE_STUDIES_v1 × DESIGN_v2 정렬

세 문서의 *자산 자리* 가 *서로 모순 없이 정렬* 되는지.

| 자산 영역 | ASSET §1·2 | CASE §6 | DESIGN §7 | 정합 |
|---|---|---|---|---|
| 임원 사진 | §1.1 P0 (Phase 2 W2-W3) | — (case-study 5건과 무관) | §7 자리 (`/company/about`) | PASS |
| 오피스 사진 | §1.2 P1 | — | §7 자리 | PASS |
| 매체 로고 88+ | §1.3 P1 (Phase 2 W1-W2 수집) | — | §7 매체 로고 sprite | PASS |
| 파트너 로고 | §1.4 P1 | — | §7 파트너 로고 sprite | PASS |
| 인포그래픽 5종 | §2.1 P2 (Phase 3 W1-W2) | §6 5단계 다이어그램 1장 | §7 인포그래픽 5종 | PASS (단, 5종의 *주제* 가 ASSET §2.1 = *4단계 루프·MTMC·Pre-Purchase·SEAL·Golden Case* / CASE §6 = *Golden Case 5단계* / DESIGN §7 = *Anonymizer 4단계 루프·MTMC 좌표화·SEAL SDK·Spatial AI·Vision Models 카테고리 8 트리*. 5종의 *제목·내용* 이 *세 문서에서 다름*. → **F-11 (High)**) |
| 영문 OG | §2.2 P1 (Phase 4 자동 생성) | — | §7 영문 OG | PASS |
| Hero key visual | §2.3 P0 (Phase 3 W2-W3) | — | §7 Hero key visual | PASS |
| 매장 외관·내부 사진 (case 5건) | ✗ §2 의 부수 영역에 없음 | §6 *13컷* | §7 *case-study 비주얼* (간접) | **FAIL — F-05** |
| 대시보드·모바일 UI 캡처 (case 5건) | ✗ 없음 | §6 *13장* | §4 LiveDemo 등 (case 5건의 캡처 자리 명시 없음) | **FAIL — F-05** |
| KPI 그래프 (case 5건) | ✗ 없음 | §6 *10장* | §4 BeforeAfterKPI 컴포넌트 | **FAIL — F-05** |
| 인터뷰 인용 영상·사진 | ✗ 없음 | §6 *7-10명, 선택* | — | WARN |

### 6.2 자산 수집 일정의 합리적 정렬

- ASSET §3 의 단계별 일정 표 — Phase 2 시작 (D-0) → W1 발주 → W1-W2 매체·파트너 raw → W2-W3 촬영 → Phase 3 W1-W3 가공
- CODE_v1 PR-17 의 합류 지점 — Phase 3 W1-W3 가공 *후* 진행 가능 (CODE_v1 §7.3)
- BRAND_v2 §5 신설 카피 11 자리 — Phase 2 1-2주
- CASE_STUDIES_v1 §4 작업 분해 — Phase 2 1-2주 (골격) → Phase 3 (디자인 정렬) → Phase 4 (발행)

**일정 정합** — 4 문서가 *Phase 2 시작 = D-0* 로 동기. PASS.

단, *Phase 3 W3 가공 끝* 과 *Phase 4 PR-17 박음* 의 *간격* 이 무엇 (Phase 4 시작 시점) 인지 본문에 명시 없음 — 정황상 *Phase 3 끝 = Phase 4 시작* 으로 추정. → **F-23 (Medium)**.

### 6.3 F 차원 요약

- 7 자산 영역의 *영역 단위* 정렬: 모두 PASS
- 인포그래픽 5종의 *주제 단위* 정렬: **F-11 — 5종의 제목·내용이 세 문서에서 다름**
- case-study 5건의 *자산 트랙* (사진 13컷 · UI 13장 · KPI 10장): **F-05 — ASSET §2 부수 영역에 별도 라인 없음**
- 일정 정합: PASS (단, F-23 Phase 3→4 간격 명시 부재)

---

## 7. 검증 차원 G — 신설 카피·콘텐츠

### 7.1 BRAND_v2 §5 의 신설 카피 11 자리 × CODE_v1 의 PR 매핑

BRAND_v2 §5 가 식별한 11 자리의 *작성 일정* 과 CODE_v1 의 *PR 안에서 박을 시점* 의 정합.

| BRAND §5 자리 | 작성 시점 (BRAND §7) | CODE_v1 의 PR 박을 시점 | 정합 |
|---|---|---|---|
| 5.1 `/products` 진열대 4 카드 | Phase 2 W1 | PR-02 (라인 300-500) | PASS |
| 5.2 `/products/saai` 본문 | Phase 2 W2 | PR-06 (100-200) | PASS |
| 5.3 `/technology/seal` FAQ | Phase 2 W1 | PR-07 (500-800) | PASS |
| 5.4 `/technology/spatial-ai` 본문 | Phase 2 W2 | PR-07 | PASS |
| 5.5 `/technology/models` 카탈로그 | Phase 2 W2 | PR-07 | PASS |
| 5.6 `/company/investors` | Phase 2 W2 | PR-11 (500-800) | PASS |
| 5.7 `/solutions/large-space` | Phase 2 W2 | PR-08 (400-600) | PASS |
| 5.8 en 마스터 카피 풀 | Phase 2 W2 + Phase 3 | PR-00 + 모든 PR (다국어 분기) | PASS (단, 분량 추정 *60 cell* vs *150 cell* 표기가 §5.8 안에서 *영어 풀 자체 60* 과 *30 라우트 × 5 위치 150* 의 두 자리 — *분량 표기 불일치*. → **F-24 (Low)**) |
| 5.9 jp 부족분 | Phase 3 | (CODE_v1 에 jp 별도 트랙 미명시) | **WARN — F-12 (High)**: jp 라이브 8 누락의 *복구* 와 *새 30 라우트의 jp 발행* 의 분리가 명시 안 됨. CODE_v1 §11 Q4 *src/data JSON 다국어 분기* 는 *방법* 만 다루고 *jp 책임* 자리는 누락. |
| 5.10 case-studies 5건 골격 (별도) | Phase 2 안 (CASE_STUDIES_v1) | PR-13 (200-400) | PASS |
| 5.11 `/contact` 영문 본문 | Phase 2 W2 | PR-14 (200-300) | PASS |

**11 자리 PR 매핑: 10 PASS + 1 WARN (jp).**

### 7.2 CASE_STUDIES_v1 5건의 PR-13 발행 정합

- CASE_STUDIES_v1 §4 Phase 4 진입 시 — 발행 5 건 + 인덱스 1 = 6 라우트
- CODE_v1 PR-13 = 5건 발행 200-400 라인. 인덱스 페이지의 카드 그리드는 PR-12 의 `/resources/case-studies` 폴더 만들기에 흡수.
- **5건 발행 시점의 의존** — CODE_v1 §1.1 PR-13 의 *의존* 은 *PR-12*. CASE §0 의 *Phase 4* 정합. PASS.

단, CASE §4 의 *(가상·차후 확정)* 자리 — Phase 4 발행 시 *실측 데이터* 로 교체. 실측 데이터의 *조달 책임* 이 어디서 (영업 협업? 본사 측 협의?) 본문에 명시 약함. → **F-25 (Low)**.

### 7.3 velite MDX 풀의 새 분류 (4 카테고리) × D2 정합

CODE_v1 §5.1 의 새 카테고리 4종 — `insight · tip · guide · case-study`.

- *현* velite 풀 6 종 (`insight 73 · tip 53 · guide 19 · season 25 · weekly 26 · case-study 0`) → *새* 4 종 (`insight 73 · guide 19 · case-study 5 신설 + (saai 이관 154)`).
- **tip·season·weekly 154 글의 외부 이관** — D2 정합. PASS.
- 그러나 새 velite enum `['guide', 'case-study', 'insight']` 에서 *weekly* 가 *빠짐* — 그러나 §5.1 의 *현 카테고리* 표에서 *weekly* 글 26편이 *(이관)* 으로 분류, 외부로 나감. PASS.

**F-26 (Low)** — *현 카테고리 6 → 새 4* 의 *전환 시점* 이 PR-16 (velite) 이지만, *현 풀의 196 글 중 어느 것을 어디로 옮길지* 의 *실 매핑 표* 가 부재. PR-16 안에서 *category=weekly 인 26 글의 frontmatter 일괄 변환 스크립트* 책임 미명시.

### 7.4 D2 (saai.store 외부유지) 와 새 카테고리 정합

- `/resources/blog` = *insight 73 + guide 19 = 92 글* + *DS 라이브 19 글의 마이그레이션* (F-16) = 약 100+ 글의 회사 블로그 풀.
- *D2 정합* — saai.store 18 archive 흡수 X. PASS.

### 7.5 G 차원 요약

- BRAND_v2 §5 11 자리 PR 매핑: 10 PASS + 1 WARN (jp · F-12)
- CASE_STUDIES_v1 5건 발행 정합: PASS (단, F-05 자산 부족 · F-25 실측 데이터 책임 약함)
- velite 새 분류 정합: PASS (단, F-26 196 글의 실 매핑 표 부재)
- D2 정합: PASS

---

## 8. 결함 목록 (우선순위 순)

| # | 결함 | 차원 | 임팩트 | 권고 액션 | 결재 필요 |
|---|---|---|---|---|---|
| F-01 | `/cases` + `/cases/[slug]` 의 redirects 누락 (Transition_Plan v0.2 §1.2 의 *통합* 결정이 PLAN v1.1 §2.3 · CODE v1 §4.1 의 redirects 표에 0번 등장) | E·C | **Critical** | PLAN v1.1 §2.3 + CODE v1 §4.1 에 `/cases` → `/products/saai` (또는 `/resources/case-studies`) 301 redirect 추가. D9 의 5건 신설과 *흡수 자리* 관계 명시. | Jamin (1 줄) |
| F-02 | `/search` · `/access-denied` 의 구현 결정 누락 (PLAN v1.0 §4.2 *Search 신설(코드)* 결정이 v1.1 에서 유실) | A·C | **Critical** | PLAN v1.1 §4.1 P0 에 *Search 신설(코드)* 행 복원. CODE v1 §1.1 에 `(신설) /search`·`(시스템) /access-denied` 라우트 추가. | Jamin |
| F-08 | `app.deepingsource.io` 신설 트랙의 시점·발주 책임 부재 (D5 결정은 명확하나 *언제·누가* 신설하는지 어디에도 없음) | A | **Critical** | PLAN v1.1 §7 Phase 5 또는 Phase 6 에 `app.deepingsource.io` 트랙 추가. PR-15 redirects 가 *외부 URL* 을 가리키는 시점에 *외부 URL이 실재* 해야 함. | Jamin (트랙 매니저 결정) |
| F-03 | `/storeagent/sample` destination 모순 (PLAN v1.1 §2.3 → app.ds.io / PLAN v1.0 §4.4 → saai.store) | A | **High** | 한 자리로 통일. v1.1 권고 (app.ds.io) 로 굳히면 *sample = 체험계정* 의 의미 명시. saai.store 권고 시 sample = b2c 콘텐츠 자리 표기. | Jamin |
| F-04 | briefingData 의 *live demo* vs *sample* 의 *동시 두 자리* 모호 (PR-03 흡수 + PR-15 sample redirect 가 같은 briefingData 의 두 운명) | A | **High** | CODE v1 §6 에 *briefingData 의 sample-side* 의 운명 명시. *흡수 + sample 외부 redirect* 의 *데이터 두 자리 분리* 또는 *sample 도 흡수 (내부 데모)* 의 한 자리. | (없음 — 기술 결정) |
| F-05 | case-study 5건 자산 (사진 13컷·UI 13장·KPI 10장) 의 ASSET_COLLECTION 별도 라인 부재 | F | **High** | ASSET_COLLECTION §2.4 *case-study 트랙* 신설. Phase 3 W2-W3 안의 *case-study 자산 가공* 트랙 추가. PR-13 의존 명시. | Jamin |
| F-06 | Webflow 의 catchsecu 외부 개인정보 처리방침 (라이브 DS 의 `/privacy` 가 외부 링크 `https://app.catchsecu.com/document/P/0f90059276203b8`) 의 새 사이트 처리 결정 부재 | C | **High** | PLAN v1.1 §2.3 또는 CODE v1 PR-14 안에 *catchsecu 외부 유지 vs 새 `/legal/privacy` 흡수* 결정. CODE v1 §8.1 체크리스트에 *Webflow 의 catchsecu 외부 개인정보 처리방침* 항목이 있어 *문제 인식은 됨* — 그러나 *결정* 은 결재 보류 상태. | Jamin |
| F-07 | 라이브 DS *jp 8 페이지 누락* 의 *복구 책임* 부재 (BRAND v2 §5.9 가 *Phase 3 후순위* 로 표기만, *누가·언제* 8 페이지 jp 카피 작성하는지 부재) | A | **High** | BRAND v2 §5.9 또는 CODE v1 §11 Q4 에 *jp 8 누락 페이지의 *각 라우트* + *번역 책임자** 표 추가. | Jamin (또는 KDDI 파트너 협조) |
| F-09 | 88+ 매체 외부 링크의 *링크 dest + 헤드라인 + 일자* 콘텐츠 마이그레이션 표 부재 (ASSET §1.3 은 *로고 raw* 만 다룸) | C | **High** | ASSET §1.3 에 *매체별 헤드라인·일자·외부 URL* 의 *raw 추출 표* 추가. CODE v1 PR-11 의 `/company/news` 안에서 *카드 데이터* 의 소스 명시. | (없음) |
| F-10 | Upgrade_Spec A1 (다섯 질문 — 헌장 행동 강령) 의 새 IA 위치 결정 누락 | E | **High** | BRAND v2 §3.1 의 `/company/about` 또는 `/company/investors` 행에 *A1 5 행동 강령 자리* 추가. | (없음) |
| F-11 | 인포그래픽 5종의 *주제* 가 ASSET §2.1 vs CASE §6 vs DESIGN §7 에서 *모두 다름* (3 종 부분 일치 · 2 종 불일치) | F | **High** | 5종의 *제목·내용* 을 한 자리에서 결정. ASSET·CASE·DESIGN 의 세 문서 모두 한 표 인용. | (없음) |
| F-12 | jp 라우트 책임 자리 부재 (CODE v1 §11 Q4 는 *방법* 만, *jp 30 라우트 각각의 발행 책임자* 부재) | G | **High** | CODE v1 §11 Q4 또는 §3 에 *jp 발행 시점 = Phase 5 후반* 명시 + *jp 카피 책임* 표. | Jamin |
| F-13 | BRAND v2 §3.1 의 30 라우트 표에 `/resources/docs` 행 누락 | B | **Medium** | BRAND v2 §3.1 표에 `/resources/docs` 1행 추가 (카피 없음, 시그니처만 표기). | (없음) |
| F-14 | 30 vs 32 라우트 카운트 표기 불일치 (PLAN v1.1 = 30 / DESIGN v2 = 31 / CODE v1 = 32) | B | **Medium** | 모든 문서에서 *32 라우트* 통일. 30 은 *톱-레벨 6 + 페이지 24* 의 표현이지 *실 라우트 카운트* 가 아님. | (없음) |
| F-15 | Transition_Plan v0.2 의 *신설 6 페이지* (`/products` · `/products/saai` · `/careers` · `/history` · `/press` · `/investors`) 가 새 IA 에서 *3 신설 + 3 흡수 섹션* 으로 *재구성* 됨. 재구성 근거 본문 명시 부재 | E·B | **Medium** | PLAN v1.1 §9.2 에 *Transition_Plan 의 신설 6 → 새 IA 의 재구성* 의 *3 흡수 (history → about 섹션, careers → company/career, press → company/news)* 매핑 추가. | (없음) |
| F-16 | DS 라이브의 19 블로그 글 본문의 *마이그레이션 책임* 부재 (CODE v1 §5 는 *velite 풀 196 글* 만 다루고 DS 19 외부 글 누락) | C | **Medium** | CODE v1 §5 또는 §10 에 *DS 19 글의 Webflow → MDX 변환 트랙* 추가. PR-12 의존. | (없음) |
| F-17 | `/untitled/untitled-2` 의 redirects 처리 미명시 (PLAN v1.1 §1.4 에 *삭제* 표기 / §2.3 에 *(redirects만)* 표기, dest 불명) | C | **Medium** | CODE v1 §4.1 에 `/untitled/untitled-2` → `/` (또는 `/404`) 의 결정 명시. | (없음) |
| F-18 | pi-manual 10 slug 의 *영문 의미 slug* 새 이름의 결정 표 부재 (`heatmap-by-time-analysis` · `seoljeong-kategori-teseuteu` 등의 *새 이름* 미정) | C | **Medium** | CODE v1 §1.3 또는 §4.1 에 *10 slug 의 영문 의미 slug* 새 이름 표 추가. | (없음) |
| F-19 | saai.store 외부 이관 154 글의 *큐레이션·발행 일정* 이 본 워크스페이스 책임 밖이라는 표시 부재 (D2 결정의 *외부유지* 가 *책임 외* 로 해석될 위험) | A | **Medium** | PLAN v1.1 §4.4 의 *외부유지* 표에 *외부 책임자 (saai.store 운영팀)* 명시. | (없음) |
| F-20 | PR 도발 카피 *CCTV가, 보는 것 이상을 합니다.* 의 라우트 자리 미명시 (Upgrade_Spec B2 의 도발이 새 IA 의 어느 라우트인지 부재) | E | **Medium** | BRAND v2 §3.1 또는 §5 에 *도발 카피 자리 = `/products/store-insight` Hero* 명시. | (없음) |
| F-21 | Upgrade_Spec C1 의 *헌장 1-pager* 자리 결정 부재 (헌장은 외부 Notion — 회사 사이트의 헌장 자리 부재) | E | **Medium** | BRAND v2 §6 에 *헌장 1-pager 자리 = `/company/about` 또는 `/company/investors`* 결정. 또는 *외부 Notion 링크만* 유지. | (없음) |
| F-22 | Transition_Plan v0.2 의 *유지 19* 의 *유지 정의* 와 PLAN v1.1 의 *유지·강화* 의 *재구성 정의* 가 다름 (v0.2 *유지* = *건드리지 않음* / v1.1 *재구성* = *카피·디자인 갈아끼움*) | E | **Medium** | PLAN v1.1 §9.2 에 *유지의 정의 변경* 명시. 19 페이지 중 *어느 것이 정말로 건드리지 않는지* 의 짧은 표 추가. | (없음) |
| F-23 | Phase 3 W3 가공 끝 → Phase 4 PR-17 박음의 *간격* 명시 부재 | F | **Medium** | PLAN v1.1 §7 또는 ASSET §3 에 *Phase 3 종료 = Phase 4 시작* 정합 명시. 또는 *Phase 4 시작 시점* 자체 명시. | (없음) |
| F-24 | BRAND v2 §5.8 en 마스터 카피 풀의 분량 표기 불일치 (*150 cell* vs *60 cell* 두 자리) | G | **Low** | BRAND v2 §5.8 분량 표기 통일. *Tier 1 페이지 우선 = 60 cell* 등. | (없음) |
| F-25 | CASE_STUDIES_v1 *(가상·차후 확정)* 의 *실측 데이터 조달 책임* 약함 (Phase 4 발행 직전의 *영업·도입 협의* 자리) | G | **Low** | CASE §4 Phase 4 트랙에 *실측 데이터 협의 책임자* 명시. | (없음) |
| F-26 | velite 196 글의 *현 풀 → 새 카테고리 4* 의 *실 매핑 표* 부재 (PR-16 안의 *category 변환 스크립트* 책임 미명시) | G | **Low** | CODE v1 §10 데이터 마이그레이션 sub-track 에 *196 글의 frontmatter 변환 표* 추가. | (없음) |
| F-27 | DESIGN v2 §4 표의 30 라우트 (`/resources/glossary` + `/resources/faq` 한 행) vs CODE v1 §1.1 의 32 라우트 (분리) 의 카운트 표기 불일치 (F-14 의 부속) | B | **Low** | DESIGN v2 §4 표 분리 정정. | (없음) |
| F-28 | velite enum 의 `weekly` 제거 (CODE v1 §5.2 의 새 schema 가 `['guide','case-study','insight']` 3 종) 와 §5.1 의 *4 카테고리* (`insight · tip · guide · case-study`) 의 카운트 불일치 (tip 도 빠짐) | G | **Low** | CODE v1 §5.1 4 카테고리 표 또는 §5.2 schema 3 종 통일. | (없음) |
| F-29 | DS pi-docs 푸터 `©2018-2025` 의 새 사이트 통일 룰 (PLAN v1.0 §1.4 의 *연도 통일* 룰이 v1.1 의 §1.4 에서 *유지* 되었으나, CODE v1 안에서 *어느 PR 의 책임* 인지 미명시) | C | **Low** | CODE v1 §9 회귀 체크리스트에 *연도 통일 (©2018-{현재년})* 항목 추가. | (없음) |

**결함 카운트 — Critical 3 (F-01·F-02·F-08) · High 9 (F-03·F-04·F-05·F-06·F-07·F-09·F-10·F-11·F-12) · Medium 11 · Low 6 = 총 29.**

---

## 9. 권고 — 차기 액션

### 9.1 결함 해결 우선순위

**Sprint 1 (Phase 5 진입 *전 결재 1주*)** — Critical 3 + High 4
1. F-01 `/cases` redirect 추가 (PLAN v1.1 §2.3 + CODE v1 §4.1)
2. F-02 `/search` 신설(코드) 결정 복원
3. F-08 `app.deepingsource.io` 트랙 신설 — 시점·발주자 결재
4. F-05 ASSET_COLLECTION §2.4 case-study 트랙 신설
5. F-06 catchsecu 처리 결재
6. F-03 sample destination 통일
7. F-07 jp 8 누락 페이지의 책임자 결정

**Sprint 2 (Phase 4 안에서)** — High 5 + Medium 5
8. F-04 briefingData 의 live demo vs sample 데이터 분리 결정
9. F-09 88+ 매체 콘텐츠 마이그레이션 표 작성
10. F-10 Upgrade_Spec A1 위치 결정
11. F-11 인포그래픽 5종 *주제 통일*
12. F-12 jp 30 라우트 책임 표
13. F-13·F-14·F-15·F-16·F-17·F-18 라우트·콘텐츠 표 정합

**Sprint 3 (Phase 5 안에서)** — Medium 6 + Low 6
14. F-19 ~ F-29 작은 정합 자리

### 9.2 v1.2 갱신 필요 항목

PLAN v1.2 갱신 시 다음 6 자리 박음:
1. §0.3 D11 추가 — `/cases` 의 `/products/saai#cases` 흡수 + `/resources/case-studies` 신설의 *관계* 명시
2. §2.1 IA 표에 `/search` (P0 신설) · `/access-denied` (시스템) 행 추가
3. §2.3 redirects 표에 `/cases` · `/cases/:slug` · `/untitled/untitled-2` 행 추가
4. §7 Phase 5 또는 Phase 6 에 `app.deepingsource.io` 신설 트랙 1 줄 + 책임자 명시
5. §9.2 부록에 Transition_Plan v0.2 의 *신설 6 → 새 IA의 재구성* 매핑 1 줄
6. §4.2 P1 *Search* 결정 행 복원 (v1.0 → v1.1 전환 시 유실)

### 9.3 Phase 5 진입 전 결재 사항

| # | 결재 자리 | 의사결정자 |
|---|---|---|
| 1 | F-01 `/cases` 흡수 자리 (`/products/saai#cases` vs `/resources/case-studies`) | Jamin |
| 2 | F-02 새 `/search` 의 *구현 방식* (velite 인덱스 vs 외부 검색) | Jamin (기술) |
| 3 | F-03 sample destination (app.ds.io vs saai.store) | Jamin |
| 4 | F-05 case-study 5건 자산 13컷 + 13장 + 10장의 *Phase 3 가공 시점* | Jamin |
| 5 | F-06 catchsecu 외부 유지 vs 새 `/legal/privacy` 흡수 | Jamin (법무) |
| 6 | F-07 jp 8 누락의 *번역 책임자* | Jamin (또는 KDDI) |
| 7 | F-08 `app.deepingsource.io` *시점 + 발주자 + 트랙 매니저* | Jamin (PM) |
| 8 | F-12 jp 30 라우트 *Phase 5 후반 발행 책임자* | Jamin |
| 9 | F-10 Upgrade_Spec A1 5 행동 강령 자리 | Jamin (브랜드) |
| 10 | F-11 인포그래픽 5종의 *주제 통일* | Jamin (디자인) |

총 *결재 10건* — Phase 5 진입 *전 1주* 의 결재 sprint.

---

## 10. PASS 인정 — 정합성 잘 잡힌 자리들 (후속 작업에서 *건드리지 말 것*)

검증 결과 *결함 없음* 으로 인정된 5 자리. 후속 v1.2 갱신 시 *건드리지 말아야 할 자리*.

1. **D 차원 (코드베이스 흡수) 의 *디렉토리 단위* 매핑** — src/app 22 + components 17 + data 14 = 53 자리가 *100% 정합*. CODE_v1 §1.1·1.2·1.3 의 매핑 표는 *완성도 가장 높은 자리*. 후속 작업은 *파일 단위* 의 검수만 PR 안에서 추가.

2. **B 차원의 32 라우트 매핑 (BRAND_v2 §3.1 · DESIGN_v2 §4 · CODE_v1 §1.1)** — 32 라우트 중 31 라우트 정합 (F-13 의 1 자리만 누락). 4 문서가 *라우트 이름·slug·prefix* 의 *명명 일관성* 을 잘 유지. 후속 작업은 *F-13 (1 행 추가) + F-14 (카운트 통일)* 만.

3. **D4 결정 (storecare/storeinsight → /products/* 흡수) 의 전 자리 정합** — D4 의 *SI 풍부 / SC 외부분기 카드* 결정이 BRAND v2 §6 (StoreCare_v1 축소 / Store_Insight 풍부) · DESIGN v2 §4 (외부분기 카드 컴포넌트 + KPIChartCard) · CODE v1 PR-04·PR-05 (라인 분리) 의 *세 문서에서 완전 정합*. PASS.

4. **D8 Webflow 즉시 교체 (PR-18) 의 체크리스트 14 항목** — CODE v1 §8.1 의 체크리스트가 *완전한 자리*. SEO 인덱스 변동 (Q2) · DNS TTL · 404 모니터링 · catchsecu (F-06 별도) 까지 *Phase 5 진입 직전 점검 자리* 가 잘 잡힘.

5. **CASE_STUDIES_v1 5건의 *큐레이션 원칙 5종* (3 청자 · 4 도메인 · 4 제품 · Golden Case 5단계 · 산업 4개)** — *5 원칙이 동시에 성립* 하는 큐레이션 정합. 5건이 *우연한 선택* 이 아니라 *최소 비용으로 메우는 매트릭스* 라는 결정 근거가 본문에서 명시. 후속 작업에서 *5건을 다른 케이스로 바꾸지 말 것*.

---

## 11. 변경 이력

| 버전 | 일자 | 변경 |
|---|---|---|
| v1.0 | 2026-05-29 | 최초 발행 — 7 산출물 × 4 인벤토리 × 코드 × 2 기존 계획서의 교차검증. 7 차원 검증 (A·B·C·D·E·F·G) · 결함 29종 식별 (Critical 3 + High 9 + Medium 11 + Low 6) · 핵심 결함 5종 · 권고 액션 3 Sprint · 결재 10건 · PASS 인정 5 자리. |

— *끝.*
