'use client';

import dynamic from 'next/dynamic';
import { type Locale } from '@/lib/i18n';

/**
 * 클라이언트 전용 목업 래퍼 — 정적 export(`output: export`)에서 애니메이션 목업은
 * SSR을 건너뛰어야 하므로 `ssr: false`로 로드한다(사이트 컨벤션, 계획 §9).
 * 서버 컴포넌트(ExpoLanding/ProductStory)는 이 래퍼를 media prop으로 주입한다.
 */

const StoreCountCountingMockup = dynamic(() => import('@/components/mockups/StoreCountCountingMockup'), { ssr: false });
const StoreCareStatusMockup = dynamic(() => import('@/components/mockups/StoreCareStatusMockup'), { ssr: false });
const PopMakerMockup = dynamic(() => import('./PopMakerMockup'), { ssr: false });

/** store count — 유동인구·유입 카운팅 앱(기준선 드로잉 + 실시간 카운트). */
export function CountMockup({ locale }: { locale: Locale }) {
  return (
    <div className="w-full max-w-[300px] mx-auto">
      <StoreCountCountingMockup active locale={locale} />
    </div>
  );
}

/** saai care — 매장 상태 홈(스코어·상태칩·감지 알림·온도 게이지). */
export function CareMockup({ locale }: { locale: Locale }) {
  return (
    <div className="w-full max-w-[280px] mx-auto">
      <StoreCareStatusMockup active locale={locale} />
    </div>
  );
}

/** saai store — POP 메이커 생성 애니메이션(before → 생성 중 → 완성 POP 순환). */
export function PopMockup() {
  return <PopMakerMockup active />;
}
