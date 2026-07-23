import type { Metadata } from 'next';
import TeamView from '@/components/corporate/views/TeamView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'People & Team | DEEPINGSOURCE',
  description: 'Meet the team behind DeepingSource. Researchers, software engineers, and product experts shaping the future of privacy-preserving spatial AI.',
  keywords: ['DeepingSource', 'Team', 'People', 'Leadership', 'AI company', 'Spatial Agentic AI'],
  alternates: {
    canonical: 'https://www.deepingsource.io/company/team',
    languages: {
      en: 'https://www.deepingsource.io/company/team',
      ko: 'https://www.deepingsource.io/ko/company/team',
      ja: 'https://www.deepingsource.io/jp/company/team',
    },
  },
  openGraph: {
    ...OG_BASE,
    title: 'People & Team — DEEPINGSOURCE Inc.',
    description: 'Researchers, software engineers, and product experts shaping the future of privacy-preserving spatial AI.',
    url: 'https://www.deepingsource.io/company/team',
    locale: 'en_US',
    alternateLocale: ['ko_KR', 'ja_JP'],
  },
};

export default function TeamPage() {
  return <TeamView locale="en" />;
}
