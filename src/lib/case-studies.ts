import { caseStudies as allRaw, type CaseStudy as VeliteCaseStudy } from '../../.velite';
import type { CaseStudy } from '@/data/case-studies/types';
import { goldenStepOrder } from '@/data/case-studies/types';
import type { Locale } from '@/lib/i18n';

// Compile-time check: Velite output must be assignable to our CaseStudy interface.
const allCaseStudies: CaseStudy[] = allRaw satisfies VeliteCaseStudy[] as CaseStudy[];

// Future-date (scheduled) filter — same KST basis as articles.
const kstOffset = 9 * 60 * 60 * 1000;
const todayStr = new Date(Date.now() + kstOffset).toISOString().split('T')[0];

const stepIdx = (s: CaseStudy['goldenStep']) => goldenStepOrder.indexOf(s);

/**
 * Case studies, published only (draft + future-dated excluded), ordered for the
 * Golden Case narrative: featured first, then stage order (Discover→Re-measure),
 * then date desc as a within-stage tiebreak. Each locale keeps its own entries
 * (per-lang files, no cross-locale fallback) — mirrors the blog convention.
 */
const sorted: CaseStudy[] = [...allCaseStudies]
  .filter((c) => c.date <= todayStr && !c.draft)
  .sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    const s = stepIdx(a.goldenStep) - stepIdx(b.goldenStep);
    if (s !== 0) return s;
    return b.date.localeCompare(a.date);
  });

export function getAllCaseStudies(): CaseStudy[] {
  return sorted;
}

export function getCaseStudiesByLocale(lang: Locale): CaseStudy[] {
  return sorted.filter((c) => c.lang === lang);
}

export function getCaseStudyBySlug(slug: string, lang: Locale): CaseStudy | undefined {
  return sorted.find((c) => c.slug === slug && c.lang === lang);
}

export type { CaseStudy } from '@/data/case-studies/types';
