import { defineConfig, defineCollection, s } from 'velite';

/** Estimate reading time (minutes) from raw MDX — Korean-aware (char-based, ~500/min).
 *  Strips code fences, JSX tags and markdown punctuation before counting. */
function estimateReadTime(body: string): number {
  const text = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[#>*`_~\[\]()!|-]/g, '');
  const chars = text.replace(/\s+/g, '').length;
  return Math.max(1, Math.round(chars / 500));
}

const articles = defineCollection({
  name: 'Article',
  pattern: 'articles/**/*.mdx',
  schema: s
    .object({
      slug: s.string(),
      title: s.string(),
      excerpt: s.string(),
      category: s.enum(['guide', 'case-study', 'insight', 'weekly']),
      date: s.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      // Optional — auto-estimated from the body when omitted (see transform below).
      readTime: s.number().optional(),
      tags: s.array(s.string()).default([]),
      icon: s.string().default('Newspaper'),
      // Cover image — public path (e.g. /images/blog/my-post.webp). Optional.
      // String path (not s.image()) so a future Keystatic image field can populate it.
      cover: s.string().optional(),
      coverAlt: s.string().optional(),
      relatedSlugs: s.array(s.string()).optional(),
      // 신 IA 다국어/분배 (PLAN_v1.1 D2·D6 · CODE_v1 §5.2) — 비파괴적 기본값.
      // lang: 콘텐츠 언어 · target: company(회사 블로그) | saai(saai.store 이관 큐)
      lang: s.enum(['en', 'ko', 'jp']).default('ko'),
      target: s.enum(['company', 'saai']).default('company'),
      // 초안 — true 면 사이트 목록·라우트에서 제외 (articles.ts·article-metadata.ts 필터).
      draft: s.boolean().default(false),
      body: s.raw(),
    })
    .transform((data) => ({
      ...data,
      readTime: data.readTime ?? estimateReadTime(data.body),
    })),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    clean: true,
  },
  collections: { articles },
});
