import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { localeHref, type Locale } from '@/lib/i18n';

/** Locale-prefix an internal link while preserving its query/hash; external links pass through. */
function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith('/')) return href;
  const m = href.match(/^([^?#]*)(.*)$/);
  const path = m?.[1] ?? href;
  const rest = m?.[2] ?? '';
  return localeHref(locale, path) + rest;
}

/**
 * Renders an FAQ answer (MDX from the `faq` collection). Internal links written as
 * `/contact` etc. are auto-localized to the current locale (the editor writes plain
 * paths; no localeHref needed in content). Used inside the FAQ accordion.
 */
export default function FaqAnswer({ body, locale }: { body: string; locale: Locale }) {
  const components = {
    p: (p: React.ComponentProps<'p'>) => <p className="mb-3 last:mb-0 leading-relaxed" {...p} />,
    ul: (p: React.ComponentProps<'ul'>) => <ul className="space-y-2 mb-4 list-disc pl-5" {...p} />,
    ol: (p: React.ComponentProps<'ol'>) => <ol className="space-y-2 mb-4 list-decimal pl-5" {...p} />,
    li: (p: React.ComponentProps<'li'>) => <li {...p} />,
    strong: (p: React.ComponentProps<'strong'>) => <strong className="font-semibold text-gray-900" {...p} />,
    a: ({ href = '', children }: React.ComponentProps<'a'>) => {
      if (/^https?:/.test(href)) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
            {children}
          </a>
        );
      }
      return (
        <Link href={localizeHref(href, locale)} className="text-primary hover:underline font-medium">
          {children}
        </Link>
      );
    },
  };
  return <MDXRemote source={body} components={components} />;
}
