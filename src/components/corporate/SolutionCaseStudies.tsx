import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getCaseStudiesForSolution } from '@/lib/case-studies';
import CaseStudyCard from '@/components/case-studies/CaseStudyCard';
import { localeHref, type Locale } from '@/lib/i18n';

/**
 * 업종 솔루션 페이지 하단(CTA 위)에 해당 업종의 도입 사례 1~2건 + 전체 보기 링크(F-5).
 * 해당 로케일에 케이스가 없으면 섹션 자체를 렌더하지 않는다(빈 상태 노출 금지).
 */
const COPY: Record<Locale, { eyebrow: string; heading: string; all: string }> = {
  ko: { eyebrow: '도입 사례', heading: '이 업종의 실제 적용 사례', all: '도입 사례 전체 보기' },
  en: { eyebrow: 'Case studies', heading: 'Real deployments in this industry', all: 'View all case studies' },
  jp: { eyebrow: '導入事例', heading: 'この業種の実際の導入事例', all: '導入事例をすべて見る' },
};

export default function SolutionCaseStudies({ solutionSlug, locale }: { solutionSlug: string; locale: Locale }) {
  const cases = getCaseStudiesForSolution(solutionSlug, locale, 2);
  if (cases.length === 0) return null;
  const c = COPY[locale];
  return (
    <section className="py-16 lg:py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">{c.eyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep">{c.heading}</h2>
          </div>
          <Link href={localeHref(locale, '/resources/case-studies')} className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary shrink-0 no-underline">
            {c.all}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {cases.map((cs) => (
            <CaseStudyCard key={cs.slug} cs={cs} locale={locale} />
          ))}
        </div>
        <div className="mt-6 sm:hidden">
          <Link href={localeHref(locale, '/resources/case-studies')} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary no-underline">
            {c.all}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
