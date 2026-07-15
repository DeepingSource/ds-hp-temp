import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, CalendarRange, GitCompare, PartyPopper, Lightbulb, HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '기간 비교 분석 | DEEPINGSOURCE',
  description:
    '전월·전년 대비 등 기간을 비교해 변화를 읽는 법과, 행사 일정과 함께 비교할 때 유의할 점을 안내합니다.',
  alternates: { canonical: '/resources/docs/period-over-period-analysis' },
  openGraph: {
    title: '기간 비교 분석 | DEEPINGSOURCE',
    description: '기간을 비교해 변화를 읽는 법을 안내합니다.',
    url: '/resources/docs/period-over-period-analysis',
  },
};

type Sub = { id: string; title: string };
type Section = { id: string; icon: typeof BookOpen; title: string; subs: Sub[] };

const sections: Section[] = [
  { id: 'why', icon: CalendarRange, title: '왜 기간을 비교하는가', subs: [{ id: 'why', title: '절대값보다 변화' }] },
  { id: 'how', icon: GitCompare, title: '비교하는 법', subs: [{ id: 'how', title: '같은 조건으로 맞추기' }] },
  { id: 'events', icon: PartyPopper, title: '행사와 함께 보기', subs: [{ id: 'events', title: '행사 일정 등록 활용' }] },
  { id: 'faq', icon: HelpCircle, title: 'FAQ', subs: [{ id: 'faq', title: '자주 묻는 질문' }] },
];

export default function PeriodOverPeriodAnalysisDoc() {
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
                <span className="text-sm font-bold text-gray-900">기간 비교 분석</span>
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
              기간 비교 분석
            </h1>
            <p className="text-gray-500 leading-relaxed max-w-2xl mb-12 break-keep">
              전월·전년 대비처럼 기간을 비교해 변화를 읽는 법과, 행사 기간과 함께 비교할 때 유의할 점을 안내합니다.
            </p>

            {/* 왜 기간을 비교하는가 */}
            <section id="why" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><CalendarRange className="w-5 h-5 text-primary" /></span>
                절대값보다 변화
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                &ldquo;이번 달 방문자 수 1,000명&rdquo;이라는 숫자만으로는 잘하고 있는지 판단하기 어렵습니다. 지난달, 혹은
                작년 같은 달과 비교했을 때 늘었는지 줄었는지를 봐야 의미가 생깁니다. 리포트 해석 문서에서 다룬 것처럼,
                하루의 숫자보다 기간에 걸친 변화가 더 안정적인 근거가 됩니다.
              </p>
            </section>

            {/* 비교하는 법 */}
            <section id="how" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><GitCompare className="w-5 h-5 text-primary" /></span>
                같은 조건으로 맞추기
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-600 break-keep list-disc list-inside marker:text-primary">
                <li>비교하려는 두 기간의 <strong className="text-gray-700">길이(일수)</strong>를 맞추는 것이 기본입니다 — 예: 이번 달 1~15일과 지난달 1~15일.</li>
                <li>요일 구성이 다르면 방문 패턴이 달라질 수 있어, 가능하면 <strong className="text-gray-700">같은 요일 수</strong>를 포함하는 기간으로 비교합니다.</li>
                <li>공휴일·연휴가 낀 기간은 별도로 표시해 두고, 일반 기간과 섞어서 비교하지 않는 것이 좋습니다.</li>
              </ul>
            </section>

            {/* 행사와 함께 보기 */}
            <section id="events" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><PartyPopper className="w-5 h-5 text-primary" /></span>
                행사 일정 등록 활용
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                프로모션·행사 일정을 대시보드에 미리 등록해 두면, 해당 기간의 방문·전환 변화를 평상시와 구분해서
                비교할 수 있습니다. 행사 효과를 &ldquo;느낌&rdquo;이 아니라 기간 비교로 사후에 검증하고 싶다면, 행사 시작 전에
                일정을 등록해 두는 것을 권장합니다.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><HelpCircle className="w-5 h-5 text-primary" /></span>
                자주 묻는 질문
              </h2>
              <div className="space-y-3">
                {[
                  ['전월 대비, 전년 대비 중 무엇을 봐야 하나요?', '둘 다 유용합니다. 전월 대비는 최근 추세를, 전년 대비는 계절적 요인을 함께 걸러낸 변화를 보여줍니다.'],
                  ['개점한 지 얼마 안 됐는데 비교할 이전 기간이 없어요.', '충분한 기간의 데이터가 쌓이기 전까지는 절대값 위주로 확인하시고, 데이터가 쌓이는 대로 기간 비교를 시작하시면 됩니다.'],
                  ['행사 기간을 나중에 등록해도 되나요?', '가능합니다. 다만 사전에 등록해 두면 실시간으로 변화를 함께 지켜볼 수 있어 더 유용합니다.'],
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
              <Link href="/resources/docs/interpreting-reports" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">← 리포트 해석</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">여러 리포트를 순서대로 읽는 법입니다.</p>
              </Link>
              <Link href="/resources/docs/store-insight" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">store insight 사용자 매뉴얼 →</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">실제 화면과 함께 전체 리포트를 자세히 안내합니다.</p>
              </Link>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-3 px-5 py-5 bg-primary/5 border border-primary/10 rounded-xl">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">기간 비교가 궁금한 상황이 있으신가요?</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 break-keep">
                  구체적인 상황을 알려주시면 어떤 기간으로 비교하면 좋을지 함께 찾아 드립니다.
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
