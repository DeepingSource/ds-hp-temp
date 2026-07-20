import type { Metadata } from 'next';
import FoodBeverageView from '@/components/corporate/views/FoodBeverageView';

export const metadata: Metadata = {
  title: 'Café & F&B Solutions | DEEPINGSOURCE',
  description:
    'Hygiene, waits and turnover, and reorder timing. A café and food-service solution that standardizes busy-store operations under the same standard.',
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
    description: 'Hygiene, waits, and reordering, by the same standard. Food-service operations by one standard across stores.',
    url: '/solutions/food-beverage',
  },
};

export default function Page() {
  return <FoodBeverageView locale="en" />;
}
