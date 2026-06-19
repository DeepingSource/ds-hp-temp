import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Card — the standard surface: rounded-2xl + border + white bg. One source for the
 * card shell, and routes ALL hover elevation through the --shadow-card-hover token
 * (kills hardcoded rgba hover-shadow recipes). Polymorphic via `as` (e.g. Link/a
 * for clickable cards); extra props (href, target, …) pass through.
 */
export default function Card({
  as,
  hover = false,
  className,
  children,
  ...rest
}: {
  as?: ElementType;
  hover?: boolean;
  className?: string;
  children?: ReactNode;
} & Record<string, unknown>) {
  const Tag = as ?? 'div';
  return (
    <Tag
      className={cn(
        'rounded-2xl border border-gray-200 bg-white',
        hover &&
          'transition-[border-color,box-shadow] hover:border-primary-light hover:shadow-[var(--shadow-card-hover)]',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
