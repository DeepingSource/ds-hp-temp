'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * TimelineSpine — the vertical connector line of a milestone/story timeline,
 * drawn top→bottom (scaleY 0→1, origin top) the first time it scrolls into view
 * (animation plan C5). The outer wrapper keeps full height so the IntersectionObserver
 * (useScrollAnimation, with its 3s safety net) fires reliably; the inner colored bar is
 * what scales. CSS transition on an HTML element — no framer/SVG hydration concerns.
 * Under prefers-reduced-motion the line is shown fully drawn with no transition.
 *
 * @param className   positioning + size of the line track (e.g. `absolute left-5 top-5 bottom-5 w-px`)
 * @param lineClassName  the line's color (e.g. `bg-gray-200`)
 */
export default function TimelineSpine({
  className,
  lineClassName,
}: {
  className?: string;
  lineClassName?: string;
}) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      <div
        className={`h-full w-full origin-top ${lineClassName ?? ''}`}
        style={{
          transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
          transition: reduced ? undefined : 'transform 0.9s var(--ease-out-cubic)',
        }}
      />
    </div>
  );
}
