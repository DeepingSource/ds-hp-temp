import type { Metadata } from 'next';
import InvestorsView from '@/components/corporate/views/InvestorsView';
import { COMPANY } from '@/lib/company-data';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Investor Relations — DEEPINGSOURCE Inc.',
  description: `${COMPANY.name}'s vision, market opportunity, and investor information. In the Physical AI era, offline spatial intelligence makes every store, like one.`,
  keywords: ['DeepingSource', 'IR', 'Investors', 'Investor Relations', 'Physical AI', 'IR Deck'],
  // Soft archive(⑤3-1) — NEXT_PUBLIC_SHOW_IR 재노출 시 robots 복구
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://www.deepingsource.io/company/investors',
    languages: {
      en: 'https://www.deepingsource.io/company/investors',
      ko: 'https://www.deepingsource.io/ko/company/investors',
      ja: 'https://www.deepingsource.io/jp/company/investors',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'en_US',
    title: 'Investor Relations — DEEPINGSOURCE Inc.',
    description: `${COMPANY.name}'s vision, market opportunity, and investor information.`,
    url: 'https://www.deepingsource.io/company/investors',
  },
};

export default function CompanyInvestorsPage() {
  return <InvestorsView locale="en" />;
}
