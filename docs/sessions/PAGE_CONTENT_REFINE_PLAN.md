# DS_NEW_HP — 페이지·콘텐츠 정제 계획 (v2 — 세부 실행)

> **상태:** 🟡 DRAFT (세부) — 합의 대기. 아직 코드/콘텐츠 미수정. file 단위 결정·작업 항목·검증 기준을 담은 실행 계획.
> **작성일:** 2026-06-22 · **상위:** v1 draft 동일 파일 · **선행:** 6/19 세션 4종(CLEANUP·STABILIZATION·REFACTOR·BRAND_ALIGN) 출하 완료.
> **라이브 SOT:** repo-root `DESIGN.md`(토큰·프리미티브) + `src/`. 카피는 `SAAI_AI_Handoff.md`·`BRAND_v2`(보이스) 준수.
> **표기:** **결정(제안)** = 권장안, 적용 전 사용자 확정 대상. **OBJECTIVE** = 기계적·저위험. **JUDGMENT** = 카피/시각 판단, 시각 검증 필요.

---

## 0. 한 페이지 요약

사이트는 출하됐지만 **노출 면이 과밀**하고 **콘텐츠 자산이 분류·노출에서 샌다.** 본 계획은 4초점(**구조 단순화 · 카피 정리 · 시각 일관성 · 콘텐츠 충실화**)을 **페이지 한 장씩** 적용한다.

핵심 레버 3가지:
1. **랜딩** — 14블록·CTA 3·dark 3 → **~10블록·CTA 2·dark 2**. 가장 큰 단순화는 *메시지 중복 제거*(아래 §1.1 중복 매트릭스)다.
2. **제품 4종** — 섹션 수 7/6/3/3로 제각각, care·saai는 CTA조차 없음 → **공유 골격 5섹션 + 프리미티브 통일**.
3. **콘텐츠** — 196글이 3분류로 붕괴, case-study 0건, `/ko` 블로그 없음 → **분류 복원 + KO 블로그 + case-study 5건**.

**순서(합의됨):** 랜딩 → 제품 4 → 솔루션 4, 콘텐츠 트랙(C)은 병행.

---

## 1. 진단 (file 단위)

### 1.1 랜딩 — 14블록 + **메시지 중복 매트릭스**

렌더 순서(`HomeView.tsx`)와 정제 판정:

| # | 블록 | 파일 | 배경 | 판정(제안) |
|---|------|------|------|-----------|
| 1 | Hero | `CorporateHero.tsx` | light | **유지** |
| 2 | ProblemBeat | `ProblemBeat.tsx` | light(alt) | **유지** — 4스텝 루프의 *단독 소유*로 지정 |
| 3 | ProductPreview | `ProductPreview.tsx` | light | **유지** — 단 루프·중복 카피 제거 |
| 4 | CaseBand (예시 3건) | `CaseBand.tsx` | light(alt) | **유지(콘텐츠 교체)** — Phase C-3 실측 case-study로 "예시" 대체 |
| 5 | TrustCharter | `TrustCharter.tsx` | light | **유지** — 익명화 메시지 단독 소유 |
| 6 | 역량(MTMC) | `SpatialTrajectoryMockup` | light | **유지** |
| 7 | **CTA A** | `CtaBand kind=trust` | — | **재작성 or 제거** — #5 TrustCharter 문구 반복 |
| 8 | SolutionTimeline | `SolutionTimeline.tsx` | **dark** | **유지** — "어제·지금·다음" + 3제품 단독 소유 |
| 9 | **CTA B** | `CtaBand kind=product` | — | **제거** — #8 sub와 문구 *정확히 중복* |
| 10 | MasterPair | `MasterPair.tsx` | **dark** | **제거/이전 후보** — dark·중복 bridge·자체 CTA 2개 |
| 11 | SpacesShowcase | `SpacesShowcase.tsx` | light | **유지** — breadth(고유) |
| 12 | PartnerGrid | `PartnerGrid.tsx` | light | **유지** — 실제 proof(지표·브랜드) |
| 13 | PurposeBand | `PurposeBand.tsx` | light(alt) | **유지/병합 검토** — #14와 톤 중복 |
| 14 | Closing CTA | inline `HomeView.tsx:138-180` | **dark** | **유지** — 최종 전환 |

**중복 매트릭스 — 같은 메시지가 여러 곳에서 반복(정제의 핵심 근거):**

| 반복 메시지 | 출현 위치 | 횟수 | 조치(제안) |
|------------|----------|------|-----------|
| "누구가 아니라, 무엇을 어떻게"(category thesis, ≠ `signature`) | **heroSub `i18n.ts:65`** · Hero caption `CorporateHero.tsx:27` · TrustCharter caption `:29` · CtaBand trust `:18` | **4×** (Hero가 자체로 2회) | TrustCharter 단독 소유; Hero는 heroSub or caption 중 1회만; CtaBand 삭제 |
| 4스텝 루프 "관찰·분석·제안·학습 / Observe·Analyze·Suggest·Learn"(`operatingLoop`) | **heroSub `i18n.ts:65`** · ProblemBeat 리본 `:165-201` · SolutionTimeline eyebrow `:38` · ProductPreview feature3 `:29` | **4×** | ProblemBeat 리본 단독 소유 → heroSub 축약 + ProductPreview feature3·SolutionTimeline eyebrow에서 제거 |
| `signature` "보는 AI를 넘어, 매장을 운영하는 AI."(별개 라인) | ProblemBeat bridge(`brand-canon.ts signature`) | 1× | 단독 — 유지 |
| "어제를 읽고, 지금을 알리고, 다음을 실행" | SolutionTimeline sub `:40` · CtaBand product `:23` | **2× (인접)** | CtaBand-product(#9) 제거로 해소 |
| "영상은 남기지 않~" | TrustCharter heading `:26` · CtaBand trust `:18` | **2×** | CtaBand-trust(#7) 재작성/제거로 해소 |
| "한 매장이 아니라, 브랜드 전체가 하나같이" | ProductPreview sub `:23` · MasterPair bridge `:14` | **2×** | MasterPair(#10) 제거/이전로 해소 |

**전환점(CTA 링크) 과다:** Hero 2 + CtaBand-trust 1 + CtaBand-product 1 + MasterPair 2 + Closing 2 = **8개 링크, 그중 /contact 4개.** 한 페이지에 동일 목적지 반복이 과함.

> **정제 후 목표:** 블록 14→~10, CTA 밴드 3→2(중간 1 + 최종 1), dark 3→2, 중복 메시지 5종 → 각 1곳 단독 소유.

### 1.2 제품 4종 — 섹션 수 격차 + 프리미티브 미통일

| 페이지 | 파일 | LOC | 섹션 시퀀스 | CTA 섹션 | `<Section>` |
|--------|------|-----|------------|---------|------------|
| products(허브) | `ProductsView.tsx` | 446 | Hero / 매일받는답 / 확장도구 / 기술기반 / CTA | ✅ | ✅ |
| store-insight | `StoreInsightView.tsx` | 581 | Hero / 대시보드목업 / 가설카드 / Funnel-KPI / Before-After / POS교차 / CTA(dark) | ✅ | ❌ raw |
| store-agent | `StoreAgentView.tsx` | 265 | Hero(dark) / How / Autonomy Ladder / 목업 / Pricing teaser / CTA(dark) | ✅ | ❌ raw |
| store-care | `StoreCareView.tsx` | 188 | Hero / 목업 / Value 3카드 | **❌ 없음** | ❌ raw |
| saai | `SaaiView.tsx` | 154 | Hero / 통합신호루프 / Features 3카드 | **❌ 없음** | 부분 |

**진단:** ① 섹션 수 7/6/3/3 — 비교·탐색 불가능할 만큼 불균형. ② **care·saai에 CTA 섹션 없음** — 전환 누수. ③ store-agent는 Hero·CTA **둘 다 dark** → 페이지가 무겁다. ④ 4개 모두 raw 마크업(`text-3xl sm:text-4xl font-bold …` 반복) — DESIGN.md "touch 시 프리미티브 swap" 대상.

### 1.3 솔루션 4종 — 골격 유사 + 쌍둥이 중복 + 이원 소스

| 페이지 | 파일 | LOC | 시퀀스 |
|--------|------|-----|--------|
| retail | `RetailView.tsx` | 446 | Hero(dark) / 3시나리오 / Before-After / 후기 / CTA |
| large-space | `LargeSpaceView.tsx` | 304 | Hero / 3시나리오 / MTMC적용 / 후기 / CTA |
| food-beverage | `FoodBeverageView.tsx` | 231 | Hero / 시나리오 / 후기 / CTA |
| drug | `DrugView.tsx` | 231 | Hero / 시나리오 / 후기 / CTA |

**진단:** ① 골격 일관도 높음(Hero→시나리오→[증거]→후기→CTA). ② **food-beverage·drug가 231 LOC 쌍둥이** — 거의 동일 구조, 차별화 빈약. ③ `SolutionDetailView.tsx`(384 LOC, 동적 `[slug]`)와 정적 4 View가 **공존** → 한 업종을 두 경로로 렌더할 위험·유지보수 중복. ④ 후기·지표가 "(가상)"일 가능성(콘텐츠 트랙 연결).

### 1.4 콘텐츠 — `.velite/articles.json` 실측

| 폴더(물리) | 글 | `category` 실제값 |
|-----------|----|-----|
| insight | 73 | insight |
| tip | 53 | **guide** |
| season | 25 | **guide** |
| guide | 19 | guide |
| weekly | 26 | weekly |
| case-study | **0** | — |
| **합계 196** | | **guide 97 · insight 73 · weekly 26** |

**진단:** ① tip+season 78글이 `guide`로 뭉개져 분류 소실. ② case-study 0(스키마·`CaseStudiesView.tsx` 40KB 존재). ③ blog 라우트가 `src/app/resources/blog/`(무접두)에만 — **`/ko/resources/blog` 없음**(1차 시장 진입로 부재, 글은 `lang:ko` 기본). ④ per-article Article JSON-LD·OG·canonical 일관성 미검증.

---

## 2. 정제 원칙 (페이지 공통 룰)

1. **구조** — 한 페이지 = 한 결론 + 1차 CTA 1개(+최종 1). 같은 역할 블록은 1개로 수렴. dark ≤2.
2. **카피** — 헤드라인=결론문장, 본문=근거, CTA=동사+이득. *중복 메시지는 한 곳만 소유*(§1.1 매트릭스).
3. **시각** — raw → `<Section>/<Container>/<Eyebrow>/<Card>/<IconChip>` swap. 하드코딩 hex/weight 금지. 제품·솔루션은 공유 골격.
4. **콘텐츠** — "(가상)" → 실측/근거. 빈 섹션 보강 또는 제거.

**페이지별 공통 검증:** `npm run build`(SSG 그린) → `npx tsc --noEmit` → `npm run lint:tokens` → `/styleguide` 토큰 대조 → 해당 라우트 `/`·`/ko`·`/jp` 스크린샷 before/after diff(스크롤 길이·dark 분포 확인).

---

## 3. Phase L — 랜딩 (최우선)

목표: 14→~10블록, CTA 3→2, dark 3→2, 중복 5종 단독화.

| ID | 작업 | 파일·위치 | 유형 | 검증 |
|----|------|----------|------|------|
| **L-1** | **CtaBand-product(#9) 제거** — `SolutionTimeline` sub(`:40`)와 문구 정확 중복 | `HomeView.tsx:127` (호출부 삭제) | OBJECTIVE | 빌드 그린; 중간 CTA 1개 남음 |
| **L-2** | **CtaBand-trust(#7) 재작성** — TrustCharter 반복 중단, *전진형*("기능 비교"·"맞는 조합")으로 전환. (또는 #7도 제거하고 SolutionTimeline 직후 단일 CTA 1개로 재배치) | `CtaBand.tsx:17-21` 카피 / `HomeView.tsx:121` 위치 | JUDGMENT | 카피 리뷰 + 3로케일 스샷 |
| **L-3** | **MasterPair(#10) 처리** — dark·중복 bridge·CTA 2개. (a)`/company/about`로 이전, 또는 (b)owner-CTA만 Closing에 흡수 후 제거 | `MasterPair.tsx` 전체 / `HomeView.tsx:131` | JUDGMENT | dark 3→2 확인; about 페이지 정합 |
| **L-4** | **4스텝 루프 단독화** — ProblemBeat 리본만 남기고 ProductPreview feature3(`:29`)·SolutionTimeline eyebrow(`:38`)에서 루프 표현 제거/대체 | `ProductPreview.tsx:29` · `SolutionTimeline.tsx:38` | JUDGMENT | 루프 3×→1× 확인 |
| **L-5** | **"누구가 아니라 무엇을" 단독화** — TrustCharter가 단독 소유. Hero는 heroSub·caption 중 1회만(현재 2회), CtaBand trust는 삭제(L-2). ProblemBeat bridge는 별개 `signature`이므로 유지 | `i18n.ts:65`(heroSub) · `CorporateHero.tsx:27`(caption) | JUDGMENT | 카피 리뷰; 홈 내 등장 4→2 |
| **L-6** | **"브랜드 전체가 하나같이" 단독화** — ProductPreview sub(`:23`) 유지, MasterPair 제거로 자동 해소(L-3 종속) | `ProductPreview.tsx:23` | OBJECTIVE | L-3 후 확인 |
| **L-7** | **PurposeBand(#13)·Closing(#14) 톤 정리** — 둘 다 감정 크레센도. PurposeBand 카피를 Closing 도입부로 흡수 또는 한쪽 압축 | `PurposeBand.tsx` · `HomeView.tsx:138-180` | JUDGMENT | 스샷; 엔딩 1회 크레센도 |
| **L-8** | **검증** — build/tsc/lint:tokens + 3로케일 스샷 + 블록/CTA/dark 카운트 before-after | — | — | §2 검증 일체 |

> **합의 포인트(전환 직결):** L-2(중간 CTA를 1개 재작성 vs 0개로) · L-3(MasterPair 제거 vs 이전). 둘 다 전환·정보구조에 영향 → 적용 전 확정.
> **종속:** L-6←L-3. L-8은 마지막.

## 4. Phase P — 제품 4종

목표: **공유 골격 5섹션** 적용 + 프리미티브 통일 + care·saai CTA 신설.

**공유 골격(제품 상세):**
`① Hero(결론 h1 + 1차 CTA) → ② 핵심 증거(제품 목업/대시보드) → ③ 작동 방식(3~4스텝) → ④ 보조 증거(Before-After or 지표/래더) → ⑤ CTA(1개; dark는 페이지당 최대 1)`

| ID | 작업 | 대상 | 유형 |
|----|------|------|------|
| **P-1** | 4 View 섹션을 공유 골격에 매핑, 과잉/누락 식별표 작성 | 4 View | — |
| **P-2** | **store-insight 슬림화** — 7섹션(가설카드·Funnel-KPI·POS교차 중 중복) → 5섹션 정리 + 프리미티브 swap | `StoreInsightView.tsx` | JUDGMENT |
| **P-3** | **store-agent dark 완화** — Hero·CTA 둘 중 하나 light화; Autonomy Ladder 유지 | `StoreAgentView.tsx` | JUDGMENT |
| **P-4** | **store-care CTA 신설** — 골격 ⑤ 추가(현재 3섹션 종료) | `StoreCareView.tsx` | OBJECTIVE |
| **P-5** | **saai CTA 신설** + 골격 정합 | `SaaiView.tsx` | OBJECTIVE |
| **P-6** | 4 View raw → `<Section>/<Container>/<Eyebrow>/<Card>` swap(공통) | 4 View | OBJECTIVE |
| **P-7** | 제품별 카피 1패스 — 헤드라인 결론화 + 제품 간 약속 중복 제거 | 4 View | JUDGMENT |
| **P-8** | "(가상)" 지표 → 실측/출처(콘텐츠 C-3 입력 활용) | 4 View | 콘텐츠 |
| **P-9** | 페이지별 검증(§2) | — | — |

순서: store-insight → store-agent → store-care → saai (복잡도 순). 한 페이지 완주 후 다음.

## 5. Phase S — 솔루션 4종

목표: 공통 템플릿 확정 + **이원 소스 정리** + 쌍둥이 차별화 + 증거 충실화.

**공통 템플릿:** `Hero → 3시나리오 → 증거(Before-After 또는 업종 특화 블록) → 후기 → CTA`

| ID | 작업 | 대상 | 유형 |
|----|------|------|------|
| **S-1** | **이원 소스 결정** — `SolutionDetailView`([slug]) vs 정적 4 View 중복 확인 → 단일 소스로 수렴(정적 유지 + [slug] 폐기, 또는 반대) | `SolutionDetailView.tsx` + 4 View + `SolutionsView.tsx` | JUDGMENT |
| **S-2** | 공통 템플릿 프리미티브화(raw swap) | 4 View | OBJECTIVE |
| **S-3** | **food-beverage·drug 쌍둥이 차별화** — 시나리오·후기·증거를 업종 고유로 | `FoodBeverageView.tsx`·`DrugView.tsx` | JUDGMENT |
| **S-4** | 후기·지표 실측 교체 + 관련 case-study 링크(C-3) | 4 View | 콘텐츠 |
| **S-5** | 검증(§2) | — | — |

## 6. Phase C — 콘텐츠 (병행)

목표: 분류 복원 + KO 블로그 + case-study 5건 + SEO.

| ID | 작업 | 위치 | 유형 |
|----|------|------|------|
| **C-1** | **분류 복원** — velite `category` enum에 `tip`·`season` 추가(또는 tag 서브분류) → 78글 분류 소실 해소 + blog 필터 갱신 | `velite.config.ts:11` + blog 목록 | OBJECTIVE |
| **C-2** | **KO 블로그 노출** — `/ko/resources/blog`(+`[slug]`) 라우트 신설, i18n 목록·메타 정합 | `src/app/ko/resources/blog/` 신설 | OBJECTIVE |
| **C-3** | **case-study 5건 발행** — `CASE_STUDIES_v1` 골격 + storecare.ai 53명 실측 → MDX 5건, `CaseStudiesView` 연결. (랜딩 CaseBand·솔루션 후기에 공급) | `content/articles/case-study/` | 콘텐츠 |
| **C-4** | **SEO 패스** — per-article Article JSON-LD·OG·canonical 일관화, 핵심 키워드 글 보강, 내부 링크(글↔제품↔솔루션) | 글 + `src/lib/structured-data.tsx` | JUDGMENT |
| **C-5** | (선택) 신규 thought-leadership 큐 — 공간 AI·익명화 주제, saai-kee 스킬 활용 | `content/articles/insight/` | 콘텐츠 |
| **C-6** | 검증 — build 그린 + 글수/분류 카운트 + 구조화 데이터 검사 | — | — |

> **저위험 즉시 착수 가능:** C-1·C-2(분류·KO blog). C-3은 S-4·랜딩 proof에 콘텐츠 공급하므로 일찍 시작 시 시너지.

---

## 7. 순서 & 의존도

```
L (랜딩) ──► P (제품 4) ──► S (솔루션 4)
                                │
C (콘텐츠) ── 병행 ─────────────┘   (C-3 case-study → S-4 후기·CaseBand·L-4 proof 입력)
```

- **L 먼저** — 노출 최대 면 + 공통 정제 룰(§2) 확정 → P·S 재사용.
- **C 병행** — C-1/C-2 즉시. C-3은 P-8·S-4에 데이터 공급.

---

## 8. 다음 한 걸음 (합의 필요)

1. **L-2** — 중간 CTA를 1개로 재작성할지(권장) vs 0개로 제거.
2. **L-3** — MasterPair를 `/about`로 이전할지 vs owner-CTA만 Closing에 흡수 후 제거(권장).
3. **S-1** — 솔루션 단일 소스를 정적 4 View로 둘지(권장) vs 동적 `[slug]`로 통합.
4. **착수 단위** — "랜딩 L-1~L-8 완주 후 P" (권장) vs "전 페이지 진단 먼저".

> 위 1·2(랜딩)만 정하면 Phase L 적용에 바로 진입한다. 3은 S 진입 전까지 미뤄도 무방.
