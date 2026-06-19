import type { Metadata } from 'next';
import InvestorsView from '@/components/corporate/views/InvestorsView';
import { COMPANY } from '@/lib/company-data';

export const metadata: Metadata = {
  title: 'Investor Relations — DeepingSource Inc.',
  description: `${COMPANY.name}'s vision, market opportunity, and investor information. In the Physical AI era, offline spatial intelligence makes every store, like one.`,
  keywords: ['DeepingSource', 'IR', 'Investors', 'Investor Relations', 'Physical AI', 'IR Deck'],
  alternates: {
    canonical: 'https://www.deepingsource.io/company/investors',
    languages: {
      en: 'https://www.deepingsource.io/company/investors',
      ko: 'https://www.deepingsource.io/ko/company/investors',
      ja: 'https://www.deepingsource.io/jp/company/investors',
    },
  },
  openGraph: {
    title: 'Investor Relations — DeepingSource Inc.',
    description: `${COMPANY.name}'s vision, market opportunity, and investor information.`,
    url: 'https://www.deepingsource.io/company/investors',
  },
};

export default function CompanyInvestorsPage() {
  return <InvestorsView locale="en" />;
}
