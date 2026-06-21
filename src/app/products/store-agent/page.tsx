import type { Metadata } from 'next';
import StoreAgentView from '@/components/corporate/views/StoreAgentView';

export const metadata: Metadata = {
  title: 'store agent | DeepingSource — Store AI that proposes your next move',
  description:
    'Bring an executive’s judgment to store operations. What to stock today, how much, and where — store agent turns data into decisions. From L0 to L5, the stages of autonomous store operations.',
  keywords: ['store agent', 'store AI', 'operations automation', 'decision AI', 'autonomous store operations', 'DeepingSource'],
  alternates: {
    canonical: '/products/store-agent',
    languages: {
      en: '/products/store-agent',
      ko: '/ko/products/store-agent',
      ja: '/jp/products/store-agent',
    },
  },
  openGraph: {
    title: 'store agent | DeepingSource',
    description: 'Beyond data, to decisions. Proposing your next move in store operations.',
    type: 'website',
  },
};

export default function Page() {
  return <StoreAgentView locale="en" />;
}
