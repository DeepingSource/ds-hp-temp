# 목업 제작 지시서 v4 (개발 직행본)

> **작성** 2026-06-05 · **대체** v3 (v1·v2·v3는 이력 보관) · **자매** [MOCKUP_REVIEW_v1.md](./MOCKUP_REVIEW_v1.md)
> **성격** — 모든 오픈 결정이 합의 완료된 최종본. 이 문서만 보고 바로 개발한다. 합의 변경 시 이 문서를 갱신하고 버전을 올린다.
> **착수 범위(합의)** — **S0 잔여 + S1 + S2 즉시 착수.** S3~S5는 대기.

---

## 0. 확정 결정 (2026-06-05 합의, 전 항목 적용)

| # | 결정 사항 | 확정 내용 |
|---|---|---|
| D1 | 제품명 표기 | **구현체 이름 + saai 병기** — 목업 헤더는 `saai \| store care` 형식 (대문자 단독 `STORECARE` 폐기). 신규 목업은 처음부터, 기존 목업은 소급(§2-5) |
| D2 | 색 운용 | **이원화** — 제품 UI 목업 = 기존 3색 테마(emerald/violet/blue) 유지 · **다이어그램류 = 회색조 + brand-blue(#376AE2) 1색** |
| D3 | 캐노니컬 시연점 | **웹 단일점 = 강남역점 유지, 본부 뷰 = 200점**(박람회 SOT 차용). 수치 체계는 G001 기반 정합 — 이미 구현됨(§1) |
| D4 | Care 이모지 | **알림톡 목업(#5)에서만 9종 내 실험.** 다른 목업은 이모지 0 유지. 효과 확인 후 확대 재논의 |
| D5 | 다크 룰 | **채택 — 제품=라이트, 기술=다크.** technology 계열(Anonymization·SEAL IDE·EdgePerf)은 다크 톤으로 묶는다. 다크 안에서도 액센트는 회색조+블루 준수. **EdgePerfMonitor 보류 해제** |
| D6 | Agent 언어 | **자리 기준 분기** — 본사向 자리(PriorityEngine·enterprise 인접 Agent 카드)는 영문 우선, 점주向 자리(ActionCard·알림톡)는 한글 |
| D7 | SEAL SDK 코드 | **의사코드로 우선 제작** — SEAL 4원칙 어휘 + 공통 신호 6카테고리 기반의 그럴듯한 의사코드 + `Example` 뱃지. 실 API 확정 시 교체 |
| D8 | ROI 산식 | **박람회 §4 검증 수치 기반**(일일 2.4h 절감·응답률 89% 등) — 별도 사내 합의 불필요, 가정은 각주 공개. **착수 차단 해제** (단 스프린트는 S5 유지) |

---

## 1. 현재 상태 — 이미 구현된 것 (2026-06-05 P0 사이클)

| 완료 항목 | 내용 |
|---|---|
| 캐노니컬 SOT | `src/data/mockup-scenarios/canonical.ts` 신규 — 강남역점 = 예상 일매출 **₩1,245,000** · 방문 **342명** · 체류 **8.3분** · 전환 **23%** · 성과 **92**. storeagent/storeinsight/enterprise 시나리오가 전부 여기서 파생 |
| 인터랙션 | `useMockupLoop`에 pauseOnHover · Anonymization 슬라이더 드래그/키보드/유휴 재개 |
| 시간 인지형 차트 | StoreInsight 폰/데스크탑 — 현재 시각 이후 점선·저채도 예측 구간, 현재 칸만 지터, AI 예측 범례 |

**신규 목업의 모든 수치는 `canonical.ts`에서 파생할 것.** 본부 200점 데이터(분포 187/9/4 · 일일 알림 1,247건 · 응답률 89% · 일일 2.4h 절감)는 S0 잔여에서 canonical에 `hq` 블록으로 추가한다.

---

## 2. S0 잔여 작업 (선행, 소급 수정 포함)

1. **canonical.ts에 `hq` 블록 추가** — 200점 분포·KPI(박람회 데이터시나리오 §2·§4 수치). #7 HqMap과 MultiStore가 공유.
2. **차트 제목 전건 takeaway형(BLUF)** — "시간대별 매출 추이" → "14시, 전주 대비 +23%" 결. i18n 3로케일 동시.
3. **StoreInsight AI 인사이트에 가설 결 1줄** — "…로 보입니다 → 검증하려면 …".
4. **StoreCare·Push 알림 본문 30자 규격 재작성.**
5. **헤더 표기 D1 적용** — 기존 목업 헤더를 `saai | store care` 형식으로 일괄 교체 (STORECARE/STOREINSIGHT/STOREAGENT 검색·치환 + i18n).
6. **enterprise 자리 Agent 카드 영문화(D6)** — 점주向 자리는 한글 유지.
7. (REVIEW 이월 P1) 차트 scaleY→height 통일 · StoreCare 타이머 드리프트 단일화 — 신규 차트 제작 전 패턴 확정 차원에서 S0에 포함.

---

## 3. S1 — 다이어그램 4종 (같은 SVG 결 일괄)

> 공통: 회색조+블루 1색(D2) · 그라데이션/그림자/3D 금지 · 모바일 세로 stack · SVG `<title>`·`<desc>` · 펄스 외 과한 모션 금지.

### #1 IntegratedLoopDiagram — 세 제품 통합 신호 흐름

- **배치**: 홈 Section 05 다음 + `products/saai` Hero (단독 — 위젯 합성안은 v4.1 이월 확정)
- **노드(좌→우)**: 입력 3박스(CCTV·POS·외부 컨텍스트) → SEAL+Anonymizer(블루 액센트) → **익명화 이벤트 허브** → Insight(어제)↔Care(지금)↔Agent(다음) 점선 양방향 → 사람의 결정·행동(블루 액센트) → 허브 되먹임 점선. 가로 1.6:1.
- **카피(확정 원문)**: 헤딩 "세 시간 축이 하나의 운영 루프로 닫힙니다" + 3카드(공통 신호 국제어 / 경계선 골드 윤리 / 자율도 사다리) — Upgrade Spec A2 원문 복사.
- **애니메이션**: 신호 펄스 1바퀴 순환(useMockupLoop, pauseOnHover). 노드 hover 툴팁.
- **완료 기준**: 4 viewport 무파손 · 툴팁 · 카피 원문 일치 · a11y.

### #2 AutonomyLadderTimeline — L0→L5

- **배치**: 홈 Beyond Retail 앞 + `products/store-agent` Z6
- **구성**: 가로 6노드(L0 관찰만 ~ L5 자율 주행 매장, A3 카피 원문). 노드 색 회색→블루 점진. **현재 위치 마커 금지.** 노드 클릭 → 대표 카테고리·진화 조건 카드. `<ol>` 시멘틱.
- **진화 조건 footnote 필수**: 승인률 80%↑ · 검증 30회↑ · 명시적 합의 · 충돌 시 롤백.

### #3 PriorityEngineDiagram — 우선순위 엔진

- **배치**: `products/store-agent` Z5.1, 기존 ActionCardMockup과 같은 페이지(원리→결과)
- **구성**: 입력(Insight·Care·외부 컨텍스트·이력) → 점수 → 클래스 L1~L4 → 1~3순위 카드 → 사람 → 학습 되먹임.
- **언어**: 본사向 자리 — 라벨 **영문 우선**(D6).

### #4 FunnelDiagram — visit→stay→gaze→pick→buy

- **배치**: `products/store-insight` Z5.2
- **구성**: 5단계 퍼널 + 단계별 이탈 가지. 수치는 canonical 파생. 제목 takeaway형.
- **가설 카드 1장 필수**: "가설: … → 검증 제안 …" 결 (Insight 보이스).

---

## 4. S2 — 기술 페이지 (다크 클러스터, D5 적용)

### #5 SpatialTrajectoryMockup — MTMC 멀티캠 궤적

- **배치**: `technology/spatial-ai` Hero + 홈 SEAL 섹션 다음
- **구성(A5 스펙 고정)**: 카메라 뷰 3대, 한 사람의 동선이 세 캠을 잇는 **점선** 궤적. 얼굴 = **둥근 회색 도형(모자이크 톤)** — 실사·컬러 금지. 점이 캠을 건널 때 같은 ID 라벨 동반. "픽셀→카메라→공간 좌표" 라벨 순차 하이라이트.
- **카피(확정)**: "카메라가 여러 대여도, 같은 사람을 연속 추적합니다 — 얼굴 없이" + 3약속 카드(MTMC / **Re-ID 얼굴 아님**=시각 강조 / Any Environment).
- **톤**: 기술 페이지이므로 다크 배경 허용(D5) — 단 궤적·액센트는 회색조+블루.

### #6 SealSdkMockup — 코드 에디터 + 라이브 출력

- **배치**: `technology/seal` Hero 옆
- **구성**: MacBookFrame + 다크 IDE(D5). 좌측 코드 패널 **의사코드 ~10줄**(D7: SEAL 4원칙 어휘, `Example` 뱃지 부착) 타이핑 애니메이션 → 터미널 로그(`stream connected · 4 faces anonymized · 28ms`) → 비식별 프레임 썸네일. 3박자 루프.
- **로그 어휘**: 공통 신호 6카테고리(Pattern·Detection·Priority·Response·Context·Outcome)와 통일.
- **후속**: 실 SDK 시그니처 확보 시 코드만 교체(구조 변경 없게 코드 문자열을 데이터 파일로 분리).

### #7 EdgePerfMonitorMockup — 온디바이스 성능 게이지 (보류 해제, D5)

- **배치**: `technology/anonymizer` 또는 `models` 하단
- **구성**: 다크 콘솔 — FPS·지연 ms·대역폭 절감률 게이지(useCountUp) + 24h 스파크라인 + 고정 배너 "원본 영상은 장치를 떠나지 않습니다". 액센트 블루 단색.
- **난이도 하** — #6과 같은 다크 토큰 세트로 함께 제작.

---

## 5. S3~S5 — 대기 항목 (착수 시 이 스펙 그대로)

| # | 항목 | 스프린트 | 핵심 지시 |
|---|---|---|---|
| #8 | KakaoAlertMockup | S3 | ko=알림톡 결(일반화 스타일)·jp=LINE·en=iOS 푸시. **본문 전건 30자 이내 신규 작성** · 이모지 9종 내(D4) · [승인] 버튼 템플릿 · 인접 요금 카드("시급 34원"·"14,900원"). Push 구조 스킨 교체 |
| #9 | HqMapDashboardMockup | S3 | canonical `hq` 블록 사용(§2-1). 한국 지도 200점 핀(187/9/4) · KPI 1,247건·89%·2.4h · 핀 순환→미니 매장카드. 헤딩에 마스터 "모든 매장을 한 매장처럼." **단독**. 본사向=숫자·델타 표현(D6) |
| #10 | OrderFlowMockup | S3 | 승인(기존 ActionCard 재사용)→발주서 생성→전송 완료+입고 타임라인 3스텝. 효과 환류 카운터(canonical 파생). [승인]이 첫 스텝 |
| #11 | ModelCatalogMockup | S4 | 12종 카탈로그 표(모델명·Available Now·입력·출력·연결 제품) 행 선택 ↔ 동일 CCTV 스틸 위 오버레이 교체(모자이크→포즈→동선→결품). 자동 순환+클릭 전환·타이머 리셋. 표 caption+scope |
| #12 | CaseStudyChartMockup | S4 | 도입 시점 세로선 before/after 라인차트 + 델타 칩 3개. 제목 takeaway형. PDF 캡처 견디는 해상도 |
| #13 | FiveQuestions + VisionCoordinates | S4 | Upgrade Spec A1·A4 카피 원문. 회색조+블루 SVG 결 |
| #14 | RoiCalculatorWidget | S5 | **차단 해제(D8)** — 박람회 §4 수치를 산식으로, 가정 각주 공개. 입력 3(매장 수·평균 일매출·운영시간) → 출력 3(결품 절감·인건비 절감·회수 기간) |

**기각·이월 확정**: SaaiPlatform 위젯 대시보드 → v4.1 이월 / IntegrationMap → #1에 흡수(기각 유지).

---

## 6. 공통 제작 규칙 (최종, 결정 반영판)

1. 수치는 전부 `canonical.ts` 파생 — 하드코딩 금지.
2. 다이어그램 = 회색조+블루 1색 / 제품 UI = 3색 테마 / 기술 페이지 = 다크 허용(액센트는 동일 룰) — D2·D5.
3. 헤더 표기 `saai | {구현체명}` — D1.
4. 차트 제목 BLUF(takeaway형) · 한 자리에 마스터 카피 1개.
5. 자동화 데모에 [승인] 단계 노출.
6. 보이스: Care=한글·30자·이모지는 #8만 / Agent=자리 기준 영문/한글 분기 / Insight=가설 1줄.
7. L0→L5 현재 위치 마커 금지.
8. 인프라 재사용: Frame류·useMockupLoop(pauseOnHover)·TapIndicator·ScanlineOverlay·토큰·cctvImages.
9. a11y: SVG `<title>`·`<desc>` · 표 caption+scope · 시멘틱 마크업 · reduced-motion 가드.
10. i18n: ko/en/jp 3로케일 동시 작성 — 카피 확정 원문은 ko 기준, en/jp는 보이스 매트릭스 언어 룰 따름.

---

## 7. 진행 체크리스트

- [x] S0 잔여 (§2) — 1 hq블록·2 BLUF제목·3 가설1줄·4 알림30자·5 D1헤더(saai|store care)·7 StoreCare 타이머드리프트 단일화 완료. 6은 신규 #3 PriorityEngine(영문 우선)으로 충족. **잔여: 7 차트 scaleY→height(코스메틱)만 후속.**
- [x] S1 — #1 통합 루프 · #2 L0→L5 · #3 엔진 · #4 퍼널 — 4종 완료, `/demo` Diagram 섹션 노출
- [x] S2 — #5 MTMC · #6 SEAL SDK · #7 EdgePerf — 3종 완료(다크), `/demo` Technology 섹션 노출
- [x] S3~S5 — #8 알림톡 · #9 본부지도 · #10 발주플로우 · #11 모델카탈로그 · #12 케이스차트 · #13a 다섯질문 · #13b Vision좌표 · #14 ROI계산기 — 8종 완료, `/demo` 노출. (S0-7 scaleY→height도 완료)

> **구현 (2026-06-05)** — 신규 **15종** 추가: S1 4(IntegratedLoopDiagram·AutonomyLadderTimeline·PriorityEngineDiagram·FunnelDiagram) + S2 3(SpatialTrajectoryMockup·SealSdkMockup·EdgePerfMonitorMockup) + S3~S5 8(KakaoAlertMockup·HqMapDashboardMockup·OrderFlowMockup·ModelCatalogMockup·CaseStudyChartMockup·FiveQuestionsMockup·VisionCoordinatesMockup·RoiCalculatorWidget). 전부 canonical 파생·3로케일·a11y·reduced-motion. `MockupGallery`(/demo) **총 24종**(Phone 9·Desktop 4·Diagram 7·Dark 4). tsc 0 에러, 콘솔 0 에러. 확정 카피 출처 = `SAAI_Website_Upgrade_Spec_v1.md`(A1~A5), 박람회 §4(ROI), Care Voice(요금).

> **실제 페이지 배치 (2026-06-05)** — 신규 15종을 §3~§4 배치대로 각 View에 삽입(additive). HomeView: #1(ProductPreview 다음)·#2(SolutionTimeline 앞)·#13b(SolutionTimeline 다음, 다크)·#5(Weaving4Step 다음, 다크)·#13a(TrustCharter 다음). StoreAgentView: #3·#10(AgentMockupShowcase 전후)·#2(L0→L5 섹션). StoreInsightView: #4(전환 KPI 섹션). SaaiView·SpatialAiView·SealView: #1·#5·#6(각 Hero 직후). AnonymizerView: #7(하단). ModelsView: #11(Hero 다음). CaseStudiesView: #12(Case 1 뒤). EnterpriseView: #9(다점포 대시보드 섹션). StoreCareView: #8(알림 섹션). PricingClientView: #14(요금 비교 뒤). tsc 0 에러, 점검 페이지(home·store-agent·enterprise·pricing·spatial-ai) 콘솔 0 에러.
