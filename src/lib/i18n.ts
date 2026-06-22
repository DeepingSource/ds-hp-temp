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

/** The two master copies (BRAND_v2 §3) plus the home supporting strings. */
export const homeCopy: Record<Locale, {
  masterCompany: string;
  masterOwner: string;
  heroSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
}> = {
  en: {
    masterCompany: 'Every store, like one.',
    masterOwner: 'Our store, like the best.',
    heroSub: 'On the CCTV you already have — not who, but what and how. Anonymized Spatial AI that keeps no footage.',
    ctaPrimary: 'Talk to us',
    ctaSecondary: 'Explore products',
  },
  ko: {
    masterCompany: '모든 매장을 한 매장처럼',
    masterOwner: '우리 매장이 대표 매장처럼',
    heroSub: '이미 달린 CCTV 위에서 — 누구가 아니라 무엇을 어떻게. 영상은 남기지 않는, 익명화 공간 AI입니다.',
    ctaPrimary: '도입 상담',
    ctaSecondary: '제품 보기',
  },
  jp: {
    masterCompany: 'すべての店舗を、ひとつの店舗のように。',
    masterOwner: '私たちの店が、代表店のように。',
    heroSub: 'すでにあるCCTVの上で — 誰かではなく、何をどう。映像は残さない、匿名化された空間AIです。',
    ctaPrimary: '導入のご相談',
    ctaSecondary: '製品を見る',
  },
};

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
