import type { Metadata } from 'next';
import StoreAgentView from '@/components/corporate/views/StoreAgentView';

export const metadata: Metadata = {
  title: 'saai agent — store agent | DEEPINGSOURCE',
  description:
    'エグゼクティブの判断を店舗運営に加えます。今日、何を、どれだけ、どこに置くか — store agent がデータを意思決定へと移します。推奨はAIが、決定は人が。',
  keywords: ['saai agent', 'store agent', '店舗AI', '運営自動化', '意思決定AI', '発注自動化', 'DeepingSource'],
  alternates: {
    canonical: '/jp/products/saai-agent',
    languages: {
      en: '/products/saai-agent',
      ko: '/ko/products/saai-agent',
      ja: '/jp/products/saai-agent',
    },
  },
  openGraph: {
    title: 'saai agent — store agent | DEEPINGSOURCE',
    description: 'データを超えて、意思決定へ。店舗運営の次の一手をご提案します。',
    type: 'website',
  },
};

export default function Page() {
  return <StoreAgentView locale="jp" />;
}
