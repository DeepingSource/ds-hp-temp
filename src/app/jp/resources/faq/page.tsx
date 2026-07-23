import type { Metadata } from 'next';
import FaqView from '@/components/corporate/views/FaqView';
import { OG_BASE } from '@/lib/og';

export const metadata: Metadata = {
  title: 'よくあるご質問 | DEEPINGSOURCE',
  description:
    'DeepingSource製品の導入の流れ、料金、データセキュリティ、機能などに関するよくあるご質問と回答をまとめました。',
  alternates: {
    canonical: '/jp/resources/faq',
    languages: {
      en: '/resources/faq',
      ko: '/ko/resources/faq',
      ja: '/jp/resources/faq',
    },
  },
  openGraph: {
    ...OG_BASE,
    locale: 'ja_JP',
    title: 'よくあるご質問 | DEEPINGSOURCE',
    description: '導入の流れ、料金、データセキュリティなど、よくあるご質問と回答。',
    url: '/jp/resources/faq',
  },
};

export default function Page() {
  return <FaqView locale="jp" />;
}
