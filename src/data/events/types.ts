import type { Locale } from '@/lib/i18n';

/**
 * Event — a convention/expo/webinar page (SITE_IMPROVEMENT P2-2). Mirrors the Velite
 * `events` collection; the URL uses the locale-agnostic logical slug (see src/lib/events.ts).
 */
export interface Event {
  slug: string;
  title: string;
  subtitle: string;
  venue: string;
  startDate: string;
  endDate?: string;
  publishFrom?: string;
  publishUntil?: string;
  cover?: string;
  coverAlt?: string;
  ctaLabel: string;
  ctaHref: string;
  lang: Locale;
  draft: boolean;
  noindex: boolean;
  body: string;
}

/** Strip the -en/-jp locale suffix from a file slug to get the URL (logical) slug. */
export function logicalEventSlug(fileSlug: string): string {
  return fileSlug.replace(/-(en|jp)$/, '');
}

const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Localized date (or start–end range) from YYYY-MM-DD strings. */
export function formatEventDateRange(start: string, end: string | undefined, locale: Locale): string {
  const fmt = (d: string): string => {
    const [y, m, day] = d.split('-').map(Number);
    if (locale === 'ko') return `${y}년 ${m}월 ${day}일`;
    if (locale === 'jp') return `${y}年${m}月${day}日`;
    return `${MONTHS_EN[m - 1]} ${day}, ${y}`;
  };
  return !end || end === start ? fmt(start) : `${fmt(start)} – ${fmt(end)}`;
}
