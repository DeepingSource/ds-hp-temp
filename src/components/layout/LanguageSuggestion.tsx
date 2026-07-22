'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, X } from 'lucide-react';
import { getLocaleFromPath, localeHref, type Locale } from '@/lib/i18n';

/**
 * LanguageSuggestion — on first visit, if the browser language differs from the
 * locale of the current route, offer a one-tap switch. Client-only (static
 * export has no middleware), non-modal, dismissible, and remembered.
 * Skips the non-localized minisite routes (no /ko|/jp variants there).
 */
const DISMISS_KEY = 'ds-lang-suggest-dismissed-session';

const COPY: Record<Locale, { msg: string; cta: string; dismiss: string }> = {
  ko: { msg: '한국어 사이트로 보시겠어요?', cta: '한국어로 보기', dismiss: '닫기' },
  en: { msg: 'View this site in English?', cta: 'Switch to English', dismiss: 'Dismiss' },
  jp: { msg: '日本語サイトで表示しますか?', cta: '日本語で見る', dismiss: '閉じる' },
};

function detectLocale(): Locale | null {
  const langs =
    typeof navigator !== 'undefined' && navigator.languages && navigator.languages.length
      ? navigator.languages
      : [typeof navigator !== 'undefined' ? navigator.language : ''];
  for (const l of langs) {
    const code = (l || '').toLowerCase();
    if (code.startsWith('ko')) return 'ko';
    if (code.startsWith('ja')) return 'jp';
    if (code.startsWith('en')) return 'en';
  }
  return null;
}

export default function LanguageSuggestion() {
  const pathname = usePathname();
  const [suggest, setSuggest] = useState<Locale | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY)) return;
    } catch {
      return;
    }
    // Minisite routes have no /ko|/jp variants — don't suggest there.
    if (/^\/(storeagent|ms-agent)(\/|$)/.test(pathname)) return;
    const current = getLocaleFromPath(pathname);
    const detected = detectLocale();
    if (detected && detected !== current) {
      // Defer past the effect body so it lands after first paint (non-blocking).
      const id = requestAnimationFrame(() => setSuggest(detected));
      return () => cancelAnimationFrame(id);
    } else {
      setSuggest(null);
    }
  }, [pathname]);

  if (!suggest) return null;
  const c = COPY[suggest];

  const current = getLocaleFromPath(pathname);
  const prefix = current === 'en' ? '' : `/${current}`;
  const basePath = prefix && pathname.startsWith(prefix) ? pathname.slice(prefix.length) || '/' : pathname;
  const target = localeHref(suggest, basePath);

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
    setSuggest(null);
  };

  return (
    <div className="fixed inset-x-0 bottom-6 z-[999] flex justify-center px-4 print:hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-3 rounded-full border border-primary/20 bg-white/98 py-3 pl-4 pr-3 shadow-2xl backdrop-blur-md ring-1 ring-black/5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Globe className="w-4 h-4" aria-hidden="true" />
        </div>
        <span className="text-sm font-medium text-gray-800 break-keep">{c.msg}</span>
        <Link
          href={target}
          onClick={dismiss}
          className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:shadow"
        >
          {c.cta}
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label={c.dismiss}
          className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
