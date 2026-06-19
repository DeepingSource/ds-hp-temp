/* =============================================================
 * SAAI Design System — Tailwind config preset
 * Single source: constitution/SAAI_MASTER.md 부록 A
 * Version: v1.4  (2026-05-06)
 *
 * 사용:
 *   1) 본 파일을 your-app의 tailwind.config.ts 에 preset으로 import:
 *      import saaiPreset from 'path/to/dist/saai-tailwind.config'
 *      export default { presets: [saaiPreset], content: [...] }
 *   2) 또는 본 파일을 직접 tailwind.config.ts 로 사용 후 content 만 추가.
 *
 * 핵심 룰 (마스터 §3):
 *   - 단일 브랜드 색 SAAI Blue (= --saai-blue-500 = #376AE2)
 *   - weight 400/500/700 한정 (600/800/900 fontWeight 추가 금지)
 *   - 의미 색은 5종 한정: primary / positive / negative / warning / deep-red
 *   - 데이터 색은 차트·상태 한정 — Tailwind utility로 노출하되 도큐먼트에 명시
 *
 * 본 preset 자체는 raw hex를 정의 (Tier 1 source 역할).
 * 컴포넌트 코드는 가능하면 semantic alias 사용 권장:
 *   bg-primary / text-body / border-card / shadow-input
 * ============================================================= */

import type { Config } from 'tailwindcss'

// ─── 색 primitive ──────────────────────────────────────
const colors = {
  // ── Neutrals ─────────────────────────────────────────
  white:  '#FFFFFF',
  black:  '#000000',

  grey: {
    25:  '#F9F9FB',
    50:  '#E9E9EA',
    100: '#D9DBDD',
    200: '#B1B5BB',
    300: '#8E949D',
    400: '#787F89',
    500: '#565F6C',
    600: '#4E5662',
    700: '#3D434D',
    800: '#2F343B',
    900: '#24282D',
  },

  // ── Brand: 단일 (마스터 §3.1 Brand-Single) ────────────
  blue: {
    25:  '#F7F9FD',
    50:  '#EBF0FC',
    100: '#C1D1F6',
    200: '#A3BAF2',
    300: '#799BEC',
    400: '#5F88E8',
    500: '#376AE2',  // === SAAI Blue ===
    600: '#3260CE',
    700: '#274BA0',
    800: '#1E3A7C',
    900: '#172D5F',
  },

  // ── Data palettes — 차트·상태 한정 (chrome ❌) ──────
  cyan:   { 50: '#F1FAFA', 100: '#D5EFF0', 200: '#C0E8E9', 300: '#A3DDDF', 400: '#91D6D9', 500: '#76CCCF', 600: '#6BBABC', 700: '#549193', 800: '#417072', 900: '#325657' },
  purple: { 50: '#F8EFFC', 100: '#E8CCF6', 200: '#DDB4F1', 300: '#CE91EB', 400: '#C57CE7', 500: '#B65BE1', 600: '#A653CD', 700: '#8141A0', 800: '#64327C', 900: '#4C265F' },
  pink:   { 50: '#FDEEF6', 100: '#F9CCE3', 200: '#F5B3D4', 300: '#F08FBC', 400: '#ED77AD', 500: '#E5599A', 600: '#CF508B', 700: '#A33F6E', 800: '#7E3055', 900: '#602541' },
  red:    { 50: '#FCEEEE', 100: '#F5CCCC', 200: '#F1B3B3', 300: '#EA9090', 400: '#E67A7A', 500: '#E05959', 600: '#CC5151', 700: '#9F3F3F', 800: '#7B3131', 900: '#5E2525' },
  yellow: { 50: '#FFFBEB', 100: '#FEF8E0', 200: '#FDF1BF', 300: '#FBE68D', 400: '#FADE66', 500: '#FAD232', 600: '#E1BD2D', 700: '#C8A828', 800: '#967E1E', 900: '#705E16' },
  green:  { 50: '#E8F8E8', 100: '#B8E9B6', 200: '#96DE93', 300: '#66CF62', 400: '#48C544', 500: '#1AB715', 600: '#18A713', 700: '#12820F', 800: '#0E650C', 900: '#0B4D09' },

  // ── Tier 2 semantic alias — 의미 5종 한정 ───────────
  primary:        '#376AE2',  // = blue.500
  'primary-hover': '#3260CE',
  positive:       '#0E650C',  // = green.800
  negative:       '#9F3F3F',  // = red.700
  warning:        '#FAD232',  // = yellow.500
  'deep-red':     '#7B3131',  // = red.800 — 위험·border-left only

  // ── Audience — body 클래스로 분기는 CSS-side에서 ───
  // (Tailwind 측은 색 정의만, 분기는 CSS variable 사용 권장)
}

// ─── Spacing — 2px grid (마스터 §3.4) ──────────────────
const spacing = {
  '0':  '0',
  '0.5': '2px',
  '1':  '6px',     // saai-space-1
  '2':  '10px',    // saai-space-2
  '3':  '16px',    // saai-space-3 — 카드 패딩 최소
  '4':  '20px',    // saai-space-4
  '5':  '28px',    // saai-space-5 — 카드 간 표준
  '6':  '36px',    // saai-space-6 — 섹션 간
  '8':  '48px',    // saai-space-8 — 큰 단락
  // semantic alias (Tailwind 의 spacing 키와 호환되도록 string key)
  'xs':  '6px',
  's':   '10px',
  'm':   '16px',
  'l':   '20px',
  'xl':  '28px',
  '2xl': '36px',
  '3xl': '48px',
}

// ─── Radii (마스터 §3.5) ───────────────────────────────
const borderRadius = {
  'none': '0',
  'sm':   '2px',
  DEFAULT: '4px',
  'md':   '6px',
  'lg':   '8px',
  'xl':   '10px',
  'pill': '900px',
  'full': '9999px',
  // semantic
  'button':  '6px',
  'card':    '6px',
  'bubble':  '8px',
  'input':   '10px',
  'menu':    '10px',
  'tooltip': '6px',
}

// ─── Shadow — 장식 0건, 기능 5종 (마스터 §3.5) ────────
const boxShadow = {
  'none':    '0 0 #0000',
  'input':   '0 2px 10px 0 rgba(135,135,135,0.12)',
  'pill':    '0 0 20px 0 rgba(135,135,135,0.12)',
  'card':    '0 2px 6px 0 rgba(0,0,0,0.08)',
  'menu':    '0 1px 2px 0 rgba(0,0,0,0.05)',
  'tooltip': '0 2px 4px 0 rgba(0,0,0,0.25)',
  'focus':   '0 0 0 2px rgba(122,197,255,0.30)',
  // ★ 인너 / 컬러 / 다층 stack 추가 금지
}

// ─── Type — Pretendard 1 패밀리 (마스터 §3.3) ─────────
const fontFamily = {
  sans: ['PretendardKR', 'Pretendard', 'system-ui', '-apple-system', 'Helvetica Neue', 'sans-serif'],
  jp:   ['PretendardJP', 'Pretendard', 'system-ui', 'sans-serif'],
  numeric: ['SF Mono', 'ui-monospace', 'JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
  // ★ Serif heading 추가 금지 (Editorial 톤은 SAAI 아님)
}

const fontWeight = {
  // ★ 400/500/700 한정 (600/800/900 추가 금지)
  normal: '400',
  medium: '500',
  bold:   '700',
}

const fontSize = {
  // ── Heading track (line-height 1.5 fixed; 24px+ hero 1.4 예외) ──
  'heading-3xl': ['36px', { lineHeight: '1.4', fontWeight: '700' }],   // hero 예외
  'heading-2xl': ['24px', { lineHeight: '1.4', fontWeight: '700' }],   // hero 예외
  'heading-xl':  ['20px', { lineHeight: '1.5', fontWeight: '700' }],
  'heading-lg':  ['18px', { lineHeight: '1.5', fontWeight: '500' }],
  'heading-md':  ['16px', { lineHeight: '1.5', fontWeight: '500' }],
  'heading-sm':  ['14px', { lineHeight: '1.5', fontWeight: '500' }],
  // ── Body track (line-height 1.7) ──
  'body-xl':     ['18px', { lineHeight: '1.7', fontWeight: '400' }],
  'body-lg':     ['16px', { lineHeight: '1.7', fontWeight: '400' }],
  'body-base':   ['14px', { lineHeight: '1.7', fontWeight: '400' }],
  'body-s':      ['12px', { lineHeight: '1.7', fontWeight: '400' }],   // CJK 최소
  // ── Chart-specific (마스터 §5.4) — 11px 이상 의무 ──
  'chart-title':    ['14px', { lineHeight: '1.4', fontWeight: '700' }],
  'chart-subtitle': ['12px', { lineHeight: '1.4' }],
  'chart-axis':     ['11px', { lineHeight: '1.3' }],
  'chart-source':   ['10px', { lineHeight: '1.3' }],   // 메타 — 데이터 라벨 ❌
}

const lineHeight = {
  'heading':      '1.5',
  'heading-hero': '1.4',
  'body':         '1.7',
  'tight':        '1.4',
}

// ─── Motion ─────────────────────────────────────────
const transitionDuration = {
  fast:     '150ms',
  normal:   '250ms',
  sidebar:  '300ms',
  pane:     '480ms',
  pulse:    '800ms',
}

const transitionTimingFunction = {
  saai: 'cubic-bezier(0.22, 1, 0.36, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
}

// ─── Breakpoints (마스터 §3.8) ──────────────────────
const screens = {
  mobile:  '480px',
  tablet:  '768px',
  desktop: '1024px',
  wide:    '1440px',
}

// ─── Preset export ──────────────────────────────────
const saaiPreset: Partial<Config> = {
  // 다크 모드 — body.theme-dark 를 셀렉터로 (마스터 §3.2)
  // saai-dark.css 와 동일한 진입 정책. prefers-color-scheme 도 saai-dark.css 가 처리.
  darkMode: ['class', 'body.theme-dark'],
  theme: {
    extend: {
      colors,
      spacing,
      borderRadius,
      boxShadow,
      fontFamily,
      fontWeight,
      fontSize,
      lineHeight,
      transitionDuration,
      transitionTimingFunction,
      screens,
      letterSpacing: {
        // 일본어 미세 조정 (마스터 §3.3 CJK 차이)
        'ja-body':    '0.02em',
        'ja-heading': '0.01em',
      },
      // backdropBlur — chat title bar 한 군데만 사용 (마스터 §3.5)
      backdropBlur: { saai: '10px' },
    },
  },
  // ★ 안전장치 — corePlugins 으로 weight 600 등 차단 가능 (옵션)
  // corePlugins: { /* fontWeight를 override 하는 플러그인 차단 */ },
}

export default saaiPreset

/* =============================================================
 * 사용 예 — 컴포넌트 코드에서
 * =============================================================
 *
 *   <button class="bg-primary text-white px-s py-xs
 *                  rounded-button shadow-input
 *                  text-body-base font-medium
 *                  transition-colors duration-fast ease-saai">
 *     Send
 *   </button>
 *
 *   <h1 class="text-heading-2xl text-grey-900">제목</h1>   ← line-height 1.4 자동
 *   <p  class="text-body-base text-grey-700">본문</p>       ← line-height 1.7 자동
 *
 * 안티패턴 (PR 거부):
 *   class="bg-[#376AE2]"                ❌ raw hex
 *   class="font-semibold"               ❌ weight 600
 *   class="text-[13px]"                 ❌ raw px (CJK 12px 미만 위험)
 *   style="line-height: 1.6"            ❌ 룰 외 line-height
 * ============================================================= */
