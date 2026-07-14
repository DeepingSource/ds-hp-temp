import type { Metadata } from 'next';
import LegalDoc from '@/components/legal/LegalDoc';

// D6 physical /ko mirror — Korean is the authoritative legal text (no notice).
export const metadata: Metadata = {
  title: '이용약관 | DEEPINGSOURCE',
  description: 'SAAI 서비스 이용약관',
  alternates: { canonical: '/legal/terms' },
};

export default function KoLegalTermsPage() {
  return <LegalDoc title="이용약관" file="content/legal/terms.mdx" locale="ko" kind="terms" />;
}
