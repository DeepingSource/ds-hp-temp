import type { ReactNode } from 'react';
import AnimatedSection from './AnimatedSection';
import { cn } from '@/lib/cn';

/**
 * Section — a page section with the standard vertical rhythm + background variant,
 * built on AnimatedSection (keeps the scroll-reveal). One source for the section
 * shell (collapses ~88 inlined "py-20 lg:py-28 …"). Compose with <Container>.
 */
type Variant = 'default' | 'alt' | 'dark';
type Pad = 'default' | 'compact' | 'none';

const VARIANT: Record<Variant, string> = {
  default: 'bg-white',
  alt: 'bg-[var(--layer-section-alt,#F7F9FC)]',
  dark: 'section-dark noise-overlay',
};

const PAD: Record<Pad, string> = {
  default: 'py-20 lg:py-28',
  compact: 'py-16 lg:py-20',
  none: '',
};

export default function Section({
  children,
  variant = 'default',
  pad = 'default',
  id,
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  pad?: Pad;
  id?: string;
  className?: string;
}) {
  return (
    <AnimatedSection id={id} className={cn(PAD[pad], VARIANT[variant], className)}>
      {children}
    </AnimatedSection>
  );
}
