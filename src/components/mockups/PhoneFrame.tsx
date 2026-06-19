import type { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * iPhone-style physical frame — dark anodized aluminum bezel with side buttons,
 * multi-layer shadow, and screen glass reflection overlay.
 */
export default function PhoneFrame({ children, className = '' }: PhoneFrameProps) {
  const buttonStyle = (dir: 'left' | 'right') =>
    ({
      background:
        dir === 'left'
          ? 'linear-gradient(90deg, #252527 0%, #404042 60%, #2E2E30 100%)'
          : 'linear-gradient(90deg, #2E2E30 0%, #404042 40%, #252527 100%)',
    }) as React.CSSProperties;

  return (
    <div className={`relative mx-auto w-full max-w-[420px] ${className}`}>
      {/* Mute switch */}
      <div
        className="absolute -left-[4px] top-[18%] w-[4px] h-[4.5%] rounded-l-sm z-10"
        style={buttonStyle('left')}
        aria-hidden="true"
      />
      {/* Volume Up */}
      <div
        className="absolute -left-[4px] top-[26%] w-[4px] h-[7%] rounded-l-sm z-10"
        style={buttonStyle('left')}
        aria-hidden="true"
      />
      {/* Volume Down */}
      <div
        className="absolute -left-[4px] top-[35%] w-[4px] h-[7%] rounded-l-sm z-10"
        style={buttonStyle('left')}
        aria-hidden="true"
      />
      {/* Power / Side button */}
      <div
        className="absolute -right-[4px] top-[28%] w-[4px] h-[11%] rounded-r-sm z-10"
        style={buttonStyle('right')}
        aria-hidden="true"
      />

      {/* Device shell */}
      <div
        className="rounded-[2.6rem] p-[5px] relative overflow-hidden"
        style={{
          background: 'linear-gradient(150deg, #2C2C2E 0%, #1A1A1C 50%, #111113 100%)',
          boxShadow:
            '0 40px 80px rgba(0,0,0,0.55), 0 15px 30px rgba(0,0,0,0.35), 0 4px 10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.09)',
        }}
      >
        {children}

        {/* Screen glass reflection — subtle glare from top-left */}
        <div
          className="absolute inset-[5px] rounded-[2.2rem] pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(148deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.025) 35%, transparent 60%)',
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
