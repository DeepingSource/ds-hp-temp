import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AgentMockupShowcase from '@/components/sections/AgentMockupShowcase';
import EnterpriseAppShowcase from '@/components/mockups/EnterpriseAppShowcase';
import ProcessStepper from '@/components/ui/ProcessStepper';
import {
  BrainCircuit,
  ArrowRight,
} from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { solutionTaglines, productNaming, productPrimary } from '@/lib/brand-canon';
import { JsonLd, softwareApplication } from '@/lib/structured-data';
import WordRise from '@/components/ui/WordRise';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import ModeFunctionSection from '@/components/corporate/ModeFunctionSection';
import siteContent from '@/data/generated/site-content.json';

/**
 * StoreAgentView — shared store agent product-detail composition.
 * Rendered by `/products/saai-agent` (en), `/ko/products/saai-agent`,
 * `/jp/products/saai-agent` with the locale prop. Product name stays identical.
 */

type StoreAgentCopy = {
  heroTitle: string;
  heroSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stepsHeading: string;
  stepsSub: string;
  pricingHeading: string;
  pricingSub: string;
  pricingCta: string;
  finalHeading: string;
  finalSub: string;
  finalCta: string;
  steps: Record<string, { title: string; desc: string }>;
};

// Copy lives in the CMS (content/site/store-agent.yaml → generated JSON); step
// structure (icon) stays in code, merged with copy by id.
const SA = siteContent.storeAgent as Record<Locale, StoreAgentCopy>;

const STEPS_STRUCT = [
  { id: 'restock', icon: 'ClipboardCheck' },
  { id: 'order', icon: 'Lightbulb' },
  { id: 'human', icon: 'TrendingUp' },
  { id: 'improve', icon: 'Repeat' },
] as const;

export default function StoreAgentView({ locale }: { locale: Locale }) {
  const t = SA[locale];

  return (
    <>
      <JsonLd data={softwareApplication({ name: productPrimary('agent'), alternateName: productNaming.agent.store, description: t.heroSub, path: '/products/saai-agent', locale })} />
      {/* ── Hero (Executive 판단체) ── */}
      <section className="section-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-20 lg:pt-40 lg:pb-28 text-center">
          <Breadcrumb items={[{ name: crumb('products', locale), path: '/products' }, { name: productPrimary('agent'), path: '/products/saai-agent' }]} locale={locale} tone="dark" className="mb-6" />
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-primary-light font-medium mb-6">
            <BrainCircuit className="w-4 h-4" />
            {productPrimary('agent')}
            <span className="font-normal text-primary-light/55">· {productNaming.agent.store}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight break-keep mb-6">
            <WordRise text={t.heroTitle} />
          </h1>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary-light mb-4">
            {solutionTaglines.agent[locale]}
          </p>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto break-keep mb-10">
            {t.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={localeHref(locale, '/contact') + '?product=StoreAgent'} className="btn-primary btn-lg">
              {t.ctaPrimary}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="#demo" className="btn-ghost-dark">
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">
              {t.stepsHeading}
            </h2>
            <p className="text-lg text-gray-500 break-keep">
              {t.stepsSub}
            </p>
          </div>
          <ProcessStepper
            ariaLabel={t.stepsHeading}
            steps={STEPS_STRUCT.map((s, i) => ({ label: `0${i + 1}`, title: t.steps[s.id]?.title ?? '', desc: t.steps[s.id]?.desc ?? '', icon: s.icon }))}
          />
        </div>
      </AnimatedSection>

      {/* ── 메인 데모: Enterprise 웹앱 (본사·점장 뷰, 6탭 라이브 재현) · #demo 앵커 ── */}
      <EnterpriseAppShowcase locale={locale} />

      {/* ── 보조: 사장님(폰) 뷰 목업 (액션 카드·AI 채팅·푸시 알림) ── */}
      <AgentMockupShowcase locale={locale} />

      {/* ── Pricing teaser ── */}
      <AnimatedSection className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">
            {t.pricingHeading}
          </h2>
          <p className="text-gray-500 mb-6 break-keep">
            {t.pricingSub}
          </p>
          <Link
            href={localeHref(locale, '/pricing')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            {t.pricingCta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AnimatedSection>

      {/* ── 기능 × agent 열 (Matrix v1.0 · 재정돈 Phase 4) ── */}
      <ModeFunctionSection mode="agent" locale={locale} />

      {/* ── CTA ── */}
      <AnimatedSection className="section-dark relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight break-keep">
            {t.finalHeading}
          </h2>
          <p className="text-lg text-gray-300 mb-10 break-keep">
            {t.finalSub}
          </p>
          <Link href={localeHref(locale, '/contact') + '?product=StoreAgent'} className="btn-primary btn-lg">
            {t.finalCta}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}
