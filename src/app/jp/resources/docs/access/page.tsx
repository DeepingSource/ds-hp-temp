import { Suspense } from 'react';
import type { Metadata } from 'next';
import DocsAccessView from '@/components/docs/DocsAccessView';

export const metadata: Metadata = {
  title: 'アクセス制限ドキュメント | DEEPINGSOURCE',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <DocsAccessView locale="jp" />
    </Suspense>
  );
}
