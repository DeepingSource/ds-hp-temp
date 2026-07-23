import type { Metadata } from 'next';
import TeamView from '@/components/corporate/views/TeamView';
import { OG_BASE } from '@/lib/og';

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
  openGraph: {
    ...OG_BASE,
    title: '팀원 & 리더십 — DEEPINGSOURCE Inc.',
    description: '오프라인 공간의 미래를 만드는 딥핑소스의 팀원들과 리더십을 소개합니다.',
    url: 'https://www.deepingsource.io/ko/company/team',
    locale: 'ko_KR',
    alternateLocale: ['en_US', 'ja_JP'],
  },
};

export default function KoTeamPage() {
  return <TeamView locale="ko" />;
}
