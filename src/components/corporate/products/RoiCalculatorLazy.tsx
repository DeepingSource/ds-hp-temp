'use client';

import dynamic from 'next/dynamic';
import type { Locale } from '@/lib/i18n';

/**
 * RoiCalculatorLazy — ProductsView(서버 컴포넌트)에서 RoiCalculatorWidget을
 * dynamic(ssr:false)로 싣기 위한 얇은 클라이언트 래퍼(MM Phase 3 배치 규칙).
 * 위젯은 Viewport 예외 인터랙티브 카드(max-w-md, 높이 콘텐츠 파생)라 비율
 * placeholder 대신 실측 근사 min-h로 자리를 예약한다 — CLS 최소화.
 */
const RoiCalculatorWidget = dynamic(
  () => import('@/components/mockups/RoiCalculatorWidget'),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto w-full max-w-md min-h-[420px] animate-pulse rounded-2xl border border-gray-200 bg-gray-50"
        aria-hidden="true"
      />
    ),
  },
);

export default function RoiCalculatorLazy({ locale }: { locale: Locale }) {
  return <RoiCalculatorWidget locale={locale} />;
}
