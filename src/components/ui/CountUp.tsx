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

    // R7: 마운트 시 이미 뷰포트 안(above-fold)이면 SSR 최종값을 그대로 유지하고
    // 카운트업을 건너뛴다 — 최종값이 보이다가 0으로 점프 후 재생되는 어색함 방지.
    // below-fold 요소만 0에서 대기하다 진입 시 카운트업한다(진입 전 0은 화면 밖이라 안 보임).
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      triggered.current = true;
      return;
    }
    setValue(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
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
