import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * IconChip — the rounded tinted square that holds a section/card icon. One source
 * for the "w-11 h-11 rounded-xl bg-primary-lighter …" pattern. Put the icon as
 * children (e.g. <IconChip><Boxes className="w-5 h-5 text-primary" /></IconChip>).
 */
type Size = 'sm' | 'md';

const SIZE: Record<Size, string> = {
  sm: 'w-10 h-10',
  md: 'w-11 h-11',
};

export default function IconChip({
  children,
  size = 'md',
  className,
}: {
  children: ReactNode;
  size?: Size;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center rounded-xl bg-primary-lighter',
        SIZE[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
