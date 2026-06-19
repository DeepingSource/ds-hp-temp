import type { MetadataRoute } from 'next';
import { getAllArticlesMeta } from '@/lib/article-metadata';

const BASE_URL = 'https://agent.saai.store';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/newsletter`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/sample`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  const articlePages: MetadataRoute.Sitemap = getAllArticlesMeta().map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages];
}
