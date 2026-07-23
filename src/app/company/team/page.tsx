import type { Metadata } from 'next';
import TeamView from '@/components/corporate/views/TeamView';

export const metadata: Metadata = {
  title: 'People & Team | DEEPINGSOURCE',
  description: 'Meet the team behind DeepingSource. Researchers, software engineers, and product experts shaping the future of privacy-preserving spatial AI.',
};

export default function TeamPage() {
  return <TeamView locale="en" />;
}
