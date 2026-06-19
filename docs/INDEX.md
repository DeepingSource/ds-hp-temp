# INDEX — docs/ 12 산출물의 단일 진입점

> **버전** v1.0 · **작성일** 2026-05-29 · **상위 SOT** [PLAN_v1.1.md](./PLAN_v1.1.md)
> **범위** docs/ 산하 12 산출물 (마스터 플랜 2 · 페이즈 산출 5 · 인벤토리 4 · 검증 1) 의 *카탈로그·읽기 순서·참조 그래프·변경 영향·결함 추적·결재 자리* 한 자리 모음.
> **본 문서의 자리** 처음 들어오는 작업자가 *어디서 시작하지?* 를 1분 안에 답할 수 있도록, 그리고 기존 작업자가 *내 작업의 SOT 가 어디인가* 를 5분 안에 찾을 수 있도록 박는 단일 진입점.

---

## 0. 한 페이지 요약

본 워크스페이스는 **새 `deepingsource.io` 회사 사이트** 를 짓기 위한 산출물을 모은다. *3 도메인 = 1 우산* 구조 — 회사 사이트 `deepingsource.io` 가 두 외부 도메인 (`storecare.ai` B2B SaaS · `saai.store` B2C 콘텐츠) 을 *진열·연결* 하되 흡수하지 않고, 인증·계정·대시보드는 `app.deepingsource.io` 로 분리 신설된다.

**현재 단계** — Phase 1 (인벤토리) · Phase 2 (브랜드·case-study·자산) · Phase 3 (디자인) · Phase 4 (코드) 산출 완료. **Phase 4 코드 1차 구현 착수·완수 (2026-05-29)** — `src/` 에 신 IA 30 라우트 골격 구현, `npm run build` 그린 (470 정적 페이지). 상세는 §11. **Phase 5 (Webflow 즉시 교체 + 발행) 진입 전 AUDIT_v1 의 29 결함 (Critical 3 + High 9 + Medium 11 + Low 6) 의 결재 sprint 대기**. v1.2 갱신 시점.

**12 산출물의 4 카테고리** —
1. **마스터 플랜 2** — PLAN_v1 (archive) · **PLAN_v1.1 (현행 SOT)**
2. **페이즈 산출 5** — BRAND_v2 (Phase 2) · CASE_STUDIES_v1 (Phase 2) · ASSET_COLLECTION_v1 (Phase 2 병렬) · DESIGN_v2 (Phase 3) · CODE_v1 (Phase 4)
3. **인벤토리 4** — deepingsource.io · storecare.ai · saai.store · local
4. **검증 1** — AUDIT_v1

**"어디서 시작하지?" 한 줄 답** — 처음이면 본 INDEX §3 의 **시나리오 1 (새 참여자)** 를 그대로 따른다. 1시간 안에 워크스페이스의 전체 그림이 그려진다.

---

## 1. 12 산출물 카탈로그

본 §1 은 *문서 목록을 한 자리에서 본다*. 각 항목의 docs/ 상대 경로는 클릭 가능하다.

핵심 표기:
- **SOT** — Source of Truth, 결정의 단일 권위
- **Archive** — 보존되지만 더 이상 SOT 아님
- **Reference** — 다른 SOT 의 입력
- **Audit** — 검증·결재 대기 자리 식별

| # | 파일명 | 분류 | 라인 | 마지막 갱신 | 상태 | 한 줄 요약 | 다음 갱신 트리거 |
|---|---|---|---|---|---|---|---|
| 1 | [PLAN_v1.md](./PLAN_v1.md) | Master | 452 | 2026-05-29 | **Archive** | v1.0 — Open Q 10종 미해소 상태의 초기 통합본. v1.1 의 *변경 전 자리*. | (없음 — Archive) |
| 2 | [PLAN_v1.1.md](./PLAN_v1.1.md) | Master | 428 | 2026-05-29 | **SOT** | Open Q 10종 → D1-D10 확정. 본 워크스페이스의 *현행 SOT*. 모든 후속 산출물의 입력. | F-01·F-02·F-08 등 AUDIT 결함 결재 후 v1.2 |
| 3 | [BRAND_v2.md](./BRAND_v2.md) | Phase 2 | 516 | 2026-05-29 | SOT | 41 brand-system 위에 *회사 사이트 모드 매핑 layer*. 5 Tier 정독 순서 + 30 라우트 카피 매핑 + 4-레이어 보이스 + 신설 카피 11 자리. | F-13 (`/resources/docs` 행 누락) 처리 시 |
| 4 | [CASE_STUDIES_v1.md](./CASE_STUDIES_v1.md) | Phase 2 | 272 | 2026-05-29 | SOT (골격) | D9 — case-study 5건 골격. 53명 실측 + Golden Case 5단계. Phase 4 발행 시 *(가상)* 자리를 실측으로 교체. | F-05 (자산 트랙 누락) · F-25 (실측 데이터 책임) 처리 시 |
| 5 | [ASSET_COLLECTION_v1.md](./ASSET_COLLECTION_v1.md) | Phase 2 (병렬) | 359 | 2026-05-29 | SOT | D10 — 자산 수집 4 영역 (임원·오피스·매체·파트너) + 부수 3 (인포그래픽·영문 OG·Hero KV). 외부 발주 4 트랙. | F-05 (case-study 트랙 추가) · F-11 (인포그래픽 5종 주제) 처리 시 |
| 6 | [DESIGN_v2.md](./DESIGN_v2.md) | Phase 3 | 515 | 2026-05-29 | SOT | 13 CSS 위에 *회사 사이트 적용 모드*. 4-레이어 보이스 → 시각 차별화. 31 preview → 30 라우트 컴포넌트 매핑. `ui_kits/corporate/` 신설 목차. | F-11 (인포그래픽 5종) · F-27 (라우트 카운트) 처리 시 |
| 7 | [CODE_v1.md](./CODE_v1.md) | Phase 4 | 528 | 2026-05-29 | SOT | 22 라우트 → 30 라우트 매핑 + PR 18개 의존 그래프 + i18n 옵션 B + redirects · velite · briefingData · 자산 박음 · Webflow 즉시 교체 체크리스트. | F-01·F-02·F-03·F-04·F-17·F-18 처리 시 v1.1 |
| 8 | [AUDIT_v1.md](./AUDIT_v1.md) | Audit | 538 | 2026-05-29 | SOT | Phase 1-4 산출 7종 × 인벤토리 4종 × 코드 × 기존 2 계획서 교차검증. 7 차원 (A-G) · **결함 29종** (Critical 3·High 9·Medium 11·Low 6) · 결재 10건. | Sprint 1-3 결함 처리 + Phase 5 회고 시 v2 |
| 9 | [inventory/deepingsource.io/INVENTORY.md](./inventory/deepingsource.io/INVENTORY.md) | Inventory | 642 | 2026-05-29 | Reference | 라이브 deepingsource.io 58 고유 경로 + 138 이미지 + 88+ 매체 링크. 새 IA 의 *흡수 대상 풀*. | 라이브 사이트 갱신 시 |
| 10 | [inventory/storecare.ai/INVENTORY.md](./inventory/storecare.ai/INVENTORY.md) | Inventory | 456 | 2026-05-29 | Reference | 라이브 storecare.ai 5 페이지 + 123 이미지 + 4 모듈 (Anomaly·Clean·Refrig·Shelf). 53명 실측의 *원천 자산*. | 라이브 사이트 갱신 시 |
| 11 | [inventory/saai.store/INVENTORY.md](./inventory/saai.store/INVENTORY.md) | Inventory | 323 | 2026-05-29 | Reference | 라이브 saai.store 21 페이지 + archive 18 글. D2 결정의 *외부유지* 대상. | 라이브 사이트 갱신 시 |
| 12 | [inventory/local/INVENTORY.md](./inventory/local/INVENTORY.md) | Inventory | 428 | 2026-05-29 | Reference | 로컬 워크스페이스 — brand-system 41 문서 · design-system 13 CSS · src 22 라우트 · velite 196 MDX. | 워크스페이스 구조 변화 시 |

**총 5,517 라인.** 본 워크스페이스의 *지금까지의 결정 두께*.

---

## 2. 의존 그래프 — 문서 간 참조 흐름

### 2.1 전체 그래프

```
                    [4 INVENTORY]
                          │
                          ▼
                    [PLAN_v1.0]  (archive)
                          │
                          ▼
                ┌──[PLAN_v1.1]──┐     ← 현행 SOT (D1–D10)
                │   §0.3 결정    │
                │   §2.1 IA      │
                │   §2.3 redir   │
                │   §7 Phase     │
                │                │
        ┌───────┼────────┬───────┼────────┬────────┐
        ▼       ▼        ▼       ▼        ▼        ▼
   [BRAND_v2] [CASE_  [ASSET_  [DESIGN [CODE_v1]  (Phase 5)
              STUDIES COLL_v1]  _v2]    PR 18개   회고 문서
              _v1]                                 (미정)
        │       │        │       │        │
        │       └────────┤       │        │
        │       자산 입력 │       │        │
        └────────────────┼───────┘        │
        카피 입력         │   시각 입력      │
                         └────────────────┤
                          (Phase 2/3 → 4)  │
                                           │
                                           ▼
                                       [AUDIT_v1]
                                       29 결함 식별
                                           │
                                           ▼
                                    v1.2 갱신 + Phase 5
```

### 2.2 핵심 참조 체인 5종

1. **PLAN_v1.1 §0.3 D1-D10 → 7 산출물 모두의 결정 입력** — BRAND·DESIGN·CODE·CASE·ASSET 각 산출물의 첫 §0 또는 §1 에 *상위 SOT* 로 PLAN_v1.1 §0.3 인용. AUDIT_v1 §1 의 D-정합 표가 이 체인의 *검증 자리*.
2. **PLAN_v1.1 §2.1 IA (30 라우트) → BRAND_v2 §3.1 · DESIGN_v2 §4 · CODE_v1 §1.1 의 30 라우트 표** — 세 산출물이 *동일 라우트 슬러그* 로 매핑. AUDIT_v1 §2.1 의 32 행 표가 이 정합의 검증.
3. **BRAND_v2 §4 4-레이어 보이스 → DESIGN_v2 §2.2 시각 차별화 룰 입력** — Company · Products · Technologies · Vision Models 의 보이스 차이가 *audience-corporate.layer-{company,products,tech,models}* CSS 분기로 옮겨짐.
4. **CASE_STUDIES_v1 §6 자산 → ASSET_COLLECTION_v1 §3 일정 입력** — 5건의 *사진 13컷 + UI 13장 + KPI 10장* 이 자산 수집 일정의 입력. **AUDIT F-05: 이 체인이 ASSET §2 에 별도 라인으로 박혀 있지 않음**.
5. **CODE_v1 §1.1 ↔ AUDIT_v1 §1 D-정합 표 ↔ §2-9 결함 식별** — CODE 의 매핑 표가 AUDIT 의 검증 입력이고, AUDIT 의 결함이 CODE v1.1 의 갱신 트리거.

### 2.3 외부 참조 (docs/ 밖)

- `brand-system/` 41 문서 — BRAND_v2 의 v1 SOT. v2 는 *다시 쓰지 않음*, 매핑만 추가.
- `design-system/` 13 CSS + 31 preview + ui_kits/store-agent — DESIGN_v2 의 v1 SOT.
- `src/` (storeagent-b2c-landing) — CODE_v1 의 변환 대상.
- `assets/` (Asset Candidate 98 + inventory/* 263 이미지) — ASSET_COLLECTION 의 raw 풀.
- `SAAI_Website_Upgrade_Spec_v1` · `Deepingsource_Web_Transition_Plan_v0.2` — PLAN_v1.0 §9 부록 의 흡수 대상 (AUDIT §5 에서 정합 검증).

---

## 3. 시나리오별 읽기 순서

작업자 시나리오마다 *최소 정독 셋* 명시. 시간은 *처음 보는 사람* 기준.

### 시나리오 1 — 새 참여자 (전체 맥락 잡기) · 약 1시간

1. **INDEX.md (본 문서) §0 + §1** — 12 산출물의 *지도*
2. **PLAN_v1.1.md §0** (한 페이지 요약) + **§0.3 D1-D10** — 본 워크스페이스의 *10 결정*
3. **PLAN_v1.1.md §2.1 IA** — 30 라우트의 *전체 자리표*
4. **AUDIT_v1.md §0** (요약 + 결함 카운트) — *지금 어디까지 왔는가*
5. (선택) **BRAND_v2.md §0 + §3.1** — 두 마스터 카피 사용처 표

### 시나리오 2 — 카피 작성자 · 약 2-3시간

1. PLAN_v1.1.md §0.3 D1-D10 + §2.1 IA
2. **BRAND_v2.md 전체 정독** — 특히 §2 5 Tier · §3 마스터 카피 매핑 · §4 4-레이어 보이스 · §5 신설 카피 11 자리
3. inventory/deepingsource.io/INVENTORY.md §3 — 페이지별 카피 카드 (라이브 ko/en/jp 본문)
4. `brand-system/` Tier 0 척추 5종 (BRAND_v2 §2.1 에서 식별: Architecture v3 · Voice v2 · Master Copy Decision v1 · Copy Master v2 · Brand Brief v1)
5. AUDIT_v1.md §1 D-정합 표 (해당 결정 행) + §7 신설 카피 정합

### 시나리오 3 — 디자인·시각 작업자 · 약 2시간

1. PLAN_v1.1.md §0.3 D1-D10 + §1.3 3-레이어 스택
2. BRAND_v2.md §4 4-레이어 보이스 (시각 차별화 입력)
3. **DESIGN_v2.md 전체 정독** — 특히 §2 회사 사이트 모드 · §3 13 CSS 매핑 · §4 30 라우트 컴포넌트 인벤토리 · §5 ui_kits/corporate
4. `design-system/` 핵심 5종 (DESIGN_v2 §1.1 의 5 layer + DESIGN.md · CHART_DESIGN_GUIDE.md)
5. ASSET_COLLECTION_v1.md §3 일정 (병렬 자산 가공)

### 시나리오 4 — 프론트 엔지니어 (코드 작업) · 약 3시간

1. PLAN_v1.1.md §0.3 D1-D10 + §2.1 IA + §2.3 redirects
2. **CODE_v1.md 전체 정독** — 특히 §1 현→새 매핑 · §2 PR 분할 · §3 i18n · §4 redirects · §5 velite
3. inventory/local/INVENTORY.md §4 (코드 IA) + §5 (컴포넌트) + §6 (데이터)
4. DESIGN_v2.md §3 13 CSS 매핑 + §4 컴포넌트 인벤토리
5. AUDIT_v1.md §0.3 + §2 결함 (특히 F-01·F-02 redirects 누락 · F-04 briefingData 모호)

### 시나리오 5 — 자산 수집·디자인 외주 담당 · 약 1시간

1. PLAN_v1.1.md §0.3 D10 + §5.2 카테고리별 격차
2. **ASSET_COLLECTION_v1.md 전체 정독** — 4 영역 + 부수 3 + 외부 발주 4 트랙
3. CASE_STUDIES_v1.md §6 자산 요구 (5건 × 사진·UI·KPI 등)
4. AUDIT_v1.md §0.3 F-05 (case-study 자산 트랙 누락) + §6 자산 매핑 정합

### 시나리오 6 — 검증·결재자 (Jamin) · 약 2시간

1. PLAN_v1.1.md §0.3 D1-D10 + §0.1 변경 요약
2. **AUDIT_v1.md 전체 정독** — 특히 §0.3 핵심 결함 5종 + §8 결함 목록 + §9 권고 액션 + §9.3 결재 10건
3. INDEX.md §6 결함 추적 (본 문서)
4. INDEX.md §7 다음 행동 — 결재 대기 카드 (본 문서)

### 시나리오 7 — Phase 5 발행 직전 (DNS 교체 책임자) · 약 1.5시간

1. PLAN_v1.1.md §0.3 D8 + §7 Phase 5
2. CODE_v1.md §8 Webflow 즉시 교체 체크리스트 (14 항목)
3. CODE_v1.md §4 redirects (전체 박음 — `/cases` 추가 후)
4. AUDIT_v1.md §0.3 F-01 (`/cases` 누락) · F-02 (`/search` 누락) · F-08 (app.ds.io 트랙)

---

## 4. 페이즈별 산출물 매핑

| Phase | 단계명 | 핵심 산출물 (SOT) | 입력 (Reference) | 결재 자리 | 완료 |
|---|---|---|---|---|---|
| Phase 1 | 인벤토리 + 마스터 플랜 | PLAN_v1.1 | 4 INVENTORY · 기존 2 계획서 (Upgrade Spec · Transition v0.2) | Open Q 10종 → D1-D10 (완료) | ✅ |
| Phase 2 | 브랜드 정비 + case-study 골격 + 자산 수집 시작 | BRAND_v2 · CASE_STUDIES_v1 · ASSET_COLLECTION_v1 | PLAN_v1.1 · brand-system/ 41 문서 | 자산 외주 발주 결재 (사진 작가 1 · 인포 디자이너 1 · 비주얼 디자이너 1) | ✅ |
| Phase 3 | 디자인 시스템 업데이트 + 자산 가공 | DESIGN_v2 (+ ui_kits/corporate 신설) | BRAND_v2 · design-system/ 13 CSS | 색·폰트·다크 모드 결정 (DESIGN_v2 §9 Open Q 5종 → 본문 권고로 해소) | ✅ |
| Phase 4 | 코드 변환 + 자산 박음 + case-study 발행 | CODE_v1 (+ PR 18개) | DESIGN_v2 · CASE_STUDIES_v1 · ASSET_COLLECTION_v1 · src/ | PR 머지 결재 (PR-15 redirects · PR-17 자산 · PR-18 Webflow 교체) | ✅ (산출 완료, 빌드 대기) |
| Phase 5 | Webflow 즉시 교체 + 발행 | (Phase 5 산출 미정 — 발행 후 회고 문서) | CODE_v1 §8 체크리스트 · AUDIT 결함 처리 후의 v1.2 | DNS 교체 결재 (Jamin) + en/ko/jp 단계 발행 | 대기 (AUDIT 결재 후) |

**다음 갱신 트리거** — AUDIT_v1 §9.3 의 결재 10건 완료 → PLAN_v1.2 갱신 → Phase 5 진입.

---

## 5. 변경 영향 매트릭스

*어느 문서가 바뀌면 어느 문서가 영향받는가*. 핵심 7 산출물 + INVENTORY 합쳐서.

| 변경된 문서 | 영향받는 문서 | 영향 종류 |
|---|---|---|
| PLAN_v1.1 §0.3 D1-D10 | BRAND_v2 · DESIGN_v2 · CODE_v1 · CASE_STUDIES_v1 · ASSET_COLLECTION_v1 · AUDIT_v1 | **전부 재검토 필요** — 10 결정의 변경은 *기반 변경* |
| PLAN_v1.1 §2.1 IA (30 라우트) | BRAND_v2 §3.1 · DESIGN_v2 §4 · CODE_v1 §1.1 | 30 라우트 표 3 자리 동시 갱신 |
| PLAN_v1.1 §2.3 redirects | CODE_v1 §4.1 next.config.ts | redirects 일괄 박음 |
| BRAND_v2 §4 4-레이어 보이스 | DESIGN_v2 §2.2 시각 차별화 | 시각 토큰 분기 룰 갱신 |
| BRAND_v2 §5 신설 카피 11 자리 | CODE_v1 §1.1 (PR-02·03·04·06·07·08·11·14) | 카피 입력 |
| DESIGN_v2 §2 audience 확장 | CODE_v1 §2 PR-00.5 (CSS 갱신) | dist CSS 갱신 PR |
| DESIGN_v2 §4 컴포넌트 인벤토리 | CODE_v1 §1.2 components 운명 | 컴포넌트 재배치 |
| DESIGN_v2 §7 신설 자산 | ASSET_COLLECTION §2 부수 영역 | 인포그래픽·OG·Hero KV 발주 정합 |
| CASE_STUDIES_v1 §6 자산 spec | ASSET_COLLECTION §2-3 | case-study 자산 트랙 추가 (현재 F-05 결함) |
| ASSET_COLLECTION §3 일정 | CODE_v1 §7 PR-17 | 자산 박음 PR 의 합류 시점 |
| CODE_v1 §1.1 매핑 | AUDIT_v1 §1 D-정합 + §4 D 차원 | 결함 카운트 갱신 |
| INVENTORY 4종 | PLAN (§3 콘텐츠 소스 표) · BRAND (§3 카피 매핑) · CODE (§1 매핑) | 라이브 사이트 갱신 시 |
| 모든 변경 | AUDIT_v1 §8 결함 처리 | v1 → v2 갱신 |

---

## 6. AUDIT 결함 추적

AUDIT_v1.md §8 의 29 결함을 *어느 산출물에서 어떻게 처리할지* 표로 박는다.

### 6.1 Critical 3 + High 9 (Sprint 1·2 대상, 본문에 박음)

| # | 결함 ID | 분류 | 한 줄 | 처리 자리 | 결재 대기자 | 상태 |
|---|---|---|---|---|---|---|
| 1 | F-01 | Critical | `/cases` + `/cases/[slug]` redirects 누락 | PLAN_v1.2 §2.3 · CODE_v1.1 §4.1 | **Jamin** | 결재 대기 |
| 2 | F-02 | Critical | `/search` · `/access-denied` 구현 결정 부재 (v1.0 → v1.1 유실) | PLAN_v1.2 §4.1 P0 · CODE_v1.1 §1.1 | **Jamin** | 결재 대기 |
| 3 | F-08 | Critical | `app.deepingsource.io` 신설 트랙 시점·발주 부재 | PLAN_v1.2 §7 Phase 5/6 | **Jamin (PM)** | 결재 대기 |
| 4 | F-03 | High | `/storeagent/sample` destination 모순 (app.ds.io vs saai.store) | PLAN_v1.2 §2.3 · CODE_v1.1 §4 | **Jamin** | 결재 대기 |
| 5 | F-04 | High | briefingData live demo vs sample 두 운명 모호 | CODE_v1.1 §6 | (기술 결정) | 결재 대기 |
| 6 | F-05 | High | case-study 자산 트랙 (사진 13·UI 13·KPI 10) ASSET 별도 라인 부재 | ASSET_COLLECTION §2.4 신설 | **Jamin** | 결재 대기 |
| 7 | F-06 | High | catchsecu 외부 개인정보 처리방침 처리 결정 부재 | CODE_v1.1 PR-14 · §8.1 | **Jamin (법무)** | 결재 대기 |
| 8 | F-07 | High | jp 라이브 8 누락 페이지 복구 책임 부재 | BRAND_v2 §5.9 · CODE_v1 §11 Q4 | **Jamin (또는 KDDI)** | 결재 대기 |
| 9 | F-09 | High | 88+ 매체 외부 링크 콘텐츠 마이그레이션 표 부재 | ASSET_COLLECTION §1.3 · CODE PR-11 | (없음) | 작업 대기 |
| 10 | F-10 | High | Upgrade Spec A1 5 행동 강령 위치 결정 부재 | BRAND_v2 §3.1 | (없음) | 작업 대기 |
| 11 | F-11 | High | 인포그래픽 5종 주제 ASSET vs CASE vs DESIGN 에서 모두 다름 | ASSET·CASE·DESIGN 한 표 통일 | **Jamin (디자인)** | 결재 대기 |
| 12 | F-12 | High | jp 30 라우트 발행 책임자 부재 | CODE_v1 §11 Q4 · §3 | **Jamin** | 결재 대기 |

### 6.2 Medium 11 + Low 6 (Sprint 2·3 대상, 본 INDEX 단축)

상세는 [AUDIT_v1.md §8](./AUDIT_v1.md) 참조. 17 결함 요약:

- **Medium 11** — F-13 (`/resources/docs` BRAND 표 행 누락) · F-14 (30 vs 32 카운트) · F-15 (Transition_Plan 신설 6 의 재구성 근거) · F-16 (DS 19 글 마이그레이션) · F-17 (`/untitled` redirect 미명시) · F-18 (pi-manual 10 영문 slug 표 부재) · F-19 (saai 154 글 외부 책임 표시) · F-20 (도발 카피 라우트) · F-21 (헌장 1-pager 자리) · F-22 (유지 19 정의 변경) · F-23 (Phase 3→4 간격)
- **Low 6** — F-24 (en 분량 60 vs 150) · F-25 (실측 데이터 책임 약함) · F-26 (196 글 frontmatter 변환 표) · F-27 (DESIGN 30 vs 32) · F-28 (velite enum 카운트) · F-29 (©2018 연도 통일 PR 책임)

### 6.3 PASS 인정 5 자리 (AUDIT §10 — *건드리지 말 것*)

1. D 차원 (코드베이스) 디렉토리 단위 매핑 — 53 자리 100%
2. B 차원 32 라우트 매핑 — 31/32 정합
3. D4 결정 (storecare/storeinsight 흡수) 전 자리
4. D8 Webflow 즉시 교체 체크리스트 14 항목
5. CASE_STUDIES_v1 5건의 큐레이션 원칙 5종

---

## 7. 다음 행동 — Phase 5 진입 전 결재 자리

AUDIT_v1.md §9.3 의 결재 10건 + 작업 대기 4건을 *결재 대기자별 카드* 로 정렬.

### 7.1 Jamin 결재 대기 (10건)

본 10건은 *Phase 5 진입 전 1주 결재 sprint* 의 대상.

| # | 결재 자리 | 결함 ID | 결재 종류 |
|---|---|---|---|
| 1 | `/cases` 흡수 자리 (`/products/saai#cases` vs `/resources/case-studies`) | F-01 | IA |
| 2 | 새 `/search` 의 구현 방식 (velite 인덱스 vs 외부 검색) | F-02 | 기술 |
| 3 | `/storeagent/sample` destination (app.ds.io vs saai.store) | F-03 | IA |
| 4 | case-study 5건 자산 (사진 13 + UI 13 + KPI 10) 의 Phase 3 가공 시점 | F-05 | 일정 |
| 5 | catchsecu 외부 유지 vs 새 `/legal/privacy` 흡수 | F-06 | 법무 |
| 6 | jp 8 누락의 번역 책임자 (KDDI 파트너 협조 여부) | F-07 | 인력 |
| 7 | `app.deepingsource.io` 시점 + 발주자 + 트랙 매니저 | F-08 | PM |
| 8 | jp 30 라우트 Phase 5 후반 발행 책임자 | F-12 | PM |
| 9 | Upgrade Spec A1 5 행동 강령 자리 | F-10 | 브랜드 |
| 10 | 인포그래픽 5종의 주제 통일 (ASSET·CASE·DESIGN) | F-11 | 디자인 |

### 7.2 결재 불필요 작업 (4건)

본 4건은 *기술·문서 정합* — 별도 결재 없이 작업자가 처리.

| # | 작업 | 결함 ID | 담당 |
|---|---|---|---|
| 1 | briefingData live demo vs sample 데이터 분리 결정 | F-04 | 프론트 엔지니어 |
| 2 | 88+ 매체 콘텐츠 마이그레이션 표 작성 | F-09 | 콘텐츠 |
| 3 | F-13 ~ F-23 Medium 11 결함 일괄 정합 (라우트·콘텐츠 표) | (M) | 문서 작성자 |
| 4 | F-24 ~ F-29 Low 6 결함 미세 정합 | (L) | 문서 작성자 |

### 7.3 결재 후 v1.2 갱신 항목 (AUDIT §9.2)

PLAN v1.2 갱신 시 6 자리 박음:
1. §0.3 D11 추가 — `/cases` 흡수 + `/resources/case-studies` 신설의 관계
2. §2.1 IA 표에 `/search` (P0 신설) · `/access-denied` (시스템) 행 추가
3. §2.3 redirects 표에 `/cases` · `/cases/:slug` · `/untitled/untitled-2` 행 추가
4. §7 Phase 5/6 에 `app.deepingsource.io` 트랙 1줄 + 책임자 명시
5. §9.2 부록에 Transition_Plan v0.2 신설 6 → 새 IA 재구성 매핑
6. §4.2 P1 *Search* 결정 행 복원

---

## 8. 갱신 룰 — INDEX 자체의 갱신 시점

- **모든 산출물 변경 시** — INDEX §1 (카탈로그) 라인 수·상태·다음 트리거 갱신
- **AUDIT 결함 처리 시** — INDEX §6 결함 추적 표의 상태 컬럼 갱신 (결재 대기 → 결재 완료 → 반영 완료)
- **결재 완료 시** — INDEX §7 카드 제거 + 해당 결정 PLAN_v1.x 에 반영 + AUDIT §8 표의 상태 갱신
- **Phase 5 발행 후** — INDEX v2 작성 (Phase 5 회고 산출물 추가 + AUDIT v2 의 결함 차분 반영)
- **새 산출물 추가 시** — INDEX §1 카탈로그에 행 추가 + §2 의존 그래프 갱신 + §3 시나리오 영향 검토

---

## 9. FAQ

**Q1. PLAN_v1.md 와 PLAN_v1.1.md 의 차이는?**
v1.0 은 Open Question 10종이 미해소 상태의 초기 통합본. v1.1 은 Jamin 결정으로 10 결정 (D1-D10) 이 확정된 *현행 SOT*. v1.0 은 archive 로 보존되지만 *결정의 기준은 v1.1*. 두 문서의 *결정이 충돌* 하면 v1.1 이 이긴다 (AUDIT F-03 의 `/storeagent/sample` destination 모순이 그 예).

**Q2. 첫 1시간에 뭘 읽어야 하나?**
시나리오 1 그대로 — INDEX §0+§1 → PLAN_v1.1 §0+§0.3 → PLAN_v1.1 §2.1 → AUDIT §0. 본 4 자리에 *전체 그림* 의 80% 가 들어있다.

**Q3. D1-D10 의 *D* 는 뭐의 약자?**
Decision. PLAN_v1.0 의 Open Question 10종이 v1.1 에서 *결정* 으로 격상된 10 자리.

**Q4. AUDIT 결함을 어디서 처리하나?**
결함 ID 별로 *처리 자리* 가 INDEX §6.1 표의 *처리 자리* 컬럼에 박혀 있다. 예: F-01 은 `PLAN_v1.2 §2.3 + CODE_v1.1 §4.1`. 본 *처리 자리* 가 *어느 문서의 어느 §에서 갱신해야 결함이 해소되는지* 의 좌표.

**Q5. BRAND_v2 와 brand-system/ (41 문서) 의 차이는?**
brand-system 41 문서는 *uber-SAAI 우산 모드* 의 두꺼운 v1 풀. BRAND_v2 는 41 문서 위에 *deepingsource.io 회사 사이트 모드* 의 매핑 layer 만 얹은 *얇은 통합본*. v2 는 41 문서를 *다시 쓰지 않는다* — 우선순위 (§2) · 라우트 매핑 (§3) · 4-레이어 (§4) · 신설 식별 (§5) 만 추가. *움직이지 않는 한 줄들* 은 모두 v1 의 그대로.

**Q6. INVENTORY 4종은 SOT 인가?**
아니. INVENTORY 는 *Reference* (라이브 사이트·로컬 워크스페이스의 *상태 사진*). 결정은 PLAN_v1.1 이 가진다. 단, *라이브의 무엇이 있는지* (예: 88+ 매체 링크) 의 *사실 자리* 는 INVENTORY 에서만 확인 가능 — *원천 자료* 로서 SOT.

**Q7. CODE_v1 의 PR 18개를 어디서 시작해야 하나?**
CODE_v1 §2 의 의존 그래프 — PR-00 (i18n) → PR-00.5 (CSS) 가 *기반*. 머지되면 PR-01 ~ PR-14 의 13 개 PR 이 *대부분 병렬* 가능. PR-15 (redirects) · PR-17 (자산) · PR-18 (Webflow 교체) 만 *마지막 통합* 자리.

**Q8. Phase 5 는 언제 시작?**
AUDIT §9.3 결재 10건 완료 + PLAN_v1.2 갱신 + CODE_v1.1 갱신 후. *결재 sprint 1주* + *v1.x 갱신 1주* = 약 2주 소요 추정. 그 후 PR-15·17·18 머지로 Phase 5 진입.

---

## 10. 변경 이력

| 버전 | 일자 | 변경 |
|---|---|---|
| v1.0 | 2026-05-29 | 최초 발행 — docs/ 12 산출물의 카탈로그·의존 그래프·시나리오별 읽기 순서·페이즈 매핑·변경 영향 매트릭스·AUDIT 결함 추적·결재 대기 카드·FAQ. AUDIT_v1 의 29 결함 (Critical 3 + High 9 + Medium 11 + Low 6) 의 *처리 자리·결재 대기자·상태* 한 자리 통합. |
| v1.1 | 2026-05-29 | §0 현재 단계에 *Phase 4 코드 1차 구현 착수·완수* 반영 + §11 코드 구현 현황 신설. CODE_v1 의 PR-00~16 구조 골격을 `src/` 에 구현, `npm run build` 그린 (470 정적 페이지). |

---

## 11. Phase 4 코드 1차 구현 현황 (2026-05-29)

CODE_v1 의 19 PR 플랜 중 *구조 골격* 을 `src/` 에 1차 구현. **`npm run build` 그린 — 470 정적 페이지 생성, 오류·경고 0.** en/ko/jp 홈 프리렌더 HTML 에 두 마스터 카피 박힘 확인.

### 11.1 구현 완료

| PR | 내용 | 산출 |
|---|---|---|
| PR-00 | i18n 기반 | `src/lib/i18n.ts` (en 기본·`/ko`·`/jp`, 두 마스터 카피 풀) · 홈 3 로케일 라우트 (`/`, `/ko`, `/jp`) |
| PR-00.5 | corporate CSS | `globals.css` — accent `#376AE2` 통일 · `audience-corporate` + `.layer-{company,products,technologies,models}` · `.section-dark` · en 가독성 토큰 |
| PR-01 | 홈 재구성 | `src/components/corporate/` — CorporateHero · DomainShowcase · Weaving4Step · MasterPair · PartnerGrid · HomeView |
| PR-02~06 | 제품 | `/products` 진열대 + `/products/{store-insight,store-agent,store-care,saai}` (store-agent 에 briefingData live demo · L0→L5) |
| PR-07 | 기술 | `/technology/{anonymizer,seal,spatial-ai,models}` (Vision Models 카탈로그 18 카드) |
| PR-08 | 솔루션 | `/solutions/{retail,food-beverage,drug,large-space}` |
| PR-11 | 회사 | `/company/{about,news,career,partnership,investors}` |
| PR-12 | 리소스 | `/resources/{blog,blog/[slug],case-studies,docs,glossary,faq}` (blog 은 velite 재사용) |
| PR-14 | 법무 | `/legal/{privacy,terms}` + `/legal` (기존 privacy/terms 콘텐츠 재사용) |
| PR-15 | redirects·sitemap·robots | `next.config.ts` 신 IA redirects (제품·기술·회사·리소스·법무·인증 302) · `sitemap.ts` 신 IA + hreflang · `robots.ts` deepingsource.io |
| PR-16 | velite·네비 | `velite.config.ts` 비파괴 확장 (`lang`·`target` 기본값) · Header/Footer 신 30 라우트 IA |
| 메타 | layout | `layout.tsx` — deepingsource.io 메타·OG·JSON-LD·`audience-corporate` body 클래스 |

### 11.2 남은 작업 (후속 — 본 1차 범위 밖)

- **카피** — BRAND_v2 §5 신설 11 자리의 *실제 본문* 미작성 → 현재 마스터 카피 기반 합리적 한국어 초안. en/jp 본문은 홈만 작성, 그 외 라우트는 ko 중심.
- **다국어 라우트** — 홈은 `/`·`/ko`·`/jp` 물리 라우트로 *완전 번역*. 하위 30 라우트는 middleware 가 `/ko/*`·`/jp/*` 를 base 라우트로 rewrite (404 방지·한국어 fallback) + Header/Footer 로케일 인식 네비 + `LocaleSwitcher` (EN/KO/JP). 하위 라우트 *실제 번역 본문* 은 동일 패턴으로 확장 필요 (BRAND §5 en/jp 작성 의존).
- **PR-09·10** — `/enterprise`·`/pricing` 은 기존 페이지 유지 (신 IA 경로 일치). Golden Case 5단계·4 시작점 카드 재구성은 후속.
- **PR-03 live demo·PR-13 case-study 5건·PR-17 자산·PR-18 Webflow 교체** — 자산·실측 데이터·DNS 결재 의존 (AUDIT §7 결재 10건).
- **구 라우트 정리** — `/storeagent`·`/storecare`·`/storeinsight`·`/industries`·`/company`·`/about` 등은 redirects 로 신 IA 에 흡수되나 폴더는 잔존 (shadowed). 안정화 후 삭제 대상.
- **외부분기 redirects** — `/storeagent/{blog,sample,newsletter}` → saai.store·app.ds.io 는 미니사이트·발행 콘텐츠 보호 위해 보류 (Phase 5).
- **테스트** — 기존 실패 2종 (`pricing-data.test` 4→3 플랜 · `useScrollAnimation.test` React 19) 은 본 작업 무관 선존 결함.

### 11.3 2차 보강 (목업 부활 + i18n 동작 · 2026-05-29)

- **기존 목업 부활** — `src/components/mockups/` 자산을 신 페이지에 통합. 홈 `ProductPreview` (MultiStoreDashboardMockup) · `/products` 상단 플랫폼 미리보기 · `/products/store-agent` (AgentMockupShowcase + LiveDemoSection + BriefingMockup) · `/products/store-insight` (StoreInsightDesktopMockup + POSAnalysisSection) · `/products/store-care` (StoreCareMockup). 회사 홈 톤 유지 + 제품 시각 소개 정렬.
- **i18n 실동작** — middleware `/ko/*`·`/jp/*` rewrite (404 방지) + Header/Footer 로케일 인식 네비 + `LocaleSwitcher` (EN/KO/JP). **런타임 검증**: `/ko`·`/jp` 홈 완전 번역, `/ko/products` 404 없이 렌더, 콘솔 오류·하이드레이션 경고 0 (Playwright). `npm run build` 그린 (470 페이지).
- **잔여** — 하위 30 라우트의 *실제 번역 본문* 및 in-page 링크 로케일 prefix (현재 Header/Footer 만 prefix, 본문 링크는 base 경로) 는 후속. 페이지 메타 title 의 로케일별 분기도 후속.

— *끝.*
