'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X, Languages } from 'lucide-react';

/**
 * Interim, non-binding notice for the product-doc detail pages, which currently
 * hold Korean-only content served at the default (en) route. The proxy rewrites
 * /ko·/jp/resources/docs/{slug} to the base route while preserving the browser
 * URL, so the visitor's locale is read client-side from the pathname. Korean
 * readers see nothing; en/jp visitors see a "translation pending" banner. This
 * keeps the 17 hardcoded content pages untouched (no collision) until the docs
 * are translated. Detail pages only — the /resources/docs index is already i18n.
 */
const NOTICE: Record<'en' | 'jp', string> = {
  en: 'This document is currently available in Korean only. An English version is being prepared.',
  jp: '本ドキュメントは現在、韓国語のみで提供しています。日本語版を準備中です。',
};

export default function DocTranslationNotice() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Avoid a hydration mismatch: the base route SSRs with pathname='/resources/docs/…'
  // (no locale prefix); the real locale is only known on the client after mount.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted || dismissed) return null;

  const isDetail = /\/resources\/docs\/[^/]+/.test(pathname);
  if (!isDetail) return null;

  const m = pathname.match(/^\/(ko|jp)(?=\/|$)/);
  const locale = m ? m[1] : 'en';
  if (locale === 'ko') return null;

  return (
    <div className="fixed inset-x-0 top-16 z-40 flex justify-center px-4">
      <div className="mt-2 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 shadow-sm max-w-3xl w-full">
        <Languages className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
        <p className="flex-1 text-xs text-amber-900 leading-relaxed break-keep">{NOTICE[locale as 'en' | 'jp']}</p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="shrink-0 text-amber-700 hover:text-amber-900 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
