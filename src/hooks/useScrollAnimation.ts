'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface UseScrollAnimationOptions {
  threshold?: number;
  once?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  options: UseScrollAnimationOptions = {}
) {
  const { threshold = 0.15, once = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // prefers-reduced-motion이면 즉시 visible — observer 불필요
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // 빠른 스크롤 대응 (R5): 마운트 시 이미 뷰포트에 진입했거나 위로 지나간 요소는
    // observer 콜백을 기다리지 않고 즉시 표시 — 빠른 휠/스크롤바 드래그로 요소를
    // 지나쳐 observer가 놓쳐도 빈 블록이 남지 않게 한다. (top ≤ 뷰포트 높이 = 이미 진입/통과)
    if (element.getBoundingClientRect().top <= window.innerHeight) {
      setIsVisible(true);
      return;
    }

    // Safety net: IntersectionObserver가 3초 내 트리거되지 않으면 콘텐츠 표시
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(timeout);
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      // rootMargin 하단 15% 확장: 요소가 뷰포트 하단에 닿기 전 미리 트리거해
      // 빠른 스크롤에도 진입 여유를 준다.
      { threshold, rootMargin: '0px 0px 15% 0px' }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [threshold, once, reducedMotion]);

  return { ref, isVisible };
}
