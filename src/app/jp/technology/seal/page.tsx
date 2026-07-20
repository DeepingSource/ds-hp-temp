import type { Metadata } from 'next';
import SealView from '@/components/corporate/views/SealView';

export const metadata: Metadata = {
  title: 'SEAL — データを活かす映像匿名化 | DEEPINGSOURCE',
  description:
    '映像の中の顔とナンバープレートを消しながら、AIに必要な特徴はそのまま残す映像匿名化ソリューションSEAL。匿名化の前後比較、ビジョンタスクでの実証、ブラー・マスクとの違い、組み込みSDKまで。',
  alternates: {
    canonical: '/jp/technology/seal',
    languages: {
      'x-default': '/technology/seal',
      en: '/technology/seal',
      ko: '/ko/technology/seal',
      ja: '/jp/technology/seal',
    },
  },
  openGraph: {
    title: 'SEAL — データを活かす映像匿名化 | DEEPINGSOURCE',
    description: '顔・ナンバープレートは消し、AI学習に必要なデータは残す映像匿名化 — 組み込み型SDKで提供。',
    url: '/jp/technology/seal',
    images: [{ url: '/images/og/seal.png', width: 2500, height: 1313, alt: 'SEAL — データを活かす映像匿名化' }],
  },
};

// Japanese SEAL SDK — /jp/technology/seal (PLAN_v1.1 D6 path-prefix i18n)
export default function JpSealPage() {
  return <SealView locale="jp" />;
}
