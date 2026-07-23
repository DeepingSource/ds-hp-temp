import type { Metadata } from 'next';
import TeamView from '@/components/corporate/views/TeamView';

export const metadata: Metadata = {
  title: 'チーム & リーダーシップ | DEEPINGSOURCE',
  description: 'オフライン空間の未来を創る DEEPINGSOURCE のチームメンバーとリーダーシップを紹介します。',
};

export default function JpTeamPage() {
  return <TeamView locale="jp" />;
}
