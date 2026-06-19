'use client';

import Script from 'next/script';

/**
 * Umami Analytics 컴포넌트
 * 
 * 사용법:
 * 1. .env.local 파일에 다음 환경 변수를 설정합니다:
 *    - NEXT_PUBLIC_UMAMI_SCRIPT_URL: Umami 스크립트 URL (예: https://analytics.yourdomain.com/script.js)
 *    - NEXT_PUBLIC_UMAMI_WEBSITE_ID: 웹사이트 ID
 * 
 * 2. layout.tsx에서 <Analytics /> 컴포넌트를 추가합니다.
 * 
 * 참고: Umami는 GDPR/CCPA 준수를 위한 개인정보 보호 친화적 Analytics입니다.
 * 
 * @see https://umami.is/docs
 */
export default function Analytics() {
  const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  // 환경 변수가 설정되지 않은 경우 Analytics를 로드하지 않음
  if (!scriptUrl || !websiteId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Analytics] Umami 환경 변수가 설정되지 않았습니다.');
    }
    return null;
  }

  return (
    <Script
      src={scriptUrl}
      data-website-id={websiteId}
      strategy="afterInteractive"
      async
      defer
    />
  );
}

/**
 * 사용자 정의 이벤트 트래킹 헬퍼 함수
 * 
 * 사용 예시:
 * ```typescript
 * import { trackEvent } from '@/components/Analytics';
 * 
 * // 버튼 클릭 이벤트 트래킹
 * <button onClick={() => trackEvent('cta_click', { page: 'home', section: 'hero' })}>
 *   시작하기
 * </button>
 * ```
 */
export function trackEvent(eventName: string, eventData?: Record<string, string | number | boolean>) {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, eventData);
  }
}

/**
 * 페이지 뷰 트래킹 헬퍼 함수
 * Next.js App Router에서는 자동으로 처리되지만, 
 * 수동으로 트래킹이 필요한 경우 사용합니다.
 */
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.trackView(url);
  }
}

// TypeScript 타입 선언
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, string | number | boolean>) => void;
      trackView: (url: string) => void;
    };
  }
}
