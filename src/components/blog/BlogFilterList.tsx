'use client';

import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import BlogCard from './BlogCard';
import type { ArticleMeta, ArticleCategory } from '@/lib/article-metadata';
import { categoryLabelI18n } from '@/data/articles/types';
import { type Locale } from '@/lib/i18n';

/**
 * BlogFilterList — blog index grid with category tabs + client-side "load more".
 * Receives all article metadata (body already stripped) and filters/paginates in the
 * browser so the page stays statically served with no network round-trips. Selecting a
 * category resets pagination to the first batch. The hero stays server-rendered above.
 */
export default function BlogFilterList({
  articles,
  locale,
  batch,
  moreLabel,
  allLabel,
  filterLabel,
}: {
  articles: ArticleMeta[];
  locale: Locale;
  batch: number;
  moreLabel: string;
  allLabel: string;
  filterLabel: string;
}) {
  const [active, setActive] = useState<ArticleCategory | 'all'>('all');
  const [visible, setVisible] = useState(batch);

  // Categories present, in first-seen (newest-first) order.
  const categories = useMemo(() => {
    const seen: ArticleCategory[] = [];
    for (const a of articles) if (!seen.includes(a.category)) seen.push(a.category);
    return seen;
  }, [articles]);

  const filtered = useMemo(
    () => (active === 'all' ? articles : articles.filter((a) => a.category === active)),
    [articles, active],
  );
  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  const select = (c: ArticleCategory | 'all') => {
    setActive(c);
    setVisible(batch);
  };

  const pill = (isActive: boolean) =>
    `px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary text-white'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`;

  return (
    <>
      {/* Tabs only make sense with more than one category; a lone category = no filter bar. */}
      {categories.length > 1 && (
        <div role="tablist" aria-label={filterLabel} className="flex flex-wrap gap-2 mb-8">
          <button type="button" role="tab" aria-selected={active === 'all'} onClick={() => select('all')} className={pill(active === 'all')}>
            {allLabel}
          </button>
          {categories.map((c) => (
            <button key={c} type="button" role="tab" aria-selected={active === c} onClick={() => select(c)} className={pill(active === c)}>
              {categoryLabelI18n[locale][c]}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {shown.map((article) => (
          <BlogCard key={article.slug} article={article} locale={locale} />
        ))}
      </div>

      {remaining > 0 && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + batch)}
            className="btn-secondary inline-flex items-center justify-center gap-2"
          >
            {moreLabel}
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
            <span className="text-gray-400">({remaining})</span>
          </button>
        </div>
      )}
    </>
  );
}
