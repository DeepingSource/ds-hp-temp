import type { Metadata } from 'next';
import PartnershipView from '@/components/corporate/views/PartnershipView';
import { COMPANY } from '@/lib/company-data';

export const metadata: Metadata = {
  title: 'パートナーシップ — DEEPINGSOURCE Inc. | パートナーの店舗もひとつの店舗のように',
  description: `${COMPANY.name}のパートナープログラム。設置パートナー、チャネルパートナー、技術パートナーとともに、オフライン空間AIを拡張します。`,
  keywords: ['DeepingSource', 'パートナーシップ', 'パートナープログラム', 'SAAI', 'チャネルパートナー', '提携'],
  alternates: {
    canonical: 'https://www.deepingsource.io/jp/company/partnership',
    languages: {
      en: 'https://www.deepingsource.io/company/partnership',
      ko: 'https://www.deepingsource.io/ko/company/partnership',
      ja: 'https://www.deepingsource.io/jp/company/partnership',
    },
  },
  openGraph: {
    title: 'パートナーシップ — DEEPINGSOURCE Inc.',
    description: `${COMPANY.name}のパートナープログラム。`,
    url: 'https://www.deepingsource.io/jp/company/partnership',
  },
};

export default function JpCompanyPartnershipPage() {
  return <PartnershipView locale="jp" />;
}
