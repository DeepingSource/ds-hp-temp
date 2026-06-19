'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Spinner from '@/components/ui/Spinner';

const schema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
});

type FormData = z.infer<typeof schema>;

interface InlineNewsletterFormProps {
  /** 'light' (기본) = 밝은 배경, 'dark' = 어두운 배경 */
  variant?: 'light' | 'dark';
  /** 샘플 브리핑 링크 (성공 상태에서 표시) */
  sampleHref?: string;
}

/**
 * 가로형 뉴스레터 구독 폼.
 * 한 줄에 이메일 입력 + 구독 버튼 배치.
 */
export default function InlineNewsletterForm({ variant = 'light', sampleHref }: InlineNewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const formId = useRef(`nl-${Math.random().toString(36).slice(2, 7)}`).current;

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const controller = new AbortController();
      abortRef.current = controller;
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (!res.ok) throw new Error('구독 신청에 실패했습니다. 다시 시도해주세요.');
      setIsSuccess(true);
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

  const isDark = variant === 'dark';

  if (isSuccess) {
    return (
      <div className={`inline-flex flex-col items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium ${
        isDark ? 'bg-success/20 border border-success/30 text-emerald-300' : 'bg-success/10 border border-success/20 text-success'
      }`}>
        <span className="inline-flex items-center gap-2">
          <Check className="w-5 h-5" />
          구독 완료! 첫 브리핑을 기다려주세요.
        </span>
        {sampleHref && (
          <Link href={sampleHref} className={`text-xs font-medium underline underline-offset-2 ${isDark ? 'text-gray-300 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} transition-colors`}>
            샘플 브리핑 미리보기 →
          </Link>
        )}
      </div>
    );
  }

  const inputId = `${formId}-email`;
  const errorId = `${formId}-error`;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto lg:mx-0" noValidate>
        <label htmlFor={inputId} className="sr-only">이메일 주소</label>
        <input
          id={inputId}
          type="email"
          autoComplete="email"
          spellCheck="false"
          placeholder="이메일 주소 입력"
          {...register('email')}
          disabled={isSubmitting}
          aria-required="true"
          aria-describedby={errors.email ? errorId : undefined}
          aria-invalid={errors.email ? 'true' : undefined}
          className={`flex-1 min-w-0 px-4 py-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-shadow text-sm ${
            isDark
              ? 'bg-white/10 border border-white/20 text-white placeholder-gray-400'
              : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-400'
          }`}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 text-sm whitespace-nowrap inline-flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-colors ${
            isDark
              ? 'bg-blue-500 hover:bg-blue-400 text-slate-900'
              : 'btn-primary'
          }`}
        >
          {isSubmitting ? (
            <>
              <Spinner />
              구독 중…
            </>
          ) : (
            <>
              무료 구독
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
      {errors.email && (
        <p id={errorId} className="mt-1.5 text-sm text-error" role="alert">{errors.email.message}</p>
      )}
      {error && (
        <p className="mt-1.5 text-sm text-error" role="alert">{error}</p>
      )}
    </div>
  );
}
