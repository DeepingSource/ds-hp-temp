import Image from 'next/image';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { store } from '../data';

/**
 * 섹션 4 — saai store(POP메이커). 중앙 헤더 + before/after + 3스텝 플로우.
 * before는 밋밋한 손글씨 안내(CSS 재현), after는 AI POP(리포 자산).
 */
export default function PopBeforeAfter() {
  const ba = store.beforeAfter;
  return (
    <section id="store" className="section scroll-mt-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1.5 text-sm font-bold">
            <Image src="/images/saai-symbol.svg" alt="" width={16} height={16} aria-hidden="true" />
            {store.eyebrow}
            <span className="font-medium text-primary/70">· {store.eyebrowSub}</span>
          </span>
          <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight leading-snug break-keep">
            {store.question}
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed break-keep">{store.lead}</p>
        </div>

        {/* Before / After */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 sm:gap-6">
            {/* Before */}
            <div className="flex-1 flex flex-col">
              <span className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-gray-400">{ba.beforeLabel}</span>
              <div className="flex-1 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center py-10 px-6 text-center">
                <p className="text-2xl font-medium text-gray-400" style={{ fontFamily: 'cursive' }}>{ba.beforeText}</p>
                <p className="mt-1 text-lg text-gray-400" style={{ fontFamily: 'cursive' }}>{ba.beforeSubText}</p>
              </div>
            </div>

            {/* 화살표 */}
            <div className="flex items-center justify-center shrink-0" aria-hidden="true">
              <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ArrowRight className="hidden sm:block w-5 h-5" />
                <ArrowDown className="sm:hidden w-5 h-5" />
              </span>
            </div>

            {/* After */}
            <div className="flex-1 flex flex-col">
              <span className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-primary">{ba.afterLabel}</span>
              <div className="flex-1 rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white">
                <div className="relative aspect-[4/3]">
                  <Image src={ba.afterImg} alt={ba.afterAlt} fill sizes="(max-width: 640px) 90vw, 40vw" className="object-cover" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="font-bold text-gray-900 break-keep">{ba.heading}</p>
            <p className="mt-1.5 text-sm text-gray-500 leading-relaxed break-keep">{ba.sub}</p>
          </div>
        </div>

        {/* 3스텝 */}
        <div className="mt-14 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {store.steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="relative rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
                <span className="absolute top-4 left-4 text-xs font-bold text-primary/40">{i + 1}</span>
                <span className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </span>
                <p className="mt-4 text-sm font-bold text-gray-900 break-keep">{s.title}</p>
                {s.desc && <p className="mt-1 text-2xs text-gray-500 break-keep">{s.desc}</p>}
              </div>
            );
          })}
        </div>

        {/* 한 번에 만드는 POP 종류 (saai.store) */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-xs font-medium text-gray-400">{store.popTypesLabel}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {store.popTypes.map((p) => (
              <span key={p} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600">{p}</span>
            ))}
          </div>
        </div>

        {/* POP메이커 바로 써보기 CTA */}
        <div className="mt-8 text-center">
          <a href={store.cta.href} target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg inline-flex items-center gap-2">
            {store.cta.label}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
