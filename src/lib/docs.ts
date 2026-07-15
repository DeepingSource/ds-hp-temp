import { docs as allRaw, type Doc as VeliteDoc } from '../../.velite';
import type { Doc } from '@/data/docs/types';
import { docSectionOrder, logicalDocSlug } from '@/data/docs/types';
import type { Locale } from '@/lib/i18n';

// Compile-time check: Velite output must be assignable to our Doc interface.
const allDocs: Doc[] = allRaw satisfies VeliteDoc[] as Doc[];

const published: Doc[] = allDocs.filter((d) => !d.draft);

function sectionRank(d: Doc): number {
  const s = docSectionOrder.indexOf(d.section);
  return (s < 0 ? docSectionOrder.length : s) * 1000 + d.order;
}

// Preference when resolving a logical slug for a locale: exact locale > ko fallback > other.
function localeScore(d: Doc, locale: Locale): number {
  if (d.lang === locale) return 2;
  if (d.lang === 'ko') return 1;
  return 0;
}

/**
 * Effective doc list for a locale: one entry per logical slug, resolved to the
 * locale's translation when it exists, otherwise the Korean original (fallback).
 * Keeps en/jp working before translations land; auto-upgrades once they do.
 * Sorted by section order then `order` (drives sidebar + prev/next).
 */
export function getDocsForLocale(locale: Locale): Doc[] {
  const byLogical = new Map<string, Doc>();
  for (const d of published) {
    const logical = logicalDocSlug(d.slug);
    const existing = byLogical.get(logical);
    if (!existing || localeScore(d, locale) > localeScore(existing, locale)) {
      byLogical.set(logical, d);
    }
  }
  return [...byLogical.values()].sort((a, b) => sectionRank(a) - sectionRank(b));
}

/** Resolve one doc for a route (logical slug + locale), with Korean fallback. */
export function getDocForRoute(logicalSlug: string, locale: Locale): Doc | undefined {
  return getDocsForLocale(locale).find((d) => logicalDocSlug(d.slug) === logicalSlug);
}

/** Logical slugs to statically generate for a locale (URL is suffix-free). */
export function getDocStaticSlugs(locale: Locale): string[] {
  return getDocsForLocale(locale).map((d) => logicalDocSlug(d.slug));
}

/**
 * Docs that reference a glossary term via their `relatedTerms` (DOCS_WIKI_PLAN Phase 3
 * reverse link — the glossary→docs half of the cross-link graph). Locale-resolved with
 * Korean fallback, in the same section→order the sidebar uses.
 */
export function getDocsUsingTerm(termSlug: string, locale: Locale): Doc[] {
  return getDocsForLocale(locale).filter((d) => d.relatedTerms.includes(termSlug));
}

/** Prev/next within the same section→order flat ordering (IA-2 auto navigation). */
export function getAdjacentDocs(logicalSlug: string, locale: Locale): { prev?: Doc; next?: Doc } {
  const list = getDocsForLocale(locale);
  const i = list.findIndex((d) => logicalDocSlug(d.slug) === logicalSlug);
  if (i < 0) return {};
  return { prev: i > 0 ? list[i - 1] : undefined, next: i < list.length - 1 ? list[i + 1] : undefined };
}

export type { Doc } from '@/data/docs/types';
