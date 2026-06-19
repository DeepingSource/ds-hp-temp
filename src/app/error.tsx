'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <p className="text-5xl mb-4" aria-hidden="true">⚠️</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          문제가 발생했습니다
        </h1>
        <p className="text-gray-600 mb-6">
          일시적인 오류입니다. 다시 시도해 주세요.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="btn-primary"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
