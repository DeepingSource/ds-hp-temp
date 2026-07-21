'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { locales, localeLabels, localeHref, stripLocale, type Locale } from '@/lib/i18n';

/**
 * Locale switcher (EN/KO/JP). Keeps the current path, swapping the locale prefix.
 * Desktop: a compact Globe + current-locale dropdown. Mobile (`inline`): the three
 * locales laid out horizontally inside the sheet menu. Links stay <Link>-based so
 * hreflang stays crawlable — the dropdown only gates visibility, not the markup.
 * Home is fully translated; sub-routes serve the base route under the prefix
 * (proxy rewrite) so links never 404.
 */
export default function LocaleSwitcher({
  className = '',
  inline = false,
}: {
  className?: string;
  inline?: boolean;
}) {
  const pathname = usePathname();
  const { locale: current, path } = stripLocale(pathname);
  const langLabel = { ko: '언어 선택', en: 'Select language', jp: '言語選択' }[current];

  if (inline) {
    return (
      <div className={`flex items-center gap-0.5 ${className}`} role="group" aria-label={langLabel}>
        <Globe className="w-3.5 h-3.5 text-gray-400 mr-1" aria-hidden="true" />
        {locales.map((loc) => {
          const active = loc === current;
          return (
            <Link
              key={loc}
              href={localeHref(loc, path)}
              hrefLang={loc === 'jp' ? 'ja' : loc}
              aria-current={active ? 'true' : undefined}
              className={`inline-flex items-center min-h-[44px] px-2 text-xs font-medium rounded transition-colors ${
                active ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {localeLabels[loc]}
            </Link>
          );
        })}
      </div>
    );
  }

  return <LocaleDropdown className={className} current={current} path={path} />;
}

function LocaleDropdown({
  className,
  current,
  path,
}: {
  className: string;
  current: Locale;
  path: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const langLabel = { ko: '언어 선택', en: 'Select language', jp: '言語選択' }[current];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 min-h-[44px] px-2 text-xs font-medium text-gray-500 hover:text-gray-700 rounded-lg transition-colors cursor-pointer"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={langLabel}
      >
        <Globe className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
        {localeLabels[current]}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <div
        aria-hidden={!open}
        inert={!open || undefined}
        className={`absolute top-full right-0 mt-1 min-w-[7rem] bg-white rounded-xl border border-gray-100 shadow-lg shadow-gray-200/60 py-1 transition-[opacity,transform] duration-200 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
      >
        {locales.map((loc) => {
          const active = loc === current;
          return (
            <Link
              key={loc}
              href={localeHref(loc, path)}
              hrefLang={loc === 'jp' ? 'ja' : loc}
              aria-current={active ? 'true' : undefined}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 text-sm transition-colors ${
                active
                  ? 'text-primary bg-primary-lighter font-medium'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              {localeLabels[loc]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
