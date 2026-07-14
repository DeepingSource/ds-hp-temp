import type { Metadata } from 'next';
import HomeView from '@/components/corporate/HomeView';

const languages = {
  'x-default': 'https://deepingsource.io',
  en: 'https://deepingsource.io',
  ko: 'https://deepingsource.io/ko',
  ja: 'https://deepingsource.io/jp',
};

export const metadata: Metadata = {
  title: 'DEEPINGSOURCE | 匿名化空間AI — すべての店舗を、ひとつの店舗のように',
  description: '匿名化された空間AIがすべての店舗を安全に読み、今日やること一行にまとめます。store insight · store care · store agent · SAAI.',
  alternates: { canonical: '/jp', languages },
  openGraph: {
    title: 'DEEPINGSOURCE | 匿名化空間AI',
    description: '匿名化された空間AIがすべての店舗を安全に読み、今日やること一行にまとめます。',
    url: 'https://deepingsource.io/jp',
    locale: 'ja_JP',
    type: 'website',
  },
};

// Japanese home — /jp (PLAN_v1.1 D6 path-prefix i18n)
export default function JpHome() {
  return <HomeView locale="jp" />;
}
