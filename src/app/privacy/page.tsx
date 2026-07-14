import type { Metadata } from 'next';
import LegalDoc from '@/components/legal/LegalDoc';

export const metadata: Metadata = {
  title: '개인정보 처리방침 | SAAI',
  description: 'SAAI 개인정보 처리방침',
  // /privacy re-renders the same content served at the public /legal/privacy — point
  // the canonical there to consolidate the duplicate.
  alternates: { canonical: '/legal/privacy' },
};

export default function PrivacyPage() {
  return <LegalDoc title="개인정보 처리방침" file="content/legal/privacy.mdx" />;
}
