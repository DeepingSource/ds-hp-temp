import type { Metadata } from 'next';
import LegalDoc from '@/components/legal/LegalDoc';

// D6 physical /jp mirror — Korean body is authoritative; LegalDoc shows a
// non-binding JP notice that an official translation is being prepared.
export const metadata: Metadata = {
  title: '個人情報処理方針 | DEEPINGSOURCE',
  description: 'SAAI 個人情報処理方針',
  alternates: { canonical: '/legal/privacy' },
};

export default function JpLegalPrivacyPage() {
  return <LegalDoc title="개인정보 처리방침" file="content/legal/privacy.mdx" locale="jp" kind="privacy" />;
}
