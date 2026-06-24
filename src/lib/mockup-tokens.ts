/**
 * 목업 디자인 토큰
 *
 * 모든 목업 컴포넌트가 참조하는 컬러, 타이포 규격.
 */

// ── 제품 컬러 매핑 ──────────────────────────────────────────────────────────

export type ProductName = 'StoreCare' | 'StoreInsight' | 'StoreAgent';

/** 제품별 Tailwind 클래스 세트 */
export const PRODUCT_THEME: Record<ProductName, {
  bg: string;
  bgLight: string;
  text: string;
  border: string;
  headerBorder: string;
  dot: string;
  accent: string;
}> = {
  StoreCare: {
    bg: 'bg-emerald-500',
    bgLight: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    headerBorder: 'border-emerald-500',
    dot: 'bg-emerald-500',
    accent: 'emerald',
  },
  StoreInsight: {
    bg: 'bg-violet-500',
    bgLight: 'bg-violet-50',
    text: 'text-violet-600',
    border: 'border-violet-200',
    headerBorder: 'border-violet-500',
    dot: 'bg-violet-500',
    accent: 'violet',
  },
  StoreAgent: {
    bg: 'bg-primary',
    bgLight: 'bg-primary-lighter',
    text: 'text-primary',
    border: 'border-primary-light',
    headerBorder: 'border-primary',
    dot: 'bg-primary',
    accent: 'blue',
  },
} as const;

// ── 목업 테마 스킴 (light / dark) ─────────────────────────────────────────

export const MOCKUP_SCHEME = {
  light: {
    headerBg: 'bg-white',
    bodyBg: 'bg-gray-50',
    cardBg: 'bg-white',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-500',
    textMuted: 'text-gray-400',
    border: 'border-gray-100',
    cardClass: 'bg-white rounded-lg border border-gray-100 shadow-sm',
  },
  dark: {
    headerBg: 'bg-gray-950',
    bodyBg: 'bg-gray-950',
    cardBg: 'bg-gray-900/70',
    textPrimary: 'text-white',
    textSecondary: 'text-gray-400',
    textMuted: 'text-gray-500',
    border: 'border-gray-800/50',
    cardClass: 'bg-gray-900/70 rounded-lg border border-gray-800/50',
  },
} as const;

// ── 디바이스별 목업 내부 규격 ────────────────────────────────────────────

/** 디바이스 타입별 타이포·패딩·반경 토큰 — 목업 내부 UI 밀도 제어 */
export const MOCKUP_DEVICE = {
  phone: {
    headerTitle: 'text-xl font-bold',
    headerSub: 'text-base',
    body: 'text-base',
    label: 'text-xs',
    metric: 'text-lg font-bold',
    micro: 'text-[10px]',
    cardPadding: 'p-4',
    cardPaddingSm: 'p-3',
    cardRadius: 'rounded-xl',
    headerPadding: 'px-5 py-3',
  },
  tablet: {
    headerTitle: 'text-base font-bold',
    headerSub: 'text-sm',
    body: 'text-sm',
    label: 'text-xs',
    metric: 'text-xl font-bold',
    micro: 'text-[10px]',
    cardPadding: 'p-3.5',
    cardPaddingSm: 'p-3',
    cardRadius: 'rounded-lg',
    headerPadding: 'px-6 py-3',
  },
  desktop: {
    headerTitle: 'text-base font-bold',
    headerSub: 'text-sm',
    body: 'text-xs',
    label: 'text-[10px]',
    metric: 'text-xl font-bold',
    micro: 'text-[9px]',
    cardPadding: 'p-3',
    cardPaddingSm: 'px-3 py-2.5',
    cardRadius: 'rounded-lg',
    headerPadding: 'p-4',
  },
} as const;
