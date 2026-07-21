import type { Metadata } from 'next';
import PartnershipView from '@/components/corporate/views/PartnershipView';
import { COMPANY } from '@/lib/company-data';

export const metadata: Metadata = {
  title: '파트너십 — DEEPINGSOURCE Inc. | 파트너의 매장도 한 매장처럼',
  description: `${COMPANY.nameKo}의 파트너 프로그램. 설치 파트너, 채널 파트너, 기술 파트너와 함께 오프라인 공간 AI를 확장합니다.`,
  keywords: ['DeepingSource', '딥핑소스', '파트너십', '파트너 프로그램', 'MS Agent', '채널 파트너', '제휴'],
  alternates: {
    canonical: 'https://www.deepingsource.io/ko/company/partnership',
    languages: {
      en: 'https://www.deepingsource.io/company/partnership',
      ko: 'https://www.deepingsource.io/ko/company/partnership',
      ja: 'https://www.deepingsource.io/jp/company/partnership',
    },
  },
  openGraph: {
    locale: 'ko_KR',
    title: '파트너십 — DEEPINGSOURCE Inc.',
    description: `${COMPANY.nameKo}의 파트너 프로그램.`,
    url: 'https://www.deepingsource.io/ko/company/partnership',
  },
};

export default function KoCompanyPartnershipPage() {
  return <PartnershipView locale="ko" />;
}
