/**
 * 멀티 매장 대시보드 목업 데이터
 *
 * MultiStoreDashboardMockup에서 사용하는 매장·차트·상태 데이터.
 * 매장을 추가/수정하려면 이 파일만 편집하면 됩니다.
 * 대표 매장(강남역점, stores[0])의 수치는 canonical.ts에서 파생합니다.
 */

import { canonicalStore } from './canonical';

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

export const stores: EnterpriseStore[] = [
  { id: 1, name: canonicalStore.name, status: 'normal', alerts: 0, revenue: Math.floor(canonicalStore.forecastRevenueManwon), visitors: canonicalStore.visitorsToday, perf: canonicalStore.perfScore, deltas: { revenue: canonicalStore.revenueDeltaPct, visitors: canonicalStore.visitorsDeltaPct, alerts: 0, perf: canonicalStore.perfDeltaPts } },
  { id: 2, name: '홍대점',   status: 'warning',  alerts: 2, revenue: 98,  visitors: 213, perf: 78, deltas: { revenue: -4,  visitors: -3, alerts: 2,  perf: -5 } },
  { id: 3, name: '잠실점',   status: 'normal',   alerts: 0, revenue: 121, visitors: 248, perf: 65, deltas: { revenue: 5,   visitors: 6,  alerts: 0,  perf: -2 } },
  { id: 4, name: '신촌점',   status: 'critical', alerts: 5, revenue: 76,  visitors: 167, perf: 52, deltas: { revenue: -12, visitors: -9, alerts: 3,  perf: -8 } },
  { id: 5, name: '건대점',   status: 'normal',   alerts: 1, revenue: 115, visitors: 231, perf: 71, deltas: { revenue: 3,   visitors: 4,  alerts: 1,  perf: 1 } },
];

export const chartSets: Record<number, number[]> = {
  1: [30, 45, 62, 88, 75, 58, 72, 91, 78, 55, 48, 40],
  2: [25, 38, 52, 72, 60, 50, 65, 78, 62, 44, 38, 30],
  3: [28, 42, 58, 80, 68, 55, 68, 84, 70, 50, 42, 35],
  4: [18, 28, 40, 55, 48, 40, 50, 60, 48, 35, 30, 24],
  5: [32, 48, 66, 85, 72, 60, 70, 82, 68, 50, 44, 36],
};

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
