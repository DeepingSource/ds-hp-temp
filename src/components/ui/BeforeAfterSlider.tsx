'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import { animate } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import TapIndicator from '@/components/ui/TapIndicator';

/**
 * BeforeAfterSlider — a drag-to-reveal comparison of two stacked images.
 * The "after" image (anonymized) sits on top, clipped to the handle position so
 * dragging wipes it back to the "before". Accessible: an overlaid range input
 * carries focus + arrow-key control; pointer/touch drag updates the same value.
 * No external library. Reduced-motion safe (it's user-driven, no autoplay).
 *
 * `nudge` (opt-in): the first time the slider scrolls into view it peeks the wipe
 * both ways once + flashes a TapIndicator, hinting it's draggable. Cancelled the
 * moment the user interacts, and skipped under prefers-reduced-motion.
 */
export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
  caption,
  alt,
  className = '',
  nudge = false,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
  caption?: string;
  alt: string;
  className?: string;
  nudge?: boolean;
}) {
  const [pos, setPos] = useState(50); // 0..100, % revealed of the "after" layer
  const [showTap, setShowTap] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const reduced = usePrefersReducedMotion();
  const interactedRef = useRef(false);
  const nudgedRef = useRef(false);
  const nudgeControlsRef = useRef<ReturnType<typeof animate> | null>(null);

  const stopNudge = () => {
    interactedRef.current = true;
    nudgeControlsRef.current?.stop();
    setShowTap(false);
  };

  // One-time hint: peek the wipe + flash a tap when first scrolled into view.
  useEffect(() => {
    if (!nudge || reduced) return;
    const el = frameRef.current;
    if (!el) return;
    let tapTimer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || nudgedRef.current || interactedRef.current) return;
        nudgedRef.current = true;
        io.disconnect();
        nudgeControlsRef.current = animate(50, [50, 30, 70, 50], {
          duration: 1.7,
          ease: 'easeInOut',
          onUpdate: (v) => {
            if (!interactedRef.current) setPos(v);
          },
        });
        setShowTap(true);
        tapTimer = setTimeout(() => setShowTap(false), 900);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      nudgeControlsRef.current?.stop();
      if (tapTimer) clearTimeout(tapTimer);
    };
  }, [nudge, reduced]);

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
          stopNudge();
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
          onChange={(e) => { stopNudge(); setPos(Number(e.target.value)); }}
          aria-label={`${beforeLabel} ↔ ${afterLabel}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />

        {/* draggability hint — flashes at the handle on first view (opt-in via `nudge`) */}
        <TapIndicator visible={showTap} x={pos} y={50} size={48} />
      </div>
      {caption && <figcaption className="mt-3 text-xs text-gray-500 break-keep">{caption}</figcaption>}
    </figure>
  );
}
