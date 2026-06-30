'use client';

import { motion } from 'framer-motion';
import { springTabPill } from '@/lib/spring-config';

/**
 * SlidingIndicator — the shared active-state marker behind a set of tabs/segments
 * (animation plan D6). Render it only inside the active item; because every item
 * carries the same `layoutId`, framer slides it from the old item to the new one
 * (a magic move) on selection. The caller supplies the shape/position/color via
 * `className` (e.g. an inset-0 pill, a left-edge bar, or an underline). Reduced
 * motion is handled globally by MotionConfig, which makes the layout move instant.
 *
 * Consolidates the inline pattern used by StoreCareDeviceTabs, FeatureCarousel,
 * AgentMockupShowcase, and the Header nav underline.
 */
export default function SlidingIndicator({
  layoutId,
  className,
}: {
  layoutId: string;
  className?: string;
}) {
  return <motion.span layoutId={layoutId} aria-hidden="true" className={className} transition={springTabPill} />;
}
