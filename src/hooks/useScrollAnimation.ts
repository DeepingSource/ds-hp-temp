'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface UseScrollAnimationOptions {
  threshold?: number;
  once?: boolean;
  /**
   * 항상 최초 뷰포트 안에 있는 콘텐츠(Hero 등)는 `true`.
   *
   * 기본값 `false`는 **서버 HTML을 opacity:0으로 렌더**한다 — 스크롤해서 만나는
   * 요소에는 맞지만, 이미 화면에 있는 Hero에 쓰면 하이드레이션이 끝날 때까지
   * 콘텐츠가 비어 보인다. 아래 fast-path는 effect(=하이드레이션 이후)에서만
   * 돌기 때문에 이 공백을 막지 못한다. `immediate`는 처음부터 visible로 시작해
   * JS 없이도 보이게 한다.
   */
  immediate?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  options: UseScrollAnimationOptions = {}
) {
  const { threshold = 0.15, once = true, immediate = false } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(immediate);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // 최초 뷰포트 콘텐츠 — 게이팅 자체를 하지 않는다(SSR부터 이미 visible)
    if (immediate) return;

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
  }, [threshold, once, reducedMotion, immediate]);

  return { ref, isVisible };
}
