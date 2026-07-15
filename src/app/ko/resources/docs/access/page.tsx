import { Suspense } from 'react';
import type { Metadata } from 'next';
import DocsAccessView from '@/components/docs/DocsAccessView';

export const metadata: Metadata = {
  title: '접근 제한 문서 | DEEPINGSOURCE',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <DocsAccessView locale="ko" />
    </Suspense>
  );
}
