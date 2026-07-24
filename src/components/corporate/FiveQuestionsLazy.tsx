'use client';

import dynamic from 'next/dynamic';
import type { Locale } from '@/lib/i18n';

/**
 * FiveQuestionsLazy — SolutionsView·DiagnosisView(서버 컴포넌트)에서
 * FiveQuestionsMockup을 dynamic(ssr:false)로 싣기 위한 공유 클라이언트 래퍼
 * (MM Phase 3 배치 규칙). 목업은 Viewport 예외 반응형 카드 그리드(모바일 세로
 * 스택 ↔ md 5열)라 고정 비율 placeholder 대신 md 기준 실측 근사 min-h로 자리를
 * 예약한다 — CLS 최소화.
 */
const FiveQuestionsMockup = dynamic(
  () => import('@/components/mockups/FiveQuestionsMockup'),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full min-h-[480px] animate-pulse rounded-2xl border border-gray-200 bg-gray-50"
        aria-hidden="true"
      />
    ),
  },
);

export default function FiveQuestionsLazy({ locale }: { locale: Locale }) {
  return <FiveQuestionsMockup locale={locale} />;
}
