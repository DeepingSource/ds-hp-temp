import type { Metadata } from 'next';
import MockupGallery from '@/components/mockups/MockupGallery';

/** 내부 검토용 페이지 — 검색엔진 비노출 */
export const metadata: Metadata = {
  title: '목업 데모 리뷰 (내부용)',
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  return <MockupGallery />;
}
