'use client';

import { motion } from 'framer-motion';
import {
  ClipboardList, GraduationCap, Rocket, Repeat,
  ClipboardCheck, Lightbulb, TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/cn';

/**
 * ProcessStepper — all steps stay visible while the active one auto-highlights,
 * with a progress sweep counting down to the next step (pattern adapted from the
 * cult-ui feature carousel to our design system). Click a card to jump; pauses on
 * hover; under prefers-reduced-motion it holds the first step (no auto-advance,
 * no sweep) with every step still readable.
 *
 * Icons are passed by NAME (string) so server components can use this client
 * component without passing component references across the boundary.
 */

const ICONS: Record<string, LucideIcon> = {
  ClipboardList, GraduationCap, Rocket, Repeat,
  ClipboardCheck, Lightbulb, TrendingUp,
};

export interface ProcessStep {
  title: string;
  desc: string;
  /** Step marker, e.g. "01" or "Step 1". Falls back to a padded index. */
  label?: string;
  /** Key into the local icon registry; omit for number-only cards. */
  icon?: string;
}

const COLS: Record<number, string> = {
  3: 'sm:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
};

export default function ProcessStepper({
  steps,
  interval = 3200,
  ariaLabel,
  className,
}: {
  steps: ProcessStep[];
  interval?: number;
  ariaLabel?: string;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, isVisible } = useScrollAnimation<HTMLUListElement>({ threshold: 0.3 });
  const { step: active, goTo, hoverProps, loopKey } = useMockupLoop({
    steps: steps.length,
    interval,
    active: isVisible,
    pauseOnHover: true,
  });

  return (
    <ul
      ref={ref}
      {...hoverProps}
      aria-label={ariaLabel}
      className={cn('grid gap-4 sm:gap-5', COLS[steps.length] ?? 'sm:grid-cols-2', className)}
    >
      {steps.map((s, i) => {
        const Icon = s.icon ? ICONS[s.icon] : undefined;
        const isActive = i === active;
        const label = s.label ?? `0${i + 1}`;
        return (
          <li key={s.title} className="h-full">
            <button
              type="button"
              onClick={() => goTo(i)}
              aria-current={isActive ? 'step' : undefined}
              className={cn(
                'group relative h-full w-full overflow-hidden rounded-2xl border p-6 sm:p-7 text-left transition-[border-color,box-shadow,transform] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                isActive
                  ? 'border-primary/40 bg-white shadow-card sm:-translate-y-0.5'
                  : 'border-gray-100 bg-white hover:border-primary/20',
              )}
            >
              {isActive && !reduced && (
                <motion.span
                  key={`sweep-${i}-${loopKey}`}
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: interval / 1000, ease: 'linear' }}
                />
              )}

              <div className="mb-4 flex items-center gap-3">
                {Icon && (
                  <span
                    className={cn(
                      'inline-flex h-11 w-11 items-center justify-center rounded-2xl transition-colors duration-300',
                      isActive ? 'bg-primary text-white' : 'bg-primary/10 text-primary',
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
                <span
                  className={cn(
                    'font-mono font-bold tabular-nums transition-colors duration-300',
                    Icon ? 'ml-auto text-xl' : 'text-3xl',
                    isActive ? 'text-primary' : 'text-gray-200',
                  )}
                >
                  {label}
                </span>
              </div>

              <h3 className="mb-2 text-base font-bold text-gray-900 break-keep">{s.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 break-keep">{s.desc}</p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
