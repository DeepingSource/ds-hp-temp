'use client';

import { useCallback, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import {
  AnimatePresence, motion, useMotionTemplate, useMotionValue, type PanInfo,
} from 'framer-motion';
import { DoorOpen, Grid3x3, Radar, ClipboardCheck, ArrowRight, type LucideIcon } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import PlanSteps from './PlanSteps';
import ProductMiniScreen from './FeatureScreens';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { localeHref, type Locale } from '@/lib/i18n';
import { solutionTaglines, productNaming, type ModeKey } from '@/lib/brand-canon';
import { cn } from '@/lib/cn';

/**
 * FeatureCarousel — the home "products at a glance" showcase (replaces ProductPreview).
 * A dark spotlight card auto-cycles the three modes around the operating loop
 * (care → insight → agent), then the count function, each with its tagline + a
 * mini product screen (FeatureScreens — OperatingLoopDemo 문법의 다크 고도화판).
 * Pattern adapted from the cult-ui feature carousel to our design system:
 * useMockupLoop drive (pause-on-hover, reduced-motion holds step 1), brand-blue
 * (--color-primary) spotlight, KO/EN/JP.
 */

type ProductStruct = {
  key: ModeKey | 'count';
  name: string;
  saaiName?: string;
  mode?: ModeKey;
  icon: LucideIcon;
  href: string;
};

const PRODUCTS: ProductStruct[] = [
  {
    key: 'care',
    name: productNaming.care.store,
    saaiName: productNaming.care.saai,
    mode: 'care',
    icon: Radar,
    href: '/products/saai-care',
  },
  {
    key: 'insight',
    name: productNaming.insight.store,
    saaiName: productNaming.insight.saai,
    mode: 'insight',
    icon: Grid3x3,
    href: '/products/saai-insight',
  },
  {
    key: 'agent',
    name: productNaming.agent.store,
    saaiName: productNaming.agent.saai,
    mode: 'agent',
    icon: ClipboardCheck,
    href: '/products/saai-agent',
  },
  {
    key: 'count',
    name: productNaming.count.store,
    saaiName: productNaming.count.saai,
    icon: DoorOpen,
    href: '/products/store-count',
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
  }
> = {
  ko: {
    eyebrow: 'SAAI SUITE · 한눈에 보는 솔루션',
    heading: '세 제품, 하나의 흐름.',
    sub: '세 제품이 매장의 어제·지금·다음을 나눠 맡습니다.',
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
  },
  en: {
    eyebrow: 'SAAI SUITE · SOLUTIONS AT A GLANCE',
    heading: 'Three products, one unified flow.',
    sub: "Three products split the work — your store's yesterday, right now, and next.",
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
  },
  jp: {
    eyebrow: 'SAAI SUITE · 一覧で見るソリューション',
    heading: '三つの製品、ひとつの流れ。',
    sub: '三つの製品が、店舗の昨日・今・次を分担します。',
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
  const { ref: sectionRef, isVisible: sectionShow } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  // 방문자가 탭/스와이프로 직접 고른 뒤에는 자동 순환을 멈춘다
  const [manual, setManual] = useState(false);
  const { step, hoverProps, goTo } = useMockupLoop({
    steps: PRODUCTS.length,
    interval: 3800,
    active: sectionShow && !manual,
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

  const selectStep = useCallback((i: number) => {
    setManual(true);
    goTo(i);
  }, [goTo]);

  const handleDragEnd = useCallback((_: unknown, info: PanInfo) => {
    const SWIPE_PX = 60;
    if (info.offset.x < -SWIPE_PX) selectStep(step + 1);
    else if (info.offset.x > SWIPE_PX) selectStep(step - 1);
  }, [selectStep, step]);

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

        <div id="plan-section" className="mb-12">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <Eyebrow className="mb-3">{locale === 'ko' ? '계획 & 작동 방식' : locale === 'jp' ? '計画と仕組み' : 'Plan & Operation'}</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 break-keep sm:text-4xl">
              {locale === 'ko' ? '복잡함 없이 3단계로 시작합니다' : locale === 'jp' ? '複雑さなし、3ステップで開始' : 'Simple 3-step operation loop'}
            </h2>
          </div>
          <PlanSteps locale={locale} />
        </div>

        <motion.div
          onMouseMove={handleMouseMove}
          {...hoverProps}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={handleDragEnd}
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
                  onClick={() => selectStep(i)}
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
                    {active.saaiName ?? active.name}
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

            {/* mini product screen panel — 고정 4/3 캔버스 대신 콘텐츠 높이(min-h 홀드)로,
                폰 목업 스필·잘림(구 agent 슬라이드) 원인을 제거한다 */}
            <div className="relative flex min-h-[300px] w-full items-center justify-center lg:col-span-6 lg:min-h-[340px]">
              <AnimatePresence mode="wait">
                <motion.div key={active.key} {...swap(28)} className="flex w-full justify-center">
                  <ProductMiniScreen product={active.key} locale={locale} />
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
