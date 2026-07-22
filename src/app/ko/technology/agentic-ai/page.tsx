import type { Metadata } from 'next';
import AgenticAiTechView from '@/components/corporate/views/AgenticAiTechView';

export const metadata: Metadata = {
  title: 'Agentic AI — 공간·매장 온톨로지와 자율형 지능 | DEEPINGSOURCE',
  description:
    'CCTV 동선(MTMC), POS, 재고, 날씨 데이터를 매장 온톨로지로 연결하여 단 1개 매장의 성공 학습을 전국 프랜차이즈로 전파하는 자율형 Agentic AI.',
  keywords: ['Agentic AI', '공간 온톨로지', 'MTMC 동선 시뮬레이션', '프랜차이즈 지식 전파', '자율 매장 AI', '딥핑소스', 'SAAI'],
  alternates: {
    canonical: '/ko/technology/agentic-ai',
    languages: {
      en: '/technology/agentic-ai',
      ko: '/ko/technology/agentic-ai',
      ja: '/jp/technology/agentic-ai',
    },
  },
  openGraph: {
    title: 'Agentic AI — 공간·매장 온톨로지와 자율형 지능 | DEEPINGSOURCE',
    description: '1개 매장의 학습이 50개 지점으로 자동 전파되는 공간 온톨로지 기반 자율형 Agentic AI.',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Page() {
  return <AgenticAiTechView locale="ko" />;
}
