import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Clock } from 'lucide-react';
import { getArticlesByCategory, getArticleBySlug } from '@/lib/articles';
import { categoryMeta } from '@/data/articles/types';
import ArticleRenderer, { getHeadings } from '@/components/blog/ArticleRenderer';
import ArticleScrollWrapper from '@/components/blog/ArticleScrollWrapper';
import TableOfContents, { MobileTOC } from '@/components/blog/TableOfContents';
import { JsonLd, article as articleJsonLd } from '@/lib/structured-data';

// 기업 블로그에서 노출하는 카테고리(인사이트·가이드)만 정적 생성
const resourceArticles = [
  ...getArticlesByCategory('insight'),
  ...getArticlesByCategory('guide'),
];
const resourceSlugs = new Set(resourceArticles.map((a) => a.slug));

export async function generateStaticParams() {
  return resourceArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || !resourceSlugs.has(slug)) return { title: '글을 찾을 수 없습니다' };

  return {
    title: `${article.title} | DeepingSource 블로그`,
    description: article.excerpt,
    keywords: article.tags,
    alternates: { canonical: `/resources/blog/${slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/resources/blog/${slug}`,
      type: 'article',
      publishedTime: `${article.date}T00:00:00+09:00`,
      tags: article.tags,
    },
  };
}

export default async function ResourcesArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || !resourceSlugs.has(slug)) notFound();

  const meta = categoryMeta[article.category];
  const headings = getHeadings(article.body);

  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLd
        data={articleJsonLd({
          headline: article.title,
          description: article.excerpt,
          path: `/resources/blog/${slug}`,
          locale: 'ko',
          datePublished: `${article.date}T00:00:00+09:00`,
        })}
      />
      <ArticleScrollWrapper />

      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 pt-24 pb-8">
          <Link
            href="/resources/blog"
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
            <p className="text-gray-500 mt-3 leading-relaxed">{article.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Content + TOC */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex gap-10">
          <article id="article-content" className="flex-1 min-w-0 max-w-2xl">
            <MobileTOC headings={headings} />
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

          <TableOfContents headings={headings} />
        </div>
      </div>

      {/* CTA */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 max-w-3xl mx-auto">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">DeepingSource</p>
              <h3 className="text-xl font-bold text-gray-900 mb-2 break-keep">
                프라이버시 AI 도입을 검토 중이라면
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                전문가와의 상담으로 우리 조직에 맞는 도입 전략을 확인하세요.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 shrink-0">
              <Link href="/contact" className="btn-primary gap-2 whitespace-nowrap">
                문의하기
              </Link>
              <Link
                href="/resources/blog"
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
