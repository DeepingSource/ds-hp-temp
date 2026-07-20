import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import type { Article } from '@/data/articles/types';
import { categoryMeta, categoryLabelI18n } from '@/data/articles/types';
import ArticleRenderer, { getHeadings } from '@/components/blog/ArticleRenderer';
import ArticleScrollWrapper from '@/components/blog/ArticleScrollWrapper';
import TableOfContents, { MobileTOC } from '@/components/blog/TableOfContents';
import { JsonLd, article as articleJsonLd } from '@/lib/structured-data';
import { localeHref, type Locale } from '@/lib/i18n';
import { getRelatedBlogArticles, getAdjacentBlogArticles } from '@/lib/articles';

/**
 * BlogArticleView — locale-scoped corporate blog article body.
 * The route resolves the article (404 on miss / lang mismatch) and passes it in.
 */

const C: Record<Locale, {
  backToList: string;
  readTime: (n: number) => string;
  ctaHeading: string;
  ctaSub: string;
  contactCta: string;
  moreArticles: string;
  relatedHeading: string;
  prevLabel: string;
  nextLabel: string;
}> = {
  ko: {
    backToList: '목록으로',
    readTime: (n) => `${n}분`,
    ctaHeading: '프라이버시 AI 도입을 검토 중이라면',
    ctaSub: '전문가와의 상담으로 우리 조직에 맞는 도입 전략을 확인하세요.',
    contactCta: '문의하기',
    moreArticles: '다른 글 더 보기',
    relatedHeading: '관련 글',
    prevLabel: '이전 글',
    nextLabel: '다음 글',
  },
  en: {
    backToList: 'Back to blog',
    readTime: (n) => `${n} min`,
    ctaHeading: 'Considering privacy AI?',
    ctaSub: 'Talk to our team to find the right rollout strategy for your organization.',
    contactCta: 'Contact us',
    moreArticles: 'See more articles',
    relatedHeading: 'Related articles',
    prevLabel: 'Previous',
    nextLabel: 'Next',
  },
  jp: {
    backToList: 'ブログ一覧へ',
    readTime: (n) => `${n}分`,
    ctaHeading: 'プライバシーAIの導入をご検討中なら',
    ctaSub: '専門家との相談で、貴社に合った導入戦略をご確認ください。',
    contactCta: 'お問い合わせ',
    moreArticles: '他の記事を見る',
    relatedHeading: '関連記事',
    prevLabel: '前の記事',
    nextLabel: '次の記事',
  },
};

export default function BlogArticleView({ locale, article }: { locale: Locale; article: Article }) {
  const t = C[locale];
  const meta = categoryMeta[article.category];
  const label = categoryLabelI18n[locale][article.category];
  const headings = getHeadings(article.body);
  const blogHref = localeHref(locale, '/resources/blog');
  const related = getRelatedBlogArticles(article, 3);
  const adj = getAdjacentBlogArticles(article);

  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLd
        data={articleJsonLd({
          headline: article.title,
          description: article.excerpt,
          path: `/resources/blog/${article.slug}`,
          locale,
          datePublished: `${article.date}T00:00:00+09:00`,
        })}
      />
      <ArticleScrollWrapper />

      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 pt-24 pb-8">
          <Link
            href={blogHref}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToList}
          </Link>

          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${meta.bgColor} ${meta.color}`}>
                {label}
              </span>
              <span className="text-sm text-gray-500">{article.date}</span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {t.readTime(article.readTime)}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {article.title}
            </h1>
            <p className="text-gray-500 mt-3 leading-relaxed">{article.excerpt}</p>

            {article.cover && (
              <div className="relative mt-6 aspect-[2/1] w-full overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src={article.cover}
                  alt={article.coverAlt ?? article.title}
                  fill
                  priority
                  sizes="(min-width: 768px) 42rem, 100vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content + TOC */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex gap-10">
          <article id="article-content" className="flex-1 min-w-0 max-w-2xl">
            <MobileTOC headings={headings} locale={locale} />
            <ArticleRenderer body={article.body} />

            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gray-100">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>

          <TableOfContents headings={headings} locale={locale} />
        </div>
      </div>

      {/* 관련 글 + 이전/다음 (F-7) */}
      {(related.length > 0 || adj.prev || adj.next) && (
        <section className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 py-12">
            {related.length > 0 && (
              <>
                <h2 className="text-lg font-bold text-gray-900 mb-5">{t.relatedHeading}</h2>
                <div className="grid gap-4 sm:grid-cols-3 mb-10">
                  {related.map((a) => (
                    <Link
                      key={a.slug}
                      href={localeHref(locale, `/resources/blog/${a.slug}`)}
                      className="group flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-5 no-underline transition-[border-color,box-shadow] hover:border-primary-light hover:shadow-card"
                    >
                      <span className="text-2xs font-bold uppercase tracking-wide text-primary">{categoryLabelI18n[locale][a.category]}</span>
                      <h3 className="text-sm font-bold leading-snug text-gray-900 line-clamp-2 break-keep transition-colors group-hover:text-primary">{a.title}</h3>
                      <p className="text-xs leading-relaxed text-gray-500 line-clamp-2 break-keep">{a.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </>
            )}
            {(adj.prev || adj.next) && (
              <nav className="flex items-stretch justify-between gap-4 border-t border-gray-200 pt-6" aria-label={t.relatedHeading}>
                {adj.prev ? (
                  <Link href={localeHref(locale, `/resources/blog/${adj.prev.slug}`)} className="group min-w-0 flex-1 no-underline">
                    <span className="flex items-center gap-1 text-2xs font-medium text-gray-400"><ArrowLeft className="h-3 w-3" aria-hidden="true" />{t.prevLabel}</span>
                    <span className="mt-1 block text-sm font-medium text-gray-800 line-clamp-1 break-keep transition-colors group-hover:text-primary">{adj.prev.title}</span>
                  </Link>
                ) : (
                  <span className="flex-1" />
                )}
                {adj.next ? (
                  <Link href={localeHref(locale, `/resources/blog/${adj.next.slug}`)} className="group min-w-0 flex-1 text-right no-underline">
                    <span className="flex items-center justify-end gap-1 text-2xs font-medium text-gray-400">{t.nextLabel}<ArrowRight className="h-3 w-3" aria-hidden="true" /></span>
                    <span className="mt-1 block text-sm font-medium text-gray-800 line-clamp-1 break-keep transition-colors group-hover:text-primary">{adj.next.title}</span>
                  </Link>
                ) : (
                  <span className="flex-1" />
                )}
              </nav>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 max-w-3xl mx-auto">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">DeepingSource</p>
              <h3 className="text-xl font-bold text-gray-900 mb-2 break-keep">
                {t.ctaHeading}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t.ctaSub}
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 shrink-0">
              <Link href={localeHref(locale, '/contact')} className="btn-primary gap-2 whitespace-nowrap">
                {t.contactCta}
              </Link>
              <Link
                href={blogHref}
                className="text-sm text-gray-500 hover:text-primary transition-colors"
              >
                {t.moreArticles}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
