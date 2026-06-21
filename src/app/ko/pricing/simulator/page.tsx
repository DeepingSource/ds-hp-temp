import type { Metadata } from 'next';
import Link from 'next/link';
import CameraSimulator from '@/components/pricing/CameraSimulator';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { type Locale, localeHref } from '@/lib/i18n';

export const metadata: Metadata = {
  title: '요금 시뮬레이션 | DeepingSource',
  description:
    '매장 규모, 카메라 수, 냉장고 수에 따른 store care·store insight 예상 요금을 시뮬레이션해보세요.',
  alternates: {
    canonical: '/ko/pricing/simulator',
    languages: {
      en: '/pricing/simulator',
      ko: '/ko/pricing/simulator',
      ja: '/jp/pricing/simulator',
    },
  },
};

const simulatorCopy: Record<Locale, {
  back: string;
  heading: string;
  subPre: string;
  subPost: string;
  noPii: string;
  noContract: string;
  freeConsult: string;
}> = {
  en: {
    back: 'Back to all plans',
    heading: 'Pricing simulator',
    subPre: 'Calculate your estimated monthly cost based on your store size and required features.',
    subPost: 'Select the product, plan, and camera count to see it instantly.',
    noPii: 'No personal data collected',
    noContract: 'Cancel anytime, no contract',
    freeConsult: 'Free consultation available',
  },
  ko: {
    back: '전체 요금제로 돌아가기',
    heading: '요금 시뮬레이션',
    subPre: '매장 규모와 필요 기능에 맞춰 예상 월 요금을 계산해보세요.',
    subPost: '제품, 플랜, 카메라 수를 선택하면 바로 확인됩니다.',
    noPii: '개인정보 수집 없음',
    noContract: '약정 없이 언제든 해지',
    freeConsult: '무료 상담 제공',
  },
  jp: {
    back: '全料金プランに戻る',
    heading: '料金シミュレーション',
    subPre: '店舗規模と必要な機能に合わせて、想定月額料金を計算してみましょう。',
    subPost: '製品・プラン・カメラ台数を選択すると、すぐに確認できます。',
    noPii: '個人情報の収集なし',
    noContract: '契約期間の縛りなし・いつでも解約可能',
    freeConsult: '無料相談をご提供',
  },
};

const LOCALE: Locale = 'ko';

export default function SimulatorPage() {
  const t = simulatorCopy[LOCALE];
  const backHref = localeHref(LOCALE, '/pricing');
  return (
    <div className="pt-28 pb-20 lg:pt-32 lg:pb-24 bg-gray-50 min-h-screen">
      {/* Back link */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 mb-8">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.back}
        </Link>
      </div>

      {/* Hero */}
      <section className="text-center mb-10 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          {t.heading}
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
          {t.subPre}
          <br className="hidden sm:block" />
          {t.subPost}
        </p>
      </section>

      {/* Simulator */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 mb-12">
        <CameraSimulator locale={LOCALE} />
      </section>

      {/* Trust bar */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-gray-500" />
            {t.noPii}
          </div>
          <div className="w-px h-4 bg-gray-200" />
          <span>{t.noContract}</span>
          <div className="w-px h-4 bg-gray-200" />
          <span>{t.freeConsult}</span>
        </div>
      </section>
    </div>
  );
}
