import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MockupGallery from '@/components/mockups/MockupGallery';

/** 내부 검토용 페이지 — 개발 모드에서만 접근 (2026-07-16 리뷰: 프로덕션 숨김). */
export const metadata: Metadata = {
  title: '목업 데모 리뷰 (내부용)',
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  if (process.env.NODE_ENV === 'production') notFound();
  return <MockupGallery />;
}
