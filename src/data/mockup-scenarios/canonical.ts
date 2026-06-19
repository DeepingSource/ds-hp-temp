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
 * 본부(HQ) 200점 뷰 데이터 — 박람회 TF 가상가맹점데이터시나리오 §2·§4 기반.
 * HqMapDashboard(#9)·MultiStore·ROI 산식이 공유한다.
 */
export const canonicalHq = {
  /** 전체 가맹점 수 */
  totalStores: 200,
  /** 상태 분포 (정상/주의/긴급) — 합 200 */
  statusDistribution: { normal: 187, warning: 9, critical: 4 },
  /** 일일 본부 알림 총건수 */
  dailyAlerts: 1247,
  /** 점주 평균 응답률 (%) — 200점 평균 */
  responseRate: 89,
  /** 점포당 일일 운영시간 절감 (시간) */
  dailyHoursSaved: 2.4,
  /** 지역 분포 (수도권/비수도권 %) */
  regionSplit: { metro: 60, nonMetro: 40 },
  /** 업종 분포 (편의점/외식/뷰티·기타 %) */
  industrySplit: { convenience: 80, food: 15, beautyEtc: 5 },
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

/** 원 단위를 ₩1,245,000 형식으로 포맷 */
export function formatWon(won: number): string {
  return '₩' + won.toLocaleString('ko-KR');
}
