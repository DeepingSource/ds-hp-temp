'use client';

import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import BlogCard from './BlogCard';
import type { ArticleMeta } from '@/lib/article-metadata';
import { type Locale } from '@/lib/i18n';

/**
 * BlogFilterList — blog index grid with topic tabs + client-side "load more".
 *
 * The published blog feed is effectively single-`category` (insight), so filtering by
 * category is useless. Instead we filter by curated TOPICS: each topic maps to a set of
 * raw tags (deduping the messy 150+ freeform tags into a handful of meaningful themes).
 * An article belongs to a topic if any of its tags is in that topic's set. Only topics
 * with ≥1 matching article render, and the bar shows only when ≥2 such topics exist —
 * so the control degrades gracefully for locales/feeds without matching content.
 */

export type BlogTopic = { label: string; tags: string[] };

export default function BlogFilterList({
  articles,
  locale,
  batch,
  moreLabel,
  allLabel,
  filterLabel,
  topics,
}: {
  articles: ArticleMeta[];
  locale: Locale;
  batch: number;
  moreLabel: string;
  allLabel: string;
  filterLabel: string;
  topics: BlogTopic[];
}) {
  const [active, setActive] = useState<string>('all'); // 'all' | topic.label
  const [visible, setVisible] = useState(batch);

  // Keep only topics that actually match at least one article in this feed.
  const liveTopics = useMemo(() => {
    return topics
      .map((t) => ({ ...t, set: new Set(t.tags) }))
      .filter((t) => articles.some((a) => a.tags?.some((tag) => t.set.has(tag))));
  }, [topics, articles]);

  const filtered = useMemo(() => {
    if (active === 'all') return articles;
    const topic = liveTopics.find((t) => t.label === active);
    if (!topic) return articles;
    return articles.filter((a) => a.tags?.some((tag) => topic.set.has(tag)));
  }, [articles, active, liveTopics]);

  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  const select = (label: string) => {
    setActive(label);
    setVisible(batch);
  };

  const pill = (isActive: boolean) =>
    `px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
      isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`;

  return (
    <>
      {/* Topic toggles only make sense with more than one live topic. Plain toggle
          buttons (aria-pressed) controlling the grid — not a full ARIA tab widget. */}
      {liveTopics.length > 1 && (
        <div role="group" aria-label={filterLabel} className="flex flex-wrap gap-2 mb-8">
          <button type="button" aria-pressed={active === 'all'} aria-controls="blog-grid" onClick={() => select('all')} className={pill(active === 'all')}>
            {allLabel}
          </button>
          {liveTopics.map((t) => (
            <button key={t.label} type="button" aria-pressed={active === t.label} aria-controls="blog-grid" onClick={() => select(t.label)} className={pill(active === t.label)}>
              {t.label}
            </button>
          ))}
        </div>
      )}

      <div id="blog-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
