'use client';

import { Fragment, Suspense, useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen, BarChart3, TrendingUp, Briefcase,
  Search, ArrowUpDown, ChevronLeft, ChevronRight, X,
  ArrowRight, Mail, Store,
} from 'lucide-react';
import { getAllArticlesMeta } from '@/lib/article-metadata';
import NewsletterForm from '@/components/ui/NewsletterForm';
import type { ArticleCategory } from '@/data/articles/types';
import { categoryMeta, blogCategories } from '@/data/articles/types';
import { ArticleCard, FeaturedArticleCard } from '@/components/blog/ArticleCard';
import { useSiteMode } from '@/hooks/useSiteMode';

// 클라이언트 모듈 스코프: 페이지 로드 시 한 번 실행
// weekly 카테고리는 뉴스레터 전용 — 블로그 UI에서 제외
const allArticles = getAllArticlesMeta().filter((a) => blogCategories.includes(a.category));

const PAGE_SIZE = 12;

const tabs: { key: ArticleCategory | 'all'; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'all', label: '전체', icon: BarChart3 },
  { key: 'guide', label: '가이드', icon: BookOpen },
  { key: 'case-study', label: '케이스스터디', icon: Briefcase },
  { key: 'insight', label: '인사이트', icon: TrendingUp },
];

// allArticles가 정적이므로 마운트마다 재계산할 필요 없는 값들을 모듈 스코프에서 한 번 계산
const popularTags: string[] = (() => {
  const freq: Record<string, number> = {};
  allArticles.forEach((a) => a.tags.forEach((t) => { freq[t] = (freq[t] || 0) + 1; }));
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([tag]) => tag);
})();

const featuredArticle = allArticles[0]; // most recent article (already sorted newest-first)

const categoryCounts: Record<string, number> = Object.fromEntries(
  tabs.map((t) => [
    t.key,
    t.key === 'all' ? allArticles.length : allArticles.filter((a) => a.category === t.key).length,
  ])
);

export function BlogSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-[pulse_1.5s_ease-in-out_infinite]">
      <div className="h-64 bg-gray-100 border-b border-gray-200" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-4 mb-10">
          <div className="h-10 w-24 bg-gray-100 rounded-xl" />
          <div className="h-10 w-24 bg-gray-100 rounded-xl" />
          <div className="h-10 w-24 bg-gray-100 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-100 rounded-2xl border border-gray-100" />
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogContent() {
  const searchParams = useSearchParams();
  const initialTag = searchParams.get('tag');
  const siteMode = useSiteMode();
  const isMinisite = siteMode === 'minisite';

  const [activeTab, setActiveTab] = useState<ArticleCategory | 'all'>('all');
  const [activeTag, setActiveTag] = useState<string | null>(initialTag);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // URL의 ?tag= 파라미터 변경 시 상태 동기화
  useEffect(() => {
    setActiveTag(searchParams.get('tag'));
    setCurrentPage(1);
  }, [searchParams]);

  // Debounce search + reset page
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);


  const featured = featuredArticle;

  // Filter + Search + Sort
  const filtered = useMemo(() => {
    let result = allArticles;

    // Category filter
    if (activeTab !== 'all') {
      result = result.filter((a) => a.category === activeTab);
    }

    // Tag filter
    if (activeTag) {
      result = result.filter((a) => a.tags.includes(activeTag));
    }

    // Search
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Exclude featured in 'all' tab when no search/tag active
    if (activeTab === 'all' && !debouncedQuery.trim() && !activeTag && featured) {
      result = result.filter((a) => a.slug !== featured.slug);
    }

    // Sort
    if (sortOrder === 'oldest') {
      result = [...result].sort((a, b) => a.date.localeCompare(b.date));
    }

    return result;
  }, [activeTab, activeTag, debouncedQuery, sortOrder, featured]);

  // Pagination
  const { totalPages, paginated } = useMemo(() => ({
    totalPages: Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)),
    paginated: filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
  }), [filtered, currentPage]);

  const showFeatured = activeTab === 'all' && !debouncedQuery.trim() && !activeTag && featured;

  const handleTabChange = useCallback((key: ArticleCategory | 'all') => {
    setActiveTab(key);
    setActiveTag(null);
    setSearchQuery('');
    setDebouncedQuery('');
    setCurrentPage(1);
  }, []);

  const handleTagChange = useCallback((tag: string | null) => {
    setActiveTag(tag);
    setCurrentPage(1);
  }, []);

  const handleSortToggle = useCallback(() => {
    setSortOrder((p) => (p === 'newest' ? 'oldest' : 'newest'));
    setCurrentPage(1);
  }, []);


  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative bg-white border-b border-gray-100">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-6">
          {/* Compact header + search row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                매장 운영 콘텐츠
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {allArticles.length}개의 아티클 · 매주 업데이트
              </p>
            </div>
            <div className="relative group w-full sm:w-72">
              <div className="absolute left-3 top-0 bottom-0 flex items-center pointer-events-none" aria-hidden="true">
                <Search className="w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="블로그 검색"
                placeholder="제목, 태그로 검색..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-500 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/10 transition-shadow"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="검색어 지우기"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-600 cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Industry Disclaimer — 미니사이트는 편의점 전용이므로 숨김 */}
          {!isMinisite && (
            <div className="mt-4 flex items-start gap-2 px-3 py-2.5 bg-amber-50 border border-amber-100 rounded-lg">
              <Store className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                <span className="font-medium">매장 운영 기준</span> 콘텐츠입니다. 업종·매장 환경에 따라 세부 내용이 다를 수 있습니다.
                다른 업종의 인사이트는 <Link href="/industries" className="underline underline-offset-2 hover:text-amber-900 transition-colors">업종별 솔루션</Link>에서 확인하세요.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Category Tabs (sticky) ── */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div role="tablist" className="flex gap-0 overflow-x-auto -mx-1 flex-1 no-scrollbar" aria-label="카테고리 필터">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    onClick={() => handleTabChange(tab.key)}
                    onKeyDown={(e) => {
                      const idx = tabs.indexOf(tab);
                      if (e.key === 'ArrowRight') {
                        e.preventDefault();
                        const next = (idx + 1) % tabs.length;
                        handleTabChange(tabs[next].key);
                        (e.currentTarget.parentElement?.children[next] as HTMLElement)?.focus();
                      } else if (e.key === 'ArrowLeft') {
                        e.preventDefault();
                        const prev = (idx - 1 + tabs.length) % tabs.length;
                        handleTabChange(tabs[prev].key);
                        (e.currentTarget.parentElement?.children[prev] as HTMLElement)?.focus();
                      }
                    }}
                    className={`relative px-4 py-3.5 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${isActive
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                      }`}
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                  >
                    <span className="flex items-center gap-1.5">
                      {tab.label}
                      <span className={`text-xs tabular-nums ${isActive ? 'text-primary font-bold' : 'text-gray-500'}`}>
                        {categoryCounts[tab.key]}
                      </span>
                    </span>
                    {/* Active underline indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Sort Toggle */}
            <button
              type="button"
              onClick={handleSortToggle}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors shrink-0 ml-2 cursor-pointer"
              aria-label={sortOrder === 'newest' ? '오래된순으로 정렬' : '최신순으로 정렬'}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{sortOrder === 'newest' ? '최신순' : '오래된순'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Tag Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {activeTag && (
            <button
              type="button"
              onClick={() => handleTagChange(null)}
              className="text-xs text-primary hover:text-primary-dark transition-colors flex items-center gap-1 pr-2 border-r border-gray-200 mr-1 cursor-pointer"
            >
              <X className="w-3 h-3" />
              필터 해제
            </button>
          )}
          {popularTags.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => handleTagChange(activeTag === tag ? null : tag)}
              className={`text-xs px-3 py-2 sm:py-1 rounded-lg cursor-pointer transition-colors ${activeTag === tag
                ? 'bg-primary text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Result Info Bar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <p className="text-sm text-gray-500">
            {debouncedQuery.trim() || activeTag
              ? <><strong className="text-gray-900 font-medium">{filtered.length}개</strong> 결과</>
              : <><strong className="text-gray-900 font-medium">{allArticles.length}개</strong>의 아티클</>}
          </p>
        </div>

        {/* Featured Article */}
        {showFeatured && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Latest Articles</span>
            </div>
            <FeaturedArticleCard article={featured} />
          </div>
        )}

        {/* Article Grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginated.map((article, i) => (
              <Fragment key={article.slug}>
                <ArticleCard article={article} />
                {/* Inline CTA Banner after the 5th card (index 4) */}
                {i === 4 && (
                  <div className="col-span-full bg-primary rounded-xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                        <Mail className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">
                          {isMinisite ? '매주 이런 인사이트를 이메일로' : 'AI 도입, 어디서부터 시작할까요?'}
                        </h3>
                        <p className="text-sm text-blue-100 leading-relaxed">
                          {isMinisite
                            ? '편의점 운영에 바로 쓸 수 있는 브리핑을 무료로 받아보세요.'
                            : '우리 매장에 맞는 솔루션을 전문가에게 직접 물어보세요. 무료입니다.'}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={isMinisite ? '/newsletter' : '/contact'}
                      className="shrink-0 bg-white text-primary text-sm font-bold py-3 px-7 rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap"
                    >
                      {isMinisite ? '뉴스레터 구독 →' : '무료 상담 신청 →'}
                    </Link>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-gray-300" />
            </div>
            <p className="text-gray-900 font-medium mb-1">검색 결과가 없습니다</p>
            <p className="text-sm text-gray-500">다른 키워드나 카테고리를 선택해 보세요.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="flex items-center justify-center gap-1 mt-12" aria-label="페이지 탐색">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="이전 페이지"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {(() => {
              const pages: (number | 'ellipsis')[] = [];
              if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
              } else {
                pages.push(1);
                if (currentPage > 3) pages.push('ellipsis');
                const start = Math.max(2, currentPage - 1);
                const end = Math.min(totalPages - 1, currentPage + 1);
                for (let i = start; i <= end; i++) pages.push(i);
                if (currentPage < totalPages - 2) pages.push('ellipsis');
                pages.push(totalPages);
              }
              return pages.map((page, idx) =>
                page === 'ellipsis' ? (
                  <span key={`ellipsis-${idx}`} className="w-11 h-11 flex items-center justify-center text-sm text-gray-500">
                    &hellip;
                  </span>
                ) : (
                  <button
                    type="button"
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-11 h-11 rounded-lg text-sm font-medium cursor-pointer transition-colors ${currentPage === page
                      ? 'bg-primary text-white'
                      : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                )
              );
            })()}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-lg text-gray-500 hover:bg-gray-50 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="다음 페이지"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>
        )}
      </div>

      {/* ── Newsletter CTA ── */}
      <section className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
              매주 인사이트를 이메일로 받아보세요
            </h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              무료 뉴스레터로 시작하세요. 매주 발행되는 운영 전략과 데이터 분석을
              가장 먼저 확인할 수 있습니다.
            </p>
            <div className="max-w-md mx-auto mb-4">
              <NewsletterForm />
            </div>
            <Link
              href={isMinisite ? '/sample' : '/storeagent/sample'}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-primary transition-colors px-4 py-2"
            >
              7일 브리핑 미리보기
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BlogPageContent() {
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogContent />
    </Suspense>
  );
}
