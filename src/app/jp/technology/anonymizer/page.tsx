import type { Metadata } from 'next';
import AnonymizerView from '@/components/corporate/views/AnonymizerView';

export const metadata: Metadata = {
  title: 'Anonymizer — 映像匿名化モジュール | DEEPINGSOURCE',
  description:
    'CCTV・映像ストリームから個人識別情報をリアルタイムで除去しながら、分析に必要な行動・動線の信号は保持する匿名化モジュール。処理メカニズム、仕様、規制準拠を整理します。',
  alternates: {
    canonical: '/jp/technology/anonymizer',
    languages: {
      'x-default': '/technology/anonymizer',
      en: '/technology/anonymizer',
      ko: '/ko/technology/anonymizer',
      ja: '/jp/technology/anonymizer',
    },
  },
  openGraph: {
    title: 'Anonymizer — 映像匿名化モジュール | DEEPINGSOURCE',
    description: '個人識別情報は除去し、分析信号は保持する映像匿名化モジュールの技術概要。',
    url: '/jp/technology/anonymizer',
  },
};

// Japanese Anonymizer — /jp/technology/anonymizer (PLAN_v1.1 D6 path-prefix i18n)
export default function JpAnonymizerPage() {
  return <AnonymizerView locale="jp" />;
}
