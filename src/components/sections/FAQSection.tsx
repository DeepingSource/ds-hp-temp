'use client';

import Link from 'next/link';
import { ArrowRight, HelpCircle, ChevronDown } from 'lucide-react';
import { faqData } from '@/data/faq-data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';

const mainFaqItems = faqData.flatMap((cat) => cat.items).slice(0, 10);

function FaqItem({ question, answer, id }: { question: string; answer: React.ReactNode; id: string }) {
  const [open, setOpen] = useState(false);
  const panelId = `${id}-panel`;
  return (
    <div className={`border-b border-gray-100 last:border-b-0 transition-colors ${open ? 'bg-gray-50/50' : ''}`}>
      <button
        type="button"
        id={id}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 px-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <h3 className={`text-sm font-medium leading-relaxed transition-colors ${open ? 'text-primary' : 'text-gray-900'}`}>
          {question}
        </h3>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-primary' : 'text-gray-500'}`}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={id}
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <>
      {/* FAQ */}
      <section id="faq" ref={ref} className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* 섹션 헤더 */}
          <div className={`text-center mb-12 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">FAQ</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 break-keep">
              자주 묻는 질문
            </h2>
            <p className="text-gray-500">
              궁금한 점이 있으신가요? 가장 많이 묻는 질문들을 모았습니다.
            </p>
          </div>

          {/* FAQ 아코디언 */}
          <div className={`bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm mb-6 ${isVisible ? 'scroll-visible delay-100' : 'scroll-hidden'}`}>
            {mainFaqItems.map((item, i) => (
              <FaqItem key={item.question} id={`faq-home-${i}`} question={item.question} answer={typeof item.answer === 'function' ? item.answer('en') : item.answer} />
            ))}
          </div>

          {/* 전체 FAQ + CTA */}
          <div className={`space-y-6 ${isVisible ? 'scroll-visible delay-200' : 'scroll-hidden'}`}>
            <div className="text-center">
              <Link
                href="/faq"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                전체 FAQ 보기
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <HelpCircle className="w-5 h-5 text-primary" />
                <p className="font-bold text-gray-900">궁금한 점이 더 있으신가요?</p>
              </div>
              <p className="text-sm text-gray-500 text-center mb-5">
                전문 상담사가 매장 상황에 맞는 최적의 플랜을 안내해 드립니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  무료 상담 신청
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#pricing"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  플랜 비교하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-surface-dark" />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 break-keep">
            AI 매장 비서, 지금 시작하세요
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            매일 아침 브리핑부터 POS 분석, AI 대화까지.<br className="hidden sm:block" />
            무료로 시작하고 필요에 따라 업그레이드하세요.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="btn-primary btn-lg inline-flex items-center justify-center gap-2"
            >
              무료 상담 신청
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/storeagent/sample"
              className="btn-ghost-dark gap-2 rounded-xl backdrop-blur-sm"
            >
              브리핑 미리보기
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-300">
            <Link href="#faq" className="hover:text-white transition-colors">
              자주 묻는 질문
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">
              전체 FAQ 보기
            </Link>
            <Link href="/pricing" className="hover:text-white transition-colors">
              상세 요금 비교
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
