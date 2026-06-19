import type { Metadata } from 'next';
import TermsPage from '../../terms/page';

export const metadata: Metadata = {
  title: '이용약관 | DeepingSource',
  description: 'SAAI 서비스 이용약관',
};

export default function LegalTermsPage() {
  return <TermsPage />;
}
