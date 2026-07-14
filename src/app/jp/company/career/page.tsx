import type { Metadata } from 'next';
import CareerView from '@/components/corporate/views/CareerView';
import { COMPANY } from '@/lib/company-data';

export const metadata: Metadata = {
  title: '採用 — DEEPINGSOURCE Inc. | ともに織りなすひとつの会社',
  description: `${COMPANY.name}とともに、オフライン空間AIの未来を創る仲間を探しています。`,
  keywords: ['DeepingSource', '採用', '求人', 'キャリア', 'Career', 'AI採用', 'スタートアップ求人'],
  alternates: {
    canonical: 'https://www.deepingsource.io/jp/company/career',
    languages: {
      en: 'https://www.deepingsource.io/company/career',
      ko: 'https://www.deepingsource.io/ko/company/career',
      ja: 'https://www.deepingsource.io/jp/company/career',
    },
  },
  openGraph: {
    title: '採用 — DEEPINGSOURCE Inc.',
    description: `${COMPANY.name}とともに働く仲間を探しています。`,
    url: 'https://www.deepingsource.io/jp/company/career',
  },
};

export default function JpCompanyCareerPage() {
  return <CareerView locale="jp" />;
}
