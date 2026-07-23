'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * HeroRotation — the hero's shared rotation clock (HERO_SPACES_PLAN_v1 §4).
 *
 * The rotating spatial noun (RotatingNoun) and the evidence image
 * (CorporateHeroFigure) must switch on the SAME beat, so the index lives here
 * instead of inside RotatingNoun. The provider is a thin client island wrapped
 * around the hero grid; the hero itself stays a server component.
 *
 * Pause semantics: `hold()/release()` is a counting lock — the word on hover,
 * the figure on hover, each takes a hold; rotation resumes only when every
 * hold is released (WCAG 2.2.2 stop mechanism, consistent across both layers).
 * Under prefers-reduced-motion the clock never starts (index stays 0) and
 * consumers render their static fallbacks.
 */

type HeroRotationCtx = {
  /** current beat, 0..length-1 */
  index: number;
  reduced: boolean;
  hold: () => void;
  release: () => void;
};

const Ctx = createContext<HeroRotationCtx | null>(null);

/** Null outside a provider — consumers fall back to standalone behavior. */
export function useHeroRotation() {
  return useContext(Ctx);
}

export function HeroRotationProvider({
  length,
  intervalMs = 2200,
  children,
}: {
  /** number of beats — must equal heroQuestion.words.length AND heroSpaceImages.length */
  length: number;
  /** dwell per beat; keep in sync with RotatingNoun's default */
  intervalMs?: number;
  children: ReactNode;
}) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [holds, setHolds] = useState(0);

  useEffect(() => {
    if (reduced || holds > 0 || length < 2) return;
    const t = setInterval(() => setIndex((n) => (n + 1) % length), intervalMs);
    return () => clearInterval(t);
  }, [reduced, holds, length, intervalMs]);

  const hold = useCallback(() => setHolds((n) => n + 1), []);
  const release = useCallback(() => setHolds((n) => Math.max(0, n - 1)), []);

  return <Ctx.Provider value={{ index, reduced, hold, release }}>{children}</Ctx.Provider>;
}
