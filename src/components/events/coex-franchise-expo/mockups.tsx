'use client';

import dynamic from 'next/dynamic';
import { type Locale } from '@/lib/i18n';

/**
 * 클라이언트 전용 목업 래퍼 — 정적 export(`output: export`)에서 애니메이션 목업은
 * SSR을 건너뛰어야 하므로 `ssr: false`로 로드한다(사이트 컨벤션, 계획 §9).
 * 서버 컴포넌트(ExpoLanding/ProductStory)는 이 래퍼를 media prop으로 주입한다.
 */

const StoreInsightMockup = dynamic(() => import('@/components/mockups/StoreInsightMockup'), { ssr: false });
const StoreCareMockup = dynamic(() => import('@/components/mockups/StoreCareMockup'), { ssr: false });

/** saai count — 폰 대시보드(상권/유입 분석). */
export function CountMockup({ locale }: { locale: Locale }) {
  return (
    <div className="w-full max-w-[300px] mx-auto">
      <StoreInsightMockup active locale={locale} />
    </div>
  );
}

/** saai care — 실시간 매장 상태·알림 앱. */
export function CareMockup({ locale }: { locale: Locale }) {
  return (
    <div className="w-full max-w-[280px] mx-auto">
      <StoreCareMockup active locale={locale} />
    </div>
  );
}
