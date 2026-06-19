import type { Metadata } from 'next';
import PrivacyPage from '../../privacy/page';

export const metadata: Metadata = {
  title: '개인정보 처리방침 | DeepingSource',
  description: 'SAAI 개인정보 처리방침',
};

export default function LegalPrivacyPage() {
  return <PrivacyPage />;
}
