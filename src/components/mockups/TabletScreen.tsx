import type { ReactNode } from 'react';
import IpadStatusBar from '@/components/ui/IpadStatusBar';
import MockupBadge from './MockupBadge';

interface TabletScreenProps {
  children: ReactNode;
  /** IpadStatusBar bg class */
  statusBarBg?: string;
  /** Show "예시 화면" badge */
  badge?: boolean;
  /** Custom badge label */
  badgeLabel?: string;
  /** Landscape orientation (default: portrait) */
  landscape?: boolean;
}

/**
 * Standard iPad screen wrapper.
 * Provides: rounded screen div + IpadStatusBar + MockupBadge.
 * Must be placed inside TabletFrame.
 */
export default function TabletScreen({
  children,
  statusBarBg = 'bg-gray-800',
  badge = true,
  badgeLabel,
  landscape = false,
}: TabletScreenProps) {
  return (
    <div className={`rounded-xl overflow-hidden relative bg-white flex flex-col ${landscape ? 'aspect-[1180/820]' : 'aspect-[820/1180]'}`}>
      {badge && <MockupBadge label={badgeLabel} />}
      <IpadStatusBar bg={statusBarBg} />
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
