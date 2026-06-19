/**
 * StoreInsight mockup scenario data
 *
 * Extracted from StoreInsightMockup (phone) and StoreInsightDesktopMockup
 * (desktop) to centralise inline constants.
 *
 * Icon references use string identifiers — actual Lucide imports remain in the
 * component files.
 */

import { canonicalStore } from './canonical';

// ─── Shared types ────────────────────────────────────────────────

/** Icon name strings matching Lucide imports in the component files */
export type LucideIconName =
  | 'BarChart3'
  | 'Users'
  | 'Eye'
  | 'MapPin'
  | 'TrendingUp'
  | 'Calendar'
  | 'LayoutGrid'
  | 'Clock'
  | 'Settings';

// ─── Phone mockup (StoreInsightMockup) ───────────────────────────

export type PhoneInsightTab = 'sales' | 'visitors';

/** Bar chart heights (%) per tab */
export const phoneBars: Record<PhoneInsightTab, number[]> = {
  sales:    [30, 45, 65, 85, 70, 95, 80],
  visitors: [20, 35, 60, 80, 85, 65, 45],
};

/** Index of the highlighted (accent) bar per tab */
export const phoneHighlightIdx: Record<PhoneInsightTab, number> = {
  sales: 5,
  visitors: 4,
};

/** KPI card targets used in the phone count-up animation (캐노니컬 파생) */
export const phoneKpiTargets = {
  revenue: canonicalStore.forecastRevenueManwon,
  visitors: canonicalStore.visitorsToday,
  avgStay: canonicalStore.avgStayMin,
  conversionRate: canonicalStore.conversionRate,
} as const;

// ─── Desktop mockup (StoreInsightDesktopMockup) ──────────────────

export interface DesktopMetric {
  iconName: LucideIconName;
  label: string;
  target: number;
  unit: string;
  decimals: number;
  trend: string;
  up: boolean;
  color: string;
}

/** KPI metric card definitions for the desktop dashboard (캐노니컬 파생) */
export const desktopMetrics: DesktopMetric[] = [
  { iconName: 'BarChart3', label: '예상 일매출',  target: canonicalStore.forecastRevenueManwon, unit: '만', decimals: 1, trend: `+${canonicalStore.revenueDeltaPct}%`,  up: true,  color: 'violet'  },
  { iconName: 'Users',     label: '누적 방문자',  target: canonicalStore.visitorsToday,         unit: '명', decimals: 0, trend: `${canonicalStore.visitorsDeltaPct}%`,   up: false, color: 'blue'    },
  { iconName: 'Eye',       label: '평균 체류시간', target: canonicalStore.avgStayMin,            unit: '분', decimals: 1, trend: '+18%',  up: true,  color: 'emerald' },
  { iconName: 'MapPin',    label: '매대 전환율',  target: canonicalStore.conversionRate,        unit: '%',  decimals: 0, trend: '+4.2%', up: true,  color: 'amber'   },
];

/** Color utility classes for desktop metric icon containers */
export const desktopColorMap: Record<string, string> = {
  violet:  'bg-violet-50  text-violet-600',
  blue:    'bg-blue-50    text-blue-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  amber:   'bg-amber-50   text-amber-600',
};

export interface RankEntry {
  name: string;
  value: number;
  rank: number;
}

/** Default store ranking data (first entry name is replaced by storeName prop) */
export const desktopDefaultRankData: RankEntry[] = [
  { name: canonicalStore.name, value: canonicalStore.perfScore, rank: 1 },
  { name: '홍대점',   value: 78, rank: 2 },
  { name: '잠실점',   value: 65, rank: 3 },
];

export interface NavItem {
  iconName: LucideIconName;
  label: string;
}

/** Sidebar navigation items for the desktop dashboard */
export const desktopNavItems: NavItem[] = [
  { iconName: 'BarChart3',  label: '대시보드'       },
  { iconName: 'Eye',        label: '실시간 모니터링' },
  { iconName: 'MapPin',     label: '히트맵 분석'     },
  { iconName: 'TrendingUp', label: '매출 인사이트'   },
  { iconName: 'Users',      label: '고객 동선'       },
  { iconName: 'Calendar',   label: '리포트'          },
];

/** Initial bar chart heights for the desktop traffic chart */
export const desktopInitialHeights = [35, 58, 42, 72, 50, 88, 65, 78, 45, 82, 55, 70];

/** Desktop heatmap cell intensities (5x5 grid, 0-10 scale) */
export const desktopHeatmapData = [3, 7, 5, 2, 1, 8, 9, 4, 6, 3, 1, 5, 8, 3, 2, 4, 2, 6, 7, 5, 2, 3, 1, 4, 6];
