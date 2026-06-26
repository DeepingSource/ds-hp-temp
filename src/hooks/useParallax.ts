'use client';

import { useRef, type RefObject } from 'react';
import { useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type Offset = NonNullable<Parameters<typeof useScroll>[0]>['offset'];

interface UseParallaxOptions {
  /** scroll offset range mapped to progress 0→1. Default: element enters bottom → leaves top. */
  offset?: Offset;
  /** smooth the value with a spring (default true). */
  spring?: boolean;
}

/**
 * useParallax — map an element's scroll progress to a MotionValue (animation plan A5).
 * First scroll-linked motion primitive for the site. Attach `ref` to the section,
 * apply `value` to a child's style (e.g. `style={{ y: value }}`). The output range
 * is your px/scale/opacity endpoints. Under prefers-reduced-motion the value is
 * pinned to the midpoint (no movement).
 *
 * @example
 *   const { ref, value } = useParallax([-24, 24]);     // y drift
 *   <div ref={ref}><motion.img style={{ y: value }} /></div>
 */
export function useParallax<T extends HTMLElement = HTMLElement>(
  outputRange: [number, number],
  options: UseParallaxOptions = {},
): { ref: RefObject<T | null>; value: MotionValue<number> } {
  const { offset = ['start end', 'end start'] as Offset, spring = true } = options;
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset });
  const mid = (outputRange[0] + outputRange[1]) / 2;
  const raw = useTransform(scrollYProgress, [0, 1], reduced ? [mid, mid] : outputRange);
  // useSpring is always called (hooks must be unconditional); under reduced motion
  // `raw` is constant, so the spring settles to a static value.
  const smoothed = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.6 });

  return { ref, value: spring ? smoothed : raw };
}
