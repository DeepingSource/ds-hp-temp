'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * RotatingNoun — the hero's spatial-noun rotation (랜딩_전환재정렬_v2 §2·§10-4).
 *
 * SEO/A11y contract: the crawlable, screen-reader H1 always reads the FIXED token
 * (`fixed`) — it is rendered as real, non-hidden text via an invisible sizer that
 * also reserves the widest word's width so the line never reflows as words swap.
 * The rotating layer is `aria-hidden` and absolutely positioned on top, seen only by
 * sighted users. On `prefers-reduced-motion` the rotation halts and the fixed token
 * shows (no swap), keeping motion out for those who opt out.
 *
 * Width is pinned to the longest of {fixed, ...words} so the surrounding sentence
 * ("…당신의 [X] 알고 있나요?") holds its position on every locale and viewport.
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
  // First paint is deterministic (SSR-safe): index 0 = words[0] on both server and client,
  // so no hydration mismatch. The interval only advances after mount.
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), intervalMs);
    return () => clearInterval(t);
  }, [reduced, words.length, intervalMs]);

  // Widest token reserves the inline box so the sentence never jumps.
  const sizer = [fixed, ...words].reduce((a, b) => (b.length > a.length ? b : a), '');
  const current = reduced ? fixed : words[i];

  return (
    <span className={`relative inline-flex items-baseline align-baseline text-primary ${className}`}>
      {/* Sizer: reserves width; invisible but still the real fixed text for crawler/SR. */}
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        {sizer}
      </span>
      <span className="sr-only">{fixed}</span>
      {/* Rotating visual layer — sighted users only. */}
      <span
        key={current}
        aria-hidden="true"
        className="rotating-noun absolute inset-0 whitespace-nowrap"
      >
        {current}
      </span>
    </span>
  );
}
