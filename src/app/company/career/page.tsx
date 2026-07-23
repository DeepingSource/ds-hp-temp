import type { Metadata } from 'next';
import CareerView from '@/components/corporate/views/CareerView';
import { COMPANY } from '@/lib/company-data';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Careers — DEEPINGSOURCE Inc. | Weaving one company',
  description: `Join ${COMPANY.name} and help build the future of offline spatial AI.`,
  keywords: ['DeepingSource', 'Careers', 'Jobs', 'Hiring', 'AI careers', 'Startup jobs'],
  alternates: {
    canonical: 'https://www.deepingsource.io/company/career',
    languages: {
      en: 'https://www.deepingsource.io/company/career',
      ko: 'https://www.deepingsource.io/ko/company/career',
      ja: 'https://www.deepingsource.io/jp/company/career',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'en_US',
    title: 'Careers — DEEPINGSOURCE Inc.',
    description: `Join ${COMPANY.name} and build offline spatial AI with us.`,
    url: 'https://www.deepingsource.io/company/career',
  },
};

export default function CompanyCareerPage() {
  return <CareerView locale="en" />;
}
