import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MockupHarness from '@/components/mockups/MockupHarness';

/**
 * 목업 검증 하네스 (내부용) — MOCKUP_MASTER_PLAN_v1 0-6.
 * 게이트·force-dynamic 근거는 /demo/page.tsx와 동일(fail-safe 긍정 조건):
 * dev이거나 ENABLE_MOCKUP_DEMO=true 명시 opt-in일 때만 노출.
 */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '목업 검증 하네스 (내부용)',
  robots: { index: false, follow: false },
};

export default function HarnessPage() {
  const enabled = process.env.NODE_ENV === 'development' || process.env.ENABLE_MOCKUP_DEMO === 'true';
  if (!enabled) notFound();
  return <MockupHarness />;
}
