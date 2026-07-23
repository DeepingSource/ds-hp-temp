export function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** SAAI Motion 주력 곡선의 스칼라 판 — 목업 count-up 재규격(MOCKUP_MASTER_PLAN §2-C) */
export function easeOutQuint(t: number) {
  return 1 - Math.pow(1 - t, 5);
}

/**
 * Cubic-bezier tuples for framer-motion `transition.ease` (animation plan A3).
 * Mirror the CSS easing vars in globals.css so JS and CSS motion share a curve.
 */
type Bezier = [number, number, number, number];

export const ease = {
  /** --ease-out-cubic — default reveal/entrance curve */
  outCubic: [0.22, 1, 0.36, 1] as Bezier,
  /** --ease-out-expo — snappier settle for emphasis */
  outExpo: [0.16, 1, 0.3, 1] as Bezier,
  /** symmetric soft in-out for loops/parallax */
  inOutSoft: [0.45, 0, 0.55, 1] as Bezier,
  /** SAAI Motion out_quint (design-system DESIGN.md ## Motion) — 사이트 outCubic과
   *  동일 커브값이지만, 목업 내부(mockup-motion.ts)는 이 이름으로 참조한다. */
  outQuint: [0.22, 1, 0.36, 1] as Bezier,
} as const;
