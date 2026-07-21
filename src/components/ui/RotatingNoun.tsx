'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

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
 */
export default function RotatingNoun({
  fixed,
  words,
  intervalMs = 2200,
  className = '',
}: {
  fixed: string;
  words: string[];
  /** dwell time per word in ms */
  intervalMs?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  // First paint is deterministic (SSR-safe): index 0 = words[0] on both server and client,
  // so no hydration mismatch. The interval only advances after mount, and pauses on hover.
  useEffect(() => {
    if (reduced || paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), intervalMs);
    return () => clearInterval(t);
  }, [reduced, paused, words.length, intervalMs]);

  // Widest token reserves the inline-grid cell so the sentence never jumps.
  const sizer = [fixed, ...words].reduce((a, b) => (b.length > a.length ? b : a), '');
  const current = reduced ? fixed : words[i];

  return (
    <span
      className={`inline-grid text-primary ${className}`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
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
  );
}
