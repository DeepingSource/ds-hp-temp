'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import MockupBadge from './MockupBadge';
import SaaiHeader from './SaaiHeader';
import { PRIVACY_COPY, SIGNAL_CATEGORIES } from '@/data/mockup-scenarios/technology';
import type { Locale } from '@/lib/i18n';

interface Props {
  active?: boolean;
  locale?: Locale;
  className?: string;
}

const STEPS = 5;
const STEP_GLYPHS = ['①', '②', '③', '④', '⑤'];

// 12 × 9 pixel-dissolve grid for step ④.
const DISSOLVE_COLS = 12;
const DISSOLVE_ROWS = 9;

/** Deterministic per-cell delay (SSR-stable, no Math.random). */
function cellDelay(col: number, row: number): number {
  const seed = Math.sin((col + 1) * (row + 1) * 12.9898) * 43758.5453;
  const frac = seed - Math.floor(seed); // 0..1
  return frac * 0.45; // up to ~0.45s spread, per-cell ~30ms granularity
}

/** Abstract CCTV scene: two gray "faces" (circles) + a vehicle plate block. */
function CctvScene({ mosaic }: { mosaic: boolean }) {
  return (
    <g>
      {/* ground / scene lines */}
      <rect x="6" y="62" width="108" height="14" fill="#1f2937" />
      <line x1="6" y1="62" x2="114" y2="62" stroke="#374151" strokeWidth="0.5" />
      {/* plate block */}
      <rect x="14" y="48" width="22" height="9" rx="1" fill="#374151" />
      {!mosaic && (
        <>
          <line x1="17" y1="52.5" x2="33" y2="52.5" stroke="#4b5563" strokeWidth="1.4" />
        </>
      )}
      {/* two faces as gray circles + bodies */}
      <g>
        <rect x="48" y="40" width="12" height="22" rx="3" fill="#374151" />
        <circle cx="54" cy="34" r="7" fill="#4b5563" />
      </g>
      <g>
        <rect x="74" y="42" width="11" height="20" rx="3" fill="#374151" />
        <circle cx="79.5" cy="36" r="6" fill="#4b5563" />
      </g>
      {/* Mosaic overlay applied over faces + plate */}
      {mosaic && (
        <g shapeRendering="crispEdges">
          {/* face 1 */}
          {Array.from({ length: 9 }).map((_, i) => {
            const c = i % 3;
            const r = Math.floor(i / 3);
            const shade = ['#374151', '#4b5563', '#52606d', '#3b4654'][(c + r) % 4];
            return (
              <rect key={`m1-${i}`} x={48 + c * 4} y={28 + r * 4} width="4" height="4" fill={shade} />
            );
          })}
          {/* face 2 */}
          {Array.from({ length: 9 }).map((_, i) => {
            const c = i % 3;
            const r = Math.floor(i / 3);
            const shade = ['#4b5563', '#374151', '#3b4654', '#52606d'][(c + r) % 4];
            return (
              <rect key={`m2-${i}`} x={74 + c * 3.7} y={30 + r * 4} width="3.7" height="4" fill={shade} />
            );
          })}
          {/* plate */}
          {Array.from({ length: 6 }).map((_, i) => (
            <rect
              key={`mp-${i}`}
              x={14 + (i % 6) * 3.7}
              y={48}
              width="3.7"
              height="9"
              fill={['#374151', '#4b5563', '#52606d'][i % 3]}
            />
          ))}
        </g>
      )}
    </g>
  );
}

export default function PrivacyJourneyMockup({
  active = true,
  locale = 'en',
  className = '',
}: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const t = PRIVACY_COPY[locale] ?? PRIVACY_COPY.en;
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  const { step, hoverProps, goTo } = useMockupLoop({
    steps: STEPS,
    intervals: [2200, 2200, 2200, 3000, 2200],
    active: isVisible && active,
    pauseOnHover: true,
  });

  // reduced-motion → freeze on the climactic discarded state (step ④, index 3).
  const current = reducedMotion ? 3 : step;
  const animate = isVisible && active && !reducedMotion;

  const showMosaic = current >= 1; // ② onward, faces are masked
  const dissolving = current === 3; // ④ pixel dissolve
  const frameGone = current >= 3; // ④/⑤ the original no longer persists
  const signalsFloating = current === 2; // ③ chips detach
  const signalsAtHub = current === 4; // ⑤ chips at the event hub

  return (
    <div
      ref={ref}
      className={`relative w-full rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 ${className}`}
      {...hoverProps}
    >
      <MockupBadge locale={locale} />

      {/* Header */}
      <div className="mb-5 max-w-2xl">
        <SaaiHeader name="seal" tone="dark" className="mb-1.5" />
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{t.eyebrow}</p>
        <h3 className="mt-1.5 text-lg font-bold text-white sm:text-xl">{t.heading}</h3>
      </div>

      {/* Stepper — horizontal on sm+, stacked on mobile */}
      <ol className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0">
        {t.steps.map((s, i) => {
          const isActive = current === i;
          const isDone = current > i;
          return (
            <li key={s.label} className="flex flex-1 items-center sm:flex-col">
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-current={isActive ? 'step' : undefined}
                className={`flex w-full items-start gap-2 rounded-lg border px-2.5 py-2 text-left transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:flex-col sm:items-center sm:text-center ${
                  isActive
                    ? 'border-primary bg-primary/10 text-white'
                    : isDone
                      ? 'border-slate-700 bg-slate-900 text-slate-300'
                      : 'border-slate-800 bg-slate-900/40 text-slate-500'
                }`}
              >
                <span
                  className={`shrink-0 text-base font-bold tabular-nums ${
                    isActive ? 'text-primary' : isDone ? 'text-slate-300' : 'text-slate-600'
                  }`}
                  aria-hidden="true"
                >
                  {STEP_GLYPHS[i]}
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold">{s.label}</span>
                  <span className="mt-0.5 block text-2xs leading-snug text-slate-400">
                    {s.desc}
                  </span>
                </span>
              </button>
              {/* connector */}
              {i < STEPS - 1 && (
                <span
                  aria-hidden="true"
                  className={`mx-1 hidden self-center text-xs sm:inline ${
                    current > i ? 'text-primary' : 'text-slate-700'
                  }`}
                >
                  →
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {/* Stage */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-gray-950 p-4">
        <div className="grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          {/* Frame card */}
          <div className="relative mx-auto w-full max-w-[260px]">
            <span className="mb-1.5 block text-3xs font-medium uppercase tracking-wide text-slate-500">
              {t.steps[0].label}
            </span>
            <div className="relative aspect-[4/3] w-full rounded-lg border border-slate-700 bg-black">
              <svg
                viewBox="0 0 120 80"
                className="h-full w-full"
                role="img"
                aria-labelledby="pj-frame-title pj-frame-desc"
              >
                <title id="pj-frame-title">
                  {locale === 'ko'
                    ? 'CCTV 프레임의 수명: 포착 · 비식별화 · 신호 추출 · 폐기'
                    : locale === 'jp'
                      ? 'CCTVフレームの寿命：取得・匿名化・信号抽出・破棄'
                      : 'Lifecycle of a CCTV frame: capture, anonymize, extract, discard'}
                </title>
                <desc id="pj-frame-desc">
                  {locale === 'ko'
                    ? '추상화된 CCTV 장면에서 얼굴은 회색 원으로 표현됩니다. 비식별화 후 신호 6종만 추출되고 원본 프레임은 픽셀 단위로 소멸합니다.'
                    : locale === 'jp'
                      ? '抽象化されたCCTV映像で顔は灰色の円で表されます。匿名化後に6種の信号のみ抽出され、原本フレームはピクセル単位で消滅します。'
                      : 'In an abstract CCTV scene, faces are gray circles. After anonymization only six signals are extracted and the original frame dissolves pixel by pixel.'}
                </desc>

                {/* the scene; hidden once discarded */}
                {!frameGone && <CctvScene mosaic={showMosaic} />}

                {/* dissolve overlay — black cells fade in over the frame */}
                {dissolving && !reducedMotion && (
                  <g shapeRendering="crispEdges">
                    {Array.from({ length: DISSOLVE_ROWS }).map((_, r) =>
                      Array.from({ length: DISSOLVE_COLS }).map((_, c) => (
                        <motion.rect
                          key={`d-${c}-${r}`}
                          x={(120 / DISSOLVE_COLS) * c}
                          y={(80 / DISSOLVE_ROWS) * r}
                          width={120 / DISSOLVE_COLS}
                          height={80 / DISSOLVE_ROWS}
                          fill="#000000"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.18, delay: cellDelay(c, r) }}
                        />
                      ))
                    )}
                  </g>
                )}
              </svg>

              {/* reduced-motion / discarded static fill */}
              {reducedMotion && frameGone && (
                <div className="absolute inset-0 rounded-lg bg-black" aria-hidden="true" />
              )}

              {/* ② processing chip */}
              {current === 1 && (
                <span className="absolute right-1.5 top-1.5 rounded-full bg-primary/20 px-2 py-0.5 text-3xs font-semibold text-primary">
                  {t.procChip}
                </span>
              )}

              {/* ④ discard label overlay */}
              {dissolving && (
                <span className="absolute inset-x-2 bottom-2 rounded-md bg-slate-900/80 px-2 py-1 text-center text-2xs font-semibold text-white backdrop-blur-sm">
                  {t.discardLabel}
                </span>
              )}
            </div>
            {frameGone && (
              <p className="mt-1.5 text-center text-2xs font-medium text-slate-400">
                {t.discardLabel}
              </p>
            )}
          </div>

          {/* Signal chips column */}
          <div className="flex flex-col items-center justify-center">
            <span className="mb-1.5 text-3xs font-medium uppercase tracking-wide text-slate-500">
              {t.steps[2].label}
            </span>
            <ul className="flex flex-wrap justify-center gap-1.5 sm:max-w-[120px]">
              {SIGNAL_CATEGORIES.map((cat, i) => {
                const visible = current >= 2;
                return (
                  <motion.li
                    key={cat}
                    initial={false}
                    animate={
                      animate
                        ? {
                            opacity: visible ? 1 : 0.25,
                            y: signalsFloating ? -4 : 0,
                          }
                        : { opacity: 1, y: 0 }
                    }
                    transition={{ duration: 0.3, delay: signalsFloating ? i * 0.05 : 0 }}
                    className={`rounded-full border px-2 py-0.5 text-3xs font-medium ${
                      signalsAtHub || signalsFloating
                        ? 'border-primary/60 bg-primary/10 text-primary'
                        : 'border-slate-700 bg-slate-900 text-slate-400'
                    }`}
                  >
                    {cat}
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Event hub node */}
          <div className="flex flex-col items-center justify-center">
            <span className="mb-1.5 text-3xs font-medium uppercase tracking-wide text-slate-500">
              {t.steps[4].label}
            </span>
            <motion.div
              initial={false}
              animate={
                animate ? { scale: signalsAtHub ? 1.04 : 1 } : { scale: 1 }
              }
              transition={{ duration: 0.3 }}
              className={`flex aspect-square w-20 items-center justify-center rounded-full border-2 text-center text-2xs font-semibold transition-colors duration-300 ${
                signalsAtHub
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-slate-700 bg-slate-900 text-slate-500'
              }`}
            >
              {locale === 'ko' ? '이벤트 허브' : locale === 'jp' ? 'イベントハブ' : 'Event hub'}
            </motion.div>
          </div>
        </div>
      </div>

      {/* What remains vs what does not */}
      <div className="mt-5 overflow-hidden rounded-xl border border-slate-800">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">
            {t.retainedTitle} / {t.notRetainedTitle}
          </caption>
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/60">
              <th
                scope="col"
                className="w-1/2 px-3 py-2 text-xs font-semibold text-slate-200"
              >
                <span className="text-primary">✓</span> {t.retainedTitle}
              </th>
              <th
                scope="col"
                className="w-1/2 border-l border-slate-800 px-3 py-2 text-xs font-semibold text-slate-200"
              >
                <span className="text-slate-500">✕</span> {t.notRetainedTitle}
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({
              length: Math.max(t.retained.length, t.notRetained.length),
            }).map((_, i) => (
              <tr key={i} className="border-b border-slate-800/60 last:border-b-0">
                <td className="px-3 py-1.5 align-top text-xs text-slate-300">
                  {t.retained[i] ?? ''}
                </td>
                <td className="border-l border-slate-800 px-3 py-1.5 align-top text-xs text-slate-500 line-through decoration-slate-700">
                  {t.notRetained[i] ?? ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
