'use client';

import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ease } from '@/lib/easing';

/**
 * Route transition (animation plan D1). template.tsx re-mounts on every client
 * navigation, so the page content fades in on each route change — softening the
 * previous hard cut. Header/Footer live in layout.tsx (outside this wrapper) and
 * stay put.
 *
 * Two guardrails:
 *  - The very first paint is skipped (module flag) so the LCP-critical hero renders
 *    instantly; only subsequent navigations animate.
 *  - opacity only — a transform here would make this wrapper the containing block
 *    for any `position: fixed` descendant. A fade has no such side effect.
 *  - Disabled under prefers-reduced-motion.
 */
let firstPaint = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const skip = firstPaint || reduced;

  useEffect(() => {
    firstPaint = false;
  }, []);

  return (
    <motion.div
      initial={skip ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: ease.outCubic }}
    >
      {children}
    </motion.div>
  );
}
