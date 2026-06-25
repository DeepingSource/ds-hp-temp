/**
 * i18n — path-prefix locale routing (PLAN_v1.1 D6).
 *
 * `/`      → en (default, no prefix)
 * `/ko/*`  → Korean
 * `/jp/*`  → Japanese
 *
 * Pages stay one component; locale is passed as a prop and resolved against
 * the dictionary below. Copy follows BRAND_v2 §3 (two master copies).
 */

import siteContent from '@/data/generated/site-content.json';

export type Locale = 'en' | 'ko' | 'jp';

export const locales = ['en', 'ko', 'jp'] as const;
export const defaultLocale: Locale = 'en';

/** Path prefix for a locale ('' for the default/en). */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? '' : `/${locale}`;
}

/** Resolve the locale from the first path segment. */
export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split('/')[1];
  if (seg === 'ko' || seg === 'jp') return seg;
  return defaultLocale;
}

/** Split a pathname into its locale + the unprefixed base path. */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const parts = pathname.split('/');
  if (parts[1] === 'ko' || parts[1] === 'jp') {
    const locale = parts[1] as Locale;
    const rest = '/' + parts.slice(2).join('/');
    const path = rest === '/' ? '/' : rest.replace(/\/$/, '');
    return { locale, path: path || '/' };
  }
  return { locale: defaultLocale, path: pathname };
}

/** Build a locale-aware href (e.g. localeHref('ko', '/products') → '/ko/products'). */
export function localeHref(locale: Locale, path: string): string {
  const clean = path === '/' ? '' : path;
  return `${localePrefix(locale)}${clean}` || '/';
}

/**
 * The two master copies (BRAND_v2 §3) plus the home supporting strings.
 * Sourced from `content/site/home.yaml` (Keystatic-editable) via the generated
 * JSON — edit the copy there, not here. Shape stays Record<Locale, …>.
 */
export const homeCopy: Record<Locale, {
  masterCompany: string;
  masterOwner: string;
  heroSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
}> = siteContent.homeCopy;

/** Locale switcher labels. */
export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  ko: 'KO',
  jp: 'JP',
};

/** <html lang> attribute value. */
export function htmlLang(locale: Locale): string {
  return locale === 'jp' ? 'ja' : locale;
}
