/**
 * 멀티 매장 대시보드 목업 데이터
 *
 * MultiStoreDashboardMockup에서 사용하는 매장·차트·상태 데이터.
 * 매장을 추가/수정하려면 이 파일만 편집하면 됩니다.
 * 5개 매장 전부 canonical.ts(canonicalStore·canonicalRoster·canonicalDay)에서
 * 파생합니다 (MM Phase 2 2-⑥ — §v2 데이터 계약).
 */

import { canonicalStore, canonicalDay, canonicalRoster, type RosterStore } from './canonical';
import type { Locale } from '@/lib/i18n';

export type StoreStatus = 'normal' | 'warning' | 'critical';

export interface EnterpriseStore {
  id: number;
  name: string;
  status: StoreStatus;
  alerts: number;
  revenue: number;
  visitors: number;
  perf: number;
  /** vs 전일 변화 — revenue·visitors=%, perf=pts, alerts=절대 건수 */
  deltas: { revenue: number; visitors: number; alerts: number; perf: number };
}

export interface StatusMeta {
  dot: string;
  badge: string;
  text: string;
}

/** KPI 카드 설정 (아이콘은 컴포넌트에서 매핑) */
export interface KpiConfig {
  /** lucide-react 아이콘 이름 */
  iconName: 'BarChart3' | 'Users' | 'Bell' | 'TrendingUp';
  label: string;
  /** 매장 데이터에서 값을 가져올 필드 */
  field: 'revenue' | 'visitors' | 'alerts' | 'perf';
  unit: string;
  color: string;
  bg: string;
  /** useCountUp duration (ms) */
  countUpDuration: number;
  /** 추세 칩 표기 유형 — pct: %, pts: 점/pts, count: 절대 건수 */
  deltaType: 'pct' | 'pts' | 'count';
  /** true면 증가가 나쁨(알림처럼) — 색상 반전 */
  invert?: boolean;
}

// ── canonicalRoster 파생 (MM Phase 2 2-⑥) ────────────────────────────────────
// 대시보드 5매장 = roster 표본(강남역·홍대·잠실·신촌·건대).
const R = Object.fromEntries(canonicalRoster.map((s) => [s.slug, s])) as Record<string, RosterStore>;

/** 대시보드 id(1~5, 사이드바 순서) → roster 항목 */
const ROSTER_BY_ID: Record<number, RosterStore> = {
  1: R['gangnam-stn'],
  2: R['hongdae'],
  3: R['jamsil'],
  4: R['sinchon'],
  5: R['kondae'],
};

/**
 * 일매출(만원) 파생 산식 — 결정적 산식 + 주석 명문화(HqMap cardAlertCount 선례).
 * 방문당 매출은 강남역점 ARPV(124.5만원 ÷ 342명)를 기준으로 하되, 성과점수가
 * 매출 효율에 반영되도록 perf/92 가중(0.85~1.0 범위)을 곱한다. 강남역점(perf 92)은
 * 가중 1.0으로 canonical과 정합. 균일 ARPV였다면 잠실이 정확히 100이 되어 D6
 * '반올림 흔적 금지'를 어긴다 — 가중이 이를 해소한다(홍대 106·잠실 96·신촌 65·건대 75).
 */
const deriveRevenueManwon = (r: RosterStore): number =>
  Math.round(
    r.dailyVisitors *
      (canonicalStore.forecastRevenueManwon / canonicalStore.visitorsToday) *
      (0.85 + 0.15 * (r.perfScore / canonicalStore.perfScore)),
  );

/**
 * 파생/연출 경계 (D6):
 * - visitors·perf = canonicalRoster 직접 참조, revenue = 위 산식 파생.
 * - status: roster 파생이 원칙(강남 normal·잠실 normal·신촌 critical·건대 normal 일치).
 *   예외 — 홍대는 roster상 normal이지만 'warning' 연출 유지: 대시보드 순환 데모가
 *   정상/주의/긴급 3상태 인사이트(insightWarning 문구)를 모두 시연해야 하는데
 *   roster의 warning 표본(안양점)은 이 5매장 표본 밖이다. '주의'는 순간 상태라
 *   세계관(217점 중 warning 10) 모순 아님.
 * - alerts·deltas: canonical에 매장별 알림·전일 SOT가 없어 상태 서사 연출값 유지
 *   (긴급 신촌 5건+전 지표 하락세, 주의 홍대 2건). 방문 규모가 아니라 상태 배지와
 *   정합해야 하는 수치라 산식화하지 않는다(근거 기록).
 */
export const stores: EnterpriseStore[] = [
  { id: 1, name: canonicalStore.name, status: 'normal', alerts: 0, revenue: Math.floor(canonicalStore.forecastRevenueManwon), visitors: canonicalStore.visitorsToday, perf: canonicalStore.perfScore, deltas: { revenue: canonicalStore.revenueDeltaPct, visitors: canonicalStore.visitorsDeltaPct, alerts: 0, perf: canonicalStore.perfDeltaPts } },
  { id: 2, name: ROSTER_BY_ID[2].name.ko, status: 'warning',  alerts: 2, revenue: deriveRevenueManwon(ROSTER_BY_ID[2]), visitors: ROSTER_BY_ID[2].dailyVisitors, perf: ROSTER_BY_ID[2].perfScore, deltas: { revenue: -4,  visitors: -3, alerts: 2,  perf: -5 } },
  { id: 3, name: ROSTER_BY_ID[3].name.ko, status: ROSTER_BY_ID[3].status, alerts: 0, revenue: deriveRevenueManwon(ROSTER_BY_ID[3]), visitors: ROSTER_BY_ID[3].dailyVisitors, perf: ROSTER_BY_ID[3].perfScore, deltas: { revenue: 5,   visitors: 6,  alerts: 0,  perf: -2 } },
  { id: 4, name: ROSTER_BY_ID[4].name.ko, status: ROSTER_BY_ID[4].status, alerts: 5, revenue: deriveRevenueManwon(ROSTER_BY_ID[4]), visitors: ROSTER_BY_ID[4].dailyVisitors, perf: ROSTER_BY_ID[4].perfScore, deltas: { revenue: -12, visitors: -9, alerts: 3,  perf: -8 } },
  { id: 5, name: ROSTER_BY_ID[5].name.ko, status: ROSTER_BY_ID[5].status, alerts: 1, revenue: deriveRevenueManwon(ROSTER_BY_ID[5]), visitors: ROSTER_BY_ID[5].dailyVisitors, perf: ROSTER_BY_ID[5].perfScore, deltas: { revenue: 3,   visitors: 4,  alerts: 1,  perf: 1 } },
];

/** 매장 표시명 3로케일 — roster.name 파생 (MultiStoreDashboardMockup C.storeNames의 SOT) */
const namesFor = (loc: Locale): Record<number, string> =>
  Object.fromEntries(Object.entries(ROSTER_BY_ID).map(([id, r]) => [id, r.name[loc]]));
export const storeNamesByLocale: Record<Locale, Record<number, string>> = {
  ko: namesFor('ko'),
  en: namesFor('en'),
  jp: namesFor('jp'),
};

/**
 * 시간대 차트 12포인트 — canonicalDay 9~20시 방문 곡선을 매장 방문 규모로 스케일
 * ('모든 차트가 이 시계열 파생' 원칙). 곡선 모양은 전 매장 공유, 진폭만
 * visitors/342 비례. 점심(12~13시) 피크가 하루 최고 — 차트 카피(chartVisitors)와 정합.
 */
const CHART_HOURS = canonicalDay.hours.filter((h) => h.h >= 9 && h.h <= 20);
export const chartSets: Record<number, number[]> = Object.fromEntries(
  stores.map((s) => [
    s.id,
    CHART_HOURS.map((h) => Math.round((h.visitors * s.visitors) / canonicalStore.visitorsToday)),
  ]),
);

// v2 색 계약(D2): 클래스는 --saai-* 변수만 — MockupViewport의 .saai-scope 안에서 해석
export const statusMeta: Record<StoreStatus, StatusMeta> = {
  normal:   { dot: 'bg-(--saai-status-success)', badge: 'bg-(--saai-green-50) text-(--saai-green-700)',  text: '정상' },
  warning:  { dot: 'bg-(--saai-status-warning)', badge: 'bg-(--saai-yellow-50) text-(--saai-yellow-800)', text: '주의' },
  critical: { dot: 'bg-(--saai-status-error)',   badge: 'bg-(--saai-red-50) text-(--saai-red-700)',       text: '긴급' },
};

// color/bg는 KPI "카테고리 구분" 의도 — 제품색이 아니라 SAAI 데이터 hue를 쓴다
export const kpiConfigs: KpiConfig[] = [
  { iconName: 'BarChart3',  label: '일 매출',  field: 'revenue',  unit: '만', color: 'text-(--saai-purple-500)', bg: 'bg-(--saai-purple-50)', countUpDuration: 700, deltaType: 'pct' },
  { iconName: 'Users',      label: '방문자',   field: 'visitors', unit: '명', color: 'text-(--saai-primary)',    bg: 'bg-(--saai-blue-50)',   countUpDuration: 700, deltaType: 'pct' },
  { iconName: 'Bell',       label: '알림',     field: 'alerts',   unit: '건', color: 'text-(--saai-status-error)', bg: 'bg-(--saai-red-50)',  countUpDuration: 400, deltaType: 'count', invert: true },
  { iconName: 'TrendingUp', label: '성과점수', field: 'perf',     unit: '점', color: 'text-(--saai-green-600)',  bg: 'bg-(--saai-green-50)',  countUpDuration: 700, deltaType: 'pts' },
];
