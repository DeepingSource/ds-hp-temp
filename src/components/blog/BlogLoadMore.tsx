'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import BlogCard from './BlogCard';
import type { ArticleMeta } from '@/lib/article-metadata';
import { type Locale } from '@/lib/i18n';

/**
 * BlogLoadMore — progressive "load more" for the blog index (P1-1 perf). The server
 * renders the first page; the remaining articles' metadata (body stripped) are handed
 * here and revealed in batches on click, so the initial DOM/LCP stays small while the
 * page remains statically served. No network round-trips.
 */
export default function BlogLoadMore({
  rest,
  locale,
  batch,
  moreLabel,
}: {
  rest: ArticleMeta[];
  locale: Locale;
  batch: number;
  moreLabel: string;
}) {
  // Start at 0 — the first page is already rendered on the server; this island only
  // reveals the *rest* on demand, so the initial DOM stays at one page (fast LCP).
  const [visible, setVisible] = useState(0);
  const shown = rest.slice(0, visible);
  const remaining = rest.length - visible;

  return (
    <>
      {shown.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {shown.map((article) => (
            <BlogCard key={article.slug} article={article} locale={locale} />
          ))}
        </div>
      )}
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
