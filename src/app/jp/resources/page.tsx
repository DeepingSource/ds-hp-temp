import type { Metadata } from 'next';
import ResourcesView from '@/components/corporate/views/ResourcesView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'リソース | DEEPINGSOURCE',
  description:
    'ブログ、ケーススタディ、製品ドキュメント、用語集、FAQ まで。DeepingSource のプライバシー AI ソリューションを理解するために必要な資料を、ひとつの場所でご確認いただけます。',
  alternates: {
    canonical: '/jp/resources',
    languages: {
      en: '/resources',
      ko: '/ko/resources',
      ja: '/jp/resources',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'ja_JP',
    title: 'リソース | DEEPINGSOURCE',
    description: 'ブログ、ケーススタディ、製品ドキュメント、用語集、FAQ をひとつの場所に。',
    url: '/jp/resources',
  },
};

export default function Page() {
  return <ResourcesView locale="jp" />;
}
