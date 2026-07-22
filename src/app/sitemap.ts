import type { MetadataRoute } from 'next';
import { getAllArticlesMeta } from '@/lib/article-metadata';
import { getAllCaseStudies } from '@/lib/case-studies';
import { getDocsForLocale } from '@/lib/docs';
import { logicalDocSlug } from '@/data/docs/types';
import { getEventsForLocale } from '@/lib/events';
import { logicalEventSlug } from '@/data/events/types';
import { glossaryTerms } from '@/data/glossaryTerms';
import { solutionsData } from '@/data/solutionsData';

// deepingsource.io sitemap — new IA (PLAN_v1.1 §2.1) + path-prefix i18n (D6)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://deepingsource.io';

/** New-IA marketing/content routes with priority + change frequency. */
const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, freq: 'weekly' },
  { path: '/products', priority: 0.9, freq: 'weekly' },
  { path: '/products/functions', priority: 0.8, freq: 'monthly' },
  { path: '/products/saai-insight', priority: 0.8, freq: 'monthly' },
  { path: '/products/saai-agent', priority: 0.8, freq: 'monthly' },
  { path: '/products/saai-ads-insight', priority: 0.7, freq: 'monthly' },
  { path: '/products/saai-for-owners', priority: 0.7, freq: 'monthly' },
  { path: '/products/store-count', priority: 0.7, freq: 'monthly' },
  { path: '/products/store-queue', priority: 0.7, freq: 'monthly' },
  { path: '/products/store-pop', priority: 0.7, freq: 'monthly' },
  { path: '/products/store-fit', priority: 0.7, freq: 'monthly' },
  { path: '/products/saai-care', priority: 0.7, freq: 'monthly' },
  { path: '/products/saai', priority: 0.7, freq: 'monthly' },
  { path: '/technology', priority: 0.8, freq: 'monthly' },
  { path: '/technology/agentic-ai', priority: 0.8, freq: 'monthly' },
  { path: '/technology/anonymizer', priority: 0.7, freq: 'monthly' },
  { path: '/technology/seal', priority: 0.7, freq: 'monthly' },
  { path: '/technology/spatial-ai', priority: 0.7, freq: 'monthly' },
  { path: '/technology/models', priority: 0.7, freq: 'monthly' },
  { path: '/solutions', priority: 0.8, freq: 'monthly' },
  { path: '/solutions/retail', priority: 0.7, freq: 'monthly' },
  { path: '/solutions/food-beverage', priority: 0.7, freq: 'monthly' },
  { path: '/solutions/drug-store', priority: 0.7, freq: 'monthly' },
  { path: '/solutions/large-space', priority: 0.7, freq: 'monthly' },
  { path: '/enterprise', priority: 0.8, freq: 'monthly' },
  { path: '/pricing', priority: 0.8, freq: 'monthly' },
  { path: '/company/about', priority: 0.7, freq: 'monthly' },
  { path: '/company/news', priority: 0.6, freq: 'weekly' },
  { path: '/company/career', priority: 0.6, freq: 'monthly' },
  { path: '/company/partnership', priority: 0.6, freq: 'monthly' },
  { path: '/company/investors', priority: 0.6, freq: 'monthly' },
  { path: '/resources/blog', priority: 0.7, freq: 'weekly' },
  { path: '/resources/case-studies', priority: 0.7, freq: 'monthly' },
  { path: '/resources/docs', priority: 0.6, freq: 'monthly' },
  { path: '/resources/glossary', priority: 0.5, freq: 'monthly' },
  { path: '/resources/faq', priority: 0.5, freq: 'monthly' },
  { path: '/contact', priority: 0.6, freq: 'monthly' },
  { path: '/legal/privacy', priority: 0.3, freq: 'yearly' },
  { path: '/legal/terms', priority: 0.3, freq: 'yearly' },
];

const abs = (p: string) => `${baseUrl}${p === '/' ? '' : p}` || baseUrl;

/** hreflang alternates for a base path (en default · ko · ja prefixed). */
const langAlts = (p: string) => ({
  languages: {
    en: abs(p),
    ko: `${baseUrl}/ko${p === '/' ? '' : p}`,
    ja: `${baseUrl}/jp${p === '/' ? '' : p}`,
  },
});

// Stable lastModified for routes/data that carry no real per-content date.
// Using a fixed constant (not new Date()) avoids noisy "modified" churn on every build.
const STABLE_LAST_MODIFIED = '2026-06-17';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = routes.map((r) => ({
    url: abs(r.path),
    lastModified: STABLE_LAST_MODIFIED,
    changeFrequency: r.freq,
    priority: r.priority,
    alternates: langAlts(r.path),
  }));

  // Glossary terms → /glossary/[slug] (DefinedTerm pages, en/ko/jp)
  const glossaryPages: MetadataRoute.Sitemap = glossaryTerms.map((t) => ({
    url: abs(`/glossary/${t.slug}`),
    lastModified: STABLE_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
    alternates: langAlts(`/glossary/${t.slug}`),
  }));

  // Solution detail → /solutions/[slug] (en/ko/jp)
  const solutionPages: MetadataRoute.Sitemap = solutionsData.map((s) => ({
    url: abs(`/solutions/${s.slug}`),
    lastModified: STABLE_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    alternates: langAlts(`/solutions/${s.slug}`),
  }));

  // Company blog articles (insight/guide). Each article exists only in its own
  // content language, served at that locale's path (/resources/blog · /ko · /jp);
  // no cross-locale hreflang alternates since there is no translated variant.
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    articlePages = getAllArticlesMeta()
      .filter((m) => m.category === 'insight' || m.category === 'guide')
      .map((m) => {
        const prefix = m.lang === 'en' ? '' : `/${m.lang}`;
        return {
          url: `${baseUrl}${prefix}/resources/blog/${m.slug}`,
          lastModified: m.date ? new Date(m.date) : STABLE_LAST_MODIFIED,
          changeFrequency: 'monthly' as const,
          priority: 0.5,
        };
      });
  } catch {
    articlePages = [];
  }

  // Case studies → /resources/case-studies/[slug] (each in its own content language).
  let caseStudyPages: MetadataRoute.Sitemap = [];
  try {
    caseStudyPages = getAllCaseStudies().map((c) => {
      const prefix = c.lang === 'en' ? '' : `/${c.lang}`;
      return {
        url: `${baseUrl}${prefix}/resources/case-studies/${c.slug}`,
        lastModified: c.date ? new Date(c.date) : STABLE_LAST_MODIFIED,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      };
    });
  } catch {
    caseStudyPages = [];
  }

  // Product docs → /resources/docs/[slug]. List only real per-locale content (a
  // doc whose lang === that locale), not Korean fallbacks, to avoid duplicate URLs.
  let docPages: MetadataRoute.Sitemap = [];
  try {
    docPages = (['en', 'ko', 'jp'] as const).flatMap((loc) => {
      const prefix = loc === 'en' ? '' : `/${loc}`;
      return getDocsForLocale(loc)
        .filter((d) => d.lang === loc && d.access !== 'gated')
        .map((d) => ({
          url: `${baseUrl}${prefix}/resources/docs/${logicalDocSlug(d.slug)}`,
          lastModified: d.updated ? new Date(d.updated) : STABLE_LAST_MODIFIED,
          changeFrequency: 'monthly' as const,
          priority: 0.5,
        }));
    });
  } catch {
    docPages = [];
  }

  // Events → /events/[slug]. Listed per-locale content (own `lang`), excluding
  // invite-only (noindex) events. Archived events drop out of the sitemap.
  let eventPages: MetadataRoute.Sitemap = [];
  try {
    eventPages = (['en', 'ko', 'jp'] as const).flatMap((loc) => {
      const prefix = loc === 'en' ? '' : `/${loc}`;
      return getEventsForLocale(loc)
        .filter((e) => e.lang === loc && !e.noindex)
        .map((e) => ({
          url: `${baseUrl}${prefix}/events/${logicalEventSlug(e.slug)}`,
          lastModified: STABLE_LAST_MODIFIED,
          changeFrequency: 'weekly' as const,
          priority: 0.5,
        }));
    });
  } catch {
    eventPages = [];
  }

  return [...staticPages, ...glossaryPages, ...solutionPages, ...articlePages, ...caseStudyPages, ...docPages, ...eventPages];
}
