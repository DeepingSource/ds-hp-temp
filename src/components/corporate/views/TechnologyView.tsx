import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import { CountUp } from '@/components/ui/CountUp';
import { AnonymizationPipeline } from '@/components/technology/AnonymizationPipeline';
import LoopVideo from '@/components/ui/LoopVideo';
import IntegratedLoopDiagram from '@/components/mockups/IntegratedLoopDiagram';
import {
  Fingerprint, ShieldCheck, Grid3x3, Shield, ArrowRight,
  CheckCircle2, AlertCircle, Zap,
} from 'lucide-react';
import { PRIVACY_COPY } from '@/data/mockup-scenarios/technology';
import { COMPANY } from '@/lib/company-data';
import siteContent from '@/data/generated/site-content.json';
import { localeHref, type Locale } from '@/lib/i18n';
import RelatedGlossary from '@/components/corporate/RelatedGlossary';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import WordRise from '@/components/ui/WordRise';
import { crumb } from '@/lib/breadcrumb-labels';

type StackItem = { tag: string; title: string; desc: string };
type DemoItem = { label: string; desc: string };
type ComplianceItem = { region: string; law: string; desc: string };
type ProductItem = { name: string; desc: string };

type Copy = {
  heroBadge: string;
  heroTitleA: string;
  heroTitleB: string;
  heroSub: string;
  heroPatentsLabel: string;
  heroStackLine: string;

  problemEyebrow: string;
  problemTitle: string;
  problemSub: string;
  oldTag: string;
  oldTitle: string;
  dilemmaOld: string[];
  newTag: string;
  newTitle: string;
  dilemmaNew: string[];

  howEyebrow: string;
  howTitle: string;
  howSub: string;

  demoEyebrow: string;
  demoTitle: string;
  demoSub: string;
  demoItems: DemoItem[];
  demoCaption: string;
  demoAria: string;

  coreEyebrow: string;
  coreTitle: string;
  coreSub: string;
  stack: StackItem[];
  learnMore: string;

  complianceEyebrow: string;
  complianceTitle: string;
  complianceSub: string;
  complianceItems: ComplianceItem[];

  patentsLabel: string;
  patentsStackLine: string;
  poweredLabel: string;
  poweredProducts: ProductItem[];

  ctaBadge: string;
  ctaTitle: string;
  ctaSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const stackHrefs = [
  '/technology/anonymizer',
  '/technology/seal',
  '/technology/models',
];
const stackIcons = [Fingerprint, ShieldCheck, Grid3x3];
const poweredHrefs = [
  '/products/saai-insight',
  '/products/saai-agent',
  '/products/saai-care',
];

const CMS = siteContent.technology as unknown as Record<Locale, Copy>;


export default function TechnologyView({ locale }: { locale: Locale }) {
  const t = CMS[locale];
  const pj = PRIVACY_COPY[locale];
  const patentsBreakdown: Record<Locale, string> = {
    ko: '등록 66개 · 출원 37개',
    en: 'Registered 66 · Pending 37',
    jp: '登録66件 · 出願37件',
  };

  const stack = t.stack.map((s, i) => ({ ...s, icon: stackIcons[i], href: stackHrefs[i] }));
  const poweredProducts = t.poweredProducts.map((p, i) => ({ ...p, href: poweredHrefs[i] }));

  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-24 lg:pt-36 overflow-hidden section-dark">
        <div className="absolute inset-0 bg-surface-dark" aria-hidden="true" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <Breadcrumb items={[{ name: crumb('technology', locale), path: '/technology' }]} locale={locale} tone="dark" className="mb-6" />
            <HeroBadge tone="dark">
              <Fingerprint className="w-3.5 h-3.5" />
              {t.heroBadge}
            </HeroBadge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12] mb-6 break-keep">
              <WordRise text={t.heroTitleA} /><br className="hidden sm:block" />
              <WordRise text={t.heroTitleB} className="text-primary-light" />
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl break-keep">
              {t.heroSub}
            </p>
            <div className="inline-flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/15 rounded-2xl backdrop-blur-sm">
              <div className="text-center">
                <CountUp to={COMPANY.patents} className="text-4xl font-bold text-white tabular-nums" />
                <p className="text-xs text-slate-300 font-medium mt-0.5">{t.heroPatentsLabel}</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-left">
                <p className="text-sm font-medium text-white">{t.heroStackLine}</p>
                <p className="text-xs text-slate-300 mt-0.5">{patentsBreakdown[locale]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 딜레마와 해법 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.problemEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.problemTitle}</h2>
            <p className="text-lg text-gray-500 max-w-xl break-keep">
              {t.problemSub}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <div className="p-8 bg-red-50 rounded-3xl border border-red-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-sm font-bold text-red-600 uppercase tracking-wide">{t.oldTag}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.oldTitle}</h3>
              <div className="space-y-3">
                {t.dilemmaOld.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-red-200 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-0.5 bg-red-500 rounded" />
                    </div>
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 bg-primary-lighter rounded-3xl border border-primary/15">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                  <Fingerprint className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-bold text-primary uppercase tracking-wide">{t.newTag}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.newTitle}</h3>
              <div className="space-y-3">
                {t.dilemmaNew.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── 3단계 프로세스 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.howEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.howTitle}</h2>
            <p className="text-lg text-gray-500 max-w-xl break-keep">{t.howSub}</p>
          </div>
          <AnonymizationPipeline locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── 통합 신호 루프 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <IntegratedLoopDiagram locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── Anonymizer 데모 (Privacy by Design proof 통합) ── */}
      <AnimatedSection className="py-20 lg:py-28 section-dark bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light mb-3">{t.demoEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 break-keep">{t.demoTitle}</h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-6 break-keep">
              {t.demoSub}
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {t.demoItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <figure className="rounded-2xl overflow-hidden border border-white/10 bg-gray-900 shadow-card">
            <div className="overflow-x-auto">
              <LoopVideo
                mp4="/videos/anon-3panel-demo.mp4"
                poster="/images/technology/anon-3panel-poster.webp"
                ariaLabel={t.demoAria}
                className="block h-auto w-full min-w-[680px]"
              />
            </div>
            {/* PROOF BAR — 0.03s erase + no original kept (merged from the retired Privacy Journey) */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 px-5 py-3.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-bold text-emerald-300 tabular-nums">
                <Zap className="w-3.5 h-3.5" aria-hidden="true" />&lt; {pj.procChip}
              </span>
              <p className="text-sm font-medium text-white break-keep">{pj.heading}</p>
            </div>
            <figcaption className="px-5 py-3 text-xs text-slate-400 break-keep border-t border-white/10">{t.demoCaption}</figcaption>
          </figure>
        </div>
      </AnimatedSection>

      {/* ── 기술 스택 갤러리 (4 서브) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.coreEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.coreTitle}</h2>
            <p className="text-lg text-gray-500 max-w-xl break-keep">{t.coreSub}</p>
          </div>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stack.map((s) => {
              const Icon = s.icon;
              return (
                <StaggerItem key={s.tag}>
                  <Link href={s.href} className="group flex flex-col h-full p-7 bg-white rounded-2xl border border-gray-200 hover:border-primary-light hover:shadow-[0_8px_30px_rgba(55,106,226,0.08)] transition-[border-color,box-shadow]">
                    <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    <p className="text-2xs font-bold uppercase tracking-wider text-gray-500 mb-1">{s.tag}</p>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed flex-1 break-keep">{s.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      {t.learnMore}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ── 규제 준수 + 특허 + 제품 연결 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="p-10 bg-gray-50 rounded-3xl border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary-lighter flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">{t.complianceEyebrow}</p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 break-keep">{t.complianceTitle}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 break-keep">
                {t.complianceSub}
              </p>
              <div className="space-y-4">
                {t.complianceItems.map((item) => (
                  <div key={item.law} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-gray-900">{item.region}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.law}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-primary ml-auto shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="p-10 section-dark rounded-3xl text-center flex-1 flex flex-col justify-center">
                <p className="text-5xl sm:text-7xl font-bold mb-2 text-white">{COMPANY.patents}</p>
                <p className="text-lg font-bold mb-1 text-white">{t.patentsLabel}</p>
                <p className="text-sm text-slate-300 font-medium mb-1">{patentsBreakdown[locale]}</p>
                <p className="text-slate-400 text-sm">{t.patentsStackLine}</p>
              </div>
              <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                <p className="text-sm font-bold text-gray-500 mb-4">{t.poweredLabel}</p>
                <div className="flex flex-col gap-2">
                  {poweredProducts.map((p) => (
                    <Link key={p.name} href={p.href} className="flex items-center justify-between p-3 rounded-xl hover:bg-white transition-colors group">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full text-primary bg-primary-lighter">{p.name}</span>
                        <span className="text-sm text-gray-600">{p.desc}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 transition-[color,transform]" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <RelatedGlossary
        slugs={['computer-vision', 'anonymized-cctv', 'cctv-analytics', 'behavior-analysis', 'anomaly-detection', 'pos-data-limitations']}
        locale={locale}
      />

      {/* ── CTA ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-lighter border border-primary/15 rounded-full text-sm text-primary font-medium mb-8">
            <Fingerprint className="w-3.5 h-3.5" />
            {t.ctaBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 break-keep">
            {t.ctaTitle}
          </h2>
          <p className="text-gray-500 text-lg mb-10 break-keep">{t.ctaSub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={localeHref(locale, '/contact')} className="btn-primary btn-lg">{t.ctaPrimary}</Link>
            <Link href={localeHref(locale, '/company/about')} className="inline-flex items-center justify-center px-9 py-4 text-base font-medium text-gray-900 bg-white border border-gray-200 rounded-[14px] hover:border-primary-light transition-colors">{t.ctaSecondary}</Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
