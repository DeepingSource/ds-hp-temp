import { Fragment } from 'react';

/**
 * WordRise — word-by-word maskRise reveal (the SAAI launch motif, nextrise-motion
 * film00). Each word rises from a clipped line, staggered. CSS-driven (see globals.css
 * `.wr-clip`/`.wr-word`/`wordRise`) — stays a server component, SSG-safe. The text ships
 * visible; the rise animates only once `html.wr-fonts-ready` is set by a tiny parse-time
 * <head> script (layout.tsx) after web fonts load, so a `font-display:swap` recalc can't
 * land mid-animation and flash an overlap (①8-5). Honors prefers-reduced-motion (words
 * appear instantly). Text stays a single readable string for screen readers / SEO.
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
