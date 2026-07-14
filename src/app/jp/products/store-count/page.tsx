import type { Metadata } from 'next';
import StoreCountView from '@/components/corporate/views/StoreCountView';

export const metadata: Metadata = {
  title: 'store count | DEEPINGSOURCE — カメラ1台でできる商圏分析',
  description:
    '店前の通行人から入店客、流入率まで — カメラ1台で、人手なしで、毎日常時数えます。店舗から商圏までをつなぐ商圏分析、プライバシーは設計で。',
  keywords: ['store count', '商圏分析', '通行量', 'カウント', '流入率', 'リテール分析', '匿名カウント', 'DeepingSource'],
  alternates: {
    canonical: '/jp/products/store-count',
    languages: {
      en: '/products/store-count',
      ko: '/ko/products/store-count',
      ja: '/jp/products/store-count',
    },
  },
  openGraph: {
    title: 'store count | DEEPINGSOURCE',
    description: 'やるべきなのにできなかった商圏分析 — カメラ1台で、毎日、人手なしで。',
    type: 'website',
  },
};

export default function Page() {
  return <StoreCountView locale="jp" />;
}
