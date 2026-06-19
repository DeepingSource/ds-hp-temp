'use client';

import { motion } from 'framer-motion';
import MockupBadge from './MockupBadge';
import SaaiHeader from './SaaiHeader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { Locale } from '@/lib/i18n';

/**
 * #12 CaseStudyChartMockup (S4) — StoreCare before/after adoption line chart.
 *
 * Real measured case data (sample n=53):
 *   CCTV 확인 시간(main)  45분 → 15분  (−67%)
 *   CCTV 확인 시간(2차)    30분 →  8분  (−73%)
 *   CCTV 확인 횟수         6회 →  3회  (−50%)
 *
 * The main line plots "CCTV 확인 시간(분)" across 8 time points; a vertical
 * "도입 시점(Adoption)" marker sits at the midpoint. Pre-adoption hovers near
 * ~45 min, post-adoption settles at ~15 min — a clear improvement drop.
 */

type Copy = {
  bluf: string;
  badge: string;
  yLabel: string;
  xLabel: string;
  xWeeks: [string, string, string, string, string];
  adoption: string;
  before: string;
  after: string;
  chips: [string, string, string];
  chipNote: string;
  footnote: string;
};

const COPY: Record<Locale, Copy> = {
  ko: {
    bluf: '도입 후 CCTV 확인 67% 단축',
    badge: '실측 사례 데이터',
    yLabel: 'CCTV 확인 시간(분)',
    xLabel: '도입 시점 기준 주차',
    xWeeks: ['−2주', '−1주', '도입', '+1주', '+2주'],
    adoption: '도입 시점',
    before: '도입 전',
    after: '도입 후',
    chips: ['45→15분 −67%', '30→8분 −73%', '6→3회 −50%'],
    chipNote: 'StoreCare 실측 사례',
    footnote: '* 도입 점주 53명 · 4주 자가기록 — StoreCare 실측',
  },
  en: {
    bluf: 'CCTV checks down 67% after adoption',
    badge: 'Measured case data',
    yLabel: 'CCTV review time (min)',
    xLabel: 'Weeks from adoption',
    xWeeks: ['−2w', '−1w', 'Adopt', '+1w', '+2w'],
    adoption: 'Adoption',
    before: 'Before',
    after: 'After',
    chips: ['45→15 min −67%', '30→8 min −73%', '6→3× −50%'],
    chipNote: 'StoreCare measured case',
    footnote: '* 53 store owners · 4-week self-log — StoreCare measured',
  },
  jp: {
    bluf: '導入後、CCTV確認が67%短縮',
    badge: '実測ケースデータ',
    yLabel: 'CCTV確認時間（分）',
    xLabel: '導入時点基準の週',
    xWeeks: ['−2週', '−1週', '導入', '+1週', '+2週'],
    adoption: '導入時点',
    before: '導入前',
    after: '導入後',
    chips: ['45→15分 −67%', '30→8分 −73%', '6→3回 −50%'],
    chipNote: 'StoreCare実測ケース',
    footnote: '＊ 導入店主53名・4週間 自己記録 — StoreCare実測',
  },
};

// ---- Chart geometry (SVG viewBox 0 0 400 220) ----
const VB_W = 400;
const VB_H = 220;
const PAD_L = 44;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 42;
const PLOT_W = VB_W - PAD_L - PAD_R;
const PLOT_H = VB_H - PAD_T - PAD_B;

// Y axis: minutes 0..50
const Y_MIN = 0;
const Y_MAX = 50;
// CCTV 확인 시간(분) over 8 evenly-spaced time points.
// Pre-adoption hovers ~45; adoption marker at index 4; post drops to ~15.
const SERIES = [45, 44, 47, 45, 43, 28, 18, 15];
const ADOPTION_INDEX = 4;

const xAt = (i: number) => PAD_L + (PLOT_W * i) / (SERIES.length - 1);
const yAt = (v: number) =>
  PAD_T + PLOT_H * (1 - (v - Y_MIN) / (Y_MAX - Y_MIN));

const LINE_PATH = SERIES.map(
  (v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i).toFixed(1)} ${yAt(v).toFixed(1)}`
).join(' ');

const ADOPTION_X = xAt(ADOPTION_INDEX);
const Y_TICKS = [0, 15, 30, 45];

interface Props {
  active?: boolean;
  locale?: Locale;
  className?: string;
}

export default function CaseStudyChartMockup({
  active = true,
  locale = 'en',
  className,
}: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
  });
  const t = COPY[locale] ?? COPY.en;
  const animate = active && isVisible && !reducedMotion;

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 ${className ?? ''}`}
    >
      <MockupBadge label={t.badge} />

      {/* saai wordmark label */}
      <SaaiHeader name="store care" tone="light" className="mb-1.5 flex w-fit" />

      {/* BLUF takeaway title */}
      <h3 className="pr-24 text-base font-bold leading-snug text-gray-900 sm:text-lg">
        {t.bluf}
      </h3>

      {/* Chart */}
      <div className="mt-4">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full"
          role="img"
          aria-labelledby="csc-title csc-desc"
        >
          <title id="csc-title">{t.bluf}</title>
          <desc id="csc-desc">
            {t.yLabel} {SERIES[0]} → {SERIES[SERIES.length - 1]}.
          </desc>

          {/* before (pre-adoption) shaded band */}
          <rect
            x={PAD_L}
            y={PAD_T}
            width={ADOPTION_X - PAD_L}
            height={PLOT_H}
            fill="#F3F4F6"
          />

          {/* gridlines + y ticks */}
          {Y_TICKS.map((v) => {
            const y = yAt(v);
            return (
              <g key={v}>
                <line
                  x1={PAD_L}
                  y1={y}
                  x2={VB_W - PAD_R}
                  y2={y}
                  stroke="#E5E7EB"
                  strokeWidth={1}
                />
                <text
                  x={PAD_L - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize={10}
                  fill="#6B7280"
                  fontFamily="system-ui, sans-serif"
                >
                  {v}
                </text>
              </g>
            );
          })}

          {/* axes */}
          <line
            x1={PAD_L}
            y1={PAD_T}
            x2={PAD_L}
            y2={PAD_T + PLOT_H}
            stroke="#9CA3AF"
            strokeWidth={1}
          />
          <line
            x1={PAD_L}
            y1={PAD_T + PLOT_H}
            x2={VB_W - PAD_R}
            y2={PAD_T + PLOT_H}
            stroke="#9CA3AF"
            strokeWidth={1}
          />

          {/* y axis label */}
          <text
            x={12}
            y={PAD_T + PLOT_H / 2}
            fontSize={10}
            fill="#374151"
            fontFamily="system-ui, sans-serif"
            textAnchor="middle"
            transform={`rotate(-90 12 ${PAD_T + PLOT_H / 2})`}
          >
            {t.yLabel}
          </text>

          {/* x axis week ticks (relative to adoption) */}
          {t.xWeeks.map((w, i) => {
            const x = PAD_L + (PLOT_W * i) / (t.xWeeks.length - 1);
            const isAdopt = i === Math.floor(t.xWeeks.length / 2);
            return (
              <g key={w}>
                <line
                  x1={x}
                  y1={PAD_T + PLOT_H}
                  x2={x}
                  y2={PAD_T + PLOT_H + 3}
                  stroke="#9CA3AF"
                  strokeWidth={1}
                />
                <text
                  x={x}
                  y={PAD_T + PLOT_H + 13}
                  fontSize={9}
                  fill={isAdopt ? '#376AE2' : '#6B7280'}
                  fontFamily="system-ui, sans-serif"
                  textAnchor="middle"
                  fontWeight={isAdopt ? 600 : 400}
                >
                  {w}
                </text>
              </g>
            );
          })}

          {/* x axis label */}
          <text
            x={PAD_L + PLOT_W / 2}
            y={VB_H - 4}
            fontSize={10}
            fill="#6B7280"
            fontFamily="system-ui, sans-serif"
            textAnchor="middle"
          >
            {t.xLabel}
          </text>

          {/* before / after region labels */}
          <text
            x={(PAD_L + ADOPTION_X) / 2}
            y={PAD_T + 12}
            fontSize={9}
            fill="#9CA3AF"
            fontFamily="system-ui, sans-serif"
            textAnchor="middle"
          >
            {t.before}
          </text>
          <text
            x={(ADOPTION_X + (VB_W - PAD_R)) / 2}
            y={PAD_T + 12}
            fontSize={9}
            fill="#9CA3AF"
            fontFamily="system-ui, sans-serif"
            textAnchor="middle"
          >
            {t.after}
          </text>

          {/* adoption vertical marker (labelled by the blue "도입" x tick) */}
          <line
            x1={ADOPTION_X}
            y1={PAD_T}
            x2={ADOPTION_X}
            y2={PAD_T + PLOT_H}
            stroke="#376AE2"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          >
            <title>{t.adoption}</title>
          </line>

          {/* metric line (animated draw) */}
          <motion.path
            d={LINE_PATH}
            fill="none"
            stroke="#376AE2"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
            animate={animate ? { pathLength: 1 } : { pathLength: 1 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />

          {/* endpoint dots: start (high) grey, end (low) blue */}
          <circle
            cx={xAt(0)}
            cy={yAt(SERIES[0])}
            r={3}
            fill="#9CA3AF"
          />
          <motion.circle
            cx={xAt(SERIES.length - 1)}
            cy={yAt(SERIES[SERIES.length - 1])}
            r={4}
            fill="#376AE2"
            initial={animate ? { opacity: 0 } : { opacity: 1 }}
            animate={animate ? { opacity: 1 } : { opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.3 }}
          />
          {/* endpoint value labels */}
          <text
            x={xAt(0) + 6}
            y={yAt(SERIES[0]) - 6}
            fontSize={10}
            fill="#6B7280"
            fontFamily="system-ui, sans-serif"
            fontWeight={600}
          >
            {SERIES[0]}
          </text>
          <text
            x={xAt(SERIES.length - 1) - 4}
            y={yAt(SERIES[SERIES.length - 1]) - 8}
            fontSize={11}
            fill="#376AE2"
            fontFamily="system-ui, sans-serif"
            fontWeight={700}
            textAnchor="end"
          >
            {SERIES[SERIES.length - 1]}
          </text>
        </svg>
      </div>

      {/* Delta chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {t.chips.map((c, i) => {
          const isMain = i === 0;
          return (
            <motion.span
              key={c}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${
                isMain
                  ? 'border-primary/30 bg-primary/5'
                  : 'border-gray-200 bg-gray-50'
              }`}
              initial={animate ? { opacity: 0, y: 6 } : { opacity: 1, y: 0 }}
              animate={
                animate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
              }
              transition={{ delay: 1.0 + i * 0.15, duration: 0.3 }}
            >
              <span className={isMain ? 'text-primary' : 'text-gray-500'}>
                {c}
              </span>
            </motion.span>
          );
        })}
      </div>

      {/* Footnote */}
      <p className="mt-3 text-3xs leading-relaxed text-gray-400">
        {t.footnote}
      </p>
    </div>
  );
}
