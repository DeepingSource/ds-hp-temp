'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { ease } from '@/lib/easing';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * MasterPairCards — the two mirrored cards of MasterPair, converging toward the
 * centre as the section scrolls into view (animation plan C5: "the metaphor IS the
 * motion" — HQ ↔ store moving as one). A thin client island so MasterPair stays a
 * Server Component: the localized copy and CTAs are passed in as children. The card
 * chrome is baked here since it is specific to this pair. Honors prefers-reduced-
 * motion (opacity-only, no horizontal slide); the root MotionProvider is the global
 * safety net behind the explicit check.
 */
export default function MasterPairCards({ left, right }: { left: ReactNode; right: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const viewport = { once: true, amount: 0.4 } as const;
  const transition = { duration: 0.6, ease: ease.outCubic } as const;
  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-4 items-stretch">
      <motion.div
        className="flex flex-col justify-center p-10 rounded-2xl bg-white/[0.04] border border-white/10"
        initial={{ opacity: 0, x: reduced ? 0 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewport}
        transition={transition}
      >
        {left}
      </motion.div>
      <motion.div
        className="flex flex-col justify-center p-10 rounded-2xl bg-primary/15 border border-primary/30"
        initial={{ opacity: 0, x: reduced ? 0 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewport}
        transition={transition}
      >
        {right}
      </motion.div>
    </div>
  );
}
