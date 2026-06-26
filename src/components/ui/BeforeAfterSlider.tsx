'use client';

import Image from 'next/image';
import { useId, useRef, useState } from 'react';

/**
 * BeforeAfterSlider — a drag-to-reveal comparison of two stacked images.
 * The "after" image (anonymized) sits on top, clipped to the handle position so
 * dragging wipes it back to the "before". Accessible: an overlaid range input
 * carries focus + arrow-key control; pointer/touch drag updates the same value.
 * No external library. Reduced-motion safe (it's user-driven, no autoplay).
 */
export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
  caption,
  alt,
  className = '',
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
  caption?: string;
  alt: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50); // 0..100, % revealed of the "after" layer
  const frameRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const setFromClientX = (clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <figure className={className}>
      <div
        ref={frameRef}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-card select-none touch-none"
        onPointerDown={(e) => {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) setFromClientX(e.clientX);
        }}
      >
        {/* Before (clear) — base layer */}
        <Image src={beforeSrc} alt={alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" draggable={false} priority={false} />
        {/* After (anonymized) — top layer, clipped to handle */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <Image src={afterSrc} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" draggable={false} priority={false} />
        </div>

        {/* corner labels */}
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white">{beforeLabel}</span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-primary/85 px-2.5 py-1 text-xs font-medium text-white">{afterLabel}</span>

        {/* handle */}
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -ml-px w-0.5 bg-white/90 shadow" />
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-elevated">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-700" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 15 12 9 6" transform="translate(6 0)" />
            </svg>
          </div>
        </div>

        {/* accessible range control */}
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`${beforeLabel} ↔ ${afterLabel}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      {caption && <figcaption className="mt-3 text-xs text-gray-500 break-keep">{caption}</figcaption>}
    </figure>
  );
}
