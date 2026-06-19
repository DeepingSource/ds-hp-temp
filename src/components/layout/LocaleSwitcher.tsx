'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { locales, localeLabels, localeHref, stripLocale } from '@/lib/i18n';

/**
 * Locale switcher (EN/KO/JP). Keeps the current path, swapping the locale prefix.
 * Home is fully translated; sub-routes serve the base route under the prefix
 * (proxy rewrite) so links never 404.
 */
export default function LocaleSwitcher({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const { locale: current, path } = stripLocale(pathname);

  return (
    <div className={`flex items-center gap-0.5 ${className}`} role="group" aria-label="언어 선택">
      <Globe className="w-3.5 h-3.5 text-gray-400 mr-1" aria-hidden="true" />
      {locales.map((loc) => {
        const active = loc === current;
        return (
          <Link
            key={loc}
            href={localeHref(loc, path)}
            hrefLang={loc === 'jp' ? 'ja' : loc}
            aria-current={active ? 'true' : undefined}
            className={`px-1.5 py-0.5 text-xs font-medium rounded transition-colors ${
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
