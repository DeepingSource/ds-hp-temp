'use client';

import { motion, useScroll } from 'framer-motion';

/**
 * ScrollProgress — 긴 랜딩의 방향감을 주는 얇은 상단 진행 바 (B-6).
 * 스크롤 위치를 그대로 반영하는 기능적 피드백이라 reduced-motion에서도 그대로 표시한다
 * (장식 모션이 아니므로 별도 우회 불필요). 페이지 콘텐츠는 건드리지 않는 부가 요소.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[var(--z-float)] h-0.5 origin-left bg-primary"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
