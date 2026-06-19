'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Calculator, Mail, AlertCircle } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Spinner from '@/components/ui/Spinner';
import { submitQuoteRequest } from '@/lib/contact-lead';
import { localeHref, type Locale } from '@/lib/i18n';
import { type Content } from './PricingClientView';

const SIM_PRODUCT_OPTIONS = [
  { key: 'care', label: 'Store Care', color: 'blue' },
  { key: 'insight', label: 'Store Insight', color: 'blue' },
  { key: 'agent', label: 'Store Agent', color: 'blue' },
] as const;

export default function InlinePricingSimulator({ t, locale }: { t: Content; locale: Locale }) {
  /* ── Inline simulator (simplified) ── */
  const [simCameras, setSimCameras] = useState<number>(8);
  const [simProducts, setSimProducts] = useState<Set<string>>(new Set(['insight']));
  const [simEmail, setSimEmail] = useState('');
  const [simSubmitted, setSimSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleSimProduct = useCallback((key: string) => {
    setSimProducts((prev) => {
      const next = new Set(prev);
      if (next.has(key)) { next.delete(key); } else { next.add(key); }
      return next;
    });
  }, []);

  const simInsightCost = simProducts.has('insight') ? (simCameras <= 8 ? 100000 : 100000 + (simCameras - 8) * 10000) : 0;
  const simCareCost = simProducts.has('care') ? (simCameras <= 4 ? 14900 : 14900 + Math.ceil((simCameras - 4) / 2) * 2500) : 0;
  const simAgentCost = simProducts.has('agent') ? 15000 : 0;
  const estimatedCost = simInsightCost + simCareCost + simAgentCost;

  const handleSimulateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!simEmail || isSubmitting) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const ok = await submitQuoteRequest({
        name: t.simReqName,
        contact: simEmail,
        storeCount: '1',
        inquiryType: t.simReqInquiry,
        message: t.simReqMessage({ cam: simCameras, cost: estimatedCost.toLocaleString() }),
      });
      if (ok) {
        setSimSubmitted(true);
      } else {
        setError(t.errSubmitFailed);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedSection className="py-16 bg-gray-50 border-t border-gray-100 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-primary/20" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {t.simHeading}
          </h2>
          <p className="text-gray-500">
            {t.simSub}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          {/* Controls */}
          <div className="p-6 sm:p-8 md:w-1/2 bg-white flex flex-col justify-center">
            {/* 제품 선택 */}
            <div className="mb-6">
              <p className="text-sm font-bold text-gray-700 mb-3">{t.simSelectLabel}</p>
              <div className="flex flex-wrap gap-2">
                {SIM_PRODUCT_OPTIONS.map((p) => {
                  const active = simProducts.has(p.key);
                  const colors = active
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-blue-700 border-blue-200 hover:border-blue-400';
                  return (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => toggleSimProduct(p.key)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${colors}`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label htmlFor="sim-insight-cameras" className="text-sm font-bold text-gray-700">{t.simCamLabel}</label>
                <span className="text-lg font-bold text-primary">{simCameras}{t.unitDevice}</span>
              </div>
              <input
                id="sim-insight-cameras"
                type="range"
                min="2"
                max="32"
                step="1"
                value={simCameras}
                onChange={(e) => setSimCameras(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>{t.simSmall}</span>
                <span>{t.simLarge}</span>
              </div>
            </div>

            {!simSubmitted ? (
              <form onSubmit={handleSimulateSubmit} className="mt-auto">
                <label htmlFor="sim-email" className="block text-sm font-bold text-gray-700 mb-2">{t.simEmailLabel}</label>
                <div className="flex gap-2">
                  <div className="flex items-center flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-[border-color,box-shadow]">
                    <Mail className="w-4 h-4 text-gray-500 shrink-0" aria-hidden="true" />
                    <input
                      id="sim-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder={t.emailPlaceholder}
                      value={simEmail}
                      onChange={(e) => setSimEmail(e.target.value)}
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
                <p className="text-xs text-gray-500 mt-2">{t.simEmailNote}</p>
              </form>
            ) : (
              <div className="p-5 bg-blue-50 rounded-xl border border-blue-100 mt-auto text-center">
                <Check className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-blue-800 font-bold text-sm">{t.submittedTitle}</p>
                <button onClick={() => setSimSubmitted(false)} className="text-xs text-blue-600 underline mt-2 hover:text-blue-700 cursor-pointer">{t.recalc}</button>
              </div>
            )}
          </div>

          {/* Result */}
          <div className="relative p-6 sm:p-8 md:w-1/2 bg-surface-dark text-white flex flex-col justify-center items-center text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-tr-full blur-2xl" />

            <Calculator className="w-8 h-8 text-primary mb-3 opacity-80" />
            <p className="text-sm text-gray-300 font-medium mb-2">{t.simResultLabel}</p>
            <div className="mb-2">
              <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                {estimatedCost > 0 ? estimatedCost.toLocaleString() : '0'}
              </span>
              <span className="text-lg text-gray-300 ml-1">{t.won}</span>
            </div>

            {/* 제품별 breakdown */}
            {estimatedCost > 0 && (
              <div className="w-full space-y-1.5 mb-4 text-left">
                {simProducts.has('care') && (
                  <div className="flex justify-between text-xs text-gray-300">
                    <span>Store Care</span>
                    <span>{simCareCost.toLocaleString()}{t.won}</span>
                  </div>
                )}
                {simProducts.has('insight') && (
                  <div className="flex justify-between text-xs text-gray-300">
                    <span>Store Insight</span>
                    <span>{simInsightCost.toLocaleString()}{t.won}</span>
                  </div>
                )}
                {simProducts.has('agent') && (
                  <div className="flex justify-between text-xs text-gray-300">
                    <span>Store Agent</span>
                    <span>{simAgentCost.toLocaleString()}{t.won}</span>
                  </div>
                )}
              </div>
            )}

            {estimatedCost > 0 ? (
              <div className="flex items-center gap-2 text-sm text-blue-400 font-medium bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 mb-3">
                <Check className="w-4 h-4" /> {t.simPerDay(Math.round(estimatedCost / 30).toLocaleString())}
              </div>
            ) : (
              <p className="text-sm text-gray-300 mb-3">{t.simEmptyHint}</p>
            )}

            <p className="text-3xs text-gray-500 leading-relaxed">
              {t.simResultDisclaimer}
            </p>

            <Link
              href={localeHref(locale, '/pricing/simulator')}
              className="inline-flex items-center gap-1 text-xs text-gray-300 hover:text-gray-100 transition-colors mt-4"
            >
              {t.detailSimLink} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
