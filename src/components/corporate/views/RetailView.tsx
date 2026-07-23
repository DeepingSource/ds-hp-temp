import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  PackageX,
  GitCompareArrows,
  ShieldAlert,
  Quote,
  Store,
} from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { localeHref, type Locale } from '@/lib/i18n';
import SolutionCaseStudies from '@/components/corporate/SolutionCaseStudies';
import ProblemSignal from '@/components/solutions/ProblemSignal';
import AdoptionJourney from '@/components/solutions/AdoptionJourney';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import DiagnosisLauncher from '@/components/corporate/diagnosis/DiagnosisLauncher';
import { crumb } from '@/lib/breadcrumb-labels';
import { JsonLd, service } from '@/lib/structured-data';
import siteContent from '@/data/generated/site-content.json';

/**
 * RetailView — shared retail solution composition.
 * Rendered by `/solutions/retail` (en), `/ko/solutions/retail`, `/jp/solutions/retail`
 * with the locale prop (PLAN_v1.1 D6 path-prefix i18n).
 */

const HERO_IMG = '/images/industries/convenience-hero-interior.webp';
const SCENARIO_IMGS = [
  '/images/cctv/cctv-display-shelf-empty-wide.webp',
  '/images/cctv/cctv-cvs-entrance.webp',
  '/images/cctv/cctv-intrusion-night-ir.webp',
];
const DASH_IMG = '/images/industries/convenience-dashboard.webp';

type Copy = {
  badge: string;
  heroTitle: [string, string];
  heroSub: string;
  heroCta: string;
  scenarios: { tag: string; title: string; body: string }[];
  scenariosEyebrow: string;
  scenariosHeading: string;
  baEyebrow: string;
  baHeading: string;
  beforeAfter: { before: string; after: string }[];
  quote: string;
  quoteName: string;
  quoteRole: string;
  resultsLine: string;
  resultsNote: string;
  ctaEyebrow: string;
  ctaTitle: [string, string];
  ctaSub: string;
  ctaButton: string;
};

const CMS = siteContent.retail as unknown as Record<Locale, Copy>;

const dashCaption: Record<Locale, string> = { ko: '* 분석 화면 예시', en: '* Example analysis screen', jp: '* 分析画面の例' };

export default function RetailView({ locale }: { locale: Locale }) {
  const t = CMS[locale];

  const icons = [PackageX, GitCompareArrows, ShieldAlert];
  const scenarios = t.scenarios.map((s, i) => ({ ...s, icon: icons[i] }));

  return (
    <div className="bg-white min-h-screen">
      <JsonLd
        data={service({
          name: `${t.heroTitle[0]} ${t.heroTitle[1]}`,
          description: t.heroSub,
          path: '/solutions/retail',
          locale,
          serviceType: t.badge,
        })}
      />

      {/* ── 히어로 ── */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-surface-dark">
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO_IMG} alt="" fill priority sizes="100vw" className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/75 via-surface-dark/85 to-surface-dark" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full" aria-hidden="true" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <Breadcrumb items={[{ name: crumb('solutions', locale), path: '/solutions' }, { name: crumb('retail', locale), path: '/solutions/retail' }]} locale={locale} tone="dark" className="mb-4" />
          <Link href={localeHref(locale, '/solutions')} className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary-light hover:text-white transition-colors">
            {locale === 'ko' ? '다른 업종 문제 찾기' : locale === 'jp' ? '他の業種の課題を探す' : 'Browse other industries'}
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
          <HeroBadge tone="dark">
            <Store className="w-3.5 h-3.5" />
            {t.badge}
          </HeroBadge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6 break-keep">
            {t.heroTitle[0]}
            <br />
            <span className="text-primary">{t.heroTitle[1]}</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto break-keep">
            {t.heroSub}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href={localeHref(locale, '/contact')} className="btn-primary-dark gap-2 w-full sm:w-auto">
              {t.heroCta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contextual Diagnosis Launcher */}
      <section className="py-6 bg-gray-50/70 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <DiagnosisLauncher variant="banner" preset={{ industry: 'convenience' }} locale={locale} />
        </div>
      </section>

      {/* ── 3 시나리오 ── */}
      <AnimatedSection className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">
              {t.scenariosEyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep">
              {t.scenariosHeading}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {scenarios.map((s, i) => (
              <div key={s.tag} className="stagger-child group card overflow-hidden p-0 flex flex-col transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card">
                <div className="relative aspect-[16/10] w-full">
                  <Image src={SCENARIO_IMGS[i]} alt={s.title} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-col gap-3 p-5">
                  <span className="self-start px-2.5 py-1 rounded-lg text-xs font-bold bg-primary/10 text-primary">{s.tag}</span>
                  <h3 className="text-lg font-bold text-gray-900 break-keep">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed break-keep">{s.body}</p>
                  <ProblemSignal icon={s.icon} locale={locale} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── 분석 대시보드 ── */}
      <AnimatedSection className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-gray-200 shadow-card bg-slate-50">
            <Image src={DASH_IMG} alt={`${t.badge} 분석 대시보드 예시`} fill sizes="(min-width:1024px) 1024px, 100vw" className="object-cover" />
          </div>
          <p className="mt-3 text-xs text-gray-400 text-center">{dashCaption[locale]}</p>
        </div>
      </AnimatedSection>

      {/* ── Before / After ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">
              {t.baEyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-keep">
              {t.baHeading}
            </h2>
          </div>

          <div className="space-y-4">
            {t.beforeAfter.map((row, i) => (
              <div
                key={i}
                className="grid sm:grid-cols-[1fr_auto_1fr] items-center gap-4 bg-white rounded-2xl border border-gray-100 p-6"
              >
                <p className="text-sm text-gray-500 line-through break-keep">{row.before}</p>
                <ArrowRight className="w-5 h-5 text-primary mx-auto rotate-90 sm:rotate-0" />
                <p className="text-sm font-medium text-gray-900 break-keep">{row.after}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── 점주 후기 ── */}
      <AnimatedSection className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="card relative bg-primary/5 border-primary/10">
            <Quote className="w-10 h-10 text-primary/20 mb-4" />
            <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-relaxed break-keep mb-6">
              {t.quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Store className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{t.quoteName}</p>
                <p className="text-xs text-gray-500">{t.quoteRole}</p>
              </div>
            </div>
          </div>
          <p className="mt-8 text-center text-base text-gray-600 break-keep">{t.resultsLine}</p>
          <p className="mt-2 text-center text-xs text-gray-400 break-keep">{t.resultsNote}</p>
        </div>
      </AnimatedSection>

      {/* ── 도입 여정 (01→05 넘버 타임라인 · V5) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-slate-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AdoptionJourney locale={locale} />
        </div>
      </AnimatedSection>

      <SolutionCaseStudies solutionSlug="retail" locale={locale} />

      {/* ── CTA ── */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.ctaEyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 break-keep">
            {t.ctaTitle[0]}
            <br />
            {t.ctaTitle[1]}
          </h2>
          <p className="text-slate-300 text-lg mb-10 break-keep">
            {t.ctaSub}
          </p>
          <Link href={localeHref(locale, '/contact')} className="btn-primary-dark gap-2">
            {t.ctaButton}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
