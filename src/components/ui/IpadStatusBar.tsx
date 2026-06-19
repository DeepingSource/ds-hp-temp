'use client';

import { useState, useEffect } from 'react';

interface IpadStatusBarProps {
  time?: string;
  /** Tailwind bg class */
  bg?: string;
  /** Dark text/icons for light backgrounds */
  dark?: boolean;
}

function useCurrentTime() {
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const fmt = () => {
      const now = new Date();
      return `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    };
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 60_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

/** iPad status bar — time centered, battery % + icon on right */
export default function IpadStatusBar({ time, bg = 'bg-gray-800', dark = false }: IpadStatusBarProps) {
  const liveTime = useCurrentTime();
  const displayTime = time ?? liveTime;
  const color = dark ? 'text-gray-800' : 'text-white';

  return (
    <div className={`shrink-0 ${bg} px-6 py-2 flex items-center justify-between relative`}>
      {/* Time — centered */}
      <span className={`absolute left-1/2 -translate-x-1/2 text-[13px] font-semibold ${color}`} suppressHydrationWarning>
        {displayTime}
      </span>

      {/* Left spacer */}
      <div className="w-16" />

      {/* Right: status icons */}
      <div className={`flex items-center gap-[5px] ${color}`}>
        {/* WiFi */}
        <svg className="w-[15px] h-[11px]" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
          <circle cx="8" cy="11.2" r="1.4" />
          <path opacity="0.7" d="M4.7 7.7a4.7 4.7 0 016.6 0l1.3-1.3A6.6 6.6 0 008 4.3a6.6 6.6 0 00-4.6 2.1l1.3 1.3z" />
          <path opacity="0.4" d="M2 5a8.5 8.5 0 0112 0L15.4 3.6A10.5 10.5 0 008 1 10.5 10.5 0 00.6 3.6L2 5z" />
        </svg>

        {/* Battery percentage */}
        <span className="text-2xs font-medium leading-none" aria-hidden="true">85%</span>

        {/* Battery icon */}
        <svg className="w-[25px] h-[12px]" viewBox="0 0 25 12" fill="currentColor" aria-hidden="true">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5"
            stroke="currentColor" strokeOpacity="0.35" fill="none" />
          <rect x="22" y="4" width="2.5" height="4" rx="1.5" opacity="0.4" />
          <rect x="2" y="2" width="17" height="8" rx="2" />
        </svg>
      </div>
    </div>
  );
}
