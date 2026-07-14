import type { Metadata } from 'next';
import StoreAgentView from '@/components/corporate/views/StoreAgentView';

export const metadata: Metadata = {
  title: 'saai agent — store agent | DEEPINGSOURCE — Store AI that proposes your next move',
  description:
    'Bring an executive’s judgment to store operations. What to stock today, how much, and where — store agent turns data into decisions. The AI advises; people decide.',
  keywords: ['saai agent', 'store agent', 'store AI', 'operations automation', 'decision AI', 'replenishment', 'DeepingSource'],
  alternates: {
    canonical: '/products/store-agent',
    languages: {
      en: '/products/store-agent',
      ko: '/ko/products/store-agent',
      ja: '/jp/products/store-agent',
    },
  },
  openGraph: {
    title: 'saai agent — store agent | DEEPINGSOURCE',
    description: 'Beyond data, to decisions. Proposing your next move in store operations.',
    type: 'website',
  },
};

export default function Page() {
  return <StoreAgentView locale="en" />;
}
