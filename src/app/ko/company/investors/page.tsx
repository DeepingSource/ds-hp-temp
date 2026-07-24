import type { Metadata } from 'next';
import InvestorsView from '@/components/corporate/views/InvestorsView';
import { COMPANY } from '@/lib/company-data';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'IR · 투자 정보 — DEEPINGSOURCE Inc.',
  description: `${COMPANY.nameKo}의 비전과 시장 기회, 투자 정보. Physical AI 시대, 오프라인 공간 인텔리전스로 모든 공간을, 완벽하게.`,
  keywords: ['DeepingSource', '딥핑소스', 'IR', '투자', 'Investor Relations', 'Physical AI', 'IR Deck'],
  // Soft archive(⑤3-1) — NEXT_PUBLIC_SHOW_IR 재노출 시 robots 복구
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://www.deepingsource.io/ko/company/investors',
    languages: {
      en: 'https://www.deepingsource.io/company/investors',
      ko: 'https://www.deepingsource.io/ko/company/investors',
      ja: 'https://www.deepingsource.io/jp/company/investors',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'ko_KR',
    title: 'IR · 투자 정보 — DEEPINGSOURCE Inc.',
    description: `${COMPANY.nameKo}의 비전과 시장 기회, 투자 정보.`,
    url: 'https://www.deepingsource.io/ko/company/investors',
  },
};

export default function KoCompanyInvestorsPage() {
  return <InvestorsView locale="ko" />;
}
