> 📌 **현재 상태 — 이 체인의 라이브 SOT (2026-06-19 정리)**
> 본 문서는 MOCKUP_PROPOSALS v1–v5 + MOCKUP_REVIEW v1/v2 로 이어지는 append-only 검토 체인의 **최신 항목**이다.
> 목업 데이터의 라이브 SOT 는 **`src/data/mockup-scenarios/canonical.ts`**(+ `src/data/storeagent-mock-i18n.ts`)이며, 실제 렌더는 라이브 **`/demo` 갤러리**에서 확인한다 — 계획 체인이 아니라 그쪽이 현행 기준이다.

# 목업 검토 & 개선 계획 v2 — 신규 15종 비판적 코드 리뷰

> **작성** 2026-06-05 · **보강** 같은 날 — 내용(카피·시나리오·도메인 현실성) 검토 추가(§1B·§4B) · **대상** v4에서 구현된 신규 15종(#1~#14) + 공유 인프라 · **방법** 전 파일 코드 리뷰 + 리테일 도메인/카피 검토, v4 스펙·Upgrade Spec A1~A5 원문·canonical.ts·보이스 v2.5 대조
> **전제** — [v5.1](./MOCKUP_PROPOSALS_v5.md)(#16~#19 체험형) 작업과 **병행**된다. §5에 충돌 주의 영역 명시 — v5 작업 브랜치와 같은 파일을 건드리는 항목은 표시해 두었다.

---

## 0. 총평

정량 룰(30자 알림·이모지 9종·요금 수치·3로케일·caption/scope·reduced-motion 폴백)은 대부분 통과 — 기본기는 평균 이상. 그러나 **데모 현장에서 한 번의 조작·한 번의 시선으로 들통나는 치명 결함이 4건**(ROI 죽은 입력, 모델 카탈로그 상태 모순, 본부 지도 바다 핀, L0 노드 글자 실종) 있고, **D1 헤더 표기가 신규 15종 전멸**이라 v4 체크리스트의 "완료" 표기와 실제 구현이 어긋나 있다. 카피 확정 원문은 본문은 충실하지만 **AC에 명시된 CTA 3건이 누락**됐다.

**내용 검토(보강)의 결론**: 세계관 정합(우산·강수 70%·냉장고 12°C·삼각김밥 12개·14:23 타임스탬프·6카테고리 어휘)은 기대 이상으로 잘 묶여 있다. 그러나 **도메인·논리 차원의 치명상 3곳** — (1) 편의점 전환율 23%라는 업태 오류가 SOT에 박혀 퍼널 BLUF로 증폭, (2) ROI 계산기가 **월 비용 ₩149,000 vs 절감 ₩19,380,000(130배)** 출력으로 각주 신뢰까지 소각, (3) Priority L1~L4 vs Autonomy L0~L5의 'L' 기호 충돌 — 이 셋은 회의적인 본부 실무자가 1분 안에 잡아낸다. 다행히 수정 지점이 canonical.ts와 상수 몇 줄에 모여 있다.

---

## 1. 🔴 치명 — 시연 중 들통나는 결함 (즉시 수정)

| # | 위치 | 결함 | 수정 지시 |
|---|---|---|---|
| C1 | `RoiCalculatorWidget.tsx:169-184` | **입력 3개 중 `opHours`(운영시간)가 산식에 미사용** — 슬라이더를 움직여도 출력 불변. 계산기 신뢰 즉사 | 산식 반영: `labor = stores × 2.4 × min(1, opHours/16) × wage × days` 류 보정 + 각주 갱신. 반영 불가 판단 시 입력 제거 |
| C2 | `ModelCatalogMockup.tsx:24-37` vs `ModelsView.tsx:49-51` | **모델 출시 상태 모순** — flow-density·queue-detect가 카탈로그=available, ModelsView=Building. 같은 사이트가 다른 주장 | 모델 12종을 `src/data/models.ts`로 단일화(이름·상태 3단·입출력·연결 제품), 두 화면 모두 import |
| C3 | `HqMapDashboardMockup.tsx:90-131` | **핀이 바다에 찍힘**(폴리곤 내부 검사 없는 bbox 난수) + **60핀 서브셋이라 범례 9/4와 화면 불일치**(빨간 핀 ~1개) | 수작업 좌표 또는 point-in-polygon으로 실루엣 내부 보장. 비정상 13핀(9+4)은 전수 표시, 정상만 솎기. 제주 포함 실루엣 보강 |
| C4 | `AutonomyLadderTimeline.tsx:204-212,277` | **L0~L2 노드 글자 실종** — rgba(블루 0.12) 배경에 `text-white`. WCAG 이전에 안 보임 | 저단계 = 회색 배경+진한 글자 / 고단계만 블루+흰 글자로 분기 — "회색→블루 점진" 스펙에도 더 충실 |
| C5 | `ModelCatalogMockup.tsx:351` + `useMockupLoop.ts:99-124` | **행 클릭이 키보드 불가** + **goTo 후 loopKey 재기동으로 0번 행 리셋**(클릭한 모델이 유지 안 됨) | tr에 tabIndex+Enter/Space(또는 행 내 button), `aria-selected` 체계. 훅은 goTo 시 재시작 기준 step 유지하도록 수정 — **(v5 병행 주의: useMockupLoop 공용)** |
| C6 | `KakaoAlertMockup.tsx:148-207` | **pauseOnHover가 가짜** — useMockupLoop의 step 미사용, 실제 리빌은 자체 타이머라 hover해도 안 멈춤. visibilitychange 핸들러도 빠른 토글 시 중복 기동 여지 | 리빌 타이밍을 useMockupLoop step 파생으로 재배선(Push 패턴), 자체 타이머 제거 |
| C7 | `SpatialTrajectoryMockup.tsx:259` | **모바일에서 궤적 SVG `hidden sm:block`** — 핵심 데모(점선 궤적·ID 라벨)가 모바일 미존재, 빈 CCTV 타일 3장만 | 모바일용 세로 viewBox 변형으로 궤적 유지(3캠 세로 스택 + 세로 궤적) |

---

## 1B. 🔴 내용 치명 — 도메인·논리 오류 (보강, 즉시 수정)

| # | 위치 | 결함 | 수정 지시 |
|---|---|---|---|
| N1 | `canonical.ts:35` → `FunnelDiagram` BLUF | **편의점 전환율 23%는 업태 오류 + 수학 모순** — 편의점 구매전환 통념은 80~95%. 객단가(124.5만÷342=₩3,640)는 "전원 구매" 전제인데 23% 전환이면 객단가 ₩15,960이 돼야 함. 이 모순이 "구매까지, 100명 중 23명" 헤딩으로 가장 큰 자리에 노출 | **퍼널 모수 재정의**: 23을 살리려면 "신상품 매대 앞에 멈춘 100명 중 23명만 집습니다"로 매대 단위 퍼널화(Insight 제품 본질에도 부합). canonical 주석에 '매대 전환율'임을 명시하고 라벨 통일 — **(v5 병행 주의: #16 dayTimeline과 canonical 동시 확장)** |
| N2 | `RoiCalculatorWidget` 산식 모델 | **ROI 130배 — "안 믿겨요" 생성기.** 월 ₩14,900짜리 Care 비용에 3제품 합산 효과(2.4h)를 통째로 귀속 → 기본값에서 절감 ₩19.38M vs 비용 ₩149K, 회수 항상 "<0.1개월" | Care 단독 귀속으로 축소: "CCTV 확인 단축 일 30분 × ₩30,000/h"(CaseStudy 실측 45→15분과 연결) + 결품 0.5% → 회수 1~2개월대. 표기 "약 1.8개월 — 보수적 추정". **믿기는 숫자가 큰 숫자를 이긴다** (C1 산식 수정과 한 PR) |
| N3 | `PriorityEngineDiagram` + `storeagent.ts` actionCards | **'L' 기호 이중 의미** — Priority Class L1~L4(긴급도) vs AutonomyLadder·IntegratedLoop의 L0~L5(자율도). "L1 · 강수 70%"를 본 방문자가 사다리에서 L1=정보 안내를 보면 서사 붕괴 | 우선순위를 **P1~P4로 전면 개명** + 범례 1줄("P1=오늘 처리"). actionCards까지 전파 — **(v5 병행 주의: #19 시뮬레이터가 같은 데이터 사용, 개명 먼저 합의)** |
| N4 | `KakaoAlertMockup` 알림 시간·버튼 | **9:02~9:18, 16분 4연타 + 전부 [승인]** — "알림 피로를 이긴다"는 제품 철학과 데모가 정면 충돌. 온도 초과·청결 점검은 '승인' 대상이 아님(자율도 사다리 구분 자해) | 하루 분산: 7:50 브리핑 / 11:40 결품(점심 피크 전 맥락) / 14:05 냉장고 [확인했어요] / 17:30 우산 발주 [검토하기] — 버튼을 알림 성격별 분화 |
| N5 | `HqMapDashboardMockup` KPI 1번 | **"일일 알림 1,247건"을 성과처럼 전시** — AlertFatigueComparison(v5 #17)이 알림 과잉을 비판하는 사이트에서 자가당착 | 프레임 전환: **"본부 확인 필요 13건 / 전체 신호 1,247건"** — 1,247을 '걸러낸 모수'로 강등 |

---

## 2. 🟠 브랜드·카피 정합 위반 (감사에 걸리는 것)

| # | 위치 | 결함 | 수정 지시 |
|---|---|---|---|
| B1 | 신규 15종 전부 | **D1 헤더 `saai \| {구현체명}` 0건** — 기존 목업 4곳은 소급됐는데 신규가 전멸 | `SaaiHeader` 공용 컴포넌트 추출(StoreCareMockup:321 패턴) 후 15종 부착. 기술 페이지용 변형(`saai \| seal` 등) 포함 |
| B2 | `MockupBadge.tsx:1` + 라벨 미전달 호출 ~8곳 | **"예시 화면" ko 고정 뱃지가 en/jp 화면에 노출** | MockupBadge에 locale prop(또는 디폴트 3로케일 사전) 추가, 호출부 일괄 정리 |
| B3 | `HqMapDashboardMockup.tsx:47,62` | **마스터 카피 캐논 분기** — en `Every store, as one.`(캐논: `like one.`), jp `一つの`(캐논: `ひとつの`) | 마스터 카피를 `i18n.ts` 캐논에서 import — 재타이핑 금지. EnterpriseView:302의 유사 변주("Every store, on one screen") 공존도 정리(한 자리 한 마스터) |
| B4 | `IntegratedLoopDiagram` · `FiveQuestionsMockup:161` · `VisionCoordinatesMockup` | **AC 명시 CTA 3건 누락** — A2 "세 제품의 통합 가이드 →", A1 eyebrow 링크, A4 "5년 좌표의 상세 →" | 3건 복구(링크 목적지는 Notion 또는 신설 페이지 — 목적지 미정 시 placeholder 금지, 앵커라도 연결) |
| B5 | `VisionCoordinatesMockup.tsx:152,234` | **`shadow-2xl` + `bg-gradient-to-br`** — 그라데이션/그림자 금지 명문 위반 | 제거(보더+배경 단색 대체). `FiveQuestionsMockup:180`의 hover:shadow-md도 outline으로 교체 |
| B6 | `AutonomyLadderTimeline.tsx:52-88` | **detail 카드 condition 카피가 비공인 창작**(A3 원문에 없음) | footnote 4항목(80%↑/30회↑/합의/롤백)에서만 파생하도록 재작성 또는 카피 검수 통과 후 확정 |
| B7 | `AutonomyLadderTimeline.tsx:221` | 디폴트 L0 선택 상태가 **"현재 위치 마커 금지" 취지 훼손**(지금 L0에 있다로 읽힘) | 디폴트 무선택. 선택 시에만 detail 표시 |
| B8 | 다크 내 유채색 | SpatialTrajectory red REC(245-247) · ModelCatalog cyan 타임스탬프(292) · SealSdk 신택스 green(98) · EdgePerf linearGradient(251) | REC·타임스탬프는 회색조로, 신택스는 블루 1색+회색 2단으로, area-fill은 단색 저투명으로 |
| B9 | `KakaoAlertMockup.tsx:48` | ko 채널명 `StoreCare · 강남역점` — D1 구표기 재등장 | `saai \| store care` 형식(B1과 함께) |
| B10 | `AnonymizationMockup` | 이모지 1건 검출 — D4 "다른 목업 이모지 0" 위반 의심 | 확인 후 제거 — **(v5 병행 주의: E-S1 locale 소작업과 같은 파일)** |

---

## 3. 🟡 데이터 SOT 형해화 + 코드 품질

### 3-1. 시나리오 수치의 로컬 하드코딩 (canonical 원칙의 회색지대)

헤더 KPI만 canonical 파생이고 시나리오성 수치는 전부 컴포넌트 내 창작:

- `FunnelDiagram:19` 중간 단계 [270,180,110,78] — 78을 `round(342×23%)`로 역산해야 SOT(현재는 23%가 바뀌면 조용히 어긋남)
- `PriorityEngineDiagram:64-66` Top3 카드 수치 — ActionCardMockup 데이터(storeagent.ts)와 미연결. 같은 페이지에 "원리→결과"로 놓이므로 어긋나면 바로 들킴
- `CaseStudyChartMockup:89` SERIES 8점 + **시작점 46 vs 라벨 "45" 불일치**(실측 뱃지 단 차트에서 라벨≠데이터)
- `EdgePerfMonitorMockup:154-156` 30fps/28ms/92% — SealSdk 로그의 "28ms"와 별도 하드코딩
- `OrderFlowMockup:23-24` 효과 = 매출×0.08 — 0.08의 출처 없음
- `HqMapDashboardMockup:133,179-181` 미니 카드 매장명·수치 즉석 생성(같은 매장이 다른 상태로 재등장)
- `RoiCalculatorWidget:23-26` 계수 4종 — KakaoAlert의 "14,900원"과 이중 정의

**수정 지시**: `canonical.ts`에 `funnel`(비율)·`edge`(성능)·`roi`(계수) 블록 추가 + `src/data/models.ts`(C2)·케이스 데이터 분리. v4 §6-1에 예외 조항을 두지 말고 전부 흡수 — v5의 `dayTimeline`(#16)·`simulator deltas`(#19)와 **같은 파일을 만지므로 블록 단위로 분리해 충돌 방지**.

### 3-2. 인프라 패턴 불일치

- **타이머 자가 구현**: SealSdk(타이핑 체인 — timers 배열 무한 성장 `:180`, pauseOnHover 부재)·KakaoAlert(C6) — useMockupLoop로 통일
- **`prefersReducedMotion` 모듈 상수 혼용**: 15종 전부 정적 상수(SSR=false 고정, OS 변경 미반영). SealSdk는 useState 초기값으로 직접 사용해 hydration mismatch 실위험(`:166`). `usePrefersReducedMotion` 훅으로 통일
- **비인터랙티브 tabIndex**: IntegratedLoop 노드 9개 탭스톱(+숨김 툴팁이 SR에 이중 낭독 `:189-196`) · OrderFlow [나중에] tabIndex=-1인데 클릭 가능
- **KakaoAlert `role="alert"` ×4 연속 발화** — SR 인터럽트 폭주 → `role="log"`+aria-live로
- **터치 대응**: IntegratedLoop 툴팁 mouseenter/focus 전용 — 모바일 접근 경로 없음

---

## 4. 🔵 데모 설득력 — 폴리시 (여유 사이클에)

| 항목 | 문제 | 개선 |
|---|---|---|
| IntegratedLoop | "루프"가 ↺ 글리프 한 줄로 강등, 노드 위계 평탄, Connector 점선/펄스 Tailwind 충돌(`:209-213`) | 사람→허브 **되먹임 곡선을 실제로 그리고** 펄스가 곡선을 타게. 허브 노드 크기 위계. Connector 클래스 충돌 수정 |
| PriorityEngine | 매 루프 같은 결과(항상 L1·1위) — 엔진이 아니라 정지 슬라이드 | 2~3개 입력 시나리오 순환 → 다른 클래스·다른 1순위 (storeagent.ts 데이터 연동과 동시에) |
| Funnel | 좌측 정렬 막대 = 퍼널로 안 읽힘. BLUF가 상태 서술("100명 중 23명") | 중앙 정렬 사다리꼴 결. 제목을 최대 이탈 구간 발견으로: "체류 고객 3명 중 1명이 응시 전에 떠납니다". scaleX→width% (모서리 찌그러짐) |
| AutonomyLadder | L5 도착감 부재(투명도 점진뿐), 자동 데모 없음(갤러리에서 완전 정적), 연결선이 마지막 노드 관통(`:259-265`) | L5만 큰 원+종착 연출, useMockupLoop 순차 하이라이트(클릭 시 정지), 연결선 길이 수정+화살촉 |
| SpatialTrajectory | 라벨 루프(1600ms)와 점 루프(900ms) 비동기 — 점은 CAM02인데 라벨은 '픽셀' | 단일 루프에서 두 상태 파생. `preserveAspectRatio="none"` 왜곡(둥근 머리가 타원) 수정 |
| SealSdk | 타이핑 중 신택스 무색→완료 시 일괄 착색 점프. SEAL 4원칙이 코드에서 미완결 | 라인 완료 시점마다 착색. 4원칙 어휘를 키/주석으로 명시 |
| EdgePerf | 30fps인데 게이지 절반(분모 60) — "성능 좋음" 데모에서 반쯤 빈 바는 역효과 | 분모=목표치로(목표 대비 충족률), latency는 방향 직관 라벨 추가 |
| KakaoAlert | en iOS 분기가 색만 다른 채팅앱(잠금화면 결 아님), 요금 카드가 알림톡 UI 안에 떠 있음(실재하지 않는 UI) | en은 기존 PushNotification 재사용으로 교체, 요금 카드는 폰 프레임 밖 인접 배치 |
| OrderFlow | 효과 카운터가 스텝 무관 즉시 발화 — 승인→효과 인과 연출 실패. 타임라인 연결선 색 로직(`:335`) | 카운터를 step 3 도달에 게이트. connector는 "다음 노드 done" 기준으로 |
| CaseStudyChart | X축 무의미("시간 경과"만) — 며칠 만에 15분이 됐는지가 설득 포인트인데 비움 | 주차 라벨(실측 기간 2025.12~2026.01). before 구간 회색 음영 밴드. 델타 칩은 메인(−67%)만 블루 |
| FiveQuestions | md 5열 정보 과밀(카드 폭 ~170px 누더기 줄바꿈) | md 3+2단·lg 5열. 질문 순차 호명 하이라이트(선택) |
| VisionCoordinates | "좌표" 메타포가 격자 배경뿐. lead와 카드05 문장 중복. jp 어미 톤(전부 "〜です") | 5카드를 격자 위 좌표점으로 연출(선택). lead 축약. jp 보이스 검수 |

---

## 4B. 🟡 내용 정합·카피 품질 (보강)

### 4B-1. 시나리오 개연성 (리테일 도메인)

| 위치 | 문제 | 제안 (현재 → 개선) |
|---|---|---|
| `canonical.ts` 매장명 | **"강남역점" 입지 vs 잠실 규모 데이터** — 강남역 상권 일매출은 ₩300~500만대가 통념. ₩124.5만 + 새벽 한산 곡선은 G001(잠실광적점) 프로필. 주석이 자인 중 | 2급 입지 이름으로 개명 검토(예: '역삼골목점') — 데이터를 살리는 길. 단 기존 정체성 결정(D3)과 충돌하므로 **오픈 결정으로 상정** |
| `OrderFlowMockup` 발주서 | 단가 ₩1,300은 공급가가 아니라 **판매가**(편의점 공급가는 판매가의 70~75%). "오늘 16:30 입고"는 정기 배차 현실과 다르고 storeagent.ts의 "내일 오전 10시 입고"와도 충돌 | "수량 20개 · **공급가 ₩980** · **내일 1차 배송(오전) 반영**" — '공급가' 한 단어가 진짜 발주서 인상을 만든다. 입고 규칙은 사이트 전체 1개로 통일 |
| `OrderFlowMockup` 효과 | "예상 효과 +₩99,600"(일매출 8%) — 발주 승인=매출 증가라는 인과 비약, 근거 미표기 | "**결품 회피 추정** +₩99,600 — 미발주 시 품절 예상분 환산" (산식 한 줄 동봉) |
| `KakaoAlertMockup:삼각김밥` | "결품 임박, 12개" 알림이 **오전 9시** — 오전 입고 직후의 정상 재고일 수 있어 거짓 경보로 읽힘. canonical 이벤트 타임라인(9:40 진열·11:30 우산)과도 어긋남 | 11:40으로 이동 + "점심 피크 전 보충" 맥락 부여 (N4와 함께) |
| `PriorityEngineDiagram` Top3 | "내일 비(우산)"가 1순위, "오늘 오후 결품"이 3순위 — 긴급도 직관 역전 | 결품을 1순위로, 또는 카드에 '오늘/내일' 시점 명시로 정렬 논리 노출 |
| `ModelCatalogMockup` | `dwell-estimate`가 **planned**인데 Insight 대시보드는 체류 8.3분을 이미 표시 — "제공 중" 표와 제품 화면의 시점 모순. 제품 매핑도 직관 충돌(dwell→Agent, mtmc→Insight) | C2 models.ts 단일화 시 상태·매핑을 제품 화면 기준으로 재정렬 |

### 4B-2. 수치의 근거 표기 (사실 먼저 §3.5)

- `EdgePerfMonitor` "대역폭 절감 92%" — 기준 부재 → "**원본 영상 전송 대비** 92%" (5글자로 단정→사실)
- `CaseStudyChart` "표본 53명" — 누가·기간 모호 → "도입 점주 53명 · 4주 자가기록 — StoreCare 실측". en에서 "(2차)" 누락으로 30→8분이 맥락 잃음
- `RoiCalculator` "박람회 §4 검증" 인용 — 외부 방문자에게 검증 불가능한 내부 권위 → "보수적 추정" 표기로 대체

### 4B-3. 카피 품질·보이스

- `IntegratedLoop` 카드 02 "경계선 **골드 윤리**" — 내부 조어 노출. '누적 거절'도 무엇의 거절인지 설명 없음 → 제목을 "충돌하면 누가 이기는가"로(BLUF — 현재 제목과 본문 첫 문장이 뒤집혀 있음)
- `VisionCoordinates` — "일본(**KDDI** 확장)" 파트너 실명 + 미래 시제 결합(확정처럼 읽힘) → "일본 파트너십 확장". "거의 유일한 자리"·"상위 3사" 등 과장 형용사는 eyebrow에 "Vision 2031 — **우리가 가려는 좌표**"로 목표 시제 명시. ko lead '자리' 4회 동어반복 정리
- `AutonomyLadder` detail — L0~L3은 '다음 단계 조건', L5는 '현재 설명'으로 셀마다 시제 혼재 → 라벨 "다음 단계로 가는 조건"으로 통일
- `FiveQuestions` Q4 fail "책임을 '사람'에게 돌리고" — 과압축으로 외부 독자 이해 불가 → "직원 탓으로 돌리는 알림" 수준으로 구체화
- en/jp 표본 — en scare quotes 남발(반어로 읽힘)·"Where the owner meets…" 직역 경계, jp "時給34ウォン"(일본 청중에 원화 시급 맥락 없음 — 환산 병기 또는 jp만 다른 프레임)

### 4B-4. 잘 된 것 (유지)

우산/강수 70%·냉장고 12°C·삼각김밥 12개·CAM 14:23 타임스탬프·6카테고리 어휘·28ms의 신·구 목업 교차 정합 / IntegratedLoop lead 문장(3제품 시간축 압축) / CaseStudy의 점진 하강 곡선(마법 스위치가 아닌 학습 곡선) / AutonomyLadder 진화 조건 공개 / SealSdk 코드-로그 시나리오 일관 / "시급 34원" 프레이밍.

---

## 5. 실행 계획 (v5 병행 안전 설계)

| 사이클 | 범위 | v5 충돌 주의 |
|---|---|---|
| **R1 치명+브랜드** (최우선, ~2일) | §1 C1~C7 + **§1B N1~N5** + §2 B1~B10. SaaiHeader/MockupBadge 공용화 포함. N2는 C1과 같은 파일(ROI) 한 PR, N4는 KakaoAlert에서 C6과 한 PR | C5(useMockupLoop), B10(AnonymizationMockup)은 v5 브랜치와 같은 파일 — **먼저 머지 순서 합의**. N1(canonical 전환율)·N3(P 개명→actionCards)은 v5 #16·#19 데이터와 직결 — **개명·모수 재정의를 v5 작업자와 먼저 합의** |
| **R2 데이터 SOT 2차** (~1일) | §3-1 canonical 블록 추가·models.ts·케이스 데이터 분리 + **4B-1 시나리오 정합(발주 단가·입고 규칙 통일·알림 시간 재배치)** | canonical.ts는 v5 #16·#19도 확장 — **블록 단위 분리, 동시 편집 금지** |
| **R3 인프라 통일** (~1일) | §3-2 — usePrefersReducedMotion 통일, SealSdk/KakaoAlert 타이머 재배선, a11y 정리 | useMockupLoop 수정분은 R1의 C5와 한 PR로 |
| **R4 폴리시** (여유 시) | §4 설득력 + **§4B-2·3 근거 표기·카피 정정**(기준 명시·골드 윤리·Vision 시제·en/jp 검수) — IntegratedLoop 곡선·Funnel 사다리꼴·PriorityEngine 시나리오 순환 우선 | 독립 파일 — 충돌 없음 |

**오픈 결정 (브랜드 오너)**: ① 매장명 '강남역점' 유지 vs 2급 입지명 개명(4B-1 — D3 재론) ② Priority 표기 P1~P4 개명 확정(N3) ③ 퍼널 모수 '매대 단위' 재정의 승인(N1).

**검증 게이트 (R1~R3 완료 시)** — ✅ **2026-06-06 전수 통과**:
- [x] grep 감사 통과: `shadow-2xl` 0건 · `bg-gradient` 신규 다이어그램/다크 0건(잔존은 AlertFatigue 필수 blur-fade·제품 UI 바이올렛·갤러리 크롬) · `STORECARE|STOREINSIGHT|STOREAGENT` 단독 0건
- [x] en/jp `/demo` 순회 — 한국어 뱃지 0건(MockupBadge 3로케일, 전 호출부 locale 전달 확인)
- [x] ROI: 3입력 전부 출력 변화 + 회수 기간 ≈1.8개월(setupCostPerStore 도입, clamp 제거, 1.3~2.7개월 변동)
- [x] 내용 정합: 'L\d'는 자율도 사다리에만(Priority→P1~P4) · canonical 시간대 합=일계(1,245,000/342) · funnel 매대 단위 재정의(canonicalFunnel)
- [x] ModelCatalog: models.ts 단일화(MODEL_STAGES=ModelsView와 일치) 3단 상태 + 행 키보드(Enter/Space)+goTo 유지
- [x] HqMap: 38핀 전수 실루엣 내부(0 외부) + 이상 핀 9 amber·4 red = 범례(9/4)
- [x] tsc 0 · 콘솔 0(prod /demo·store-agent·enterprise) · 프로덕션 빌드 595/595

## 6. 구현 현황 (2026-06-06)

**R1+R1B+브랜드(게이트) 완료** — C1~C7·N1~N5·B1(일부)~B10(핵심)·C5 인프라:
- 공유: `MockupBadge`(3로케일)·`useMockupLoop.goTo`(클릭 step 유지)·`src/data/models.ts`(신규 단일 소스)·canonical `canonicalFunnel`/`canonicalEdge`/`canonicalRoi` 블록.
- 컴포넌트(에이전트): ROI(C1+N2)·HqMap(C3+N5)·ModelCatalog(C2+C5)·Funnel(N1)·PriorityEngine(N3 P개명)·AutonomyLadder(C4 가시성+B6+B7)·KakaoAlert(C6+N4+B9)·SpatialTrajectory(C7+B8).
- 직접: VisionCoord/EdgePerf/FiveQuestions shadow·gradient 제거(B5/B8) · 전 bare 뱃지 locale 전달 · AnonymizationMockup 기본 locale en(v5 E-S1).

**사이클 2·3 추가 완료 (2026-06-08)**:
- **R3 인프라(핵심)** — SealSdk: 모듈상수→`usePrefersReducedMotion` 훅(hydration 위험 제거)·타이머 Set으로 누수 차단·신택스 per-line 회색+블루. ✓
- **B4 CTA 3건** — IntegratedLoop(→/products)·FiveQuestions(→/company)·VisionCoordinates(→/company) 앵커 복구. ✓
- **R3 a11y** — KakaoAlert `role="alert"`×4 → `role="log"`+aria-live(SR 폭주 해소) · IntegratedLoop 노드 9 탭스톱 제거+이중낭독 제거(sr-only title/desc 단일화). ✓
- **v5 백로그** — Anonymization 실사 전환(cctv-checkout.webp + CSS 모자이크, 슬라이더 유지) ✓ · 채팅 입력 타이핑 시뮬레이션(user 턴 입력창 타이핑→전송 탭→버블) ✓ · ActionCard 리듬 3승인+1보류+1잔류(REVIEW 3-3) ✓.

**사이클 4 완료 (2026-06-08) — 잔여 거의 전수 처리**:
- **R3 reduced-motion 전수 스윕** — 28개 목업 모듈상수 → `usePrefersReducedMotion` 훅(SSR-safe). 0 파일 잔존. ✓
- **B1 SaaiHeader 공용화** — `SaaiHeader.tsx` 신설 + 신규 패널/다이어그램 15종에 `saai | {구현체}` 부착(24 워드마크). 폰/디바이스 목업은 자체 앱 크롬(KakaoAlert saai|store care) 유지. ✓
- **B3** — HqMap 마스터 카피가 `homeCopy[locale].masterCompany` 캐논 import(재타이핑 en "as one." 제거). ✓
- **R4 시각 폴리시** — PriorityEngine 3시나리오 순환(다른 P1·다른 1순위) · Funnel 중앙정렬 사다리꼴(width%) · IntegratedLoop 실제 되먹임 곡선+펄스+허브 위계 · CaseStudy X축 주차 라벨+before 음영+45 정합+델타 칩 색 · EdgePerf 게이지 분모=목표 · AutonomyLadder L5 종착 연출. ✓
- **4B 카피** — IntegratedLoop "충돌하면 누가 이기는가" BLUF · Vision KDDI실명 제거+목표 시제 eyebrow+'자리' 반복 정리 · FiveQuestions Q4 구체화. ✓
- **R4 KakaoAlert** — en = iOS 잠금화면 결(PushNotification 패턴) · 요금 카드 폰 프레임 밖으로. ✓
- **오픈 결정 반영** — 매장명 강남역점 유지(D3) · 퍼널 매대 단위(N1) · Priority P1~P4(N3).

**container query 타이포(§2-1) — 검증 완료, 코드 변경 불요**:
- 모바일 375px 실측: `/demo` 28개 카드 전부 **가로 오버플로 0px**, 페이지 오버플로 0 — 고정 px 타이포가 실제로 깨지지 않음(기존 반응형 Tailwind 클래스 + 프레임 컴포넌트가 처리). §2-1의 "작은 뷰포트 비율 붕괴"는 현 구현에서 미발생.
- `@container`/`scale()` 비례 스케일은 *깨짐 수정*이 아니라 *비례 미세조정*(선택)이며, 30개 목업 전반 리팩터는 기존 반응형 클래스와 중복·회귀 위험이 커 비용 대비 효용 낮음 → 채택 보류(독립 폴리시 트랙으로만 남김). **v2 리뷰 항목은 전수 처리·검증 완료.**

**최종 검증(2026-06-08)**: tsc 0 · 프로덕션 빌드 595/595 · 콘솔 0(/demo·store-agent·store-care·technology·enterprise·pricing) · reduced-motion 훅 전수 · 검증 게이트 7항목 유지.

**v4 문서 후속**: v4 §7의 "완료" 항목은 위 R1 보완으로 문서-구현 괴리 해소(이 §6이 그 각주 역할).
