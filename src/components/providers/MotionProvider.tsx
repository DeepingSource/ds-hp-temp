'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * MotionProvider — global Motion (framer-motion) configuration (animation plan A1).
 * `reducedMotion="user"` makes every descendant Motion component honor the OS
 * prefers-reduced-motion setting automatically (transform/layout animations are
 * disabled, opacity is kept) — a safety net behind the per-component
 * usePrefersReducedMotion checks. Server children passed via `children` stay
 * server-rendered (this provider only supplies context).
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
