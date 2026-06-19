import { defineConfig, defineCollection, s } from 'velite';

const articles = defineCollection({
  name: 'Article',
  pattern: 'articles/**/*.mdx',
  schema: s.object({
    slug: s.string(),
    title: s.string(),
    excerpt: s.string(),
    category: s.enum(['guide', 'case-study', 'insight', 'weekly']),
    date: s.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    readTime: s.number(),
    tags: s.array(s.string()).default([]),
    icon: s.string().default('Newspaper'),
    relatedSlugs: s.array(s.string()).optional(),
    // 신 IA 다국어/분배 (PLAN_v1.1 D2·D6 · CODE_v1 §5.2) — 비파괴적 기본값.
    // lang: 콘텐츠 언어 · target: company(회사 블로그) | saai(saai.store 이관 큐)
    lang: s.enum(['en', 'ko', 'jp']).default('ko'),
    target: s.enum(['company', 'saai']).default('company'),
    body: s.raw(),
  }),
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
