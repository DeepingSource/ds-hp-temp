/**
 * tokens.ts — JS-side design-token Source of Truth for contexts that CANNOT read
 * CSS custom properties: SVG/canvas mockups, next/og `ImageResponse` routes
 * (opengraph/twitter), and any literal a runtime needs.
 *
 * KEEP IN SYNC with `src/app/globals.css` :root (the CSS SoT). In className/CSS,
 * prefer the Tailwind utilities (text-primary, bg-primary, …) or var(--primary);
 * import from here ONLY when JS needs a hex literal.
 *
 * When the brand blue changes, update BOTH this file and globals.css :root
 * (and src/app/icon.svg). See /DESIGN.md.
 */

export const BRAND = {
  primary: '#376AE2',
  primaryDark: '#2453C4',
  primaryLight: '#5B86EA',
  primaryLighter: '#E5EDFC',
  secondary: '#26A69A',
  secondaryDark: '#00897B',
} as const;

export const GRAY = {
  50: '#F9FAFB',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
} as const;

/** Live semantic status palette (Material set). */
export const STATUS = {
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
} as const;
