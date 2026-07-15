import Link from 'next/link';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { CaseStudyChartMockup } from '@/components/mockups';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import type { CaseStudy } from '@/data/case-studies/types';
import { goldenStepLabelI18n, goldenStepNo } from '@/data/case-studies/types';
import { caseStudiesCopy } from '@/data/case-studies/copy';
import { IndustryIcon } from './industryIcons';

const bodyComponents = {
  h2: (p: React.ComponentProps<'h2'>) => <h2 className="mt-10 mb-3 text-xl font-bold text-gray-900 break-keep" {...p} />,
  h3: (p: React.ComponentProps<'h3'>) => <h3 className="mt-8 mb-2 text-lg font-bold text-gray-900 break-keep" {...p} />,
  p: (p: React.ComponentProps<'p'>) => <p className="my-4 text-gray-700 leading-relaxed break-keep" {...p} />,
  ul: (p: React.ComponentProps<'ul'>) => <ul className="my-4 space-y-2 list-disc pl-5 text-gray-700 break-keep" {...p} />,
  li: (p: React.ComponentProps<'li'>) => <li className="leading-relaxed" {...p} />,
  strong: (p: React.ComponentProps<'strong'>) => <strong className="font-semibold text-gray-900" {...p} />,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  img: (p: React.ComponentProps<'img'>) => <img className="my-6 rounded-xl w-full" {...p} />,
};

export default function CaseStudyDetailView({ cs, locale }: { cs: CaseStudy; locale: Locale }) {
  const t = caseStudiesCopy[locale];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-8 lg:pt-32">
        <Breadcrumb
          items={[
            { name: crumb('resources', locale), path: '/resources' },
            { name: crumb('case-studies', locale), path: '/resources/case-studies' },
            { name: cs.title, path: `/resources/case-studies/${cs.slug}` },
          ]}
          locale={locale}
          tone="light"
          className="mb-6"
        />
        <Link
          href={localeHref(locale, '/resources/case-studies')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {t.backToList}
        </Link>
      </div>

      <AnimatedSection className="pb-16 lg:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <article className="card p-7 sm:p-9">
            {/* Header */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                {goldenStepNo(cs.goldenStep)} {goldenStepLabelI18n[locale][cs.goldenStep]}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                <IndustryIcon name={cs.industryIcon} className="w-4 h-4" />
                {cs.industry}
              </span>
              {cs.audience && <span className="text-xs text-gray-500">{t.audienceLabel}{cs.audience}</span>}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-2 break-keep">{cs.title}</h1>
            <p className="text-base text-gray-600 leading-relaxed mb-5 break-keep">{cs.sub}</p>

            {/* Product tags */}
            {cs.products.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {cs.products.map((p) => (
                  <span
                    key={p}
                    className="rounded-md border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary"
                  >
                    {p}
                  </span>
                ))}
              </div>
            )}

            <p className="text-sm text-gray-600 leading-relaxed mb-6 break-keep">{cs.context}</p>

            {/* Before / After */}
            {(cs.before || cs.after) && (
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500 mb-1.5">{t.beforeLabel}</p>
                  <p className="text-sm text-gray-700 leading-relaxed break-keep">{cs.before}</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4">
                  <p className="text-xs font-medium text-primary mb-1.5">{t.afterLabel}</p>
                  <p className="text-sm text-gray-800 leading-relaxed break-keep">{cs.after}</p>
                </div>
              </div>
            )}

            {/* Metrics */}
            {cs.metrics.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {cs.metrics.map((m) => (
                  <div key={m.label} className="rounded-lg border border-gray-100 p-3.5">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span
                        className={
                          m.verified
                            ? 'rounded bg-primary/10 px-1.5 py-0.5 text-3xs font-bold text-primary'
                            : 'rounded bg-gray-100 px-1.5 py-0.5 text-3xs font-bold text-gray-500'
                        }
                      >
                        {m.verified ? t.measuredBadge : t.illustrativeBadge}
                      </span>
                    </div>
                    <p className="text-2xs text-gray-500 mb-0.5">{m.label}</p>
                    <p className="text-sm font-medium text-gray-900 leading-snug break-keep">{m.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Quotes */}
            {cs.quotes.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                {cs.quotes.map((q) => (
                  <blockquote key={q.text} className="rounded-lg bg-slate-50 p-4">
                    <Quote className="w-4 h-4 text-primary/40 mb-2" aria-hidden="true" />
                    <p className="text-sm text-gray-700 leading-relaxed break-keep">{q.text}</p>
                    <footer className="text-xs text-gray-500 mt-2">— {q.who}</footer>
                  </blockquote>
                ))}
              </div>
            )}

            {cs.note && (
              <p className="text-xs text-gray-500 leading-relaxed break-keep border-t border-gray-100 pt-4">
                {cs.note}
              </p>
            )}
          </article>

          {/* Opt-in before/after adoption chart */}
          {cs.showAdoptionChart && (
            <div className="mt-8">
              <CaseStudyChartMockup locale={locale} />
            </div>
          )}

          {/* Optional deep-dive body */}
          {cs.body && cs.body.trim() && (
            <div className="mt-10 text-gray-700">
              <MDXRemote source={cs.body} components={bodyComponents} />
            </div>
          )}
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
