import { getBlogArticles } from '@/lib/articles';
import type { ArticleMeta } from '@/lib/article-metadata';
import AnimatedSection from '@/components/ui/AnimatedSection';
import BlogFilterList, { type BlogTopic } from './BlogFilterList';
import { type Locale } from '@/lib/i18n';

/**
 * Curated topic filters — the published feed is single-category (insight), so we group
 * the freeform tags into a few meaningful themes. Each topic matches an article if any of
 * its tags is in the set; only topics with matches render (see BlogFilterList). Blog is
 * ko-primary today; en/jp stay empty until authored (topics can be added when they are).
 */
const TOPICS: Record<Locale, BlogTopic[]> = {
  ko: [
    { label: '데이터 분석', tags: ['데이터분석', '데이터', '고객분석', '동선분석', '분석', '히트맵', '체류'] },
    { label: '매출 · 수익', tags: ['매출', '수익', '객단가', '구매전환', '전환'] },
    { label: '매장 운영', tags: ['매장운영', '발주', '재고', '인력', '청소', '운영', '무인매장'] },
    { label: '마케팅', tags: ['프로모션', '마케팅', '이벤트', '광고', '진열', 'VMD'] },
    { label: '트렌드 · 시장', tags: ['트렌드', 'Trend', '시장분석', '시장', '시즌'] },
    { label: '업종', tags: ['편의점', '드럭스토어', '카페', '대형마트', '물류', '패션', '전시'] },
  ],
  en: [
    { label: 'Product', tags: ['Product', 'saai agent', 'store count', 'saai insight', 'saai care', 'AI agent'] },
    { label: 'Technology', tags: ['Tech', 'Technology', 'anonymization', 'privacy'] },
    { label: 'Trends', tags: ['Trend', 'Trends', 'trade-area analytics'] },
    { label: 'Operations', tags: ['store operations', 'capture rate', 'inventory', 'staffing'] },
    { label: 'Company', tags: ['Company'] },
  ],
  jp: [], // only 2 published jp articles today — a filter would be hidden by the guard anyway
};

/**
 * BlogIndexView — locale-scoped corporate blog index.
 * Each locale renders only its own `lang` articles (no cross-locale fallback);
 * en/jp show an empty "coming soon" state until their content is authored.
 *
 * The hero is server-rendered; the card grid is a client island (BlogFilterList) because
 * topic filtering runs in the browser. All article metadata (body stripped) is passed as
 * props and paginated client-side (PAGE_SIZE at a time) with no network round-trips.
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
    filter: '주제 필터',
  },
  en: {
    eyebrow: 'Blog',
    heading: 'Insights & Guides',
    sub: (n) => `${n} articles on privacy AI, video anonymization, and spatial data.`,
    emptyTitle: 'Content is on the way',
    emptyBody: 'New insights and guides are coming soon.',
    more: 'Load more',
    all: 'All',
    filter: 'Filter by topic',
  },
  jp: {
    eyebrow: 'Blog',
    heading: 'インサイト＆ガイド',
    sub: (n) => `プライバシーAI・映像の匿名化・空間データ分析に関する${n}件の記事。`,
    emptyTitle: 'コンテンツを準備中です',
    emptyBody: '新しいインサイトとガイドをまもなくお届けします。',
    more: 'もっと見る',
    all: 'すべて',
    filter: 'トピックで絞り込み',
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
              topics={TOPICS[locale]}
            />
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
