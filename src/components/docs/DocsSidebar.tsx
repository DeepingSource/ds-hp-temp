import Link from 'next/link';
import { Lock } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { getDocsForLocale } from '@/lib/docs';
import { docSectionOrder, docSectionLabelI18n, logicalDocSlug, type Doc } from '@/data/docs/types';

/**
 * Shared docs sidebar — generated from the Velite `docs` data. Top level splits by
 * PRODUCT via `parent` (store insight / store care user guides) so the imported guide
 * chapters don't intermix with each other or with the general docs; within each product
 * (and the general docs) it groups by `section`. Used by the hub and every detail page.
 */

/** Product-guide labels (parent slug → sidebar heading). */
const PRODUCT_LABELS: Record<string, string> = {
  'store-insight': 'store insight',
  'store-care': 'store care',
  'store-agent': 'store agent',
};

export default function DocsSidebar({ locale, currentSlug }: { locale: Locale; currentSlug?: string }) {
  const docs = getDocsForLocale(locale);

  const sectionGroups = (list: Doc[]) =>
    docSectionOrder
      .map((section) => ({
        section,
        label: docSectionLabelI18n[locale][section],
        items: list.filter((d) => d.section === section),
      }))
      .filter((g) => g.items.length > 0);

  const renderLink = (d: Doc) => {
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
  };

  const renderSection = (group: { section: string; label: string; items: Doc[] }) => (
    <div key={group.section}>
      <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">{group.label}</p>
      <ul className="space-y-1 border-l border-gray-100 pl-3">{group.items.map(renderLink)}</ul>
    </div>
  );

  const general = docs.filter((d) => !d.parent);
  const products = Object.keys(PRODUCT_LABELS)
    .map((key) => ({ key, label: PRODUCT_LABELS[key], docs: docs.filter((d) => d.parent === key) }))
    .filter((p) => p.docs.length > 0);

  return (
    <nav className="space-y-6" aria-label="Docs">
      {/* 일반 문서 (제품 가이드 아님) */}
      {sectionGroups(general).map(renderSection)}

      {/* 제품별 사용자 가이드 */}
      {products.map((p) => (
        <div key={p.key} className="space-y-4 pt-2 border-t border-gray-100">
          <p className="text-sm font-bold text-primary lowercase tracking-tight">{p.label}</p>
          {sectionGroups(p.docs).map(renderSection)}
        </div>
      ))}
    </nav>
  );
}
