'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2 } from 'lucide-react';

const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  contact: z.string().min(5, '연락처를 정확히 입력해주세요'),
  storeCount: z.string().min(1, '매장 수를 선택해주세요'),
  affiliationType: z.string().min(1, '소속 유형을 선택해주세요'),
  brandName: z.string().optional(),
  plan: z.string().optional(),
  inquiryType: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const storeCountOptions = [
  { value: '1', label: '1개' },
  { value: '2-3', label: '2-3개' },
  { value: '4-5', label: '4-5개' },
  { value: '6+', label: '6개 이상' },
];

const planOptions = [
  { value: 'newsletter', label: '뉴스레터 (무료)' },
  { value: 'standard', label: '기본형 (4,900원/월)' },
  { value: 'premium', label: 'POS연동 (9,900원/월)' },
  { value: 'enterprise', label: '케어·인사이트 (별도협의)' },
];

const affiliationTypeOptions = [
  { value: 'franchisee', label: '가맹점주' },
  { value: 'hq-ops', label: '본사 운영팀' },
  { value: 'sv', label: 'SV (슈퍼바이저)' },
  { value: 'other', label: '기타' },
];

const inquiryTypeOptions = [
  { value: 'pricing', label: '가격 문의' },
  { value: 'tech', label: '기술 문의' },
  { value: 'other', label: '기타' },
];

export default function InlineContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('문의 신청에 실패했습니다. 다시 시도해주세요.');
      }

      setIsSubmitted(true);
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

  if (isSubmitted) {
    return (
      <div className="bg-primary-lighter rounded-2xl p-8 text-center" role="status" aria-live="polite">
        <div className="mb-4 flex justify-center"><CheckCircle2 className="w-12 h-12 text-success" /></div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">문의가 접수되었습니다!</h3>
        <p className="text-gray-600">영업일 기준 1-2일 내로 연락드리겠습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          궁금한 점이 있으신가요?
        </h3>
        <p className="text-gray-600 text-sm">
          담당자가 연락드려 자세히 안내해 드립니다.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="inline-name" className="block text-sm font-medium text-gray-700 mb-1">
              이름 <span className="text-error">*</span>
            </label>
            <input
              id="inline-name"
              type="text"
              autoComplete="name"
              placeholder="이름"
              {...register('name')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent text-gray-900 placeholder-gray-400 transition-shadow"
              disabled={isSubmitting}
              aria-required="true"
              aria-describedby={errors.name ? 'inline-name-error' : undefined}
              aria-invalid={errors.name ? 'true' : undefined}
            />
            {errors.name && (
              <p id="inline-name-error" className="mt-1 text-sm text-error" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="inline-contact" className="block text-sm font-medium text-gray-700 mb-1">
              연락처 <span className="text-error">*</span>
            </label>
            <input
              id="inline-contact"
              type="text"
              autoComplete="off"
              spellCheck="false"
              placeholder="전화번호 또는 이메일"
              {...register('contact')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent text-gray-900 placeholder-gray-400 transition-shadow"
              disabled={isSubmitting}
              aria-required="true"
              aria-describedby={errors.contact ? 'inline-contact-error' : undefined}
              aria-invalid={errors.contact ? 'true' : undefined}
            />
            {errors.contact && (
              <p id="inline-contact-error" className="mt-1 text-sm text-error" role="alert">
                {errors.contact.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="inline-storeCount" className="block text-sm font-medium text-gray-700 mb-1">
            운영 중인 매장 수 <span className="text-error">*</span>
          </label>
          <select
            id="inline-storeCount"
            {...register('storeCount')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent text-gray-900 bg-white transition-shadow"
            disabled={isSubmitting}
            aria-required="true"
            aria-describedby={errors.storeCount ? 'inline-store-error' : undefined}
            aria-invalid={errors.storeCount ? 'true' : undefined}
          >
            <option value="">선택해주세요</option>
            {storeCountOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.storeCount && (
            <p id="inline-store-error" className="mt-1 text-sm text-error" role="alert">
              {errors.storeCount.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="inline-affiliationType" className="block text-sm font-medium text-gray-700 mb-1">
              소속 유형 <span className="text-error">*</span>
            </label>
            <select
              id="inline-affiliationType"
              {...register('affiliationType')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent text-gray-900 bg-white transition-shadow"
              disabled={isSubmitting}
              aria-required="true"
              aria-describedby={errors.affiliationType ? 'inline-affiliation-error' : undefined}
              aria-invalid={errors.affiliationType ? 'true' : undefined}
            >
              <option value="">선택해주세요</option>
              {affiliationTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.affiliationType && (
              <p id="inline-affiliation-error" className="mt-1 text-sm text-error" role="alert">
                {errors.affiliationType.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="inline-brandName" className="block text-sm font-medium text-gray-700 mb-1">
              브랜드명 <span className="text-gray-500">(선택)</span>
            </label>
            <input
              id="inline-brandName"
              type="text"
              placeholder="예: CU, 올리브영"
              {...register('brandName')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent text-gray-900 placeholder-gray-400 transition-shadow"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="inline-plan" className="block text-sm font-medium text-gray-700 mb-1">
              관심 플랜
            </label>
            <select
              id="inline-plan"
              {...register('plan')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent text-gray-900 bg-white transition-shadow"
              disabled={isSubmitting}
            >
              <option value="">선택해주세요</option>
              {planOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="inline-inquiryType" className="block text-sm font-medium text-gray-700 mb-1">
              문의 유형
            </label>
            <select
              id="inline-inquiryType"
              {...register('inquiryType')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent text-gray-900 bg-white transition-shadow"
              disabled={isSubmitting}
            >
              <option value="">선택해주세요</option>
              {inquiryTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="inline-message" className="block text-sm font-medium text-gray-700 mb-1">
            문의 내용 <span className="text-gray-500">(선택)</span>
          </label>
          <textarea
            id="inline-message"
            placeholder="궁금한 점이나 요청사항을 적어주세요"
            {...register('message')}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent text-gray-900 placeholder-gray-400 transition-shadow resize-none"
            disabled={isSubmitting}
          />
        </div>

        {error && (
          <p className="text-sm text-error text-center" role="alert">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin motion-reduce:animate-none h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              신청 중...
            </span>
          ) : '상담 신청하기'}
        </button>

        <p className="text-center text-xs text-gray-500">
          <span className="text-success" aria-hidden="true">✓</span> 영업일 기준 1-2일 내 연락드립니다
        </p>
      </form>
    </div>
  );
}
