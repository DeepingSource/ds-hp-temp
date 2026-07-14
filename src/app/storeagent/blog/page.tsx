import type { Metadata } from 'next';
import BlogPageContent from './BlogContent';

export const metadata: Metadata = {
  title: '매장 운영 콘텐츠 | SAAI',
  description: '편의점·카페·무인매장 사장님을 위한 AI 기반 운영 인사이트. 가이드, 케이스스터디, 데이터 분석 리포트를 제공합니다.',
  alternates: { canonical: 'https://storeagent.kr/storeagent/blog' },
  openGraph: {
    title: '매장 운영 콘텐츠 | SAAI',
    description: '편의점·카페·무인매장 사장님을 위한 AI 기반 운영 인사이트.',
    url: 'https://storeagent.kr/storeagent/blog',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'SAAI 매장 운영 콘텐츠' }],
  },
};

const blogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'SAAI 매장 운영 콘텐츠',
  description: '편의점·카페·무인매장 사장님을 위한 AI 기반 운영 인사이트.',
  url: 'https://storeagent.kr/storeagent/blog',
  publisher: { '@type': 'Organization', name: 'DeepingSource Inc.', url: 'https://storeagent.kr' },
  inLanguage: 'ko',
};

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd).replace(/</g, '\\u003c') }} />
      <BlogPageContent />
    </>
  );
}
