import type { Metadata } from 'next';
import HomeView from '@/components/corporate/HomeView';
import { OG_BASE } from '@/lib/og';

const languages = {
  'x-default': 'https://deepingsource.io',
  en: 'https://deepingsource.io',
  ko: 'https://deepingsource.io/ko',
  ja: 'https://deepingsource.io/jp',
};

export const metadata: Metadata = {
  title: 'DEEPINGSOURCE | 익명화 공간 AI — 모든 공간을, 완벽하게',
  description: '익명화 공간 AI로 모든 매장을 안전하게 읽고, 오늘 할 일 한 줄로 정리합니다. store insight · store care · store agent · SAAI.',
  alternates: { canonical: '/ko', languages },
  openGraph: {
    ...OG_BASE,
    title: 'DEEPINGSOURCE | 익명화 공간 AI',
    description: '익명화 공간 AI로 모든 매장을 안전하게 읽고, 오늘 할 일 한 줄로 정리합니다. 모든 공간을, 완벽하게.',
    url: 'https://deepingsource.io/ko',
    locale: 'ko_KR',
    type: 'website',
  },
};

// Korean home — /ko (PLAN_v1.1 D6 path-prefix i18n)
export default function KoHome() {
  return <HomeView locale="ko" />;
}
