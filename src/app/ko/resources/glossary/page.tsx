import type { Metadata } from 'next';
import GlossaryView from '@/components/corporate/views/GlossaryView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: '용어 사전 | DEEPINGSOURCE',
  description:
    '매장 히트맵, 익명화 CCTV, 체류 시간, 전환율 등 프라이버시 AI와 공간 분석의 핵심 용어를 현장 언어로 쉽게 설명합니다.',
  alternates: {
    canonical: '/ko/resources/glossary',
    languages: {
      en: '/resources/glossary',
      ko: '/ko/resources/glossary',
      ja: '/jp/resources/glossary',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'ko_KR',
    title: '용어 사전 | DEEPINGSOURCE',
    description: '프라이버시 AI와 공간 분석의 핵심 용어를 쉽게 설명합니다.',
    url: '/ko/resources/glossary',
  },
};

export default function KoResourcesGlossaryPage() {
  return <GlossaryView locale="ko" />;
}
