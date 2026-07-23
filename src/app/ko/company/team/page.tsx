import type { Metadata } from 'next';
import TeamView from '@/components/corporate/views/TeamView';

export const metadata: Metadata = {
  title: '팀원 & 리더십 | 딥핑소스 DEEPINGSOURCE',
  description: '오프라인 공간의 미래를 만드는 딥핑소스의 훌륭한 팀원들과 리더십을 소개합니다.',
};

export default function KoTeamPage() {
  return <TeamView locale="ko" />;
}
