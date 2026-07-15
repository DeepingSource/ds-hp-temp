import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, Timer, ShoppingCart, Combine, Lightbulb, HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '체류·전환 지표 | DEEPINGSOURCE',
  description:
    '체류시간과 구매 전환율이 각각 무엇을 말해주는지, 두 지표를 함께 볼 때 어떻게 해석하는지 안내합니다.',
  alternates: { canonical: '/resources/docs/dwell-conversion-metrics' },
  openGraph: {
    title: '체류·전환 지표 | DEEPINGSOURCE',
    description: '체류시간과 구매 전환율을 함께 해석하는 법을 안내합니다.',
    url: '/resources/docs/dwell-conversion-metrics',
  },
};

type Sub = { id: string; title: string };
type Section = { id: string; icon: typeof BookOpen; title: string; subs: Sub[] };

const sections: Section[] = [
  { id: 'dwell', icon: Timer, title: '체류시간', subs: [{ id: 'dwell', title: '무엇을 말해주는가' }] },
  { id: 'conversion', icon: ShoppingCart, title: '구매 전환율', subs: [{ id: 'conversion', title: '무엇을 말해주는가' }] },
  { id: 'combine', icon: Combine, title: '함께 보기', subs: [{ id: 'combine', title: '조합으로 해석하기' }] },
  { id: 'faq', icon: HelpCircle, title: 'FAQ', subs: [{ id: 'faq', title: '자주 묻는 질문' }] },
];

export default function DwellConversionMetricsDoc() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24">
              <Link href="/resources/docs" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> 제품 문서로
              </Link>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-gray-900">체류·전환 지표</span>
              </div>
              <nav className="space-y-5">
                {sections.map((section) => (
                  <div key={section.id}>
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">{section.title}</p>
                    <ul className="space-y-1 border-l border-gray-100 pl-3">
                      {section.subs.map((sub) => (
                        <li key={sub.id}>
                          <a href={`#${sub.id}`} className="block text-sm text-gray-500 hover:text-primary py-1 transition-colors">
                            {sub.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">Docs · Using Analytics</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              체류·전환 지표
            </h1>
            <p className="text-gray-500 leading-relaxed max-w-2xl mb-12 break-keep">
              대시보드에서 가장 자주 보게 되는 두 지표, 체류시간과 구매 전환율을 각각 그리고 함께 해석하는 법을 안내합니다.
            </p>

            {/* 체류시간 */}
            <section id="dwell" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Timer className="w-5 h-5 text-primary" /></span>
                체류시간
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                체류시간은 방문자가 매장 또는 특정 구역에 머문 시간입니다. 다만 <strong className="text-gray-700">길수록 항상 좋은 것은
                아닙니다.</strong> 업종에 따라 의미가 달라집니다 — 카페처럼 머무는 것 자체가 목적인 업종에서는 체류시간이 길수록
                긍정적인 신호일 수 있지만, 편의점처럼 빠른 구매가 목적인 업종에서는 지나치게 긴 체류시간이 &ldquo;찾는 상품을
                발견하지 못해 헤매고 있다&rdquo;는 신호일 수도 있습니다.
              </p>
            </section>

            {/* 구매 전환율 */}
            <section id="conversion" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><ShoppingCart className="w-5 h-5 text-primary" /></span>
                구매 전환율
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                구매 전환율은 방문자 대비 실제 구매로 이어진 비율입니다. 매장 전체의 효율을 보여주는 핵심 지표이며,
                POS 연동이 되어 있어야 확인할 수 있습니다. 구역 단위로 보면 어느 매대가 &ldquo;보기는 하지만 사지는 않는&rdquo;
                구간인지 짚어낼 수 있습니다.
              </p>
            </section>

            {/* 함께 보기 */}
            <section id="combine" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Combine className="w-5 h-5 text-primary" /></span>
                조합으로 해석하기
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 break-keep">
                두 지표를 따로 보기보다 함께 보면 원인을 더 좁혀갈 수 있습니다.
              </p>
              <dl className="divide-y divide-gray-100 border-y border-gray-100">
                {[
                  ['체류 길다 + 전환 낮다', '충분히 살펴봤지만 구매로 이어지지 않는 상태 — 가격, 상품 구성, 재고를 점검해 볼 만합니다.'],
                  ['체류 짧다 + 전환 높다', '목적 구매가 빠르게 이루어지는 상태 — 동선·진열이 효율적일 가능성이 높습니다.'],
                  ['체류 짧다 + 전환 낮다', '관심 자체를 끌지 못하고 지나치는 상태 — 진열 위치나 노출을 먼저 점검합니다.'],
                  ['체류 길다 + 전환 높다', '충분히 둘러보고 만족스럽게 구매하는, 대체로 이상적인 상태입니다.'],
                ].map(([term, def]) => (
                  <div key={term} className="grid sm:grid-cols-[12rem_1fr] gap-1 sm:gap-4 py-3">
                    <dt className="text-sm font-medium text-gray-900">{term}</dt>
                    <dd className="text-sm text-gray-600 leading-relaxed break-keep">{def}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><HelpCircle className="w-5 h-5 text-primary" /></span>
                자주 묻는 질문
              </h2>
              <div className="space-y-3">
                {[
                  ['구매 전환율이 POS 연동 없이도 보이나요?', '아니요. 구매 전환율은 매출 데이터가 필요해 POS 연동이 되어 있어야 확인할 수 있습니다.'],
                  ['업종별 평균값과 비교할 수 있나요?', '지표는 매장 자체의 기간별 변화를 비교하는 데 우선 활용하는 것을 권장합니다. 업종 벤치마크가 필요하면 담당 매니저에게 문의하세요.'],
                  ['특정 구역만 체류시간이 유독 긴데 좋은 신호인가요?', '업종과 해당 구역의 성격에 따라 다릅니다. 같은 구역의 구매 전환율을 함께 확인해 판단하는 것을 추천합니다.'],
                ].map(([q, a]) => (
                  <details key={q} className="card p-5 group">
                    <summary className="text-sm font-medium text-gray-900 cursor-pointer list-none flex items-center justify-between">
                      {q}
                      <span className="text-gray-400 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="text-sm text-gray-600 leading-relaxed mt-3 break-keep">{a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* 다음 단계 */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              <Link href="/resources/docs/reading-heatmaps" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">← 히트맵 읽는 법</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">체류가 몰리는 위치를 시각적으로 함께 확인하세요.</p>
              </Link>
              <Link href="/resources/docs#analytics" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">리포트 해석 →</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">여러 리포트를 묶어서 읽는 법을 안내합니다.</p>
              </Link>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-3 px-5 py-5 bg-primary/5 border border-primary/10 rounded-xl">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">우리 매장 지표를 함께 해석해 볼까요?</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 break-keep">
                  화면을 캡처해 문의해 주시면 함께 원인을 짚어 드립니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/contact" className="btn-primary text-sm">문의하기</Link>
                  <Link href="/resources/docs" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-xl hover:border-primary-light transition-colors">제품 문서로 돌아가기</Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
