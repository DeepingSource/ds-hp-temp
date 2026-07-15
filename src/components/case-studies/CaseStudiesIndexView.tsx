import Link from 'next/link';
import { Search, SearchCheck, Languages, Share2, RefreshCw, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import { getCaseStudiesByLocale } from '@/lib/case-studies';
import { caseStudiesCopy } from '@/data/case-studies/copy';
import { goldenStepOrder, goldenStepLabelI18n, goldenStepNo } from '@/data/case-studies/types';
import CaseStudyCard from './CaseStudyCard';

const stepIcons = [Search, SearchCheck, Languages, Share2, RefreshCw];

export default function CaseStudiesIndexView({ locale }: { locale: Locale }) {
  const t = caseStudiesCopy[locale];
  const cases = getCaseStudiesByLocale(locale);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 bg-surface-dark overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full" aria-hidden="true" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('resources', locale), path: '/resources' }, { name: crumb('case-studies', locale), path: '/resources/case-studies' }]} locale={locale} tone="dark" className="mb-6" />
          <p className="text-sm font-medium text-primary mb-4 tracking-wider uppercase">{t.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6 break-keep">
            {t.heroTitle}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed break-keep">
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* Golden Case 5-stage banner */}
      <AnimatedSection className="py-14 lg:py-20 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.goldenEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">
              {t.goldenHeading}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed break-keep">
              {t.goldenSubBefore}
              <Link href={localeHref(locale, '/enterprise')} className="text-primary underline underline-offset-2">
                {t.goldenEnterprise}
              </Link>
              {t.goldenSubAfter}
            </p>
          </div>
          <ol className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {goldenStepOrder.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <li key={step} className="card flex flex-col items-center text-center gap-2 p-5">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-bold text-primary">{goldenStepNo(step)}</span>
                  <span className="text-sm font-bold text-gray-900">{goldenStepLabelI18n[locale][step]}</span>
                  <span className="text-2xs text-gray-500 uppercase tracking-wide">{goldenStepLabelI18n.en[step]}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </AnimatedSection>

      {/* Measured vs illustrative disclaimer */}
      <section className="bg-amber-50/60 border-b border-amber-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <p className="text-xs text-amber-800 leading-relaxed break-keep">
            <span className="font-medium">{t.disclaimerMeasured}</span>{t.disclaimerMeasuredRest}
            <span className="font-medium">{t.disclaimerIllustrative}</span>{t.disclaimerIllustrativeRest}
          </p>
        </div>
      </section>

      {/* Case cards */}
      <AnimatedSection className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cases.map((cs) => (
              <li key={cs.slug} className="stagger-child">
                <CaseStudyCard cs={cs} locale={locale} />
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.ctaEyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 break-keep">
            {t.ctaHeading}
          </h2>
          <Link href={localeHref(locale, '/contact')} className="btn-primary gap-2">
            {t.ctaButton}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
