import type { Metadata } from 'next';
import AgenticAiTechView from '@/components/corporate/views/AgenticAiTechView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Agentic AI — 접근 철학과 베이스라인 | DEEPINGSOURCE',
  description:
    '딥핑소스가 공간에 Agentic AI를 만드는 세 가지 원칙과, 그 원칙을 가능하게 하는 네 가지 기술적 기반. 권고는 AI, 결정은 사람 — 자율화는 한 칸씩 올라갑니다.',
  keywords: ['Agentic AI', 'AI 원칙', '권고는 AI 결정은 사람', '자율화 단계', '익명화', '딥핑소스', 'SAAI'],
  alternates: {
    canonical: '/ko/technology/agentic-ai',
    languages: {
      en: '/technology/agentic-ai',
      ko: '/ko/technology/agentic-ai',
      ja: '/jp/technology/agentic-ai',
    },
  },
  openGraph: {
    ...OG_BASE,
    title: 'Agentic AI — 접근 철학과 베이스라인 | DEEPINGSOURCE',
    description: '보는 AI의 다음은, 함께 결정하는 AI입니다. 딥핑소스가 Agentic AI를 만드는 원칙과 기술적 기반.',
    locale: 'ko_KR',
  },
};

export default function Page() {
  return <AgenticAiTechView locale="ko" />;
}
