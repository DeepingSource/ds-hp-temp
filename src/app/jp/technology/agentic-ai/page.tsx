import type { Metadata } from 'next';
import AgenticAiTechView from '@/components/corporate/views/AgenticAiTechView';

export const metadata: Metadata = {
  title: 'Agentic AI — 店舗オントロジーと自律型空間AI | DEEPINGSOURCE',
  description:
    'CCTV動線(MTMC)・POS・在庫・気象データを店舗オントロジーで接続し、1店舗の学習を全店へ自動伝播する自律型 Agentic AI。',
  keywords: ['Agentic AI', '店舗オントロジー', 'MTMC動線シミュレーション', '全店知能伝播', '自律型店舗AI', 'DeepingSource', 'SAAI'],
  alternates: {
    canonical: '/jp/technology/agentic-ai',
    languages: {
      en: '/technology/agentic-ai',
      ko: '/ko/technology/agentic-ai',
      ja: '/jp/technology/agentic-ai',
    },
  },
  openGraph: {
    title: 'Agentic AI — 店舗オントロジーと自律型空間AI | DEEPINGSOURCE',
    description: '1店舗の学習が全店舗へ自動伝播するオントロジーベースの自律型 Agentic AI。',
    type: 'website',
    locale: 'ja_JP',
  },
};

export default function Page() {
  return <AgenticAiTechView locale="jp" />;
}
