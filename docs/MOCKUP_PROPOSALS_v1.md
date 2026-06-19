# 신규 목업 제안 v1 — 추가하면 좋을 콘텐츠/목업

> **작성** 2026-06-05 · **자매 문서** [MOCKUP_REVIEW_v1.md](./MOCKUP_REVIEW_v1.md) (기존 9종 개선안) · **SOT** `brand-system/박람회_TF_가상가맹점데이터시나리오_v0.1.md`
> **전제** 기존 인프라(PhoneFrame/MacBookFrame/BrowserChrome, useMockupLoop, TapIndicator, MOCKUP_SCHEME/PRODUCT_THEME, ScanlineOverlay, cctvImages)를 최대한 재사용한다.

---

## 0. 현재 커버리지 — 빈 자리 매핑

| 라우트/뷰 | 현재 목업 | 상태 |
|---|---|---|
| 홈 Hero / StoreAgent | ActionCard, Chat, Push, Briefing | ✅ 충분 |
| products/store-care | StoreCareMockup, DetectionGallery | ✅ |
| products/store-insight | StoreInsightDesktopMockup | ✅ |
| products/**saai** (SaaiView) | **없음** | 🔴 플랫폼 페이지가 텍스트-온리 |
| enterprise | MultiStoreDashboard | 🟡 5개 매장뿐 — "엔터프라이즈" 스케일감 부족 |
| technology (허브) | AnonymizationMockup | 🟡 허브만 있음 |
| technology/**seal** (SealView) | **없음** | 🔴 SDK 페이지에 코드 한 줄 없음 |
| technology/**spatial-ai** | **없음** | 🔴 "공간 AI"를 글로만 설명 |
| technology/**models** | **없음** | 🔴 모델 20+종 카탈로그가 텍스트 |
| solutions/* | IndustryHero + 기존 3종 재사용 | 🟢 |
| resources/case-studies | 없음 | 🟡 |

결론: **기술 레이어가 최대 공백.** 제품은 "써보는 화면"이 있는데 기술은 "믿어달라는 글"만 있다. 기술 페이지 방문자(개발자·본부 IT·심사역)는 가장 증거를 요구하는 독자다.

---

## 1. 기술 레이어 (P0 — 최우선)

### 1-1. SealSdkMockup — 코드 에디터 + 라이브 출력

- **배치**: technology/seal Hero 옆
- **구성**: MacBookFrame + 다크 IDE 결. 좌측 코드 패널에 SDK 통합 코드 ~10줄이 타이핑 애니메이션으로 작성되고, 우측/하단 터미널에 처리 로그(`stream connected · 4 faces anonymized · 28ms`)가 흘러나옴. 마지막에 비식별 처리된 프레임 썸네일 출력.
- **포인트**: "몇 줄이면 붙는다"는 Embeddable 메시지를 코드 길이 자체로 증명. 개발자 독자는 가짜 코드를 바로 알아보므로 실제 SDK 시그니처와 일치시킬 것.
- **재사용**: MacBookFrame, 타이핑은 ChatMockup 타이밍 패턴 / **난이도 중**

### 1-2. SpatialTrajectoryMockup — 멀티캠 → 평면도 궤적 통합

- **배치**: technology/spatial-ai Hero
- **구성**: 상단에 CCTV 뷰 2~3개(cctvImages + ScanlineOverlay), 하단에 매장 평면도 SVG. 각 캠에서 감지된 사람(바운딩박스)이 평면도 위 점으로 사영되고, 카메라를 넘어갈 때 **같은 색 궤적으로 이어지는** 애니메이션. "픽셀 → 카메라 → 공간 좌표" 3단계 라벨이 순차 하이라이트.
- **포인트**: SpatialAiView의 Coordinate Pipeline 본문을 그대로 시각화 — 글과 그림이 1:1 대응되는 가장 정직한 데모. 회사 차별화 기술이므로 단독 신규 제작 가치가 가장 높다.
- **재사용**: ScanlineOverlay, useMockupLoop, 평면도는 StoreInsight 히트맵 좌표계 공유 가능 / **난이도 상**

### 1-3. ModelCatalogMockup — 모델 셀렉터 + 인퍼런스 데모

- **배치**: technology/models 상단
- **구성**: 좌측 모델 카드 리스트(Anonymize / Pose / Flow / Shelf 등 4~6종)가 자동 순환 선택되고, 우측 동일 CCTV 스틸 위에 선택된 모델의 출력 오버레이가 교체됨 — 비식별화 모자이크 → 포즈 스켈레톤 → 동선 화살표 → 결품 박스. 하단에 모델별 지연시간/엣지 호환 칩.
- **포인트**: "한 장면, 다른 눈" — 같은 입력에 모델별 출력이 갈아끼워지는 구성이 카탈로그의 폭을 한 화면에 압축.
- **재사용**: cctvImages, StoreCare 바운딩박스 패턴, IosSegmentedControl / **난이도 중**

---

## 2. 제품/플랫폼 레이어 (P1)

### 2-1. SaaiPlatformMockup — 3제품 허브 화면

- **배치**: products/saai Hero
- **구성**: 태블릿 또는 데스크탑 프레임에 SAAI 런처/홈 — StoreCare 알림 위젯, StoreInsight KPI 위젯, StoreAgent 액션카드 위젯이 한 대시보드에 공존. 위젯 하나가 주기적으로 포커스되며 해당 제품 컬러(emerald/violet/blue)로 테두리 강조.
- **포인트**: "SAAI = 우산 플랫폼"이라는 핵심 주장에 화면 증거가 현재 0건. 기존 3개 목업의 내용물을 위젯 단위로 재조립하므로 신규 데이터 불필요 — **캐노니컬 SOT 통합(리뷰 P0)과 같은 사이클에 만들면 일관성 검증용으로도 작동**.
- **재사용**: 기존 3종 목업 내부 카드 전부 / **난이도 중**

### 2-2. HqMapDashboardMockup — 본부 200점 지도 대시보드

- **배치**: enterprise (MultiStore 위 또는 교체)
- **구성**: 한국 지도(코로프레스/핀)에 200개 가맹점 상태 점등, 사이드에 본부 KPI(정상 187 · 주의 9 · 긴급 4, 일일 알림 1,247건). 핀 클릭 순환 → 우측 미니 매장카드 전환. 박람회 SOT §2-3·§2-4의 수치를 그대로 사용.
- **포인트**: 현재 Enterprise 목업은 매장 5개 — 본부 결재권자에게는 "우리 스케일이 아니다"로 읽힌다. 200점 지도는 박람회 부스 데모와 동일 소재라 제작비 이중 회수.
- **재사용**: MultiStore 사이드바/KPI 패턴, MacBookFrame / **난이도 중상**

### 2-3. KakaoAlertMockup — 메신저 알림 목업 (로케일 적응형)

- **배치**: AgentMockupShowcase 4번째 탭 또는 PushNotification 대체 변형
- **구성**: ko 로케일 = 카카오톡 알림톡 스타일 채팅방(노란 결), jp = LINE, en = 기존 iOS 푸시 유지. 발주 승인 버튼이 알림톡 버튼 템플릿으로 표현.
- **포인트**: 한국 점주의 실제 수신 채널은 락스크린 푸시보다 알림톡이다. 로케일별로 메신저가 바뀌는 디테일은 "한국 리테일을 아는 회사"라는 신호로 비용 대비 효과가 매우 크다. 상표 이슈는 일반화된 스타일(노란 배경+말풍선)로 회피.
- **재사용**: PushNotification 구조 그대로 스킨 교체 / **난이도 하**

### 2-4. OrderFlowMockup — 승인 그 다음 화면

- **배치**: StoreAgent how-it-works
- **구성**: ActionCard 승인(기존) → 발주서 생성 → 납품처 전송 완료 → 입고 예정 타임라인까지 3스텝 가로 플로우. 마지막에 "오늘 절감 시간 23분" 카운터.
- **포인트**: 현재 데모는 전부 '승인'에서 끝난다. 승인 이후가 보여야 "에이전트가 일을 끝낸다"는 차별화가 완성된다. 리뷰 문서 1-4(효과 환류)와 연결.
- **재사용**: ActionCard, BriefingMockup 카드 스태거 / **난이도 중**

---

## 3. 신뢰/전환 레이어 (P2)

### 3-1. RoiCalculatorWidget — 목업이 아닌 실제 인터랙티브 위젯

- **배치**: enterprise 또는 pricing 인근
- **구성**: 매장 수·평균 일매출·운영시간 3개 입력 → 결품 손실 절감, 인건비 절감, 회수 기간 추정 출력. 산식과 가정을 각주로 공개(브랜드 fact-first 보이스와 정합).
- **포인트**: 사이트 전체에서 방문자가 '입력'하는 첫 지점 — 리드 전환 직전 단계의 체류 장치. 추정 로직은 박람회 제안서 KPI 검증 수치(§4) 재사용.
- **난이도 중** (디자인보다 산식 합의가 일)

### 3-2. CaseStudyChartMockup — 도입 전후 8주 지표 카드

- **배치**: resources/case-studies 각 항목
- **구성**: 도입 시점 세로선이 있는 before/after 라인차트 + 핵심 지표 3개 델타 칩. 데이터는 케이스별 정적.
- **포인트**: 케이스 스터디가 글-온리면 영업 자료로 재활용이 안 된다. 차트 1장이 PDF 캡처→제안서 삽입까지 이어지는 자산이 된다.
- **재사용**: StoreInsight 차트 패턴 / **난이도 하**

### 3-3. IntegrationMapDiagram — 연동 생태계 다이어그램

- **배치**: enterprise 또는 technology 허브 하단
- **구성**: 중앙 SAAI 노드 ↔ POS·발주·메신저·기존 CCTV(ONVIF)·BI 노드. 연결선에 데이터 흐름 펄스 애니메이션. "기존 카메라 그대로"를 CCTV 노드에 명시.
- **포인트**: 본부 IT의 첫 질문("우리 시스템이랑 붙나요")에 선제 답변. 정적 SVG + 펄스만으로 충분.
- **난이도 하**

### 3-4. EdgePerfMonitorMockup — 온디바이스 성능 게이지

- **배치**: technology/anonymizer 또는 models
- **구성**: 다크 콘솔 결(Anonymization과 동일 톤)로 FPS·지연 ms·대역폭 절감률 게이지 + 24h 스파크라인. "원본 영상은 장치를 떠나지 않습니다" 고정 배너.
- **포인트**: 온디바이스 주장의 수치적 증거. 리뷰 문서 2-4의 "기술=다크" 룰을 적용하는 두 번째 사례가 되어 룰이 패턴으로 굳는다.
- **재사용**: AnonymizationMockup 스탯 카드, useCountUp / **난이도 하**

---

## 4. 우선순위 & 제작 순서 제안

| 순위 | 목업 | 근거 | 난이도 |
|---|---|---|---|
| 1 | SpatialTrajectoryMockup (1-2) | 차별화 기술 + 최대 공백 페이지 | 상 |
| 2 | SealSdkMockup (1-1) | 개발자 독자 + 텍스트-온리 해소 | 중 |
| 3 | SaaiPlatformMockup (2-1) | 플랫폼 주장의 증거 0건 → SOT 통합과 동일 사이클 | 중 |
| 4 | KakaoAlertMockup (2-3) | 효과 대비 최저 비용 | 하 |
| 5 | HqMapDashboardMockup (2-2) | 엔터프라이즈 스케일감 + 박람회 재활용 | 중상 |
| 6 | ModelCatalogMockup (1-3) | 카탈로그 시각화 | 중 |
| 7 | OrderFlowMockup (2-4) | 메시지 완결 | 중 |
| 8 | CaseStudyChart · IntegrationMap · EdgePerf (3-2~4) | 폴리시/영업 자산 | 하 |
| 9 | RoiCalculatorWidget (3-1) | 전환 장치 — 산식 합의 후 | 중 |

**제작 전 공통 전제**: MOCKUP_REVIEW_v1의 P0(캐노니컬 데이터 SOT)를 먼저 — 신규 목업이 늘수록 어긋난 숫자의 조합 폭발이 커진다. 신규 목업은 전부 SOT에서 파생할 것.
