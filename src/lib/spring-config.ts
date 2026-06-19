import type { Transition } from 'framer-motion';

/**
 * iOS-matching spring presets (CASpringAnimation equivalents).
 *
 * iOS CASpringAnimation defaults: damping≈10, stiffness≈100, mass=1
 * We tune per use case below.
 */

/** Cards, content panels entering the screen */
export const springGentle: Transition = {
  type: 'spring',
  damping: 26,
  stiffness: 320,
  mass: 1,
};

/** Quick interactive elements — badges, chips, small pops */
export const springSnappy: Transition = {
  type: 'spring',
  damping: 20,
  stiffness: 440,
  mass: 0.85,
};

/** Bouncy — checkmarks, confirmations, icons */
export const springBouncy: Transition = {
  type: 'spring',
  damping: 14,
  stiffness: 380,
  mass: 0.75,
};

/** Tab/segment sliding pill — fast settle, no visible overshoot */
export const springTabPill: Transition = {
  type: 'spring',
  damping: 28,
  stiffness: 420,
  mass: 0.8,
};

/**
 * Chat bubble pop — scales from origin.
 * Tuned to match iMessage: damping 18 gives slight overshoot without being bouncy.
 */
export const springBubble: Transition = {
  type: 'spring',
  damping: 18,
  stiffness: 340,
  mass: 0.85,
};

/** Swipe/dismiss — accelerates out quickly */
export const springDismiss: Transition = {
  type: 'spring',
  damping: 24,
  stiffness: 300,
  mass: 0.9,
};

/** Notification slide-in from top */
export const springNotif: Transition = {
  type: 'spring',
  damping: 24,
  stiffness: 320,
  mass: 0.85,
};
