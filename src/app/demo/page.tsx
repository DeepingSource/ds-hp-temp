import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MockupGallery from '@/components/mockups/MockupGallery';

/**
 * 내부 검토용 페이지 — 프로덕션 숨김 (2026-07-16 리뷰).
 * force-dynamic: 정적 프리렌더를 막아 게이트가 매 요청 런타임에 평가되게 함
 * (정적 생성 시 notFound()가 우회되어 페이지가 프리렌더되던 문제 해결, 1-6).
 * 게이트는 fail-safe 긍정 조건: `next start`에서 NODE_ENV가 'production'으로
 * 오지 않는 환경이 있어(부정 `!== 'production'` 신뢰 불가) → dev이거나 명시적
 * opt-in일 때만 노출, 그 외(undefined 포함)는 전부 숨김.
 * 노출 조건: 개발 모드(next dev), 또는 ENABLE_MOCKUP_DEMO=true 명시 설정.
 * ⚠️ 임시/프리뷰 도메인도 env 미설정이면 비노출(/help ENABLE_EDITOR_GUIDE 패턴).
 */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '목업 데모 리뷰 (내부용)',
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  const enabled = process.env.NODE_ENV === 'development' || process.env.ENABLE_MOCKUP_DEMO === 'true';
  if (!enabled) notFound();
  return <MockupGallery />;
}
