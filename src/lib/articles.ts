import { articles as allArticlesRaw, type Article as VeliteArticle } from '../../.velite';
import type { Article, ArticleMeta, ArticleCategory } from '@/data/articles/types';

// Compile-time check: Velite output must be assignable to our Article interface
const allArticles: Article[] = allArticlesRaw satisfies VeliteArticle[] as Article[];

// Build-time slug 중복 감지
if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
  const slugs = allArticles.map((a) => a.slug);
  const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  if (dupes.length > 0) {
    console.error(`[articles] Duplicate slugs detected: ${[...new Set(dupes)].join(', ')}`);
  }
}

// 미래 날짜 아티클 필터링 — article-metadata.ts와 동일 기준 (KST)
const kstOffset = 9 * 60 * 60 * 1000;
const todayStr = new Date(Date.now() + kstOffset).toISOString().split('T')[0];

const sortedArticles: Article[] = [...allArticles]
  .filter((a) => a.date <= todayStr && !a.draft)
  .sort((a, b) => b.date.localeCompare(a.date));
const articleBySlug = new Map(sortedArticles.map((a) => [a.slug, a]));

export function getAllArticles(): Article[] {
  return sortedArticles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articleBySlug.get(slug);
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

/** Categories shown on the corporate /resources/blog (excludes weekly + case-study). */
const RESOURCE_BLOG_CATEGORIES: ArticleCategory[] = ['insight', 'guide'];

/**
 * Articles for the corporate blog, scoped to one content language.
 * Each locale's /resources/blog shows only its own `lang` articles — no
 * cross-locale fallback (en/jp are empty until their content is authored).
 */
export function getBlogArticles(lang: 'en' | 'ko' | 'jp'): Article[] {
  return getAllArticles().filter(
    (a) => a.lang === lang && RESOURCE_BLOG_CATEGORIES.includes(a.category),
  );
}

export function getRelatedArticles(article: Article, limit = 3): ArticleMeta[] {
  const explicit = (article.relatedSlugs ?? [])
    .map(getArticleBySlug)
    .filter((a): a is Article => !!a);

  const explicitSlugs = new Set(explicit.map((a) => a.slug));
  const articleTagSet = new Set(article.tags);
  const scored = getAllArticles()
    .filter((a) => a.slug !== article.slug && !explicitSlugs.has(a.slug))
    .map((a) => ({
      article: a,
      score:
        a.tags.filter((t) => articleTagSet.has(t)).length * 2 +
        (a.category === article.category ? 1 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return [...explicit, ...scored.map(({ article }) => article)]
    .slice(0, limit)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ body: _body, ...meta }) => meta as ArticleMeta);
}

export function getAdjacentArticles(article: Article): {
  prev: Article | undefined;
  next: Article | undefined;
} {
  const siblings = getArticlesByCategory(article.category)
    .sort((a, b) => a.date.localeCompare(b.date));
  const idx = siblings.findIndex((a) => a.slug === article.slug);
  return {
    prev: idx > 0 ? siblings[idx - 1] : undefined,
    next: idx < siblings.length - 1 ? siblings[idx + 1] : undefined,
  };
}

function stripBody(a: Article): ArticleMeta {
  const { body: _body, ...meta } = a;
  void _body;
  return meta as ArticleMeta;
}

/**
 * 블로그 상세용 관련 글(F-7) — 같은 로케일 + 블로그 노출 세트(getBlogArticles) 내에서
 * relatedSlugs 우선, 그다음 tag/category 스코어, 부족하면 최신글로 폴백.
 */
export function getRelatedBlogArticles(article: Article, limit = 3): ArticleMeta[] {
  const pool = getBlogArticles(article.lang).filter((a) => a.slug !== article.slug);
  const explicit = (article.relatedSlugs ?? [])
    .map(getArticleBySlug)
    .filter((a): a is Article => !!a && a.lang === article.lang && a.slug !== article.slug);
  const tagSet = new Set(article.tags);
  const scored = pool
    .filter((a) => !explicit.some((e) => e.slug === a.slug))
    .map((a) => ({ a, score: a.tags.filter((t) => tagSet.has(t)).length * 2 + (a.category === article.category ? 1 : 0) }))
    .sort((x, y) => y.score - x.score);
  const related: Article[] = [...explicit, ...scored.filter(({ score }) => score > 0).map(({ a }) => a)];
  // 폴백: 관련 글이 부족하면 같은 세트 최신글로 채움(빈 섹션 방지)
  for (const a of pool) {
    if (related.length >= limit) break;
    if (!related.some((r) => r.slug === a.slug)) related.push(a);
  }
  return related.slice(0, limit).map(stripBody);
}

/** 블로그 상세용 이전/다음(F-7) — 같은 로케일 블로그 노출 세트, 발행일 오름차순. */
export function getAdjacentBlogArticles(article: Article): { prev: ArticleMeta | undefined; next: ArticleMeta | undefined } {
  const siblings = getBlogArticles(article.lang).slice().sort((a, b) => a.date.localeCompare(b.date));
  const idx = siblings.findIndex((a) => a.slug === article.slug);
  return {
    prev: idx > 0 ? stripBody(siblings[idx - 1]) : undefined,
    next: idx >= 0 && idx < siblings.length - 1 ? stripBody(siblings[idx + 1]) : undefined,
  };
}

export type { Article, ArticleCategory } from '@/data/articles/types';
