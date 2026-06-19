export default function ScanlineOverlay({ opacity = 'opacity-[0.04]' }: { opacity?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${opacity}`}
      aria-hidden="true"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)',
      }}
    />
  );
}
