import type { Metadata } from 'next';
import LegalDoc from '@/components/legal/LegalDoc';

// D6 physical /ko mirror — Korean is the authoritative legal text (no notice).
export const metadata: Metadata = {
  title: '개인정보 처리방침 | DEEPINGSOURCE',
  description: 'SAAI 개인정보 처리방침',
  alternates: { canonical: '/legal/privacy' },
};

export default function KoLegalPrivacyPage() {
  return <LegalDoc title="개인정보 처리방침" file="content/legal/privacy.mdx" locale="ko" kind="privacy" />;
}
