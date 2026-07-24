import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getBlogArticles } from '@/lib/articles';
import type { ArticleMeta } from '@/lib/article-metadata';
import AnimatedSection from '@/components/ui/AnimatedSection';
import BlogFilterList, { type BlogTopic, type BlogIndustryChip } from './BlogFilterList';
import { localeHref, type Locale } from '@/lib/i18n';
import { ownerCta } from '@/lib/brand-canon';
import { OWNER_START_URL } from '@/lib/cta-canon';

/** BlogCard와 동일 표기(MM/DD) — 공용 헬퍼가 없어 로컬 유지 */
function formatDate(dateStr: string): string {
  const [, month, day] = dateStr.split('-');
  return `${month}/${day}`;
}

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
  ],
  en: [
    { label: 'Product', tags: ['Product', 'saai agent', 'saai count', 'saai insight', 'saai care', 'AI agent'] },
    { label: 'Technology', tags: ['Tech', 'Technology', 'anonymization', 'privacy'] },
    { label: 'Trends', tags: ['Trend', 'Trends', 'trade-area analytics'] },
    { label: 'Operations', tags: ['store operations', 'capture rate', 'inventory', 'staffing'] },
    { label: 'Company', tags: ['Company'] },
  ],
  jp: [], // only 2 published jp articles today — a filter would be hidden by the guard anyway
};

/** 업종 진입 칩(⑤3-2) — '업종' 주제를 칩으로 분해: 태그 필터 + 해당 솔루션 허브 크로스링크. */
const INDUSTRIES: Record<Locale, BlogIndustryChip[]> = {
  ko: [
    { label: '편의점', tag: '편의점', href: '/solutions/retail' },
    { label: '드럭스토어', tag: '드럭스토어', href: '/solutions/drug-store' },
    { label: '카페', tag: '카페', href: '/solutions/food-beverage' },
    { label: '대형마트', tag: '대형마트', href: '/solutions#industry-mart' },
  ],
  en: [],
  jp: [],
};

/**
 * BlogIndexView — locale-scoped corporate blog index.
 * Each locale renders only its own `lang` articles (no cross-locale fallback);
 * en/jp show an empty "coming soon" state until their content is authored.
 *
 * The hero is server-rendered; the card grid is a client island (BlogFilterList) because
 * topic filtering runs in the browser. All article metadata (body stripped) is passed as
 * props and paginated client-side (PAGE_SIZE at a time) with no network round-trips.
 *
 * ⑤3-2: Featured 1건(최상단 가로형 대형 카드) + 업종 칩 + 트랙 O 전환 훅(인라인 배너·하단 밴드).
 * featured 글이 없으면 기존 그리드로 폴백(en/jp 가드).
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
  featuredLabel: string;
  featuredRead: string;
  industryHrefLabel: string;
  bannerLead: string;
  bandHeading: string;
  bandSub: string;
}> = {
  ko: {
    eyebrow: '블로그',
    heading: '인사이트 & 가이드',
    sub: (n) => `프라이버시 AI, 영상 익명화, 공간 데이터 분석에 대한 ${n}개의 아티클.`,
    emptyTitle: '콘텐츠를 준비하고 있습니다',
    emptyBody: '곧 새로운 인사이트와 가이드로 찾아뵙겠습니다.',
    more: '더 보기',
    all: '전체',
    filter: '주제 필터',
    featuredLabel: '추천 글',
    featuredRead: '읽어 보기',
    industryHrefLabel: '솔루션 보기',
    bannerLead: '읽는 데서 멈추지 마세요 — 내 매장에서 바로 시작할 수 있습니다.',
    bandHeading: '매장 운영, 읽는 데서 시작해 실행으로.',
    bandSub: '설치 없이 앱으로 시작합니다. 오늘 매장에 적용해 보세요.',
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
    featuredLabel: 'Featured',
    featuredRead: 'Read the article',
    industryHrefLabel: 'solutions',
    bannerLead: 'Don’t stop at reading — you can start in your own store today.',
    bandHeading: 'From reading to running your store.',
    bandSub: 'Start in the app, no installation. Try it in your store today.',
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
    featuredLabel: 'おすすめ記事',
    featuredRead: '記事を読む',
    industryHrefLabel: 'ソリューションを見る',
    bannerLead: '読むだけで終わらせない — 自分の店舗で今日から始められます。',
    bandHeading: '店舗運営を、読むことから実行へ。',
    bandSub: '設置なし、アプリで開始。今日から店舗で試してみてください。',
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

  // Featured 1건 — 편집 선정(featured: true), 여러 개면 최신(정렬 유지) 1건.
  const featured = articles.find((a) => a.featured);
  const gridArticles = featured ? articles.filter((a) => a.slug !== featured.slug) : articles;

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
            <>
              {/* Featured — 최상단 가로형 대형 카드 (⑤3-2a) */}
              {featured && (
                <Link
                  href={localeHref(locale, `/resources/blog/${featured.slug}`)}
                  className="group block mb-10 rounded-3xl border border-gray-200 bg-gray-50 hover:border-primary-light transition-colors overflow-hidden"
                >
                  <div className="p-7 sm:p-9">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">
                        <Sparkles className="w-3 h-3" aria-hidden="true" />
                        {t.featuredLabel}
                      </span>
                      <span className="text-xs text-gray-500">{formatDate(featured.date)}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep group-hover:text-primary-dark transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed break-keep max-w-3xl line-clamp-3 mb-5">
                      {featured.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                      {t.featuredRead}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              )}

              <BlogFilterList
                articles={gridArticles}
                locale={locale}
                batch={PAGE_SIZE}
                moreLabel={t.more}
                allLabel={t.all}
                filterLabel={t.filter}
                topics={TOPICS[locale]}
                industries={INDUSTRIES[locale]}
                industryHrefLabel={t.industryHrefLabel}
                bannerLead={t.bannerLead}
                bannerCta={ownerCta[locale]}
                bannerHref={OWNER_START_URL}
              />

              {/* 하단 트랙 O 전환 밴드 (⑤3-2c) — 블로그는 점주 관문, dead-end 금지 */}
              <div className="mt-16 rounded-3xl bg-surface-dark noise-overlay px-7 py-10 sm:px-10 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 break-keep">{t.bandHeading}</h2>
                <p className="text-slate-300 mb-7 break-keep">{t.bandSub}</p>
                <a
                  href={OWNER_START_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-lg inline-flex items-center gap-2"
                >
                  {ownerCta[locale]}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
