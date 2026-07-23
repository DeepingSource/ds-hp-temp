import type { Metadata } from 'next';
import FunctionsView from '@/components/corporate/views/FunctionsView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: '기능 라이브러리 — 기능은 3모드를 가로지릅니다 | DEEPINGSOURCE',
  description:
    '네 개의 기능 — count·queue·pop·fit — 을 saai care·insight·agent 세 모드가 각각 어떻게 쓰는지. 기능은 제품이 아닙니다.',
  keywords: ['saai 기능', 'store count', 'store queue', '기능 매트릭스', '익명화 공간 AI', '방문자 수 측정', '대기열 분석', 'POP 효과 분석', '딥핑소스'],
  alternates: {
    canonical: '/ko/products/functions',
    languages: {
      en: '/products/functions',
      ko: '/ko/products/functions',
      ja: '/jp/products/functions',
    },
  },
  openGraph: {
    ...OG_BASE,
    title: '기능 라이브러리 — 기능은 3모드를 가로지릅니다 | DEEPINGSOURCE',
    description: 'count 하나가 care로는 실시간 감지, insight로는 추세 분석, agent로는 운영 제안이 됩니다.',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Page() {
  return <FunctionsView locale="ko" />;
}
