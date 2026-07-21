import type { Metadata } from 'next';
import FaqView from '@/components/corporate/views/FaqView';

export const metadata: Metadata = {
  title: '자주 묻는 질문 | DEEPINGSOURCE',
  description:
    'DeepingSource 제품 도입 절차, 요금, 데이터 보안, 기능 등에 대한 자주 묻는 질문과 답변을 모았습니다.',
  alternates: {
    canonical: '/ko/resources/faq',
    languages: {
      en: '/resources/faq',
      ko: '/ko/resources/faq',
      ja: '/jp/resources/faq',
    },
  },
  openGraph: {
    locale: 'ko_KR',
    title: '자주 묻는 질문 | DEEPINGSOURCE',
    description: '도입 절차, 요금, 데이터 보안 등 자주 묻는 질문과 답변.',
    url: '/ko/resources/faq',
  },
};

export default function Page() {
  return <FaqView locale="ko" />;
}
