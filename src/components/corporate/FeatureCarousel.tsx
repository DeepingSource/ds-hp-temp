'use client';

import { useCallback, type MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AnimatePresence, motion, useMotionTemplate, useMotionValue, type PanInfo,
} from 'framer-motion';
import { DoorOpen, Grid3x3, Radar, ClipboardCheck, Check, ArrowRight, type LucideIcon } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { localeHref, type Locale } from '@/lib/i18n';
import { solutionTaglines, saaiPromiseLayer, productNaming, operatingLoop, type ModeKey } from '@/lib/brand-canon';
import SlidingIndicator from '@/components/ui/SlidingIndicator';
import { cn } from '@/lib/cn';

/**
 * FeatureCarousel — the home "products at a glance" showcase (replaces ProductPreview).
 * A dark spotlight card auto-cycles the three modes around the operating loop
 * (care → insight → agent), then the count function, each with its tagline + a
 * floating visual. Pattern adapted from the cult-ui feature carousel to our design system:
 * useMockupLoop drive (pause-on-hover, reduced-motion holds step 1), brand-blue
 * (--color-primary) spotlight, real product imagery, KO/EN/JP.
 */

type ProductStruct = {
  key: 'count' | 'insight' | 'care' | 'agent';
  name: string;        // domain implementation — store {value} (locale-invariant, lowercase)
  saaiName?: string;   // value-brand — saai {value}, the primary label (naming option B).
                       // 2026-07-16: saai 전면 확정 — count 포함 (콘텐츠_수정확장_실행계획 §7 #2).
  mode: ModeKey | null; // the mode this slide IS; null = a function, not a product
  icon: LucideIcon;
  href: string;
  images: { src: string; primary?: boolean }[];
};

/**
 * Three modes in loop order, then the function library.
 *
 * FIXED 2026-07-20 (reorg Phase 4): the deck used to be FOUR PRODUCTS with the stages
 * count(Observe)·insight(Analyze)·care(Suggest)·agent(Learn). Under Function × Mode
 * Matrix v1.0 the products are three modes, 관찰/Observe belongs to care, and `count`
 * is a FUNCTION. The count slide stays — it earns its place — but it is labeled as a
 * function and points at the library rather than posing as a fourth product.
 * `stage` is resolved per locale from brand-canon `operatingLoop`; `null` = a function.
 */
const PRODUCTS: ProductStruct[] = [
  {
    key: 'care', name: productNaming.care.store, saaiName: productNaming.care.saai, mode: 'care', icon: Radar, href: '/products/saai-care',
    images: [{ src: '/images/storecare-contamination-detection.webp', primary: true }, { src: '/images/storecare-fridge-door-open.webp' }],
  },
  {
    key: 'insight', name: productNaming.insight.store, saaiName: productNaming.insight.saai, mode: 'insight', icon: Grid3x3, href: '/products/saai-insight',
    images: [{ src: '/images/storeinsight-heatmap.webp', primary: true }, { src: '/images/storeinsight-case1-chart.webp' }],
  },
  {
    key: 'agent', name: productNaming.agent.store, saaiName: productNaming.agent.saai, mode: 'agent', icon: ClipboardCheck, href: '/products/saai-agent',
    images: [{ src: '/images/storeagent-ai-pop-mockup.webp', primary: true }],
  },
  {
    key: 'count', name: productNaming.count.store, saaiName: productNaming.count.saai, mode: null, icon: DoorOpen, href: '/products/saai-count',
    images: [{ src: '/images/cctv/cctv-cafe-hall.webp', primary: true }],
  },
];

/** Stage label for a slide — loop step for a mode, "기능" for a function. */
const FUNCTION_STAGE: Record<Locale, string> = { ko: '기능', en: 'Function', jp: '機能' };
function stageLabel(mode: ModeKey | null, locale: Locale): string {
  if (!mode) return FUNCTION_STAGE[locale];
  const step = operatingLoop[locale].find((s) => s.mode === mode);
  return step ? `${step.label} · ${step.phase}` : '';
}

type Copy = {
  eyebrow: string;
  heading: string;
  sub: string;
  cta: string;
  taglines: Record<ProductStruct['key'], string>;
  desc: Record<ProductStruct['key'], string>;
  alt: Record<ProductStruct['key'], string>;
};

const COPY: Record<Locale, Copy> = {
  ko: {
    eyebrow: 'Products',
    heading: '하나의 운영 루프, 세 개의 모드',
    sub: '지금을 감지하고, 어제를 분석하고, 다음을 제안합니다. 기능은 그 셋을 모두 가로지릅니다.',
    cta: '제품 전체 보기',
    taglines: { count: '흐름을 재다', insight: solutionTaglines.insight.ko, care: solutionTaglines.care.ko, agent: solutionTaglines.agent.ko },
    desc: {
      count: '문 앞을 지난 사람과 들어온 사람 — 유입률로 상권을 읽습니다.',
      insight: '매출 너머의 공간 — 체류·동선·전환을 히트맵으로 읽습니다.',
      care: '필요한 순간만 — 이상을 감지해 실시간으로 알립니다.',
      agent: '다음 한 수까지 — 권고는 AI가, 결정은 사람이.',
    },
    alt: {
      count: '매장 홀의 사람 흐름을 담은 CCTV 화면',
      insight: '매장 체류·동선 히트맵 분석 화면',
      care: '매장 이상 상황 감지 화면',
      agent: '매장 운영 제안(AI POP) 화면',
    },
  },
  en: {
    eyebrow: 'Products',
    heading: 'One operating loop, three modes',
    sub: 'Sensing the now, analyzing yesterday, proposing what comes next — and the functions cross all three.',
    cta: 'See all products',
    taglines: { count: 'Counts the flow', insight: solutionTaglines.insight.en, care: solutionTaglines.care.en, agent: solutionTaglines.agent.en },
    desc: {
      count: 'Who passed by and who came in — capture rate reads the trade area.',
      insight: 'Beyond sales — dwell, flow and conversion on a heatmap.',
      care: 'Only the moments that matter — detect anomalies, alert in real time.',
      agent: 'To the next move — AI advises, people decide.',
    },
    alt: {
      count: 'CCTV view of footfall flowing through a store hall',
      insight: 'Store dwell and flow heatmap analysis screen',
      care: 'Store anomaly detection screen',
      agent: 'Store operations recommendation (AI POP) screen',
    },
  },
  jp: {
    eyebrow: 'Products',
    heading: 'ひとつの運営ループ、3つのモード',
    sub: '今を検知し、昨日を分析し、次を提案する。機能はその3つを横断します。',
    cta: '製品をすべて見る',
    taglines: { count: '流れを数える', insight: solutionTaglines.insight.jp, care: solutionTaglines.care.jp, agent: solutionTaglines.agent.jp },
    desc: {
      count: '店頭を通った人と入った人 — 流入率で商圏を読みます。',
      insight: '売上の先 — 滞在・動線・転換をヒートマップで。',
      care: '必要な瞬間だけ — 異常を検知し、リアルタイムで通知。',
      agent: '次の一手まで — 推奨はAI、決定は人。',
    },
    alt: {
      count: '店舗ホールの人の流れを映したCCTV画面',
      insight: '店舗の滞在・動線ヒートマップ分析画面',
      care: '店舗の異常検知画面',
      agent: '店舗運営の提案（AI POP）画面',
    },
  },
};

export default function FeatureCarousel({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const promise = saaiPromiseLayer[locale];
  const reduced = usePrefersReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const { step, goTo, hoverProps } = useMockupLoop({ steps: PRODUCTS.length, interval: 3600, active: isVisible, pauseOnHover: true });
  const active = PRODUCTS[step];

  const handleMouseMove = useCallback(
    ({ currentTarget, clientX, clientY }: MouseEvent) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    },
    [mouseX, mouseY],
  );

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, color-mix(in oklab, var(--color-primary) 16%, transparent), transparent 80%)`;
  const swap = (x: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, x },
    animate: { opacity: 1, x: 0 },
    exit: reduced ? { opacity: 0 } : { opacity: 0, x: -x },
    transition: { duration: reduced ? 0.15 : 0.4, ease: [0.23, 1, 0.32, 1] as const },
  });

  return (
    <Section variant="default" className="overflow-hidden">
      <Container>
        {/* Promise layer — S·A·A·I four pillars (lineup reorg §4). The common foundation
            every product stands on (a parallel "asset map", distinct from the ordered
            operating loop below); each pillar links to the tech that proves it (§13). */}
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <Eyebrow className="mb-3">{promise.eyebrow}</Eyebrow>
          <h2 className="mb-4 font-display text-3xl font-bold text-gray-900 break-keep sm:text-4xl">{promise.heading}</h2>
          <p className="text-base leading-relaxed text-gray-600 break-keep">{promise.sub}</p>
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {promise.pillars.map((pil) => (
              <Link
                key={pil.key}
                href={localeHref(locale, pil.tech)}
                className="group/pill flex flex-col rounded-2xl border border-gray-200 bg-white p-5 text-left transition-colors hover:border-primary-light hover:bg-primary-lighter/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <span className="mb-2 inline-flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">{pil.letter}</span>
                  <span className="text-sm font-bold text-gray-900">{pil.label}</span>
                </span>
                <span className="text-xs leading-relaxed text-gray-500 break-keep">{pil.promise}</span>
                <ArrowRight
                  className="mt-3 h-3.5 w-3.5 text-primary opacity-0 transition-opacity group-hover/pill:opacity-100"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Bridge — promise layer → product layer (§6) */}
        <p className="mx-auto mb-12 max-w-xl text-center text-sm font-semibold tracking-wide text-primary break-keep">
          {promise.bridge}
        </p>

        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Eyebrow className="mb-3">{t.eyebrow}</Eyebrow>
          <h2 className="mb-4 font-display text-3xl font-bold text-gray-900 break-keep sm:text-4xl">{t.heading}</h2>
          <p className="text-lg leading-relaxed text-gray-600 break-keep">{t.sub}</p>
        </div>

        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          {...hoverProps}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_e, info: PanInfo) => {
            const { offset, velocity } = info;
            if (offset.x < -60 || velocity.x < -400) goTo((step + 1) % PRODUCTS.length);
            else if (offset.x > 60 || velocity.x > 400) goTo((step - 1 + PRODUCTS.length) % PRODUCTS.length);
          }}
          className="group relative touch-pan-y overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-card sm:p-10"
        >
          {/* mouse spotlight (desktop hover only) */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: spotlight }}
          />

          {/* progress nav */}
          <nav aria-label="Products" className="relative z-10 mb-8 flex flex-wrap gap-2">
            {PRODUCTS.map((p, i) => {
              const isActive = i === step;
              const isDone = step > i;
              const Icon = p.icon;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-bold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
                    isActive ? 'text-white' : isDone ? 'bg-white/10 text-white' : 'bg-white/5 text-slate-400 hover:text-slate-200',
                  )}
                >
                  {isActive && <SlidingIndicator layoutId="carousel-pill" className="absolute inset-0 rounded-full bg-primary" />}
                  <span className="relative z-10 flex h-4 w-4 items-center justify-center">
                    {isDone ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
                  </span>
                  <span className="relative z-10">{p.saaiName ?? p.name}</span>
                </button>
              );
            })}
          </nav>

          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* copy */}
            <div className="min-h-[180px]">
              <AnimatePresence mode="wait">
                <motion.div key={active.key} {...swap(-24)}>
                  <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-2xs font-bold uppercase tracking-wider text-primary-light">
                    {stageLabel(active.mode, locale)}
                  </p>
                  <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">
                    {active.mode ? (active.saaiName ?? active.name) : active.name}
                  </h3>
                  {/* Secondary store-label pill only when the heading shows the saai name
                      (mode slides); for the count slide the heading is already the store
                      name, so the pill would duplicate it. */}
                  {active.mode && active.saaiName && (
                    <p className="mt-1.5">
                      <span className="inline-block rounded bg-white/10 px-2 py-0.5 text-2xs font-medium lowercase text-slate-300">{active.name}</span>
                    </p>
                  )}
                  <p className="mt-2 text-lg font-medium text-primary-light break-keep">{t.taglines[active.key]}</p>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-slate-300 break-keep">{t.desc[active.key]}</p>
                  <Link
                    href={localeHref(locale, active.href)}
                    className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    {active.saaiName ?? active.name} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* image panel */}
            <div className="relative aspect-[4/3] w-full">
              <AnimatePresence mode="wait">
                <motion.div key={active.key} className="absolute inset-0" {...swap(28)}>
                  <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-800/50 shadow-card">
                    <Image
                      src={active.images[0].src}
                      alt={t.alt[active.key]}
                      fill
                      sizes="(min-width: 1024px) 520px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  {active.images[1] && (
                    <motion.div
                      className="absolute -bottom-4 -right-3 w-2/5 overflow-hidden rounded-xl border border-white/15 bg-slate-800 shadow-card sm:-bottom-5 sm:-right-5"
                      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: reduced ? 0.15 : 0.45, delay: reduced ? 0 : 0.12, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={active.images[1].src}
                          alt={t.alt[active.key]}
                          fill
                          sizes="220px"
                          className="object-cover"
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <Link href={localeHref(locale, '/products')} className="btn-primary btn-lg gap-2 rounded-xl">
            {t.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
