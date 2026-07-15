import { faq as allRaw, type Faq as VeliteFaq } from '../../.velite';
import type { Faq, FaqGroup } from '@/data/faq/types';
import { logicalFaqSlug } from '@/data/faq/types';
import type { Locale } from '@/lib/i18n';

// Compile-time check: Velite output must be assignable to our Faq interface.
const allFaqs: Faq[] = allRaw satisfies VeliteFaq[] as Faq[];

const published: Faq[] = allFaqs.filter((f) => !f.draft);

function localeScore(f: Faq, locale: Locale): number {
  if (f.lang === locale) return 2;
  if (f.lang === 'ko') return 1;
  return 0;
}

/** One entry per logical slug, resolved to the locale (Korean fallback). */
function resolvedForLocale(locale: Locale): Faq[] {
  const byLogical = new Map<string, Faq>();
  for (const f of published) {
    const logical = logicalFaqSlug(f.slug);
    const ex = byLogical.get(logical);
    if (!ex || localeScore(f, locale) > localeScore(ex, locale)) byLogical.set(logical, f);
  }
  return [...byLogical.values()];
}

/** FAQs for a group in a locale, ordered by `order` (Korean fallback per item). */
export function getFaqsByGroup(group: FaqGroup, locale: Locale): Faq[] {
  return resolvedForLocale(locale)
    .filter((f) => f.group === group)
    .sort((a, b) => a.order - b.order);
}

/** Plain-text answer for FAQPage JSON-LD — strip common markdown from the MDX body. */
export function faqAnswerText(body: string): string {
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links → link text
    .replace(/[#>*_`~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export type { Faq } from '@/data/faq/types';
