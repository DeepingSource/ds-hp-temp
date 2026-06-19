# BRAND_REFLECTION_PLAN — 브랜드 캐논의 홈페이지 반영 계획 v1

**작성** 2026-05-29
**목적** `brand-system/` 의 브랜드 캐논(Architecture v3.3 · Copy Master v2 · Master Copy Decision v1 · Voice Guidelines)을 deepingsource.io 기업 사이트에 더 깊이 반영하기 위한 실행 계획.
**SOT (이 계획의 근거)**
- `brand-system/01_brand_system/SAAI_Brand_Architecture_v3.md` (v3.3-draft)
- `brand-system/02_messaging/SAAI_Brand_Copy_Master_v2.md`
- `brand-system/02_messaging/SAAI_Master_Copy_Decision_v1.md`
- `brand-system/01_brand_system/SAAI_Brand_Voice_Guidelines_v2.md`

> **전제 / 주의** — Architecture v3.3 과 Copy Master v2 는 **"Brand Council 합의 대기(Draft)"** 상태다. 특히 SEED·SOURCE·SOLUTION 식 메타포와 Weaving META 4(Seam·Thread·Knot·Weave)는 내부 구조 언어이며, META 4 의 Stage 는 **Planned = "외부 노출 금지"**(Architecture §8). 따라서 본 계획은 *카피·서사로서의 반영*과 *제품/엔진 명칭의 외부 노출*을 엄격히 구분한다. §3 의사결정 포인트에서 확정 필요.

---

## 1. 캐논 ↔ 현재 사이트 격차 (코드 확인 기반)

| # | 브랜드 캐논 요소 | 현재 상태 | 근거 위치 |
|:-:|---|---|---|
| 1 | **시그니처 5글자 "사이를 메웁니다."** | ✗ 빠짐 (제품명 SAAI 정의에만 "사이" 차용, 시그니처 슬로건 없음) | `CorporateHero.tsx:24` eyebrow = "Anonymized Spatial AI · SAAI" |
| 2 | 본사 마스터 "모든 매장을 한 매장처럼" / *Every store, like one.* | ✓ 반영 (h1) | `i18n.ts:56,63`, `CorporateHero.tsx:27`, `MasterPair.tsx:25` |
| 3 | 점주 마스터 "우리 매장이 대표 매장처럼" / *Our store, like the best.* | ✓ 반영 | `i18n.ts:57,64`, `MasterPair.tsx:29` |
| 4 | 카테고리어 "익명화 공간 AI / Anonymized Spatial AI / SAAI" | ✓ 반영 | `CorporateHero.tsx:24`, `i18n.ts:65` |
| 5 | 비전 "Perfect Every Space / 모든 공간을 완벽하게" | ✓ 반영 | `AboutView.tsx`, `company-data.ts` |
| 6 | **Weaving 4단계 정식명 Seam·Thread·Knot·Weave** + *Read the Seam. Follow the Thread. Tie a Knot. Weave the Next.* | △ 부분 (구조는 있으나 명칭이 일반어 Observe·Understand·Decide·Act / 관찰·이해·판단·실행 로 치환됨) | `Weaving4Step.tsx:16-31` |
| 7 | **3 SOLUTION 태그라인** Store Insight=*어제의 사이* / StoreCare=*지금의 사이* / StoreAgent=*다음의 사이* | ✗ 빠짐 (제품명만, 시간축 태그라인 없음) | `ProductPreview.tsx`, 각 `*View.tsx` |
| 8 | **SEED·SOURCE·SOLUTION 식 메타포 (재료→소스→답)** | ✗ 빠짐 (DomainShowcase 는 company/products/technologies 3레이어로만 표현) | `DomainShowcase.tsx:16-37` |
| 9 | **회사 한 줄 "2018년부터 영상의 익명화를 깎아 온 회사."** | ✗ 빠짐 ("2018년 설립" 사실만 존재) | `company-data.ts`, `AboutView.tsx` |
| 10 | **"DeepingSource = Deep Learning + Source"** 이름 유래 | ✗ 빠짐 | 전역 검색 0건 |
| 11 | Voice 규칙: 감시 어휘(감시·CCTV·추적·통제) 배제, 익명화·지원·권고 어휘 | △ 대체로 준수 (단 일부 mockup/섹션에 "감지·알림" 위주, 명문화된 가드 없음) | 전반 |
| 12 | CTA 척추: SMB "첫 달 무료로 받기" / 본사 "카드 한 장 받아보기" | △ 일반 CTA("도입 상담")로 대체됨 | `HomeView.tsx`, `i18n.ts` |

**요약:** 두 마스터 카피·카테고리어·비전은 강하게 박혀 있다. **빠진 것은 "브랜드의 결(texture)"** — 시그니처(사이를 메웁니다), 식(食) 메타포, Weaving 정식 서사, 3 솔루션 시간축 태그라인, 창업 서사다.

---

## 2. 반영 원칙 (이 작업의 철칙)

1. **카피 척추 = SOT.** 새 카피를 창작하지 않는다. Copy Master v2 §1 척추 15줄 + §4 Weaving 5변형 + Master Copy Decision §7 인벤토리에서 *가져다 박는다*.
2. **시그니처 ≠ 마스터.** "사이를 메웁니다."(시그니처)는 마스터 카피("모든 매장을 한 매장처럼")를 *대체하지 않고 받친다*. 마스터는 h1 자리, 시그니처는 eyebrow/카테고리어 자리.
3. **두 마스터는 한 줄에 묶지 않는다.** (Master Copy Decision §2.4) 본사/점주는 다른 면·다른 섹션에 분리. 현재 `MasterPair` 의 상하 분리 구조는 합치 → 유지.
4. **외부 노출 Stage 가드.** Live 제품만 전면 노출. Planned(Space Insight/Care/Agent, META 4 엔진명, ATOMIC Planned 8)은 *제품명으로 노출 금지*. Weaving 은 **서사(narrative)로만** 쓰고 엔진/제품으로 명명하지 않는다.
5. **i18n 3-locale 동시.** 모든 신규 카피는 ko(verbatim)·en(executive)·jp(丁寧体) 3종을 같은 커밋에서. 데이터 파일은 기존 오버레이 패턴 유지(미니사이트 보호).
6. **감시 어휘 배제.** 신규/수정 카피에서 감시·CCTV(도발 카피 제외)·추적·통제·대체 어휘 금지 → 익명화·이해·권고·지원·위임으로.

---

## 3. 의사결정 포인트 (착수 전 확정 필요)

| # | 결정 | 선택지 | 추천 |
|:-:|---|---|---|
| **D1** | Weaving 정식명(Seam·Thread·Knot·Weave)을 **외부 노출**할까? | (a) 영문 서사 한 줄만 노출(*Read the Seam…*), 단계 카드는 일반어 유지 / (b) 단계 카드 제목을 Seam·Thread·Knot·Weave 로 교체 / (c) 현행 유지 | **(a)** — Stage=Planned 가드 준수하면서 브랜드 결은 살림. 서사는 hero 보조/About 매니페스토 자리에. |
| **D2** | SEED·SOURCE·SOLUTION 메타포를 어디까지 노출? | (a) About/회사 페이지의 "방법론" 섹션에만 (b) 홈 DomainShowcase 까지 (c) 노출 안 함(내부 전용) | **(a)** — 내부 구조 언어라 홈 전면보다 About 의 "우리가 일하는 법"에 적합. 홈은 식 메타포 *암시*만. |
| **D3** | 3 SOLUTION 시간축(어제·지금·다음의 사이) 노출 깊이? | (a) ProductPreview/제품 카드에 태그라인으로 (b) 각 제품 View hero 에도 (c) 둘 다 | **(c)** — 임팩트 대비 난이도 낮고 캐논 정합 높음. |
| **D4** | CTA 카피를 척추("첫 달 무료로 받기"/"카드 한 장 받아보기")로 교체? | (a) 교체 (b) 현행 "도입 상담" 유지 | **(b) 유지 + 점주 자리에만 (a)** — 기업 사이트 본문은 중립 CTA, SMB/점주 섹션에만 척추 CTA. |

> D1~D4 는 **사용자 확정 후 착수**. 미확정 시 추천안(굵게)으로 진행 가능.

---

## 4. 실행 계획 (Phase 별 · 파일 매핑 · 검증)

### Phase 0 — 캐논 상수화 (기반)
새 카피를 한 곳에 모아 재사용. **파일:** `src/lib/brand-canon.ts` (신규)
- `signature` (사이를 메웁니다 / We weave the in-between / 間を、メウ。) — *jp 표기는 확정 필요*
- `companyLine` (2018년부터 영상의 익명화를 깎아 온 회사. / Since 2018… / 2018年から…)
- `nameOrigin` (DeepingSource = Deep Learning + Source)
- `weavingNarrative` (Read the Seam. Follow the Thread. Tie a Knot. Weave the Next. + 한글/압축 변형)
- `solutionTaglines` (insight/care/agent × locale → 어제·지금·다음의 사이)
- `seedSourceSolution` (3 family 약속 한 줄 × locale)
→ **검증:** 타입 컴파일 통과, 기존 `i18n.ts`/`company-data.ts` 와 키 충돌 없음.

### Phase 1 — 시그니처 + 창업 서사 (D 불필요, 즉시)
| 작업 | 파일 | 변경 |
|---|---|---|
| Hero eyebrow 에 시그니처 결합 | `CorporateHero.tsx:24` | "Anonymized Spatial AI · SAAI" 아래/옆에 *사이를 메웁니다.* 보조 노출 |
| 회사 한 줄 노출 | `AboutView.tsx` (히어로 또는 연혁 도입부) | "2018년부터 영상의 익명화를 깎아 온 회사." 박기 |
| 이름 유래 | `AboutView.tsx` 또는 `FaqView`/glossary | "DeepingSource = Deep Learning + Source" 한 문장 |
→ **검증:** `/`, `/ko`, `/jp`, `/company/about` 런타임에서 3 locale 노출 확인.

### Phase 2 — 3 SOLUTION 시간축 태그라인 (D3)
| 작업 | 파일 |
|---|---|
| 제품 미리보기 카드에 시간축 라벨 | `ProductPreview.tsx` 또는 제품 카드 컴포넌트 |
| 각 제품 hero 에 태그라인 | `StoreInsightView.tsx`(어제의 사이) · `StoreCareView.tsx`(지금의 사이) · `StoreAgentView.tsx`(다음의 사이) |
→ **검증:** 3 제품 페이지 × 3 locale 에서 태그라인 정확 노출.

### Phase 3 — Weaving 서사 (D1)
| 작업 | 파일 |
|---|---|
| D1=(a): 영문 서사 한 줄을 Weaving 섹션 헤더 보조/About 매니페스토에 추가 | `Weaving4Step.tsx`, `AboutView.tsx` |
| (선택 D1=b): 단계 카드 제목 Seam·Thread·Knot·Weave + 부제 일반어 | `Weaving4Step.tsx:16-43` |
→ **검증:** Stage 가드 — 엔진/제품명으로 오해될 표기 없는지 카피 리뷰.

### Phase 4 — 식(食) 메타포 / 방법론 (D2)
| 작업 | 파일 |
|---|---|
| About 에 "우리가 일하는 법 — 씨앗에서 답까지(SEED→SOURCE→SOLUTION)" 섹션 | `AboutView.tsx` (+ 필요시 신규 섹션 컴포넌트) |
| 홈 DomainShowcase 카피에 식 메타포 *암시*(전면 명명 X) | `DomainShowcase.tsx` |
→ **검증:** Planned 자산 미노출, 3 locale 정합.

### Phase 5 — Voice 가드 + CTA (D4)
| 작업 | 파일 |
|---|---|
| 감시 어휘 스윕(도발 카피 의도 제외) | 전역 grep → 개별 수정 |
| 점주/SMB 섹션 CTA 를 척추 카피로 | 해당 섹션 컴포넌트 |
→ **검증:** `npm run build` 그린, lint 클린, 3 locale 런타임 스팟체크.

---

## 5. 작업 운영 규칙 (기존 세션 패턴 계승)
- 대량 편집 전 dev 서버 중지 → 편집/에이전트 → `npm run build` → dev 재기동 → Playwright 런타임 검증.
- 공유 파일(i18n·Header·Footer·globals·middleware·brand-canon)은 직접 편집, 디스조인트 View 폴더는 병렬 서브에이전트.
- 데이터 다국어화는 *오버레이 파일*로(원본 shape 불변, 미니사이트 agent.saai.store 보호).

## 6. 성공 기준 (Definition of Done)
1. §1 격차표의 ✗ 6건(시그니처·Weaving 서사·3태그라인·식메타포·창업서사·이름유래) → ✓/△(의도적 범위 한정).
2. 신규 카피 전부 SOT 척추에서 인용(창작 0).
3. 3 locale(ko/en/jp) 동시 노출, `npm run build` 그린, lint 클린.
4. Planned/내부 전용 자산(META 4 엔진명, Space* 제품, ATOMIC Planned)은 외부 미노출.
5. 감시 어휘 0(의도된 도발 카피 제외).

---

## 7. 미해결/확인 필요
- ~~시그니처/서사의 jp 표기 확정~~ → **확정 완료(2026-05-29)**. 핵심: 사이/in-between 을 직역 *埋める*(fill) 대신 **紡ぐ**(weave, EN "We weave the in-between" + Weaving 체계 정합)로. 시그니처 명사 사이=間(あいだ), 제품 태그라인은 あいだ "기간" 오독·`次の間`("다음 방") 충돌을 피해 すき間 사용. `brand-canon.ts` NOTE(jp) 참조.
- ~~D1~D4 확정~~ → **확정 완료**: D1=(a)·D2=(a)·D3=(c)·D4=(b). Phase 1~5 구현·검증 완료.
- Architecture v3.3 Draft 의 Brand Council 승격 여부(승격 전이면 SEED·SOURCE·SOLUTION 노출은 "Draft 기준" 주석). — **잔여**

---
*근거: brand-system Architecture v3.3 · Copy Master v2 · Master Copy Decision v1 · Voice Guidelines v2 / 코드 감사 2026-05-29.*
