import type { Metadata } from 'next';
import CareerView from '@/components/corporate/views/CareerView';
import { COMPANY } from '@/lib/company-data';

export const metadata: Metadata = {
  title: '채용 — DEEPINGSOURCE Inc. | 함께 짜는 한 회사',
  description: `${COMPANY.nameKo}와 함께 오프라인 공간 AI의 미래를 만들 동료를 찾습니다.`,
  keywords: ['DeepingSource', '딥핑소스', '채용', '경력', 'Career', 'AI 채용', '스타트업 채용'],
  alternates: {
    canonical: 'https://www.deepingsource.io/ko/company/career',
    languages: {
      en: 'https://www.deepingsource.io/company/career',
      ko: 'https://www.deepingsource.io/ko/company/career',
      ja: 'https://www.deepingsource.io/jp/company/career',
    },
  },
  openGraph: {
    title: '채용 — DEEPINGSOURCE Inc.',
    description: `${COMPANY.nameKo}와 함께할 동료를 찾습니다.`,
    url: 'https://www.deepingsource.io/ko/company/career',
  },
};

export default function KoCompanyCareerPage() {
  return <CareerView locale="ko" />;
}
