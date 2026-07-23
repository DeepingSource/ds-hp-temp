import type { Metadata } from 'next';
import DiagnosisView from '@/components/corporate/views/DiagnosisView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: '문제 진단 — 질문 몇 개로 맞는 솔루션 찾기 | 딥핑소스',
  description: '업종과 지금 겪는 문제를 알려주시면, 맞는 SAAI 솔루션과 제품, 실제 결과를 바로 보여드립니다.',
  alternates: {
    canonical: '/ko/solutions/diagnosis',
    languages: {
      en: '/solutions/diagnosis',
      ko: '/ko/solutions/diagnosis',
      ja: '/jp/solutions/diagnosis',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'ko_KR',
    title: '문제 진단 — 질문 몇 개로 맞는 솔루션 찾기 | 딥핑소스',
    description: '업종과 문제를 알려주시면 맞는 솔루션을 바로 보여드립니다.',
    url: '/ko/solutions/diagnosis',
  },
};

export default function Page() {
  return <DiagnosisView locale="ko" />;
}
