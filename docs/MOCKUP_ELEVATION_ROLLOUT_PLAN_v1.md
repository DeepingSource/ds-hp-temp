> **[닫힘 2026-07-23]** 이 문서는 `docs/MOCKUP_MASTER_PLAN_v1.md`로 통합·대체됨 (Jamin 결정 D5). 인벤토리(§1)·갭 맵은 마스터 §3·§6이 최신.

# 목업 자산 고도화 & 페이지별 롤아웃 계획 (v1)

> 작성 2026-07-23 · 대상: `deepingsource.io` 코퍼레이트 사이트(`ds-hp-temp`)
> 관련 선행 문서: `docs/MOCKUP_PROPOSALS_v1~v5.md`, `docs/MOCKUP_REVIEW_v1~v2.md`(닫힘·아카이브), `docs/STATUS.md`(§15 홈페이지 개선계획), `DESIGN.md`
>
> **이 문서의 범위.** v1~v5 체인은 "체험형 데모 4종(#16~19) 신설"이라는 닫힌 프로젝트였고 이미 완료·리뷰까지 끝났다. 이 문서는 그 결과물을 포함한 **목업 44종 전체**를 대상으로 (1) 완성도·디자인 시스템 정합성 상향, (2) 콘텐츠만 바꿔 재사용 가능한 구조로의 리팩터, (3) 페이지별 배치 순서, (4) 기존/신규 asset 조달 계획을 다룬다. v1~v5의 원칙(§1-3 참고)은 계승하되 그 문서들을 대체하지 않는다.

---

## 0. 왜 다시 보는가 — 한 줄 요약

홈페이지를 포함해 사이트 전체가 "텍스트만 있는 페이지"인 것이 아니라, **이미 잘 만들어진 목업 44종(+미등록 4종) 중 절반 이상이 어디에도 안 쓰이고 있는 상태**다. 문제는 "새로 그려야 한다"가 아니라 "가진 것을 정리하고, 재사용 가능하게 고치고, 제자리에 배치한다"에 가깝다.

---

## 1. 현재 상태 — 근거 기반 인벤토리

### 1-1. 자산 총량

| 구분 | 수량 | 비고 |
|---|---|---|
| 등록된 목업 (`src/components/mockups/index.ts`) | 44종 | device frame 3 + phone 8 + desktop 1 + multi-store 2 + S1 다이어그램 4 + S2 다크 3 + S3~5 8 + 체험형 4(v5) 등 |
| 미등록이지만 실사용 중인 목업 | 4종 | `EnterpriseAppShowcase`, `AgentHqMiniMockup`, `HqRollupDashboardMockup`, `DoorSplitDiagram` — 직접 경로 import, registry 정합성 깨짐 |
| 완성된 도식 이미지 (`public/images/diagrams/`) | 6장 | four-step-loop / autonomy-ladder / mtmc-coordinate / spatial-ai-concept / seal-sdk-package / vision-models-tree |
| 기생성 컨셉아트 (`public/images/gen/`) | 4장 | anonymize-dissolve / funnel-floor-projection / iso-city-stores / bg-film00-night-cvs |
| 리테일 실사 계열 asset | 20장+ | `storecare-*`, `storeinsight-*`, `cctv-hero-*`, `drugstore-hero`, `solutions-hero` |
| 히어로 회전 이미지 | 6장(완성) + hero-v2 후보 세트 | 아래 1-4 참고 |
| GPT 이미지 생성 스크립트 | 3종 | `generate-hero-spaces.mjs`, `generate-brand-avatars.mjs`(구 `generate-openai/gpt-avatars.mjs` 대체) |

### 1-2. 배치 현황 — 35개 서브페이지 뷰 기준 (2026-07-23 전수조사로 갱신 — `docs/MOCKUP_AUDIT_RESULTS_260723.md` §1)

| 상태 | 수량 | 목록 |
|---|---|---|
| 목업을 쓰는 뷰 | 14 / 35 | AboutView, **AgenticAiTechView**(신규 — AutonomyLadder·LearningFlywheel·PosJoin), AnonymizerView, EnterpriseView, ModelsView, SaaiView, SealView, **SolutionDetailView**(신규 — SolutionMockupPreview 경유), SpatialAiView, StoreAgentView, StoreCareView, StoreCountView, StoreInsightView, TechnologyView |
| 목업이 전혀 없는 뷰 | 21 / 35 | CareerView, **DiagnosisView**, DocsView, DrugView, FaqView, FoodBeverageView, FunctionsView, FunctionToolView, GlossaryDetailView, GlossaryView, InvestorsView, LargeSpaceView, NewsView, PartnershipView, **ProductsView**, ResourcesView, **RetailView**, SaaiAdsInsightView, SaaiForOwnersView, **SolutionsView**, TeamView |
| 홈페이지 | 목업 5종+ | SpatialTrajectory(직접) · SpaceAiAnswerBeat→Chat+StoreInsight · HomeEnterpriseBeat→MultiStore · FeatureCarousel→ActionCard+IntegratedLoop |

고아는 **22종 → 9종으로 감소** (2026-07-23 기준): `AnonymizationMockup`, `FiveQuestionsMockup`, `OrderFlowMockup`, `PriorityEngineDiagram`, `PrivacyJourneyMockup`, `RoiCalculatorWidget`, `AlertFatigueComparison`, `AgentDaySimulator`, `StoreDayTimelapse`. 프레임·부품류(PhoneFrame·PhoneScreen·TabletFrame·MacBookFrame·BrowserChrome·MockupBadge·SaaiHeader·ScanlineOverlay)는 목업 내부 부품으로 정상 사용 중이라 고아에서 제외. 그 밖에 `StoreCountCountingMockup`·`StoreCareStatusMockup`은 coex 박람회 이벤트 랜딩에, `CaseStudyChartMockup`은 CaseStudyDetailView에, `BriefingMockup`·`MockupImage`는 storeagent 레거시 페이지에 배치됨. 미등록 4종(`EnterpriseAppShowcase`·`AgentHqMiniMockup`·`HqRollupDashboardMockup`·`DoorSplitDiagram`)은 **여전히 index.ts 미등록**. 죽은 코드 1건: `src/components/sections/LiveDemoSection.tsx`(BriefingMockup import하나 어떤 페이지에서도 미사용 — `_archive` 이관 후보).

### 1-3. 코드 품질 — 대표 7종 감사 결과

`FunnelDiagram` / `MultiStoreDashboardMockup` / `ChatMockup` / `KakaoAlertMockup` / `IntegratedLoopDiagram` / `HqMapDashboardMockup` / `types.ts`를 직접 열어 확인:

- **완성도는 이미 높다.** 전부 정적 스케치가 아니라 framer-motion 애니메이션, `useCountUp`, `useMockupLoop`/`useSequencedLoop`, 실제 브라우저 크롬·폰 프레임·카카오톡/LINE 스킨까지 흉내낸 상태 — "제품 수준으로 끌어올려야 한다"는 걱정보다는 **일관성과 배치**가 더 급한 문제였다.
- **재사용 가능한 구조는 아니다.** 7종 전부 콘텐츠(문구·숫자·라벨)가 컴포넌트 내부의 `COPY`/`C`라는 로케일별 맵에 하드코딩돼 있다. `locale`을 바꿔 언어는 바뀌지만, **같은 컴포넌트를 다른 문맥(다른 페이지, 다른 숫자)에 재사용하려면 파일을 직접 고쳐야 한다.** 사용자가 말한 "콘텐츠만 바꿔서 재활용"은 지금 구조에서는 안 된다.
- **토큰 사용이 들쭉날쭉하다.** `src/lib/mockup-tokens.ts`(`MOCKUP_SCHEME`, `MOCKUP_DEVICE`)를 실제로 쓰는 건 7종 중 2종(`MultiStoreDashboardMockup`, `ChatMockup`)뿐. 나머지는 각자 로컬 hex 상수를 새로 만들거나(`HqMapDashboardMockup`의 `STATUS_COLOR`), Tailwind 임의값 hex를 직접 씀(`KakaoAlertMockup`의 `bg-[#06c755]` 등 — 단, 이건 카카오톡/LINE 실제 브랜드색을 재현해야 해서 의도적 예외로 볼 수 있음).
- `types.ts`의 공용 `BaseMockupProps`(`active`, `storeName`, `locale`, `className`)가 있지만 7종 다 이걸 완전히 따르진 않는다 — 공용 인터페이스 확장이 필요.

### 1-4. 발견 — 히어로 이미지, 이미 완성돼 있었다

`CorporateHero.tsx` → `CorporateHeroFigure`가 `heroSpaceImages`(매장·현장·전시장·물류센터·카페·무인매장, 회전 단어와 싱크되는 크로스페이드)를 렌더링하도록 이미 배선돼 있고, `src/data/siteImages.ts`의 6개 경로도 `public/images/hero/hero-*.webp` 실파일과 정확히 일치한다. 그런데 실제 리뷰한 `ds-hp-temp.vercel.app/ko` 프리뷰에는 이미지가 안 보였다 — 파일 mtime상 오늘 막 완료된 작업으로 보이며, **프리뷰가 최신 커밋을 아직 반영 못 한 것으로 추정**된다. → §4 실행 순서의 0번.

### 1-5. 선행 계획 문서가 이미 정한 원칙 (계승 대상)

`MOCKUP_PROPOSALS_v5`(체험형 데모 4종, 완료·리뷰 종료)가 남긴 공통 규율:

- 수치는 `src/data/mockup-scenarios/canonical.ts` 파생만 사용 (하드코딩 금지)
- 데모 내부에서 서버 호출 0건, 폴백/빈 화면 금지
- 결과 화면당 CTA는 정확히 1개
- 데모당 추가 JS ≤ 300KB
- `prefers-reduced-motion` 가드 필수
- ko/en/jp 3로케일 대응 필수

`docs/STATUS.md`(§15, 2026-07-20 갱신)가 남긴 **미착수 항목**: "제품 목업 개선(insight 17기능 그룹핑·care·agent) · FAQ 컴포넌트 재디자인 · 기술 시각(spatial-ai 카메라+지도·models 카탈로그)". `/demo`는 여전히 `noindex`+미연결 상태로 격리 유지 중.

---

## 2. 이번 계획의 설계 원칙

1. **디자인 시스템 우선.** 새로 만들거나 고치는 목업은 `src/lib/mockup-tokens.ts`(`MOCKUP_SCHEME`/`MOCKUP_DEVICE`)를 기본으로 쓴다. hex 직접 사용은 `DESIGN.md`가 명시한 대로 `mockups/**`에 한해 예외지만, 팔레트는 브랜드 blue·gray·status 3종 안에서만 — 카카오톡/LINE처럼 외부 브랜드색 재현이 목적인 경우만 별도 예외로 문서화한다.
2. **콘텐츠·표현 분리(재사용성의 핵심).** 우선순위가 높은 컴포넌트부터 `COPY` 하드코딩 맵을 `content` prop으로 바꾼다 — 즉 `<FunnelDiagram data={...} labels={...} />`처럼 호출부에서 문구·숫자를 주입하고, 컴포넌트는 locale별 **기본값**만 fallback으로 유지한다. 이래야 "같은 컴포넌트, 다른 페이지, 다른 숫자"가 가능해진다.
3. **canonical 데이터 우선순위는 유지.** 가능한 수치는 `canonical.ts` 파생을 그대로 쓰고, 페이지별로 다른 숫자가 필요할 때만 명시적 override prop을 연다 — v5가 정한 "하드코딩 금지" 정신을 깨지 않는 선에서 유연성을 더한다.
4. **성능·접근성 규율을 전체로 확대.** JS 예산, reduced-motion, 3로케일, "빈 화면 금지" — 지금은 체험형 4종에만 명문화돼 있지만 전체 목업에 동일 기준을 적용한다.
5. **registry를 신뢰 가능한 단일 목록으로.** 미등록 4종(`EnterpriseAppShowcase` 등)을 `index.ts`에 등록하고, 진짜 죽은 코드인지 재배치 대상인지 이번 문서에서 전부 라벨링한다(§3 참고).

---

## 3. 목업별 처리 방침 — "재배치 / 리팩터 / 폐기 후보"

고아 상태 22종 + 저활용 컴포넌트를 페이지 계획(§4)과 묶어 처리한다. 리팩터 우선순위는 **재사용 빈도가 높을수록, 토큰 미준수가 심할수록** 위로 올렸다.

| 우선순위 | 컴포넌트 | 현재 상태 | 처리 방침 |
|---|---|---|---|
| P0 | `FunnelDiagram` | 홈페이지 사용 중, 토큰 미사용 | 토큰화 + content prop화 (재사용 빈도 1위 — 홈페이지 외 다른 문제 제기형 섹션에도 적합) |
| P0 | `ChatMockup` | 고아, 토큰 사용 중 | content prop화만 하면 즉시 재배치 가능 — §4 홈페이지 비교 카드에 투입 |
| P0 | `MultiStoreDashboardMockup` / `HqMapDashboardMockup` | 각각 1곳 사용, 토큰 일부/미사용 | 토큰 통일 + content prop화 — "본사 한 화면" 계열 섹션 전반에 재사용 |
| P1 | `KakaoAlertMockup` | 1곳 사용(StoreCareDeviceTabs), 브랜드색 예외 유지 | content prop화만 진행, 토큰화는 예외 문서화 후 보류 |
| P1 | `ActionCardMockup`, `PushNotificationMockup`, `BriefingMockup` | 고아 | agent 관련 섹션(홈페이지 + StoreAgentView 보강)에 재배치, content prop화 |
| P1 | `IntegratedLoopDiagram` | 2곳 사용, 토큰 미사용(로컬 hex) | 토큰화 — SVG fill을 `MOCKUP_SCHEME` 파생으로 교체 |
| P2 | `StoreInsightMockup`, `StoreCountCountingMockup`, `StoreCareStatusMockup` | 고아, `StoreInsightDesktopMockup`/`StoreCareMockup`과 기능 중복 가능성 | 페이지 배치 전에 **중복 여부 먼저 판정** — 겹치면 폐기 후보, 다르면 §4의 8개 우선 페이지에 배치 |
| P2 | `AlertFatigueComparison`, `PrivacyJourneyMockup`, `AgentDaySimulator`, `StoreDayTimelapse` (v5 체험형 4종) | 고아이지만 완성도 최고 수준(v5 리뷰 완료) | `/demo` 밖 실제 페이지 배치가 유일한 남은 과제 — StoreAgentView·EnterpriseView·SealView에 순서대로 투입 |
| P2 | `RoiCalculatorWidget`, `FiveQuestionsMockup`, `OrderFlowMockup`, `CaseStudyChartMockup` | 고아 | ProductsView/SolutionsView 허브 페이지(§4 Tier1)에 배치 검토 |
| P3 | `MockupImage`, `AnonymizationMockup` | 고아 | 용도 재확인 필요 — `AnonymizationMockup`은 SEAL 섹션의 원본/익명화 슬라이더와 기능 중복 여부 확인 후 결정 |
| P3 | `AutonomyLadderTimeline`, `PriorityEngineDiagram` | 고아 | STATUS.md의 "spatial-ai 카메라+지도·models 카탈로그" 미착수 항목과 묶어 처리 |

미등록 4종(`EnterpriseAppShowcase`, `AgentHqMiniMockup`, `HqRollupDashboardMockup`, `DoorSplitDiagram`)은 **즉시 `index.ts`에 등록** — 실사용 중인데 registry에 없어 향후 재사용·검색이 어렵다.

---

## 4. 페이지별 롤아웃 계획

### Tier 0 — 홈페이지 (즉시 착수)

| 섹션 | 현재 | 투입할 목업/asset | 작업 |
|---|---|---|---|
| 히어로 | 텍스트만 보임(코드는 완성) | `heroSpaceImages` 6종 | **재배포 확인**만 하면 됨 (§5-0) |
| SAAI는 알고 있습니다 / 보는 AI를 넘어 (전환부) | 텍스트만 | `public/images/gen/bg-film00-night-cvs.png`, `iso-city-stores.png` | 배경 무드 이미지로 추가 (신규 제작 불필요) |
| 범용 AI vs SAAI 비교 카드 | 아이콘+텍스트만 | `ChatMockup`(왼쪽) + `SpatialTrajectoryMockup` 또는 `StoreInsightMockup`(오른쪽) | content prop화 후 재배치 |
| 모든 매장을, 한 매장처럼 | 라벨 2개뿐 | `MultiStoreDashboardMockup` 또는 `HqMapDashboardMockup` | content prop화 후 재배치 |
| SAAI 네 글자(S·A·A·I) | 텍스트 카드만 | `public/images/diagrams/four-step-loop.webp` 또는 `IntegratedLoopDiagram` | 기존 asset 재사용 |
| 다음을 실행하다(saai agent) | 폰 목업 1개뿐 | `ActionCardMockup`, `KakaoAlertMockup` 추가 | content prop화 후 재배치 |

### Tier 1 — 목업이 전혀 없는 페이지 중 우선순위 8개

허브·버티컬 페이지라 방문 빈도·전환 기여가 클 것으로 추정되는 순서:

1. **ProductsView** — 허브 페이지 → `RoiCalculatorWidget`, `CaseStudyChartMockup`으로 제품군 한눈에 비교
2. **SolutionsView** — 허브 페이지 → `FiveQuestionsMockup`(진단형) 배치
3. **SolutionDetailView** — 개별 솔루션 상세 → 해당 산업 실사(`storecare-industry-*`) + 관련 목업 1개
4. **RetailView** — 버티컬 → `storecare-industry-retail.webp` + `StoreInsightMockup`
5. **FoodBeverageView** — 버티컬 → `storecare-industry-cafe.webp` + `OrderFlowMockup`
6. **LargeSpaceView** — 버티컬 → 신규 실사 필요(§5-2) + `AutonomyLadderTimeline`
7. **SaaiAdsInsightView** — → `StoreInsightMockup` 또는 `CaseStudyChartMockup`
8. **SaaiForOwnersView** — 점주 대상 → `ActionCardMockup`, `KakaoAlertMockup`(이미 검증된 톤)

### Tier 2 — STATUS.md 미착수 항목과 통합

- "insight 17기능 그룹핑" → `StoreInsightMockup`/`StoreInsightDesktopMockup` 중복 정리(§3 P2)와 함께 재설계
- "care·agent 목업 재구성" → `StoreCareStatusMockup`, `ActionCardMockup`, `AgentDaySimulator` 재배치로 상당 부분 해결 가능
- "FAQ 컴포넌트 재디자인" → 이번 계획 범위 밖(목업이 아닌 UI 패턴) — 별도 이슈로 분리 제안
- "spatial-ai 카메라+지도·models 카탈로그" → `PriorityEngineDiagram`, `ModelCatalogMockup`(이미 SpatialAiView/ModelsView에서 사용 중이므로 고도화만 필요)

### Tier 3 — 콘텐츠형 페이지 (목업보다 이미지·일러스트가 적합)

`FaqView`, `GlossaryView`, `GlossaryDetailView`, `NewsView`, `CareerView`, `TeamView`, `InvestorsView`, `PartnershipView`, `DocsView`, `ResourcesView` — 대시보드성 목업보다 아이콘/일러스트/사진이 톤에 맞다. 이번 트랙에서는 제외하고 별도 "콘텐츠 페이지 비주얼" 계획으로 분리 제안.

---

## 5. Asset 조달 계획

### 5-0. 재배포 확인 (비용 0, 최우선)

히어로 이미지가 코드상 완성돼 있으니 배포만 확인. 새 작업 아님.

### 5-1. 기존 asset 재사용 (비용 0)

§4 표에 이미 반영. `diagrams/`, `gen/`, `storecare-*` 계열을 우선 소진한 뒤에만 신규 생성으로 넘어간다.

### 5-2. 신규 이미지 생성 — 기존 GPT 파이프라인 확장

`generate-hero-spaces.mjs`/`generate-brand-avatars.mjs`가 이미 정립한 golden-sample 절차를 그대로 따른다: **파일럿(1종×3안, 톤 판정) → dry-run 프롬프트 확정 → 배치 생성(스타일 레퍼런스 이미지 첨부로 톤 고정) → select(대표 프레임) → post(webp 변환+컨택트 시트) → apply(반영)**.

필요 목록(우선순위순):
1. **LargeSpaceView용 대형 공간 실사** — `hero-v2`의 `logistics`/`site` 프레임을 스타일 레퍼런스로 물려 생성
2. **전시·박물관 / 무인매장 업종 사진 보강** — `storecare-industry-*.webp`를 스타일 레퍼런스로, 홈페이지 BEYOND RETAIL 6카드 톤 통일
3. **SAAI 네 글자 미니 아이콘 4종** — 팀 아바타 때처럼 스타일 앵커 1개 확정 후 배치 생성

### 5-3. 실제 제품 스크린샷 요청

목업으로 대체 불가능한 신뢰도가 필요한 지점 — `saai insight/care/agent` 실제 대시보드 화면, `StoreAgentView`의 실사용 알림 캡처. 목업은 자리를 잡아두는 placeholder로 쓰고, 확보되는 대로 교체.

### 5-4. 신규 목업 컴포넌트 제작이 필요한 지점

기존 44종+4종으로 못 채우는 곳만 신규 설계:
- STATUS.md "insight 17기능 그룹핑" 전용 카드형 목업 (기존 `StoreInsightMockup` 계열 중복 정리 후 진짜 공백이 남으면 착수)
- LargeSpaceView 전용 "혼잡도·안전 동선" 목업 (현재 44종 중 정확히 대응하는 것 없음 — `HqMapDashboardMockup` 변형으로 커버 가능한지 먼저 검토, 안 되면 신규)

---

## 6. 제안 실행 순서

1. **히어로 재배포 확인** (§1-4) — 가장 빠르고 확실한 개선
2. **기반 작업**: `index.ts`에 미등록 4종 등록, P0 4종(`FunnelDiagram`/`ChatMockup`/`MultiStoreDashboardMockup`/`HqMapDashboardMockup`) 토큰화+content prop화
3. **홈페이지 Tier 0** 섹션 6곳에 위 컴포넌트 재배치
4. **P1 컴포넌트** content prop화 → **Tier 1 우선순위 8개 페이지** 순차 적용
5. **§3 P2/P3 중복 판정** (StoreInsight* 3종, AnonymizationMockup vs SEAL 슬라이더) → 폐기/유지 결정
6. **신규 asset 생성**(§5-2) 필요 목록 3건 처리
7. **STATUS.md Tier 2 항목**과 신규 목업 필요분(§5-4) 판단 후 착수

---

## 7. 결정이 필요한 질문

- `/demo` 갤러리를 계속 내부 전용(noindex)으로 둘지, 완성도가 높아진 만큼 일부를 공개 페이지로 승격할지
- P2/P3의 `StoreInsightMockup`/`StoreCountCountingMockup`/`StoreCareStatusMockup` — `StoreInsightDesktopMockup`/`StoreCareMockup`과 기능이 겹치는지 실제 화면 비교가 먼저 필요
- 실제 프로덕트 스크린샷(§5-3) 확보 일정 — 목업으로 얼마나 오래 대체할지
- Tier 1 8개 페이지의 실제 우선순위 — 트래픽/전환 데이터가 있다면 이 문서의 추정 순서를 교정
