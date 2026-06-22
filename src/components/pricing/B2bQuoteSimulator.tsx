'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Mail, Users, Shield, AlertCircle } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Spinner from '@/components/ui/Spinner';
import { submitQuoteRequest } from '@/lib/contact-lead';
import { localeHref, type Locale } from '@/lib/i18n';
import { B2B_PRICING } from '@/lib/pricing-data';
import { type Content } from './PricingClientView';

// StoreCare Plus is priced per camera; 6,125/cam keeps the default (4 cams) at the
// prior 24,500/store figure while making the "cameras per store" slider drive the estimate.
const B2B_PER_CAMERA = B2B_PRICING.perCamera;

export default function B2bQuoteSimulator({ t, locale, onBackToB2c }: { t: Content; locale: Locale; onBackToB2c: () => void }) {
  /* ── B2B multi-store simulator ── */
  const [b2bStoreCount, setB2bStoreCount] = useState(10);
  const [b2bCamerasPerStore, setB2bCamerasPerStore] = useState(4);
  const [b2bEmail, setB2bEmail] = useState('');
  const [b2bSubmitted, setB2bSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleB2bSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!b2bEmail || isSubmitting) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const ok = await submitQuoteRequest({
        name: t.b2bReqName,
        contact: b2bEmail,
        storeCount: String(b2bStoreCount),
        inquiryType: t.b2bReqInquiry,
        message: t.b2bReqMessage(b2bStoreCount, b2bCamerasPerStore),
      });
      if (ok) {
        setB2bSubmitted(true);
      } else {
        setError(t.errSubmitFailed);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── B2B 할인율 계산 ── */
  const getDiscount = (count: number) =>
    B2B_PRICING.discountTiers.find(tg => count >= tg.minStores)?.percent ?? 0;

  const discount = getDiscount(b2bStoreCount);

  return (
    <AnimatedSection className="py-12 bg-white rounded-t-3xl border-t border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {t.b2bHeading}
          </h2>
          <p className="text-gray-500">
            {t.b2bSub}
          </p>
        </div>

        {/* ── 다점포 견적 시뮬레이터 ── */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-6 sm:p-8 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-gray-900">{t.b2bSimTitle}</h3>
              </div>
              <p className="text-sm text-gray-500">{t.b2bSimSub}</p>
            </div>

            <div className="p-6 sm:p-8">
              {/* STEP 1: 매장당 평균 카메라 수 */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-3xs font-bold flex items-center justify-center shrink-0">1</span>
                  <label htmlFor="b2b-cameras" className="text-sm font-bold text-gray-700">{t.b2bCamLabel}</label>
                  <span className="ml-auto text-lg font-bold text-primary">{b2bCamerasPerStore}{t.unitDevice}</span>
                </div>
                <input
                  id="b2b-cameras"
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={b2bCamerasPerStore}
                  onChange={(e) => setB2bCamerasPerStore(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{t.b2bSmall}</span>
                  <span>{t.b2bMid}</span>
                  <span>{t.b2bLarge}</span>
                </div>
              </div>

              {/* STEP 2: 매장 수 슬라이더 */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-3xs font-bold flex items-center justify-center shrink-0">2</span>
                  <label htmlFor="b2b-store-count" className="text-sm font-bold text-gray-700">{t.b2bStoreLabel}</label>
                  <span className="ml-auto text-lg font-bold text-primary">{b2bStoreCount}{t.unitStore}</span>
                </div>
                <input
                  id="b2b-store-count"
                  type="range"
                  min="3"
                  max="100"
                  step="1"
                  value={b2bStoreCount}
                  onChange={(e) => setB2bStoreCount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{t.b2b3}</span>
                  <span>{t.b2b50}</span>
                  <span>{t.b2b100}</span>
                </div>
              </div>

              {/* 할인율 및 개별 매장 비용 */}
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-primary/5 rounded-xl text-center">
                  <p className="text-xs font-medium text-gray-500 mb-1">{t.discountLabel}</p>
                  <p className="text-2xl font-bold text-primary">{discount}%</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl text-center">
                  <p className="text-xs font-medium text-gray-500 mb-1">{t.perStoreCost}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ~{(Math.round(B2B_PER_CAMERA * b2bCamerasPerStore * (1 - discount / 100) / 100) * 100).toLocaleString()}{t.won}
                  </p>
                  <p className="text-xs text-gray-500">{t.perStoreBasis}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <p className="text-xs font-medium text-gray-500 mb-1">{t.totalMonthly}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ~{(Math.round(B2B_PER_CAMERA * b2bCamerasPerStore * (1 - discount / 100) / 100) * 100 * b2bStoreCount).toLocaleString()}{t.won}
                  </p>
                  <p className="text-xs text-gray-500">{t.totalBasis(b2bStoreCount)}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-8">{t.estimateDisclaimer}</p>

              {/* 할인 구간 안내 */}
              <div className="flex flex-wrap gap-2 mb-8">
                {t.tiers.map((tier) => (
                  <span
                    key={tier.range}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                      discount === parseInt(tier.rate)
                        ? 'bg-primary/10 text-primary border-primary/20'
                        : 'bg-gray-50 text-gray-500 border-gray-100'
                    }`}
                  >
                    {tier.range}: {tier.rate}
                  </span>
                ))}
              </div>

              {/* 이메일 견적 요청 */}
              {!b2bSubmitted ? (
                <form onSubmit={handleB2bSubmit}>
                  <label htmlFor="b2b-email" className="block text-sm font-bold text-gray-700 mb-2">{t.b2bEmailLabel}</label>
                  <div className="flex gap-2">
                    <div className="flex items-center flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-[border-color,box-shadow]">
                      <Mail className="w-4 h-4 text-gray-500 shrink-0" aria-hidden="true" />
                      <input
                        id="b2b-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder={t.emailPlaceholder}
                        value={b2bEmail}
                        onChange={(e) => setB2bEmail(e.target.value)}
                        className="w-full pl-2.5 py-3 bg-transparent text-sm focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary py-3 px-6 shrink-0 shadow-md disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                    >
                      {isSubmitting && <Spinner />}
                      {t.getQuote}
                    </button>
                  </div>
                  {error && (
                    <p className="flex items-center gap-1.5 text-xs text-error mt-2" role="alert">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      {error}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">{t.b2bEmailNote}</p>
                </form>
              ) : (
                <div className="p-5 bg-blue-50 rounded-xl border border-blue-100 text-center">
                  <Check className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-blue-800 font-bold text-sm">{t.submittedTitle}</p>
                  <p className="text-xs text-blue-600 mt-1">{t.submittedSub}</p>
                  <button type="button" onClick={() => setB2bSubmitted(false)} className="text-xs text-blue-600 underline mt-3 hover:text-blue-700 cursor-pointer">{t.recalc}</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── 엔터프라이즈 카드 ── */}
        <div className="max-w-md mx-auto">
          {/* 엔터프라이즈 솔루션 */}
          <div className="relative p-7 bg-gray-900 text-white rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white mb-5 border border-white/20">
                <Shield className="w-3.5 h-3.5" /> {t.entBadge}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t.entTitle}</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                {t.entDesc}
              </p>
              <ul className="space-y-3 mb-8">
                {t.entFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{f}</li>
                ))}
              </ul>
              <Link href={localeHref(locale, '/contact')} className="btn-primary w-full text-center shadow-[0_0_20px_rgb(var(--primary-rgb)_/_0.3)]">
                {t.entCta}
              </Link>
            </div>
          </div>
        </div>

        {/* 개별 매장 요금 참고 링크 */}
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={onBackToB2c}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            {t.backToB2c} <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
}
