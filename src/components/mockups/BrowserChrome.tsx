import type { ReactNode } from 'react';

interface BrowserChromeProps {
  /** 'dark' = dark bg (CCTV/dashboard), 'light' = light bg (analytics) */
  variant?: 'dark' | 'light';
  /** Size variant: 'sm' = compact (mockup embed), 'md' = default, 'lg' = full */
  size?: 'sm' | 'md' | 'lg';
  /** Center content (title, icon, etc.) */
  children?: ReactNode;
  /** Right side content (e.g. LIVE indicator) */
  trailing?: ReactNode;
}

const SIZE_CLASSES = {
  sm: 'px-3 py-2',
  md: 'px-5 py-3',
  lg: 'px-6 py-3.5',
} as const;

const DOT_CLASSES = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-3 h-3',
} as const;

export default function BrowserChrome({ variant = 'dark', size = 'md', children, trailing }: BrowserChromeProps) {
  const isDark = variant === 'dark';

  return (
    <div
      className={`${SIZE_CLASSES[size]} flex items-center justify-between ${
        isDark
          ? 'bg-gray-900 border-b border-white/10'
          : 'bg-gray-100 border-b border-gray-200'
      }`}
    >
      {/* Traffic light dots — 실 OS 크롬 재현 색(macOS 신호등), SAAI 토큰 치환 대상 아님 */}
      <div className="flex items-center gap-2">
        <span className={`${DOT_CLASSES[size]} rounded-full ${isDark ? 'bg-red-400/70' : 'bg-red-400'}`} />
        <span className={`${DOT_CLASSES[size]} rounded-full ${isDark ? 'bg-yellow-400/70' : 'bg-yellow-400'}`} />
        <span className={`${DOT_CLASSES[size]} rounded-full ${isDark ? 'bg-green-400/70' : 'bg-green-400'}`} />
      </div>

      {/* Center content */}
      {children && (
        <div className={`flex items-center gap-2 text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {children}
        </div>
      )}

      {/* Trailing content */}
      {trailing ?? <div className="w-16" />}
    </div>
  );
}
