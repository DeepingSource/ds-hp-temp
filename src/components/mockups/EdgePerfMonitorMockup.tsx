'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n';
import { useCountUp } from '@/hooks/useCountUp';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import MockupBadge from './MockupBadge';
import SaaiHeader from './SaaiHeader';
import { canonicalEdge } from '@/data/mockup-scenarios/canonical';

const COPY: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    fps: string;
    latency: string;
    bandwidth: string;
    fpsUnit: string;
    latencyUnit: string;
    bandwidthUnit: string;
    onTarget: string;
    lowerBetter: string;
    sparkTitle: string;
    sparkDesc: string;
    sparkLabel: string;
    sparkAxis: string;
    banner: string;
    live: string;
  }
> = {
  ko: {
    title: '온디바이스 성능 모니터',
    subtitle: '익명화 엔진 · 실시간',
    fps: '처리 속도',
    latency: '지연 시간',
    bandwidth: '대역폭 절감',
    fpsUnit: 'fps',
    latencyUnit: 'ms',
    bandwidthUnit: '%',
    onTarget: '목표 달성',
    lowerBetter: '낮을수록 좋음',
    sparkTitle: '24시간 처리량 추이',
    sparkDesc: '지난 24시간 동안의 시간당 처리량을 나타내는 스파크라인 그래프입니다.',
    sparkLabel: '24시간 처리량',
    sparkAxis: '24시간 전 → 현재',
    banner: '원본 영상은 장치를 떠나지 않습니다',
    live: '실시간',
  },
  en: {
    title: 'On-device performance monitor',
    subtitle: 'Anonymizer engine · live',
    fps: 'Throughput',
    latency: 'Latency',
    bandwidth: 'Bandwidth saved',
    fpsUnit: 'fps',
    latencyUnit: 'ms',
    bandwidthUnit: '%',
    onTarget: 'on target',
    lowerBetter: 'lower = better',
    sparkTitle: '24h throughput trend',
    sparkDesc: 'Sparkline of hourly throughput over the last 24 hours.',
    sparkLabel: '24h throughput',
    sparkAxis: '24h ago → now',
    banner: 'Raw video never leaves the device',
    live: 'live',
  },
  jp: {
    title: 'オンデバイス性能モニター',
    subtitle: '匿名化エンジン · リアルタイム',
    fps: '処理速度',
    latency: '遅延',
    bandwidth: '帯域削減',
    fpsUnit: 'fps',
    latencyUnit: 'ms',
    bandwidthUnit: '%',
    onTarget: '目標達成',
    lowerBetter: '低いほど良い',
    sparkTitle: '24時間スループット推移',
    sparkDesc: '過去24時間の1時間ごとのスループットを示すスパークラインです。',
    sparkLabel: '24時間スループット',
    sparkAxis: '24時間前 → 現在',
    banner: '元の映像は端末から出ません',
    live: 'リアルタイム',
  },
};

// Deterministic 24h throughput series (SSR-safe — no Math.random at render).
const SPARK_DATA = [
  62, 64, 61, 58, 60, 66, 71, 78, 84, 88, 90, 87, 83, 86, 91, 94, 92, 89, 85,
  82, 79, 81, 86, 90,
];

const SPARK_W = 320;
const SPARK_H = 64;

function buildPoints(data: number[], w: number, h: number, pad = 4): string {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const innerH = h - pad * 2;
  const step = data.length > 1 ? w / (data.length - 1) : w;
  return data
    .map((v, i) => {
      const x = i * step;
      const y = pad + innerH - ((v - min) / range) * innerH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

// Inputs are all module constants → compute once, not per render.
const SPARK_POINTS = buildPoints(SPARK_DATA, SPARK_W, SPARK_H);

function Gauge({
  label,
  value,
  unit,
  ratio,
  hint,
}: {
  label: string;
  value: number;
  unit: string;
  ratio: number; // 0..1 fill fraction
  hint?: string; // direction-intuition label (e.g. "on target" / "lower = better")
}) {
  const pct = Math.max(0, Math.min(1, ratio)) * 100;
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-mono text-3xs uppercase tracking-wider text-gray-400 truncate">
          {label}
        </span>
        <span className="font-mono text-3xs text-gray-500">{unit}</span>
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="font-mono text-2xl font-semibold tabular-nums text-white">
          {value}
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      {hint && (
        <span className="mt-1 block font-mono text-[9px] leading-none text-gray-500">
          {hint}
        </span>
      )}
    </div>
  );
}

export default function EdgePerfMonitorMockup({
  active = true,
  locale = 'en',
  className = '',
}: {
  active?: boolean;
  locale?: Locale;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const t = COPY[locale] ?? COPY.en;
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
  });
  const run = isVisible && active;

  const FPS_TARGET = canonicalEdge.fpsTarget; // 30 — gauge denominator (on-target reads near-full)
  const LATENCY_TARGET = canonicalEdge.latencyMs; // 28
  const BANDWIDTH_TARGET = canonicalEdge.bandwidthSavedPct; // 92

  const fps = useCountUp(FPS_TARGET, run, 1100);
  const latency = useCountUp(LATENCY_TARGET, run, 1100);
  const bandwidth = useCountUp(BANDWIDTH_TARGET, run, 1300);

  // Subtle live tick on the FPS value only (reduced-motion safe, static otherwise).
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!run || reducedMotion) return;
    const id = setInterval(() => {
      setTick((prev) => (prev + 1) % 3);
    }, 1400);
    return () => clearInterval(id);
  }, [run, reducedMotion]);

  const liveFps =
    fps >= FPS_TARGET && !reducedMotion ? FPS_TARGET + (tick - 1) : fps;

  const points = SPARK_POINTS;
  const lastX = SPARK_W;
  const lastVal = SPARK_DATA[SPARK_DATA.length - 1];
  const minV = Math.min(...SPARK_DATA);
  const maxV = Math.max(...SPARK_DATA);
  const lastY = 4 + (SPARK_H - 8) - ((lastVal - minV) / (maxV - minV)) * (SPARK_H - 8);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-5 text-white ${className}`}
    >
      <MockupBadge locale={locale} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <SaaiHeader name="anonymizer" tone="dark" className="mb-1.5" />
          <h3 className="font-mono text-sm font-semibold text-white">
            {t.title}
          </h3>
          <p className="font-mono text-3xs text-gray-400">{t.subtitle}</p>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-3xs uppercase tracking-wider text-primary">
          <span className="relative flex h-2 w-2">
            {run && !reducedMotion && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {t.live}
        </span>
      </div>

      {/* Gauges */}
      <div className="mt-5 flex gap-4">
        <Gauge
          label={t.fps}
          value={liveFps}
          unit={t.fpsUnit}
          ratio={fps / FPS_TARGET}
          hint={t.onTarget}
        />
        <Gauge
          label={t.latency}
          value={latency}
          unit={t.latencyUnit}
          ratio={1 - latency / 100}
          hint={t.lowerBetter}
        />
        <Gauge
          label={t.bandwidth}
          value={bandwidth}
          unit={t.bandwidthUnit}
          ratio={bandwidth / 100}
        />
      </div>

      {/* Sparkline */}
      <div className="mt-5">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="font-mono text-3xs uppercase tracking-wider text-gray-400">
            {t.sparkLabel}
          </span>
          <span className="font-mono text-3xs text-gray-600">
            {t.sparkAxis}
          </span>
        </div>
        <svg
          viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
          width="100%"
          height={SPARK_H}
          role="img"
          aria-label={t.sparkTitle}
          className="overflow-visible"
        >
          <title>{t.sparkTitle}</title>
          <desc>{t.sparkDesc}</desc>
          <defs>
            <linearGradient id="edgeSparkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#376AE2" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#376AE2" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <polygon
            points={`0,${SPARK_H} ${points} ${SPARK_W},${SPARK_H}`}
            fill="url(#edgeSparkFill)"
          />
          <motion.polyline
            points={points}
            fill="none"
            stroke="#376AE2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reducedMotion ? false : { pathLength: 0 }}
            animate={run && !reducedMotion ? { pathLength: 1 } : undefined}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          <circle cx={lastX} cy={lastY} r="3" fill="#376AE2" />
        </svg>
      </div>

      {/* Fixed privacy banner */}
      <div className="mt-5 flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2.5">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#376AE2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="shrink-0"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <p className="font-mono text-xs font-medium text-primary">{t.banner}</p>
      </div>
    </div>
  );
}
