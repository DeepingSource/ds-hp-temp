import type { ReactNode } from 'react';

interface MacBookFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * MacBook Pro-style physical frame — dark anodized aluminum with screen lid,
 * hinge line, and keyboard base. Same material language as PhoneFrame/TabletFrame.
 */
export default function MacBookFrame({ children, className = '' }: MacBookFrameProps) {
  return (
    <div className={`relative mx-auto w-full max-w-4xl select-none ${className}`}>
      {/* Screen lid */}
      <div
        className="rounded-t-[0.75rem] px-[8px] pt-[8px] pb-0 relative"
        style={{
          background: 'linear-gradient(160deg, #2C2C2E 0%, #1E1E20 50%, #111113 100%)',
          boxShadow:
            '0 30px 60px rgba(0,0,0,0.5), 0 10px 25px rgba(0,0,0,0.3), 0 3px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        {/* Camera notch */}
        <div className="flex justify-center items-center h-[18px]" aria-hidden="true">
          <div className="w-2 h-2 rounded-full bg-gray-800/90 border border-gray-700/50 flex items-center justify-center">
            <div className="w-[5px] h-[5px] rounded-full bg-gray-700/80" />
          </div>
        </div>

        {/* Screen content */}
        <div className="rounded-[0.6rem] overflow-hidden">
          {children}
        </div>

        {/* Glass reflection */}
        <div
          className="absolute inset-[8px] rounded-[0.75rem] pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(148deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 35%, transparent 60%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Hinge */}
      <div
        className="h-[4px] relative z-10"
        style={{ background: 'linear-gradient(180deg, #3A3A3C 0%, #1A1A1C 100%)' }}
        aria-hidden="true"
      />

      {/* Keyboard base */}
      <div
        className="rounded-b-[0.5rem] h-[22px] relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #242426 0%, #1C1C1E 100%)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}
        aria-hidden="true"
      >
        {/* Keyboard area hint */}
        <div className="absolute inset-x-[8%] top-[4px] h-[9px] rounded-sm bg-black/15" />
        {/* Trackpad hint */}
        <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[15%] h-[6px] rounded-sm bg-black/15" />
      </div>

      {/* Ground shadow */}
      <div
        className="mx-[4%] h-[8px] rounded-b-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
    </div>
  );
}
