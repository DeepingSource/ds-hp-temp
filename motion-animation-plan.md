# DeepingSource — Motion 애니메이션 적용 계획

문서 버전 v1 · 2026-06-26 · 기준: [motion.dev](https://motion.dev/) (= 우리가 쓰는 **framer-motion v12.34.3**, 동일 라이브러리)
대상: `deepingsource.io` 전체 사이트 (홈·제품·회사·기술·솔루션)
근거: 5개 영역 병렬 애니메이션 감사(`wf_fd0d65b9`) — 56개 기회(P0 16 / P1 24 / P2 16)

---

## 0. 결론부터

우리는 이미 **Motion(framer-motion v12)** 을 쓰고 있어 **신규 의존성 0**으로 다양한 애니메이션을 적용할 수 있습니다.

**현재 상태(잘 되어 있음):** 거의 모든 섹션이 `AnimatedSection`(IntersectionObserver→CSS fadeInUp) 1회 스크롤 리빌 + 일부 `StaggerContainer/Item`·`CountUp`·`WordRise`(hero)·mockup `useMockupLoop`. reduced-motion은 `usePrefersReducedMotion`/`useMockupLoop`로 게이트됨. 최근 추가: `ProcessStepper`(step 자동 하이라이트), `FeatureCarousel`(홈 다크 스포트라이트).

**공백(Motion을 덜 쓰는 곳):**
1. **scroll-linked 모션 0건** — `useScroll`/`useTransform` 미사용 → parallax·진행연동·SVG draw 전무.
2. **`layout`/`layoutId` 공유요소 거의 미사용** — 탭 슬라이딩 인디케이터·magic-underline·cross-route 매직무브 없음.
3. **SVG 내러티브가 100% 정적** — OperatingLoopGraphic 링, HubDataBand 이중선, DoorSplit, ComparisonPrinciple 분포곡선, 각종 timeline spine.
4. **리빌 시스템 2개 병존** — CSS `.scroll-visible/.stagger-child`(nth-child 6 제한) vs framer `useInView`. 통합 프리미티브 없음.
5. **글로벌 `MotionConfig` 없음** — OS reduced-motion 안전망이 컴포넌트별 수동 처리에만 의존.
6. **숫자가 대부분 정적 텍스트** — 퍼널 카운트/−317/정확도/흡인율/파트너 통계 등 count-up 미적용.

**전략 원칙 (모든 작업 공통 가드레일):**
- **reduced-motion 필수** — 비필수 모션은 전부 게이트, 정적/opacity-only로 degrade.
- **성능** — `transform`/`opacity` 위주(레이아웃 스래시 회피), 화면 밖 루프 scroll-gate, **hero는 LCP/SSG 보호**(WordRise는 CSS·first-paint 안전).
- **토큰/브랜드** — `--color-primary`, `break-keep`, raw hex 금지, B2B 절제미(과하지 않게).
- **점진 마이그레이션** — 기존 리빌을 한 번에 갈아엎지 않고 새 프리미티브로 점진 이전.

**접근: 인프라 기반 → 고임팩트 → 디테일 → 고급.** 기반(Phase A)을 먼저 깔면 페이지 작업이 `<Reveal>`·`useParallax()` 한 줄로 쉬워집니다.

---

## Phase A — 기반 인프라 (먼저 · 페이지 작업을 푸는 열쇠)

| # | 작업 | Motion 기법 | 파일 | 효과/노트 |
|---|---|---|---|---|
| **A1** | **root `MotionConfig reducedMotion="user"`** | `MotionConfig` | `app/layout.tsx`(client wrapper) | 40개 framer 파일 전부 OS 설정 자동 존중(안전망). [S] |
| A2 | reduced-motion 단일 소스화 | `usePrefersReducedMotion` | `useScrollAnimation.ts`·`LoopVideo.tsx` | 흩어진 `matchMedia` 3곳을 하나로. [S] |
| A3 | **easing 토큰** | bezier 튜플 | `src/lib/easing.ts`(신규) | `easeOutCubic [0.22,1,0.36,1]` 등 CSS var 미러 → framer `transition.ease` 공유. [S] |
| **A4** | **`Reveal`/`RevealStagger` 프리미티브** | `whileInView` + `viewport{once}` + `staggerChildren` | `src/components/ui/Reveal.tsx`(신규) | CSS `.scroll-visible` ↔ framer `useInView` 이원화 해소. 신규 섹션은 이걸로. [M] |
| **A5** | **`useParallax` 훅** | `useScroll` + `useTransform`(+`useSpring`) | `src/hooks/useParallax.ts`(신규) | 사이트 첫 scroll-linked 모션 기반. [M] |
| A6 | (선택) 번들 다이어트 | `LazyMotion` + `m` | root + 40 파일 | `motion.*`→`m.*`, SSG 마케팅 사이트 JS 축소. [L · P1로 분류 가능] |

> ⚠️ **구현 노트 (PR2에서 발견):** 이 스택(Next 16 / React 19 / framer-motion v12)에서 **`motion.*` SVG 엘리먼트(circle/path/polyline/rect/g)는 클라이언트 하이드레이션이 안 붙어** SSR 정적 상태(drawn)로 고정된다(inline style 미적용 확인). framer **HTML 모션(div/span: opacity/scale/scaleY)은 정상**. → **SVG draw/fade는 CSS로**(`strokeDasharray`+`strokeDashoffset` transition, `opacity` transition, `--ease-out-cubic` var) 처리하고 `useScrollAnimation`의 `isVisible`로 토글한다. HTML 모션만 framer 사용. 모든 Phase B~D의 SVG 작업에 적용.

> Phase A는 **1개 PR**로 묶고, 기존 동작을 깨지 않는 추가/리팩터만(시각 변화 최소). A4/A5는 이후 모든 Phase가 소비.

---

## Phase B — P0 고임팩트 (콘텐츠 설득력 ↑)

**B1. SVG 내러티브 draw-on-scroll** — 정적 도식을 "그려지며" 의미를 전달
- `OperatingLoopGraphic`(/products hero): 점선 링 `pathLength 0→1` + 4 스테이지 노드 시계방향 stagger, 셰브론 흐름 펄스. *(client 추출 필요)*
- `HubDataBand` 이중선(체류 vs 매출): 두 polyline `motion.path pathLength`, 체류 먼저→매출 후반 하락이 보이게 stagger. *(store-insight)*
- `DoorSplitDiagram`(count↔insight): 퍼널 막대 grow + 흡인율 33% count-up + 히트맵 셀 fade-stagger.
- `ComparisonPrinciple` 분포곡선: 종형 곡선 `pathLength` draw → "이 매장" 마커 평균 위로 pop.
- 기법: `useScroll({offset:['start 0.8','center center']})` + `useTransform`→`pathLength`, 또는 `whileInView`. reduced-motion 시 완성 상태 정적.

**B2. 숫자 count-up 확장** (`CountUp` 재활용, reduced-motion 자동 처리)
- `ProblemBeat`: 퍼널 카운트 382→65 + **−317 leak**.
- `StoreCountView`: 정확도 헤드라인 95–96% + 3개 사이트 타일.
- `DoorSplitDiagram`: 흡인율 33%.
- `AboutView`: Trusted Partners 통계 타일(파트너/업종/특허) + stagger.
- `PartnerGrid`: NVIDIA 셀(현재 정적 텍스트).

**B3. 퍼널 막대 grow** — `ProblemBeat` 막대 0→pct(`scaleX`, transform-origin left, top→bottom stagger). 카드 리빌 후 시작(경쟁 방지). *(레이아웃 스래시 회피 위해 width 대신 scaleX)*

**B4. 서브페이지 hero 통일** — 전 서브뷰 hero를 홈과 동일 모션 언어로: eyebrow fade → h1 `WordRise`(SSG/LCP 안전) → sub/CTA/stat-chip stagger up. `HeroReveal` 얇은 client 래퍼. (About·Career·Partnership·Investors·Technology·Solutions·Retail/F&B/Drug/Large·Anonymizer/Seal/SpatialAi/Models·Enterprise·Resources·SolutionDetail)

**B5. 홈 엔드카드 시네마틱 parallax** — 마지막 다크 CTA의 정적 데코 2겹(funnel-floor-projection bg + SAAI watermark)을 느린 scroll-linked parallax(반대방향 y) + 미세 breathing glow. 이미지 `scale 1.1`로 엣지 갭 방지, 진폭 ≤24px.

**B6. CaseBand 일관성** — 케이스 스크린샷 hover scale-105(SpacesShowcase와 일치) + 결과 델타(+10/+25/+15%) count-up. [S · CSS+CountUp]

**B7. SolutionDetail 템플릿** — 모든 솔루션 상세에 적용되는 무모션 템플릿에 4-step(Observe→Analyze→Suggest→Learn) 순차 reveal + draw-line 커넥터, results stats grid count-up, hero 임팩트 숫자.

**B8. Industry views** — Retail/F&B/Drug/Large-space의 시나리오 카드(3)·before/after 행 `stagger-child` + hover lift(현재 한 블록 fade).

---

## Phase C — P1 (디테일 · 일관성 · 매직무브)

**C1. `layoutId` 슬라이딩 인디케이터** (springTabPill)
- `StoreCareDeviceTabs` 세그먼트 토글: 점프 pill → 슬라이딩 pill.
- `AgentMockupShowcase` 좌측 탭 rail: 글라이딩 액티브 바.
- `Header` nav: aria-current 기반 **magic-underline**.
- `FeatureCarousel` 진행 nav: 활성 pill에 3.6s 채워지는 underline/ring(`loopKey` 활용) → 자동순환이 의도적으로 읽힘.

**C2. `CorporateHero` 연출** — 쌓인 CSS delay-200/300/400 → `useAnimate` 시퀀스(`stagger()` 헬퍼); ID 박스 blink → **순차 lock-on**(스캔 후 정착); 피겨 마우스/스크롤 parallax(미세 rotateX/Y). **LCP/SSR 경로 불변**, 데코 오버레이에만 모션, 터치 시 tilt 끔.

**C3. `ProblemBeat` operating-loop** — 4카드 좌→우 시퀀스 + 화살표 커넥터 draw("루프를 닫는다" 극화).

**C4. `SpatialTrajectoryMockup`** — 9포인트 이산 hop(900ms) → `useSpring`/`animate` 연속 보간 글라이드 + 점선 경로 draw-on-reveal.

**C5. Timeline draw** — `InvestorsView` 마일스톤 세로 라인 `scaleY`(origin-top) scroll-linked + 노드 pop; `OriginStoryTimeline` spine 동기 성장; `VisionDiagram` 노드 좌→우 + **데이터 패킷 dot** 커넥터 이동; `MasterPair` 좌/우 카드 수렴(메타포 = 모션).

**C6. `SolutionsView` 카탈로그** — 업종 그룹별 reveal + 카드 stagger + 배너 ken-burns/parallax.

**C7. `HqRollupDashboardMockup`** 라이브화 — KPI count-up + 타입 막대 grow + 랭킹 행 stagger + 알림 피드 `AnimatePresence` enter/exit. client+`useMockupLoop`(scroll-gate·pause-hover).

**C8. `StoreInsightView` Before/After** — 정적 합성 → `BeforeAfterSlider` 드래그 비교(프레임 분리 필요).

**C9. product hero `WordRise` 통일** — 5개 제품 hero 타이틀에 홈 hero 트리트먼트(B4와 연동).

**C10. `useSequencedLoop` 훅** — `useMockupLoop`은 고정간격 step만; `ChatMockup` 등 **setTimeout 13종**의 메시지별/다단계 시퀀싱을 `useAnimate` 시퀀스 또는 신규 훅(타이머/취소/reduced-motion 재활용)으로 통일.

---

## Phase D — P2 (고급 · 딜라이트)

- **D1** `app/template.tsx` 라우트 전환 페이드/슬라이드(현재 하드컷). + `Accordion` height·Header 모바일 메뉴 `AnimatePresence`.
- **D2** View Transitions **공유요소 cross-route** — DoorSplitDiagram(count↔insight)·product badge가 네비 시 지속(Next App Router View Transition).
- **D3** **드래그 네비** — SpacesShowcase·FeatureCarousel 모바일 스와이프(`drag='x'`+velocity snap).
- **D4** 자연스러운 모션 — FeatureCarousel 스포트라이트 `useSpring` 트레일, `useVelocity` 스크롤 skew, Header **스크롤 진행바**.
- **D5** 앰비언트 — CorporateHero 헤드라인 뒤 느린 brand-blue radial glow(FeatureCarousel 스포트라이트 기법 재활용); SolutionTimeline 썸네일 parallax; TrustCharter 슬라이더 **nudge hint**(첫 뷰 1회 자동 peek + `TapIndicator`); 반복 다크 CTA watermark parallax.
- **D6** 정리 — `stagger()` 헬퍼 도입(PartnerGrid 등), `SlidingIndicator`/`SegmentedControl` 프리미티브 추출(`IosSegmentedControl`+layoutId 패턴 통합), globals.css `.scroll-visible/.stagger-child/.draw-line`를 Reveal 시스템으로 흡수.

---

## 권장 실행 순서 (PR 묶음)

1. **PR1 — Phase A 인프라** (MotionConfig·easing·Reveal·useParallax·reduced-motion 단일화). 시각 변화 최소, 이후 작업의 토대.
2. **PR2 — B1 SVG draw + B2/B3 숫자·막대** (제품 설득력 최대 레버, 한 묶음).
3. **PR3 — B4 hero 통일 + B8 industry + B6 CaseBand + B7 SolutionDetail** (사이트 전반 일관성).
4. **PR4 — Phase C** (layoutId 인디케이터·hero 연출·timeline·mockup 라이브화) — 2~3개로 분할 가능.
5. **PR5 — Phase D** (라우트 전환·View Transitions·드래그·앰비언트) — 선택적 딜라이트.

각 PR: tsc·eslint·lint:tokens·클린 빌드 + Playwright(자동순환/리빌/reduced-motion/overflow) 검증, KO/EN/JP 확인.

---

## 부록 — Motion 기법 ↔ 적용처 매핑 (motion.dev)

| Motion 기법 | 현재 | 적용처 |
|---|---|---|
| `useScroll`+`useTransform` (parallax/progress) | **0건** | B5 엔드카드·C2 hero 피겨·D4 진행바·D5 썸네일/배너 |
| `pathLength` SVG draw | **0건** | B1 OperatingLoop/HubData/DoorSplit/Comparison·C5 timeline |
| `layout`/`layoutId` 공유요소 | 거의 없음 | C1 탭/nav 인디케이터·D2 cross-route 매직무브 |
| `whileInView`(선언적 리빌) | 혼용 | A4 Reveal 프리미티브로 통합 |
| `AnimatePresence` 전환 | 일부(carousel) | D1 라우트/Accordion/메뉴 |
| `useSpring`/`useVelocity` | 없음 | C4 궤적 보간·D4 스포트라이트 트레일/skew |
| `drag` 제스처 | BeforeAfterSlider만 | D3 캐러셀/쇼케이스 스와이프 |
| `useAnimate`(시퀀스) | 없음 | C2 hero 연출·C10 mockup 시퀀싱 |
| `MotionConfig reducedMotion` | 없음 | A1 글로벌 안전망 |
| `stagger()` 헬퍼 | 없음(CSS nth-child) | D6 카드/칩 정교한 진입 |

*작성: 2026-06-26 · 상태: v1 계획 · 다음: 사용자 우선순위 확정 → PR1(Phase A) 착수*
