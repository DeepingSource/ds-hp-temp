import type { Metadata } from 'next';
import PrivacyPage from '../../privacy/page';

export const metadata: Metadata = {
  title: '개인정보 처리방침 | DEEPINGSOURCE',
  description: 'SAAI 개인정보 처리방침',
  alternates: { canonical: '/legal/privacy' },
};

export default function LegalPrivacyPage() {
  return <PrivacyPage />;
}
