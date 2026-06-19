export default function ReadingProgress({ progress }: { progress: number }) {
  return (
    <div className="fixed top-16 left-0 right-0 z-[var(--z-overlay)] h-1 bg-gray-100/60" aria-hidden="true">
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
