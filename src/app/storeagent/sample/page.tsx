import type { Metadata } from 'next';
import SamplePageClient from './SamplePageClient';

export const metadata: Metadata = {
  title: '1주일 브리핑 미리보기 | StoreAgent - SAAI',
  description:
    '매일 아침 상권에 맞춘 AI 브리핑을 체험해 보세요. 요일별로 달라지는 날씨, 이벤트, 체크리스트를 미리 확인할 수 있습니다.',
  alternates: { canonical: 'https://storeagent.kr/storeagent/sample' },
  openGraph: {
    title: '1주일 브리핑 미리보기 | StoreAgent',
    description:
      '매일 아침 상권에 맞춘 AI 브리핑을 체험해 보세요.',
    url: 'https://storeagent.kr/storeagent/sample',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '1주일 브리핑 미리보기 | StoreAgent',
    description:
      '매일 아침 상권에 맞춘 AI 브리핑을 체험해 보세요.',
  },
};

export default function SamplePage() {
  return <SamplePageClient />;
}
