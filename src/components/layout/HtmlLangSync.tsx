'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getLocaleFromPath, htmlLang, type Locale } from '@/lib/i18n';

const skipToContent: Record<Locale, string> = {
  ko: '본문으로 건너뛰기',
  en: 'Skip to content',
  jp: '本文へスキップ',
};

/**
 * HtmlLangSync — keeps <html lang> and the skip-link text correct per locale on
 * the client, so the root layout can stay STATIC (SSG restored).
 *
 * The server shell ships a static `lang="en"`; this corrects it on mount and on
 * client-side navigation. Locale is derived from the URL prefix (/ko · /jp);
 * the Korean minisite (path `/`, marked by the proxy's x-site-mode cookie)
 * falls back to `ko` to preserve prior behavior. This is a post-hydration DOM
 * write on <html>, not a render-time value, so it never causes a mismatch.
 */
export default function HtmlLangSync() {
  const pathname = usePathname();

  useEffect(() => {
    let locale = getLocaleFromPath(pathname);
    if (locale === 'en' && document.cookie.includes('x-site-mode=minisite')) {
      locale = 'ko';
    }
    document.documentElement.lang = htmlLang(locale);
    const skip = document.getElementById('skip-to-content');
    if (skip) skip.textContent = skipToContent[locale];
  }, [pathname]);

  return null;
}
