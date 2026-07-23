import type { Metadata } from 'next';
import TeamView from '@/components/corporate/views/TeamView';

export const metadata: Metadata = {
  title: '팀원 & 리더십 | 딥핑소스 DEEPINGSOURCE',
  description: '오프라인 공간의 미래를 만드는 딥핑소스의 훌륭한 팀원들과 리더십을 소개합니다.',
  keywords: ['DeepingSource', '딥핑소스', '팀원', '리더십', '구성원', 'AI 기업', 'Spatial Agentic AI'],
  alternates: {
    canonical: 'https://www.deepingsource.io/ko/company/team',
    languages: {
      en: 'https://www.deepingsource.io/company/team',
      ko: 'https://www.deepingsource.io/ko/company/team',
      ja: 'https://www.deepingsource.io/jp/company/team',
    },
  },
  // 페이지 openGraph는 루트 레이아웃 블록을 병합이 아니라 '대체'하므로
  // siteName/type/images/alternateLocale을 함께 재선언해 카드 손실을 막는다.
  openGraph: {
    title: '팀원 & 리더십 — DEEPINGSOURCE Inc.',
    description: '오프라인 공간의 미래를 만드는 딥핑소스의 팀원들과 리더십을 소개합니다.',
    url: 'https://www.deepingsource.io/ko/company/team',
    siteName: 'DEEPINGSOURCE',
    locale: 'ko_KR',
    alternateLocale: ['en_US', 'ja_JP'],
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'DeepingSource — Anonymized Spatial AI' }],
  },
};

export default function KoTeamPage() {
  return <TeamView locale="ko" />;
}
