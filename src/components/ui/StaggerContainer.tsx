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
  margin = '-80px',
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
