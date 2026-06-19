'use client';

import Link from 'next/link';
import { Check, Minus, Shield } from 'lucide-react';
import { plans, valueAnchors } from '@/lib/pricing-data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function PricingSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section id="pricing" ref={ref} className="section bg-bg-cool">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className={`text-center mb-14 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
          <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">Pricing</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 break-keep">
            매장에 맞는 플랜을 선택하세요
          </h2>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-violet-50 text-violet-700 rounded-full text-xs sm:text-sm font-bold border border-violet-100 shadow-sm">
              <Shield className="w-4 h-4" /> 본사 시스템과 독립된, 오직 점주님만을 위한 AI 비서
            </span>
          </div>
          <p className="text-gray-500">
            무료로 시작하고, 필요에 따라 업그레이드하세요.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            const isPopular = plan.popular;
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 flex flex-col transition-shadow duration-300 ${isPopular
                    ? 'bg-gray-900 text-white shadow-xl shadow-gray-900/20 ring-1 ring-gray-900 scale-[1.02] lg:scale-105'
                    : 'bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg'
                  } ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                    <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm whitespace-nowrap">
                      추천
                    </span>
                  </div>
                )}

                <h3 className={`text-lg font-bold mb-1 ${isPopular ? 'text-white mt-2' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>

                {plan.targetUser && (
                  <p className={`text-xs mb-4 ${isPopular ? 'text-gray-300' : 'text-gray-500'}`}>
                    {plan.targetUser}
                  </p>
                )}

                <div className="mb-1">
                  <span className={`text-4xl font-extrabold tracking-tight ${isPopular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  {plan.priceNote && (
                    <span className={`text-sm ml-1 ${isPopular ? 'text-gray-300' : 'text-gray-500'}`}>
                      {plan.priceNote}
                    </span>
                  )}
                </div>

                {valueAnchors[plan.id] && (
                  <p className={`text-xs mb-5 ${isPopular ? 'text-gray-300' : 'text-gray-500'}`}>
                    ({valueAnchors[plan.id]})
                  </p>
                )}

                <p className={`text-sm mb-6 leading-relaxed ${isPopular ? 'text-gray-300' : 'text-gray-500'}`}>
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.text}
                      className={`flex items-center gap-2.5 text-sm ${feature.included
                          ? isPopular ? 'text-gray-200' : 'text-gray-700'
                          : isPopular ? 'text-gray-600' : 'text-gray-500'
                        }`}
                    >
                      {feature.included ? (
                        <Check className={`w-4 h-4 flex-shrink-0 ${isPopular ? 'text-white' : 'text-primary'}`} />
                      ) : (
                        <Minus className="w-4 h-4 flex-shrink-0 text-gray-500" />
                      )}
                      <span className="sr-only">{feature.included ? '포함:' : '미포함:'}</span>
                      {feature.text}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.ctaLink}
                  className={`block w-full text-center py-3.5 rounded-xl font-semibold transition-[background-color,box-shadow] duration-200 text-sm ${isPopular
                      ? 'bg-white text-gray-900 hover:bg-gray-100 hover:shadow-lg hover:shadow-white/20'
                      : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg'
                    }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Guarantee Badge */}
        <div className={`flex items-center justify-center gap-2 mt-8 mb-6 ${isVisible ? 'scroll-visible delay-500' : 'scroll-hidden'}`}>
          <Shield className="w-4 h-4 text-success" />
          <span className="text-sm text-gray-500">무료 상담 후 시작 · 만족하지 않으면 100% 환불</span>
        </div>

        {/* View Full Comparison */}
        <div className={`text-center ${isVisible ? 'scroll-visible delay-600' : 'scroll-hidden'}`}>
          <Link
            href="/pricing"
            className="arrow-link text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1 transition-colors text-sm"
          >
            상세 비교표 보기
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
