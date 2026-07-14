'use client';

import { useCallback, type PointerEvent } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * CorporateHeroFigure — the hero's evidence visual, as a thin client island so the
 * surrounding hero (h1 / copy / priority image markup) stays a server component and
 * the LCP path is unchanged. The source image already carries baked-in anonymized
 * detection for all five shoppers (brackets · IDs · trajectories), so the only added
 * motion is a subtle pointer tilt (rotateX/Y parallax) — disabled under
 * prefers-reduced-motion and skipped for touch.
 */

const MAX_TILT = 5; // degrees

export default function CorporateHeroFigure({
  src,
  alt,
  trackLabel,
}: {
  src: string;
  alt: string;
  trackLabel: string;
}) {
  const reduced = usePrefersReducedMotion();

  // pointer position over the card, normalized to -0.5..0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 200, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), spring);

  const handleMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (reduced || e.pointerType === 'touch') return;
      const r = e.currentTarget.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    },
    [reduced, px, py],
  );

  const handleLeave = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  return (
    <div style={{ perspective: 1000 }} onPointerMove={handleMove} onPointerLeave={handleLeave}>
      <motion.div
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-gray-200 shadow-elevated"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 540px, 100vw"
          className="object-cover"
        />
        {/* The image already renders anonymized detection for all five shoppers; we only
           add the live-tracking chip. (shown, not told) */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-gray-950/70 px-2.5 py-1 text-2xs font-medium text-white backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse" />
            {trackLabel}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
