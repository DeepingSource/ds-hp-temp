'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import Spinner from '@/components/ui/Spinner';

const schema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
});

type FormData = z.infer<typeof schema>;

export default function NewsletterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('구독 신청에 실패했습니다. 다시 시도해주세요.');
      }

      setIsSuccess(true);
      redirectTimeoutRef.current = setTimeout(() => router.push('/thank-you'), 800);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('요청 시간이 초과되었습니다. 다시 시도해주세요.');
      } else {
        setError(err instanceof Error ? err.message : '오류가 발생했습니다');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label htmlFor="newsletter-email" className="sr-only">
          이메일 주소
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          spellCheck="false"
          placeholder="이메일 주소 입력"
          {...register('email')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent text-gray-900 placeholder-gray-400 transition-shadow"
          disabled={isSubmitting}
          aria-required="true"
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={errors.email ? 'true' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-error" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {error && (
        <p className="text-sm text-error text-center" role="alert">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || isSuccess}
        className={`w-full py-3 disabled:cursor-not-allowed transition-colors duration-300 ${
          isSuccess
            ? 'bg-success text-white rounded-xl font-semibold'
            : 'btn-primary disabled:opacity-50'
        }`}
      >
        {isSuccess ? (
          <span className="inline-flex items-center gap-2">
            <Check className="w-5 h-5 animate-checkmark" /> 구독 완료!
          </span>
        ) : isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <Spinner />
            구독 중...
          </span>
        ) : '뉴스레터 구독하기'}
      </button>
    </form>
  );
}
