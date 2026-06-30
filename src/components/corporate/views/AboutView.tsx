import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import ProcessStepper from '@/components/ui/ProcessStepper';
import { CountUp } from '@/components/ui/CountUp';
import WordRise from '@/components/ui/WordRise';
import { OriginStoryTimeline } from '@/components/about/OriginStoryTimeline';
import VisionDiagram from '@/components/company/VisionDiagram';
import MasterPair from '@/components/corporate/MasterPair';
import VisionCoordinatesMockup from '@/components/mockups/VisionCoordinatesMockup';
import {
  ArrowRight, Lock, Maximize, Calendar, Award, Handshake, ShieldCheck, Cpu,
} from 'lucide-react';
import { COMPANY } from '@/lib/company-data';
import { milestoneHighlights } from '@/lib/company-milestones';
import { leadership } from '@/lib/leadership';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import { companyLine, perfectSpace, purpose } from '@/lib/brand-canon';
import siteContent from '@/data/generated/site-content.json';

/**
 * AboutView — shared locale-aware About composition.
 * Rendered by `/company/about` (en), `/ko/company/about`, `/jp/company/about`.
 * VisionDiagram + OriginStoryTimeline keep their internal Korean (out of scope).
 */

type AboutCopy = {
  badge: string;
  heroEyebrowCompany: string;
  heroMasterCompany: string;
  heroEyebrowOwner: string;
  heroMasterOwner: string;
  companyIntro: string;
  companyIntro2: string;
  vmEyebrow: string;
  vision: string;
  visionLabel: string;
  missionLabel: string;
  mission: string;
  storyEyebrow: string;
  storyHeading: string;
  storySub: string;
  leadershipEyebrow: string;
  leadershipHeading: string;
  leadershipSub: string;
  partnersEyebrow: string;
  partnersHeading: string;   // {partnerBrands} template
  partnersSub: string;       // {industries}/{nvidiaPartner} template
  partnerStatsNote: string;
  certsLabel: string;
  ctaHeading: string;
  ctaSub: string;
  ctaButton: string;
  partnerStatLabels: string[];
  methodEyebrow: string;
  methodHeading: string;
  methodIntro: string;
  certs: Record<string, { sub: string }>;
  methodSteps: Record<string, { term: string; promise: string }>;
};

const ABOUT = siteContent.about as Record<Locale, AboutCopy>;

// Cert labels + icons and the method closing line stay in code (labels are fixed
// credentials / a code value; closing is a brand-canon SOT value).
const CERTS_STRUCT: { id: string; label: string; icon: typeof ShieldCheck }[] = [
  { id: 'soc2', label: 'SOC 2', icon: ShieldCheck },
  { id: 'nextrise', label: 'NextRise 2024', icon: Award },
  { id: 'nvidia', label: COMPANY.nvidiaPartner, icon: Cpu },
];

const METHOD_STEPS_STRUCT = [{ id: 'anonymizer' }, { id: 'spatial' }, { id: 'agentic' }] as const;


export default function AboutView({ locale }: { locale: Locale }) {
  const t = ABOUT[locale];
  // rebuild the COMPANY-count interpolations from their CMS templates
  const partnersHeading = t.partnersHeading.replace('{partnerBrands}', String(COMPANY.partnerBrands));
  const partnersSub = t.partnersSub
    .replace('{industries}', String(COMPANY.industries))
    .replace('{nvidiaPartner}', COMPANY.nvidiaPartner);
  // cert label/icon stay in code; sub comes from the CMS
  const certs = CERTS_STRUCT.map((s) => ({ ...s, sub: t.certs[s.id]?.sub ?? '' }));
  // method copy (eyebrow/heading/intro/steps) from CMS; closing is a SOT value
  const method = {
    eyebrow: t.methodEyebrow,
    heading: t.methodHeading,
    intro: t.methodIntro,
    closing: purpose[locale].closing,
    steps: METHOD_STEPS_STRUCT.map((s) => ({ ...s, ...t.methodSteps[s.id] })),
  };
  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero · 두 마스터 카피 미러 ── */}
      <section className="relative pt-28 pb-20 lg:pt-36 overflow-hidden">
        <div className="absolute inset-0 bg-surface-dark" aria-hidden="true" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('about', locale), path: '/company/about' }]} locale={locale} tone="dark" className="mb-6" />
          <HeroBadge tone="dark" className="mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {t.badge}
          </HeroBadge>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">{t.heroEyebrowCompany}</p>
              <p className="text-2xl sm:text-3xl font-bold text-white leading-snug break-keep whitespace-pre-line">
                {t.heroMasterCompany}
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-primary/10 border border-primary/20 backdrop-blur-sm text-center">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">{t.heroEyebrowOwner}</p>
              <p className="text-2xl sm:text-3xl font-bold text-white leading-snug break-keep whitespace-pre-line">
                {t.heroMasterOwner}
              </p>
            </div>
          </div>

          <h1 className="mt-10 text-xl sm:text-2xl font-bold text-white max-w-2xl mx-auto leading-snug break-keep">
            <WordRise text={companyLine[locale]} />
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed break-keep">
            {t.companyIntro}
          </p>
          <p className="mt-3 text-lg text-white font-medium max-w-2xl mx-auto leading-relaxed break-keep">
            {t.companyIntro2}
          </p>
          <p className="mt-6 text-sm text-slate-400 max-w-xl mx-auto break-keep">
            {perfectSpace.your[locale]} → {perfectSpace.every[locale]}
          </p>
        </div>
      </section>

      {/* ── 비전 / 미션 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.vmEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep">{t.vision}</h2>
          </div>

          <div className="mb-12">
            <VisionDiagram locale={locale} />
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="p-8 rounded-3xl bg-slate-50 border border-gray-100">
              <Lock className="w-6 h-6 text-primary mb-4" />
              <p className="text-xs font-bold text-primary mb-2 tracking-wider uppercase">{t.visionLabel}</p>
              <p className="text-gray-900 font-medium text-lg break-keep">{t.vision}</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-gray-100">
              <Maximize className="w-6 h-6 text-primary mb-4" />
              <p className="text-xs font-bold text-primary mb-2 tracking-wider uppercase">{t.missionLabel}</p>
              <p className="text-gray-900 font-medium text-lg break-keep">{t.mission}</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── 두 약속 미러 · 본부 ↔ 매장 ── */}
      <MasterPair locale={locale} />

      {/* ── Vision 2031 좌표 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <VisionCoordinatesMockup locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── 우리가 일하는 법 · 익명화 → 공간 지능 → 에이전트 AI ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{method.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{method.heading}</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto break-keep">{method.intro}</p>
          </div>

          <ProcessStepper
            ariaLabel={method.heading}
            steps={method.steps.map((s, i) => ({ label: `0${i + 1}`, title: s.term, desc: s.promise }))}
          />

          <p className="mt-12 text-center text-base sm:text-lg text-gray-500 italic break-keep">
            {method.closing}
          </p>
        </div>
      </AnimatedSection>

      {/* ── 연혁 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.storyEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">
              {t.storyHeading}
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto break-keep">
              {t.storySub}
            </p>
          </div>

          <div className="mb-16">
            <OriginStoryTimeline locale={locale} />
          </div>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {milestoneHighlights(locale).map((m) => (
              <StaggerItem key={m.year}>
                <div className="p-6 bg-white rounded-2xl border border-gray-100 h-full text-center">
                  <Calendar className="w-5 h-5 text-primary mx-auto mb-3" />
                  <p className="text-2xl font-bold text-gray-900 mb-1">{m.year}</p>
                  <p className="text-sm font-bold text-primary mb-2 break-keep">{m.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed break-keep">{m.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ── 팀 / 리더십 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.leadershipEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.leadershipHeading}</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto break-keep">{t.leadershipSub}</p>
          </div>

          <StaggerContainer className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {leadership[locale].map((l) => (
              <StaggerItem key={l.key}>
                <div className="p-7 rounded-3xl border border-gray-100 bg-slate-50 h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-5 flex items-center justify-center" aria-hidden="true">
                    <span className="text-2xl font-bold text-primary">{l.initials}</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 mb-0.5 break-keep">{l.name}</p>
                  <p className="text-sm font-bold text-primary mb-3 break-keep">{l.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed break-keep text-left">{l.bio}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ── 파트너 신뢰 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Handshake className="w-7 h-7 text-primary mx-auto mb-5" />
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.partnersEyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 break-keep">
            {partnersHeading}
          </h2>
          <p className="text-lg text-gray-500 mb-10 break-keep">
            {partnersSub}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[`${COMPANY.partnerBrands}`, `${COMPANY.industries}`, `${COMPANY.patents}`, 'PIPA'].map((stat, i) => (
              <div key={i} className="p-5 bg-white rounded-2xl border border-gray-100">
                <p className="text-2xl font-bold text-gray-900 mb-1">{i < 3 ? <CountUp to={Number(stat)} /> : stat}</p>
                <p className="text-xs text-gray-500 font-medium">
                  {t.partnerStatLabels[i]}
                </p>
              </div>
            ))}
          </div>
          <p className="text-2xs text-gray-400 mt-5 break-keep">{t.partnerStatsNote}</p>

          <p className="text-xs font-bold text-primary mt-12 mb-5 tracking-wider uppercase">{t.certsLabel}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {certs.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 text-left">
                  <span className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-gray-900 break-keep">{c.label}</span>
                    <span className="block text-xs text-gray-500 break-keep">{c.sub}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ── CTA ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Award className="w-12 h-12 text-primary mx-auto mb-8" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 break-keep whitespace-pre-line">
            {t.ctaHeading}
          </h2>
          <p className="text-slate-300 text-lg mb-10 break-keep">
            {t.ctaSub}
          </p>
          <Link href={localeHref(locale, '/contact')} className="btn-primary-dark btn-lg gap-2 rounded-xl">
            {t.ctaButton} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
