import type { Metadata } from 'next';
import TechnologyView from '@/components/corporate/views/TechnologyView';
import { COMPANY } from '@/lib/company-data';

export const metadata: Metadata = {
  title: '기술 — 익명화 공간 AI | DeepingSource',
  description: `개인정보 없이 공간을 분석합니다. ${COMPANY.patents}개 특허로 보호된 딥핑소스의 익명화·SEAL·Spatial AI·비전 모델 기술을 소개합니다.`,
  keywords: ['익명화 AI', 'Anonymizer', 'SEAL', 'Spatial AI', 'MTMC', 'Vision Models', '프라이버시 AI', 'GDPR AI', '공간 데이터 분석', 'PII 제거'],
  alternates: {
    canonical: '/ko/technology',
    languages: {
      'x-default': '/technology',
      en: '/technology',
      ko: '/ko/technology',
      ja: '/jp/technology',
    },
  },
  openGraph: {
    title: '기술 — 익명화 공간 AI | DeepingSource',
    description: `개인정보는 건드리지 않습니다. 데이터는 잃지 않습니다. ${COMPANY.patents}개 특허의 딥핑소스 기술.`,
    url: '/ko/technology',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'DeepingSource 익명화 공간 AI 기술' }],
  },
};

// Korean technology — /ko/technology (PLAN_v1.1 D6 path-prefix i18n)
export default function KoTechnologyPage() {
  return <TechnologyView locale="ko" />;
}
