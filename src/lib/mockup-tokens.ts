/**
 * 목업 디자인 토큰
 *
 * 모든 목업 컴포넌트가 참조하는 컬러, 타이포 규격.
 * SAAI DS 원천 토큰은 codegen 산출물(mockup-tokens.gen.ts)에서 재export한다 —
 * design-system/ 직접 import 금지 (MOCKUP_MASTER_PLAN_v1 §2-A · D1).
 */

export {
  SAAI_COLORS,
  SAAI_TYPE,
  SAAI_ROUNDED,
  SAAI_SPACING,
  SAAI_MOTION,
  type SaaiColorKey,
} from './mockup-tokens.gen';

// ── 제품 컬러 매핑 ──────────────────────────────────────────────────────────

export type ProductName = 'StoreCare' | 'StoreInsight' | 'StoreAgent';

/**
 * @deprecated 제품 구분색(emerald/violet) 폐지 — SAAI 단일 블루 (D2).
 * 제품 구분은 SaaiHeader 워드마크+타이포가 담당하고, 색은 차트/상태 칩의 SAAI
 * 데이터 hue만 쓴다. 전환기 동안 세 제품 모두 blue alias로 동작하며,
 * Phase 1(실사용 마이그레이션) 완료 시 이 상수 자체를 삭제한다.
 */
export const PRODUCT_THEME: Record<ProductName, {
  bg: string;
  bgLight: string;
  text: string;
  border: string;
  headerBorder: string;
  dot: string;
  accent: string;
}> = (() => {
  const blue = {
    bg: 'bg-primary',
    bgLight: 'bg-primary-lighter',
    text: 'text-primary',
    border: 'border-primary-light',
    headerBorder: 'border-primary',
    dot: 'bg-primary',
    accent: 'blue',
  };
  return { StoreCare: blue, StoreInsight: blue, StoreAgent: blue } as const;
})();

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
  // 다크 파생 규칙(§2-A 명문화): SAAI DS는 다크 스펙 미출시 — 그때까지 "SAAI grey
  // 스케일 역전 + blue 유지"를 파생 원칙으로 삼는다(배경=grey-900 계열 역전값,
  // 텍스트=white→grey-400 순 역전, 브랜드 blue-500은 그대로). SAAI DS 다크가
  // 출시되면 이 스킴을 gen 산출물 기반으로 교체한다.
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
    // §2-A: 11px 미만 글자 금지 — micro 트랙은 11px이 하한 (SAAI chart-source=10px는
    // 차트 각주 전용 예외, 목업 UI 텍스트에는 쓰지 않는다)
    micro: 'text-[11px]',
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
    micro: 'text-[11px]',
    cardPadding: 'p-3.5',
    cardPaddingSm: 'p-3',
    cardRadius: 'rounded-lg',
    headerPadding: 'px-6 py-3',
  },
  desktop: {
    headerTitle: 'text-base font-bold',
    headerSub: 'text-sm',
    body: 'text-xs',
    label: 'text-[11px]',
    metric: 'text-xl font-bold',
    micro: 'text-[11px]',
    cardPadding: 'p-3',
    cardPaddingSm: 'px-3 py-2.5',
    cardRadius: 'rounded-lg',
    headerPadding: 'p-4',
  },
} as const;

// ── 상태 컬러 (SAAI status 세트 — §2-A: Material 세트에서 교체) ──
//
// SVG fill/stroke처럼 Tailwind 클래스를 쓸 수 없는 자리는 MOCKUP_STATUS_HEX를,
// 배지·점·텍스트처럼 클래스가 되는 자리는 MOCKUP_STATUS_CLASS를 쓴다. 여러 목업이
// 각자 로컬 STATUS_COLOR 맵을 새로 선언하던 걸 여기 하나로 모은다(중복 회피).
// "정상"은 SAAI에 해당 시맨틱이 없어 grey-300(중립)을 쓴다.
export type MockupStatus = 'normal' | 'warning' | 'critical';

export const MOCKUP_STATUS_HEX: Record<MockupStatus, string> = {
  normal: '#8E949D', // SAAI grey-300
  warning: '#FAD232', // SAAI status-warning (yellow-500)
  critical: '#E05959', // SAAI status-error (red-500)
};

export const MOCKUP_STATUS_CLASS: Record<MockupStatus, { dot: string; text: string; bg: string }> = {
  normal: { dot: 'bg-slate-400', text: 'text-slate-600', bg: 'bg-slate-100' },
  warning: { dot: 'bg-warning', text: 'text-warning', bg: 'bg-warning/10' },
  critical: { dot: 'bg-error', text: 'text-error', bg: 'bg-error/10' },
};
