import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getArticleBySlug, getBlogArticles } from '@/lib/articles';
import BlogIndexView from './BlogIndexView';
import BlogArticleView from './BlogArticleView';
import { localePrefix, type Locale } from '@/lib/i18n';

/**
 * Shared route helpers for the locale-scoped corporate blog. Each locale's
 * route files (en at /resources/blog, ko at /ko/..., jp at /jp/...) delegate
 * generateStaticParams / generateMetadata / render here, scoped by `lang`.
 */

type Params = Promise<{ slug: string }>;

const TITLE_SUFFIX: Record<Locale, string> = {
  ko: 'DEEPINGSOURCE 블로그',
  en: 'DEEPINGSOURCE Blog',
  jp: 'DEEPINGSOURCE ブログ',
};

const NOT_FOUND_TITLE: Record<Locale, string> = {
  ko: '글을 찾을 수 없습니다',
  en: 'Article not found',
  jp: '記事が見つかりません',
};

const INDEX_META: Record<Locale, { title: string; description: string; ogDescription: string }> = {
  ko: {
    title: '블로그 | DeepingSource',
    description:
      '프라이버시 AI, 영상 익명화, 공간 데이터 분석에 대한 DeepingSource의 인사이트와 실무 가이드를 확인하세요.',
    ogDescription: '프라이버시 AI와 영상 익명화에 대한 인사이트와 실무 가이드.',
  },
  en: {
    title: 'Blog | DeepingSource',
    description:
      'Insights and hands-on guides from DeepingSource on privacy AI, video anonymization, and spatial data analytics.',
    ogDescription: 'Insights and hands-on guides on privacy AI and video anonymization.',
  },
  jp: {
    title: 'ブログ | DeepingSource',
    description:
      'プライバシーAI、映像の匿名化、空間データ分析に関する DeepingSource のインサイトと実務ガイド。',
    ogDescription: 'プライバシーAIと映像の匿名化に関するインサイトと実務ガイド。',
  },
};

function indexPath(locale: Locale): string {
  return `${localePrefix(locale)}/resources/blog`;
}

export function blogIndexMetadata(locale: Locale): Metadata {
  const m = INDEX_META[locale];
  const url = indexPath(locale);
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: {
        en: '/resources/blog',
        ko: '/ko/resources/blog',
        ja: '/jp/resources/blog',
      },
    },
    openGraph: { title: m.title, description: m.ogDescription, url },
  };
}

export function BlogIndexPage(locale: Locale) {
  return <BlogIndexView locale={locale} />;
}

export function blogStaticParams(locale: Locale): { slug: string }[] {
  const params = getBlogArticles(locale).map((a) => ({ slug: a.slug }));
  // `output: export` rejects an empty generateStaticParams() ("missing …").
  // Locales with no articles yet (en/jp) emit a sentinel slug that 404s.
  return params.length > 0 ? params : [{ slug: '__none__' }];
}

/** Resolve a slug to an article that belongs to this locale's corporate blog. */
function resolveArticle(locale: Locale, slug: string) {
  const article = getArticleBySlug(slug);
  if (
    !article ||
    article.lang !== locale ||
    !(article.category === 'insight' || article.category === 'guide')
  ) {
    return undefined;
  }
  return article;
}

export async function blogArticleMetadata(locale: Locale, params: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = resolveArticle(locale, slug);
  if (!article) return { title: NOT_FOUND_TITLE[locale] };

  const path = `${localePrefix(locale)}/resources/blog/${slug}`;
  return {
    title: `${article.title} | ${TITLE_SUFFIX[locale]}`,
    description: article.excerpt,
    keywords: article.tags,
    alternates: { canonical: path },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: path,
      type: 'article',
      publishedTime: `${article.date}T00:00:00+09:00`,
      tags: article.tags,
    },
  };
}

export async function BlogArticlePage(locale: Locale, params: Params) {
  const { slug } = await params;
  const article = resolveArticle(locale, slug);
  if (!article) notFound();
  return <BlogArticleView locale={locale} article={article} />;
}
