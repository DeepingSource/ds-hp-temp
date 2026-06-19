'use client';

import { usePathname } from 'next/navigation';
import { getLocaleFromPath, type Locale } from '@/lib/i18n';

const C: Record<Locale, { title: string; body: string; retry: string }> = {
  ko: {
    title: '문제가 발생했습니다',
    body: '일시적인 오류입니다. 다시 시도해 주세요.',
    retry: '다시 시도',
  },
  en: {
    title: 'Something went wrong',
    body: 'A temporary error occurred. Please try again.',
    retry: 'Try again',
  },
  jp: {
    title: '問題が発生しました',
    body: '一時的なエラーです。もう一度お試しください。',
    retry: 'もう一度試す',
  },
};

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  let locale = getLocaleFromPath(pathname);
  // Korean minisite (path `/`, marked by the proxy's x-site-mode cookie) → ko.
  if (
    locale === 'en' &&
    typeof document !== 'undefined' &&
    document.cookie.includes('x-site-mode=minisite')
  ) {
    locale = 'ko';
  }
  const t = C[locale];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <p className="text-5xl mb-4" aria-hidden="true">⚠️</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t.title}
        </h1>
        <p className="text-gray-600 mb-6">
          {t.body}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="btn-primary"
        >
          {t.retry}
        </button>
      </div>
    </div>
  );
}
