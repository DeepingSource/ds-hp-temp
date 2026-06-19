import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Eyebrow — the small uppercase kicker above section headings. One source for the
 * brand kicker style (collapses ~117 inlined variants). Pass margin via className
 * (e.g. "mb-3"); pick a tone for light vs dark sections.
 */
type Tone = 'primary' | 'light' | 'muted';

const TONE: Record<Tone, string> = {
  primary: 'text-primary', // on light sections
  light: 'text-primary-light', // on dark sections
  muted: 'text-gray-500',
};

export default function Eyebrow({
  children,
  tone = 'primary',
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p className={cn('text-xs font-bold uppercase tracking-[0.2em]', TONE[tone], className)}>
      {children}
    </p>
  );
}
