import type { Metadata } from 'next';

/**
 * Shared Open Graph defaults.
 *
 * WHY THIS EXISTS: a page-level `openGraph` block REPLACES the root layout's
 * block outright — Next does not merge them. So every page that declared its
 * own `openGraph` (to fix og:locale/og:url per locale) silently dropped
 * `og:image`, `og:type` and `og:site_name`. Spread `OG_BASE` first and let the
 * page's own keys win:
 *
 *   openGraph: { ...OG_BASE, title, description, url, locale: 'ko_KR' }
 *
 * Pages needing a different card (e.g. /technology/seal) just declare their own
 * `images` after the spread.
 */
export const OG_BASE = {
  siteName: 'DEEPINGSOURCE',
  type: 'website',
  images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'DeepingSource — Anonymized Spatial AI' }],
} satisfies Metadata['openGraph'];
