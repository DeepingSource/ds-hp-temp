import type { Metadata } from 'next';
import LargeSpaceView from '@/components/corporate/views/LargeSpaceView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: '대형 공간 솔루션 | 딥핑소스',
  description:
    '하이퍼마켓, 몰, 컨벤션처럼 넓은 공간도 한눈에. 혼잡 관리, 동선 분석, 이상 감지를 MTMC 공간 AI로 통합 운영합니다.',
  alternates: {
    canonical: '/ko/solutions/large-space',
    languages: {
      en: '/solutions/large-space',
      ko: '/ko/solutions/large-space',
      ja: '/jp/solutions/large-space',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'ko_KR',
    title: '대형 공간 솔루션 | 딥핑소스',
    description: '넓은 공간도 한눈에. 혼잡·동선·이상을 같은 기준으로 통합 관리하는 대형 공간 솔루션.',
    url: '/ko/solutions/large-space',
  },
};

export default function Page() {
  return <LargeSpaceView locale="ko" />;
}
