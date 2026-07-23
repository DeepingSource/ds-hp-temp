import type { Metadata } from 'next';
import AboutView from '@/components/corporate/views/AboutView';
import { COMPANY } from '@/lib/company-data';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'About — DEEPINGSOURCE Inc. | Perfect every space.',
  description: `DeepingSource is an AI company that safely understands and optimizes every offline space through anonymization AI. Founded ${COMPANY.foundingYear}, ${COMPANY.patents} patents.`,
  keywords: ['DeepingSource', 'About', 'AI company', 'Spatial Agentic AI', 'Anonymization AI'],
  alternates: {
    canonical: 'https://www.deepingsource.io/company/about',
    languages: {
      en: 'https://www.deepingsource.io/company/about',
      ko: 'https://www.deepingsource.io/ko/company/about',
      ja: 'https://www.deepingsource.io/jp/company/about',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'en_US',
    title: 'About — DEEPINGSOURCE Inc.',
    description: `DeepingSource is an AI company that safely understands and optimizes every offline space through anonymization AI. ${COMPANY.patents} patents.`,
    url: 'https://www.deepingsource.io/company/about',
  },
};

export default function CompanyAboutPage() {
  return <AboutView locale="en" />;
}
