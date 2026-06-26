import type { Metadata } from 'next';
import SaaiView from '@/components/corporate/views/SaaiView';

export const metadata: Metadata = {
  title: 'saai.store | DeepingSource — カメラレス店長スイート',
  description:
    '発注からPOPまで、ひとつの流れで — 店長向けのカメラレススイート。saai.store は SAAI の店長向けB2C製品です。（POPメーカーはスイート内の一つのツールです。）',
  keywords: ['saai.store', 'SAAI', '店長スイート', 'POPメーカー', 'コンテンツアーカイブ', '季節コンテンツ'],
  alternates: {
    canonical: '/jp/products/saai',
    languages: {
      en: '/products/saai',
      ko: '/ko/products/saai',
      ja: '/jp/products/saai',
    },
  },
  openGraph: {
    title: 'saai.store | DeepingSource',
    description: '店長向けのカメラレススイート — 発注からPOPまで、ひとつの流れで。',
    type: 'website',
  },
};

export default function Page() {
  return <SaaiView locale="jp" />;
}
