'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { easeOutCubic } from '@/lib/easing';

export function CountUp({
  to,
  duration = 1400,
  suffix = '',
  className,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(to); // SSR과 동일한 값으로 시작 (hydration 일치)
  const elRef = useRef<HTMLSpanElement>(null);
  const animRef = useRef<number | null>(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setValue(to);
      return;
    }

    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          setValue(0);
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            setValue(Math.round(easeOutCubic(t) * to));
            if (t < 1) {
              animRef.current = requestAnimationFrame(tick);
            }
          };
          animRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [to, duration, prefersReducedMotion]);

  return (
    <span ref={elRef} className={className}>
      {value}{suffix}
    </span>
  );
}
