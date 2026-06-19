import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * HeroBadge — the pill kicker that sits above a page-hero headline (icon/dot +
 * short label). One source for the repeated "inline-flex … rounded-full …" pill
 * (collapses 13 dark + 4 light verbatim copies). Put the icon + label as children.
 *
 * `tone` picks the dark (on dark hero) vs light (on light hero) treatment and
 * carries that variant's default bottom margin. Pass `className` to override the
 * margin (e.g. AboutView's "mb-10" instead of the dark default "mb-8").
 */
type Tone = 'dark' | 'light';

const BASE: Record<Tone, string> = {
  dark: 'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/70 text-sm font-medium tracking-wide backdrop-blur-sm',
  light:
    'inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-lighter text-primary text-xs font-medium tracking-wide',
};

const DEFAULT_MARGIN: Record<Tone, string> = {
  dark: 'mb-8',
  light: 'mb-6',
};

export default function HeroBadge({
  children,
  tone,
  className,
}: {
  children: ReactNode;
  tone: Tone;
  className?: string;
}) {
  return (
    <div className={cn(BASE[tone], className ?? DEFAULT_MARGIN[tone])}>{children}</div>
  );
}
