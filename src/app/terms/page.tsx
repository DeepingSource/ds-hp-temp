import type { Metadata } from 'next';
import LegalDoc from '@/components/legal/LegalDoc';

export const metadata: Metadata = {
  title: '이용약관 | SAAI',
  description: 'SAAI 서비스 이용약관',
  // /terms re-renders the same content served at the public /legal/terms — point the
  // canonical there to consolidate the duplicate.
  alternates: { canonical: '/legal/terms' },
};

export default function TermsPage() {
  return <LegalDoc title="이용약관" file="content/legal/terms.mdx" locale="en" kind="terms" />;
}
