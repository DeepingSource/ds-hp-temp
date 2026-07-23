import type { Metadata } from 'next';
import { headers } from 'next/headers';
import TeamView from '@/components/corporate/views/TeamView';
import type { Locale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'People & Team | DEEPINGSOURCE',
  description: 'Meet the team behind DeepingSource. Researchers, software engineers, and product experts shaping the future of privacy-preserving spatial AI.',
};

export default async function TeamPage() {
  const headerList = await headers();
  const headerLocale = (headerList.get('x-locale') as Locale) || 'en';
  return <TeamView locale={headerLocale} />;
}
