import type { Metadata } from 'next';
import AboutView from '@/components/corporate/views/AboutView';
import { COMPANY } from '@/lib/company-data';

export const metadata: Metadata = {
  title: '회사 소개 — DeepingSource Inc. | 모든 매장을 한 매장처럼',
  description: `${COMPANY.companyIntro} ${COMPANY.foundingYear}년 설립, 특허 ${COMPANY.patentsLabel}.`,
  keywords: ['DeepingSource', '딥핑소스', '회사 소개', 'About', 'AI 기업', 'Spatial Agentic AI', '익명화 AI'],
  alternates: {
    canonical: 'https://www.deepingsource.io/ko/company/about',
    languages: {
      en: 'https://www.deepingsource.io/company/about',
      ko: 'https://www.deepingsource.io/ko/company/about',
      ja: 'https://www.deepingsource.io/jp/company/about',
    },
  },
  openGraph: {
    title: '회사 소개 — DeepingSource Inc.',
    description: `${COMPANY.companyIntro} 특허 ${COMPANY.patentsLabel}.`,
    url: 'https://www.deepingsource.io/ko/company/about',
  },
};

export default function KoCompanyAboutPage() {
  return <AboutView locale="ko" />;
}
