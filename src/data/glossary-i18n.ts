import { type Locale } from '@/lib/i18n';
import siteContent from '@/data/generated/site-content.json';
import { type GlossaryCategory } from '@/data/glossaryTerms';

/**
 * Translation overlay for /resources/glossary (en default · ko · jp).
 *
 * Card copy (title/tagline/definition) now lives per-term in the Keystatic `glossary`
 * collection (content/glossary/*.yaml) as {ko,en,jp} and is compiled into site-content.json.
 * This module rebuilds the en/jp overlay the views/JSON-LD have always consumed: Korean (ko)
 * reads straight from glossaryTerms; missing overlay values fall back to data.
 * Detail-only fields (body/saaiUsage) and englishTitle are NOT translated.
 *
 * Category labels are a fixed taxonomy, kept here in code (en = AI Technology…, jp = 丁寧体).
 */

export const glossaryCategoryI18n: Record<GlossaryCategory, Partial<Record<Locale, string>>> = {
  ai: { en: 'AI Technology', jp: 'AI技術' },
  analytics: { en: 'Data Analytics', jp: 'データ分析' },
  retail: { en: 'Retail', jp: 'リテール' },
  operations: { en: 'Store Operations', jp: '店舗運営' },
};

interface RawCardEntry {
  slug: string;
  title: { ko: string; en: string; jp: string };
  tagline: { ko: string; en: string; jp: string };
  definition: { ko: string; en: string; jp: string };
}

const raw = (siteContent as unknown as { glossary: RawCardEntry[] }).glossary;

/** Build a locale overlay from an entry, omitting a locale that has no translated title. */
function overlayFor(loc: 'en' | 'jp', t: RawCardEntry) {
  if (!t.title[loc]) return undefined;
  return { title: t.title[loc], tagline: t.tagline[loc], definition: t.definition[loc] };
}

export const glossaryCardI18n: Record<
  string,
  Partial<Record<Locale, { title: string; tagline: string; definition?: string }>>
> = Object.fromEntries(
  raw.map((t) => {
    const overlay: Partial<Record<Locale, { title: string; tagline: string; definition?: string }>> = {};
    const en = overlayFor('en', t);
    const jp = overlayFor('jp', t);
    if (en) overlay.en = en;
    if (jp) overlay.jp = jp;
    return [t.slug, overlay];
  }),
);
