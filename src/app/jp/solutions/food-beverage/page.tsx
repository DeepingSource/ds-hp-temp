import type { Metadata } from 'next';
import FoodBeverageView from '@/components/corporate/views/FoodBeverageView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'カフェ·飲食店ソリューション | DEEPINGSOURCE',
  description:
    '衛生管理、待ち時間·回転、発注のタイミングまで。忙しい飲食店の運営を同じ基準で標準化する、カフェ·飲食店向けソリューションです。',
  alternates: {
    canonical: '/jp/solutions/food-beverage',
    languages: {
      en: '/solutions/food-beverage',
      ko: '/ko/solutions/food-beverage',
      ja: '/jp/solutions/food-beverage',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'ja_JP',
    title: 'カフェ·飲食店ソリューション | DEEPINGSOURCE',
    description: '衛生·待ち時間·発注を同じ基準で。店舗ごとに同じ基準で運営される飲食店。',
    url: '/jp/solutions/food-beverage',
  },
};

export default function Page() {
  return <FoodBeverageView locale="jp" />;
}
