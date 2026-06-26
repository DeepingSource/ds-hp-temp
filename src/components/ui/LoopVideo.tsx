'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * LoopVideo — a poster-first, lazy, autoplaying loop clip for product demos.
 * Sources are always present (so the browser knows what to fetch) but `preload`
 * is "none", so nothing downloads until the clip nears the viewport, where an
 * IntersectionObserver calls play() (which triggers the load). It pauses when
 * scrolled away. Honors prefers-reduced-motion by staying on the poster.
 * Always muted + playsInline for mobile autoplay policies.
 */
export default function LoopVideo({
  mp4,
  webm,
  poster,
  ariaLabel,
  className = '',
}: {
  mp4: string;
  webm?: string;
  poster: string;
  ariaLabel: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            if (!reduce) el.play().catch(() => {});
          } else {
            el.pause();
          }
        }
      },
      { rootMargin: '100px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      aria-label={ariaLabel}
      muted
      loop
      playsInline
      preload="none"
    >
      {webm && <source src={webm} type="video/webm" />}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
