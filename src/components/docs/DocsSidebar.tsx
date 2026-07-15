import Link from 'next/link';
import { Lock } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { getDocsForLocale } from '@/lib/docs';
import { docSectionOrder, docSectionLabelI18n, logicalDocSlug } from '@/data/docs/types';

/**
 * Shared docs sidebar — the whole section tree, generated from the Velite `docs`
 * data (not hardcoded). Used by both the hub and every detail page so visitors can
 * jump between sibling docs directly (DOCS_WIKI_PLAN IA-1). Current doc highlighted.
 */
export default function DocsSidebar({ locale, currentSlug }: { locale: Locale; currentSlug?: string }) {
  const docs = getDocsForLocale(locale);
  const groups = docSectionOrder
    .map((section) => ({
      section,
      label: docSectionLabelI18n[locale][section],
      items: docs.filter((d) => d.section === section),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <nav className="space-y-5" aria-label="Docs">
      {groups.map((group) => (
        <div key={group.section}>
          <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">{group.label}</p>
          <ul className="space-y-1 border-l border-gray-100 pl-3">
            {group.items.map((d) => {
              const logical = logicalDocSlug(d.slug);
              const active = logical === currentSlug;
              return (
                <li key={logical}>
                  <Link
                    href={localeHref(locale, `/resources/docs/${logical}`)}
                    aria-current={active ? 'page' : undefined}
                    className={`block text-sm py-1 transition-colors ${
                      active ? 'text-primary font-medium' : 'text-gray-500 hover:text-primary'
                    }`}
                  >
                    {d.title}
                    {d.access === 'gated' && (
                      <Lock className="inline-block w-3 h-3 ml-1 -translate-y-px text-gray-400" aria-label="gated" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
