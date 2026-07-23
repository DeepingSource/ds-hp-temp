import type { Metadata } from 'next';
import AgenticAiTechView from '@/components/corporate/views/AgenticAiTechView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Agentic AI — Principles and baseline | DEEPINGSOURCE',
  description:
    'Why we build agentic AI for physical space, and where we stop. The AI recommends and people decide, no claim without evidence, and a ladder of autonomy climbed one rung at a time.',
  keywords: ['Agentic AI', 'AI principles', 'human in the loop', 'levels of autonomy', 'anonymization', 'DeepingSource', 'SAAI'],
  alternates: {
    canonical: '/technology/agentic-ai',
    languages: {
      en: '/technology/agentic-ai',
      ko: '/ko/technology/agentic-ai',
      ja: '/jp/technology/agentic-ai',
    },
  },
  openGraph: {
    ...OG_BASE,
    title: 'Agentic AI — Principles and baseline | DEEPINGSOURCE',
    description: 'After AI that sees comes AI that decides with you. The principles and the technical baseline behind agentic AI at DeepingSource.',
    locale: 'en_US',
  },
};

export default function Page() {
  return <AgenticAiTechView locale="en" />;
}
