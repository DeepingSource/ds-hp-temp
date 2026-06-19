> 📌 **읽기 전 — 이 문서의 자리 (2026-06-19 정리)**
> 본 문서는 **2026-05-29 시점의 브랜드 계획서**이며, 이후 사이트는 **NEXTRISE 브랜딩(현 보이스: "REINVENT OFFLINE")으로 피벗**했다. 라이브 보이스 SOT 는 **`src/lib/brand-canon.ts`** 다 — 카피/보이스를 보려면 본 문서가 아니라 그쪽을 본다.
> 또한 상속 source 로 인용하는 **`brand-system/`(약 41 문서) 는 본 repo 에 없고 상위 SAAI repo** 에 있으며, 자매 문서 DESIGN_v2 가 제안한 **`ui_kits/corporate/` 도 끝내 만들어지지 않았다**(corporate 모드는 `src/` 에 바로 출하됨).

# 브랜드 시스템 v2 — 회사 사이트 모드의 재정렬

> **버전** v2.0 · **작성** 2026-05-29 · **상위 SOT** [PLAN_v1.1.md](./PLAN_v1.1.md) §0.3 (D1–D10) · §2.1 IA · **상속** `brand-system/` 41 문서 (v1)
> 본 v2는 41 문서 위에 *새 deepingsource.io 회사 사이트 모드* 의 매핑 layer를 얹는다. v1의 결정은 모두 SOT로 유지된다.

---

## 1. 개요

### 1.1 v2 의 목적

`brand-system/` 41 문서는 *움직이지 않는 한 줄들* 과 *세 제품 보이스* 와 *11 페이지 카피 spec* 까지 — SAAI 우산의 거의 모든 발화를 한 곳에 박은 두꺼운 풀이다. 그러나 이 풀은 *uber-우산 모드* 로 깎여 있어, 곧 *deepingsource.io 회사 사이트 모드* 로 변환될 이 워크스페이스의 *지금 손에 쥐어야 할 한 페이지* 가 어디인지는 명확하지 않다.

v2 는 41 문서를 *다시 쓰지 않는다*. 대신 — (a) Phase 2 의 첫 한 시간·1주차·2주차·Phase 4 단계로 *읽을 순서 5 Tier* 로 재정렬하고, (b) PLAN v1.1 §2.1 의 30 라우트에 대해 두 마스터 카피의 *사용처를 한 표로 박고*, (c) Company × Products × Technologies × Vision Models *4-레이어 보이스 차별화 룰* 을 명문화하고, (d) D1–D10 결정으로 신설된 자리에서 *지금 41 문서에 카피가 없는 자리* 를 식별한다.

### 1.2 v1 과 v2 의 관계

| 자리 | v1 (41 문서) | v2 (본 문서) |
|---|---|---|
| **범위** | SAAI 우산 전체 (헌장·3 제품·페이지·세일즈·박람회) | *회사 사이트 모드* 만 (deepingsource.io + 두 외부분기) |
| **SOT** | *움직이지 않는 한 줄들* 의 단일 진리 | v1 위에 얹는 *매핑 layer* — 우선순위·라우트·신설 식별 |
| **갱신 주기** | 분기 (Brand Council) | Phase 2 안에서 1회 (Phase 3 입력) |
| **충돌 시** | v1 이긴다 | v2 는 v1 을 *해석* 만 한다 |

본 v2 가 *움직이지 않는 한 줄들* 을 새로 쓰는 일은 없다. 시그니처 5글자 *사이를 메웁니다.*, 두 마스터 카피, 4-step Weaving — 모두 v1 의 그대로.

### 1.3 본 v2 가 다루는 것 / 다루지 않는 것

**다룬다.**
- 41 문서의 *회사 사이트 우선순위* 재정렬 (§2)
- 두 마스터 카피의 *30 라우트별 사용처* 매핑 (§3)
- *Company · Products · Technologies · Vision Models* 4-레이어 보이스 차별화 룰 (§4)
- D1–D10 으로 신설된 자리의 *카피 부재 식별* (§5)
- 41 문서 중 *v1.1 IA 와 불일치하는 자리* 의 갱신 룰 (§6)
- Phase 2 의 *작업 순서* (§7)

**다루지 않는다.**
- 디자인 토큰·색·타이포·차트 — Phase 3 의 `DESIGN_v2.md`
- 코드·라우트 매핑 — Phase 4 의 `CODE_v1.md`
- case-study 5 건 골격 — Phase 2 의 `CASE_STUDIES_v1.md` (별도)
- 임원·오피스·매체 로고 자산 수집 — Phase 2 병렬의 `ASSET_COLLECTION_v1.md` (별도)
- 외부 도메인 (storecare.ai · saai.store · app.deepingsource.io) 의 본문 카피 — 외부분기 카드만 본 v2 가 다룬다

---

## 2. 41 문서의 회사 사이트 우선순위 재정렬

기존 6 분류(a 헌장·전략 / b 보이스 / c 페이지 카피 / d 마스터·메시징 / e 세일즈·마케팅 / f 미팅·세션)는 그대로 두되, *새 사이트 빌드 진입 순서* 로 5 Tier 에 다시 묶는다. 6 분류는 *문서의 결*, 5 Tier 는 *손에 쥐는 순서*.

### 2.1 Tier 0 — 첫 한 시간에 손에 쥐어야 할 5종 (척추)

마스터 카피·우산 정체성·3 제품 voice 변주의 모든 결정이 이 5 문서 안에 박혀 있다. Phase 2 시작 첫 한 시간에 정독.

| 파일 | 6분류 | 새 홈에서의 자리 | 참조 우선순위 |
|---|---|---|---|
| SAAI_Brand_Architecture_v3.md | a | 모든 페이지 IA·우산·Family 구조의 척추 | *항상 옆에 둔다* |
| SAAI_Brand_Voice_Guidelines_v2.md | b | 모든 카피 작성·검토의 SOT — 12축 매트릭스 | *항상 옆에 둔다* |
| SAAI_Master_Copy_Decision_v1.md | d | 본 v2 §3 의 마스터 카피 사용처 표의 SOT | *항상 옆에 둔다* |
| SAAI_Brand_Copy_Master_v2.md | d | Hero·Footer·CTA 풀 + 4-step Weaving | Hero·CTA 작성 시 |
| SAAI_Brand_Brief_v1.md + SAAI_External_Brand_Brief_v1.md | a | `/company/about` 본문의 원문 | About 페이지 작성 시 |

### 2.2 Tier 1 — 1주차에 다 읽어야 할 8종 (보이스 + 핵심 페이지 5)

보이스 3 제품 + 회사 사이트 핵심 그룹 페이지 5종. Tier 0 이 *변하지 않는 자리* 라면, Tier 1 은 *지금 박아야 할 자리*.

| 파일 | 6분류 | 새 홈에서의 자리 | 신설·갱신 |
|---|---|---|---|
| SAAI_Brand_Voice_Store_Insight_v1.md | b | `/products/store-insight` voice SOT | 갱신 (라우트명 정합) |
| SAAI_Brand_Voice_StoreCare_v1.md | b | `/products/store-care` 외부분기 카드 + storecare.ai 톤 정합 | 갱신 (회사 사이트의 카드 voice 신설) |
| SAAI_Brand_Voice_StoreAgent_v1.md | b | `/products/store-agent` voice SOT | 갱신 (단일 페이지 통합 후 live demo) |
| SAAI_Page_Company_Group_v1.md | c | `/company/{about,news,career,partnership,investors}` 5 페이지 | 갱신 (라우트 prefix 통일, `/investors` 신설) |
| SAAI_Page_Tech_Group_v1.md | c | `/technology/{anonymizer,seal,spatial-ai,models}` 4 페이지 | 대폭 갱신 (D6 — Vision Models 카탈로그 분리) |
| SAAI_Page_Solutions_Group_v1.md | c | `/solutions/{retail,food-beverage,drug,large-space}` 4 + `/enterprise` | 갱신 (`/large-space` 신설) |
| SAAI_Page_Pricing_v1.md | c | `/pricing` + `/pricing/simulator` | 거의 그대로 |
| SAAI_Product_Pages_Index_v1.md | c | `/products` 진열대 4 카드 IA 척추 | 대폭 갱신 (D1 — 3 카드 → 4 카드) |

### 2.3 Tier 2 — 2주차에 정렬해야 할 12종 (개별 제품 + 마스터·메시징)

3 개별 제품 페이지 spec + 마스터·메시징 9종. 카피 일괄 검수·재활용 단계.

| 파일 | 6분류 | 새 홈에서의 자리 | 신설·갱신 |
|---|---|---|---|
| SAAI_Page_Store_Insight_v1.md | c | `/products/store-insight` 본문 직결 (D4: 풍부 페이지) | 갱신 (라우트 prefix) |
| SAAI_Page_StoreCare_v1.md | c | `/products/store-care` *카드 페이지로 축소* + storecare.ai 본문 보존 | **재구성** (D4: 카드만) |
| SAAI_Page_StoreAgent_v1.md | c | `/products/store-agent` 본문 + 인라인 how-it-works·pricing 섹션 (D3) | 갱신 (5 서브 → 단일 페이지 인라인 흡수) |
| SAAI_Brand_Messaging_Strategy_v1.md | d | Promise Hierarchy × 메시징 매트릭스 — 광고·캠페인 layer 정렬 | 그대로 |
| SAAI_Brand_Naming_Ideation_v6.md | d | 제품·기능 네이밍 SOT (META 4 정식 명명) | 그대로 |
| SAAI_Copy_Ideation_v3.md | d | 카피 보강 시 참조 풀 | 그대로 (참조용) |
| SAAI_Copy_Inventory_Compiled.md | d | 11 소스 카피 통합 카탈로그 — 카피 일괄 검색 인덱스 | 그대로 |
| SAAI_Copy_Inventory_Solutions_Sources_v1.md | d | 솔루션 페이지 자료 풀 | 그대로 |
| SAAI_Page_Reference_Group_v1.md | c | `/resources/{glossary,faq}` + `/legal/{privacy,terms}` | 그대로 |
| SAAI_Website_Product_Pages_Copy_Spec_v1.md | c | 3 제품 통합본 — 카피 일괄 검수 reference | 그대로 (reference) |
| SAAI_Website_Upgrade_Spec_v1.md | c | 현 사이트 13 섹션 → 한 세트 깊이 보강 spec | **부분 폐기** (회사 사이트 IA 와 결이 다른 부분 archive) |
| SAAI_Brand_Book_Image_Assets_v1.md + Key_Visual_v1.md | d | Hero·이미지 자산 매핑 reference | 그대로 |

### 2.4 Tier 3 — Phase 4 빌드 단계에서 참조할 11종 (외부 자료·세일즈·박람회·시안)

회사 사이트 본문이 아닌 *외부 leave-behind 자료 + 영업·박람회·캠페인 자산*. Phase 4 의 `/enterprise` 코드화 단계에서 참조.

| 파일 | 6분류 | 새 홈에서의 자리 |
|---|---|---|
| SAAI_HQ_Sales_Deck_v1.md / .pptx | e | `/enterprise` 카피 + 영업팀 leave-behind |
| DS_SAAI_brand_deck.pdf | e | 영업·투자자 leave-behind (`/company/investors` 다운로드) |
| SAAI_Ad_Concept_Book_v1.md | e | 광고·콘텐츠 마케팅 launch pool (회사 사이트 본문에는 안 들어감) |
| SAAI_Owner_Campaign_Variations_v1.md | e | B2C 캠페인 풀 (saai.store 측 자산) |
| SAAI_Booth_Kit_Franchise_v1.md | e | 박람회·이벤트 자산 |
| SAAI_Brand_Book_v1.html + v2.html + OnePage_v4.html | d | 외부 공유용 1-pager — `/company/investors` 다운로드 후보 |
| SAAI_Brand_Architecture_v3.html | a | 외부 공유용 Composition Map — `/company/about` 임베드 후보 |

### 2.5 Tier 4 — archive (그대로 보존)

| 파일 | 6분류 | 처리 |
|---|---|---|
| README.md (brand-system 자체 README) | a | archive 유지 (v1 시점 22 페이지 spec 매핑) |
| SAAI_Design_Meeting_Pre_Read_2026-05-27.md | f | 디자인 결정 이력 — archive |
| SAAI_Brand_Ideation_Session_2026-05-28.md | f | Brand Map v4 입력 — archive |
| SAAI_Sync_PLAN_2026-05-28.md | f | 일정·결정 기록 — archive |

### 2.6 Tier 배분 요약

| Tier | 문서 수 | 시점 | 결 |
|---|---|---|---|
| Tier 0 | 5 (+1 외부 Brief) | Phase 2 첫 한 시간 | *척추* |
| Tier 1 | 8 | Phase 2 1주차 | *그룹 페이지 정렬* |
| Tier 2 | 12 | Phase 2 2주차 | *개별 페이지 + 마스터 검수* |
| Tier 3 | 11 | Phase 4 빌드 | *외부 자료·캠페인 풀* |
| Tier 4 | 4 | archive | *이력 보존* |

총 **40종** (외부 Brief 별도 카운트 시 41). v2 가 박은 5 Tier 는 *6 분류와 직교* — 분류는 결로 묶고, Tier 는 손에 쥐는 시점으로 묶는다.

---

## 3. 두 마스터 카피의 사용처 매핑 — 30 라우트 단일 표

PLAN v1.1 §2.1 의 IA 30 라우트에 대해, 두 마스터 카피(본사 *모든 매장을 한 매장처럼.* / 점주 *우리 매장이 대표 매장처럼.*) 의 사용처를 한 자리에 박는다.

핵심 룰은 다음과 같다.
- **회사 사이트 메인 헤로 (`/`)** — 본사 마스터가 *주축*, 점주 마스터는 *보조* (둘이 같은 면에 묶이지 않도록 stack 분리)
- **`/products/store-care` 외부분기 카드** — 점주 마스터가 *주축* (storecare.ai 입구)
- **`/products/store-insight` · `/products/store-agent`** — 본사 마스터의 *변주* (예: *처럼* 결의 인용 — *한 매장처럼 짚어드립니다*, *모든 매장을 같은 호흡으로*)
- **`/enterprise`** — 본사 마스터 *정면*
- **`/company/about`** — 두 마스터를 *대칭 거울로 동시 노출* (회사의 자기소개 자리)

### 3.1 라우트별 마스터 카피 사용처 (PLAN v1.1 §2.1 의 30 라우트)

| 라우트 | 사용 카피 | 카피 위치 | 변주 필요 | 영문 변주 |
|---|---|---|---|---|
| `/` | 본사 (주축) + 점주 (보조) | Hero h1 = 본사 · Sub-hero stack = 점주 · 4 도메인 진열대 카드 본문 | 있음 (stack 분리) | *Every store, like one.* 메인 |
| `/products` | 본사 변주 (4 카드 우산 헤더) | 섹션 헤더 · 4 카드 헤더 | 있음 (*Layer 3 · 4 카드의 우산*) | *Every store, like one.* 우산 |
| `/products/store-insight` | 본사 변주 | Hero sub · 섹션 헤더 | 있음 (*어제의 사이를 한 매장처럼*) | *Yesterday's seam, in every store.* |
| `/products/store-agent` | 본사 변주 + 점주 보조 | Hero h1 (본사) · live demo 섹션 (점주 변주) | 있음 (*다음 한 땀을 모든 매장처럼*) | *Weave the next, like one.* |
| `/products/store-care` | **점주 (주축)** | Hero h1 · CTA · 외부분기 카드 본문 | 없음 (마스터 그대로) | *Our store, like the best.* |
| `/products/saai` | 본사 변주 (B2C 카드) | Hero · 외부분기 카드 | 있음 (*매장의 콘텐츠를 한 매장처럼*) | (영문 후순위 — D6) |
| `/technology` | 없음 (기술 진열대) | — | 푸터 시그니처에만 *사이를 메웁니다.* | — |
| `/technology/anonymizer` | 없음 | 푸터 시그니처만 | — | — |
| `/technology/seal` | 없음 | 푸터 시그니처만 | — | — |
| `/technology/spatial-ai` | 없음 | 푸터 시그니처만 | — | — |
| `/technology/models` | 없음 (카탈로그) | 푸터 시그니처만 | — | — |
| `/solutions` | 본사 변주 | 섹션 헤더 | 있음 (*업종이 달라도 한 매장처럼*) | — |
| `/solutions/retail` | 본사 변주 + 점주 변주 | Hero (본사) · 점주 후기 카드 (점주) | 있음 | — |
| `/solutions/food-beverage` | 본사 변주 + 점주 변주 | Hero (본사) · 점주 후기 카드 (점주) | 있음 | — |
| `/solutions/drug` | 본사 변주 + 점주 변주 | Hero (본사) · 점주 후기 카드 (점주) | 있음 | — |
| `/solutions/large-space` | **본사 (정면)** | Hero h1 · 핵심 (대형 공간은 본사·운영자 중심) | 적음 | *Every space, like one.* |
| `/enterprise` | **본사 (정면)** | Hero h1 · 섹션 헤더 · CTA | 없음 (마스터 그대로) | *Every store, like one.* |
| `/pricing` | 없음 (가격) | 시뮬레이터 위 sub-hero 에만 점주 변주 *우리 매장에 맞춘 가격* | 적음 | — |
| `/pricing/simulator` | 없음 | — | — | — |
| `/company/about` | **두 마스터 대칭 거울** | Hero h1 (본사) + 결구 (점주) · 두 카피의 *대칭 거울* 다이어그램 1개 | 없음 (두 마스터 그대로) | *Every store, like one.* + *Our store, like the best.* |
| `/company/news` | 없음 | 푸터 시그니처만 | — | — |
| `/company/career` | 본사 변주 | Hero sub *모든 매장을 한 매장처럼 — 그 한 회사를 함께 짜는 자리* | 있음 | — |
| `/company/partnership` | 본사 변주 | Hero sub | 있음 (*파트너의 매장도 한 매장처럼*) | — |
| `/company/investors` (신설) | 본사 (정면) | Hero h1 · IR 1-pager 표지 | 없음 (마스터 그대로) | *Every store, like one.* |
| `/resources/blog` | 없음 | 카드 헤더에 시그니처 5글자만 | — | — |
| `/resources/case-studies` | 본사 변주 + 점주 인용 | Hero (본사) · 5 건 카드의 점주 인용 (점주 보조) | 있음 | — |
| `/resources/docs` | 없음 | — | — | — |
| `/resources/glossary` · `/resources/faq` | 없음 | — | — | — |
| `/contact` | 본사 변주 + 점주 변주 | Hero (둘 다 보조), 5 분기 카드 (도입·파트너·미디어·IR·일반) 의 분기마다 다른 마스터 | 있음 | *영문 본문 신설* |
| `/legal/privacy` · `/legal/terms` | 없음 | 시그니처 5글자만 | — | — |

### 3.2 마스터 카피의 4 위치 통칙

위 표가 라우트별이라면, 다음은 *위치별* 통칙.

| 위치 | 권장 마스터 | 예외 |
|---|---|---|
| **Hero h1** | 본사 (회사 사이트 기본). `/products/store-care` 만 점주 정면 | `/company/about` 만 두 마스터 stack |
| **Sub-hero / lead** | 본사 변주 + 카테고리어 (*익명화 공간 AI*) | — |
| **섹션 헤더** | 본사 변주 (회사 자료의 일관 결) | 솔루션 점주 후기 섹션은 점주 변주 |
| **CTA** | 자리별 다름 (자료 다운로드 = 본사 / 데모 신청 = 점주 변주) | — |
| **푸터 시그니처** | **시그니처 5글자 *사이를 메웁니다.* 만** (마스터 카피 X) | 모든 페이지 동일 |
| **메타 (title / og)** | 본사 변주 짧은 형 (검색 결과의 한 줄) | — |

### 3.3 한 자산 안에서의 금기 (Master Copy Decision v1.0 §2.4 재확인)

> 한 자산 안에서 두 마스터를 한 줄에 묶지 않는다. *모든 매장이 우리 매장처럼* 같은 *방향 모호* 의 결합 금지. `/company/about` 의 *대칭 거울* 도 *다른 면에 따로* 박는다 — 같은 줄 X.

---

## 4. 4-레이어 보이스 차별화 룰 (Company · Products · Technologies · Vision Models)

PLAN v1.1 §1.3 의 3-레이어(Products · Technologies · Vision Models)에 *Company* 를 더해 4-레이어로 확장. 회사 사이트는 *Company 가 가장 위* 의 자리.

### 4.1 4-레이어 보이스 한 표

| 레이어 | 청자 | 1차 voice register | 2차 register | 권장 길이 | 카피 작성 SOT | 금기 |
|---|---|---|---|---|---|---|
| **Company (회사)** | 본사 임원·투자자·언론·정부·신규 입사자 | executive English-first · BLUF · evidence-driven · 헌장 톤 | 한국어 fact-first · 정중 | 한 페이지 (Hero 짧음, 본문 중간) | Brand Brief + External Brief + Voice v2.2 *umbrella* | 점주 친밀체 · 이모지 · 마케팅 형용사 |
| **Products (제품)** | 본사 운영팀 · IT 의사결정자 (StoreCare 카드는 SMB) | executive English-first · 결정의 자리 명시 · 3 약속/3 Decisions/3 Pillars 프레임 | SMB friendly (StoreCare 카드 한정 — 이모지 9 허용) | 한 페이지 + 인터랙티브 데모 | Voice v2.2 + 3 제품 voice + 페이지 spec | jargon-heavy · 추상 · *최고의* / *혁신적인* |
| **Technologies (기술)** | 기술 의사결정자 · 엔지니어 · 학계 · 글로벌 파트너 | tech precise · 결과 인용 · 출처 명시 · 백서 톤 | executive 영문 추상 (Hero 만) | 두 페이지 (메커니즘 깊이) | Tech Group v1 + Architecture v3.3 SEED 카테고리 | 마케팅체 · 과장 · 형용사 |
| **Vision Models (모델)** | 엔지니어 · 개발자 · 도입 R&D | catalog · 객관 · 사양 중심 · 단일 명사 | tech precise (각 카드 한 단락) | 카드 1-2 단락 | Architecture v3.3 SEED 8 카테고리 + Naming v6 | 마케팅체 · 스토리텔링 · *놀라운* |

### 4.2 Voice Variation Matrix 12축의 *레이어별 고정/변주*

Voice Guidelines v2.2 §6 의 12축을 본 4-레이어 위에 다시 정렬한다.

| 축 | Company | Products | Technologies | Vision Models | 결 |
|---|---|---|---|---|---|
| **시간** | 전체 (헌장·5년 비전) | 어제·지금·다음 (3 제품 분리) | 현재·기술 시점 | 현재 (사양) | *변주* |
| **주 청자** | 임원·투자자·언론 | 결정자·운영팀 | 엔지니어 | 개발자 | *변주* |
| **톤 형용사** | 헌장 톤·평서·문학적 | 결정자 판단 (StoreCare 만 친밀) | 백서·정밀 | 카탈로그·객관 | *변주* |
| **카피 길이** | Hero 짧음, 본문 중간 | Hero 짧음, 본문 인터랙티브 | Hero 짧음, 본문 길음 | 카드 1-2 단락 | *변주* |
| **한글/영문** | 영문 first (글로벌) · 한글 정중 | 영문 first (Insight·Agent) / 한글 first (Care) | 영문 first | 영문 우선 (제품명) | *변주* |
| **이모지** | 금지 | StoreCare 카드 한정 9 허용 | 금지 | 금지 | *대부분 고정* |
| **카테고리어** | *익명화 공간 AI / Anonymized Spatial AI / SAAI* | 동일 | 동일 | 동일 | **고정** |
| **SEAL 3 약속** | 호명 | 호명 (Care 가장 강하게) | 호명 (SEAL 본가) | 카드 메타에만 | **고정** |
| **카피 형식** | BLUF (결론 먼저) | BLUF | BLUF | 사양 헤딩 | **고정** |
| **금기어** | *최고의·놀라운·솔루션·!!!* | 동일 | 동일 | 동일 | **고정** |
| **동료의 톤** | 회사의 자기소개 | 결정자의 동료 | 엔지니어의 동료 | 단일 task 도구 | **고정 (동료의 결)** |
| **결정과 책임은 사람의 자리** | 헌장 인용 | 권고·자율도 명시 (Agent) | 메커니즘 설명 | 사양 | **고정** |

**고정 5축 · 변주 7축.** 회사 사이트는 *고정 5축* 을 절대 깨지 않는다. *변주 7축* 은 레이어에 맞춰 의도적으로 다르게.

### 4.3 3 제품 보이스의 차이 — 한 단락씩 (v1.0 voice 문서에서 추출)

**Store Insight 보이스.** *분석가의 침착*. 흥분 X, 가설 차분. *Funnel 드롭 자리 + 가설* 한 줄 — *gaze→pick 65% 드롭, 가설: 가격 저항*. 영문 한글 혼용, 한글 KPI 사전 13. 3 Decisions 프레임 (Valuable · Faster · Scalable). *POS 도발* — *POS는 팔린 것만 압니다. Store Insight는 팔릴 뻔한 것도 압니다.* 자기 점검 #8 = *가설이 함께?*

**StoreCare 보이스.** *동네 가게 점주의 일상어*. 격식 X, 친밀. *부재의 안심* — *매장에 없어도 알림이 오니까 마음이 편해요*. 한글 우선, 30자 알림 결. 이모지 9 종 허용 (Care 만의 예외 — 🚨🗑️🧹📦🌙⚠️🏃✓💡). 3 약속 프레임 (24시간 AI 매니저 · 콕 집어 · 기존 위에서). 가격 결의 어휘 — *시급 34원* · *14,900원 부터*. 자기 점검 #8 = *결정 한 줄?*

**StoreAgent 보이스.** *executive 판단체*. 단단한 한 줄 보고. 영문 우선 — *Stop relying on gut instinct. The data tells you exactly where to go next.* 한글은 짧은 카드 1~3순위. 권고 클래스 L1-L4 + 자율도 L0→L5 사다리 명시 — *책임선이 분명*. 3 Pillars 프레임 (Faster · Backed · Consistent). Case-Based 증거 한 줄 — *유사 4 매장 가격 조정 후 +18%p*. 자기 점검 #8 = *클래스(L1-L4)+Case-Based 증거?*

세 제품을 한 페이지에 같이 놓는 자리(`/products` 진열대)에서는 *세 톤의 의도된 차이* 가 카드별로 그대로 드러나야 한다 — 같은 결로 다듬으면 *Voice 의 변주 약속* 이 깨진다.

---

## 5. 신설 필요 카피 식별

PLAN v1.1 §2.2 의 IA 에서 *신설 필요* 로 표시된 페이지와 D1·D6·D5 결정으로 새로 등장한 자리에서, *지금 brand-system 41 문서에 카피가 없는 자리* 를 식별. 각 자리는 *(라우트 · 왜 신설 · 카피 spec 가이드 · 다국어 우선 · 작성 일정)* 카드로.

### 5.1 `/products` 진열대 — 4 카드 헤더·서브헤더·CTA (D1)

**왜 신설인가.** v1 의 Product_Pages_Index_v1 은 *3 카드 (Insight · Care · Agent)*. D1 으로 SAAI 외부분기 카드가 *4 번째 카드* 로 추가. 4 카드의 우산 헤더·서브헤더·CTA 가 41 문서에 없다.

**카피 spec.**
- 진열대 Hero 헤더 — 본사 마스터 변주 *Layer 3 · 4 카드의 우산* (또는 *모든 매장을 한 매장처럼 — 우리의 네 자리*)
- 카드 1 (Store Insight) — 헤더 *어제의 사이* / 서브 *분석가의 침착* / CTA *어제를 읽기*
- 카드 2 (Store Agent) — 헤더 *다음의 사이* / 서브 *executive 판단* / CTA *다음을 짜기*
- 카드 3 (Store Care 외부분기) — 헤더 *지금의 사이* / 서브 *시급 34원의 안심* / CTA *storecare.ai 로* (외부 링크 마크)
- 카드 4 (SAAI 외부분기) — 헤더 *콘텐츠의 사이* / 서브 *매장의 입과 손* / CTA *saai.store 로* (외부 링크 마크)

**다국어.** en (path-prefix `/`) + ko (`/ko/products`). jp 는 후순위.

**일정.** Phase 2 1주차 (Tier 1 페이지 spec 갱신과 함께).

### 5.2 `/products/saai` 외부분기 카드 본문 (D1)

**왜 신설인가.** SAAI 외부분기는 v1 에 전혀 없다 (saai.store 측 자산만 있음). 회사 사이트의 카드 페이지 본문이 필요.

**카피 spec.**
- 어느 마스터의 변주인가 — 본사 변주 (*매장의 콘텐츠를 한 매장처럼*)
- 어느 보이스 레이어인가 — Products 레이어, *B2C 콘텐츠* 결
- 길이 — 외부분기 카드 페이지, 1 스크롤 (Hero + 3 카드 + CTA)
- 구성 — Hero / What is SAAI POP·콘텐츠 / saai.store 의 자리 (POP·아카이브·시즌) / *saai.store 로 가기* CTA

**다국어.** ko 우선 (점주 청자가 한국어), en 영문은 후순위.

**일정.** Phase 2 2주차.

### 5.3 `/technology/seal` FAQ 강화 분량 (D4 + Upgrade_Spec A5)

**왜 신설인가.** Tech Group v1 은 SEAL 을 *기술 토대의 첫 자리* 로 박았으나, MTMC / Pre-Purchase Data 의 분량이 빠짐 (Upgrade_Spec §2 Tier A5 에서 식별). Technologies 레이어의 *결과 인용 · 출처 명시* 결로 FAQ 5-7 종 신설.

**카피 spec.**
- 어느 보이스 레이어인가 — Technologies (백서 톤)
- 길이 — 각 Q&A 100-200자
- 구성 — 5-7 Q&A · 모두 *결정자의 1순위 의문* — *원본 영상은 어디 가나? · 다시 복원 가능한가? · MTMC 가 정확도 어떻게? · Pre-Purchase Data 가 뭔가? · GDPR·개인정보보호법 대응은? · 기존 CCTV 와의 호환은? · 처리 지연 시간은?*

**다국어.** en + ko 동시 (기술 의사결정자는 영문 검색 빈도 높음).

**일정.** Phase 2 1주차 (Tier 1 Tech Group spec 갱신과 함께).

### 5.4 `/technology/spatial-ai` 신설 본본문 (D6)

**왜 신설인가.** v1 의 Tech Group v1 은 *`/spatial-ai`* 자리만 있고, PLAN v1.1 에서는 `/technology/spatial-ai` (technology 하위) 로 자리가 바뀜. 본본문은 *MTMC 의 깊이* 가 부족 — Spatial AI 의 *공간을 어떻게 좌표화하는가* 의 본본문이 41 문서에 없다.

**카피 spec.**
- 어느 보이스 레이어인가 — Technologies (백서 톤)
- 길이 — 두 페이지 분량 (1 Hero + 4 메커니즘 섹션 + 2 case + FAQ)
- 구성 — MTMC 의 정의 / 다중 카메라 좌표화 / 좌표계의 4 단계 / 결과 인용 (CES·KDDI·NVIDIA)

**다국어.** en + ko.

**일정.** Phase 2 2주차.

### 5.5 `/technology/models` 카탈로그 그리드 본문 (D6)

**왜 신설인가.** PLAN v1.1 IA 에서 *Vision Models 20+ 카탈로그* 가 *별도 페이지* 로 분리 (D6). v1 에는 *DS home 의 20+ AI 모듈 카피* 가 흩어져 있을 뿐, 카탈로그 페이지의 정렬·헤더·카드 본문이 없다.

**카피 spec.**
- 어느 보이스 레이어인가 — Vision Models 레이어 (카탈로그·객관)
- 길이 — Hero + 그리드 (20+ 카드, 각 1-2 단락) + 카테고리 8 분류 (SEED 8 카테고리 정합)
- 구성 — Hero / 카테고리 필터 (익명화·인식·공간·흐름·변화·두뇌·생성·언어 8) / 카드 그리드 / *모델 요청* CTA
- 각 카드 — 모델명 (영문) · 한 줄 약속 · SEED 카테고리 태그 · stage marker (Live / Building / Planned)

**다국어.** en 우선 (개발자 청자), ko 동시.

**일정.** Phase 2 2주차.

### 5.6 `/company/investors` 신설 (D5 결과 우산이 더 명확해짐)

**왜 신설인가.** PLAN v1.1 §2.2 의 신설 페이지. D5 로 `app.deepingsource.io` 가 분리되면서 회사 사이트의 *우산이 더 명확* — 회사 차원 IR 자리가 필요. v1 의 외부 1-pager HTML 3종 (Brand Book v1/v2 · OnePage v4) 과 DS_SAAI_brand_deck.pdf 는 leave-behind 자료로 활용 가능하나, *페이지 본문* 은 신설.

**카피 spec.**
- 어느 마스터의 변주인가 — 본사 마스터 정면 *모든 매장을 한 매장처럼.*
- 어느 보이스 레이어인가 — Company 레이어 (executive English-first · evidence-driven)
- 길이 — 한 페이지 (Hero + 4 섹션 + 자료 다운로드 그리드 + 컨택)
- 구성 — Hero (마스터 정면) / 2031 비전 (5년 좌표) / 시장 좌표 (Physical AI 두 갈래) / 재무 / 자료 다운로드 (4 종 — Brand Deck · Brand Book v2 · OnePage · IR Deck) / IR 컨택 *영문 본문 우선*

**다국어.** en 정면 (글로벌 투자자), ko 동시.

**일정.** Phase 2 2주차 (자료 다운로드 그리드는 D10 자산 수집과 병렬).

### 5.7 `/solutions/large-space` 신설 (Upgrade_Spec A3)

**왜 신설인가.** Solutions Group v1 의 4 업종(편의점·드럭스토어·카페·F&B) 외에 *대형 공간* (하이퍼마켓·몰·컨벤션) 이 빠져 있다. Voice Guidelines v2.2 §8 *확장 공간* 어휘에 *매장 → 대형 공간 → 운영 시설 → 사무·공공* 의 사다리가 있는데, *대형 공간* 의 솔루션 본문이 41 문서에 없다.

**카피 spec.**
- 어느 마스터의 변주인가 — 본사 마스터 정면 (*대형 공간은 본사·운영자 중심*)
- 어느 보이스 레이어인가 — Products 레이어 + Solutions 그룹 결
- 길이 — 한 페이지 (Hero + 3 시나리오 + 메커니즘 + 케이스 자리)
- 구성 — Hero (*Every space, like one.*) / 3 시나리오 (하이퍼마켓 · 몰 · 컨벤션) / MTMC 의 대형 공간 적용 (Tech Group 의 Spatial AI 와 cross-link) / 본사 도입 CTA

**다국어.** en + ko.

**일정.** Phase 2 2주차.

### 5.8 en 마스터 카피 풀 (path-prefix `/` 기본 영문 — D6)

**왜 신설인가.** D6 의 path-prefix 정책에서 `/` 가 *영문 기본*. 41 문서의 영문 카피는 *대표 한 줄들* (마스터·도발·4-step Weaving) 에 한정. 30 라우트 × 위치 (Hero · sub · 섹션 헤더 · CTA · 메타) 의 *en 카피 풀* 이 부재.

**카피 spec.**
- 길이 — 30 라우트 × 5 위치 = 약 150 cell 풀
- 우선순위 — Tier 1 페이지 (Company · Products · Technologies) 의 Hero · sub · 메타 먼저
- 결 — 한국어 카피의 *직역 X*. 영문 보이스의 결로 *재합성* (executive English-first · Hemingway 결)
- 마스터 카피 영문 — *Every store, like one.* (본사) / *Our store, like the best.* (점주) — Master Copy Decision v1.0 §1.3 의 *Brand Council 검수 필요* 자리 → 검수 완료 후 박음

**다국어.** en (본 풀 자체가 en).

**일정.** Phase 2 2주차 + Phase 3 일부 (디자인 시스템 적용과 함께).

### 5.9 jp 부족분 (라이브 jp 8 누락)

**왜 신설인가.** 라이브 deepingsource.io 의 jp 45 페이지 중 *8 페이지가 누락* (deepingsource.io INVENTORY.md 기준). 새 IA 30 라우트 모두 jp 가 있어야 함 (D6).

**카피 spec.**
- 우선순위 — Tier 1 페이지 (Company · Products · Technologies) jp 먼저, Tier 2 후순위
- 결 — *KDDI 파트너십의 결* (kabushiki 정중체 · 외래어 표기 통일)
- 작성 방법 — 한국어 → 일본어 *번역의 방향* 의 결 (헌장 §5 *번역의 방향* 원칙) — 직역 X, 청자 결 재합성

**다국어.** jp.

**일정.** Phase 3 (jp 는 P1 — Phase 4 직전 마무리).

### 5.10 `/resources/case-studies` 5 건 헤드라인·아웃라인 (D9 — 별도 문서)

**왜 신설인가.** D9 로 *Phase 2 골격 + Phase 4 발행*. 53명 실측 + Golden Case 5 단계의 5 건의 *스토리 구조·카피* 가 Phase 2 안에서 골격으로 박혀야 함.

**카피 spec.**
- 본 v2 에서는 *식별만*. 실제 카피 spec 은 별도 `docs/CASE_STUDIES_v1.md` 에서 작성 (PLAN v1.1 §7 Phase 2 산출물)
- 5 건의 각 헤드라인 + 아웃라인 + 인용 1줄 (점주·SV·본사 셋 중 누구의 인용인가)

**다국어.** ko 우선, en + jp 후순위.

**일정.** Phase 2 안 (별도 문서 — `CASE_STUDIES_v1.md`).

### 5.11 `/contact` 영문 본문

**왜 신설인가.** v1 의 Company Group v1 §6 의 `/contact` spec 은 한글. D6 의 en 기본 정책으로 영문 본문 신설.

**카피 spec.**
- 어느 보이스 레이어인가 — Company 레이어 (executive English-first)
- 길이 — Hero + 5 분기 카드 (도입·파트너·미디어·IR·일반) + 폼 라벨 한 세트
- 결 — 짧고 정중, 5 분기마다 *영문 마스터의 변주* — 도입은 *Every store, like one — start with one.* 같은 결

**다국어.** en, jp 후순위.

**일정.** Phase 2 2주차.

### 5.12 식별 요약

| # | 자리 | 우선순위 | 일정 |
|---|---|---|---|
| 5.1 | `/products` 진열대 4 카드 | P0 | Phase 2 1주 |
| 5.2 | `/products/saai` 본문 | P1 | Phase 2 2주 |
| 5.3 | `/technology/seal` FAQ 강화 | P1 | Phase 2 1주 |
| 5.4 | `/technology/spatial-ai` 본본문 | P1 | Phase 2 2주 |
| 5.5 | `/technology/models` 카탈로그 | P1 | Phase 2 2주 |
| 5.6 | `/company/investors` | P0 | Phase 2 2주 |
| 5.7 | `/solutions/large-space` | P1 | Phase 2 2주 |
| 5.8 | en 마스터 카피 풀 | P0 | Phase 2 2주 + Phase 3 |
| 5.9 | jp 부족분 | P2 | Phase 3 |
| 5.10 | case-studies 5 건 골격 | P0 (별도) | Phase 2 (CASE_STUDIES_v1) |
| 5.11 | `/contact` 영문 본문 | P1 | Phase 2 2주 |

**총 11 자리 신설**, P0 4 + P1 6 + P2 1. case-studies 는 별도 문서로 분리.

---

## 6. v2 갱신 룰 — 기존 41 문서의 라우트·결 불일치 정렬

기존 41 문서 중 *PLAN v1.1 의 IA·D1–D10 결정과 불일치* 하는 자리를 식별. *문서를 다시 쓰는 게 아니라*, *갱신 액션* 만 박는다.

| 문서 | 갱신 필요 자리 | 갱신 액션 | 우선순위 |
|---|---|---|---|
| SAAI_Product_Pages_Index_v1.md | 3 제품 → 4 카드 (D1) | 4 카드 진열대로 *재구성* — SAAI 외부분기 카드 신설 spec 추가 | P0 (Phase 2 1주) |
| SAAI_Page_Store_Insight_v1.md | 라우트 `/storeinsight` → `/products/store-insight` (D4) | 라우트명만 정합 갱신 (본문 그대로) | P1 (Phase 2 1주) |
| SAAI_Page_StoreCare_v1.md | 풍부 페이지 → *외부분기 카드 페이지로 축소* (D4) | 9 Zone 풀 spec 을 카드 페이지 1 스크롤 spec 으로 *축소판* 신설 | P0 (Phase 2 1주) |
| SAAI_Page_StoreAgent_v1.md | 5 서브라우트 (`/storeagent/{blog,sample,newsletter,how-it-works,pricing}`) 가정 → 단일 페이지 + 인라인 섹션 (D3) | how-it-works·pricing 은 페이지 내 섹션으로 흡수, sample·blog·newsletter 는 외부분기 표기로 변경 + live demo 섹션 (D7) 추가 | P0 (Phase 2 1주) |
| SAAI_Page_Tech_Group_v1.md | 2 페이지 (`/technology` · `/spatial-ai`) → 4 페이지 (`/technology/{anonymizer,seal,spatial-ai,models}`) | 그룹 spec 을 4 페이지로 *확장* — `/technology/models` 신설 본문 + `/spatial-ai` 가 `/technology/spatial-ai` 로 prefix 통일 | P0 (Phase 2 1주) |
| SAAI_Page_Company_Group_v1.md | 5 페이지 (`/about · /company · /cases · /partnership · /contact`) → 6 페이지 (`/company/{about,news,career,partnership,investors}`) + `/resources/case-studies` 분리 | (1) `/company/news` · `/career` 신설 spec (현 문서엔 없음) (2) `/cases` → `/resources/case-studies` 로 이동 (3) `/investors` 신설 spec (4) `/about` → `/company/about` prefix 통일 | P0 (Phase 2 1주) |
| SAAI_Page_Solutions_Group_v1.md | `/industries/[slug]` 6 업종 (cvs·drug·cafe·f&b·unmanned·mart·exhibition) → `/solutions/[slug]` 4 업종 (retail · food-beverage · drug · large-space) | 6 → 4 *재카테고리* + `/large-space` 신설 spec | P1 (Phase 2 1주) |
| SAAI_Page_Pricing_v1.md | StoreCare 가격을 회사 사이트에서 노출 — 외부분기 (storecare.ai) 와 충돌 가능 | StoreCare *시작 가격만* (14,900원) 노출, 상세 결제·구독은 *storecare.ai 로 분기* CTA | P1 (Phase 2 1주) |
| SAAI_Page_Reference_Group_v1.md | FAQ·Glossary·Privacy·Terms 4 페이지 prefix — `/faq` `/glossary` `/privacy` `/terms` → `/resources/{faq,glossary}` + `/legal/{privacy,terms}` | prefix 정렬 (본문 그대로) | P2 (Phase 2 2주) |
| SAAI_Website_Upgrade_Spec_v1.md | 13 섹션 → 30 라우트 의 전환 — 본 spec 은 13 섹션 기준 | Tier A·B·C 의 각 항목이 30 라우트의 어느 자리로 가는지 *행 단위 매핑* 표 추가 (또는 *부분 폐기* 처리) | P2 (Phase 2 2주) |
| SAAI_Brand_Voice_Store_Insight_v1.md | *라우트 `/storeinsight`* → `/products/store-insight` | 한 줄 정합 갱신 | P2 (Phase 2 2주) |
| SAAI_Brand_Voice_StoreCare_v1.md | *storecare.ai 의 톤* + *회사 사이트 카드의 톤* 분리 안 됨 | 회사 사이트 카드 페이지의 *짧은 SMB friendly Hero* spec 추가 (Care 외부분기 카드만의 voice 결) | P1 (Phase 2 1주) |
| SAAI_Brand_Voice_StoreAgent_v1.md | live demo 섹션의 voice 결 부재 (D7) | live demo 섹션의 *인터랙티브 카피* voice 결 추가 (briefingData 의 morning briefing 톤) | P1 (Phase 2 1주) |
| SAAI_Brand_Architecture_v3.md | PLUS INSIGHT 잔재 (v3.x 어딘가에 흔적 가능) | grep `PLUS INSIGHT` → 전면 폐기 확인 + `Store Insight` 단일화 | P2 (Phase 2 2주) |
| SAAI_Brand_Voice_Guidelines_v2.md | 위치 표기 — `web/SAAI_Brand_Voice_Guidelines_v2.md` (master) → `brand-system/...` 으로 정합 | 한 줄 갱신 | P3 (Phase 2 2주) |

**총 15 갱신 자리**, P0 5 + P1 5 + P2 4 + P3 1.

### 6.1 잔재 정리 룰 (PLAN v1.1 §1.4 와 정합)

본 갱신과 별개로, 다음 잔재는 41 문서 전체에 grep 으로 확인.

- `PLUS INSIGHT` 명칭 — 전면 폐기 → `Store Insight` 단일화
- `/pi-docs`, `/pi-manual/*` — `/resources/docs/*` 로 재배치
- `/untitled/*` — 삭제 표기
- 발음 그대로 slug (예: `/storeagent`) → 영문 의미 slug (`/products/store-agent`)
- 3개 기술 페이지 동일 meta description — 각 페이지 고유로 분리

---

## 7. Phase 2 작업 순서

본 v2 가 박은 5 Tier + §5 신설 11 자리 + §6 갱신 15 자리를 *Phase 2 의 2주 안* 으로 분해.

### 7.1 1주차 (Tier 0 정독 + Tier 1 spec 갱신 + P0 신설 시작)

| 일 | 작업 | 산출물 |
|---|---|---|
| 1-2 | Tier 0 5 문서 정독 + Tier 1 8 문서 read-through | 메모 노트 (본인용) |
| 3 | §5.1 `/products` 진열대 4 카드 카피 작성 | 4 카드 헤더·서브헤더·CTA 한 페이지 |
| 3 | §5.3 `/technology/seal` FAQ 5-7 종 작성 | FAQ 한 페이지 |
| 4 | §6 의 P0 갱신 5 자리 — Product_Pages_Index · Store_Insight (라우트) · StoreCare (축소판) · StoreAgent (5 서브 흡수) · Tech_Group (4 페이지 확장) | 각 spec 의 *갱신판 v1.1* |
| 5 | §6 의 P0 갱신 1 자리 — Company_Group (6 페이지 재정렬 + `/investors` 신설 spec) | spec 의 *갱신판 v1.1* |

### 7.2 2주차 (P1 신설 + P2 신설 + P0–P1 갱신 마무리)

| 일 | 작업 | 산출물 |
|---|---|---|
| 1 | §5.2 `/products/saai` 본문 | 한 페이지 카피 |
| 1 | §5.4 `/technology/spatial-ai` 본본문 | 두 페이지 카피 |
| 2 | §5.5 `/technology/models` 카탈로그 | 그리드 본문 + 20+ 카드 |
| 2 | §5.6 `/company/investors` | 한 페이지 카피 + 자료 다운로드 그리드 |
| 3 | §5.7 `/solutions/large-space` | 한 페이지 카피 |
| 3 | §5.11 `/contact` 영문 본문 | Hero + 5 분기 카드 |
| 4 | §5.8 en 마스터 카피 풀 — Tier 1 페이지 (Company · Products · Technologies) Hero · sub · 메타 | en 카피 시트 (cell 약 60) |
| 4 | §6 의 P1 갱신 4 자리 — Voice Store_Insight · Voice StoreCare · Voice StoreAgent · Pricing | 각 spec 의 *갱신판 v1.1* |
| 5 | §6 의 P2 갱신 4 자리 + P3 1 자리 | 각 spec 의 *갱신판 v1.1* |

### 7.3 병렬 (Phase 2 전체) — D9 + D10

| 트랙 | 작업 | 산출물 |
|---|---|---|
| D9 case-studies | §5.10 — 5 건 헤드라인·아웃라인 골격 | `docs/CASE_STUDIES_v1.md` (별도) |
| D10 자산 수집 | 임원·오피스 촬영 발주 + 매체 로고 raw 수집 + 파트너 로고 저작권 정리 | `docs/ASSET_COLLECTION_v1.md` (별도) |

### 7.4 작업 매너 — Phase 2 안 (본 v2 의 자기 룰)

- 모든 카피 작성은 Voice Guidelines v2.2 §13 의 *자기 점검 7 질문* 으로 마감
- 모든 카피는 Brand Architecture v3.3 의 3-좌표제 `(Family, Domain·Function, Stage)` 를 의식 — 카피의 *어느 자리* 인지 헤더에 메모
- 한 자산 안에서 두 마스터 카피가 한 줄에 묶이지 않게 (Master Copy Decision v1.0 §2.4)
- 영문 카피는 한국어 직역 X — 영문 보이스의 결로 *재합성*
- 차트 / 다이어그램 / 시각화는 Phase 2 범위 밖 (Phase 3 의 DESIGN_v2 입력)

---

## 8. 다음 단계

본 v2 의 출구는 세 자리.

- **Phase 2 산출물 1** — 본 v2 가 정한 §5 의 *신설 11 자리* 의 실제 카피를 Phase 2 안에서 작성. 작성된 카피는 `brand-system/` 안에 *기존 spec 의 갱신판 (v1.1)* 으로, 또는 *신설 spec (v1.0)* 으로 박는다.
- **Phase 2 산출물 2** — `docs/CASE_STUDIES_v1.md` (D9 의 5 건 골격, 본 v2 §5.10 식별)
- **Phase 2 병렬 산출물 3** — `docs/ASSET_COLLECTION_v1.md` (D10 의 임원·오피스·매체 로고 수집, 본 v2 §7.3 식별)

본 v2 가 Phase 3 의 `docs/DESIGN_v2.md` 로 넘기는 입력은 다음 3 자리.

- 4-레이어 보이스 차별화 룰 (§4) → 시각 차별화의 입력 — Company (heavy serif·정중) / Products (Pretendard·결정자) / Technologies (mono·백서) / Vision Models (catalog grid) 의 *시각 결*
- 두 마스터 카피의 30 라우트 사용처 표 (§3) → Hero·푸터·CTA 의 *시각 자리 정렬* 의 입력
- Tier 0–4 의 *문서 우선순위* (§2) → Phase 3 *어느 페이지의 시각 자리를 먼저* 의 입력

본 v2 가 Phase 4 의 `docs/CODE_v1.md` 로 넘기는 입력은 다음 1 자리.

- §6 의 *갱신 룰 15 자리* → 코드의 컴포넌트 · 카피 import · i18n key 의 *갱신 우선순위* 의 입력

— *끝.*
