'use client';

import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useHeroRotation } from '@/components/ui/HeroRotation';
import { useCurrentTime } from '@/lib/mockup-time';

/**
 * CorporateHeroFigure — the hero's evidence visual (HERO_SPACES_PLAN_v1 §4).
 *
 * Renders the six space frames (heroSpaceImages — same order as the rotating
 * noun) as an absolutely-positioned stack and crossfades to the frame whose
 * index the shared HeroRotation clock is on. Contracts:
 *
 * - LCP unchanged: only frame 0 is in the first-paint markup with `priority`;
 *   the other frames mount after an idle tick and preload in the background.
 * - Load-gated: we only crossfade to a frame that has actually loaded — if the
 *   beat advances before the frame is ready (or its file 404s), the current
 *   frame simply stays. No flash, no empty box.
 * - Reduced motion: static frame 0, no rotation (matches RotatingNoun showing
 *   the fixed token).
 * - Hovering the figure takes a hold on the shared clock (word + image pause
 *   together); pointer tilt parallax is kept from the previous version.
 * - A11y: the stack reads as ONE image — fixed `alt` on frame 0, empty alt +
 *   aria-hidden on the rest (the rotation is decorative, like the noun layer).
 */

const MAX_TILT = 5; // degrees
const CROSSFADE_MS = 600;

export default function CorporateHeroFigure({
  images,
  alt,
  trackLabel,
}: {
  /** ordered frames — MUST match heroQuestion.words order (HERO_SPACES_PLAN_v1 §1) */
  images: ReadonlyArray<{ key: string; src: string }>;
  alt: string;
  trackLabel: string;
}) {
  const rot = useHeroRotation();
  const localReduced = usePrefersReducedMotion();
  const reduced = rot ? rot.reduced : localReduced;

  // D8: 타임스탬프는 이미지에 박제하지 않고 상대 규칙으로 렌더(빌드 시점 박제 금지).
  // reduced-motion이면 훅이 갱신을 멈추므로 정적 시각 1회 표시로 자연 축퇴.
  const { raw: nowRaw } = useCurrentTime({ interval: 1000 });
  const p2 = (n: number) => String(n).padStart(2, '0');
  const osdStamp = `${nowRaw.getFullYear()}-${p2(nowRaw.getMonth() + 1)}-${p2(nowRaw.getDate())} ${p2(nowRaw.getHours())}:${p2(nowRaw.getMinutes())}:${p2(nowRaw.getSeconds())}`;

  /* ── which frame the clock wants vs which frame we can show ── */
  const target = rot && !reduced ? rot.index % images.length : 0;
  const [loaded, setLoaded] = useState<boolean[]>(() => images.map(() => false));
  const markLoaded = useCallback((i: number) => {
    setLoaded((prev) => (prev[i] ? prev : prev.map((v, j) => (j === i ? true : v))));
  }, []);
  // Shown frame advances to the target only once the target has LOADED — else it
  // holds the current frame (no flash, no empty box while a frame loads or 404s).
  // The rAF hop keeps the setState out of the effect body (react-hooks rules) at
  // the cost of one frame — invisible under the 600ms crossfade.
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!loaded[target]) return;
    const raf = requestAnimationFrame(() => setShown(target));
    return () => cancelAnimationFrame(raf);
  }, [target, loaded]);

  /* ── defer non-LCP frames to an idle tick, then let them preload ── */
  const [restMounted, setRestMounted] = useState(false);
  useEffect(() => {
    if (images.length < 2) return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setRestMounted(true));
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setRestMounted(true), 500);
    return () => clearTimeout(t);
  }, [images.length]);

  /* ── pointer tilt (unchanged) ── */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 200, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), spring);

  /* ── hover = hold the shared clock (paired via ref, released on unmount) ── */
  const held = useRef(false);
  useEffect(() => {
    const release = rot?.release;
    return () => {
      if (held.current) {
        held.current = false;
        release?.();
      }
    };
  }, [rot?.release]);

  const handleMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (reduced || e.pointerType === 'touch') return;
      const r = e.currentTarget.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    },
    [reduced, px, py],
  );

  const handleEnter = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === 'touch' || !rot || held.current) return;
      held.current = true;
      rot.hold();
    },
    [rot],
  );

  const handleLeave = useCallback(() => {
    px.set(0);
    py.set(0);
    if (held.current) {
      held.current = false;
      rot?.release();
    }
  }, [px, py, rot]);

  return (
    <div
      style={{ perspective: 1000 }}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
    >
      <motion.div
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 shadow-elevated"
      >
        {images.map((img, i) => {
          if (i > 0 && !restMounted) return null;
          const active = i === shown;
          return (
            <Image
              key={img.key}
              src={img.src}
              alt={i === 0 ? alt : ''}
              aria-hidden={i === 0 ? undefined : true}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 540px, 100vw"
              onLoad={() => markLoaded(i)}
              className={`object-cover transition-[opacity,transform] ease-out ${
                active ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'
              }`}
              style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
            />
          );
        })}
        {/* The frames carry baked-in anonymized tracking; we only add the live chips.
            타임스탬프는 D8로 webp에서 제거(재생성) — 여기 코드 오버레이가 유일한 시각. */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-gray-950/70 px-2.5 py-1 text-2xs font-medium text-white backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse" />
            {trackLabel}
          </span>
          <span
            suppressHydrationWarning
            className="absolute right-3 top-3 rounded-md bg-gray-950/70 px-2 py-1 text-2xs font-mono tabular-nums text-white/90 backdrop-blur-sm"
          >
            {osdStamp}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
