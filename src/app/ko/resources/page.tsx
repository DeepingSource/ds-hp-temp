import type { Metadata } from 'next';
import ResourcesView from '@/components/corporate/views/ResourcesView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: '리소스 | DEEPINGSOURCE',
  description:
    '블로그, 케이스 스터디, 제품 문서, 용어 사전, FAQ까지. DeepingSource의 프라이버시 AI 솔루션을 이해하는 데 필요한 모든 자료를 한곳에서 확인하세요.',
  alternates: {
    canonical: '/ko/resources',
    languages: {
      en: '/resources',
      ko: '/ko/resources',
      ja: '/jp/resources',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'ko_KR',
    title: '리소스 | DEEPINGSOURCE',
    description: '블로그, 케이스 스터디, 제품 문서, 용어 사전, FAQ를 한곳에서.',
    url: '/ko/resources',
  },
};

export default function Page() {
  return <ResourcesView locale="ko" />;
}
