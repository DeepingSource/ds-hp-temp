import type { ReactNode } from 'react';
import IosStatusBar from '@/components/ui/IosStatusBar';
import IosHomeIndicator from '@/components/ui/IosHomeIndicator';
import MockupBadge from './MockupBadge';

interface PhoneScreenProps {
  children: ReactNode;
  /** IosStatusBar bg class (e.g. 'bg-primary') */
  statusBarBg?: string;
  /** IosHomeIndicator wrapper bg class */
  homeBg?: string;
  /** Show "예시 화면" badge */
  badge?: boolean;
  /** Custom badge label */
  badgeLabel?: string;
  /** Dark status bar icons (for light-bg screens like lock screen) */
  darkStatusBar?: boolean;
  /** Dark home indicator (for light-bg screens) */
  darkHomeIndicator?: boolean;
  /** Hide home indicator */
  hideHomeIndicator?: boolean;
}

/**
 * Standard iPhone screen wrapper.
 * Provides: rounded screen div + IosStatusBar + IosHomeIndicator + MockupBadge.
 * Must be placed inside PhoneFrame.
 */
export default function PhoneScreen({
  children,
  statusBarBg = 'bg-transparent',
  homeBg = 'bg-gray-50',
  badge = true,
  badgeLabel,
  darkStatusBar = false,
  darkHomeIndicator = false,
  hideHomeIndicator = false,
}: PhoneScreenProps) {
  return (
    <div className="rounded-[2.2rem] overflow-hidden relative bg-white flex flex-col aspect-[393/852]">
      {badge && <MockupBadge label={badgeLabel} />}
      <IosStatusBar bg={statusBarBg} dark={darkStatusBar} />
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        {children}
      </div>
      {!hideHomeIndicator && (
        <div className={homeBg}>
          <IosHomeIndicator dark={darkHomeIndicator} />
        </div>
      )}
    </div>
  );
}
