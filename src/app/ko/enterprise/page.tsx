import type { Metadata } from 'next';
import EnterpriseView from '@/components/corporate/views/EnterpriseView';

export const metadata: Metadata = {
  title: '기업·프랜차이즈 도입 | DeepingSource',
  description:
    '본사·슈퍼바이저를 위한 다점포 운영 표준화. Golden Case 5단계로 한 매장의 성공을 전국으로 전파하고, 실시간 모니터링과 데이터 기반 의사결정을 지원합니다.',
  alternates: {
    canonical: '/ko/enterprise',
    languages: {
      en: '/enterprise',
      ko: '/ko/enterprise',
      ja: '/jp/enterprise',
    },
  },
  openGraph: {
    title: '기업·프랜차이즈 도입 | DeepingSource',
    description: '본사·슈퍼바이저를 위한 다점포 운영 표준화 — Golden Case 5단계.',
    url: '/ko/enterprise',
  },
};

export default function KoEnterprisePage() {
  return <EnterpriseView locale="ko" />;
}
