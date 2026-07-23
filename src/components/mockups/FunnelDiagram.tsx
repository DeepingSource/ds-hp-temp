'use client';

import { motion } from 'framer-motion';
import MockupBadge from './MockupBadge';
import SaaiHeader from './SaaiHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useCountUp } from '@/hooks/useCountUp';
import type { Locale } from '@/lib/i18n';
import { canonicalFunnel, canonicalStore } from '@/data/mockup-scenarios/canonical';
import { type DeepPartial, mergeMockupContent } from './types';

/**
 * New-product DISPLAY funnel for StoreInsight (#4) — 신상품 매대 단위 퍼널.
 * This is NOT store-wide purchase conversion. Each stage measures the
 * funnel at the new-product shelf: people passing → stopping → gazing →
 * picking up → buying. The bottom (buy) is the 매대 전환율 (display pick-up
 * /buy rate), matching canonicalStore.conversionRate (23%).
 *
 * Counts derive from canonicalFunnel (base × ratio, rounded) by default, so
 * the 23% drives the bottom of the funnel:
 *   visit 342 → stay 270 → gaze 181 → pick 109 → buy 79
 * Largest single drop is stay→gaze (270→181, −89, ~33%), so 응시 stage is
 * the highlighted bottleneck. A caller can override this whole shape via the
 * `data` prop to reuse this component for a different funnel/store context —
 * see FunnelData below and docs/MOCKUP_SYSTEM_GUIDE.md §2.
 */
const { ratios, base } = canonicalFunnel;
const DEFAULT_TOP = base; // 342
const DEFAULT_STAGE_COUNTS = [
  Math.round(base * ratios.visit), // 342
  Math.round(base * ratios.stay), // 270
  Math.round(base * ratios.gaze), // 181
  Math.round(base * ratios.pick), // 109
  Math.round(base * ratios.buy), // 79
] as const;
const DEFAULT_BOTTLENECK_INDEX = 2; // gaze: stage entered after the largest drop-off

// buy as a share of visits = 매대 전환율 (display pick-up/buy rate, not purchase conversion)
const DEFAULT_BUY_PCT = Math.round(ratios.buy * 100); // 23

/**
 * 퍼널 수치 오버라이드 단위 — 통째 교체(부분 병합 아님). 다른 매대/제품/스토어
 * 컨텍스트에 이 컴포넌트를 재사용할 때 canonical 파생값 대신 이걸 넘긴다.
 * `counts`는 반드시 5개(방문→체류→응시→집어듦→구매)여야 한다 — `content.stages`도
 * 같은 개수를 유지해야 라벨과 수치가 어긋나지 않는다.
 */
export interface FunnelData {
  /** 단계별 카운트, 내림차순 5개 — counts[0]이 분모(TOP)가 된다 */
  counts: readonly [number, number, number, number, number];
  /** 가장 이탈이 큰 단계의 인덱스(0~4) — 강조 표시 대상 */
  bottleneckIndex: number;
  /** 하단에 크게 보여줄 전환율(%) — counts에서 자동 계산하지 않고 명시적으로 받는다
   *  (매대 전환율처럼 counts 마지막 값과 다른 분모를 쓰는 지표가 있을 수 있어서) */
  conversionPct: number;
}

const DEFAULT_FUNNEL_DATA: FunnelData = {
  counts: DEFAULT_STAGE_COUNTS,
  bottleneckIndex: DEFAULT_BOTTLENECK_INDEX,
  conversionPct: DEFAULT_BUY_PCT,
};

type StageCopy = { label: string };
export interface FunnelDiagramCopy {
  bluf: string;
  subtitle: string;
  badge: string;
  totalLabel: string;
  unit: string;
  dropUnit: string; // "left" suffix for drop-off branches
  convLabel: string;
  ofVisits: string;
  bottleneck: string;
  hypTitle: string;
  hypBody: string;
  stages: [StageCopy, StageCopy, StageCopy, StageCopy, StageCopy];
}

const COPY: Record<Locale, FunnelDiagramCopy> = {
  ko: {
    bluf: '체류 고객 3명 중 1명이 응시 전에 떠납니다',
    subtitle: '신상품 매대 기준 · 매대 앞 고객 동선',
    badge: '예시 화면',
    totalLabel: '매대 앞을 지남',
    unit: '명',
    dropUnit: '명 이탈',
    convLabel: '매대 전환율',
    ofVisits: '매대 앞 대비',
    bottleneck: '최대 이탈',
    hypTitle: '인사이트 가설',
    hypBody:
      '가설: 체류→응시 단계에서 이탈이 가장 큽니다 — 매대 위치나 동선 때문일 수 있습니다 → 검증하려면 해당 매대 진열을 1주 바꿔 응시 전환율을 비교하세요.',
    stages: [
      { label: '방문 (앞을 지남)' },
      { label: '체류 (멈춤)' },
      { label: '응시 (바라봄)' },
      { label: '집어듦' },
      { label: '구매' },
    ],
  },
  en: {
    bluf: '1 in 3 shoppers who stop leave before they look',
    subtitle: 'New-product display · shopper flow at the shelf',
    badge: 'Sample view',
    totalLabel: 'Passed the display',
    unit: '',
    dropUnit: ' left',
    convLabel: 'Display pick-up rate',
    ofVisits: 'of passers-by',
    bottleneck: 'Biggest drop',
    hypTitle: 'Insight hypothesis',
    hypBody:
      'Hypothesis: the largest drop is at stay → gaze — likely shelf placement or traffic flow → to test, change that display for one week and compare the gaze conversion.',
    stages: [
      { label: 'Pass by' },
      { label: 'Stop' },
      { label: 'Gaze' },
      { label: 'Pick up' },
      { label: 'Buy' },
    ],
  },
  jp: {
    bluf: '滞在した3人に1人が注目する前に離れます',
    subtitle: '新商品棚ベース · 棚前の客動線',
    badge: 'サンプル画面',
    totalLabel: '棚前を通過',
    unit: '名',
    dropUnit: '名が離脱',
    convLabel: '棚転換率',
    ofVisits: '通過者比',
    bottleneck: '最大の離脱',
    hypTitle: 'インサイト仮説',
    hypBody:
      '仮説：滞在→注目の段階で離脱が最も大きいです — 棚の位置や動線が原因かもしれません → 検証するには、その棚の陳列を1週間変えて注目転換率を比較してください。',
    stages: [
      { label: '通過 (前を通る)' },
      { label: '滞在 (立ち止まる)' },
      { label: '注目 (見る)' },
      { label: '手に取る' },
      { label: '購入' },
    ],
  },
};

interface Props {
  active?: boolean;
  locale?: Locale;
  className?: string;
  /** 문구 오버라이드 — 부분 병합(mergeMockupContent). 기본: COPY[locale] */
  content?: DeepPartial<FunnelDiagramCopy>;
  /** 퍼널 수치 오버라이드 — 통째 교체. 기본: canonicalFunnel 파생 (위 DEFAULT_FUNNEL_DATA) */
  data?: FunnelData;
}

function StageRow({
  label,
  count,
  widthPct,
  dropOff,
  dropUnit,
  isBottleneck,
  bottleneckLabel,
  index,
  animate,
}: {
  label: string;
  count: number;
  widthPct: number;
  dropOff: number;
  dropUnit: string;
  isBottleneck: boolean;
  bottleneckLabel: string;
  index: number;
  animate: boolean;
}) {
  return (
    <li>
      {/* Stage header: label + count */}
      <div className="flex items-baseline justify-between mb-1">
        <span
          className={`text-sm font-medium ${
            isBottleneck ? 'text-primary' : 'text-gray-800'
          }`}
        >
          {label}
        </span>
        <span className="text-sm font-bold tabular-nums text-gray-900">
          {count.toLocaleString('en-US')}
        </span>
      </div>

      {/* Centered trapezoid bar + drop-off annotation */}
      <div className="flex items-center gap-2">
        {/* Funnel track — bar is horizontally centered, width = stage ratio */}
        <div className="flex-1 min-w-0 flex justify-center">
          <motion.div
            className={`h-7 rounded-md ${
              isBottleneck ? 'bg-primary' : 'bg-gray-300'
            }`}
            aria-hidden="true"
            initial={animate ? { width: '0%' } : false}
            animate={{ width: `${widthPct}%` }}
            transition={
              animate
                ? { duration: 0.5, ease: 'easeOut', delay: index * 0.12 }
                : { duration: 0 }
            }
          />
        </div>

        {/* Drop-off branch */}
        <div className="w-20 shrink-0">
          {dropOff > 0 ? (
            <div
              className={`flex items-center gap-1 text-2xs leading-tight ${
                isBottleneck ? 'text-primary font-medium' : 'text-gray-400'
              }`}
            >
              <span aria-hidden="true">↘</span>
              <span className="tabular-nums">
                {dropOff.toLocaleString('en-US')}
                {dropUnit}
              </span>
            </div>
          ) : (
            <span className="text-2xs text-transparent select-none">·</span>
          )}
          {isBottleneck && (
            /* 9px는 DESIGN.md 마이크로 타입 스케일(2xs/3xs/4xs)에 없는 임의값이라
               가장 가까운 토큰인 text-3xs(10px)로 교체 — 시각 차이는 미미하다. */
            <span className="mt-0.5 inline-block w-fit rounded-sm border border-primary px-1 text-3xs font-bold uppercase tracking-wide text-primary">
              {bottleneckLabel}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

export default function FunnelDiagram({
  active = true,
  locale = 'en',
  className = '',
  content,
  data,
}: Props) {
  const t = mergeMockupContent(COPY[locale] ?? COPY.en, content);
  const funnelData = data ?? DEFAULT_FUNNEL_DATA;
  const TOP = funnelData.counts[0];
  const reducedMotion = usePrefersReducedMotion();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const shouldAnimate = isVisible && active && !reducedMotion;

  const conv = useCountUp(funnelData.conversionPct, isVisible && active, 1400);
  const convDisplay = reducedMotion ? funnelData.conversionPct : conv;

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-card ${className}`}
    >
      <MockupBadge label={t.badge} />

      {/* BLUF title */}
      <header className="mb-4 pr-16">
        <SaaiHeader name="store insight" tone="light" className="mb-1.5" />
        <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
          {t.bluf}
        </h3>
        <p className="mt-1 text-2xs font-medium uppercase tracking-wide text-primary">
          {t.subtitle}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {t.totalLabel}: <span className="tabular-nums font-medium text-gray-700">{TOP.toLocaleString('en-US')}{t.unit}</span>
        </p>
      </header>

      {/* Funnel */}
      <ol className="space-y-2.5">
        {funnelData.counts.map((count, i) => {
          const prev = i === 0 ? count : funnelData.counts[i - 1];
          const dropOff = i === 0 ? 0 : prev - count;
          const widthPct = (count / TOP) * 100;
          const isBottleneck = i === funnelData.bottleneckIndex;
          return (
            <StageRow
              key={t.stages[i]?.label ?? i}
              label={t.stages[i]?.label ?? ''}
              count={count}
              widthPct={widthPct}
              dropOff={dropOff}
              dropUnit={t.dropUnit}
              isBottleneck={isBottleneck}
              bottleneckLabel={t.bottleneck}
              index={i}
              animate={shouldAnimate}
            />
          );
        })}
      </ol>

      {/* Conversion summary */}
      <div className="mt-4 flex items-baseline gap-2 border-t border-gray-100 pt-3">
        <span className="text-2xl font-bold tabular-nums text-primary">
          {convDisplay}%
        </span>
        <span className="text-xs text-gray-500">
          {t.convLabel} · {t.ofVisits}
        </span>
      </div>

      {/* Hypothesis card (Insight voice) */}
      <div className="mt-4 rounded-xl border-l-2 border-primary bg-gray-50 p-3.5">
        <p className="text-2xs font-bold uppercase tracking-wide text-primary">
          {t.hypTitle}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-gray-700">
          {t.hypBody}
        </p>
      </div>
    </div>
  );
}
