import type { Metadata } from 'next';
import SealView from '@/components/corporate/views/SealView';

export const metadata: Metadata = {
  title: 'SEAL SDK — 匿名化処理統合SDK | DEEPINGSOURCE',
  description:
    'SEAL SDKは、映像の匿名化・認識・空間分析パイプラインをアプリケーションに統合するための開発キットです。Secure, Embeddable, Adaptable, Lightweightの4つの設計原則を整理します。',
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
    title: 'SEAL SDK — 匿名化処理統合SDK | DEEPINGSOURCE',
    description: '匿名化処理パイプラインをアプリケーションに統合するためのSDK。',
    url: '/jp/technology/seal',
  },
};

// Japanese SEAL SDK — /jp/technology/seal (PLAN_v1.1 D6 path-prefix i18n)
export default function JpSealPage() {
  return <SealView locale="jp" />;
}
