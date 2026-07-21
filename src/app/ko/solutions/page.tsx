import type { Metadata } from 'next';
import SolutionsView from '@/components/corporate/views/SolutionsView';

export const metadata: Metadata = {
  title: '업종별 솔루션 — 현장 문제-해결 가이드 | DEEPINGSOURCE',
  description: '편의점 도난 방지, 카페 회전율 개선, 무인매장 이상 감지 등 업종별 실제 문제를 SAAI의 익명화 공간 AI가 어떻게 해결하는지 확인하세요.',
  alternates: {
    canonical: '/ko/solutions',
    languages: {
      en: '/solutions',
      ko: '/ko/solutions',
      ja: '/jp/solutions',
    },
  },
  openGraph: {
    locale: 'ko_KR',
    title: '업종별 솔루션 — 현장 문제-해결 가이드 | DEEPINGSOURCE',
    description: '업종별 현장 문제를 SAAI가 어떻게 해결하는지 구체적인 사례로 확인하세요.',
    url: '/ko/solutions',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: '업종별 솔루션 — 현장 문제-해결 가이드 | DeepingSource' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '업종별 솔루션 — 현장 문제-해결 가이드 | DEEPINGSOURCE',
    description: '업종별 현장 문제를 SAAI가 어떻게 해결하는지 구체적인 사례로 확인하세요.',
  },
};

export default function Page() {
  return <SolutionsView locale="ko" />;
}
