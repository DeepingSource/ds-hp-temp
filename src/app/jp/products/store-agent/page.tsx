import type { Metadata } from 'next';
import StoreAgentView from '@/components/corporate/views/StoreAgentView';

export const metadata: Metadata = {
  title: 'store agent | DeepingSource — 次の一手をご提案する店舗AI',
  description:
    'エグゼクティブの判断を店舗運営に加えます。今日、何を、どれだけ、どこに置くか — store agent がデータを意思決定へと移します。L0からL5まで、店舗の自律運営の段階。',
  keywords: ['store agent', '店舗AI', '運営自動化', '意思決定AI', '店舗の自律運営', 'DeepingSource'],
  alternates: {
    canonical: '/jp/products/store-agent',
    languages: {
      en: '/products/store-agent',
      ko: '/ko/products/store-agent',
      ja: '/jp/products/store-agent',
    },
  },
  openGraph: {
    title: 'store agent | DeepingSource',
    description: 'データを超えて、意思決定へ。店舗運営の次の一手をご提案します。',
    type: 'website',
  },
};

export default function Page() {
  return <StoreAgentView locale="jp" />;
}
