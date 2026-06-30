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
import { solutionTaglines } from '@/lib/brand-canon';
import { springTabPill } from '@/lib/spring-config';
import { cn } from '@/lib/cn';

/**
 * FeatureCarousel — the home "products at a glance" showcase (replaces ProductPreview).
 * A dark spotlight card auto-cycles the four products around the operating loop
 * (count → insight → care → agent), each with its tagline + a floating product
 * visual. Pattern adapted from the cult-ui feature carousel to our design system:
 * useMockupLoop drive (pause-on-hover, reduced-motion holds step 1), brand-blue
 * (--color-primary) spotlight, real product imagery, KO/EN/JP.
 */

type ProductStruct = {
  key: 'count' | 'insight' | 'care' | 'agent';
  name: string;        // brand name (locale-invariant, lowercase)
  stage: string;       // operating-loop stage (locale-invariant)
  icon: LucideIcon;
  href: string;
  images: { src: string; primary?: boolean }[];
};

const PRODUCTS: ProductStruct[] = [
  {
    key: 'count', name: 'store count', stage: 'Measure', icon: DoorOpen, href: '/products/store-count',
    images: [{ src: '/images/cctv/cctv-cafe-hall.webp', primary: true }],
  },
  {
    key: 'insight', name: 'store insight', stage: 'Analyze', icon: Grid3x3, href: '/products/store-insight',
    images: [{ src: '/images/storeinsight-heatmap.webp', primary: true }, { src: '/images/storeinsight-case1-chart.webp' }],
  },
  {
    key: 'care', name: 'store care', stage: 'Detect', icon: Radar, href: '/products/store-care',
    images: [{ src: '/images/storecare-contamination-detection.webp', primary: true }, { src: '/images/storecare-fridge-door-open.webp' }],
  },
  {
    key: 'agent', name: 'store agent', stage: 'Act', icon: ClipboardCheck, href: '/products/store-agent',
    images: [{ src: '/images/storeagent-ai-pop-mockup.webp', primary: true }],
  },
];

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
    heading: '하나의 운영 루프, 네 개의 제품',
    sub: '문 밖의 흐름부터 다음 한 수까지 — SAAI가 익명으로 잇습니다.',
    cta: '제품 전체 보기',
    taglines: { count: '흐름을 재다', insight: solutionTaglines.insight.ko, care: solutionTaglines.care.ko, agent: solutionTaglines.agent.ko },
    desc: {
      count: '문 앞을 지난 사람과 들어온 사람 — 흡인율로 상권을 읽습니다.',
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
    heading: 'One operating loop, four products',
    sub: 'From the footfall outside to the next move — anonymously connected by SAAI.',
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
    heading: 'ひとつの運営ループ、四つの製品',
    sub: '店外の流れから次の一手まで — SAAIが匿名でつなぎます。',
    cta: '製品をすべて見る',
    taglines: { count: '流れを数える', insight: solutionTaglines.insight.jp, care: solutionTaglines.care.jp, agent: solutionTaglines.agent.jp },
    desc: {
      count: '店頭を通った人と入った人 — 捕捉率で商圏を読みます。',
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
                  {isActive && (
                    <motion.span
                      layoutId="carousel-pill"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={springTabPill}
                    />
                  )}
                  <span className="relative z-10 flex h-4 w-4 items-center justify-center">
                    {isDone ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
                  </span>
                  <span className="relative z-10">{p.name}</span>
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
                    {active.stage}
                  </p>
                  <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">{active.name}</h3>
                  <p className="mt-2 text-lg font-medium text-primary-light break-keep">{t.taglines[active.key]}</p>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-slate-300 break-keep">{t.desc[active.key]}</p>
                  <Link
                    href={localeHref(locale, active.href)}
                    className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    {active.name} <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
