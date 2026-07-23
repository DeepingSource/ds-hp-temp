'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useHeroRotation } from '@/components/ui/HeroRotation';

/**
 * RotatingNoun — the hero's spatial-noun rotation (랜딩_전환재정렬_v2 §2·§10-4).
 *
 * SEO/A11y contract: the crawlable, screen-reader H1 always reads the FIXED token
 * (`fixed`), rendered as real `sr-only` text. The rotating layer is `aria-hidden` and
 * shares an inline-grid cell with an invisible sizer of the WIDEST token, so the box
 * width never changes and the rotating word keeps the sentence's baseline (no reflow,
 * no vertical drift across KO/EN/JP metrics). On `prefers-reduced-motion` the rotation
 * halts and the fixed token shows. Pointer users can pause by hovering the word (WCAG
 * 2.2.2 — a stop mechanism beyond reduced-motion).
 *
 * Clock (HERO_SPACES_PLAN_v1 §4): inside a HeroRotationProvider the index comes from
 * the shared context so the hero image switches on the same beat; hovering takes a
 * hold on the shared clock (pausing word AND image together). Outside a provider the
 * component keeps its original self-contained interval, so it stays reusable.
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

  // Hover pause — shared hold in a provider, local flag otherwise. The ref pairs
  // hold/release exactly once, and releases on unmount if still held.
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

  // First paint is deterministic (SSR-safe): index 0 = words[0] on both server and
  // client, so no hydration mismatch (the provider also starts at 0).
  const i = (ctx ? ctx.index : localI) % words.length;

  // Widest token reserves the inline-grid cell so the sentence never jumps.
  const sizer = [fixed, ...words].reduce((a, b) => (b.length > a.length ? b : a), '');
  const current = reduced ? fixed : words[i];

  return (
    <span
      className={`inline-inline-flex items-baseline text-primary ${className}`}
      onPointerEnter={pause}
      onPointerLeave={resume}
    >
      <span className="inline-grid text-primary">
        {/* Sizer: reserves the cell; invisible, aria-hidden — pins width + baseline. */}
        <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {sizer}
        </span>
        <span className="sr-only">{fixed}</span>
        {/* Rotating visual layer — overlaps the sizer cell, sighted users only. */}
        <span
          key={current}
          aria-hidden="true"
          className="rotating-noun col-start-1 row-start-1 whitespace-nowrap"
        >
          {current}
        </span>
      </span>
      {suffix && <span className="text-gray-900 font-bold whitespace-nowrap">{suffix}</span>}
    </span>
  );
}
