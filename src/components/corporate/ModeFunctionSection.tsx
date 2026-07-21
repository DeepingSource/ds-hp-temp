import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { FunctionModeColumn, MODE_COLUMN_COPY } from '@/components/corporate/FunctionModeMatrix';
import { localeHref, type Locale } from '@/lib/i18n';
import { MODES, type ModeKey } from '@/lib/brand-canon';

/**
 * ModeFunctionSection — "how this mode puts all four functions to work".
 *
 * One matrix COLUMN, dropped into each of the three product pages. This is the
 * Function × Mode Matrix v1.0 claim stated where a visitor actually lands: the
 * product is not a bundle of features it owns, it is a way of reading every function.
 *
 * Shared by StoreCareView · StoreInsightView · StoreAgentView so the three pages
 * cannot drift from each other or from the matrix.
 */
export default function ModeFunctionSection({ mode, locale }: { mode: ModeKey; locale: Locale }) {
  const c = MODE_COLUMN_COPY[locale];
  const m = MODES[mode];

  return (
    <AnimatedSection className="py-16 lg:py-24 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-medium text-primary mb-3 tracking-wide">{c.eyebrow}</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep mb-3">{c.title(m.name)}</h2>
        <p className="text-base text-gray-500 leading-relaxed break-keep mb-10 max-w-2xl">{c.sub}</p>
        <FunctionModeColumn mode={mode} locale={locale} />
        <Link
          href={localeHref(locale, '/products/functions')}
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {c.cta}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </AnimatedSection>
  );
}
