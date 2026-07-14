import type { Metadata } from 'next';
import FoodBeverageView from '@/components/corporate/views/FoodBeverageView';

export const metadata: Metadata = {
  title: 'Café & F&B Solutions | DEEPINGSOURCE',
  description:
    'Hygiene, waits and turnover, and reorder timing. A café and food-service solution that helps every format run like one store.',
  alternates: {
    canonical: '/solutions/food-beverage',
    languages: {
      en: '/solutions/food-beverage',
      ko: '/ko/solutions/food-beverage',
      ja: '/jp/solutions/food-beverage',
    },
  },
  openGraph: {
    title: 'Café & F&B Solutions | DEEPINGSOURCE',
    description: 'Hygiene, waits, and reordering, by the same standard. Food-service operations run like one store, whatever the format.',
    url: '/solutions/food-beverage',
  },
};

export default function Page() {
  return <FoodBeverageView locale="en" />;
}
