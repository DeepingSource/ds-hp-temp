'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useHeroRotation } from '@/components/ui/HeroRotation';

/**
 * RotatingNoun — the hero's spatial-noun rotation (랜딩_전환재정렬_v2 §2·§10-4).
 *
 * SEO/A11y contract: the crawlable, screen-reader H1 always reads the FIXED token
 * (`fixed`), rendered as real `sr-only` text. The rotating layer is `aria-hidden` and
 * flows naturally alongside the suffix without fixed-width sizer gaps.
 */
export default function RotatingNoun({
  fixed,
  words,
  suffix = '',
  intervalMs = 2200,
  className = '',
}: {
  fixed: string;
  words: string[];
  suffix?: string;
  /** dwell time per word in ms (standalone mode only — in a provider the clock rules) */
  intervalMs?: number;
  className?: string;
}) {
  const ctx = useHeroRotation();
  const localReduced = usePrefersReducedMotion();
  const reduced = ctx ? ctx.reduced : localReduced;

  // Standalone fallback clock — only runs when there is no provider.
  const [localI, setLocalI] = useState(0);
  const [localPaused, setLocalPaused] = useState(false);
  useEffect(() => {
    if (ctx || reduced || localPaused) return;
    const t = setInterval(() => setLocalI((n) => (n + 1) % words.length), intervalMs);
    return () => clearInterval(t);
  }, [ctx, reduced, localPaused, words.length, intervalMs]);

  // Hover pause — shared hold in a provider, local flag otherwise.
  const held = useRef(false);
  useEffect(() => {
    const release = ctx?.release;
    return () => {
      if (held.current) {
        held.current = false;
        release?.();
      }
    };
  }, [ctx?.release]);
  const pause = () => {
    if (ctx) {
      if (!held.current) {
        held.current = true;
        ctx.hold();
      }
    } else setLocalPaused(true);
  };
  const resume = () => {
    if (ctx) {
      if (held.current) {
        held.current = false;
        ctx.release();
      }
    } else setLocalPaused(false);
  };

  const i = (ctx ? ctx.index : localI) % words.length;
  const current = reduced ? fixed : words[i];

  return (
    <span
      className={`inline-flex items-baseline gap-1 text-primary transition-all duration-300 ${className}`}
      onPointerEnter={pause}
      onPointerLeave={resume}
    >
      <span className="sr-only">{fixed}</span>
      <span
        key={current}
        aria-hidden="true"
        className="rotating-noun whitespace-nowrap font-bold"
      >
        {current}
      </span>
      {suffix && <span className="text-gray-900 font-bold whitespace-nowrap">{suffix}</span>}
    </span>
  );
}
