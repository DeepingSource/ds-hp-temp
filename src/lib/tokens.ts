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
