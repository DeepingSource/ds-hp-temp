'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, ChevronRight } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';

/**
 * ProductManualNav — the "제품별 매뉴얼" block of the docs sidebar. Each product is a
 * collapsible group so the sidebar shows one product's chapters at a time instead of
 * every product's chapters at once. The product owning the current page starts expanded.
 * Fed lightweight metadata (no MDX body) from the server DocsSidebar.
 */

export interface NavItem { slug: string; title: string; access: 'public' | 'gated' }
export interface NavSection { section: string; label: string; items: NavItem[] }
export interface NavProduct { key: string; label: string; count: number; sections: NavSection[] }

export default function ProductManualNav({
  products,
  currentSlug,
  locale,
  heading,
}: {
  products: NavProduct[];
  currentSlug?: string;
  locale: Locale;
  heading: string;
}) {
  // Which product owns the current page (landing key or one of its chapters)?
  const activeKey = products.find(
    (p) => p.key === currentSlug || p.sections.some((s) => s.items.some((i) => i.slug === currentSlug)),
  )?.key;

  const [openKey, setOpenKey] = useState<string | null>(activeKey ?? null);

  return (
    <div className="space-y-1 pt-2 border-t border-gray-100">
      <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">{heading}</p>
      {products.map((p) => {
        const open = openKey === p.key;
        return (
          <div key={p.key}>
            <button
              type="button"
              onClick={() => setOpenKey(open ? null : p.key)}
              aria-expanded={open}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors hover:bg-gray-50 cursor-pointer"
            >
              <ChevronRight
                className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`}
                aria-hidden="true"
              />
              <span className="flex-1 text-sm font-bold text-primary lowercase tracking-tight">{p.label}</span>
              <span className="text-2xs text-gray-400">{p.count}</span>
            </button>

            {open && (
              <div className="pl-4 pb-2 space-y-3">
                <Link
                  href={localeHref(locale, `/resources/docs/${p.key}`)}
                  aria-current={p.key === currentSlug ? 'page' : undefined}
                  className={`block text-sm py-1 ${p.key === currentSlug ? 'text-primary font-medium' : 'text-gray-500 hover:text-primary'} transition-colors`}
                >
                  {locale === 'en' ? 'Overview' : locale === 'jp' ? '概要' : '매뉴얼 소개'}
                </Link>
                {p.sections.map((s) => (
                  <div key={s.section}>
                    <p className="text-2xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">{s.label}</p>
                    <ul className="space-y-1 border-l border-gray-100 pl-3">
                      {s.items.map((i) => {
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
            )}
          </div>
        );
      })}
    </div>
  );
}
