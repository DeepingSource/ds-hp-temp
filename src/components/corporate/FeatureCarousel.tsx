'use client';

import { useCallback, type MouseEvent } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import {
  AnimatePresence, motion, useMotionTemplate, useMotionValue, type PanInfo,
} from 'framer-motion';
import { DoorOpen, Grid3x3, Radar, ClipboardCheck, ArrowRight, type LucideIcon } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { localeHref, type Locale } from '@/lib/i18n';
import { solutionTaglines, saaiPromiseLayer, productNaming, type ModeKey } from '@/lib/brand-canon';
import { cn } from '@/lib/cn';

const IntegratedLoopDiagram = dynamic(() => import('@/components/mockups/IntegratedLoopDiagram'), {
  loading: () => <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />,
});

const ActionCardMockup = dynamic(() => import('@/components/mockups/ActionCardMockup'), {
  loading: () => <div className="h-64 animate-pulse rounded-2xl bg-slate-800/40" />,
});

/**
 * FeatureCarousel — the home "products at a glance" showcase (replaces ProductPreview).
 * A dark spotlight card auto-cycles the three modes around the operating loop
 * (care → insight → agent), then the count function, each with its tagline + a
 * floating visual. Pattern adapted from the cult-ui feature carousel to our design system:
 * useMockupLoop drive (pause-on-hover, reduced-motion holds step 1), brand-blue
 * (--color-primary) spotlight, real product imagery, KO/EN/JP.
 */

type ProductStruct = {
  key: ModeKey | 'count';
  name: string;
  saaiName?: string;
  mode?: ModeKey;
  icon: LucideIcon;
  href: string;
  images: { src: string; primary?: boolean }[];
};

const PRODUCTS: ProductStruct[] = [
  {
    key: 'care',
    name: productNaming.care.store,
    saaiName: productNaming.care.saai,
    mode: 'care',
    icon: Radar,
    href: '/products/saai-care',
    images: [{ src: '/images/storecare-privacy.webp', primary: true }],
  },
  {
    key: 'insight',
    name: productNaming.insight.store,
    saaiName: productNaming.insight.saai,
    mode: 'insight',
    icon: Grid3x3,
    href: '/products/saai-insight',
    images: [
      { src: '/images/storeinsight-dwell-chart.webp', primary: true },
      { src: '/images/storeinsight-product-interaction.webp' },
    ],
  },
  {
    key: 'agent',
    name: productNaming.agent.store,
    saaiName: productNaming.agent.saai,
    mode: 'agent',
    icon: ClipboardCheck,
    href: '/products/saai-agent',
    images: [{ src: '/images/storeagent-ai-pop-mockup.webp', primary: true }],
  },
  {
    key: 'count',
    name: productNaming.count.store,
    icon: DoorOpen,
    href: '/products/store-count',
    images: [{ src: '/images/si-guide/inflow-rate.png', primary: true }],
  },
];

const dict: Record<
  Locale,
  {
    eyebrow: string;
    heading: string;
    sub: string;
    cta: string;
    steps: Record<string, string>;
    taglines: Record<string, string>;
    alt: Record<string, string>;
  }
> = {
  ko: {
    eyebrow: 'SAAI SUITE · 한눈에 보는 솔루션',
    heading: '세 제품, 하나의 흐름.',
    sub: '지켜보고(care) · 읽어내고(insight) · 실행하는(agent) 세 개의 눈이 매장의 하루를 함께 관리합니다.',
    cta: '전체 제품 비교해 보기',
    steps: {
      care: '1단계 · 실시간 감지',
      insight: '2단계 · 데이터 분석',
      agent: '3단계 · 자율 실행',
      count: '유입 분석 모듈',
    },
    taglines: {
      care: solutionTaglines.care.ko,
      insight: solutionTaglines.insight.ko,
      agent: solutionTaglines.agent.ko,
      count: '카메라 1대로 매장 밖 유동인구와 입문 고객을 비교해 유입률을 읽습니다.',
    },
    alt: {
      care: 'saai care — 모니터링 알림 화면',
      insight: 'saai insight — 체류 및 구매전환 동선 분석 대시보드',
      agent: 'saai agent — 실시간 매장 관리 및 AI POP 가이드',
      count: 'store count — 유동인구 대비 입문 전환 분석',
    },
  },
  en: {
    eyebrow: 'SAAI SUITE · SOLUTIONS AT A GLANCE',
    heading: 'Three products, one unified flow.',
    sub: 'Watch (care), read (insight), and act (agent) — three engines guiding your daily operations.',
    cta: 'Compare all products',
    steps: {
      care: 'Step 1 · Live Detection',
      insight: 'Step 2 · Data Insights',
      agent: 'Step 3 · Autonomous Action',
      count: 'Footfall Module',
    },
    taglines: {
      care: solutionTaglines.care.en,
      insight: solutionTaglines.insight.en,
      agent: solutionTaglines.agent.en,
      count: 'One camera reads outside footfall against customer entrance rates.',
    },
    alt: {
      care: 'saai care — monitoring alerts',
      insight: 'saai insight — dwell & pre-purchase flow dashboard',
      agent: 'saai agent — live store management & AI POP guide',
      count: 'store count — capture rate analytics',
    },
  },
  jp: {
    eyebrow: 'SAAI SUITE · 一覧で見るソリューション',
    heading: '三つの製品、ひとつの流れ。',
    sub: '見守り(care)・読み解き(insight)・実行する(agent)三つの目が店舗の一日を管理します。',
    cta: '全製品を比較する',
    steps: {
      care: 'ステップ 1 · リアルタイム検知',
      insight: 'ステップ 2 · データ分析',
      agent: 'ステップ 3 · 自律実行',
      count: '流入分析モジュール',
    },
    taglines: {
      care: solutionTaglines.care.jp,
      insight: solutionTaglines.insight.jp,
      agent: solutionTaglines.agent.jp,
      count: 'カメラ1台で店外の通行と入店を見比べて流入率を読み取ります。',
    },
    alt: {
      care: 'saai care — モニタリング通知画面',
      insight: 'saai insight — 滞在および購買転換動線分析ダッシュボード',
      agent: 'saai agent — リアルタイム店舗管理およびAI POPガイド',
      count: 'store count — 流入転換分析',
    },
  },
};

const swap = (y = 12) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -y },
  transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] as const },
});

export default function FeatureCarousel({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const promise = saaiPromiseLayer[locale];
  const reduced = usePrefersReducedMotion();
  const { ref: sectionRef, isVisible: sectionShow } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  const { step, hoverProps } = useMockupLoop({
    steps: PRODUCTS.length,
    interval: 3800,
    active: sectionShow,
    pauseOnHover: true,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  }, [mouseX, mouseY]);

  const spotlight = useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, rgba(55, 106, 226, 0.18), transparent 80%)`;
  const active = PRODUCTS[step];
  const goTo = (i: number) => {
    // navigate step
  };

  return (
    <Section variant="default" className="overflow-hidden">
      <Container>
        <div ref={sectionRef} className="mx-auto mb-12 max-w-3xl text-center">
          <Eyebrow tone="primary" className="mb-3">{t.eyebrow}</Eyebrow>
          <h2 className="text-3xl font-bold text-gray-900 font-display break-keep sm:text-4xl">
            {t.heading}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-gray-600 break-keep">
            {t.sub}
          </p>
        </div>

        {/* Promise layer — 4 pillars */}
        <div className="mx-auto mb-10 max-w-5xl">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 sm:gap-4">
            {promise.pillars.map((p) => (
              <div key={p.letter + p.label} className="card flex flex-col justify-between p-5 sm:p-6">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 font-mono text-xs font-bold text-primary">
                      {p.letter}
                    </span>
                    <span className="text-2xs font-semibold uppercase tracking-wider text-gray-600">{p.label}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 break-keep sm:text-base">{p.label}</h3>
                  <p className="mt-1.5 text-xs text-gray-600 leading-relaxed break-keep">{p.promise}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bridge — promise layer → product layer (§6) */}
        <p className="mx-auto mb-8 max-w-xl text-center text-sm font-semibold tracking-wide text-primary break-keep">
          {promise.bridge}
        </p>

        {/* Integrated Loop Diagram (Task 1-4) */}
        <div className="mx-auto mb-14 max-w-5xl">
          <IntegratedLoopDiagram locale={locale} />
        </div>

        <div id="plan-section" className="mx-auto mb-12 max-w-3xl text-center">
          <Eyebrow className="mb-3">{locale === 'ko' ? '계획 & 작동 방식' : locale === 'jp' ? '計画と仕組み' : 'Plan & Operation'}</Eyebrow>
          <h2 className="mb-4 font-display text-3xl font-bold text-gray-900 break-keep sm:text-4xl">
            {locale === 'ko' ? '복잡함 없이 3단계로 시작합니다' : locale === 'jp' ? '複雑さなし、3ステップで開始' : 'Simple 3-step operation loop'}
          </h2>
          <div className="text-base sm:text-lg leading-relaxed text-gray-700 break-keep space-y-1.5 font-medium max-w-xl mx-auto text-left sm:text-center">
            <p>{locale === 'ko' ? '① 쓰던 CCTV 그대로 연결' : locale === 'jp' ? '① 既存CCTV接続' : '① Connect existing CCTVs'}</p>
            <p>{locale === 'ko' ? '② 어제를 읽고(insight) · 지금을 알리고(care) · 다음을 실행(agent)' : locale === 'jp' ? '② 過去を分析(insight) · 今を検知(care) · 次を提案(agent)' : '② Analyze past (insight) · detect live (care) · advise next (agent)'}</p>
            <p>{locale === 'ko' ? '③ 본사 한 화면에서 표준화' : locale === 'jp' ? '③ 本部画面で標準化' : '③ Standardize fleet-wide'}</p>
          </div>
        </div>

        <motion.div
          onMouseMove={handleMouseMove}
          {...hoverProps}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          className="group relative touch-pan-y overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-card sm:p-10"
        >
          {/* mouse spotlight */}
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
                    'relative flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all sm:px-4 sm:py-3 sm:text-sm',
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : isDone
                        ? 'bg-white/10 text-gray-200 hover:bg-white/15'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200',
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="break-keep">{p.saaiName ?? p.name}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 rounded-xl bg-primary"
                      style={{ zIndex: -1 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:gap-10 items-center">
            {/* text description */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div key={active.key} {...swap(16)} className="space-y-4">
                  <p className="text-2xs font-bold uppercase tracking-[0.2em] text-primary-light">
                    {t.steps[active.key]}
                  </p>
                  <h3 className="text-2xl font-bold text-white font-display break-keep sm:text-3xl">
                    {active.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300 break-keep sm:text-base">
                    {t.taglines[active.key]}
                  </p>
                  <Link
                    href={localeHref(locale, active.href)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary-light hover:text-white transition-colors pt-2"
                  >
                    {active.saaiName ?? active.name} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* image/mockup panel */}
            <div className="relative aspect-[4/3] w-full">
              <AnimatePresence mode="wait">
                <motion.div key={active.key} className="absolute inset-0" {...swap(28)}>
                  {active.key === 'agent' ? (
                    /* Task 1-5: Live Action Card Mockup for Agent slide */
                    <div className="absolute inset-0 flex items-center justify-center p-2">
                      <div className="w-full max-w-[280px] sm:max-w-[320px] scale-90 sm:scale-95 origin-center">
                        <ActionCardMockup locale={locale} active={active.key === 'agent'} />
                      </div>
                    </div>
                  ) : (
                    <>
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
                    </>
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
