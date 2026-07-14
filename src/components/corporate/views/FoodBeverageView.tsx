import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Sparkles,
  Clock,
  ClipboardList,
  Quote,
  Coffee,
} from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { localeHref, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';
import { JsonLd, service } from '@/lib/structured-data';
import siteContent from '@/data/generated/site-content.json';

/**
 * FoodBeverageView — shared café & F&B solution composition.
 * Rendered by `/solutions/food-beverage` (en), `/ko/solutions/food-beverage`,
 * `/jp/solutions/food-beverage` with the locale prop (PLAN_v1.1 D6 path-prefix i18n).
 */

const HERO_IMG = '/images/industries/cafe-hero.webp';
const SCENARIO_IMGS = [
  '/images/cctv/cctv-cafe-counter.webp',
  '/images/cctv/cctv-cafe-hall.webp',
  '/images/cctv/cctv-restaurant-kitchen.webp',
];
const DASH_IMG = '/images/industries/cafe-dashboard.webp';

type Copy = {
  badge: string;
  heroTitle: [string, string];
  heroSub: string;
  heroCta: string;
  scenarios: { tag: string; title: string; body: string }[];
  scenariosEyebrow: string;
  scenariosHeading: string;
  quote: string;
  quoteName: string;
  quoteRole: string;
  ctaEyebrow: string;
  ctaTitle: [string, string];
  ctaSub: string;
  ctaButton: string;
};

const CMS = siteContent.foodBeverage as unknown as Record<Locale, Copy>;

const dashCaption: Record<Locale, string> = { ko: '* 분석 화면 예시', en: '* Example analysis screen', jp: '* 分析画面の例' };

export default function FoodBeverageView({ locale }: { locale: Locale }) {
  const t = CMS[locale];

  const icons = [Sparkles, Clock, ClipboardList];
  const scenarios = t.scenarios.map((s, i) => ({ ...s, icon: icons[i] }));

  return (
    <div className="bg-white min-h-screen">
      <JsonLd
        data={service({
          name: `${t.heroTitle[0]} ${t.heroTitle[1]}`,
          description: t.heroSub,
          path: '/solutions/food-beverage',
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
          <Breadcrumb items={[{ name: crumb('solutions', locale), path: '/solutions' }, { name: crumb('food-beverage', locale), path: '/solutions/food-beverage' }]} locale={locale} tone="dark" className="mb-6" />
          <HeroBadge tone="dark">
            <Coffee className="w-3.5 h-3.5" />
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

      {/* ── 시나리오 ── */}
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

      {/* ── 후기 ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="card relative bg-primary/5 border-primary/10">
            <Quote className="w-10 h-10 text-primary/20 mb-4" />
            <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-relaxed break-keep mb-6">
              {t.quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{t.quoteName}</p>
                <p className="text-xs text-gray-500">{t.quoteRole}</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

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
