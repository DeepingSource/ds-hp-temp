import type { Metadata } from 'next';
import PartnershipView from '@/components/corporate/views/PartnershipView';
import { COMPANY } from '@/lib/company-data';

export const metadata: Metadata = {
  title: 'Partnership — DEEPINGSOURCE Inc. | Your store, like one too',
  description: `${COMPANY.name}'s partner program. Grow offline spatial AI together with installation, channel, and technology partners.`,
  keywords: ['DeepingSource', 'Partnership', 'Partner program', 'SAAI', 'Channel partner', 'Reseller'],
  alternates: {
    canonical: 'https://www.deepingsource.io/company/partnership',
    languages: {
      en: 'https://www.deepingsource.io/company/partnership',
      ko: 'https://www.deepingsource.io/ko/company/partnership',
      ja: 'https://www.deepingsource.io/jp/company/partnership',
    },
  },
  openGraph: {
    title: 'Partnership — DEEPINGSOURCE Inc.',
    description: `${COMPANY.name}'s partner program.`,
    url: 'https://www.deepingsource.io/company/partnership',
  },
};

export default function CompanyPartnershipPage() {
  return <PartnershipView locale="en" />;
}
