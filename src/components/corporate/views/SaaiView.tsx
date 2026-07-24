import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ShoppingBag, ArrowUpRight, Sparkles, Mail, Compass, LayoutGrid, MessageSquare, Archive, type LucideIcon } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { JsonLd, softwareApplication } from '@/lib/structured-data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import { IntegratedLoopDiagram } from '@/components/mockups';
import siteContent from '@/data/generated/site-content.json';

/**
 * SaaiView — saai.store B2C suite for store owners (route kept at /products/saai).
 * Reorganized per the SA-team AHM deck (2026-07-03): the product is ONE flow —
 * a 5-step weekly operating loop (trend-fit → letter → POP → planogram → chat),
 * a daily layer (daily coach), an operating-guide archive, and a Free/Pro/premium model.
 * POP maker is one tool within the suite (the "AI POP" name = the POP-maker
 * feature only, not the product identity). Operated on saai.store.
 *
 * Marketing copy lives in the CMS (content/site/saai.yaml → generated JSON);
 * status structure (stage flag, stage labels, tool icons, plan highlight) stays
 * in code, merged with copy by id.
 */

type Stage = 'live' | 'soon' | 'research';

type SaaiCopy = {
  heroBadge: string;
  heroTitle: string;
  heroSub: string;
  heroCta: string;
  heroNote: string;
  loopEyebrow: string;
  loopHeading: string;
  loopSub: string;
  loopFootnote: string;
  toolsEyebrow: string;
  toolsHeading: string;
  toolsSub: string;
  trendNote: string;
  planEyebrow: string;
  planHeading: string;
  planSub: string;
  planNote: string;
  featureCta: string;
  featureNote: string;
  otherProducts: string;
  loop: Record<string, { name: string; role: string }>;
  tools: Record<string, { name: string; desc: string }>;
  plans: Record<string, { tier: string; price: string; desc: string; items: string[] }>;
};

const SA = siteContent.saai as Record<Locale, SaaiCopy>;

const STAGE_LABELS: Record<Locale, Record<Stage, string>> = {
  ko: { live: '운영 중', soon: '출시 예정', research: '연구 중' },
  en: { live: 'Live', soon: 'Coming soon', research: 'In research' },
  jp: { live: '運営中', soon: '公開予定', research: '研究中' },
};

// step/tool/plan structure (order, stage flag, icon, highlight) stays in code;
// copy is merged in by id from the CMS.
const LOOP_STRUCT: { id: string; stage: Stage }[] = [
  { id: 'trendfit', stage: 'soon' },
  { id: 'letter', stage: 'live' },
  { id: 'pop', stage: 'live' },
  { id: 'planogram', stage: 'research' },
  { id: 'chat', stage: 'research' },
];

const TOOLS_STRUCT: { id: string; stage: Stage; icon: LucideIcon }[] = [
  { id: 'popmaker', stage: 'live', icon: Sparkles },
  { id: 'letter', stage: 'live', icon: Mail },
  { id: 'trendfit', stage: 'soon', icon: Compass },
  { id: 'planogram', stage: 'research', icon: LayoutGrid },
  { id: 'chat', stage: 'research', icon: MessageSquare },
  { id: 'archive', stage: 'live', icon: Archive },
];

const PLANS_STRUCT: { id: string; highlight?: boolean }[] = [
  { id: 'free' },
  { id: 'pro', highlight: true },
  { id: 'premium' },
];

const stageStyle: Record<Stage, string> = {
  live: 'bg-success/10 text-success',
  soon: 'bg-amber-50 text-amber-700',
  research: 'bg-gray-100 text-gray-500',
};

export default function SaaiView({ locale }: { locale: Locale }) {
  const t = SA[locale];
  const sl = STAGE_LABELS[locale];
  const loop = LOOP_STRUCT.map((s) => ({ ...s, ...t.loop[s.id] }));
  const tools = TOOLS_STRUCT.map((s) => ({ ...s, ...t.tools[s.id] }));
  const plans = PLANS_STRUCT.map((s) => ({ ...s, ...t.plans[s.id] }));

  return (
    <div className="bg-white">
      <JsonLd data={softwareApplication({ name: 'saai.store', description: t.heroSub, path: '/products/saai', locale })} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-16 lg:pt-40 lg:pb-20 text-center">
          <Breadcrumb items={[{ name: crumb('products', locale), path: '/products' }, { name: 'saai.store', path: '/products/saai' }]} locale={locale} tone="light" className="mb-6 justify-center" />
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-lighter border border-primary/10 rounded-full text-sm text-primary font-medium mb-6">
            <ShoppingBag className="w-4 h-4" />
            {t.heroBadge}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight break-keep mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-xl mx-auto break-keep mb-10">
            {t.heroSub}
          </p>
          <a href="https://saai.store" target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg">
            {t.heroCta}
            <ArrowUpRight className="w-5 h-5 ml-2" />
          </a>
          <p className="mt-4 text-sm text-gray-500">{t.heroNote}</p>
          <div className="mt-12 mx-auto max-w-2xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gray-200 shadow-card">
              <Image
                src="/images/storeagent-ai-pop-mockup.webp"
                alt={tools[0].name}
                fill
                priority
                sizes="(min-width:768px) 672px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Integrated signal loop (hero-adjacent showcase) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <IntegratedLoopDiagram locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── 5-step weekly loop ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-3">{t.loopEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{t.loopHeading}</h2>
            <p className="text-base text-gray-500 leading-relaxed break-keep">{t.loopSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {loop.map((s, i) => (
              <div key={s.name} className="relative rounded-2xl border border-gray-200 bg-white p-5 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-full bg-primary-lighter text-primary text-sm font-bold flex items-center justify-center">{i + 1}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${stageStyle[s.stage]}`}>{sl[s.stage]}</span>
                </div>
                <div className="text-base font-bold text-gray-900">{s.name}</div>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed break-keep">{s.role}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-6 break-keep">{t.loopFootnote}</p>
        </div>
      </AnimatedSection>

      {/* ── Tool suite ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-3">{t.toolsEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{t.toolsHeading}</h2>
            <p className="text-base text-gray-500 leading-relaxed break-keep">{t.toolsSub}</p>
            <p className="mt-4 text-sm text-gray-500 italic break-keep border-l-2 border-primary/40 pl-3">{t.trendNote}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.name} className="card h-full flex flex-col">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${stageStyle[tool.stage]}`}>{sl[tool.stage]}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.name}</h3>
                  <p className="text-base text-gray-500 leading-relaxed break-keep">{tool.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ── Business model: Free / Pro / Premium ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-3">{t.planEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{t.planHeading}</h2>
            <p className="text-base text-gray-500 leading-relaxed break-keep">{t.planSub}</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-5">
            {plans.map((p) => (
              <div
                key={p.tier}
                className={`rounded-2xl border p-7 flex flex-col bg-white ${p.highlight ? 'border-primary ring-1 ring-primary/20' : 'border-gray-200'}`}
              >
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{p.tier}</h3>
                  <span className="text-base font-bold text-primary">{p.price}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4 break-keep">{p.desc}</p>
                <ul className="space-y-2 mt-auto">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-gray-600 break-keep">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-6 break-keep">{t.planNote}</p>
        </div>
      </AnimatedSection>

      {/* ── CTA ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <a href="https://saai.store" target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg">
            {t.featureCta}
            <ArrowUpRight className="w-5 h-5 ml-2" />
          </a>
          <p className="mt-6 text-sm text-gray-500 break-keep">
            {t.featureNote}{' '}
            <Link href={localeHref(locale, '/products')} className="text-primary hover:text-primary-dark transition-colors">
              {t.otherProducts}
            </Link>
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
