import type { Metadata } from 'next';
import InvestorsView from '@/components/corporate/views/InvestorsView';
import { COMPANY } from '@/lib/company-data';

export const metadata: Metadata = {
  title: 'IR · 投資情報 — DEEPINGSOURCE Inc.',
  description: `${COMPANY.name}のビジョンと市場機会、投資情報。Physical AIの時代、オフライン空間インテリジェンスで、すべての店舗をひとつの店舗のように。`,
  keywords: ['DeepingSource', 'IR', '投資', 'Investor Relations', 'Physical AI', 'IR Deck'],
  alternates: {
    canonical: 'https://www.deepingsource.io/jp/company/investors',
    languages: {
      en: 'https://www.deepingsource.io/company/investors',
      ko: 'https://www.deepingsource.io/ko/company/investors',
      ja: 'https://www.deepingsource.io/jp/company/investors',
    },
  },
  openGraph: {
    locale: 'ja_JP',
    title: 'IR · 投資情報 — DEEPINGSOURCE Inc.',
    description: `${COMPANY.name}のビジョンと市場機会、投資情報。`,
    url: 'https://www.deepingsource.io/jp/company/investors',
  },
};

export default function JpCompanyInvestorsPage() {
  return <InvestorsView locale="jp" />;
}
