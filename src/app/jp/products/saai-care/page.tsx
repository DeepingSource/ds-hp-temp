import type { Metadata } from 'next';
import StoreCareView from '@/components/corporate/views/StoreCareView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'saai care — store care | DEEPINGSOURCE',
  description:
    '小さな店舗にも頼れる目をひとつ。事故・盗難・異常な状況を見守り、お知らせする店主向けの安心ソリューション。時給34ウォン、月額14,900ウォンから。storecare.ai で運営しています。',
  keywords: ['saai care', 'store care', '店主', '店舗の安心', '盗難防止', 'CCTV AI', 'SMB', 'storecare.ai'],
  alternates: {
    canonical: '/jp/products/saai-care',
    languages: {
      en: '/products/saai-care',
      ko: '/ko/products/saai-care',
      ja: '/jp/products/saai-care',
    },
  },
  openGraph: {
    ...OG_BASE,
    title: 'saai care — store care | DEEPINGSOURCE',
    description: '時給34ウォンの安心。小さな店舗を見守る店主向けソリューション。',
    type: 'website',
    locale: 'ja_JP',
  },
};

export default function Page() {
  return <StoreCareView locale="jp" />;
}
