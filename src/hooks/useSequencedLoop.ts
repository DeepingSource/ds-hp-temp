'use client';

import { useEffect, useRef } from 'react';

/**
 * useSequencedLoop — shared scaffolding for mockups that play a multi-step,
 * variably-timed sequence on a loop (animation plan C10). It owns the parts every
 * such mockup re-implements by hand: a cancel flag, the timer bookkeeping, the
 * loop restart, re-syncing when the tab becomes visible again, and the
 * reduced-motion / inactive short-circuits. The *content* of the sequence stays
 * with the caller: `run(sched)` schedules each step via the provided `sched(fn, ms)`
 * and returns the sequence's total duration; the loop restarts `pauseMs` after that.
 *
 * `run`/`onStatic` are read through refs so they always see fresh state without
 * restarting the loop — pass only the values that should restart it in `deps`.
 *
 * @param run        builds one pass of the sequence; returns its total duration (ms)
 * @param active     gate — the loop runs only while true
 * @param reducedMotion  when true, skip animation and call `onStatic` once
 * @param onStatic   render the final/resting state (reduced-motion or no-JS fallback)
 * @param pauseMs    gap after a pass before the next begins
 * @param deps       values that, when changed, rebuild the loop
 */
export function useSequencedLoop(
  run: (sched: (fn: () => void, ms: number) => void) => number,
  {
    active,
    reducedMotion,
    onStatic,
    pauseMs = 0,
    deps = [],
  }: {
    active: boolean;
    reducedMotion: boolean;
    onStatic?: () => void;
    pauseMs?: number;
    deps?: unknown[];
  },
): void {
  const runRef = useRef(run);
  runRef.current = run;
  const staticRef = useRef(onStatic);
  staticRef.current = onStatic;

  useEffect(() => {
    if (!active) return;
    if (reducedMotion) {
      staticRef.current?.();
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const sched = (fn: () => void, ms: number) => {
      const t = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timers.push(t);
    };

    const loop = () => {
      if (cancelled) return;
      timers.splice(0).forEach(clearTimeout);
      const total = runRef.current(sched);
      sched(loop, total + pauseMs);
    };

    loop();

    const handleVisibility = () => {
      if (!document.hidden) {
        cancelled = true;
        timers.splice(0).forEach(clearTimeout);
        cancelled = false;
        loop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reducedMotion, pauseMs, ...deps]);
}
