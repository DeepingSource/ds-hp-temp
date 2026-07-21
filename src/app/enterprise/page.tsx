import type { Metadata } from 'next';
import EnterpriseView from '@/components/corporate/views/EnterpriseView';

export const metadata: Metadata = {
  title: 'Enterprise & Franchise | DEEPINGSOURCE',
  description:
    'Standardize multi-store operations for HQ and supervisors. The 5-stage Golden Case scales one store’s success across the network, with real-time monitoring and data-driven decisions.',
  alternates: {
    canonical: '/enterprise',
    languages: {
      en: '/enterprise',
      ko: '/ko/enterprise',
      ja: '/jp/enterprise',
    },
  },
  openGraph: {
    locale: 'en_US',
    title: 'Enterprise & Franchise | DEEPINGSOURCE',
    description: 'Multi-store operations standardization for HQ and supervisors — the 5-stage Golden Case.',
    url: '/enterprise',
  },
};

export default function EnterprisePage() {
  return <EnterpriseView locale="en" />;
}
