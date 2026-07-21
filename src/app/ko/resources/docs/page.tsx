import type { Metadata } from 'next';
import DocsView from '@/components/corporate/views/DocsView';

export const metadata: Metadata = {
  title: '제품 문서 | DEEPINGSOURCE',
  description:
    'DeepingSource 제품 설치, 연동, 운영에 필요한 기술 문서와 매뉴얼. 시작하기부터 데이터 연동, 보안, 분석까지 한곳에서 확인하세요.',
  alternates: {
    canonical: '/ko/resources/docs',
    languages: {
      en: '/resources/docs',
      ko: '/ko/resources/docs',
      ja: '/jp/resources/docs',
    },
  },
  openGraph: {
    locale: 'ko_KR',
    title: '제품 문서 | DEEPINGSOURCE',
    description: '제품 설치, 연동, 운영에 필요한 기술 문서와 매뉴얼.',
    url: '/ko/resources/docs',
  },
};

export default function Page() {
  return <DocsView locale="ko" />;
}
