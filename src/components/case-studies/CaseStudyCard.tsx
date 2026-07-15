import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import type { CaseStudyMeta } from '@/data/case-studies/types';
import { goldenStepLabelI18n, goldenStepNo } from '@/data/case-studies/types';
import { caseStudiesCopy } from '@/data/case-studies/copy';
import { IndustryIcon } from './industryIcons';

export default function CaseStudyCard({ cs, locale }: { cs: CaseStudyMeta; locale: Locale }) {
  const t = caseStudiesCopy[locale];
  const topMetric = cs.metrics[0];

  return (
    <Link
      href={localeHref(locale, `/resources/case-studies/${cs.slug}`)}
      className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 p-6 shadow-card hover:shadow-lg hover:border-primary-light transition-[box-shadow,border-color] duration-300 no-underline"
    >
      {/* Stage + industry */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-1 text-2xs font-bold text-white">
          {goldenStepNo(cs.goldenStep)} {goldenStepLabelI18n[locale][cs.goldenStep]}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
          <IndustryIcon name={cs.industryIcon} className="w-4 h-4" />
          {cs.industry}
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2 break-keep group-hover:text-primary transition-colors">
        {cs.title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2 break-keep">{cs.sub}</p>

      {/* Headline metric */}
      {topMetric && (
        <div className="mt-auto rounded-lg border border-gray-100 p-3.5">
          <span
            className={
              topMetric.verified
                ? 'rounded bg-primary/10 px-1.5 py-0.5 text-3xs font-bold text-primary'
                : 'rounded bg-gray-100 px-1.5 py-0.5 text-3xs font-bold text-gray-500'
            }
          >
            {topMetric.verified ? t.measuredBadge : t.illustrativeBadge}
          </span>
          <p className="text-2xs text-gray-500 mt-1.5 mb-0.5">{topMetric.label}</p>
          <p className="text-sm font-medium text-gray-900 leading-snug break-keep">{topMetric.value}</p>
        </div>
      )}

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        {t.cardMore}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
      </span>
    </Link>
  );
}
