import type { Metadata } from 'next';
import InvestorsView from '@/components/corporate/views/InvestorsView';
import { COMPANY } from '@/lib/company-data';

export const metadata: Metadata = {
  title: 'IR · 투자 정보 — DEEPINGSOURCE Inc.',
  description: `${COMPANY.nameKo}의 비전과 시장 기회, 투자 정보. Physical AI 시대, 오프라인 공간 인텔리전스로 모든 공간을, 완벽하게.`,
  keywords: ['DeepingSource', '딥핑소스', 'IR', '투자', 'Investor Relations', 'Physical AI', 'IR Deck'],
  alternates: {
    canonical: 'https://www.deepingsource.io/ko/company/investors',
    languages: {
      en: 'https://www.deepingsource.io/company/investors',
      ko: 'https://www.deepingsource.io/ko/company/investors',
      ja: 'https://www.deepingsource.io/jp/company/investors',
    },
  },
  openGraph: {
    locale: 'ko_KR',
    title: 'IR · 투자 정보 — DEEPINGSOURCE Inc.',
    description: `${COMPANY.nameKo}의 비전과 시장 기회, 투자 정보.`,
    url: 'https://www.deepingsource.io/ko/company/investors',
  },
};

export default function KoCompanyInvestorsPage() {
  return <InvestorsView locale="ko" />;
}
