import type { Metadata } from 'next';
import FoodBeverageView from '@/components/corporate/views/FoodBeverageView';

export const metadata: Metadata = {
  title: '카페·음식점 솔루션 | 딥핑소스',
  description:
    '위생 관리, 대기·회전, 발주 타이밍까지. 업종이 달라도 한 매장처럼 운영되도록 돕는 카페·음식점 운영 솔루션입니다.',
  alternates: {
    canonical: '/ko/solutions/food-beverage',
    languages: {
      en: '/solutions/food-beverage',
      ko: '/ko/solutions/food-beverage',
      ja: '/jp/solutions/food-beverage',
    },
  },
  openGraph: {
    title: '카페·음식점 솔루션 | 딥핑소스',
    description: '위생·대기·발주를 같은 기준으로. 업종이 달라도 한 매장처럼 운영되는 외식 매장 운영.',
    url: '/ko/solutions/food-beverage',
  },
};

export default function Page() {
  return <FoodBeverageView locale="ko" />;
}
