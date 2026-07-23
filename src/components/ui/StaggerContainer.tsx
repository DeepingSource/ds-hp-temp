'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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
  // -80px는 카드가 뷰포트 하단에 걸친 채 스크롤이 멈추면 발화하지 않아
  // 반투명 잔류를 만든다(홈 정제계획 F4) — 얕은 마진으로 완화.
  margin = '-40px',
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: margin as `${number}px` });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants(staggerDelay)}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}
