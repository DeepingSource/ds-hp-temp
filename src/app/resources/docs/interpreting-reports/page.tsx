import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, ListOrdered, AlertTriangle, CheckCircle2, Lightbulb, HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '리포트 해석 | DEEPINGSOURCE',
  description:
    '여러 리포트를 순서대로 읽는 법과, 숫자 하나만 보고 성급하게 결론 내리지 않는 법을 안내합니다.',
  alternates: { canonical: '/resources/docs/interpreting-reports' },
  openGraph: {
    title: '리포트 해석 | DEEPINGSOURCE',
    description: '여러 리포트를 순서대로 묶어서 읽는 법을 안내합니다.',
    url: '/resources/docs/interpreting-reports',
  },
};

type Sub = { id: string; title: string };
type Section = { id: string; icon: typeof BookOpen; title: string; subs: Sub[] };

const sections: Section[] = [
  { id: 'order', icon: ListOrdered, title: '읽는 순서', subs: [{ id: 'order', title: '현황 → 공간 → 여정 → 진단' }] },
  { id: 'pitfalls', icon: AlertTriangle, title: '흔한 오해', subs: [{ id: 'pitfalls', title: '숫자 하나로 단정하지 않기' }] },
  { id: 'checklist', icon: CheckCircle2, title: '점검 습관', subs: [{ id: 'checklist', title: '리포트를 볼 때마다' }] },
  { id: 'faq', icon: HelpCircle, title: 'FAQ', subs: [{ id: 'faq', title: '자주 묻는 질문' }] },
];

export default function InterpretingReportsDoc() {
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
                <span className="text-sm font-bold text-gray-900">리포트 해석</span>
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
              리포트 해석
            </h1>
            <p className="text-gray-500 leading-relaxed max-w-2xl mb-12 break-keep">
              여러 리포트를 어떤 순서로, 어떤 태도로 읽어야 성급한 결론을 피할 수 있는지 안내합니다.
            </p>

            {/* 읽는 순서 */}
            <section id="order" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><ListOrdered className="w-5 h-5 text-primary" /></span>
                현황 → 공간 → 여정 → 진단
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3 break-keep">
                리포트가 많다 보니 어디서부터 봐야 할지 막막할 수 있습니다. store insight 매뉴얼의 구성을 따라가면
                자연스러운 순서가 됩니다.
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-sm text-gray-600 marker:text-primary marker:font-bold">
                <li><strong className="text-gray-700">매장 현황</strong> — 지금 얼마나, 누가 오는지 큰 그림부터 봅니다.</li>
                <li><strong className="text-gray-700">공간 가치</strong> — 히트맵과 구역별 분석으로 어느 공간이 반응하는지 봅니다.</li>
                <li><strong className="text-gray-700">고객 여정</strong> — 동선을 따라가며 사람들이 어떻게 이동하는지 봅니다.</li>
                <li><strong className="text-gray-700">진단·최적화</strong> — 구역 관심도, 퍼널, 전환율로 어디서 새는지 짚어냅니다.</li>
              </ol>
            </section>

            {/* 흔한 오해 */}
            <section id="pitfalls" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-primary" /></span>
                숫자 하나로 단정하지 않기
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-600 break-keep list-disc list-inside marker:text-primary">
                <li>단 하루의 숫자보다 <strong className="text-gray-700">며칠·몇 주에 걸친 흐름</strong>을 보는 것이 더 안정적입니다. 특정 요일·날씨·행사 등 일시적 요인이 있을 수 있습니다.</li>
                <li>지표 하나만으로 &ldquo;좋다/나쁘다&rdquo;를 판단하기보다, 체류·전환처럼 <strong className="text-gray-700">관련 지표를 함께</strong> 봐야 원인에 가까워집니다.</li>
                <li>매장 간 단순 비교보다, <strong className="text-gray-700">같은 매장의 시간에 따른 변화</strong>를 먼저 보는 것을 추천합니다. 매장마다 입지·평수·업종이 달라 절대값 비교가 왜곡될 수 있습니다.</li>
              </ul>
            </section>

            {/* 점검 습관 */}
            <section id="checklist" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-primary" /></span>
                리포트를 볼 때마다
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-600 break-keep list-disc list-inside marker:text-primary">
                <li>먼저 기간·필터가 원하는 조건으로 설정되어 있는지 확인합니다.</li>
                <li>이상해 보이는 숫자가 있다면, 같은 기간에 행사·휴무 등 특이사항이 있었는지 떠올려 봅니다.</li>
                <li>결론을 내리기 전에 관련된 다른 리포트(히트맵, 전환율 등)를 한 번 더 확인합니다.</li>
              </ul>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><HelpCircle className="w-5 h-5 text-primary" /></span>
                자주 묻는 질문
              </h2>
              <div className="space-y-3">
                {[
                  ['매일 확인해야 하나요?', '반드시 그럴 필요는 없습니다. 주간·월간 단위로 흐름을 확인하는 것도 충분히 유용합니다.'],
                  ['다른 매장과 비교하고 싶어요.', '입지·평수·업종이 다르면 절대값 비교가 왜곡될 수 있습니다. 매장별 기간 대비 변화율로 비교하는 것을 추천합니다.'],
                  ['특정 지표가 갑자기 크게 바뀌었어요.', '먼저 기간·필터 설정을 확인하고, 그래도 이상하다면 담당 매니저에게 화면을 캡처해 문의해 주세요.'],
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
              <Link href="/resources/docs/dwell-conversion-metrics" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">← 체류·전환 지표</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">함께 보면 좋은 핵심 지표 조합입니다.</p>
              </Link>
              <Link href="/resources/docs#analytics" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">기간 비교 분석 →</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">전월·전년 대비로 변화를 읽는 법입니다.</p>
              </Link>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-3 px-5 py-5 bg-primary/5 border border-primary/10 rounded-xl">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">리포트 해석이 헷갈리시나요?</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 break-keep">
                  화면을 캡처해 문의해 주시면 함께 해석해 드립니다.
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
