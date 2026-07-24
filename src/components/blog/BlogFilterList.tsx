'use client';

import { Fragment, useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight, Store } from 'lucide-react';
import BlogCard from './BlogCard';
import type { ArticleMeta } from '@/lib/article-metadata';
import { localeHref, type Locale } from '@/lib/i18n';

/**
 * BlogFilterList — blog index grid with topic toggle buttons + client-side "load more".
 *
 * The published blog feed is effectively single-`category` (insight), so filtering by
 * category is useless. Instead we filter by curated TOPICS: each topic maps to a set of
 * raw tags (deduping the messy 150+ freeform tags into a handful of meaningful themes).
 * An article belongs to a topic if any of its tags is in that topic's set. Only topics
 * with ≥1 matching article render, and the bar shows only when ≥2 such topics exist —
 * so the control degrades gracefully for locales/feeds without matching content.
 *
 * ⑤3-2 확장: 업종 진입 칩(태그 필터 + 해당 솔루션 허브 크로스링크)과 그리드 사이
 * 인라인 전환 배너(트랙 O) — 블로그는 점주 관문이므로 dead-end를 만들지 않는다.
 */

export type BlogTopic = { label: string; tags: string[] };
export type BlogIndustryChip = { label: string; tag: string; href: string };

/** 그리드에서 인라인 CTA 배너를 끼워 넣는 주기 (⑤3-2: 6~9개마다) */
const BANNER_EVERY = 9;

export default function BlogFilterList({
  articles,
  locale,
  batch,
  moreLabel,
  allLabel,
  filterLabel,
  topics,
  industries = [],
  industryHrefLabel,
  bannerLead,
  bannerCta,
  bannerHref,
}: {
  articles: ArticleMeta[];
  locale: Locale;
  batch: number;
  moreLabel: string;
  allLabel: string;
  filterLabel: string;
  topics: BlogTopic[];
  /** 업종 진입 칩 — 태그 단위 필터 + 솔루션 허브 크로스링크 (⑤3-2) */
  industries?: BlogIndustryChip[];
  industryHrefLabel?: string;
  /** 인라인 전환 배너 (트랙 O) — 미지정 시 배너 없음 */
  bannerLead?: string;
  bannerCta?: string;
  bannerHref?: string;
}) {
  const [active, setActive] = useState<string>('all'); // 'all' | topic.label
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null); // industry.tag
  const [visible, setVisible] = useState(batch);

  // Keep only topics that actually match at least one article in this feed.
  const liveTopics = useMemo(() => {
    return topics
      .map((t) => ({ ...t, set: new Set(t.tags) }))
      .filter((t) => articles.some((a) => a.tags?.some((tag) => t.set.has(tag))));
  }, [topics, articles]);

  const liveIndustries = useMemo(
    () => industries.filter((ind) => articles.some((a) => a.tags?.includes(ind.tag))),
    [industries, articles],
  );

  const filtered = useMemo(() => {
    if (activeIndustry) return articles.filter((a) => a.tags?.includes(activeIndustry));
    if (active === 'all') return articles;
    const topic = liveTopics.find((t) => t.label === active);
    if (!topic) return articles;
    return articles.filter((a) => a.tags?.some((tag) => topic.set.has(tag)));
  }, [articles, active, activeIndustry, liveTopics]);

  const shown = filtered.slice(0, visible);
  const remaining = filtered.length - shown.length;

  const select = (label: string) => {
    setActive(label);
    setActiveIndustry(null);
    setVisible(batch);
  };

  const selectIndustry = (tag: string) => {
    setActiveIndustry((cur) => (cur === tag ? null : tag));
    setActive('all');
    setVisible(batch);
  };

  const pill = (isActive: boolean) =>
    `px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
      isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`;

  const selectedIndustry = liveIndustries.find((ind) => ind.tag === activeIndustry);
  const bannerExternal = bannerHref?.startsWith('http');

  return (
    <>
      {/* Topic toggles only make sense with more than one live topic. Plain toggle
          buttons (aria-pressed) controlling the grid — not a full ARIA tab widget. */}
      {liveTopics.length > 1 && (
        <div role="group" aria-label={filterLabel} className="flex flex-wrap gap-2 mb-4">
          <button type="button" aria-pressed={active === 'all' && !activeIndustry} aria-controls="blog-grid" onClick={() => select('all')} className={pill(active === 'all' && !activeIndustry)}>
            {allLabel}
          </button>
          {liveTopics.map((t) => (
            <button key={t.label} type="button" aria-pressed={active === t.label && !activeIndustry} aria-controls="blog-grid" onClick={() => select(t.label)} className={pill(active === t.label && !activeIndustry)}>
              {t.label}
            </button>
          ))}
        </div>
      )}

      {/* 업종 진입 칩 (⑤3-2) — 자기 업종 글로 바로 + 해당 솔루션 허브 크로스링크 */}
      {liveIndustries.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {liveIndustries.map((ind) => (
              <button
                key={ind.tag}
                type="button"
                aria-pressed={activeIndustry === ind.tag}
                aria-controls="blog-grid"
                onClick={() => selectIndustry(ind.tag)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  activeIndustry === ind.tag
                    ? 'bg-primary-lighter border-primary/30 text-primary-dark'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                <Store className="w-3 h-3" aria-hidden="true" />
                {ind.label}
              </button>
            ))}
          </div>
          {selectedIndustry && industryHrefLabel && (
            <Link
              href={localeHref(locale, selectedIndustry.href)}
              className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark transition-colors"
            >
              {selectedIndustry.label} {industryHrefLabel}
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          )}
        </div>
      )}

      <div id="blog-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {shown.map((article, i) => (
          <Fragment key={article.slug}>
            {/* 인라인 전환 배너 — BANNER_EVERY개마다 1회 (첫 배치 이후) */}
            {bannerCta && bannerHref && i > 0 && i % BANNER_EVERY === 0 && (
              <div className="col-span-full rounded-2xl border border-primary/15 bg-primary-lighter/40 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-sm font-medium text-gray-700 break-keep">{bannerLead}</p>
                {bannerExternal ? (
                  <a href={bannerHref} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0 inline-flex items-center gap-1.5 text-sm">
                    {bannerCta}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                ) : (
                  <Link href={localeHref(locale, bannerHref)} className="btn-primary shrink-0 inline-flex items-center gap-1.5 text-sm">
                    {bannerCta}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            )}
            <BlogCard article={article} locale={locale} />
          </Fragment>
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
