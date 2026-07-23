import type { Metadata } from 'next';
import AgenticAiTechView from '@/components/corporate/views/AgenticAiTechView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Agentic AI — アプローチの哲学とベースライン | DEEPINGSOURCE',
  description:
    'ディーピングソースが空間にAgentic AIをつくる三つの原則と、その原則を成り立たせる四つの技術的基盤。推奨はAI、決定は人 — 自律化は一段ずつ上がります。',
  keywords: ['Agentic AI', 'AIの原則', '推奨はAI決定は人', '自律化の段階', '匿名化', 'DeepingSource', 'SAAI'],
  alternates: {
    canonical: '/jp/technology/agentic-ai',
    languages: {
      en: '/technology/agentic-ai',
      ko: '/ko/technology/agentic-ai',
      ja: '/jp/technology/agentic-ai',
    },
  },
  openGraph: {
    ...OG_BASE,
    title: 'Agentic AI — アプローチの哲学とベースライン | DEEPINGSOURCE',
    description: '見るAIの次は、ともに決めるAIです。ディーピングソースがAgentic AIをつくる原則と技術的基盤。',
    locale: 'ja_JP',
  },
};

export default function Page() {
  return <AgenticAiTechView locale="jp" />;
}
