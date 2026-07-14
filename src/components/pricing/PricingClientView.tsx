'use client';

import { useState } from 'react';
import { Building2, Store } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import siteContent from '@/data/generated/site-content.json';
import Link from 'next/link';
import B2cPlans from './B2cPlans';
import B2bQuoteSimulator from './B2bQuoteSimulator';

interface PricingClientViewProps {
  locale?: Locale;
}

/* ─── i18n content ─── */
export interface Content {
  toggleB2c: string;
  toggleB2b: string;
  // B2C
  b2cHeading: string;
  b2cSub: string;
  careStep: string;
  careDesc: string;
  carePerMonth: string; // ~/월
  careFeatures: string[];
  insightStep: string;
  insightDesc: string;
  insightPerMonth: string;
  insightBasis: string; // 카메라 8대 기준
  insightFeatures: string[];
  agentStep: string;
  agentDesc: string;
  agentFree: string; // 무료
  agentPriceTail: string; // ~25,000원/월
  agentFeatures: string[];
  freeConsult: string;
  startFree: string;
  diffTitle: string;
  freeBadge: string;
  paidBadge: string;
  saaiBasic: string;
  storeCare: string;
  saaiFeatures: string[];
  careDiffFeatures: string[];
  diffFooterPre: string;
  diffFooterInfo: string;
  diffFooterMid: string;
  diffFooterMonitor: string;
  diffFooterPost: string;
  simLink: string;
  agentCompareLink: string;
  // B2B
  b2bHeading: string;
  b2bSub: string;
  b2bSimTitle: string;
  b2bSimSub: string;
  b2bCamLabel: string;
  unitDevice: string;
  b2bSmall: string; b2bMid: string; b2bLarge: string;
  b2bStoreLabel: string;
  unitStore: string;
  b2b3: string; b2b50: string; b2b100: string;
  discountLabel: string;
  perStoreCost: string;
  perStoreBasis: string;
  totalMonthly: string;
  totalBasis: (count: number) => string;
  won: string;
  estimateDisclaimer: string;
  tiers: { range: string; rate: string }[];
  b2bEmailLabel: string;
  emailPlaceholder: string;
  getQuote: string;
  b2bEmailNote: string;
  submittedTitle: string;
  submittedSub: string;
  recalc: string;
  entBadge: string;
  entTitle: string;
  entDesc: string;
  entFeatures: string[];
  entCta: string;
  backToB2c: string;
  // Inline simulator
  simHeading: string;
  simSub: string;
  simSelectLabel: string;
  simCamLabel: string;
  simSmall: string; simLarge: string;
  simEmailLabel: string;
  simEmailNote: string;
  simResultLabel: string;
  simPerDay: (n: string) => string;
  simEmptyHint: string;
  simResultDisclaimer: string;
  detailSimLink: string;
  // Bundle CTA
  bundleHeading: string;
  bundleBodyPre: string;
  bundleBodyStrong: string;
  bundleBodyPost: string;
  bundleCta: string;
  bundleSimLink: string;
  // form-request strings
  simReqName: string;
  simReqInquiry: string;
  simReqMessage: (args: { cam: number; cost: string }) => string;
  b2bReqName: string;
  b2bReqInquiry: string;
  b2bReqMessage: (count: number, cameras: number) => string;
  // quote-form submit error copy
  errSubmitFailed: string;
  errGeneric: string;
}

/* Display copy comes from the CMS (content/site/pricing.yaml → generated JSON).
   The discount tiers (rate = numeric SOT, duplicated in pricing-data.ts), the
   interpolation functions, the lead-payload labels sent to submitQuoteRequest, and
   the store-agent-vs-care footer tuple stay in code — merged in by pricingCopy(). */
type PricingCode = Pick<
  Content,
  | 'diffFooterPre' | 'diffFooterInfo' | 'diffFooterMid' | 'diffFooterMonitor' | 'diffFooterPost'
  | 'tiers' | 'totalBasis' | 'simPerDay' | 'simReqMessage' | 'b2bReqMessage'
  | 'simReqName' | 'simReqInquiry' | 'b2bReqName' | 'b2bReqInquiry'
>;
type PricingCms = Omit<Content, keyof PricingCode>;
const CMS = siteContent.pricing as Record<Locale, PricingCms>;

const CODE: Record<Locale, PricingCode> = {
  ko: {
    diffFooterPre: 'store agent 기본형은 ',
    diffFooterInfo: '정보 제공',
    diffFooterMid: ' 서비스 · store care는 ',
    diffFooterMonitor: '매장 모니터링·알림',
    diffFooterPost: ' 서비스',
    totalBasis: (count) => `${count}개 매장 합계`,
    tiers: [
      { range: '5~9개', rate: '10%' },
      { range: '10~19개', rate: '15%' },
      { range: '20~49개', rate: '20%' },
      { range: '50개 이상', rate: '30%' },
    ],
    simPerDay: (n) => `하루 약 ${n}원`,
    simReqName: '요금 시뮬레이터',
    simReqInquiry: '견적 요청',
    simReqMessage: ({ cam, cost }) => `카메라 ${cam}대 기준 store insight 예상 비용 ${cost}원/월 견적 요청`,
    b2bReqName: '프랜차이즈 견적',
    b2bReqInquiry: '엔터프라이즈 견적',
    b2bReqMessage: (count, cameras) => `프랜차이즈 ${count}개 매장(매장당 카메라 ${cameras}대) 견적 요청. 시너지 할인 적용 문의.`,
  },
  en: {
    diffFooterPre: 'store agent basic is an ',
    diffFooterInfo: 'information',
    diffFooterMid: ' service · store care is a ',
    diffFooterMonitor: 'store monitoring & alerts',
    diffFooterPost: ' service',
    totalBasis: (count) => `Total for ${count} stores`,
    tiers: [
      { range: '5–9 stores', rate: '10%' },
      { range: '10–19 stores', rate: '15%' },
      { range: '20–49 stores', rate: '20%' },
      { range: '50+ stores', rate: '30%' },
    ],
    simPerDay: (n) => `About ${n} KRW/day`,
    simReqName: 'Pricing simulator',
    simReqInquiry: 'Quote request',
    simReqMessage: ({ cam, cost }) => `store insight quote request — estimated ${cost} KRW/mo based on ${cam} cameras`,
    b2bReqName: 'Franchise quote',
    b2bReqInquiry: 'Enterprise quote',
    b2bReqMessage: (count, cameras) => `Franchise quote request for ${count} stores (${cameras} cameras per store). Inquiry about synergy discount.`,
  },
  jp: {
    diffFooterPre: 'store agent 基本型は',
    diffFooterInfo: '情報提供',
    diffFooterMid: 'サービス・store care は',
    diffFooterMonitor: '店舗モニタリング・通知',
    diffFooterPost: 'サービスです',
    totalBasis: (count) => `${count}店舗の合計`,
    tiers: [
      { range: '5〜9店舗', rate: '10%' },
      { range: '10〜19店舗', rate: '15%' },
      { range: '20〜49店舗', rate: '20%' },
      { range: '50店舗以上', rate: '30%' },
    ],
    simPerDay: (n) => `1日あたり約${n} KRW`,
    simReqName: '料金シミュレーター',
    simReqInquiry: '見積もり依頼',
    simReqMessage: ({ cam, cost }) => `カメラ${cam}台を基準とした store insight 想定費用 ${cost} KRW/月の見積もり依頼`,
    b2bReqName: 'フランチャイズ見積もり',
    b2bReqInquiry: 'エンタープライズ見積もり',
    b2bReqMessage: (count, cameras) => `フランチャイズ${count}店舗（1店舗あたりカメラ${cameras}台）の見積もり依頼。シナジー割引適用のお問い合わせ。`,
  },
};

/** Merge CMS display copy with the code-resident structural bits into one Content. */
export function pricingCopy(locale: Locale): Content {
  return { ...CODE[locale], ...CMS[locale] };
}

export default function PricingClientView({ locale = 'en' }: PricingClientViewProps) {
  const t = pricingCopy(locale);
  const [persona, setPersona] = useState<'b2c' | 'b2b'>('b2c');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Persona View Toggle */}
      <section className="pt-8 pb-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
          <Breadcrumb items={[{ name: crumb('pricing', locale), path: '/pricing' }]} locale={locale} tone="light" />
        </div>
        <div className="max-w-md mx-auto px-4">
          <div className="flex p-1.5 bg-gray-200/50 rounded-2xl shadow-inner border border-gray-200/60">
            <button
              type="button"
              aria-pressed={persona === 'b2c'}
              onClick={() => setPersona('b2c')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-[color,background-color,box-shadow] duration-300 cursor-pointer ${persona === 'b2c'
                ? 'bg-white text-gray-900 shadow-md ring-1 ring-black/5'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              <Store className="w-4 h-4" />
              {t.toggleB2c}
            </button>
            <button
              type="button"
              aria-pressed={persona === 'b2b'}
              onClick={() => setPersona('b2b')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-[color,background-color,box-shadow] duration-300 cursor-pointer ${persona === 'b2b'
                ? 'bg-white text-gray-900 shadow-md ring-1 ring-black/5'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              <Building2 className="w-4 h-4" />
              {t.toggleB2b}
            </button>
          </div>
        </div>
      </section>

      {persona === 'b2c' ? (
        /* ════════════════════════════════════════
           B2C View — 개별 매장 점주용
           ════════════════════════════════════════ */
        <B2cPlans t={t} locale={locale} />
      ) : (
        /* ════════════════════════════════════════
           B2B View — 프랜차이즈 본사 / 다점포용
           ════════════════════════════════════════ */
        <B2bQuoteSimulator t={t} locale={locale} onBackToB2c={() => setPersona('b2c')} />
      )}

      {/* ════════════════════════════════
         Bundle Synergy CTA
         ════════════════════════════════ */}
      <AnimatedSection className="py-20 bg-gray-950 overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.05]" aria-hidden="true" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-block mb-5 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-sm font-bold text-primary-light uppercase tracking-wider">
              Synergy Package
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
            {t.bundleHeading}
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed max-w-xl mx-auto">
            {t.bundleBodyPre}<strong className="text-white font-medium">{t.bundleBodyStrong}</strong>{t.bundleBodyPost}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={localeHref(locale, '/contact')} className="btn-primary px-8 py-4 shadow-[0_0_20px_rgb(var(--primary-rgb)_/_0.3)] hover:shadow-[0_0_30px_rgb(var(--primary-rgb)_/_0.5)] transition-[box-shadow]">
              {t.bundleCta}
            </Link>
            <Link
              href={localeHref(locale, '/pricing/simulator')}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-medium hover:bg-white/20 transition-colors text-sm"
            >
              {t.bundleSimLink}
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
