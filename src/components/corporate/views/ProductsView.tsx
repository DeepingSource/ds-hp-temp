import Link from 'next/link';
import Image from 'next/image';
import type { ComponentType } from 'react';
import { ArrowRight, ArrowUpRight, BarChart3, Megaphone, TrendingUp, Cpu } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { localeHref, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import { JsonLd, itemList, softwareApplication } from '@/lib/structured-data';
import siteContent from '@/data/generated/site-content.json';

/**
 * ProductsView — product hub (Brand Map v3.0 IA).
 * SAAI is the umbrella (not a product). Two public groups:
 *   SOLUTION (Live)  — store insight · store care · store agent  (어제·지금·다음)
 *   SOURCE  (Building) — store count · AI POP · trend fit         (곧 출시)
 * SEED (tech foundation) is summarized with a link to /technology.
 *
 * Copy is CMS-editable (content/site/products.yaml → generated JSON); structure
 * (links, images, icons, flags) stays in code and is merged with copy by id.
 */

type LiveCopy = { kicker: string; func: string; desc: string; alt: string };
type ToolCopy = { desc: string };
type ProductsCopy = {
  eyebrow: string; heroTitle: string; umbrella: string; solutionEyebrow: string;
  toolEyebrow: string; toolBadge: string; toolLive: string; detail: string; visit: string;
  seedLine: string; seedCta: string; cta: string;
  live: Record<string, LiveCopy>;
  tools: Record<string, ToolCopy>;
};
const PRODUCTS = siteContent.products as Record<Locale, ProductsCopy>;

type LiveStruct = { id: string; name: string; href: string; img: string; external?: boolean; badge?: string };
const LIVE_STRUCT: LiveStruct[] = [
  { id: 'store-insight', name: 'store insight', href: '/products/store-insight', img: '/images/storeinsight-heatmap.webp' },
  { id: 'store-care', name: 'store care', href: 'https://storecare.ai', external: true, badge: 'storecare.ai', img: '/images/storecare-contamination-detection.webp' },
  { id: 'store-agent', name: 'store agent', href: '/products/store-agent', img: '/images/storeagent-ai-pop-mockup.webp' },
];

type ToolStruct = { id: string; name: string; icon: ComponentType<{ className?: string }>; live?: boolean; href?: string };
const TOOL_STRUCT: ToolStruct[] = [
  { id: 'store-count', name: 'store count', icon: BarChart3, live: true, href: '/products/store-count' },
  { id: 'ai-pop', name: 'AI POP', icon: Megaphone, live: true, href: '/products/saai' },
  { id: 'trend-fit', name: 'trend fit', icon: TrendingUp },
];

export default function ProductsView({ locale }: { locale: Locale }) {
  const c = PRODUCTS[locale];
  const t = {
    ...c,
    live: LIVE_STRUCT.map((s) => ({ ...s, ...c.live[s.id] })),
    tools: TOOL_STRUCT.map((s) => ({ ...s, ...c.tools[s.id] })),
  };
  const livePaths = ['/products/store-insight', 'https://storecare.ai', '/products/store-agent'];

  return (
    <>
      <JsonLd
        data={itemList(
          t.live.map((p, i) =>
            softwareApplication({ name: p.name, description: p.desc, path: livePaths[i], locale }),
          ),
        )}
      />

      {/* ── Hero (짧게) + 우산 프레임 ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-14 lg:pt-36 lg:pb-16 text-center">
          <Breadcrumb items={[{ name: crumb('products', locale), path: '/products' }]} locale={locale} tone="light" className="mb-6 justify-center" />
          <p className="text-sm font-medium text-primary mb-4 tracking-wide">{t.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight break-keep mb-5 font-display">
            {t.heroTitle}
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto break-keep">
            {t.umbrella}
          </p>
        </div>
      </section>

      {/* ── 매일 받는 답 (SOLUTION · Live) ── */}
      <Section variant="default">
        <Container>
          <Eyebrow className="mb-7">{t.solutionEyebrow}</Eyebrow>
          <AnimatedSection>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.live.map((p) => {
                const inner = (
                  <>
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                      <Image src={p.img} alt={p.alt} fill sizes="(max-width: 640px) 100vw, 380px" className="object-cover" />
                      {p.badge && (
                        <span className="absolute top-3 right-3 text-2xs font-medium text-primary bg-white/90 px-2.5 py-1 rounded-full shadow-card">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <p className="text-2xs font-bold uppercase tracking-[0.18em] text-gray-500 mb-1">{p.kicker} · {p.func}</p>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{p.name}</h3>
                      <p className="text-base text-gray-500 leading-relaxed mb-5 break-keep">{p.desc}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        {p.external ? t.visit : t.detail}
                        {p.external ? <ArrowUpRight className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </span>
                    </div>
                  </>
                );
                const cls = 'stagger-child group flex flex-col h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card hover:border-primary-light transition-colors no-underline';
                return p.external ? (
                  <li key={p.name}>
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
                  </li>
                ) : (
                  <li key={p.name}>
                    <Link href={localeHref(locale, p.href)} className={cls}>{inner}</Link>
                  </li>
                );
              })}
            </ul>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── 확장 도구 (SOURCE · 곧 출시) ── */}
      <Section variant="alt">
        <Container>
          <Eyebrow className="mb-7">{t.toolEyebrow}</Eyebrow>
          <div className="grid sm:grid-cols-3 gap-5">
            {t.tools.map((tool) => {
              const Icon = tool.icon;
              const inner = (
                <>
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${tool.live ? 'bg-primary-lighter' : 'bg-gray-100'}`}>
                      <Icon className={`w-5 h-5 ${tool.live ? 'text-primary' : 'text-gray-500'}`} aria-hidden="true" />
                    </div>
                    <span className={`text-2xs font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full ${tool.live ? 'text-primary bg-primary-lighter' : 'text-gray-500 bg-gray-100'}`}>
                      {tool.live ? t.toolLive : t.toolBadge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1.5">{tool.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed break-keep">{tool.desc}</p>
                  {tool.live && (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      {t.detail}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </>
              );
              const base = 'scroll-mt-24 flex flex-col rounded-2xl border border-gray-200 bg-white p-6';
              return tool.live && tool.href ? (
                <Link key={tool.id} id={tool.id} href={localeHref(locale, tool.href)} className={`${base} hover:border-primary-light transition-colors no-underline`}>
                  {inner}
                </Link>
              ) : (
                <div key={tool.id} id={tool.id} className={base}>
                  {inner}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── 기술 기반 (SEED) 한 줄 ── */}
      <Section variant="default" pad="compact">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-5">
            <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center shrink-0">
              <Cpu className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <p className="flex-1 text-base text-gray-600 leading-relaxed break-keep">{t.seedLine}</p>
            <Link
              href={localeHref(locale, '/technology')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors shrink-0"
            >
              {t.seedCta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <AnimatedSection className="py-14 lg:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Link
            href={localeHref(locale, '/contact')}
            className="btn-primary btn-lg inline-flex items-center gap-2"
          >
            {t.cta}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}
