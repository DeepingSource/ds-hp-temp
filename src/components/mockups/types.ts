/**
 * 목업 컴포넌트 공통 타입
 *
 * 모든 인터랙티브 목업은 BaseMockupProps를 확장.
 */

import type { Locale } from '@/lib/i18n';

/** 모든 인터랙티브 목업 컴포넌트에 공통으로 적용되는 기본 props */
export interface BaseMockupProps {
  /** false로 설정하면 내부 애니메이션 순환을 중지합니다 (탭 비활성 시 활용) */
  active?: boolean;
  /** 매장명 오버라이드 (기본: '강남역점') */
  storeName?: string;
  /** UI 문자열·날짜 포맷 로케일 (기본 ko — 미니사이트 하위호환) */
  locale?: Locale;
  /** 추가 CSS 클래스 */
  className?: string;
}
