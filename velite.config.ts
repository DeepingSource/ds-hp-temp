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
      // 블로그 인덱스 최상단 대형 카드(⑤3-2) — 편집 선정 1건. 여러 개면 최신 1건만 노출.
      featured: s.boolean().default(false),
      body: s.raw(),
    })
    .transform((data) => ({
      ...data,
      readTime: data.readTime ?? estimateReadTime(data.body),
    })),
});

/** Case studies — a standalone collection (structured metrics/quotes, not free MDX).
 *  content/case-studies/**\/*.mdx, edited via the Keystatic `caseStudies` collection.
 *  Per-locale files use the blog's -ko/-jp suffix convention (no cross-locale join). */
const caseStudies = defineCollection({
  name: 'CaseStudy',
  pattern: 'case-studies/**/*.mdx',
  schema: s.object({
    slug: s.string(),
    title: s.string(),
    sub: s.string(),
    context: s.string(),
    industry: s.string(),
    industryIcon: s.string().default('Store'),
    audience: s.string().default(''),
    goldenStep: s.enum(['discover', 'verify', 'translate', 'sync', 'remeasure']),
    products: s.array(s.string()).default([]),
    before: s.string().default(''),
    after: s.string().default(''),
    metrics: s
      .array(s.object({ label: s.string(), value: s.string(), verified: s.boolean().default(false) }))
      .default([]),
    quotes: s.array(s.object({ text: s.string(), who: s.string() })).default([]),
    note: s.string().default(''),
    cover: s.string().optional(),
    coverAlt: s.string().optional(),
    // Opt-in before/after adoption chart (CaseStudyChartMockup) — single toggle, not generalized.
    showAdoptionChart: s.boolean().default(false),
    lang: s.enum(['en', 'ko', 'jp']).default('ko'),
    date: s.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    featured: s.boolean().default(false),
    draft: s.boolean().default(false),
    body: s.raw().optional(),
  }),
});

/** Product docs — wiki-style MDX collection (DOCS_WIKI_PLAN D2). content/docs/**\/*.mdx.
 *  URL stays /resources/docs/[slug] (no suffix); per-locale files use -en/-jp on the
 *  filename while the URL uses the base (logical) slug — see src/lib/docs.ts. */
const docs = defineCollection({
  name: 'Doc',
  pattern: 'docs/**/*.mdx',
  schema: s.object({
    slug: s.string(),
    title: s.string(),
    excerpt: s.string().default(''),
    section: s.enum(['getting-started', 'integration', 'privacy', 'analytics', 'manual']),
    order: s.number().default(0),
    parent: s.string().optional(),
    icon: s.string().default('BookOpen'),
    lang: s.enum(['en', 'ko', 'jp']).default('ko'),
    draft: s.boolean().default(false),
    access: s.enum(['public', 'gated']).default('public'),
    updated: s.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    relatedSlugs: s.array(s.string()).default([]),
    relatedTerms: s.array(s.string()).default([]),
    body: s.raw(),
  }),
});

/** FAQ — MDX collection (DOCS_WIKI_PLAN Phase 6-W1). content/faq/**\/*.mdx.
 *  One entry per Q&A; body = answer MDX. Grouped by `group`, per-locale -en/-jp files. */
const faq = defineCollection({
  name: 'Faq',
  pattern: 'faq/**/*.mdx',
  schema: s.object({
    slug: s.string(),
    question: s.string(),
    group: s.enum(['common', 'store-count', 'store-care', 'store-insight', 'store-agent']),
    order: s.number().default(0),
    lang: s.enum(['en', 'ko', 'jp']).default('ko'),
    draft: s.boolean().default(false),
    body: s.raw(),
  }),
});

/** Events — convention/expo/webinar pages (SITE_IMPROVEMENT P2-2). content/events/**\/*.mdx.
 *  Shown at /events/[slug] (no suffix); per-locale files use -en/-jp while the URL uses the
 *  base (logical) slug — see src/lib/events.ts. `publishUntil` past → dropped from the list
 *  but the page stays live as an archive; `noindex` for invite-only pages. */
const events = defineCollection({
  name: 'Event',
  pattern: 'events/**/*.mdx',
  schema: s.object({
    slug: s.string(),
    title: s.string(),
    subtitle: s.string().default(''),
    venue: s.string().default(''),
    startDate: s.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    endDate: s.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    // Optional visibility window (KST date). Outside it → not listed (page still resolves).
    publishFrom: s.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    publishUntil: s.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    cover: s.string().optional(),
    coverAlt: s.string().optional(),
    ctaLabel: s.string().default(''),
    ctaHref: s.string().default(''),
    lang: s.enum(['en', 'ko', 'jp']).default('ko'),
    draft: s.boolean().default(false),
    // Invite-only pages: keep out of sitemap + set robots noindex.
    noindex: s.boolean().default(false),
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
  collections: { articles, caseStudies, docs, faq, events },
});
