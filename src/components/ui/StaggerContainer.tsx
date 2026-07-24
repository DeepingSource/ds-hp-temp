'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  margin?: string;
}

const containerVariants = (staggerDelay: number) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: staggerDelay },
  },
});

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  // B-1: 양수 마진 — 카드가 뷰포트에 들어오기 전(아래 160px)에 발화시켜, 헤딩만 뜬 채
  // 본문이 opacity:0으로 비어 보이는 "빈 여백" 구간을 없앤다. (음수 마진은 늦게 발화)
  margin = '160px',
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isInView = useInView(ref, { once: true, margin: margin as `${number}px` });
  // B-7: reduced-motion이면 리빌 없이 처음부터 최종 상태로 렌더(MotionProvider가 opacity는
  // 남겨 두므로 여기서 명시적으로 우회한다).
  const show = reduced || isInView;

  return (
    <motion.div
      ref={ref}
      variants={containerVariants(staggerDelay)}
      initial={reduced ? 'show' : 'hidden'}
      animate={show ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}
