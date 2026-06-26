'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * LoopVideo — a poster-first, lazy, autoplaying loop clip for product demos.
 * Sources load only when the element nears the viewport (IntersectionObserver),
 * protecting LCP/bandwidth below the fold. Honors prefers-reduced-motion by
 * staying on the poster (no autoplay). Always muted + playsInline for mobile.
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
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // stay on poster
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      aria-label={ariaLabel}
      muted
      loop
      playsInline
      autoPlay={load}
      preload="none"
    >
      {load && webm && <source src={webm} type="video/webm" />}
      {load && <source src={mp4} type="video/mp4" />}
    </video>
  );
}
