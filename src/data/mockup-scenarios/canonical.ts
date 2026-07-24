/**
 * 캐노니컬 매장 데이터 — "강남역점의 오늘" 단일 진실 공급원(SOT)
 *
 * 목적: StoreAgent / StoreInsight / 멀티매장 대시보드 목업이 같은 강남역점을
 *       다른 일매출·방문자로 표기하던 문제(MOCKUP_REVIEW_v1 §1-1)를 해소한다.
 *       세 시나리오 파일(storeagent.ts · storeinsight.ts · enterprise.ts)이
 *       모두 이 값에서 파생한다.
 *
 * 규모 정합: 박람회 TF SOT(가상가맹점데이터시나리오 v0.1, 잠실광적점 G001 —
 *           일 방문 320명대·일매출 ₩1.2M·응답률 92%)와 같은 자릿수로 맞췄다.
 *           매장명만 웹 목업 기존 정체성(강남역점)을 유지한다.
 */

export const canonicalStore = {
  name: '강남역점',

  // ── 매출 ──────────────────────────────────────────────
  /** 오늘 예상 일매출 (원) */
  forecastRevenueWon: 1_245_000,
  /** 오늘 예상 일매출 (만원, 대시보드 표기) */
  forecastRevenueManwon: 124.5,
  /** 어제 일매출 (원) — 채팅/푸시 내러티브 기준 */
  yesterdayRevenueWon: 1_243_000,
  /** 예상 일매출 전일 대비 (%) */
  revenueDeltaPct: 12,

  // ── 방문·체류·전환 ────────────────────────────────────
  /** 오늘 누적 방문자 (명) */
  visitorsToday: 342,
  /** 누적 방문자 전일 대비 (%) */
  visitorsDeltaPct: -5,
  /** 평균 체류시간 (분) */
  avgStayMin: 8.3,
  /** 매대 전환율 (%) */
  conversionRate: 23,

  // ── 성과 ──────────────────────────────────────────────
  /** 성과점수 (0~100) — 본부 대시보드·랭킹 공통 */
  perfScore: 92,
  /** 성과점수 전일 대비 (pts) */
  perfDeltaPts: 3,
} as const;

/** 캐노니컬 점포명 로케일별 표기 — en/jp 렌더 경로에 한국어 누출 방지 (canonicalStore.name = ko) */
export const canonicalStoreName = {
  ko: '강남역점',
  en: 'Gangnam Stn.',
  jp: '江南駅店',
} as const;

/**
 * 본부(HQ) 217점 뷰 데이터 — 박람회 TF 가상가맹점데이터시나리오 §2·§4 기반.
 * HqMapDashboard(#9)·MultiStore·ROI 산식이 공유한다.
 *
 * 수 생성 원칙 (D6 — "그럴싸한 가상 숫자"): 모든 가상 수치는 벤포드 법칙을 어기지
 * 않게 만든다 — 200·240·1,000 같은 반올림 흔적 금지, 화면 안에서 합계·비율이
 * 산술적으로 맞아야 한다. 값을 바꿀 때는 이 파일을 서술하는 카피 리터럴
 * (HqMapDashboard sub/mapDesc, AlertFatigue 헤딩, MockupGallery 설명 등)도
 * 3로케일 동시로 갱신할 것.
 */
export const canonicalHq = {
  /** 전체 가맹점 수 (D6: 200 → 217 — 반올림 흔적 제거) */
  totalStores: 217,
  /** 상태 분포 (정상/주의/긴급) — 합 217 */
  statusDistribution: { normal: 203, warning: 10, critical: 4 },
  /** 일일 본부 알림 총건수 — 217점 비례 재산정 (첫자리 1, 벤포드 정합) */
  dailyAlerts: 1353,
  /** 오늘 이상 감지 건수 — HQ 롤업 KPI (첫자리 3, 벤포드 정합) */
  todayAnomalies: 37,
  /** 위생·온도 기준 충족률 (%) — HQ 롤업 KPI */
  hygieneOkPct: 94,
  /** 점주 평균 응답률 (%) — 217점 평균 */
  responseRate: 89,
  /** 점포당 일일 운영시간 절감 (시간) */
  dailyHoursSaved: 2.4,
  /** 지역 분포 (수도권/비수도권 %) */
  regionSplit: { metro: 60, nonMetro: 40 },
  /** 업종 분포 (편의점/외식/뷰티·기타 %) */
  industrySplit: { convenience: 80, food: 15, beautyEtc: 5 },
  /**
   * 점주 체인 규모 — StoreInsightDesktop "전체 12개 매장" 등 점주 시점 목업의
   * 체인 크기 (본부 217점과 별개 세계관: 12점 규모 개인 체인. 첫자리 1 — 정합).
   */
  ownerChainStores: 12,
} as const;

// ── 강남역점의 하루 (#16 StoreDayTimelapse SOT) ──────────────────────────────
// 시간대별 합 = canonical 일계와 정확히 정합: Σsales = 1,245,000 · Σvisitors = 342.
// 이 블록은 타임랩스 데이터인 동시에 SOT 교차검증 장치 (합 불일치 시 dev 경고).

export interface DayHour {
  /** 시각 (6~23) */
  h: number;
  /** 해당 시간 매출 (원) */
  sales: number;
  /** 해당 시간 방문자 (명) */
  visitors: number;
  /** 구역 히트맵 5×5 강도 (0~10) */
  heat: number[];
}

export type DayEventKind = 'care' | 'agent' | 'insight';

export interface DayEvent {
  /** 분 단위 시각 (예: 14*60+20 = 860) */
  t: number;
  kind: DayEventKind;
  /** 기존 시나리오 id 참조 (StoreCare scenario id 등) */
  refId: string;
  /** 피드 1줄 요약 (≤30자 한글 폴백 — 컴포넌트가 refId로 로케일 매핑) */
  summary: string;
}

export const canonicalDay = {
  hours: [
    { h: 6, sales: 15000, visitors: 4, heat: [4,1,3,2,3,3,1,2,3,5,4,1,5,4,3,4,2,3,2,4,3,3,2,1,2] },
    { h: 7, sales: 30000, visitors: 8, heat: [2,3,4,3,5,2,5,5,4,5,4,2,3,2,5,3,2,5,3,4,3,4,3,2,3] },
    { h: 8, sales: 50000, visitors: 14, heat: [5,5,5,3,4,5,5,3,3,6,4,6,6,4,6,3,3,4,3,3,3,5,4,3,5] },
    { h: 9, sales: 45000, visitors: 12, heat: [4,4,3,6,5,3,3,3,6,5,5,3,5,4,3,3,4,3,3,5,3,4,4,6,3] },
    { h: 10, sales: 65000, visitors: 18, heat: [5,7,5,6,5,7,6,6,6,4,7,4,4,5,6,6,5,7,6,4,7,4,5,4,6] },
    { h: 11, sales: 90000, visitors: 25, heat: [7,5,7,5,8,8,6,5,6,5,7,5,5,5,8,8,5,7,6,6,6,8,8,5,8] },
    { h: 12, sales: 120000, visitors: 33, heat: [7,9,8,7,8,8,6,8,6,7,9,6,7,6,10,6,10,7,6,8,10,8,8,8,9] },
    { h: 13, sales: 110000, visitors: 30, heat: [7,9,6,7,8,6,7,6,6,8,7,9,7,6,7,9,6,6,6,9,8,6,6,8,8] },
    { h: 14, sales: 105000, visitors: 29, heat: [7,8,5,9,8,7,5,6,7,9,7,8,9,6,9,6,8,6,8,9,6,6,9,9,7] },
    { h: 15, sales: 75000, visitors: 21, heat: [8,7,8,6,5,4,5,7,7,5,5,5,5,6,7,7,4,8,6,6,5,6,7,6,7] },
    { h: 16, sales: 65000, visitors: 18, heat: [7,6,5,6,7,6,6,5,5,4,6,6,7,5,5,4,6,4,5,6,5,5,3,7,5] },
    { h: 17, sales: 85000, visitors: 23, heat: [5,5,8,5,5,5,5,8,7,5,7,5,8,6,8,7,8,8,8,7,7,8,6,5,5] },
    { h: 18, sales: 115000, visitors: 31, heat: [10,8,9,9,6,6,6,8,9,7,9,10,8,9,8,10,8,7,10,8,7,8,9,7,7] },
    { h: 19, sales: 105000, visitors: 29, heat: [9,6,7,7,7,6,5,5,6,7,7,7,8,6,6,7,8,8,5,7,8,8,8,7,8] },
    { h: 20, sales: 75000, visitors: 21, heat: [6,8,7,4,6,7,7,5,7,7,6,8,6,5,6,6,8,5,7,4,8,7,6,5,7] },
    { h: 21, sales: 50000, visitors: 14, heat: [6,4,3,3,5,6,3,6,3,6,3,5,6,4,5,6,5,3,5,6,4,6,6,3,3] },
    { h: 22, sales: 30000, visitors: 8, heat: [3,2,2,3,3,2,5,2,4,2,4,5,3,4,5,4,3,2,3,5,4,3,2,5,3] },
    { h: 23, sales: 15000, visitors: 4, heat: [3,5,2,1,4,4,2,1,1,5,1,5,2,3,2,2,2,3,2,2,4,3,2,1,4] },
  ] as DayHour[],
  events: [
    { t: 430,  kind: 'insight', refId: 'morning-briefing', summary: '아침 브리핑 — 오늘의 준비 팁 3가지' },
    { t: 580,  kind: 'care',    refId: 'shelf-empty',      summary: '음료 진열 1시간째 보충 필요. 전면 30% 미만.' },
    { t: 690,  kind: 'agent',   refId: 'umbrella-order',   summary: '내일 강수 70% — 우산·우비 발주 제안' },
    { t: 860,  kind: 'insight', refId: 'sales-peak',       summary: '14시 매출 +23% — 프로모션 효과로 추정' },
    { t: 960,  kind: 'agent',   refId: 'peak-staffing',    summary: '16~18시 대기 3.2분 — 인력 1명 제안' },
    { t: 1125, kind: 'care',    refId: 'fridge-open',      summary: '냉장고 문 3분째 열림. 내부 12°C 상승 중.' },
    { t: 1410, kind: 'care',    refId: 'intrusion',        summary: '야간 무인 모드 전환 — 이상 체류 감시' },
  ] as DayEvent[],
} as const;

// SOT 교차검증: 시간대 합이 일계와 어긋나면 개발 모드에서 경고 (§3-1 주석 약속의 런타임 단언)
if (process.env.NODE_ENV !== 'production') {
  const sumSales = canonicalDay.hours.reduce((a, h) => a + h.sales, 0);
  const sumVisitors = canonicalDay.hours.reduce((a, h) => a + h.visitors, 0);
  if (sumSales !== canonicalStore.forecastRevenueWon || sumVisitors !== canonicalStore.visitorsToday) {
    console.warn(
      `[canonical] dayTimeline SOT 불일치: Σsales=${sumSales} (기대 ${canonicalStore.forecastRevenueWon}), ` +
      `Σvisitors=${sumVisitors} (기대 ${canonicalStore.visitorsToday})`,
    );
  }
}

// ── 파생 SOT 블록 (MOCKUP_REVIEW_v2 §3-1) — 컴포넌트 하드코딩 흡수 ─────────────

/**
 * #4 FunnelDiagram — "신상품 매대" 단위 퍼널 (구매 전환이 아니라 매대 전환).
 * conversionRate(23%)는 '매대 앞에 멈춘 사람 중 집어든 비율'. counts는 visitorsToday 파생.
 */
export const canonicalFunnel = {
  /** 매대 단위 단계 비율 (visit=1.0 기준 누적 잔존율) */
  ratios: { visit: 1.0, stay: 0.79, gaze: 0.53, pick: 0.32, buy: canonicalStore.conversionRate / 100 },
  base: canonicalStore.visitorsToday, // 342
} as const;

/** #7 EdgePerfMonitor 성능 수치 — SealSdk 로그의 28ms와 정합 */
export const canonicalEdge = {
  fps: 30,
  fpsTarget: 30,
  latencyMs: 28,
  /** 원본 영상 전송 대비 대역폭 절감 (%) */
  bandwidthSavedPct: 92,
} as const;

/** #14 RoiCalculator 계수 — Care 단독 귀속, 보수적 추정 (박람회 §4 + CaseStudy 실측) */
export const canonicalRoi = {
  /** 시간당 인건비 (원) */
  wagePerHour: 30_000,
  /** 월 영업일 */
  daysPerMonth: 20,
  /** CCTV 확인 일 절감 분 (CaseStudy 45→15분 실측 기반, 보수적 30분) */
  cctvMinutesSavedPerDay: 30,
  /** 결품 회피 추정 비율 (일매출 대비) */
  stockoutRecoveryPct: 0.005,
  /** Care 월 구독료 (원) */
  careMonthlyWon: 14_900,
  /** 점포당 1회 도입(설치·온보딩) 비용 (원) — 회수 기간 산정 분자 */
  setupCostPerStore: 750_000,
} as const;

// ── canonical v2 확장 (MM Phase 2 2-⑥) — 명부·주간·구성비·유입·알림 사전 ──────
// D6 원칙 동일 적용: 벤포드 정합(반올림 흔적 금지), 화면 내 산술 정합,
// 값 변경 시 서술 카피 3로케일 동시 갱신.

export type RosterRegion = 'metro' | 'nonMetro';
export type RosterStatus = 'normal' | 'warning' | 'critical';

export interface RosterStore {
  slug: string;
  name: { ko: string; en: string; jp: string };
  region: RosterRegion;
  status: RosterStatus;
  /** 일 방문자 (명) — 구매·전환 수는 소비처에서 파생한다(여기 두지 않음) */
  dailyVisitors: number;
  /** 성과점수 (0~100) */
  perfScore: number;
}

/**
 * canonicalRoster — 매장 명부 20개 (G7 확정: 지명+'점' 규칙).
 * 217점 세계관의 정합 표본: metro 12 / nonMetro 8 = 60/40 근사(regionSplit),
 * 상태 normal 18 / warning 1 / critical 1 → 203/10/4 분포 근사(statusDistribution).
 * en/jp 표기는 기존 관례를 따른다 — AgentHqMiniMockup(Hongdae/弘大店·Jamsil/蚕室店·
 * Sinchon/新村店)·canonicalStoreName(Gangnam Stn./江南駅店)·HqRollup(Seomyeon/西面店).
 * 신촌점 critical은 기존 목업들의 '신촌 긴급' 연출 유지.
 */
export const canonicalRoster: RosterStore[] = [
  // ── metro 12 ──
  // 강남역점 = canonicalStore와 정합 (visitorsToday 342 · perfScore 92 직접 참조)
  { slug: 'gangnam-stn', name: { ko: '강남역점', en: 'Gangnam Stn.', jp: '江南駅店' }, region: 'metro', status: 'normal', dailyVisitors: canonicalStore.visitorsToday, perfScore: canonicalStore.perfScore },
  { slug: 'hongdae', name: { ko: '홍대점', en: 'Hongdae', jp: '弘大店' }, region: 'metro', status: 'normal', dailyVisitors: 298, perfScore: 78 },
  { slug: 'jamsil', name: { ko: '잠실점', en: 'Jamsil', jp: '蚕室店' }, region: 'metro', status: 'normal', dailyVisitors: 276, perfScore: 65 },
  { slug: 'sinchon', name: { ko: '신촌점', en: 'Sinchon', jp: '新村店' }, region: 'metro', status: 'critical', dailyVisitors: 189, perfScore: 58 },
  { slug: 'kondae', name: { ko: '건대점', en: 'Kondae', jp: '建大店' }, region: 'metro', status: 'normal', dailyVisitors: 214, perfScore: 71 },
  { slug: 'seongsu', name: { ko: '성수점', en: 'Seongsu', jp: '聖水店' }, region: 'metro', status: 'normal', dailyVisitors: 312, perfScore: 84 },
  { slug: 'pangyo', name: { ko: '판교점', en: 'Pangyo', jp: '板橋店' }, region: 'metro', status: 'normal', dailyVisitors: 287, perfScore: 81 },
  { slug: 'suwon-stn', name: { ko: '수원역점', en: 'Suwon Stn.', jp: '水原駅店' }, region: 'metro', status: 'normal', dailyVisitors: 264, perfScore: 74 },
  { slug: 'ilsan', name: { ko: '일산점', en: 'Ilsan', jp: '一山店' }, region: 'metro', status: 'normal', dailyVisitors: 243, perfScore: 69 },
  { slug: 'bundang', name: { ko: '분당점', en: 'Bundang', jp: '盆唐店' }, region: 'metro', status: 'normal', dailyVisitors: 329, perfScore: 86 },
  { slug: 'gimpo', name: { ko: '김포점', en: 'Gimpo', jp: '金浦店' }, region: 'metro', status: 'normal', dailyVisitors: 176, perfScore: 63 },
  { slug: 'anyang', name: { ko: '안양점', en: 'Anyang', jp: '安養店' }, region: 'metro', status: 'warning', dailyVisitors: 158, perfScore: 61 },
  // ── nonMetro 8 ──
  { slug: 'seomyeon', name: { ko: '서면점', en: 'Seomyeon', jp: '西面店' }, region: 'nonMetro', status: 'normal', dailyVisitors: 297, perfScore: 79 },
  { slug: 'haeundae', name: { ko: '해운대점', en: 'Haeundae', jp: '海雲台店' }, region: 'nonMetro', status: 'normal', dailyVisitors: 251, perfScore: 72 },
  { slug: 'dongseongno', name: { ko: '동성로점', en: 'Dongseongno', jp: '東城路店' }, region: 'nonMetro', status: 'normal', dailyVisitors: 218, perfScore: 68 },
  { slug: 'dunsan', name: { ko: '둔산점', en: 'Dunsan', jp: '屯山店' }, region: 'nonMetro', status: 'normal', dailyVisitors: 187, perfScore: 64 },
  { slug: 'sangmu', name: { ko: '상무점', en: 'Sangmu', jp: '尚武店' }, region: 'nonMetro', status: 'normal', dailyVisitors: 164, perfScore: 62 },
  { slug: 'jeonju', name: { ko: '전주점', en: 'Jeonju', jp: '全州店' }, region: 'nonMetro', status: 'normal', dailyVisitors: 149, perfScore: 59 },
  { slug: 'cheonan', name: { ko: '천안점', en: 'Cheonan', jp: '天安店' }, region: 'nonMetro', status: 'normal', dailyVisitors: 172, perfScore: 66 },
  { slug: 'chuncheon', name: { ko: '춘천점', en: 'Chuncheon', jp: '春川店' }, region: 'nonMetro', status: 'normal', dailyVisitors: 136, perfScore: 57 },
];

/**
 * canonicalWeek — 강남역점 요일별 매출 7일 (월~일, 만원 단위).
 * Σ = 112.4+108.7+117.3+121.6+132.8+146.2+138.5 = 877.5만원
 * (forecastRevenueManwon 124.5 × 7 = 871.5만원과 자릿수 정합 — 일평균 125.4만원,
 *  '오늘 예상 124.5만원'이 평일 곡선 안에 자연스럽게 놓인다).
 * 주말 상향(토 146.2 최고), 무반올림 — 벤포드 정합.
 */
export const canonicalWeek = [
  { day: 'mon', revenueManwon: 112.4 },
  { day: 'tue', revenueManwon: 108.7 },
  { day: 'wed', revenueManwon: 117.3 },
  { day: 'thu', revenueManwon: 121.6 },
  { day: 'fri', revenueManwon: 132.8 },
  { day: 'sat', revenueManwon: 146.2 },
  { day: 'sun', revenueManwon: 138.5 },
] as const;

/**
 * canonicalCategoryMix — 카테고리 구성비 (편의점 서사).
 * Σpct = 34+27+18+12+9 = 100 (정확히).
 */
export const canonicalCategoryMix = [
  { key: 'drinks', label: { ko: '음료', en: 'Drinks', jp: '飲料' }, pct: 34 },
  { key: 'freshFood', label: { ko: '즉석식품', en: 'Fresh food', jp: '即席食品' }, pct: 27 },
  { key: 'snacks', label: { ko: '스낵', en: 'Snacks', jp: 'スナック' }, pct: 18 },
  { key: 'household', label: { ko: '생활용품', en: 'Household', jp: '生活用品' }, pct: 12 },
  { key: 'etc', label: { ko: '기타', en: 'Others', jp: 'その他' }, pct: 9 },
] as const;

/**
 * canonicalDoorTraffic — 유입 퍼널 세계관 통일 (DoorSplit · StoreInsightView Beat4 공유).
 * 산술 유도 관계:
 *   passersby 1,036 = entered 342 ÷ captureRatePct 33% (342 ÷ 0.33 = 1,036.36…
 *     → 1,036 — 반올림 흔적 없는 첫자리 1, 벤포드 정합)
 *   entered 342 = canonicalStore.visitorsToday (직접 참조)
 *   browsed 317 ÷ entered 342 = 92.7% (입장 후 매대 둘러봄)
 *   purchased 65 ÷ entered 342 = 19.0% 구매 전환
 * 주의: canonicalFunnel(매대 단위, buy 23%)과 다른 층위 — 이쪽은 '문 앞→구매' 매장 단위.
 */
export const canonicalDoorTraffic = {
  passersby: 1036,
  entered: canonicalStore.visitorsToday, // 342
  captureRatePct: 33,
  browsed: 317,
  purchased: 65,
} as const;

/**
 * alertCatalog — 알림 문구 사전 (기존 승인 문구의 SOT화 — 신규 창작 0건).
 * 수집 출처(문구 원문 그대로):
 *   fridgeTemp·stockLow·rainOrder·salesHigh → src/data/storeagent-mock-i18n.ts
 *     PUSH[locale].items[0..3].title (PushNotificationMockup 승인 문구)
 *   hqFridgeTemp·hqFloorSpill·hqExitBlocked → src/components/mockups/HqRollupDashboardMockup.tsx
 *     T[locale].feed[0..2].type (HQ 실시간 알림 피드 승인 문구)
 * 소비처 배선은 별도 담당 — 여기서는 사전만 제공한다.
 */
export const alertCatalog = {
  /** 냉장고 온도 이상 */
  fridgeTemp: {
    ko: '긴급: 음료 냉장고 온도 이상 감지',
    en: 'Urgent: drink fridge temperature anomaly',
    jp: '緊急: 飲料冷蔵庫の温度異常を検知',
  },
  /** 삼각김밥 재고 */
  stockLow: {
    ko: '삼각김밥 재고 12개 — 오후 품절 예상',
    en: 'Rice balls at 12 — afternoon sell-out expected',
    jp: 'おにぎり在庫12個 — 午後に品切れ見込み',
  },
  /** 우산 발주 제안 */
  rainOrder: {
    ko: '내일 강수 70% — 우산·우비 발주 제안',
    en: '70% rain tomorrow — order umbrellas & ponchos',
    jp: '明日の降水70% — 傘・レインコート発注のご提案',
  },
  /** 어제 매출 ('어제 매출' 신 라벨 기준) */
  salesHigh: {
    ko: '어제 매출 ₩1,243,000 · 이번 주 최고',
    en: 'Yesterday’s sales ₩1,243,000 · weekly high',
    jp: '昨日の売上 ₩1,243,000 · 今週最高',
  },
  /** HQ 피드 — 냉장 온도 초과 */
  hqFridgeTemp: {
    ko: '냉장 온도 초과',
    en: 'Fridge temp exceeded',
    jp: '冷蔵温度の超過',
  },
  /** HQ 피드 — 바닥 오염 감지 */
  hqFloorSpill: {
    ko: '바닥 오염 감지',
    en: 'Floor spill detected',
    jp: '床の汚れを検知',
  },
  /** HQ 피드 — 비상구 적치 */
  hqExitBlocked: {
    ko: '비상구 적치',
    en: 'Exit blocked',
    jp: '非常口の物品',
  },
} as const satisfies Record<string, { ko: string; en: string; jp: string }>;

// SOT 교차검증 (v2 확장분) — 주석의 산술 약속을 개발 모드에서 단언
if (process.env.NODE_ENV !== 'production') {
  const mixSum = canonicalCategoryMix.reduce((a, c) => a + c.pct, 0);
  if (mixSum !== 100) {
    console.warn(`[canonical] categoryMix Σpct=${mixSum} (기대 100)`);
  }
  const statusCount = { normal: 0, warning: 0, critical: 0 } as Record<RosterStatus, number>;
  canonicalRoster.forEach((s) => { statusCount[s.status] += 1; });
  if (canonicalRoster.length !== 20 || statusCount.normal !== 18 || statusCount.warning !== 1 || statusCount.critical !== 1) {
    console.warn(
      `[canonical] roster 분포 불일치: n=${canonicalRoster.length}, ` +
      `상태=${statusCount.normal}/${statusCount.warning}/${statusCount.critical} (기대 20 · 18/1/1)`,
    );
  }
}

/** 원 단위를 ₩1,245,000 형식으로 포맷 */
export function formatWon(won: number): string {
  return '₩' + won.toLocaleString('ko-KR');
}
