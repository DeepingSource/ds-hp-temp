import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AgentMockupShowcase from '@/components/sections/AgentMockupShowcase';
import AgentEvolutionSection from '@/components/sections/AgentEvolutionSection';
import AgentDayTimeline from '@/components/sections/AgentDayTimeline';
import EnterpriseAppShowcase from '@/components/mockups/EnterpriseAppShowcase';
import AgentHqMiniMockup from '@/components/mockups/AgentHqMiniMockup';
import {
  BrainCircuit,
  ArrowRight,
  ChevronDown,
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
 *
 * 랜딩 재정돈(2026-07): "읽는 페이지 → 보는 페이지".
 *   Hero(+데모 피크) → Enterprise 데모 → 진화 스토리(미니목업) → 하루 타임라인
 *   → 모바일 → HQ 밴드 → 기능 칩 → 기술 브릿지 → CTA.
 * 시나리오 숫자(+18%, 삼각김밥 40개…)는 본문에서 목업 안 텍스트로 이동.
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
  techBridgeText: string;
  techBridgeCta: string;
  steps: Record<string, { title: string; desc: string }>;
};

// Copy lives in the CMS (content/site/store-agent.yaml → generated JSON).
const SA = siteContent.storeAgent as Record<Locale, StoreAgentCopy>;

export default function StoreAgentView({ locale }: { locale: Locale }) {
  const t = SA[locale];

  return (
    <>
      <JsonLd data={softwareApplication({ name: productPrimary('agent'), alternateName: productNaming.agent.store, description: t.heroSub, path: '/products/saai-agent', locale })} />
      {/* ── Hero (Executive 판단체) — 하단에 데모 창 상단이 걸친다(피크) ── */}
      <section className="section-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-0 lg:pt-40 text-center">
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

          {/* 데모 피크 — 브라우저 크롬 상단만 보이고 폴드에서 잘린다. #demo로 유도 */}
          <Link
            href="#demo"
            aria-label={t.ctaSecondary}
            className="relative mx-auto mt-14 block h-16 max-w-3xl sm:h-20"
          >
            <span className="absolute inset-x-0 top-0 block overflow-hidden rounded-t-2xl border border-white/15 bg-white/[0.06] shadow-elevated backdrop-blur-sm transition-colors hover:bg-white/10">
              <span className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                </span>
                <span className="ml-1 text-xs font-bold lowercase text-white/85">{productNaming.agent.store}</span>
                <span className="ml-auto inline-flex items-center gap-1 text-2xs font-medium text-primary-light">
                  {t.ctaSecondary}
                  <ChevronDown className="h-3 w-3" aria-hidden="true" />
                </span>
              </span>
              <span className="block h-24 bg-white/[0.04]" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>

      {/* ── 메인 데모: Enterprise 웹앱 — 제품을 첫 스크롤에 (재정돈: 최상단으로 이동) · #demo ── */}
      <EnterpriseAppShowcase locale={locale} />

      {/* ── 진화 스토리: Viewer → Interactive → Proactive (미니목업 카드, #proactive 로 연결) ── */}
      <AgentEvolutionSection locale={locale} />

      {/* ── saai agent의 하루 — 타임라인 (구 How-it-works 4카드 대체) ── */}
      <AgentDayTimeline locale={locale} />

      {/* ── 보조: 사장님(폰) 뷰 목업 (액션 카드·AI 채팅·푸시 알림).
             #proactive — 진화 섹션 3번째 칸("먼저 말을 겁니다")이 여기로 딥링크한다. ── */}
      <div id="proactive" className="scroll-mt-24">
        <AgentMockupShowcase locale={locale} />
      </div>

      {/* ── HQ 밴드 — 브랜드 전체 롤업 목업 + 요금 링크 (구 Pricing 티저) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
          <div className="text-center lg:text-left">
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
          <AgentHqMiniMockup locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── 기능 × agent 열 (Matrix v1.0 · 재정돈 Phase 4) ── */}
      <ModeFunctionSection mode="agent" locale={locale} />

      {/* ── 기술 배경 링크 밴드 — 원리 설명은 기술 페이지에 위임(역할 계약 §2) ── */}
      <AnimatedSection className="border-y border-gray-200 bg-white py-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
          <p className="text-sm leading-relaxed break-keep text-gray-600">{t.techBridgeText}</p>
          <Link
            href={localeHref(locale, '/technology/agentic-ai')}
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            {t.techBridgeCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </AnimatedSection>

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
