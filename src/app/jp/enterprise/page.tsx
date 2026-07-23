import type { Metadata } from 'next';
import EnterpriseView from '@/components/corporate/views/EnterpriseView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: '法人・フランチャイズ導入 | DEEPINGSOURCE',
  description:
    '本部・スーパーバイザーのための多店舗運営の標準化。Golden Case 5段階で一店舗の成功を全国へ展開し、リアルタイムのモニタリングとデータに基づく意思決定を支援します。',
  alternates: {
    canonical: '/jp/enterprise',
    languages: {
      en: '/enterprise',
      ko: '/ko/enterprise',
      ja: '/jp/enterprise',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'ja_JP',
    title: '法人・フランチャイズ導入 | DEEPINGSOURCE',
    description: '本部・スーパーバイザーのための多店舗運営の標準化 — Golden Case 5段階。',
    url: '/jp/enterprise',
  },
};

export default function JpEnterprisePage() {
  return <EnterpriseView locale="jp" />;
}
