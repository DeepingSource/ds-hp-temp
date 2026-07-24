# 목업 시스템 마스터 플랜 (v1, 2026-07-23)

> **단일 기준 문서.** `MOCKUP_SYSTEM_V2_PLAN_v1.md`(아키텍처·Phase 계획)와 `MOCKUP_AUDIT_RESULTS_260723.md`(전수조사·검수 결과)를 통합하고, Jamin 확정 결정 D1~D12를 반영했다.
> 이 문서로 대체(닫힘): `MOCKUP_SYSTEM_V2_PLAN_v1.md` · `MOCKUP_AUDIT_RESULTS_260723.md` · `MOCKUP_ELEVATION_ROLLOUT_PLAN_v1.md` · `MOCKUP_AUDIT_HANDOFF_260723.md`
> 계속 유효한 참조: `MOCKUP_SYSTEM_GUIDE.md`(v1 규약 — Phase 0-6에서 v2로 개정), `DESIGN.md`(사이트 토큰), `design-system/`(SAAI DS), `src/data/mockup-scenarios/canonical.ts`(데이터 SOT)

---

## 0. 확정 결정 (Jamin, 2026-07-23)

| # | 결정 | 내용 |
|---|---|---|
| D1 | **목업 내부 = SAAI DS 전면 채택** | 목업 내부만 `design-system/` 토큰을 SSOT로. codegen(`mockup-tokens.gen.ts`) 경유 소비 — `design-system/` 직접 import 금지. 목업 바깥은 사이트 토큰. 경계는 `MockupViewport`. |
| D2 | **제품 구분색(emerald/violet) 폐지** | SAAI 단일 블루. 제품 구분은 `SaaiHeader` 워드마크+타이포. 색은 차트/상태 칩의 SAAI 데이터 hue만. |
| D3 | **Lottie 미도입, framer-motion 정교화** | SAAI Motion 스펙(`out_quint`, no spring/bounce) 토큰화. |
| D4 | **실사용 목업 우선** | 실사용 14뷰+홈 → 콘텐츠 핍진성 → 고아 9종 순. |
| D5 | **문서 통합** | 본 문서가 단일 기준. 롤아웃 계획·핸드오프·감사결과·v2계획은 닫힘 처리. |
| D6 | **매장수 정합 = "그럴싸한 가상 숫자" 원칙** | 하나의 canonical 값으로 통일하되, **벤포드 법칙을 어기지 않는 자연스러운 수** 사용. `totalStores` 200 → **217** (정상 203 / 주의 10 / 긴급 4, 합 217). 파생치(일일알림 등) 비례 재산정. 240(HqRollup)·128(AgentHqMini) 하드코딩은 canonical 파생으로 교체. "5개 매장 연결됨"은 "예시 5개 매장"으로 라벨 명확화. InsightDesktop "전체 12개"는 점주 체인 규모로 canonical에 명시 필드 승격(12 유지 — 첫자리 1, 정합). |
| D7 | **푸시 오늘/어제 오표기 = 라벨 정정** | ₩1,243,000은 어제 값 — 라벨을 "어제 매출"로 정정(값 유지), ko/en/jp 3로케일 동시. |
| D8 | **히어로 타임스탬프(A1) = 오버레이 코드 이관** | webp에서 타임스탬프 제거(재생성) + 코드 오버레이(`mockup-time` 상대 규칙)로 렌더. "빌드 시점 박제 금지" 원칙 정합. |
| D9 | **ChatMockup(A9) = 메시지 하단 고정** | 비교 연출 아닌 결함으로 판정. `justify-end`로 실제 메신저처럼 대화가 입력바에 붙게. |
| D10 | **AnonymizationMockup 폐기** | SealView BeforeAfterSlider와 기능 중복 — `_archive` 이관, /demo 갤러리에서도 제거, registry 삭제. |
| D11 | **EnterpriseAppShowcase = 매장명 중립화 + canonical 스케일 재산정** | 강남역점 명칭 제거(중립 매장명) **그리고** 수치(방문 3,332명 등 10배 스케일)를 canonical 세계관과 정합하는 그럴싸한 값으로 재산정(D6 원칙 적용). |
| D12 | **갭 맵 매칭안 그대로 확정** | §6의 고아→뷰 매칭 전체 승인. 실제 배치는 Phase 1~2 완료 후. |

### D1 원칙 — DESIGN.md와의 관계

`DESIGN.md`의 "사이트 컴포넌트를 `design-system/`에 wire하지 말 것" 원칙은 유지하되 예외를 명문화한다:

> **예외(목업 내부).** `src/components/mockups/**`의 목업 "화면 내부"는 SAAI 제품 UI의 재현이므로 SAAI DS를 따른다. 단 `design-system/`을 직접 import하지 않고 codegen 산출물 `src/lib/mockup-tokens.gen.ts`(§2-A)로만 소비한다. 목업 바깥 레이어(프레임 그림자·등장 애니메이션·배지)는 사이트 토큰 — 경계는 `MockupViewport`(§2-B).

착수 시 `DESIGN.md`·`MOCKUP_SYSTEM_GUIDE.md`에 반영.

---

## 1. 진단 — 증상 → 근본 원인

| 증상 | 근본 원인 (코드 근거) |
|---|---|
| ① 목업 간 디자인/색 편차 | `mockup-tokens.ts` 실사용 10종뿐, 로컬 hex 16종+. `PRODUCT_THEME` emerald/violet이 SAAI 톤과 이질. 그림자·라운딩·타이포 밀도 제각각. |
| ② 페이지에 따라 레이아웃 깨짐 | 사이즈 계약 부재 — 호출부마다 임의 컨테이너, 내부는 고정 px 타이포 → 폭이 어긋나면 줄바꿈·오버플로·잘림 (실증: A8 HqRollup 배지 잘림). |
| ③ 애니메이션 완성도 편차 | duration·easing·stagger 컴포넌트별 임의. 사이트 spring이 목업 내부 침투 — SAAI Motion "no spring" 충돌. |
| ④ SAAI DS 미반영 | `design-system/` read-only 격리, 소비 경로 없음. |
| ⑤ 콘텐츠 완결성·핍진성 | canonical 파생률 낮음 — 실증: 전국 매장수 4갈래(200/240/128/12), 푸시 오늘/어제 오표기, 강남역점 10배 스케일 혼용(§4). |

핵심: **v1이 "재사용 구조"를 깔았다면, 이 계획은 "계약(contract)"을 깐다** — 색(SAAI 토큰), 크기(MockupViewport), 모션(motion 토큰), 데이터(canonical v2).

---

## 2. 아키텍처 — Phase 0에서 만드는 4개의 계약

### 2-A. 색·타이포 계약: SAAI 토큰 파이프라인

```
design-system/design.tokens.md (YAML frontmatter, read-only SSOT)
        │  scripts/gen-mockup-tokens.mjs  (신규, npm run gen:mockup-tokens)
        ▼
src/lib/mockup-tokens.gen.ts   ← 자동 생성, 손수정 금지 헤더
        ▼
src/lib/mockup-tokens.ts       ← gen 재export + 목업 전용 파생(MOCKUP_DEVICE 밀도 등)
```

- **생성 대상**: neutrals/blue 스케일, semantic alias(`bg-app`·`fg-primary`·`border-default`…), 상태색, 차트 팔레트 전체(cat 1–6 + context, sequential blue ramp, diverging, chrome), 타이포 트랙, `rounded`, `spacing`, `motion`.
- **CSS 변수 스코프**: `--saai-*` 변수 블록(`.saai-scope`)을 함께 산출해 `globals.css`에 import. `MockupViewport`가 루트에 `.saai-scope` 자동 부여 → 목업 내부는 `bg-(--saai-bg-app)` 식으로 소비.
- **기존 토큰 정리**: `PRODUCT_THEME` deprecated(전환기 blue alias, Phase 1 완료 시 삭제 — D2) · `MOCKUP_SCHEME.light/dark` SAAI alias 재정의(다크는 "SAAI grey 역전 + blue 유지" 파생 규칙 명문화) · `MOCKUP_STATUS_*` → SAAI status 색 교체 · `MOCKUP_DEVICE` SAAI 타이포 트랙 재산정, **11px 미만 글자 금지**.
- **가드레일**: stylelint `mockups/**` hex 예외 철회 → "gen 토큰·`--saai-*`만 허용". 실제 브랜드 재현(카카오톡/LINE `#06c755` 등)만 파일 단위 명시 예외.

### 2-B. 크기 계약: `MockupViewport`

문제의 본질은 "목업이 유동 폭에 리플로우". 해결은 **고정 설계 캔버스 + 비율 스케일**:

```tsx
<MockupViewport design="phone">   {/* 390×844 고정 캔버스 */}
  <StoreCareMockup … />           {/* 내부는 항상 390px 기준으로만 설계 */}
</MockupViewport>
```

- 표준 캔버스 3종: `phone` 390×844 · `desktop` 1280×800 · `card` 480×가변.
- ResizeObserver로 컨테이너 폭 측정 → `transform: scale(w/390)`. **내부 줄바꿈·오버플로가 어떤 페이지에서도 불변.**
- `aspect-ratio` 예약으로 CLS 0. `min/maxScale` 하한·상한. 프레임은 Viewport 안쪽 — 호출부는 폭만 지정. `SolutionMockupPreview`의 `aspectRatio:'9/19'` 같은 호출부 임의 컨테이너 전부 제거.
- 접근성: 스케일 텍스트는 스크린리더 그대로 노출. `prefers-reduced-motion` 시 내부 루프 정지.
- 실증 근거: A8(HqRollup 랭킹 배지 잘림 — 좁은 히어로 컬럼에서 `grid-cols-2`+`nowrap`+`overflow-hidden` 연쇄)이 이 계약의 대표 사례.

### 2-C. 모션 계약: `src/lib/mockup-motion.ts`

| variant | 스펙 | 용도 |
|---|---|---|
| `enter` | out_quint · 300ms · y 8px→0 + opacity | 목업 내부 요소 등장 |
| `swap` | out_quint · 300ms · 크로스페이드 | `useMockupLoop` 시나리오/탭 전환 |
| `listStagger` | 60ms 간격 · enter 파생 | 리스트/카드 순차 등장 |
| `count` | out_quint tween (spring 금지) | `useCountUp` 재규격 |
| `panel` | 480ms · transform+opacity | 대시보드 패널 리사이즈 |
| `streaming` | 흐르는 그라데이션 | 챗 봇 응답 — 타자기 캐럿/스피너 금지 |
| `pulse` | 800ms fade | 하이라이트·알림 도착 |

- **경계**: 목업 "등장"(스크롤 리빌)은 사이트 모션. 목업 "내부"는 위 토큰만.
- `useCountUpGroup(values[])` 선행 리팩터 — 고정 4회 호출 2곳 확정: `MultiStoreDashboardMockup.tsx:163-166`, `HqMapDashboardMockup.tsx:176-179` (양쪽 파일 주석이 리팩터 필요 자인).
- 정교화: 진행 인디케이터 연속성, 전환 fade 타이밍 통일, `<AnimatedCursor>`·`<IncomingBadge>` 등 마이크로 모션 재사용화.

### 2-D. 데이터 계약: canonical v2 + 핍진성 체크리스트

- **canonical 확장** (`src/data/mockup-scenarios/canonical.ts`):
  - **매장수 재산정(D6)**: `totalStores: 217`, `statusDistribution: {normal: 203, warning: 10, critical: 4}`, `dailyAlerts: 1_353`(비례 재산정, 첫자리 1 — 벤포드 정합). 점주 체인 규모 신설 필드 `ownerChainStores: 12`.
  - **수 생성 원칙(D6)**: 모든 가상 수치는 벤포드 법칙을 어기지 않게 — 반올림 흔적(200, 240, 1,000 등) 금지, 화면 내 합계·비율 산술 정합 필수.
  - 시간대별 방문 곡선(24h), 요일별 매출(1주), 카테고리 구성비 — 모든 차트가 이 시계열 파생(합계가 KPI 스칼라와 산술 일치).
  - 명부: 매장 20개(멀티매장·지도용, 217점 분포와 정합), 익명 표기 규칙, 알림 문구 사전.
  - 시간 표기: `mockup-time.ts` 통합 — "오늘/어제/시각"은 상대 규칙 생성(빌드 시점 박제 금지 — D8 히어로 오버레이 포함).
- **핍진성 체크리스트** (가이드 v2 수록, 리뷰 시 체크):
  1. 숫자는 canonical 파생인가? 2. 화면 내 합계·비율·전일 대비 정합? 3. 단위·자릿수 로케일 규칙(KO 만원/EN K/JP 万円)? 4. 요일·시간대·계절이 서사와 정합? 5. 고유명사는 승인분만? 6. 빈 화면·placeholder·lorem 0건? 7. 화면당 CTA 1개? **8. (신설) 벤포드 위반 반올림 수치 0건?**

---

## 3. 현행 인벤토리 (2026-07-23 전수조사)

### 3-1. 배치 현황 — 35뷰 기준

| 상태 | 수량 | 목록 |
|---|---|---|
| 목업 쓰는 뷰 | 14 / 35 | About, AgenticAiTech, Anonymizer, Enterprise, Models, Saai, Seal, SolutionDetail, SpatialAi, StoreAgent, StoreCare, StoreCount, StoreInsight, Technology |
| 목업 없는 뷰 | 21 / 35 | Career, Diagnosis, Docs, Drug, Faq, FoodBeverage, Functions, FunctionTool, Glossary, GlossaryDetail, Investors, LargeSpace, News, Partnership, Products, Resources, Retail, SaaiAdsInsight, SaaiForOwners, Solutions, Team |
| 홈 | 목업 5종+ | SpatialTrajectory · SpaceAiAnswerBeat→Chat+StoreInsight · HomeEnterpriseBeat→MultiStore · FeatureCarousel→ActionCard+IntegratedLoop |

- 기타 사용처: CaseStudyDetailView(CaseStudyChart) · coex 박람회 이벤트(StoreCountCounting·StoreCareStatus) · storeagent 레거시(ActionCard·MockupImage·Briefing) · /demo 갤러리(28종, noindex 격리).

### 3-2. 고아 9종 (22종에서 감소)

`AnonymizationMockup`(→D10 폐기) · `FiveQuestionsMockup` · `OrderFlowMockup` · `PriorityEngineDiagram` · `PrivacyJourneyMockup` · `RoiCalculatorWidget` · `AlertFatigueComparison` · `AgentDaySimulator` · `StoreDayTimelapse` — 재배치는 §6.

- 프레임·부품류(PhoneFrame·PhoneScreen·TabletFrame·MacBookFrame·BrowserChrome·MockupBadge·SaaiHeader·ScanlineOverlay)는 내부 부품으로 정상 사용 — 고아 아님.
- **미등록 실사용 4종**: `EnterpriseAppShowcase`·`AgentHqMiniMockup`·`HqRollupDashboardMockup`·`DoorSplitDiagram` — index.ts 등록 필요.
- **죽은 코드**: `src/components/sections/LiveDemoSection.tsx`(어느 페이지도 미사용) — `_archive` 이관.

---

## 4. 검수 결과 확정본 (A1~A10 + 시나리오)

### 4-0. 선행 확인 — 프리뷰 배포 stale 가능성

A7(올리브영: 소스는 `d736076c8`에서 익명화 완료)·A10(-261: 전 소스·git 이력 0건, 현행 ProblemBeat는 382→65·leak −317로 산술 정합) 모두 **현행 코드에 문제 없음** → **육안 검수 재개 전 Vercel 배포 SHA를 HEAD와 대조할 것.**

### 4-1. A1~A10 원인·처리 (결정 반영)

| # | 원인 (파일:줄) | 처리 (확정) |
|---|---|---|
| A1 | hero webp 6종에 타임스탬프 baked-in (`siteImages.ts:29-36`). `mockup-time.ts` 미호출·무관 | **D8**: webp 재생성(타임스탬프 제거) + 코드 오버레이 이관 |
| A2 | "240"=`HqRollupDashboardMockup.tsx:44/75/106` · "128"=`AgentHqMiniMockup.tsx:15` 하드코딩 · "5개"=MultiStore 표본 행수 | **D6**: canonical 217 파생화 + "예시 5개 매장" 라벨 |
| A3 | `globals.css:697-711` `.wr-clip` 클립 박스 높이 > h1 `leading-[1.1]` → 줄바꿈 시 겹침 | line-height 정합 수정 (재현 후) |
| A4 | `FeatureCarousel.tsx:339` 이미지 패널 `lg:col-span-6` 누락(1/12칸) + count 에셋 세로 스크린샷 crop 깨짐 | col-span 추가 + 에셋 가로형 교체 |
| A5 | `useScrollAnimation.ts:24` threshold 0.15~0.4 + 상단 rootMargin 사전 트리거 없음 | `rootMargin:'200px 0px 15% 0px', threshold:0` 수준 완화 (재현 후) |
| A6 | `StoreCareMockup.tsx:338` 콘텐츠 3블록 + 상단 정렬 → 하단 잔여 | 시나리오 항목 1개 승격 추가 |
| A7 | 소스 익명화 완료 — 프리뷰 stale 또는 `gen:content` 재생성 누락 추정 | 배포 SHA 대조 후 재판단 |
| A8 | `HqRollupDashboardMockup.tsx:204/208/229` grid+nowrap+overflow-hidden 연쇄 | 단기 `table-fixed`+`truncate` · 근본은 MockupViewport(§2-B) |
| A9 | `ChatMockup.tsx:211` 메시지 상단 정렬 + `items-stretch` 높이 강제 | **D9**: `justify-end` 하단 고정 |
| A10 | 현 코드·이력에 수치 없음 — 현행 산술 정합 | 배포 SHA 대조 후 재판단 |

### 4-2. 시나리오·컴포넌트 데이터 검수 (결정 반영)

| 대상 | 발견 | 처리 (확정) |
|---|---|---|
| `storeagent.ts:307` + `storeagent-mock-i18n.ts:276/286/296` | 어제 매출 ₩1,243,000을 "오늘 매출"로 오표기 (:142와 자기모순) | **D7**: "어제 매출" 라벨 정정, 3로케일 동시 |
| `HqRollupDashboardMockup` | 전국 240개 + KPI 세트 self-contained | **D6**: canonicalHq 파생화 |
| `AgentHqMiniMockup` | 전국 128개 + 강남역점 방문 1,204/구매 342(canonical 방문자 342 오전용)/전환 6.2%(계산상 28.4%) | **D6**: canonicalHq·canonicalStore 파생 재산정 |
| `EnterpriseAppShowcase:114` | 강남역점 명칭에 방문 3,332명(10배 스케일) | **D11**: 매장명 중립화 + canonical 스케일 재산정 |
| `StoreInsightDesktopMockup:97` | "전체 12개 매장" 근거 없음 | **D6**: canonical `ownerChainStores: 12` 필드 승격 |
| `storecare.ts:10` | `careScore=92` 하드코딩(값 일치, 드리프트 위험) | `canonicalStore.perfScore` 파생화 |
| `CaseStudyChartMockup` | 로컬 hex 17개 — 콘텐츠 차트 중 최다 | Phase 1 토큰화 후보 |
| storeinsight/enterprise/simulator | canonical 파생 + 교차 일치(홍대78·잠실65) | **모범 — 마이그레이션 표준 패턴** |
| 로케일 | 전 파일 ko/en/jp 숫자 드리프트 0건(오류도 3로케일 동일) | 수정 시 3로케일 동시 원칙 |

---

## 5. 실행 단계

### Phase 0 — 기반 구축 (선행)

| # | 작업 | 산출물 |
|---|---|---|
| 0-1 | 토큰 codegen + gen 파일 + `--saai-*` 스코프 | `scripts/gen-mockup-tokens.mjs`, `mockup-tokens.gen.ts`, globals.css 패치 |
| 0-2 | `MockupViewport` + 프레임 3종 내장화 | `src/components/mockups/MockupViewport.tsx` |
| 0-3 | `mockup-motion.ts` + `useCountUpGroup` 리팩터 (단독 커밋) | motion 토큰·공용 variants |
| 0-4 | **canonical v2 재산정 (D6)** — totalStores 217·분포 203/10/4·dailyAlerts 1,353·`ownerChainStores` 신설 + 벤포드 원칙 주석 | canonical.ts 개정 (파생 컴포넌트 자동 반영 확인) |
| 0-5 | 레퍼런스 마이그레이션 1종 (`ChatMockup` — D9 하단 고정 포함) | 토큰·Viewport·motion 전부 적용 모범 구현 |
| 0-6 | `/demo` 검증 하네스: 3폭(320/480/768) × 3로케일 동시 렌더 | 깨짐·편차 시각 검증 도구 |
| 0-7 | 가이드 v2 + DESIGN.md 예외 조항 + lint 가드 | `MOCKUP_SYSTEM_GUIDE.md` v2 |

**Acceptance**: ChatMockup 3폭×3로케일 줄바꿈 변화 0 · CLS 0 · 내부 hex/spring 0건 · gen 멱등 · canonical 재산정 후 파생 화면 전부 217 계열로 일치.

### Phase 1 — 실사용 목업 마이그레이션 + 확정 수정 (노출 빈도 순)

**배치 순서**: 1a 홈 계열(Chat·StoreInsight·MultiStore·IntegratedLoop·ActionCard·SpatialTrajectory) → 1b 제품 페이지(StoreCare/StoreInsight/StoreCount/StoreAgent/Saai + InsightDesktop) → 1c 솔루션·엔터프라이즈(SolutionMockupPreview·EnterpriseAppShowcase·HQ 2종 + 미등록 4종 registry 등록) → 1d 기술 다크 3종 + 다이어그램.

**확정 수정 항목** (검수 파생, D6~D11):

| # | 항목 | 결정 |
|---|---|---|
| 1-① | HqRollup 240·KPI → canonicalHq(217) 파생화 | D6 |
| 1-② | AgentHqMini 128 → 파생 + 방문/구매/전환 재산정(342 오전용·산술 불일치 해소) | D6 |
| 1-③ | MultiStore "예시 5개 매장" 라벨 명확화 | D6 |
| 1-④ | FeatureCarousel `lg:col-span-6` + count 에셋 교체 | A4 |
| 1-⑤ | ChatMockup `justify-end` | D9 |
| 1-⑥ | HqRollup 테이블 단기 패치(`table-fixed`+`truncate`) | A8 |
| 1-⑦ | StoreCareMockup 하단 시나리오 항목 추가 | A6 |
| 1-⑧ | WordRise line-height 정합 (재현 후) | A3 |
| 1-⑨ | useScrollAnimation 발화 완화 (재현 후) | A5 |
| 1-⑩ | 미등록 4종 등록 + LiveDemoSection `_archive` + AnonymizationMockup `_archive`(D10) | — |

**Acceptance**: 실사용 14뷰+홈 emerald/violet 0건 · 호출부 사이즈 지정 "폭"만 · 하네스 그린 · 매장수 표기 사이트 전체 단일 계열(217).

### Phase 2 — 콘텐츠 핍진성 패스

| # | 항목 | 결정 |
|---|---|---|
| 2-① | 푸시 "어제 매출" 라벨 정정 (storeagent.ts:307 + i18n 3곳, 3로케일) | D7 |
| 2-② | storecare.ts careScore → perfScore 파생 | — |
| 2-③ | EnterpriseAppShowcase 매장명 중립화 + canonical 스케일 재산정 | D11 |
| 2-④ | 히어로 webp 재생성 + 타임스탬프 코드 오버레이 이관 | D8 |
| 2-⑤ | CaseStudyChartMockup 토큰화 | — |
| 2-⑥ | canonical v2 확장분(시계열·명부·알림 사전) 적용 + 하드코딩 잔여 전수 파생 전환 | §2-D |

- 신규 카피는 **Jamin 확정 후 반영(placeholder 금지)**. 수치 수정은 3로케일 동시. 체크리스트 8항 전 목업 통과 기록.
- 표준 패턴: storeinsight/enterprise/simulator 3종의 canonical 파생 방식을 그대로 따른다.

### Phase 3 — 고아 재배치 (D12 확정)

§6 갭 맵대로 배치. 재배치 확정분만 v2 마이그레이션 적용(죽일 자산에 공수 쓰지 않음). registry 최종 정리 — 등록 목록 = 실사용 목록.

### Phase 4 (옵션) — 회귀 방지 자동화

Playwright /demo 하네스 스크린샷(3폭×3로케일, reduced-motion 고정) diff CI + `lint:tokens` mockup 규칙.

---

## 6. 갭 맵 — 고아 재배치 확정 (D12)

| 고아 | 배치 | 근거 |
|---|---|---|
| RoiCalculatorWidget | **ProductsView** + SaaiForOwnersView 공유 | 허브 전환 기여, 도입 효과 정량 |
| FiveQuestionsMockup | **SolutionsView** + DiagnosisView 공유 | 진단형 진입 장치 |
| AgentDaySimulator | **SaaiForOwnersView** | v5 최고 완성도 → 점주 1인칭 체험 |
| StoreDayTimelapse | **RetailView** | "매장의 하루" 서사 |
| OrderFlowMockup | **FoodBeverageView** | 주문 흐름 = F&B 핵심 |
| AlertFatigueComparison | **DrugView** | 로스 방지·알림 피로 스토리 |
| PriorityEngineDiagram | **FunctionsView / FunctionToolView** | 기능 단위 설명 직결 |
| PrivacyJourneyMockup | 후순위 — Anonymizer/Seal 보강 | 두 곳 다 이미 목업 보유 |
| ~~AnonymizationMockup~~ | **폐기 (D10)** | BeforeAfterSlider 중복 |

- 고아 없는 갭 뷰: LargeSpace→SpatialTrajectory 재사용 · SaaiAdsInsight→FunnelDiagram 재사용.
- 목업 비대상(의도적 제외): Career·Team·News·Investors·Partnership·Docs·Faq·Glossary·GlossaryDetail·Resources — 콘텐츠·회사 계열, 실사/일러스트 적합.

---

## 7. 리스크와 대응

| 리스크 | 대응 |
|---|---|
| emerald/violet 제거로 단계 구분력 약화 | 숫자+워드마크+blue 강조 재설계(1c 프로토타입 후 확인). B안: SAAI 데이터 hue를 "단계 칩" 한정 사용. |
| scale() 극좁 컨테이너(<280px) 가독성 | `minScale` + 하네스 하한 검증. |
| 다크 파생 규칙 자의성 | mockup-tokens 주석 명문화, SAAI DS 다크 출시 시 교체. |
| useCountUp 리팩터 파급 | Phase 0-3 단독 커밋 + 시각 diff. |
| 외부 브랜드색(카카오/LINE) | 파일 단위 명시 예외 유지. |
| 매장수 217 전환 파급 | canonical 파생 컴포넌트는 자동 반영. 파생 아닌 곳(1-①②)을 이번에 파생화하므로 이후 단일 지점 관리. 홈 푸트노트 등 문구 내 "200" 잔존 여부 전수 grep으로 확인. |
| 빌드 시점 박제 시간 | `mockup-time.ts` 상대 규칙 통일(D8 포함, Phase 2). |

---

## 8. 문서 지위

- **본 문서 = 단일 기준.** 닫힘: `MOCKUP_SYSTEM_V2_PLAN_v1.md` · `MOCKUP_AUDIT_RESULTS_260723.md` · `MOCKUP_ELEVATION_ROLLOUT_PLAN_v1.md` · `MOCKUP_AUDIT_HANDOFF_260723.md` (각 문서 상단에 닫힘 고지).
- 유효: `MOCKUP_SYSTEM_GUIDE.md`(Phase 0-7에서 v2 개정) · `DESIGN.md` · `design-system/` · `canonical.ts`.
- 미검수 잔여(육안): saai insight 하반부, saai agent, store-count, saai 스위트, saai-for-owners, functions, 기술 6종, 솔루션 5종, 엔터프라이즈, 리소스·회사, /demo, EN/JP — **배포 SHA 동기화 후** 재개.
