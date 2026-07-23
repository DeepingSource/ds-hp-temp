// ⚠️ 자동 생성 파일 — 손수정 금지.
// 원천: design-system/design.tokens.md (YAML frontmatter, read-only SSOT)
// 생성: scripts/gen-mockup-tokens.mjs — `npm run gen:mockup-tokens`
// 규칙(D1): 목업 내부는 이 파일(또는 --saai-* CSS 변수)로만 SAAI DS를 소비한다.
//           design-system/ 직접 import 금지. (MOCKUP_MASTER_PLAN_v1 §2-A)

/** SAAI 컬러 — 스케일(grey/blue/data hues) + semantic alias + status + 차트 팔레트 전체 (참조 해석 완료) */
export const SAAI_COLORS = {
  "white": "#FFFFFF",
  "black": "#000000",
  "grey-25": "#F9F9FB",
  "grey-50": "#E9E9EA",
  "grey-100": "#D9DBDD",
  "grey-200": "#B1B5BB",
  "grey-300": "#8E949D",
  "grey-400": "#787F89",
  "grey-500": "#565F6C",
  "grey-600": "#4E5662",
  "grey-700": "#3D434D",
  "grey-800": "#2F343B",
  "grey-900": "#24282D",
  "blue-25": "#F7F9FD",
  "blue-50": "#EBF0FC",
  "blue-100": "#C1D1F6",
  "blue-200": "#A3BAF2",
  "blue-300": "#799BEC",
  "blue-400": "#5F88E8",
  "blue-500": "#376AE2",
  "blue-600": "#3260CE",
  "blue-700": "#274BA0",
  "blue-800": "#1E3A7C",
  "blue-900": "#172D5F",
  "cyan-50": "#F1FAFA",
  "cyan-100": "#D5EFF0",
  "cyan-200": "#C0E8E9",
  "cyan-300": "#A3DDDF",
  "cyan-400": "#91D6D9",
  "cyan-500": "#76CCCF",
  "cyan-600": "#6BBABC",
  "cyan-700": "#549193",
  "cyan-800": "#417072",
  "cyan-900": "#325657",
  "purple-50": "#F8EFFC",
  "purple-100": "#E8CCF6",
  "purple-200": "#DDB4F1",
  "purple-300": "#CE91EB",
  "purple-400": "#C57CE7",
  "purple-500": "#B65BE1",
  "purple-600": "#A653CD",
  "purple-700": "#8141A0",
  "purple-800": "#64327C",
  "purple-900": "#4C265F",
  "red-50": "#FCEEEE",
  "red-100": "#F5CCCC",
  "red-200": "#F1B3B3",
  "red-300": "#EA9090",
  "red-400": "#E67A7A",
  "red-500": "#E05959",
  "red-600": "#CC5151",
  "red-700": "#9F3F3F",
  "red-800": "#7B3131",
  "red-900": "#5E2525",
  "yellow-50": "#FFFBEB",
  "yellow-100": "#FEF8E0",
  "yellow-200": "#FDF1BF",
  "yellow-300": "#FBE68D",
  "yellow-400": "#FADE66",
  "yellow-500": "#FAD232",
  "yellow-600": "#E1BD2D",
  "yellow-700": "#C8A828",
  "yellow-800": "#967E1E",
  "yellow-900": "#705E16",
  "green-50": "#E8F8E8",
  "green-100": "#B8E9B6",
  "green-200": "#96DE93",
  "green-300": "#66CF62",
  "green-400": "#48C544",
  "green-500": "#1AB715",
  "green-600": "#18A713",
  "green-700": "#12820F",
  "green-800": "#0E650C",
  "green-900": "#0B4D09",
  "primary": "#376AE2",
  "primary-hover": "#3260CE",
  "on-primary": "#FFFFFF",
  "bg-app": "#FFFFFF",
  "bg-sidebar": "#F9F9FB",
  "bg-bubble-user": "#F9F9FB",
  "bg-input": "#FAFAFA",
  "bg-active": "#EBF0FC",
  "fg-primary": "#24282D",
  "fg-secondary": "#3D434D",
  "fg-tertiary": "#565F6C",
  "fg-muted": "#787F89",
  "fg-placeholder": "#B1B5BB",
  "fg-link": "#376AE2",
  "border-subtle": "#E9E9EA",
  "border-default": "#D9DBDD",
  "border-focus": "#799BEC",
  "status-success": "#1AB715",
  "status-warning": "#FAD232",
  "status-error": "#E05959",
  "status-info": "#376AE2",
  "chart-cat-1": "#376AE2",
  "chart-cat-2": "#76CCCF",
  "chart-cat-3": "#B65BE1",
  "chart-cat-4": "#FAD232",
  "chart-cat-5": "#1AB715",
  "chart-cat-6": "#E05959",
  "chart-context": "#B1B5BB",
  "chart-context-strong": "#8E949D",
  "chart-baseline": "#565F6C",
  "chart-seq-1": "#F7F9FD",
  "chart-seq-2": "#EBF0FC",
  "chart-seq-3": "#C1D1F6",
  "chart-seq-4": "#799BEC",
  "chart-seq-5": "#376AE2",
  "chart-seq-6": "#274BA0",
  "chart-seq-7": "#172D5F",
  "chart-div-neg-3": "#9F3F3F",
  "chart-div-neg-2": "#E05959",
  "chart-div-neg-1": "#F1B3B3",
  "chart-div-mid": "#E9E9EA",
  "chart-div-pos-1": "#A3BAF2",
  "chart-div-pos-2": "#376AE2",
  "chart-div-pos-3": "#274BA0",
  "chart-positive": "#18A713",
  "chart-negative": "#CC5151",
  "chart-neutral": "#787F89",
  "chart-warning": "#E1BD2D",
  "chart-forecast": "#8E949D",
  "chart-axis": "#8E949D",
  "chart-axis-tick": "#B1B5BB",
  "chart-grid": "#E9E9EA",
  "chart-grid-strong": "#D9DBDD",
  "chart-tooltip-bg": "rgba(0,0,0,0.9)",
  "chart-tooltip-fg": "#FFFFFF",
  "chart-band": "rgba(55,106,226,0.08)",
  "chart-band-strong": "rgba(55,106,226,0.16)"
} as const;

export type SaaiColorKey = keyof typeof SAAI_COLORS;

/** SAAI 타이포 트랙 — heading/body/special/chart (fontSize·fontWeight·lineHeight) */
export const SAAI_TYPE = {
  "heading-3xl": {
    "fontSize": "38px",
    "fontWeight": 700,
    "lineHeight": 1.5
  },
  "heading-2xl": {
    "fontSize": "34px",
    "fontWeight": 700,
    "lineHeight": 1.5
  },
  "heading-xl": {
    "fontSize": "27px",
    "fontWeight": 500,
    "lineHeight": 1.5
  },
  "heading-l": {
    "fontSize": "24px",
    "fontWeight": 500,
    "lineHeight": 1.5
  },
  "heading-m": {
    "fontSize": "21px",
    "fontWeight": 500,
    "lineHeight": 1.5
  },
  "heading-s": {
    "fontSize": "17px",
    "fontWeight": 500,
    "lineHeight": 1.5
  },
  "heading-xs": {
    "fontSize": "15px",
    "fontWeight": 500,
    "lineHeight": 1.5
  },
  "heading-2xs": {
    "fontSize": "13px",
    "fontWeight": 500,
    "lineHeight": 1.5
  },
  "body-xl": {
    "fontSize": "17px",
    "fontWeight": 400,
    "lineHeight": 1.7
  },
  "body-l": {
    "fontSize": "15px",
    "fontWeight": 400,
    "lineHeight": 1.7
  },
  "body-m": {
    "fontSize": "13px",
    "fontWeight": 400,
    "lineHeight": 1.7
  },
  "body-s": {
    "fontSize": "12px",
    "fontWeight": 400,
    "lineHeight": 1.7
  },
  "empty-state-title": {
    "fontSize": "24px",
    "fontWeight": 500,
    "lineHeight": 1.4
  },
  "caption": {
    "fontSize": "12px",
    "fontWeight": 400,
    "lineHeight": 1.4
  },
  "chart-title": {
    "fontSize": "14px",
    "fontWeight": 700,
    "lineHeight": 1.4
  },
  "chart-subtitle": {
    "fontSize": "12px",
    "fontWeight": 400,
    "lineHeight": 1.4
  },
  "chart-axis-label": {
    "fontSize": "11px",
    "fontWeight": 400,
    "lineHeight": 1.4
  },
  "chart-data-label": {
    "fontSize": "11px",
    "fontWeight": 500,
    "lineHeight": 1.4
  },
  "chart-source": {
    "fontSize": "10px",
    "fontWeight": 400,
    "lineHeight": 1.4
  }
} as const;

/** SAAI 라운딩 스케일 */
export const SAAI_ROUNDED = {
  "none": 0,
  "xs": "4px",
  "sm": "6px",
  "md": "8px",
  "lg": "10px",
  "full": "900px"
} as const;

/** SAAI 스페이싱 스케일 */
export const SAAI_SPACING = {
  "none": 0,
  "xxs": "2px",
  "xs": "4px",
  "sm": "6px",
  "md": "8px",
  "lg": "10px",
  "xl": "12px",
  "xxl": "16px",
  "section": "24px",
  "group": "32px",
  "block": "40px",
  "page": "60px"
} as const;

/** SAAI 모션 — out_quint 단일 곡선, bounce·spring·overshoot 금지 (DESIGN.md ## Motion) */
export const SAAI_MOTION = {
  "ease": {
    "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
    "out-bg": "ease-out"
  },
  "durationMs": {
    "instant": 0,
    "fast": 150,
    "base": 300,
    "pane": 480,
    "pulse": 800,
    "history-highlight": 1500,
    "shimmer": 1500
  }
} as const;
