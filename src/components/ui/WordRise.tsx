import { Fragment } from 'react';

/**
 * WordRise — word-by-word maskRise reveal (the SAAI launch motif, nextrise-motion
 * film00). Each word rises from a clipped line, staggered. Pure CSS (see globals.css
 * `.wr-clip`/`.wr-word`/`wordRise`), so it runs at first paint with no JS/hydration
 * wait — keeps the component a server component and is SSG-safe. Honors
 * prefers-reduced-motion (words appear instantly). Text stays a single readable
 * string for screen readers / SEO; spaces between words allow normal line wrapping.
 */
export default function WordRise({
  text,
  className = '',
  stagger = 60,
  start = 0,
}: {
  text: string;
  className?: string;
  /** per-word delay in ms */
  stagger?: number;
  /** initial delay before the first word in ms */
  start?: number;
}) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="wr-clip">
            <span className="wr-word" style={{ animationDelay: `${start + i * stagger}ms` }}>
              {w}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </span>
  );
}
