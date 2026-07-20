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

/**
 * 솔루션 업종(slug) → 대표 케이스 논리 slug. case study `industry`는 자유 텍스트라
 * 직접 매칭이 어려워 명시 매핑을 둔다(유지보수 용이). fashion-pickup은 별도 vertical이라 제외.
 */
const SOLUTION_CASE_SLUGS: Record<string, string[]> = {
  retail: ['cvs-100', 'smb-53'],
  'food-beverage': ['cafe-sync'],
  'drug-store': ['drug-translate'],
  'large-space': ['space-remeasure'],
};
/** 로케일 접미사(-ko/-jp) 제거 — en은 접미사 없음. */
const logicalCaseSlug = (slug: string): string => slug.replace(/-(ko|jp)$/, '');

/** 특정 업종 페이지에 노출할 케이스(로케일별, 최대 limit건). 해당 로케일 케이스 없으면 빈 배열. */
export function getCaseStudiesForSolution(solutionSlug: string, lang: Locale, limit = 2): CaseStudy[] {
  const slugs = SOLUTION_CASE_SLUGS[solutionSlug];
  if (!slugs) return [];
  return getCaseStudiesByLocale(lang)
    .filter((c) => slugs.includes(logicalCaseSlug(c.slug)))
    .slice(0, limit);
}

export type { CaseStudy } from '@/data/case-studies/types';
