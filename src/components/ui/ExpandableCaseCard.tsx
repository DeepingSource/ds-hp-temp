'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { TrendingUp, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface CaseStudy {
  category: string;
  title: string;
  metric: string;
  problem: string;
  solution: string;
  result: string;
  image1?: string;
  title1?: string;
  image2?: string;
  title2?: string;
  image3?: string;
  title3?: string;
  image?: string;
  imageGuide?: string;
  quote?: string;
  quoteName?: string;
}

function CaseDetail({ cs, stepImages }: { cs: CaseStudy; stepImages: { src?: string; alt: string; stepLabel: string; stepColor: string; title: string; text: string }[] }) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stepImages.map((step) => (
          <div key={step.stepLabel} className="flex flex-col">
            {step.src && (
              <div className="w-full aspect-video bg-gray-100 rounded-xl border border-gray-200 overflow-hidden mb-4 relative">
                <Image src={step.src} alt={step.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            )}
            <p className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <span className={`px-2 py-0.5 rounded text-xs tracking-tight uppercase ${step.stepColor}`}>{step.stepLabel}</span>
              {step.title}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
          </div>
        ))}
      </div>
      {cs.quote && (
        <div className="mt-6 pt-5 border-t border-gray-100 flex items-start gap-3">
          <span className="text-2xl text-violet-300 leading-none shrink-0">&ldquo;</span>
          <div>
            <p className="text-sm text-gray-700 italic leading-relaxed">{cs.quote}</p>
            {cs.quoteName && <p className="text-xs text-gray-500 mt-1.5 font-medium">— {cs.quoteName}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExpandableCaseCards({ cases }: { cases: CaseStudy[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback((idx: number) => {
    setSelected((prev) => (prev === idx ? null : idx));
  }, []);

  // 선택 시 패널이 뷰포트 밖이면 스크롤 (애니메이션 완료 후)
  useEffect(() => {
    if (selected !== null && panelRef.current) {
      const timer = setTimeout(() => {
        const el = panelRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // 패널 하단이 뷰포트 아래에 있을 때만 스크롤
        if (rect.bottom > window.innerHeight) {
          el.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  const isOpen = selected !== null;

  return (
    <div>
      {/* 카드 그리드 — 반응형: 2/3/4열, 고정 높이로 일관성 유지 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 items-stretch">
        {cases.map((item, idx) => {
          const isActive = selected === idx;
          return (
            <button
              key={item.title}
              type="button"
              aria-expanded={isActive}
              aria-controls="case-detail-panel"
              onClick={() => handleSelect(idx)}
              className={`group text-left p-4 sm:p-5 rounded-2xl border cursor-pointer transition-[border-color,box-shadow] duration-200 flex flex-col h-[180px] sm:h-[200px] ${
                isActive
                  ? 'border-violet-300 shadow-lg ring-1 ring-violet-200 bg-violet-50/50'
                  : 'border-gray-100 bg-white hover:shadow-md hover:border-violet-200'
              }`}
            >
              <span className="px-2.5 py-0.5 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full self-start mb-3">
                {item.category}
              </span>

              <h3 className="text-sm font-bold text-gray-900 mb-3 leading-snug line-clamp-2">
                {item.title}
              </h3>

              <div className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-50 to-emerald-50/50 rounded-lg px-2 py-2 border border-emerald-100 mt-auto">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-emerald-700 leading-tight">
                  {item.metric}
                </span>
              </div>

              <p className={`mt-3 text-xs text-violet-500 font-medium transition-opacity ${isActive ? 'opacity-0 h-0' : 'opacity-0 group-hover:opacity-100 h-4'}`}>
                자세히 보기 →
              </p>
            </button>
          );
        })}
      </div>

      {/* 디테일 패널 — 그리드 아래에 별도 표시, 모든 케이스를 미리 렌더링 */}
      <div
        id="case-detail-panel"
        ref={panelRef}
        role="region"
        aria-label={isOpen ? `${cases[selected].title} 상세` : undefined}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="bg-white rounded-2xl border border-violet-200 shadow-lg p-6 sm:p-8">
            {/* 헤더 — 현재 선택된 케이스 정보만 표시 */}
            {isOpen && (
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-wrap sm:flex-nowrap">
                  <span className="px-2 sm:px-3 py-1 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full shrink-0">
                    {cases[selected].category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight break-keep">
                    {cases[selected].title}
                  </h3>
                  <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 rounded-lg px-2 py-1 border border-emerald-100 shrink-0">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-700">{cases[selected].metric}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-4">
                  <button
                    type="button"
                    onClick={() => setSelected(selected > 0 ? selected - 1 : cases.length - 1)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer transition-colors"
                    aria-label="이전 사례"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelected(selected < cases.length - 1 ? selected + 1 : 0)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer transition-colors"
                    aria-label="다음 사례"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 cursor-pointer transition-colors ml-1"
                    aria-label="닫기"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* 3-Step 콘텐츠 — 모든 케이스 미리 렌더링, opacity로 전환 */}
            <div className="grid" style={{ gridTemplateAreas: '"detail"' }}>
              {cases.map((cs, idx) => (
                <div
                  key={cs.title}
                  style={{ gridArea: 'detail' }}
                  className={`transition-opacity duration-200 ${
                    selected === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  aria-hidden={selected !== idx}
                >
                  <CaseDetail
                    cs={cs}
                    stepImages={[
                      { src: cs.image1, alt: cs.title1 || '도입 전 현황', stepLabel: 'STEP 1', stepColor: 'bg-red-50 text-red-600', title: cs.title1 || '과제', text: cs.problem },
                      { src: cs.image2, alt: cs.title2 || 'SAAI 솔루션 적용', stepLabel: 'STEP 2', stepColor: 'bg-violet-50 text-violet-600', title: cs.title2 || '솔루션', text: cs.solution },
                      { src: cs.image3, alt: cs.title3 || '개선 결과', stepLabel: 'STEP 3', stepColor: 'bg-emerald-50 text-emerald-600', title: cs.title3 || '결과', text: cs.result },
                    ]}
                  />
                </div>
              ))}
            </div>

            {/* 페이지 인디케이터 */}
            <div className="flex items-center justify-center gap-0.5 mt-6 pt-4 border-t border-gray-100">
              {cases.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelected(i)}
                  className="flex items-center justify-center w-6 h-6 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={`사례 ${i + 1}${i === selected ? ' (현재 선택됨)' : ''}`}
                  aria-pressed={i === selected}
                >
                  <span className={`block w-2 h-2 rounded-full transition-colors ${
                    i === selected ? 'bg-violet-500' : 'bg-gray-200 hover:bg-gray-300'
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
