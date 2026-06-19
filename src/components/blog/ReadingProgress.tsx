export default function ReadingProgress({ progress }: { progress: number }) {
  return (
    <div className="fixed top-16 left-0 right-0 z-[var(--z-overlay)] h-1 bg-gray-100/60" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-primary to-primary/70 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
