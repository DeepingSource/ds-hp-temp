'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { Check, Eye, LayoutGrid, Zap, Calculator, ShieldCheck } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { localeHref, type Locale } from '@/lib/i18n';
import { type Content } from './PricingClientView';

interface PlanCardDescriptor {
  icon: ReactNode;
  step: string;
  title: string;
  price: ReactNode;
  desc: string;
  features: string[];
  ctaHref: string;
  ctaLabel: string;
  featured?: boolean;
}

function PlanCard({ icon, step, title, price, desc, features, ctaHref, ctaLabel, featured }: PlanCardDescriptor) {
  return (
    <div className={featured
      ? 'flex flex-col p-7 bg-white border border-blue-200 rounded-2xl shadow-[0_4px_20px_-4px_rgba(59,130,246,0.15)] relative overflow-hidden'
      : 'flex flex-col p-7 bg-white border border-blue-100 rounded-2xl hover:border-blue-300 transition-colors shadow-sm'}>
      {featured && (
        <div className="absolute top-0 right-0 w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-bl-[32px] flex items-start justify-end p-2.5">
          <Zap className="w-4 h-4 text-white" />
        </div>
      )}

      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <span className="text-xs font-bold text-blue-600">{step}</span>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>
      </div>

      <div className="mb-5 pb-5 border-b border-gray-100">
        {price}
      </div>

      <p className="text-sm text-gray-500 mb-5">{desc}</p>

      <ul className="space-y-2.5 mb-6 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
            <Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />{f}
          </li>
        ))}
      </ul>

      {featured ? (
        <Link href={ctaHref} className="btn-primary w-full text-center shadow-md hover:shadow-lg">
          {ctaLabel}
        </Link>
      ) : (
        <Link href={ctaHref} className="btn-secondary w-full text-center text-blue-700 hover:bg-blue-50 hover:border-blue-200">
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}

export default function B2cPlans({ t, locale }: { t: Content; locale: Locale }) {
  const cards: PlanCardDescriptor[] = [
    {
      icon: <Eye className="w-5 h-5 text-blue-600" />,
      step: t.careStep,
      title: 'Store Care',
      price: (
        <>
          <span className="text-3xl font-bold text-gray-900">10,000원</span>
          <span className="text-sm text-gray-500">{t.carePerMonth}</span>
        </>
      ),
      desc: t.careDesc,
      features: t.careFeatures,
      ctaHref: localeHref(locale, '/contact'),
      ctaLabel: t.freeConsult,
    },
    {
      icon: <LayoutGrid className="w-5 h-5 text-blue-600" />,
      step: t.insightStep,
      title: 'Store Insight',
      price: (
        <>
          <span className="text-3xl font-bold text-gray-900">100,000원</span>
          <span className="text-sm text-gray-500">{t.insightPerMonth}</span>
          <span className="text-xs text-gray-500 block mt-1">{t.insightBasis}</span>
        </>
      ),
      desc: t.insightDesc,
      features: t.insightFeatures,
      ctaHref: localeHref(locale, '/contact'),
      ctaLabel: t.freeConsult,
    },
    {
      icon: <Zap className="w-5 h-5 text-blue-600" />,
      step: t.agentStep,
      title: 'Store Agent',
      price: (
        <>
          <span className="text-3xl font-bold text-gray-900">{t.agentFree}</span>
          <span className="text-sm text-gray-500">{t.agentPriceTail}</span>
        </>
      ),
      desc: t.agentDesc,
      features: t.agentFeatures,
      ctaHref: localeHref(locale, '/contact'),
      ctaLabel: t.startFree,
      featured: true,
    },
  ];

  return (
    <AnimatedSection className="py-12 bg-white rounded-t-3xl border-t border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {t.b2cHeading}
          </h2>
          <p className="text-gray-500">
            {t.b2cSub}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <PlanCard key={card.title} {...card} />
          ))}
        </div>

        {/* SAAI(무료) vs Store Care(유료) 차이 안내 */}
        <div className="mt-10 bg-gray-50 rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            {t.diffTitle}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">{t.freeBadge}</span>
                <span className="font-bold text-gray-900">{t.saaiBasic}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-600">
                {t.saaiFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-1.5">
                    <Check className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">{t.paidBadge}</span>
                <span className="font-bold text-gray-900">{t.storeCare}</span>
              </div>
              <ul className="space-y-1.5 text-xs text-gray-600">
                {t.careDiffFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-1.5">
                    <Check className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            {t.diffFooterPre}<strong>{t.diffFooterInfo}</strong>{t.diffFooterMid}<strong>{t.diffFooterMonitor}</strong>{t.diffFooterPost}
          </p>
        </div>

        {/* 상세 비교 링크 */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link
            href={localeHref(locale, '/pricing/simulator')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            <Calculator className="w-4 h-4" />
            {t.simLink}
            <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            href="/storeagent"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            {t.agentCompareLink}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
