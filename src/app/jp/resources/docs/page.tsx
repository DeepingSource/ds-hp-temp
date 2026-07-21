import type { Metadata } from 'next';
import DocsView from '@/components/corporate/views/DocsView';

export const metadata: Metadata = {
  title: '製品ドキュメント | DEEPINGSOURCE',
  description:
    'DeepingSource 製品の導入、連携、運用に必要な技術文書とマニュアル。はじめにからデータ連携、セキュリティ、分析まで、ひとつの場所でご確認いただけます。',
  alternates: {
    canonical: '/jp/resources/docs',
    languages: {
      en: '/resources/docs',
      ko: '/ko/resources/docs',
      ja: '/jp/resources/docs',
    },
  },
  openGraph: {
    locale: 'ja_JP',
    title: '製品ドキュメント | DEEPINGSOURCE',
    description: '製品の導入、連携、運用に必要な技術文書とマニュアル。',
    url: '/jp/resources/docs',
  },
};

export default function Page() {
  return <DocsView locale="jp" />;
}
