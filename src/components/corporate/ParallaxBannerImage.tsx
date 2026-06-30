'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';

/**
 * ParallaxBannerImage — the photo layer of an industry banner, drifting vertically
 * as the band scrolls past (animation plan C6). A thin client island so the host
 * SolutionsView can stay a Server Component; the gradient scrim and header text
 * remain server-rendered siblings over this layer. The image is over-sized top/bottom
 * so the ±drift never exposes an edge; under prefers-reduced-motion useParallax pins
 * the value to its midpoint (no movement).
 */
export default function ParallaxBannerImage({ src }: { src: string }) {
  const { ref, value } = useParallax<HTMLDivElement>([-18, 18]);
  return (
    <div ref={ref} className="absolute inset-0">
      <motion.div className="absolute inset-x-0 -top-6 -bottom-6" style={{ y: value }}>
        <Image src={src} alt="" fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
      </motion.div>
    </div>
  );
}
