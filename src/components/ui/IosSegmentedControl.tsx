'use client';

import { motion } from 'framer-motion';
import { springTabPill } from '@/lib/spring-config';

interface Segment<T extends string> {
  key: T;
  label: string;
}

interface IosSegmentedControlProps<T extends string> {
  segments: Segment<T>[];
  active: T;
  /** Tailwind text color class for the active label, e.g. 'text-violet-700' */
  activeTextClass?: string;
  /** Unique layout ID — must be unique per page if multiple controls exist */
  layoutId: string;
}

/**
 * iOS-style segmented control with a spring-animated sliding pill background.
 * Renders as a purely visual, pointer-events-none component (no onClick — parent controls state).
 */
export default function IosSegmentedControl<T extends string>({
  segments,
  active,
  activeTextClass = 'text-gray-900',
  layoutId,
}: IosSegmentedControlProps<T>) {
  return (
    <div className="flex bg-white/15 rounded-lg p-0.5 relative">
      {segments.map((seg) => {
        const isActive = seg.key === active;
        return (
          <div key={seg.key} className="relative flex-1">
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 bg-white rounded-md shadow-sm"
                transition={springTabPill}
              />
            )}
            <span
              className={`relative z-10 flex items-center justify-center w-full text-xs font-medium py-1.5 transition-colors duration-150 ${
                isActive ? activeTextClass : 'text-white/70'
              }`}
              aria-hidden="true"
            >
              {seg.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
