import type { Metadata } from 'next';
import TeamView from '@/components/corporate/views/TeamView';

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
  // ページ側の openGraph はルートレイアウトのブロックを「マージではなく置換」する。
  // カードが欠けないよう siteName/type/images/alternateLocale を再宣言する。
  openGraph: {
    title: 'チーム & リーダーシップ — DEEPINGSOURCE Inc.',
    description: 'オフライン空間の未来を創る DEEPINGSOURCE のチームメンバーとリーダーシップを紹介します。',
    url: 'https://www.deepingsource.io/jp/company/team',
    siteName: 'DEEPINGSOURCE',
    locale: 'ja_JP',
    alternateLocale: ['en_US', 'ko_KR'],
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'DeepingSource — Anonymized Spatial AI' }],
  },
};

export default function JpTeamPage() {
  return <TeamView locale="jp" />;
}
