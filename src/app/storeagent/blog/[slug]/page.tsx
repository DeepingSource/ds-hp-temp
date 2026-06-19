import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { getAllArticles, getArticleBySlug, getRelatedArticles, getAdjacentArticles } from '@/lib/articles';
import { categoryMeta } from '@/data/articles/types';
import ArticleRenderer, { getHeadings } from '@/components/blog/ArticleRenderer';
import { ArticleCard } from '@/components/blog/ArticleCard';
import ArticleScrollWrapper from '@/components/blog/ArticleScrollWrapper';
import TableOfContents, { MobileTOC } from '@/components/blog/TableOfContents';

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: '글을 찾을 수 없습니다' };

  return {
    title: `${article.title} | StoreAgent 인사이트`,
    description: article.excerpt,
    keywords: article.tags,
    alternates: {
      canonical: `/storeagent/blog/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/storeagent/blog/${slug}`,
      type: 'article',
      publishedTime: `${article.date}T00:00:00+09:00`,
      tags: article.tags,
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const meta = categoryMeta[article.category];
  const related = getRelatedArticles(article, 3);
  const { prev, next } = getAdjacentArticles(article);
  const headings = getHeadings(article.body);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: `${article.date}T00:00:00+09:00`,
    dateModified: `${article.date}T00:00:00+09:00`,
    keywords: article.tags.join(', '),
    url: `https://storeagent.kr/storeagent/blog/${slug}`,
    author: { '@type': 'Organization', name: 'DeepingSource Inc.', url: 'https://storeagent.kr' },
    publisher: { '@type': 'Organization', name: 'SAAI', url: 'https://storeagent.kr' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://storeagent.kr/storeagent/blog/${slug}` },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }} />
      <ArticleScrollWrapper />

      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 pt-24 pb-8">
          <Link
            href="/storeagent/blog"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            목록으로
          </Link>

          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${meta.bgColor} ${meta.color}`}>
                {meta.label}
              </span>
              <span className="text-sm text-gray-500">{article.date}</span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}분
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {article.title}
            </h1>
            <p className="text-gray-500 mt-3 leading-relaxed">
              {article.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Content + TOC */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex gap-10">
          {/* Article Content */}
          <article id="article-content" className="flex-1 min-w-0 max-w-2xl">
            <MobileTOC headings={headings} />
            <ArticleRenderer body={article.body} />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gray-100">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/storeagent/blog?tag=${encodeURIComponent(tag)}`}
                  className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </article>

          {/* TOC Sidebar */}
          <TableOfContents headings={headings} />
        </div>
      </div>

      {/* Prev / Next Navigation */}
      {(prev || next) && (
        <div className="max-w-5xl mx-auto px-4 pb-6">
          <div className="flex items-stretch gap-4">
            {prev ? (
              <Link
                href={`/storeagent/blog/${prev.slug}`}
                className="flex-1 group flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white hover:border-primary/30 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-gray-300 group-hover:text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 mb-0.5">이전 글</p>
                  <p className="text-sm font-medium text-gray-700 group-hover:text-primary truncate">{prev.title}</p>
                </div>
              </Link>
            ) : <div className="flex-1" />}
            {next ? (
              <Link
                href={`/storeagent/blog/${next.slug}`}
                className="flex-1 group flex items-center justify-end gap-3 p-4 rounded-xl border border-gray-100 bg-white hover:border-primary/30 transition-colors text-right"
              >
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 mb-0.5">다음 글</p>
                  <p className="text-sm font-medium text-gray-700 group-hover:text-primary truncate">{next.title}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary shrink-0" />
              </Link>
            ) : <div className="flex-1" />}
          </div>
        </div>
      )}

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 pb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">함께 읽으면 좋은 글</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 max-w-3xl mx-auto">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">AI 매장 관리 솔루션</p>
              <h3 className="text-xl font-bold text-gray-900 mb-2 break-keep">
                읽는 것을 직접 실행해볼 준비가 됐다면
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                전문가와 30분 무료 상담으로 우리 매장에 맞는 AI 도입 전략을 확인하세요.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="btn-primary gap-2 whitespace-nowrap"
              >
                무료 상담 신청
              </Link>
              <Link
                href="/storeagent/blog"
                className="text-sm text-gray-500 hover:text-primary transition-colors"
              >
                다른 글 더 보기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
