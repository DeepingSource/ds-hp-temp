import Link from 'next/link';
import type { ComponentType } from 'react';
import { ArrowRight, ArrowUpRight, Cpu, DoorOpen, Grid3x3, Radar, ClipboardCheck } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import AnimatedSection from '@/components/ui/AnimatedSection';
import OperatingLoopGraphic from '@/components/corporate/OperatingLoopGraphic';
import { localeHref, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import { crumb } from '@/lib/breadcrumb-labels';
import { JsonLd, itemList, softwareApplication } from '@/lib/structured-data';
import siteContent from '@/data/generated/site-content.json';

/**
 * ProductsView — product hub (product-reorg 2-Tier, §7.4).
 * Tier 1 = the enterprise operating loop (count→insight→care→agent, M→A→D→A);
 * Tier 2 = for owners, the camera-less B2C sites (saai.store / storecare.ai ↗).
 * Copy is CMS-editable (content/site/products.yaml → generated JSON); structure
 * (stage, icon, href, external) stays in code and is merged with copy by id.
 */

type CardCopy = { desc: string };
type ProductsCopy = {
  eyebrow: string; heroTitle: string; heroSub: string;
  loopEyebrow: string; ownersEyebrow: string;
  detail: string; visit: string; seedLine: string; seedCta: string; cta: string;
  loop: Record<string, CardCopy>;
  owners: Record<string, CardCopy>;
};
const PRODUCTS = siteContent.products as Record<Locale, ProductsCopy>;

type LoopStruct = { id: string; name: string; stageNo: string; stage: string; icon: ComponentType<{ className?: string }>; href: string; emphasis?: boolean };
const LOOP_STRUCT: LoopStruct[] = [
  { id: 'store-count', name: 'store count', stageNo: '01', stage: 'Measure', icon: DoorOpen, href: '/products/store-count' },
  { id: 'store-insight', name: 'store insight', stageNo: '02', stage: 'Analyze', icon: Grid3x3, href: '/products/store-insight' },
  { id: 'store-care', name: 'store care', stageNo: '03', stage: 'Detect', icon: Radar, href: '/products/store-care' },
  { id: 'store-agent', name: 'store agent', stageNo: '04', stage: 'Act', icon: ClipboardCheck, href: '/products/store-agent', emphasis: true },
];

type OwnerStruct = { id: string; name: string; href: string };
const OWNER_STRUCT: OwnerStruct[] = [
  { id: 'saai-store', name: 'saai.store', href: 'https://saai.store' },
  { id: 'storecare-ai', name: 'storecare.ai', href: 'https://storecare.ai' },
];

const FEEDBACK: Record<Locale, string> = {
  ko: '결과가 다시 입력으로',
  en: 'Output feeds back to input',
  jp: '結果が再び入力へ',
};

const HUB: Record<Locale, string> = {
  ko: 'SAAI 허브',
  en: 'SAAI hub',
  jp: 'SAAIハブ',
};

export default function ProductsView({ locale }: { locale: Locale }) {
  const c = PRODUCTS[locale];
  const loop = LOOP_STRUCT.map((s) => ({ ...s, desc: c.loop[s.id]?.desc ?? '' }));
  const owners = OWNER_STRUCT.map((s) => ({ ...s, desc: c.owners[s.id]?.desc ?? '' }));

  return (
    <>
      <JsonLd
        data={itemList(
          loop.map((p) => softwareApplication({ name: p.name, description: p.desc, path: p.href, locale })),
        )}
      />

      {/* ── Hero + operating-loop graphic ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-14 lg:pt-36 lg:pb-16 text-center">
          <Breadcrumb items={[{ name: crumb('products', locale), path: '/products' }]} locale={locale} tone="light" className="mb-6 justify-center" />
          <p className="text-sm font-medium text-primary mb-4 tracking-wide">{c.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight break-keep mb-5 font-display">
            <WordRise text={c.heroTitle} />
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto break-keep mb-12 lg:mb-14">
            {c.heroSub}
          </p>
          <OperatingLoopGraphic locale={locale} hub={HUB[locale]} feedback={FEEDBACK[locale]} />
        </div>
      </section>

      {/* ── Tier 1 — Enterprise · the operating loop ── */}
      <Section variant="default">
        <Container>
          <Eyebrow className="mb-7">{c.loopEyebrow}</Eyebrow>
          <AnimatedSection>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {loop.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.id} className="stagger-child">
                    <Link
                      href={localeHref(locale, p.href)}
                      className="group flex flex-col h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-card hover:border-primary-light transition-colors no-underline"
                    >
                      <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white mb-5 ${p.emphasis ? 'ring-2 ring-primary/25 ring-offset-2' : ''}`}>
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <p className="text-2xs font-mono font-medium text-gray-400 mb-1">{p.stageNo} · {p.stage}</p>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{p.name}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed break-keep mb-5">{p.desc}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        {c.detail}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Tier 2 — For owners · B2C (separate sites) ── */}
      <Section variant="alt">
        <Container>
          <Eyebrow className="mb-7">{c.ownersEyebrow}</Eyebrow>
          <ul className="grid sm:grid-cols-2 gap-5">
            {owners.map((o) => (
              <li key={o.id}>
                <a
                  href={o.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col h-full rounded-2xl border border-gray-200 bg-white p-6 hover:border-primary-light transition-colors no-underline"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {o.name}
                    <span aria-hidden="true" className="text-primary"> ↗</span>
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed break-keep mb-5">{o.desc}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {c.visit}
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── Tech foundation (SEED) one-liner ── */}
      <Section variant="default" pad="compact">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-5">
            <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center shrink-0">
              <Cpu className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <p className="flex-1 text-base text-gray-600 leading-relaxed break-keep">{c.seedLine}</p>
            <Link
              href={localeHref(locale, '/technology')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors shrink-0"
            >
              {c.seedCta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <AnimatedSection className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Link href={localeHref(locale, '/contact')} className="btn-primary btn-lg inline-flex items-center gap-2">
            {c.cta}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}
