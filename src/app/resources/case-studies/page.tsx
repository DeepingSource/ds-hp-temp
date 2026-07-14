import type { Metadata } from 'next';
import CaseStudiesView from '@/components/corporate/views/CaseStudiesView';

export const metadata: Metadata = {
  title: 'Case Studies | DEEPINGSOURCE',
  description:
    'From on-site measurement across 53 convenience and unmanned stores, to a 100-store HQ rollout, drugstore stockout standardization, cafe cleanliness KPI sync, and large-venue anonymization. DeepingSource deployment cases read through the five Golden Case stages.',
  alternates: {
    canonical: '/resources/case-studies',
    languages: {
      en: '/resources/case-studies',
      ko: '/ko/resources/case-studies',
      ja: '/jp/resources/case-studies',
    },
  },
  openGraph: {
    title: 'Case Studies | DEEPINGSOURCE',
    description: 'Deployment cases read through the five Golden Case stages — Discover, Verify, Translate, Sync, Re-measure.',
    url: '/resources/case-studies',
  },
};

export default function Page() {
  return <CaseStudiesView locale="en" />;
}
