import siteContent from '@/data/generated/site-content.json';

export type GlossaryCategory = 'ai' | 'analytics' | 'retail' | 'operations';

/** ko/en/jp copy. en/jp may be empty until translated — always read through
 *  `glossaryDetail()` (or `pick`) so an untranslated field falls back to ko
 *  instead of rendering blank. */
type Tri = { ko: string; en: string; jp: string };
export type GlossaryLocale = 'ko' | 'en' | 'jp';

const pick = (t: Tri | undefined, locale: GlossaryLocale): string =>
  (t?.[locale] || t?.ko) ?? '';

export interface GlossaryTerm {
  slug: string;
  title: string;
  englishTitle: string;
  category: GlossaryCategory;
  categoryLabel: string;
  tagline: string;
  definition: string;
  body: {
    heading: string;
    paragraphs: string[];
  }[];
  saaiUsage: string;
  relatedTerms: string[];
  relatedIndustries: string[];
  metaDescription: string;
}

export const glossaryCategoryLabel: Record<GlossaryCategory, string> = {
  ai: 'AI 기술',
  analytics: '데이터 분석',
  retail: '리테일',
  operations: '매장 운영',
};

/**
 * Source of truth = the Keystatic `glossary` collection (content/glossary/*.yaml),
 * compiled into site-content.json by gen-site-content. This module derives the
 * ko-canonical shape the app has always consumed; en/jp card copy lives in the
 * same entries and is surfaced via glossary-i18n.ts. URL/JSON-LD/views unchanged.
 */
interface RawGlossaryEntry {
  slug: string;
  order: number;
  category: GlossaryCategory;
  englishTitle: string;
  title: { ko: string; en: string; jp: string };
  tagline: { ko: string; en: string; jp: string };
  definition: { ko: string; en: string; jp: string };
  relatedTerms: string[];
  relatedIndustries: string[];
  saaiUsage: Tri;
  metaDescription: Tri;
  body: { heading: Tri; paragraphs: { ko: string[]; en: string[]; jp: string[] } }[];
}

const raw = (siteContent as unknown as { glossary: RawGlossaryEntry[] }).glossary;

export const glossaryTerms: GlossaryTerm[] = raw.map((t) => ({
  slug: t.slug,
  title: t.title.ko,
  englishTitle: t.englishTitle,
  category: t.category,
  categoryLabel: glossaryCategoryLabel[t.category],
  tagline: t.tagline.ko,
  definition: t.definition.ko,
  body: t.body.map((s) => ({ heading: pick(s.heading, 'ko'), paragraphs: s.paragraphs.ko })),
  saaiUsage: pick(t.saaiUsage, 'ko'),
  relatedTerms: t.relatedTerms,
  relatedIndustries: t.relatedIndustries,
  metaDescription: pick(t.metaDescription, 'ko'),
}));

export const glossaryBySlug: Record<string, GlossaryTerm> = Object.fromEntries(
  glossaryTerms.map((term) => [term.slug, term]),
);

/**
 * Locale-aware detail copy (body · saaiUsage · metaDescription). These fields used
 * to be ko-only strings rendered on every locale, so /glossary and /jp/glossary
 * both showed Korean bodies. They are {ko,en,jp} now; until en/jp are translated
 * this falls back to ko — same output as before, but translatable without code changes.
 */
export function glossaryDetail(slug: string, locale: GlossaryLocale) {
  const t = raw.find((e) => e.slug === slug);
  if (!t) return null;
  return {
    saaiUsage: pick(t.saaiUsage, locale),
    metaDescription: pick(t.metaDescription, locale),
    body: t.body.map((s) => ({
      heading: pick(s.heading, locale),
      paragraphs: s.paragraphs[locale]?.length ? s.paragraphs[locale] : s.paragraphs.ko,
    })),
  };
}
