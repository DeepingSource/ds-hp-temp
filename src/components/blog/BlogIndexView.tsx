import { getBlogArticles } from '@/lib/articles';
import type { ArticleMeta } from '@/lib/article-metadata';
import AnimatedSection from '@/components/ui/AnimatedSection';
import BlogFilterList from './BlogFilterList';
import { type Locale } from '@/lib/i18n';

/**
 * BlogIndexView — locale-scoped corporate blog index.
 * Each locale renders only its own `lang` articles (no cross-locale fallback);
 * en/jp show an empty "coming soon" state until their content is authored.
 *
 * Perf (P1-1): the first PAGE_SIZE cards render on the server (small initial DOM →
 * fast LCP while the page stays statically served); the rest are handed to a client
 * "load more" island that reveals them in batches on click, with no network round-trips.
 */

const PAGE_SIZE = 18;

const C: Record<Locale, {
  eyebrow: string;
  heading: string;
  sub: (n: number) => string;
  emptyTitle: string;
  emptyBody: string;
  more: string;
  all: string;
  filter: string;
}> = {
  ko: {
    eyebrow: 'Blog',
    heading: '인사이트 & 가이드',
    sub: (n) => `프라이버시 AI, 영상 익명화, 공간 데이터 분석에 대한 ${n}개의 아티클.`,
    emptyTitle: '콘텐츠를 준비하고 있습니다',
    emptyBody: '곧 새로운 인사이트와 가이드로 찾아뵙겠습니다.',
    more: '더 보기',
    all: '전체',
    filter: '카테고리 필터',
  },
  en: {
    eyebrow: 'Blog',
    heading: 'Insights & Guides',
    sub: (n) => `${n} articles on privacy AI, video anonymization, and spatial data.`,
    emptyTitle: 'Content is on the way',
    emptyBody: 'New insights and guides are coming soon.',
    more: 'Load more',
    all: 'All',
    filter: 'Filter by category',
  },
  jp: {
    eyebrow: 'Blog',
    heading: 'インサイト＆ガイド',
    sub: (n) => `プライバシーAI・映像の匿名化・空間データ分析に関する${n}件の記事。`,
    emptyTitle: 'コンテンツを準備中です',
    emptyBody: '新しいインサイトとガイドをまもなくお届けします。',
    more: 'もっと見る',
    all: 'すべて',
    filter: 'カテゴリで絞り込み',
  },
};

export default function BlogIndexView({ locale }: { locale: Locale }) {
  const t = C[locale];
  // List only needs metadata; strip the (non-serializable) MDX body so the rest can be
  // passed to the client island.
  const articles = getBlogArticles(locale).map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ body, ...meta }) => meta as ArticleMeta,
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-white border-b border-gray-100">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-8">
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.eyebrow}</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            {t.heading}
          </h1>
          <p className="text-gray-500 leading-relaxed max-w-2xl break-keep">
            {t.sub(articles.length)}
          </p>
        </div>
      </section>

      {/* Grid / empty state */}
      <AnimatedSection className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {articles.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16">
              <h2 className="text-lg font-bold text-gray-900 mb-2 break-keep">{t.emptyTitle}</h2>
              <p className="text-sm text-gray-500 leading-relaxed break-keep">{t.emptyBody}</p>
            </div>
          ) : (
            <BlogFilterList
              articles={articles}
              locale={locale}
              batch={PAGE_SIZE}
              moreLabel={t.more}
              allLabel={t.all}
              filterLabel={t.filter}
            />
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
