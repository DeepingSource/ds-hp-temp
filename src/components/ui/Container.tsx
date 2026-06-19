import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Container — centered max-width wrapper with the standard page gutter
 * (px-4 sm:px-6). One source for the layout gutter (collapses ~315 inlined
 * "max-w-* mx-auto px-4 sm:px-6"). Override max-width via `size` or className.
 */
type Size = 'default' | 'narrow' | 'wide' | 'medium' | 'prose';

const MAXW: Record<Size, string> = {
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
  medium: 'max-w-5xl',
  narrow: 'max-w-3xl',
  prose: 'max-w-2xl',
};

export default function Container({
  children,
  size = 'default',
  className,
}: {
  children: ReactNode;
  size?: Size;
  className?: string;
}) {
  return <div className={cn('mx-auto px-4 sm:px-6', MAXW[size], className)}>{children}</div>;
}
