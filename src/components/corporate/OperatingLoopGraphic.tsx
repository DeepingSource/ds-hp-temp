'use client';

import { motion } from 'framer-motion';
import { Grid3x3, Radar, ClipboardCheck, RotateCw } from 'lucide-react';
import { type Locale } from '@/lib/i18n';
import { operatingLoop, productPrimary } from '@/lib/brand-canon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * OperatingLoopGraphic — the /products hero visual (product-reorg D2, §10.5).
 *
 * The OPERATING LOOP as a clockwise cycle around the SAAI hub, output feeding back
 * to input. Four steps — 관찰 · 분석 · 제안 · 학습 — of which three carry a product:
 *   관찰/Observe → saai care · 분석/Analyze → saai insight · 제안/Suggest → saai agent.
 * The fourth (학습/Learn) closes the loop and has NO product — learning is what makes
 * the cycle a cycle, not something we sell.
 *
 * FIXED 2026-07-20 (reorg Phase 4): the ring used to show FOUR PRODUCTS as four stages
 * — count(Observe)→insight(Analyze)→care(Suggest)→agent(Learn). Under Function × Mode
 * Matrix v1.0 the products are exactly three modes and `count` is a FUNCTION, so it no
 * longer sits on the ring (it lives in /products/functions). Steps and their order now
 * come from brand-canon `operatingLoop`, which is the single source for the loop.
 *
 * Brand-blue single color + stage icons (no rainbow), the closing step emphasized.
 * Desktop = circular; mobile = vertical stack. Inline SVG ring, no raster.
 */

const STEP_ICONS = [Radar, Grid3x3, ClipboardCheck, RotateCw] as const;
// desktop ring positions: icon CENTER seated on the r=34 ring at top/right/bottom/left (clockwise)
const POS = [
  'left-1/2 top-[16%] -translate-x-1/2 -translate-y-1/2', // 01 top
  'left-[84%] top-1/2 -translate-x-1/2 -translate-y-1/2', // 02 right
  'left-1/2 top-[84%] -translate-x-1/2 -translate-y-1/2', // 03 bottom
  'left-[16%] top-1/2 -translate-x-1/2 -translate-y-1/2', // 04 left
];

type Step = {
  no: string;
  /** Loop step label — 관찰 · 분석 · 제안 · 학습. */
  label: string;
  /** Time axis — 지금 · 어제 · 다음 · 다시. */
  phase: string;
  /** Product name, or null for the closing step (학습 has no product). */
  product: string | null;
  Icon: (typeof STEP_ICONS)[number];
  emphasis?: boolean;
};

/** Steps come from the loop SOT; the closing step is emphasized as the thing that repeats. */
function steps(locale: Locale): Step[] {
  return operatingLoop[locale].map((s, i) => ({
    no: String(i + 1).padStart(2, '0'),
    label: s.label,
    phase: s.phase,
    product: s.mode ? productPrimary(s.mode) : null,
    Icon: STEP_ICONS[i],
    emphasis: s.mode === null,
  }));
}

function Node({ s }: { s: Step }) {
  const { Icon } = s;
  return (
    <div className="relative">
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-card ring-2 ring-white ${
          s.emphasis ? 'ring-primary/30 ring-offset-2' : ''
        }`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="absolute left-1/2 top-full mt-2 w-32 -translate-x-1/2 text-center">
        <span className="block text-2xs font-mono font-medium text-gray-400 whitespace-nowrap">{s.no} · {s.label} · {s.phase}</span>
        {s.product && <span className="block text-sm font-bold text-gray-900">{s.product}</span>}
      </span>
    </div>
  );
}

export default function OperatingLoopGraphic({ locale, hub, feedback }: { locale: Locale; hub: string; feedback: string }) {
  const { ref, isVisible: show } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const reduced = usePrefersReducedMotion();
  const STAGES = steps(locale);
  const label = locale === 'ko'
    ? '운영 루프 — 관찰(saai care) · 분석(saai insight) · 제안(saai agent) · 학습이 SAAI 허브를 중심으로 시계방향 순환을 이룬다. 학습은 제품이 아니라 루프를 닫는 단계다.'
    : locale === 'jp'
    ? 'オペレーションループ — 観察(saai care)・分析(saai insight)・提案(saai agent)・学習がSAAIハブを中心に時計回りに循環する。学習は製品ではなくループを閉じる段階。'
    : 'DeepingSource operating loop: Observe (saai care), Analyze (saai insight), Suggest (saai agent) and Learn as a clockwise cycle around the SAAI hub. Learn closes the loop and is not a product.';

  return (
    <div role="img" aria-label={label}>
      {/* Desktop — circular cycle (ring draws on scroll, then nodes pop clockwise) */}
      <div ref={ref} className="relative mx-auto hidden aspect-square w-full max-w-xl sm:block">
        <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <circle
            cx="50" cy="50" r="34" fill="none" stroke="var(--color-primary)" strokeOpacity="0.3" strokeWidth="0.5" strokeDasharray="1.5 2"
            style={{ opacity: show ? 1 : 0, transition: reduced ? undefined : 'opacity 0.8s var(--ease-out-cubic)' }}
          />
          {/* clockwise chevrons at the 4 diagonals between nodes (tangent direction) */}
          {[
            { x: 74, y: 26, r: 45 },
            { x: 74, y: 74, r: 135 },
            { x: 26, y: 74, r: 225 },
            { x: 26, y: 26, r: 315 },
          ].map((c, i) => (
            <path
              key={i}
              d="M -2 -2 L 0 0 L -2 2"
              fill="none"
              stroke="var(--color-primary)"
              strokeOpacity="0.5"
              strokeWidth="0.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform={`translate(${c.x} ${c.y}) rotate(${c.r})`}
              style={{ opacity: show ? 1 : 0, transition: reduced ? undefined : 'opacity 0.4s var(--ease-out-cubic)', transitionDelay: reduced ? undefined : `${0.5 + i * 0.08}s` }}
            />
          ))}
        </svg>

        {/* center hub */}
        <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-full border border-primary/15 bg-primary-lighter/50 px-4 text-center">
          <p className="text-sm font-bold leading-snug text-gray-900 break-keep">{hub}</p>
          <p className="inline-flex items-center gap-1 text-2xs text-primary break-keep">
            <RotateCw className="h-3 w-3" aria-hidden="true" />
            {feedback}
          </p>
        </div>

        {/* 4 nodes — fade in clockwise after the ring draws */}
        {STAGES.map((s, i) => (
          <motion.div
            key={s.label}
            className={`absolute ${POS[i]}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: show ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.4 + i * 0.13 }}
          >
            <Node s={s} />
          </motion.div>
        ))}
      </div>

      {/* Mobile — vertical stack */}
      <ol className="mx-auto flex max-w-xs flex-col gap-2 sm:hidden">
        {STAGES.map((s) => (
          <li key={s.label} className="flex items-center gap-3 rounded-xl border border-primary/15 bg-primary-lighter/40 px-4 py-3">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white ${s.emphasis ? 'ring-2 ring-primary/30 ring-offset-1' : ''}`}>
              <s.Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-2xs font-mono font-medium text-gray-400">{s.no} · {s.label} · {s.phase}</span>
              {s.product && <span className="block text-sm font-bold text-gray-900">{s.product}</span>}
            </span>
          </li>
        ))}
        <li className="inline-flex items-center justify-center gap-1 pt-1 text-2xs text-primary break-keep">
          <RotateCw className="h-3 w-3" aria-hidden="true" />
          {feedback}
        </li>
      </ol>
    </div>
  );
}
