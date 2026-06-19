/**
 * 목업 디자인 토큰
 *
 * 모든 목업 컴포넌트가 참조하는 사이즈, 컬러, 타이포 규격.
 * 페이지에서 목업을 배치할 때 MOCKUP_SIZES를 사용하여 일관된 크기 제어.
 */

// ── 디바이스 사이즈 ──────────────────────────────────────────────────────────

export type DeviceType = 'phone' | 'tablet' | 'desktop';
export type SizeVariant = 'sm' | 'md' | 'lg';

/** 반응형 사이즈 클래스 (Tailwind) — 프레임 max-width에 맞춤 */
export const MOCKUP_SIZES: Record<DeviceType, Record<SizeVariant, string>> = {
  phone: {
    sm: 'max-w-[280px]',   // 모바일 뷰포트 / 다단 레이아웃
    md: 'max-w-[340px]',   // 태블릿 뷰포트
    lg: 'max-w-[400px]',   // 데스크탑 뷰포트 (PhoneFrame max: 420px)
  },
  tablet: {
    sm: 'max-w-[400px]',   // 모바일 뷰포트
    md: 'max-w-[520px]',   // 태블릿 뷰포트
    lg: 'max-w-[680px]',   // 데스크탑 뷰포트 (TabletFrame max: 768px)
  },
  desktop: {
    sm: 'max-w-[640px]',   // 모바일 뷰포트
    md: 'max-w-[820px]',   // 태블릿 뷰포트
    lg: 'max-w-[1024px]',  // 데스크탑 뷰포트 (MacBookFrame max: 896px / Desktop max: 1024px)
  },
} as const;

/** 반응형 기본 사이즈 (sm → md → lg 자동 전환) — 프레임 max-width 내에서 스케일 */
export const MOCKUP_RESPONSIVE: Record<DeviceType, string> = {
  phone:   'w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px]',
  tablet:  'w-full max-w-[400px] sm:max-w-[520px] lg:max-w-[680px]',
  desktop: 'w-full max-w-[640px] sm:max-w-[820px] lg:max-w-[1024px]',
} as const;

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
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
    headerBorder: 'border-blue-500',
    dot: 'bg-blue-500',
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

export type MockupScheme = keyof typeof MOCKUP_SCHEME;

// ── 업종 목업 악센트 ─────────────────────────────────────────────────────

export const INDUSTRY_ACCENT = {
  cafe:       { border: 'border-amber-500',  text: 'text-amber-600',  bg: 'bg-amber-50' },
  drugstore:  { border: 'border-rose-500',   text: 'text-rose-600',   bg: 'bg-rose-50' },
  unmanned:   { border: 'border-blue-500',   text: 'text-blue-600',   bg: 'bg-blue-50' },
  exhibition: { border: 'border-indigo-500', text: 'text-indigo-600', bg: 'bg-indigo-50' },
  logistics:  { border: 'border-slate-500',  text: 'text-slate-600',  bg: 'bg-slate-50' },
  mart:       { border: 'border-violet-500', text: 'text-violet-600', bg: 'bg-violet-50' },
  fashion:    { border: 'border-pink-500',   text: 'text-pink-600',   bg: 'bg-pink-50' },
} as const;

export type IndustrySlug = keyof typeof INDUSTRY_ACCENT;

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
