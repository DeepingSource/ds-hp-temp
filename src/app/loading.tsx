export default function Loading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin motion-reduce:animate-none" />
        <p className="sr-only">Loading</p>
      </div>
    </div>
  );
}
