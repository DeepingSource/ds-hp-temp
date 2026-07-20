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
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      triggered.current = true;
      return;
    }
    // 0-1: below-fold도 진입 전엔 실제값(to)을 유지한다(즉시 0으로 리셋하지 않음). 관측자를
    // rootMargin으로 뷰포트 진입 240px 전에 트리거해, 0→to 카운트업이 요소가 화면에 들기
    // 전에 시작되도록 한다 → 정적 "0"이나 to→0 플래시가 화면에 노출되지 않는다.
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
      { threshold: 0, rootMargin: '0px 0px 240px 0px' }
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
