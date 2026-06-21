import type { Metadata } from 'next';
import StoreAgentContent from '@/components/pages/StoreAgentContent';
import { minisiteHeroCopy, minisiteFeatureCopy, minisiteCtaCopy } from '@/lib/minisite-copy';

export const metadata: Metadata = {
  title: 'store agent — 편의점 AI 운영 비서 | 발주·진열·프로모션 자동 제안',
  description: '매일 아침 편의점 맞춤 브리핑을 받아보세요. 발주, 진열, 프로모션까지 AI가 정리하고 사장님은 승인만 하세요.',
  keywords: ['STOREAGENT', 'AI 발주 자동화', '편의점 AI', '편의점 발주', '진열 자동화', '프로모션 자동화', '액션 카드', 'AI 브리핑'],
  metadataBase: new URL('https://agent.saai.store'),
  alternates: { canonical: 'https://agent.saai.store' },
  openGraph: {
    title: 'store agent — 편의점 AI 운영 비서',
    description: '매일 아침 편의점 맞춤 브리핑을 받아보세요. 발주, 진열, 프로모션까지 AI가 정리합니다.',
    url: 'https://agent.saai.store',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'store agent — 편의점 AI 운영 비서' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'store agent — 편의점 AI 운영 비서',
    description: '매일 아침 편의점 맞춤 브리핑을 받아보세요. 발주, 진열, 프로모션까지 AI가 정리합니다.',
  },
  robots: { index: true, follow: true },
};

export default function MinisiteStoreAgentPage() {
  return (
    <StoreAgentContent
      heroCopy={minisiteHeroCopy}
      featureHeading={minisiteFeatureCopy.heading}
      ctaCopy={minisiteCtaCopy}
      sampleHref="/sample?utm_source=minisite&utm_medium=cta&utm_content=sample"
      canonicalUrl="https://agent.saai.store"
      ctaVariant="newsletter"
    />
  );
}
