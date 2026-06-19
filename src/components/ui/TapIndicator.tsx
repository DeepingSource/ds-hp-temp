'use client';

import { AnimatePresence, motion } from 'framer-motion';

interface TapIndicatorProps {
  visible: boolean;
  /** Position relative to parent (absolute). 0–100 as percentage. */
  x?: number;
  y?: number;
  label?: string;
  size?: number;
}

/**
 * iOS-style touch indicator: instant bright flash that quickly expands and fades.
 * Parent must be `position: relative`.
 */
export default function TapIndicator({ visible, x = 50, y = 50, label, size = 44 }: TapIndicatorProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="tap"
          className="absolute pointer-events-none z-20"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: 'translate(-50%, -50%)',
            width: size,
            height: size,
          }}
          aria-hidden="true"
        >
          {/* Outer ring — expands and fades */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/25"
            initial={{ scale: 0.5, opacity: 0.9 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Inner dot — quick flash */}
          <motion.div
            className="absolute inset-[20%] rounded-full bg-white/60"
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />

          {label && (
            <motion.span
              className="absolute top-full left-1/2 mt-1 -translate-x-1/2 bg-black/60 text-white text-3xs font-medium px-2 py-0.5 rounded-full backdrop-blur-sm whitespace-nowrap"
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
