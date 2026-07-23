/**
 * 목업 디자인 토큰
 *
 * 모든 목업 컴포넌트가 참조하는 컬러, 타이포 규격.
 */

// ── 제품 컬러 매핑 ──────────────────────────────────────────────────────────

export type ProductName = 'StoreCare' | 'StoreInsight' | 'StoreAgent';

/**
 * 제품별 Tailwind 클래스 세트.
 *
 * ⚠️ StoreCare(emerald)·StoreInsight(violet)는 사이트 기본 One-Blue 원칙의 의도적
 * 예외다 — 목업 안에서 "지금 보고 있는 게 어느 제품인지"를 색으로 즉시 구분하기
 * 위한 정보 설계 장치로 유지 중. 새 제품 축을 추가할 때만 신중히 확장하고, 페이지
 * 배경/버튼 등 목업 "바깥" UI에는 절대 끌어다 쓰지 않는다(그건 --primary 한 톤).
 */
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
    // 사이트 공통 블루-블랙 틴트 섀도우(DESIGN.md §Tokens) — 목업도 나머지 페이지와
    // 같은 depth 언어를 쓰도록 중립 회색 shadow-sm 대신 shadow-card 계열을 기본값으로
    // 둔다. 새 카드형 UI를 목업 안에 추가할 때는 아래 3단계 중 하나를 그대로 쓸 것 —
    // 로컬에서 새 그림자 값을 만들지 않는다.
    cardClass: 'bg-white rounded-lg border border-gray-100 shadow-card',
    cardClassHover: 'bg-white rounded-lg border border-gray-100 shadow-card-hover',
    cardClassElevated: 'bg-white rounded-lg border border-gray-100 shadow-elevated',
  },
  dark: {
    headerBg: 'bg-gray-950',
    bodyBg: 'bg-gray-950',
    cardBg: 'bg-gray-900/70',
    textPrimary: 'text-white',
    textSecondary: 'text-gray-400',
    textMuted: 'text-gray-500',
    border: 'border-gray-800/50',
    // 다크 배경 위에서는 블루-블랙 틴트 섀도우가 거의 보이지 않으므로 기본 cardClass는
    // 섀도우 없이 유지하고, hover/elevated 단계에서만 살짝 얹는다(깊이 강조가 필요한
    // 순간에만).
    cardClass: 'bg-gray-900/70 rounded-lg border border-gray-800/50',
    cardClassHover: 'bg-gray-900/70 rounded-lg border border-gray-800/50 shadow-card-hover',
    cardClassElevated: 'bg-gray-900/70 rounded-lg border border-gray-800/50 shadow-elevated',
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
