'use client';

import type { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AnimatedSection({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  return (
    <section
      id={id}
      ref={ref}
      className={`${className} ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}
    >
      {children}
    </section>
  );
}
