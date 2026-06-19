import { articles as allArticlesRaw } from '../../.velite';
import type { ArticleMeta } from '@/data/articles/types';

// Strip body field for client-side usage (body is not serializable for 'use client')
const allMeta: ArticleMeta[] = allArticlesRaw.map(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ body, ...meta }) => meta as ArticleMeta
);

const kstOffset = 9 * 60 * 60 * 1000;
const todayStr = new Date(Date.now() + kstOffset).toISOString().split('T')[0];
const cachedMeta: ArticleMeta[] = [...allMeta]
  .filter((a) => a.date <= todayStr)
  .sort((a, b) => b.date.localeCompare(a.date));

export function getAllArticlesMeta(): ArticleMeta[] {
  return cachedMeta;
}

export type { ArticleMeta, ArticleCategory } from '@/data/articles/types';
