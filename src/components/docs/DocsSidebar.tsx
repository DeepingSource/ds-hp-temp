import Link from 'next/link';
import { Lock } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { getDocsForLocale } from '@/lib/docs';
import { docSectionOrder, docSectionLabelI18n, logicalDocSlug, type Doc } from '@/data/docs/types';
import ProductManualNav, { type NavProduct } from './ProductManualNav';

/**
 * Shared docs sidebar — two blocks (DOCS_WIKI IA-4):
 *  1. 공통 안내 — general install / integration / privacy / analytics docs (no product parent).
 *  2. 제품별 매뉴얼 — one collapsible group per product (saai insight/care/agent/count), so a
 *     reader sees one product's chapters at a time instead of every product's at once.
 * The manual-section landings are the collapsible product headers, not a general section.
 */

/** Product order + saai display labels (parent slug → sidebar heading). URLs stay store-*. */
const PRODUCT_ORDER = ['store-insight', 'store-care', 'store-agent', 'store-count'];
const PRODUCT_LABELS: Record<string, string> = {
  'store-insight': 'saai insight',
  'store-care': 'saai care',
  'store-agent': 'saai agent',
  'store-count': 'store count',
};

const BLOCK_LABEL: Record<Locale, { general: string; products: string }> = {
  ko: { general: '공통 안내', products: '제품별 매뉴얼' },
  en: { general: 'General', products: 'Product Manuals' },
  jp: { general: '共通ガイド', products: '製品別マニュアル' },
};

export default function DocsSidebar({ locale, currentSlug }: { locale: Locale; currentSlug?: string }) {
  const docs = getDocsForLocale(locale);

  const sectionGroups = (list: Doc[]) =>
    docSectionOrder
      .map((section) => ({
        section,
        label: docSectionLabelI18n[locale][section],
        items: list
          .filter((d) => d.section === section)
          .map((d) => ({ slug: logicalDocSlug(d.slug), title: d.title, access: d.access })),
      }))
      .filter((g) => g.items.length > 0);

  // Block 1 — general docs (exclude the manual-section landings; they head the product groups).
  const general = docs.filter((d) => !d.parent && d.section !== 'manual');
  const generalGroups = sectionGroups(general);

  // Block 2 — one collapsible group per product that has chapters.
  const products: NavProduct[] = PRODUCT_ORDER.map((key): NavProduct | null => {
    const chapters = docs.filter((d) => d.parent === key);
    if (chapters.length === 0) return null;
    return { key, label: PRODUCT_LABELS[key], count: chapters.length, sections: sectionGroups(chapters) };
  }).filter((p): p is NavProduct => p !== null);

  const t = BLOCK_LABEL[locale];

  return (
    <nav className="space-y-6" aria-label="Docs">
      {/* 공통 안내 */}
      <div className="space-y-4">
        <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">{t.general}</p>
        {generalGroups.map((group) => (
          <div key={group.section}>
            <p className="text-2xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">{group.label}</p>
            <ul className="space-y-1 border-l border-gray-100 pl-3">
              {group.items.map((i) => {
                const active = i.slug === currentSlug;
                return (
                  <li key={i.slug}>
                    <Link
                      href={localeHref(locale, `/resources/docs/${i.slug}`)}
                      aria-current={active ? 'page' : undefined}
                      className={`block text-sm py-1 transition-colors ${active ? 'text-primary font-medium' : 'text-gray-500 hover:text-primary'}`}
                    >
                      {i.title}
                      {i.access === 'gated' && (
                        <Lock className="inline-block w-3 h-3 ml-1 -translate-y-px text-gray-400" aria-label="gated" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* 제품별 매뉴얼 (접이식) */}
      {products.length > 0 && (
        <ProductManualNav products={products} currentSlug={currentSlug} locale={locale} heading={t.products} />
      )}
    </nav>
  );
}
