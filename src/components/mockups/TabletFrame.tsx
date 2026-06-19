import type { ReactNode } from 'react';

interface TabletFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * iPad-style physical frame — dark anodized aluminum bezel with edge buttons,
 * multi-layer shadow, and screen glass reflection overlay.
 */
export default function TabletFrame({ children, className = '' }: TabletFrameProps) {
  const topButtonStyle: React.CSSProperties = {
    background: 'linear-gradient(180deg, #252527 0%, #404042 50%, #2E2E30 100%)',
  };

  return (
    <div className={`relative mx-auto w-full max-w-3xl ${className}`}>
      {/* Power button — top right */}
      <div
        className="absolute top-[-4px] right-[20%] h-[4px] w-[8%] rounded-t-sm z-10"
        style={topButtonStyle}
        aria-hidden="true"
      />
      {/* Volume Up */}
      <div
        className="absolute top-[-4px] right-[10%] h-[4px] w-[5%] rounded-t-sm z-10"
        style={topButtonStyle}
        aria-hidden="true"
      />
      {/* Volume Down */}
      <div
        className="absolute top-[-4px] right-[4%] h-[4px] w-[5%] rounded-t-sm z-10"
        style={topButtonStyle}
        aria-hidden="true"
      />

      {/* Device shell */}
      <div
        className="rounded-[1.4rem] p-[5px] relative overflow-hidden"
        style={{
          background: 'linear-gradient(150deg, #2C2C2E 0%, #1A1A1C 50%, #111113 100%)',
          boxShadow:
            '0 30px 60px rgba(0,0,0,0.5), 0 10px 25px rgba(0,0,0,0.3), 0 3px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.09)',
        }}
      >
        {children}

        {/* Screen glass reflection */}
        <div
          className="absolute inset-[5px] rounded-[1rem] pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(148deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 35%, transparent 60%)',
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
