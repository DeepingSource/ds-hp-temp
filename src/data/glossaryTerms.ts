import siteContent from '@/data/generated/site-content.json';

export type GlossaryCategory = 'ai' | 'analytics' | 'retail' | 'operations';

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
  saaiUsage: string;
  metaDescription: string;
  body: { heading: string; paragraphs: string[] }[];
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
  body: t.body,
  saaiUsage: t.saaiUsage,
  relatedTerms: t.relatedTerms,
  relatedIndustries: t.relatedIndustries,
  metaDescription: t.metaDescription,
}));

export const glossaryBySlug: Record<string, GlossaryTerm> = Object.fromEntries(
  glossaryTerms.map((term) => [term.slug, term]),
);
