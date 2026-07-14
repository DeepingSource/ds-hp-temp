import type { Metadata } from 'next';
import LegalDoc from '@/components/legal/LegalDoc';

// D6 physical /jp mirror — Korean body is authoritative; LegalDoc shows a
// non-binding JP notice that an official translation is being prepared.
export const metadata: Metadata = {
  title: '利用規約 | DEEPINGSOURCE',
  description: 'SAAI サービス利用規約',
  alternates: { canonical: '/legal/terms' },
};

export default function JpLegalTermsPage() {
  return <LegalDoc title="이용약관" file="content/legal/terms.mdx" locale="jp" kind="terms" />;
}
