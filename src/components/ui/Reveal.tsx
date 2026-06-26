'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { ease } from '@/lib/easing';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Reveal / RevealStagger — declarative scroll-reveal primitives (animation plan A4).
 * Built on Motion's `whileInView` so the site can converge on ONE reveal system
 * (vs the older CSS `.scroll-visible` + IntersectionObserver hook). Honors
 * prefers-reduced-motion (opacity-only, no vertical move); the root MotionProvider
 * (A1) is the global safety net behind the explicit check here.
 *
 * @example single element
 *   <Reveal><h2>…</h2></Reveal>
 * @example staggered group
 *   <RevealStagger className="grid gap-5">
 *     {items.map((it) => <RevealItem key={it.id}>…</RevealItem>)}
 *   </RevealStagger>
 */

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** entrance y offset in px (ignored under reduced motion). */
  y?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  /** viewport visibility fraction that triggers the reveal. */
  amount?: number;
}

export function Reveal({
  children,
  className,
  y = 16,
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.3,
}: RevealProps) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: ease.outCubic, delay }}
    >
      {children}
    </motion.div>
  );
}

interface RevealStaggerProps {
  children: ReactNode;
  className?: string;
  /** seconds between each child's entrance. */
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
}

export function RevealStagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  once = true,
  amount = 0.2,
}: RevealStaggerProps) {
  return (
    <motion.div
      className={className}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.outCubic } },
};

/** Child of RevealStagger. Must render under the root MotionProvider (reduced-motion safe). */
export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
