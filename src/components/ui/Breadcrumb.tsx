import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { JsonLd, breadcrumbList } from '@/lib/structured-data';

/**
 * Breadcrumb — visual trail + BreadcrumbList JSON-LD (AEO/SEO).
 * Pass the trail WITHOUT Home; Home is prepended automatically per locale.
 * The last item is the current page (rendered as text, aria-current).
 *
 * `tone="dark"` for placement over dark heroes (light text); default light.
 */

type Crumb = { name: string; path: string };

const homeLabel: Record<Locale, string> = { ko: '홈', en: 'Home', jp: 'ホーム' };

export default function Breadcrumb({
  items,
  locale,
  tone = 'light',
  className = '',
}: {
  items: Crumb[];
  locale: Locale;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const full: Crumb[] = [{ name: homeLabel[locale], path: '/' }, ...items];
  const last = full.length - 1;

  const dark = tone === 'dark';
  const baseColor = dark ? 'text-white/55' : 'text-gray-500';
  const linkHover = dark ? 'hover:text-white' : 'hover:text-primary';
  const currentColor = dark ? 'text-white/90' : 'text-gray-700';
  const sepColor = dark ? 'text-white/30' : 'text-gray-300';

  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${baseColor} ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {full.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className={`w-3.5 h-3.5 ${sepColor}`} aria-hidden="true" />}
            {i === last ? (
              <span className={`font-medium ${currentColor} break-keep`} aria-current="page">{c.name}</span>
            ) : (
              <Link
                href={localeHref(locale, c.path)}
                className={`${linkHover} transition-colors break-keep`}
              >
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <JsonLd data={breadcrumbList(full, locale)} />
    </nav>
  );
}
