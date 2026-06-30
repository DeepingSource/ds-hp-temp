'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';

/**
 * ParallaxThumb — a thumbnail that drifts vertically as the section scrolls past
 * (animation plan D5, the first real use of useParallax). A thin client island so
 * the host (e.g. SolutionTimeline) can stay a Server Component. The image layer is
 * over-sized top/bottom so the ±drift never exposes an edge; under
 * prefers-reduced-motion useParallax pins the value to its midpoint (no movement).
 */
export default function ParallaxThumb({ src, alt }: { src: string; alt: string }) {
  const { ref, value } = useParallax<HTMLDivElement>([-14, 14]);
  return (
    <div
      ref={ref}
      className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10 mb-5 bg-white/[0.03]"
    >
      <motion.div className="absolute inset-x-0 -top-5 -bottom-5" style={{ y: value }}>
        <Image src={src} alt={alt} fill sizes="(max-width: 640px) 100vw, 360px" className="object-cover" />
      </motion.div>
    </div>
  );
}
