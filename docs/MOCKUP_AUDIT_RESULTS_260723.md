> **[닫힘 2026-07-23]** 이 문서는 `docs/MOCKUP_MASTER_PLAN_v1.md`로 통합·대체됨 (Jamin 결정 D5). 이후 갱신은 마스터 문서에서만.

# 목업 시스템 전수조사·검수 결과 (2026-07-23)

> `docs/MOCKUP_AUDIT_HANDOFF_260723.md`의 다음 단계 1~4 수행 결과.
> 조사 기준: 로컬 HEAD 코드 전수 grep + 정독 (배포 프리뷰 육안 검수 A1~A10과 교차).
> **수정은 아직 하지 않았다** — §2·§3의 수정 목록은 Jamin 확인 후 착수.

---

## 0. 최우선 확인 사항 — 프리뷰 배포가 stale일 가능성

A7(올리브영)·A10(-261 퍼널)은 **현행 코드에서 이미 해소됐거나 존재하지 않는 수치**다:

- A7: 소스는 커밋 `d736076c8`에서 준실명("국내 1위 H&B 스토어") 익명화 완료 (`docs/STATUS.md:253`). PartnerGrid.tsx:13-14 주석에 PL-5 복원 절차까지 명시.
- A10: "-261"과 "93/73/52/33/21/16"은 전 소스·git 이력(-S 검색)에 **0건**. 현행 ProblemBeat.tsx는 382→65, leak −317(=382−65)로 산술 정합.

→ **검수 재개 전 Vercel 배포 SHA를 로컬 HEAD와 대조할 것.** stale이면 A7·A10은 유령 이슈, 나머지 A항목도 재배포 후 재확인이 정확하다.

---

## 1. 사용처 전수조사 결과 (핸드오프 다음단계 1)

`MOCKUP_ELEVATION_ROLLOUT_PLAN_v1.md` §1-2 작성 시점 대비 **큰 폭 개선**:

| 항목 | 문서(v1) | 현행 코드 | 델타 |
|---|---|---|---|
| 목업 쓰는 뷰 | 12/34 | **14/35** | +AgenticAiTechView(AutonomyLadder·LearningFlywheel·PosJoin), +SolutionDetailView(SolutionMockupPreview 경유) |
| 고아 목업(/demo 밖 미사용) | 22종 | **9종** | ActionCard·Chat·Push·Briefing·CaseStudyChart·AutonomyLadder·StoreInsightMockup·StoreCount/CareStatus(이벤트)·MockupImage 등 13종이 배치됨 |
| 미등록 실사용 | 4종 | **4종 그대로** | EnterpriseAppShowcase·AgentHqMini·HqRollup·DoorSplit — 여전히 index.ts 미등록 |

### 1-1. 현행 사용 맵 (렌더 경로 기준)

- **홈(HomeView)**: SpatialTrajectory(직접) · SpaceAiAnswerBeat→Chat+StoreInsight · HomeEnterpriseBeat→MultiStore · FeatureCarousel→ActionCard+IntegratedLoop
- **제품·기술 뷰 13종**: About(VisionCoordinates) · AgenticAiTech(AutonomyLadder·LearningFlywheel·PosJoin) · Anonymizer(EdgePerf) · Enterprise(HqMap·MultiStore) · Models(ModelCatalog) · Saai(IntegratedLoop) · Seal(SealSdk) · SpatialAi(SpatialTrajectory) · StoreAgent(AgentHqMini·EnterpriseAppShowcase·AgentMockupShowcase→ActionCard/Chat/Push) · StoreCare(HqRollup·DeviceTabs→KakaoAlert/StoreCareMockup) · StoreCount(DoorSplit) · StoreInsight(Funnel·PosJoin·InsightDesktop) · Technology(IntegratedLoop)
- **SolutionDetailView**: SolutionMockupPreview→ActionCard·StoreCare·StoreInsight
- **CaseStudyDetailView**: CaseStudyChart
- **이벤트(coex-franchise-expo)**: StoreCountCounting·StoreCareStatus (+로컬 PopMaker)
- **storeagent 레거시**: /storeagent(HeroSection→ActionCard) · how-it-works(MockupImage) · sample(Briefing)
- **/demo**: MockupGallery가 28종 렌더 (noindex 격리 유지)

### 1-2. 현행 고아 9종

`AnonymizationMockup` · `FiveQuestionsMockup` · `OrderFlowMockup` · `PriorityEngineDiagram` · `PrivacyJourneyMockup` · `RoiCalculatorWidget` · `AlertFatigueComparison` · `AgentDaySimulator` · `StoreDayTimelapse`

(프레임·부품류 PhoneFrame/PhoneScreen/TabletFrame/MacBookFrame/BrowserChrome/MockupBadge/SaaiHeader/ScanlineOverlay는 목업 내부 부품으로 정상 사용 중 — 고아 아님.)

### 1-3. 죽은 코드 발견

- **`src/components/sections/LiveDemoSection.tsx`** — BriefingMockup을 import하지만 **어느 페이지에서도 import되지 않음**. `_archive` 이관 후보.

---

## 2. A1~A10 원인 추적 결과 (핸드오프 다음단계 3)

| # | 원인 (파일:줄) | 수정 방안 | 확신도 |
|---|---|---|---|
| A1 | 코드 아님 — hero webp 6종에 타임스탬프가 **이미지에 구워짐** (`siteImages.ts:29-36` → `public/images/hero/hero-*.webp`). `mockup-time.ts`는 이 히어로에서 미호출, 로직상 35시 불가 | 에셋 재생성, 또는 오버레이를 코드로 이관해 `formatTimeWithSeconds()` 렌더 (v2 Phase 2와 묶음) | 높음 |
| A2 | "200"=IntegratedLoopDiagram(canonical 파생, 정상) · **"240"=HqRollupDashboardMockup.tsx:44/75/106 하드코딩** · "5개"=MultiStoreDashboardMockup:66의 stores.length(표본 5행). +추가발견: **AgentHqMiniMockup.tsx:15 "전국 128개"** | 240·128 → `canonicalHq.totalStores` 파생. "5개 연결됨"은 "예시 5개 매장" 라벨 명확화 | 높음 |
| A3 | `globals.css:697-711` `.wr-clip`(inline-block+overflow hidden) 클립 박스 높이가 h1 `leading-[1.1]`보다 커서 줄바꿈 시 세로 겹침 | `.wr-clip/.wr-word`에 헤드라인 line-height 명시 or 시각적 줄 단위 블록 분리 | 중간·재현 필요 |
| A4 | FeatureCarousel.tsx:339 이미지 패널에 **`lg:col-span-6` 누락**(12칼럼 중 1칸) + count 에셋 `inflow-rate.png`가 1280×2533 세로 스크린샷이라 4:3 crop 깨짐 | col-span 추가 + count 에셋 가로형 교체(또는 object-contain) | 높음 |
| A5 | `useScrollAnimation.ts:24` threshold 0.15~0.4 + 상단 rootMargin 사전 트리거 없음 → 빠른 스크롤 시 발화 지연 | `rootMargin:'200px 0px 15% 0px', threshold:0` 수준으로 완화, 개별 0.3~0.4도 하향 | 중간·재현 필요 |
| A6 | StoreCareMockup.tsx:338 콘텐츠 3블록+상단 정렬 — PhoneScreen 고정 높이 대비 하단 잔여 | 하단 블록 1개 추가(시나리오 항목 승격) or justify 조정 | 중간 |
| A7 | 소스 익명화 완료(d736076c8) — 프리뷰 stale 또는 `gen:content` 재생성 누락 가능성 | 배포 SHA 대조 → site-content.json에서 문자열 소거 확인 | 소스는 높음 |
| A8 | HqRollupDashboardMockup.tsx:204 `lg:grid-cols-2` + :229 매장명 `whitespace-nowrap` + :208 `overflow-hidden` → 좁은 히어로 컬럼에서 배지 열 잘림 | 단기: `table-fixed`+`truncate` or `overflow-x-auto`. 근본: **v2 MockupViewport 도입 근거 사례** | 중간 |
| A9 | ChatMockup.tsx:211 메시지 컬럼 상단 정렬 + SpaceAiAnswerBeat `items-stretch`로 우측 긴 목업에 높이 강제 | 메시지 컨테이너 `justify-end`(실제 메신저처럼 하단 고정) — 연출 의도 아닌 결함으로 판정 | 중간 |
| A10 | 현 코드·git 이력에 해당 수치 없음 (§0 참조). 현행 ProblemBeat는 산술 정합 | 배포 SHA 대조 후 재판단 | 재현 필요 |

### 수정 우선순위 제안 (Jamin 확인 대기)

1. **즉시(정합성 블로커)**: A2 — HqRollup 240·AgentHqMini 128 → canonical 200 파생화
2. **명확한 코드 수정**: A4(col-span+에셋) · A9(하단 고정) · A8(단기 패치)
3. **CSS 튜닝(재현 후)**: A3 · A5 · A6
4. **에셋 재생성**: A1
5. **배포 확인 후**: A7 · A10

---

## 3. 시나리오 교차 검수 결과 (핸드오프 다음단계 2)

### 3-1. 데이터 파일 9종 판정

| 파일 | 판정 | 발견 |
|---|---|---|
| storeinsight.ts / enterprise.ts / simulator.ts | **모범** | canonical 파생 + 파일 간 교차 일치(홍대78·잠실65 랭킹 정합) |
| storecount.ts / technology.ts / storeagent-briefing-i18n.ts | 이상 없음 | 별개 도메인, 내부 산술 정합 |
| storecare.ts | 경미 | `careScore=92` 하드코딩(값은 perfScore와 일치, 드리프트 위험) → 파생화 권장 |
| **storeagent.ts:307** + **storeagent-mock-i18n.ts:276/286/296** | **결함(중)** | 푸시 알림이 어제 매출 ₩1,243,000을 **"오늘 매출"로 오표기** (canonical 오늘 = ₩1,245,000). 같은 파일 :142는 동일 값을 "어제"로 표기 — 자기모순. 3로케일 동일하게 잘못됨 |

### 3-2. 컴포넌트 하드코딩 위반 (핵심)

전국 매장수가 **200 / 240 / 128 / 12** 4갈래로 갈림:

| 컴포넌트 | 위반 | 심각도 |
|---|---|---|
| **HqRollupDashboardMockup** (:44/75/106) | "전국 240개 매장" + KPI 세트(37/94%/8/3) 전체 self-contained, canonical 미참조 | **상** |
| **AgentHqMiniMockup** (:15, :24) | "전국 128개 매장" + 강남역점 visits 1,204 / **purchases 342**(canonical 방문자 342를 구매로 오전용) / conv 6.2%(계산상 28.4% — 내부 산술도 불일치) | **상** |
| EnterpriseAppShowcase (:114) | 강남역점 명칭에 일 방문 3,332명(canonical 342의 10배 스케일, storeagent_demo_v2 유래) | 중 |
| StoreInsightDesktopMockup (:97) | "전체 12개 매장" — 점주 소규모 체인 뷰로 해석 가능하나 근거 없는 값 | 중 |

canonical 직접 import 준수 11종: OrderFlow·RoiCalculator·IntegratedLoop·HqMap·Funnel·StoreDayTimelapse·PriorityEngine·EdgePerf·AlertFatigue·AgentDaySimulator·StoreInsight(간접). 로케일 간 숫자 드리프트는 **전 파일 0건** (잘못된 수치도 3로케일 동일).

### 3-3. 토큰·훅 현황 (v2 계획 근거 보강)

- mockup-tokens 사용 10종 vs 로컬 hex 16종+. 콘텐츠 차트인 CaseStudyChartMockup(hex 17개)이 토큰화 1순위 후보. KakaoAlert 브랜드색은 문서화된 의도적 예외 유지.
- `useCountUp` 고정 4회 호출: MultiStoreDashboardMockup(:163-166)·HqMapDashboardMockup(:176-179) 2곳 확정 — 파일 주석에 리팩터 필요 자인. `useCountUpGroup` 선행 근거 확보.

---

## 4. 갭 맵 — 목업 없는 21뷰 × 고아 9종 (핸드오프 다음단계 4)

### 4-1. 매칭 제안 (페이지 목적 기준)

| 뷰 | 투입 후보 (고아) | 근거 |
|---|---|---|
| ProductsView (허브) | **RoiCalculatorWidget** | 제품군 도입 효과를 정량 인터랙션으로 — 허브 전환 기여 |
| SolutionsView (허브) | **FiveQuestionsMockup** | 진단형 진입 장치 (rollout v1 Tier1 계승) |
| DiagnosisView | **FiveQuestionsMockup** (공유) 또는 **AgentDaySimulator** | 페이지 자체가 진단 — 최적합 |
| RetailView | **StoreDayTimelapse** | "매장의 하루" 서사가 버티컬 소개와 정합 |
| FoodBeverageView | **OrderFlowMockup** | 주문 흐름 = F&B 핵심 시나리오 |
| DrugView | **AlertFatigueComparison** | 로스 방지·CCTV 알림 피로 스토리 |
| SaaiForOwnersView | **AgentDaySimulator** + RoiCalculator(공유) | 점주 1인칭 체험형 — v5 최고 완성도 자산의 적소 |
| FunctionsView / FunctionToolView | **PriorityEngineDiagram** | 기능 단위 설명(우선순위 엔진)과 직결 |
| LargeSpaceView | (고아 없음) → SpatialTrajectoryMockup 재사용 | 대형공간 = 공간 AI 궤적 |
| SaaiAdsInsightView | (고아 없음) → FunnelDiagram 재사용 | 광고 성과 = 퍼널 |

### 4-2. 판정 보류·비대상

- **AnonymizationMockup**: SealView의 BeforeAfterSlider와 기능 중복 여부 판정 후 **폐기 후보** (rollout v1 P3 계승).
- **PrivacyJourneyMockup**: Anonymizer 또는 Seal 페이지 보강용 — 단 두 페이지 모두 이미 목업 보유라 갭 필수는 아님. 우선순위 후순위.
- **목업 비대상 11뷰**: Career·Team·News·Investors·Partnership·Docs·Faq·Glossary·GlossaryDetail·Resources·(SolutionDetail은 이미 보유) — 콘텐츠·회사 페이지라 목업보다 실사/일러스트가 적합. **의도적 매칭 제외**로 기록.

---

## 5. 후속 반영

- 본 문서 §1은 `MOCKUP_ELEVATION_ROLLOUT_PLAN_v1.md` §1-2에 갱신 반영됨 (동일 커밋).
- §2~§4는 `MOCKUP_SYSTEM_V2_PLAN_v1.md` Phase 1~3 구체 항목으로 반영됨 (동일 커밋).
- 미검수 잔여: 배포 프리뷰 육안 검수 — saai insight 하반부, saai agent, store-count, saai(스위트), saai-for-owners, functions, 기술 6종, 솔루션 5종, 엔터프라이즈, 리소스·회사, /demo, EN/JP 로케일. **배포 SHA 동기화 후** 진행 권장(§0).
