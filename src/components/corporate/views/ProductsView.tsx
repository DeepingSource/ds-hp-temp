import Link from 'next/link';
import type { ComponentType } from 'react';
import { ArrowRight, ArrowUpRight, Cpu, Grid3x3, Radar, ClipboardCheck } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import AnimatedSection from '@/components/ui/AnimatedSection';
import OperatingLoopGraphic from '@/components/corporate/OperatingLoopGraphic';
import { localeHref, type Locale } from '@/lib/i18n';
import RelatedGlossary from '@/components/corporate/RelatedGlossary';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import { crumb } from '@/lib/breadcrumb-labels';
import { JsonLd, itemList, softwareApplication } from '@/lib/structured-data';
import { productNaming, productSecondary, saaiPromiseLayer, categoryKeyword, operatingLoop, type ModeKey } from '@/lib/brand-canon';
import siteContent from '@/data/generated/site-content.json';

/**
 * ProductsView — SAAI brand hub (SITE_IMPROVEMENT P2-1 · 5-part arc):
 * ① SAAI definition (saaiPromiseLayer 4-up → tech anchors) → ② the operating
 * loop (count→insight→care→agent, hero graphic + Tier-1 cards) → ③ category
 * keyword (익명화 공간 AI) → ④ domain implementations (saai.store / storecare.ai ↗)
 * → ⑤ cases · CTA. /products/saai stays the B2C product page (no absorption).
 * Copy is CMS-editable (content/site/products.yaml → generated JSON); structure
 * (stage, icon, href, external) stays in code and is merged with copy by id.
 */

type CardCopy = { desc: string };
type ProductsCopy = {
  eyebrow: string; heroTitle: string; heroSub: string;
  loopEyebrow: string; suiteTitle: string; suiteSub: string; ownersEyebrow: string;
  categoryTitle: string; categoryBody: string; casesCta: string;
  detail: string; visit: string; seedLine: string; seedCta: string; cta: string;
  loop: Record<string, CardCopy>;
  owners: Record<string, CardCopy>;
};
const PRODUCTS = siteContent.products as Record<Locale, ProductsCopy>;

/**
 * The three modes, in matrix order (care → insight → agent).
 *
 * FIXED 2026-07-20 (reorg Phase 4): this list used to hold FOUR products mapped to four
 * loop stages — count(Observe)→insight(Analyze)→care(Suggest)→agent(Learn). Two things
 * were wrong under Function × Mode Matrix v1.0: `count` is a FUNCTION, not a product,
 * and 관찰/Observe belongs to care, not count. Stage labels now come from brand-canon
 * `operatingLoop`, and count moved to the function library (/products/functions).
 * `id` still matches the CMS copy keys in content/site/products.yaml.
 */
type LoopStruct = { id: string; key: ModeKey; icon: ComponentType<{ className?: string }>; href: string; emphasis?: boolean };
const LOOP_STRUCT: LoopStruct[] = [
  { id: 'store-care', key: 'care', icon: Radar, href: '/products/saai-care' },
  { id: 'store-insight', key: 'insight', icon: Grid3x3, href: '/products/saai-insight' },
  { id: 'store-agent', key: 'agent', icon: ClipboardCheck, href: '/products/saai-agent', emphasis: true },
];

/** Function-library card that closes the row — count et al. live here, not on the loop. */
const FUNCTIONS_CARD: Record<Locale, { stage: string; title: string; desc: string; cta: string }> = {
  ko: { stage: '가로축', title: '기능 라이브러리', desc: 'count·trail·wait·shelf… 12개 기능은 한 제품에 속하지 않고 세 모드를 모두 가로지릅니다.', cta: '매트릭스 보기' },
  en: { stage: 'Across', title: 'Function library', desc: 'count, trail, wait, shelf and eight more — capabilities that belong to no single product and cross all three modes.', cta: 'See the matrix' },
  jp: { stage: '横軸', title: '機能ライブラリ', desc: 'count・trail・wait・shelf… 12の機能は一つの製品に属さず、3つのモードを横断します。', cta: 'マトリクスを見る' },
};

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
  const promise = saaiPromiseLayer[locale];
  // Stage label + time phase per mode, read from the loop SOT so the two never drift.
  const loopSteps = operatingLoop[locale];
  const loop = LOOP_STRUCT.map((s, i) => {
    const step = loopSteps.find((x) => x.mode === s.key);
    return {
      ...s,
      stageNo: String(i + 1).padStart(2, '0'),
      stage: step ? `${step.label} · ${step.phase}` : '',
      name: productNaming[s.key].store,
      saaiName: productNaming[s.key].saai,
      secondary: productSecondary(s.key),
      desc: c.loop[s.id]?.desc ?? '',
    };
  });
  const owners = OWNER_STRUCT.map((s) => ({ ...s, desc: c.owners[s.id]?.desc ?? '' }));

  return (
    <>
      <JsonLd
        data={itemList(
          loop.map((p) => softwareApplication({ name: p.saaiName ?? p.name, alternateName: p.secondary ?? undefined, description: p.desc, path: p.href, locale })),
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

      {/* ── ① SAAI 정의 — 약속 층 4-up (brand-canon saaiPromiseLayer SOT) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-slate-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <Eyebrow className="mb-4">{promise.eyebrow}</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{promise.heading}</h2>
            <p className="text-gray-500 break-keep">{promise.sub}</p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {promise.pillars.map((p) => (
              <li key={p.key}>
                <Link
                  href={localeHref(locale, p.tech)}
                  className="group flex flex-col h-full rounded-2xl border border-gray-200 bg-white p-6 hover:border-primary-light transition-colors no-underline"
                >
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-bold text-primary font-mono leading-none">{p.letter}</span>
                    <span className="text-sm font-bold text-gray-900">{p.label}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed break-keep">{p.promise}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-sm text-gray-500 break-keep">{promise.bridge}</p>
        </div>
      </AnimatedSection>

      {/* ── ② Tier 1 — Enterprise · the operating loop ── */}
      <Section variant="default">
        <Container>
          <Eyebrow className="mb-4">{c.loopEyebrow}</Eyebrow>
          <div className="mb-9 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{c.suiteTitle}</h2>
            <p className="text-gray-500 leading-relaxed break-keep">{c.suiteSub}</p>
          </div>
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
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{p.saaiName ?? p.name}</h3>
                      {p.secondary && <p className="text-xs font-medium text-gray-400 lowercase mb-2">{p.secondary}</p>}
                      <p className="text-sm text-gray-500 leading-relaxed break-keep mb-5">{p.desc}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        {c.detail}
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                );
              })}
              {/* The horizontal axis — functions, which sit across the three modes. */}
              <li className="stagger-child">
                <Link
                  href={localeHref(locale, '/products/functions')}
                  className="group flex flex-col h-full rounded-2xl border border-dashed border-primary/40 bg-primary-lighter/30 p-6 hover:border-primary transition-colors no-underline"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary border border-primary/20 mb-5">
                    <Grid3x3 className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <p className="text-2xs font-mono font-medium text-primary/70 mb-1">{FUNCTIONS_CARD[locale].stage}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{FUNCTIONS_CARD[locale].title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed break-keep mb-5 mt-2">{FUNCTIONS_CARD[locale].desc}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {FUNCTIONS_CARD[locale].cta}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            </ul>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── ③ 카테고리 키워드 — 익명화 공간 AI (categoryKeyword SOT) ── */}
      <AnimatedSection className="py-16 lg:py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Eyebrow className="mb-4 justify-center">{categoryKeyword[locale]}</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-keep">{c.categoryTitle}</h2>
          <p className="text-gray-500 leading-relaxed break-keep">{c.categoryBody}</p>
        </div>
      </AnimatedSection>

      {/* ── ④ 도메인 구현 — For owners · B2C (separate sites) ── */}
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

      <RelatedGlossary
        slugs={['store-heatmap', 'dwell-time', 'purchase-conversion-rate', 'store-operations-automation', 'store-automation-agent', 'retail-ai']}
        locale={locale}
      />

      {/* ── ⑤ 사례 · CTA ── */}
      <AnimatedSection className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href={localeHref(locale, '/contact')} className="btn-primary btn-lg inline-flex items-center gap-2">
              {c.cta}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href={localeHref(locale, '/resources/case-studies')} className="btn-secondary btn-lg inline-flex items-center gap-2">
              {c.casesCta}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
