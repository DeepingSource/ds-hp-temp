import type { Metadata } from 'next';
import FoodBeverageView from '@/components/corporate/views/FoodBeverageView';

export const metadata: Metadata = {
  title: 'カフェ·飲食店ソリューション | Deeping Source',
  description:
    '衛生管理、待ち時間·回転、発注のタイミングまで。業種が違ってもひとつの店舗のように運営できるよう支援する、カフェ·飲食店向け運営ソリューションです。',
  alternates: {
    canonical: '/jp/solutions/food-beverage',
    languages: {
      en: '/solutions/food-beverage',
      ko: '/ko/solutions/food-beverage',
      ja: '/jp/solutions/food-beverage',
    },
  },
  openGraph: {
    title: 'カフェ·飲食店ソリューション | Deeping Source',
    description: '衛生·待ち時間·発注を同じ基準で。業種が違ってもひとつの店舗のように運営される飲食店運営。',
    url: '/jp/solutions/food-beverage',
  },
};

export default function Page() {
  return <FoodBeverageView locale="jp" />;
}
