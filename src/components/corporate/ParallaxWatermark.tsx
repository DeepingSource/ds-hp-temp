'use client';

import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';

/**
 * ParallaxWatermark — the dark closing-CTA's faint SAAI symbol, drifting slowly as
 * the section scrolls (animation plan D5). A thin client island so the host view can
 * stay a Server Component. The centering lives on the static outer wrapper; the inner
 * layer carries the image + the parallax y so the drift never fights the
 * translate(-50%, -50%). Under prefers-reduced-motion useParallax pins to its midpoint.
 */
export default function ParallaxWatermark({ src }: { src: string }) {
  const { ref, value } = useParallax<HTMLDivElement>([-26, 26]);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2"
      style={{ width: 'min(560px, 86%)', aspectRatio: '534.51 / 267.36' }}
    >
      <motion.div
        className="h-full w-full bg-contain bg-center bg-no-repeat opacity-[0.07]"
        style={{ backgroundImage: `url(${src})`, y: value }}
      />
    </div>
  );
}
