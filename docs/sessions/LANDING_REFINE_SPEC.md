# LANDING_REFINE_SPEC — 랜딩(`HomeView`) 섹션별 실행 스펙 (draft)

> **상태:** ✅ EXECUTED (2026-06-22, commit `17da8fa`) — 결정 A1·B1·C2 채택, §3 순서대로 적용. 14블록→11, CTA 3→2, dark 3→2. (thesis 렌더는 6→3: Hero 1 + TrustCharter 2[차터+SoT 태그라인]가 floor.) `PAGE_CONTENT_REFINE_PLAN.md`(v2) §3 Phase L 을 섹션·카피 단위로 전개한 하위 스펙.
> **작성일:** 2026-06-22 · **카피 SOT:** `SAAI_AI_Handoff.md` → `src/lib/brand-canon.ts` · `src/lib/i18n.ts`(`homeCopy`). **규칙:** 새 카피를 발명하지 않고 *기존 canon 라인을 재배치·중복 제거*한다.
> **before 카피는 실제 소스에서 인용.** after 는 제안 초안(JUDGMENT) — 적용 전 카피 리뷰 대상.

---

## 0. 목표 지표 (before → after)

| 지표 | 현재 | 목표 |
|------|------|------|
| 콘텐츠 블록 | 14 | ~10 |
| CTA 밴드(중간+최종) | 3 (#7·#9·#14) | 2 (중간 1 + 최종 1) |
| /contact 직링크 | 4 (Hero·CtaBand×2·MasterPair·Closing 중) | 2~3 |
| dark 섹션 | 3 (#8·#10·#14) | 2 (#8·#14) |
| "누구가 아니라 무엇을" 홈 내 등장 | 4 | 2 (Hero 1 + TrustCharter 1) |
| 4스텝 루프 홈 내 등장 | 4 | 1 (ProblemBeat) |

---

## 1. 섹션별 스펙

### #1 Hero — `CorporateHero.tsx` · **유지 + 중복 제거**

- **현 상태:** `heroSub`(`i18n.ts:65`)가 ① "누구가 아니라 무엇을 어떻게" ② 4스텝 루프("관찰·분석·제안·학습")를 **둘 다** 서술. 게다가 우측 이미지 `figcaption`(`:27`)이 "누구가 아니라, 무엇을 어떻게"를 **재차** 반복 → Hero 한 블록에서 thesis 2회·loop 1회.
- **after (제안):** Hero는 thesis를 **1회만**. 루프 서술은 ProblemBeat에 양보.
  - `heroSub` before: `이미 달린 CCTV 위에서 — 누구가 아니라 무엇을 어떻게. 공간을 관찰하고, 분석하고, 제안하고, 학습하는 익명화 공간 AI입니다.`
  - `heroSub` after(초안): `이미 달린 CCTV 위에서 — 누구가 아니라 무엇을 어떻게. 영상은 남기지 않는, 익명화 공간 AI입니다.` *(루프 4동사 → 삭제, 익명화 강조로 대체)*
  - `figcaption`(`CorporateHero.tsx:27`) before: `누구가 아니라, 무엇을 어떻게 — 이미 달린 CCTV 위에서` → after: thesis 중복이므로 **시연 설명으로 전환** 예: `5명을 얼굴 없이 연속 추적 — ID만, 신원은 없이.`
- **CTA:** Hero 2개(상담·제품) 유지 — 최상단 1차 전환은 정당.
- **유형:** JUDGMENT (카피) · **검증:** thesis 2회·loop 0회로 감소 확인.

### #2 ProblemBeat — `ProblemBeat.tsx` · **유지 (4스텝 루프 단독 소유 지정)**
- 펀널(382→65, −317) + 통증 3카드 + bridge(`signature` "보는 AI를 넘어…") + **루프 리본**(`:165-201`). 강력 — 유지.
- **결정:** 홈에서 4스텝 루프의 **유일한 시각화 소유자**. #1·#3·#8의 루프 표현은 여기로 수렴.
- 유형: 유지(무변경).

### #3 ProductPreview — `ProductPreview.tsx` · **유지 + 2건 중복 제거**
- feature3(`:29`) before: `관찰 · 분석 · 제안 · 학습` / `필요한 순간만 골라 알리고, 다음 한 수까지 제안합니다.`
  → after: 루프 라벨 제거, 기능 가치로. 예 제목 `필요한 순간만, 다음 한 수까지` (라벨 4단어 삭제).
- sub(`:23`) "한 매장이 아니라, 브랜드 전체가 하나같이" — MasterPair와 중복. **여기를 단독 소유**(MasterPair 제거 시 자동 해소, L-6).
- 유형: JUDGMENT.

### #4 CaseBand — `CaseBand.tsx` · **유지(콘텐츠 교체 예약)**
- 예시 3건("예시/Illustrative"). Phase **C-3 실측 case-study** 완료 시 "예시" → 실측 1건 이상으로 교체(honesty 마커 축소). 구조 변경 없음.
- 유형: 콘텐츠(후속).

### #5 TrustCharter — `TrustCharter.tsx` · **유지 (thesis 단독 소유)**
- "누구가 아니라 무엇을" 계열의 **단독 소유자**로 지정. 익명화 3약속은 고유 자산 — 유지.
- 유형: 유지.

### #6 역량(MTMC) — `SpatialTrajectoryMockup` (HomeView 인라인 `:111`) · **유지**
- TrustCharter("안전")와 페어("유능"). 고유. 유지.

### #7 CTA A `CtaBand kind=trust` — `CtaBand.tsx:17-21` · **재작성 또는 제거** ⟵ 결정 A
- before(`:18`): `안전하게 보고, 정확하게 읽습니다 — 영상은 남기지 않고, 누구가 아니라 무엇을 어떻게.` → #5 TrustCharter 반복.
- **옵션 A1(권장):** 중간 CTA 1개로 **재작성** — 전진형(다음 단계 안내), thesis 반복 금지.
  - after(초안): `세 store를 한 흐름으로 — 우리 매장엔 어떤 조합이 맞을까요?` / 버튼 `맞는 조합 찾기`
  - 위치: SolutionTimeline(#8) **직후**로 이동(제품 맥락 후 전환이 자연스러움). 그러면 #7은 사라지고 #9 자리에 단일 CTA.
- **옵션 A2:** #7·#9 둘 다 제거 → 중간 CTA 0개(전환은 SolutionTimeline 카드 클릭 + 최종 CTA에 의존).
- 유형: JUDGMENT · **합의 필요.**

### #8 SolutionTimeline (dark) — `SolutionTimeline.tsx` · **유지 + eyebrow 루프 제거**
- eyebrow(`:38`)가 `loopLabel`(관찰·분석·제안·학습) — 루프 4번째 등장. → after: eyebrow를 시간축 태그라인 "어제 · 지금 · 다음" 또는 제품 카테고리로 교체(루프 라벨 제거).
- sub(`:40`) "어제를 읽고, 지금을 알리고, 다음을 실행" — 단독 소유(여기). #9 CtaBand-product 제거로 중복 해소.
- 유지(dark 1/2).

### #9 CTA B `CtaBand kind=product` — `HomeView.tsx:127` · **제거**
- before(`CtaBand.tsx:23`): `어제를 읽고, 지금을 알리고, 다음을 실행합니다 …` → #8 sub와 **정확 중복**.
- **조치:** 호출 제거. (옵션 A1 채택 시, 재작성된 단일 CTA가 이 위치를 대신.)
- 유형: OBJECTIVE.

### #10 MasterPair (dark) — `MasterPair.tsx` · **제거/이전** ⟵ 결정 B
- dark + bridge "한 매장이 아니라, 브랜드 전체가 하나같이"(`:14`, #3 sub와 중복) + 자체 CTA 2개(상담·storecare.ai).
- **옵션 B1(권장):** `/company/about`로 **이전**(회사 약속↔점주 약속 미러는 about에 더 적합). 홈에서 제거 → dark 3→2, 중복 해소.
- **옵션 B2:** owner-CTA("첫 달 무료" → storecare.ai)만 **#14 Closing의 보조 버튼**으로 흡수 후 제거.
- masterCompany/masterOwner 카피(`i18n.ts:63-64`)는 about로 함께 이동.
- 유형: JUDGMENT · **합의 필요.**

### #11 SpacesShowcase — `SpacesShowcase.tsx` · **유지**
- breadth(리테일 너머 모든 공간). 고유 — 유지.

### #12 PartnerGrid — `PartnerGrid.tsx` · **유지 (실제 proof)**
- 특허·파트너 브랜드·업종·NVIDIA + 8개 브랜드 칩. 홈의 *진짜* 증거 블록 — 유지.

### #13 PurposeBand — `PurposeBand.tsx` · **유지 / Closing 병합 검토** ⟵ 결정 C(소)
- closing "측정할 수 있으면, 나아질 수 있습니다." + statement. #14와 톤(감정 크레센도) 중복.
- **옵션 C1:** 유지하되 #14 헤딩과 역할 분리(여기=목적 선언, #14=행동 요청).
- **옵션 C2(권장):** PurposeBand statement를 #14 Closing 상단 도입부로 흡수, PurposeBand 블록 제거 → 엔딩 1회 크레센도, 블록 −1.
- 유형: JUDGMENT.

### #14 Closing CTA (dark) — `HomeView.tsx:138-180` · **유지**
- seam + cta.heading/sub + 2버튼(상담·제품) + 워터마크. 최종 전환 — 유지(dark 2/2).

---

## 2. 정제 후 구성안 (옵션 A1 + B1 + C2 채택 시)

```
1 Hero (thesis 1회·loop 0회, CTA 2)        light
2 ProblemBeat (루프 단독)                   light
3 ProductPreview (루프·중복 제거)            light
4 CaseBand (→ C-3 실측 교체)                light
5 TrustCharter (thesis 단독)                light
6 역량 MTMC                                 light
7 SolutionTimeline (eyebrow 루프 제거)       dark ①
8 [단일 중간 CTA] (재작성, 전진형)            light
9 SpacesShowcase                            light
10 PartnerGrid (proof)                       light
11 Closing CTA (+PurposeBand statement 흡수) dark ②
```

→ 14블록→**11블록**, CTA 3→**2**, dark 3→**2**, 중복 메시지 5종 → 각 1곳.
*(MasterPair·PurposeBand·CtaBand-product 제거, CtaBand-trust→단일 중간 CTA로 재작성)*

---

## 3. 적용 순서 (합의 후)

1. **OBJECTIVE 먼저(저위험):** #9 제거, #3 feature3 루프 라벨 제거, #8 eyebrow 교체.
2. **JUDGMENT(카피):** #1 heroSub/caption, #7 재작성, #5 단독화 확인.
3. **구조(합의 종속):** #10 MasterPair 이전(B), #13 PurposeBand 병합(C2).
4. **검증:** `npm run build` + `tsc` + `lint:tokens` + `/`·`/ko`·`/jp` 스샷 → §0 지표표 재측정.

---

## 4. 미해결 결정 (적용 전 확정)

- **A — 중간 CTA:** A1 재작성 1개(권장) / A2 0개.
- **B — MasterPair:** B1 about 이전(권장) / B2 Closing 흡수.
- **C — PurposeBand:** C2 Closing 병합(권장) / C1 유지·역할 분리.

> A·B·C만 정하면 §2 구성안이 확정되고 §3 순서대로 적용 가능. 카피 after 초안은 전부 리뷰 후 확정.
