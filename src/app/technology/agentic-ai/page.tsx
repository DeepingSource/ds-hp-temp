import type { Metadata } from 'next';
import AgenticAiTechView from '@/components/corporate/views/AgenticAiTechView';

export const metadata: Metadata = {
  title: 'Agentic AI — Spatial & Operational Store Ontology | DEEPINGSOURCE',
  description:
    'Beyond visual recognition, we construct store ontologies linking MTMC CCTV trajectories, POS, inventory, and weather for autonomous spatial decision-making.',
  keywords: ['Agentic AI', 'Spatial AI', 'Store Ontology', 'Cross-Store Learning', 'MTMC Simulation', 'DeepingSource', 'SAAI'],
  alternates: {
    canonical: '/technology/agentic-ai',
    languages: {
      en: '/technology/agentic-ai',
      ko: '/ko/technology/agentic-ai',
      ja: '/jp/technology/agentic-ai',
    },
  },
  openGraph: {
    title: 'Agentic AI — Spatial & Operational Store Ontology | DEEPINGSOURCE',
    description: 'Autonomous store intelligence connecting MTMC footfall trajectories, POS, inventory, and cross-store learning propagation.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function Page() {
  return <AgenticAiTechView locale="en" />;
}
