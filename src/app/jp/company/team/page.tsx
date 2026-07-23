import type { Metadata } from 'next';
import TeamView from '@/components/corporate/views/TeamView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'チーム & リーダーシップ | DEEPINGSOURCE',
  description: 'オフライン空間の未来を創る DEEPINGSOURCE のチームメンバーとリーダーシップを紹介します。',
  keywords: ['DeepingSource', 'ディーピングソース', 'チーム', 'リーダーシップ', 'メンバー', 'AI企業', 'Spatial Agentic AI'],
  alternates: {
    canonical: 'https://www.deepingsource.io/jp/company/team',
    languages: {
      en: 'https://www.deepingsource.io/company/team',
      ko: 'https://www.deepingsource.io/ko/company/team',
      ja: 'https://www.deepingsource.io/jp/company/team',
    },
  },
  openGraph: {
    ...OG_BASE,
    title: 'チーム & リーダーシップ — DEEPINGSOURCE Inc.',
    description: 'オフライン空間の未来を創る DEEPINGSOURCE のチームメンバーとリーダーシップを紹介します。',
    url: 'https://www.deepingsource.io/jp/company/team',
    locale: 'ja_JP',
    alternateLocale: ['en_US', 'ko_KR'],
  },
};

export default function JpTeamPage() {
  return <TeamView locale="jp" />;
}
