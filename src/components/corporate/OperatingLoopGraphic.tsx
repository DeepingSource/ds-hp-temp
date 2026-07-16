'use client';

import { motion } from 'framer-motion';
import { DoorOpen, Grid3x3, Radar, ClipboardCheck, RotateCw } from 'lucide-react';
import { type Locale } from '@/lib/i18n';
import { productPrimary, type ProductKey } from '@/lib/brand-canon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * OperatingLoopGraphic — the /products hero visual (product-reorg D2, §10.5).
 * The four Tier-1 products as a clockwise cycle around the SAAI hub —
 * count(Observe)→insight(Analyze)→care(Suggest)→agent(Learn), output feeding back
 * to input. Names lead with the value brand (saai …) — count included (2026-07-16).
 * Brand-blue single color + stage icons (no rainbow), agent emphasized.
 * Desktop = circular; mobile = vertical stack. Inline SVG ring, no raster.
 */

type Stage = { no: string; key: ProductKey; stage: string; Icon: typeof DoorOpen; emphasis?: boolean };
const STAGES: Stage[] = [
  { no: '01', key: 'count', stage: 'Observe', Icon: DoorOpen },
  { no: '02', key: 'insight', stage: 'Analyze', Icon: Grid3x3 },
  { no: '03', key: 'care', stage: 'Suggest', Icon: Radar },
  { no: '04', key: 'agent', stage: 'Learn', Icon: ClipboardCheck, emphasis: true },
];
// desktop ring positions: icon CENTER seated on the r=34 ring at top/right/bottom/left (clockwise)
const POS = [
  'left-1/2 top-[16%] -translate-x-1/2 -translate-y-1/2', // 01 top
  'left-[84%] top-1/2 -translate-x-1/2 -translate-y-1/2', // 02 right
  'left-1/2 top-[84%] -translate-x-1/2 -translate-y-1/2', // 03 bottom
  'left-[16%] top-1/2 -translate-x-1/2 -translate-y-1/2', // 04 left
];

function Node({ s }: { s: Stage }) {
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
        <span className="block text-2xs font-mono font-medium text-gray-400 whitespace-nowrap">{s.no} · {s.stage}</span>
        <span className="block text-sm font-bold text-gray-900">{productPrimary(s.key)}</span>
      </span>
    </div>
  );
}

export default function OperatingLoopGraphic({ locale, hub, feedback }: { locale: Locale; hub: string; feedback: string }) {
  const { ref, isVisible: show } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const reduced = usePrefersReducedMotion();
  const label = locale === 'ko'
    ? 'saai count·saai insight·saai care·saai agent가 SAAI 허브를 중심으로 시계방향 순환을 이루는 운영 루프'
    : locale === 'jp'
    ? 'saai count・saai insight・saai care・saai agentがSAAIハブを中心に時計回りに循環するオペレーションループ'
    : 'DeepingSource operating loop: saai count, saai insight, saai care and saai agent as a clockwise cycle around the SAAI hub';

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
            key={s.key}
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
          <li key={s.key} className="flex items-center gap-3 rounded-xl border border-primary/15 bg-primary-lighter/40 px-4 py-3">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white ${s.emphasis ? 'ring-2 ring-primary/30 ring-offset-1' : ''}`}>
              <s.Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-2xs font-mono font-medium text-gray-400">{s.no} · {s.stage}</span>
              <span className="block text-sm font-bold text-gray-900">{productPrimary(s.key)}</span>
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
