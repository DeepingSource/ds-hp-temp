import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, ShoppingCart, Workflow, ClipboardList, CheckCircle2, Lightbulb, HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'POS 연동 | DEEPINGSOURCE',
  description:
    '매출 데이터를 방문·동선 분석과 함께 보기 위한 POS 연동 방식과 절차, 담당자가 준비해야 할 정보를 안내합니다.',
  alternates: { canonical: '/resources/docs/pos-integration' },
  openGraph: {
    title: 'POS 연동 | DEEPINGSOURCE',
    description: '매출 데이터를 방문·동선 분석과 함께 보기 위한 POS 연동을 안내합니다.',
    url: '/resources/docs/pos-integration',
  },
};

type Sub = { id: string; title: string };
type Section = { id: string; icon: typeof BookOpen; title: string; subs: Sub[] };

const sections: Section[] = [
  { id: 'about', icon: BookOpen, title: '개요', subs: [{ id: 'about', title: '왜 POS를 연동하는가' }] },
  { id: 'flow', icon: Workflow, title: '연동 방식', subs: [{ id: 'flow', title: '매출 데이터가 리포트가 되기까지' }] },
  { id: 'prepare', icon: ClipboardList, title: '준비할 정보', subs: [{ id: 'prepare', title: '담당자 체크리스트' }] },
  { id: 'verify', icon: CheckCircle2, title: '연동 확인', subs: [{ id: 'verify', title: '구매 전환율에서 확인' }] },
  { id: 'faq', icon: HelpCircle, title: 'FAQ', subs: [{ id: 'faq', title: '자주 묻는 질문' }] },
];

export default function PosIntegrationDoc() {
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
                <span className="text-sm font-bold text-gray-900">POS 연동</span>
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
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">Docs · Integration Guide</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              POS 연동
            </h1>
            <p className="text-gray-500 leading-relaxed max-w-2xl mb-12 break-keep">
              POS 연동은 선택 사항입니다. 방문·동선 데이터만으로도 대부분의 리포트를 이용할 수 있으며,
              매출 데이터까지 함께 보고 싶을 때 추가로 연동합니다.
            </p>

            {/* 개요 */}
            <section id="about" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><ShoppingCart className="w-5 h-5 text-primary" /></span>
                왜 POS를 연동하는가
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                CCTV 기반 분석만으로도 방문자 수, 체류시간, 동선, 구역별 관심도를 확인할 수 있습니다. 여기에 POS의
                실제 매출 데이터를 더하면 <strong className="text-gray-700">방문자 대비 실제 구매로 이어진 비율(구매 전환율)</strong>처럼
                방문과 매출을 함께 보는 리포트를 확인할 수 있습니다.
              </p>
            </section>

            {/* 연동 방식 */}
            <section id="flow" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Workflow className="w-5 h-5 text-primary" /></span>
                연동 방식
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3 break-keep">
                연동 방식은 매장에서 사용 중인 POS 시스템에 따라 달라집니다. 일반적으로는 POS에서 나오는 판매 데이터를
                정기적으로 전달받아, CCTV 기반 방문 데이터와 시간·매장 기준으로 맞춰 비교합니다.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed break-keep">
                구체적인 연동 방식(데이터 전달 주기·형식 등)은 POS 시스템의 종류와 연동 가능 여부에 따라 달라
                사전 점검에서 개별적으로 확인합니다.
              </p>
            </section>

            {/* 준비할 정보 */}
            <section id="prepare" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><ClipboardList className="w-5 h-5 text-primary" /></span>
                준비할 정보
              </h2>
              <dl className="divide-y divide-gray-100 border-y border-gray-100">
                {[
                  ['POS 시스템 정보', '사용 중인 POS의 제조사·버전, 매장별로 다른 시스템을 쓰는지 여부.'],
                  ['데이터 형태', '판매 데이터를 어떤 형태(파일, 연동 프로그램 등)로 받을 수 있는지에 대한 정보.'],
                  ['연동 담당자', 'POS 벤더 또는 매장 내 POS 관리 담당자 연락처.'],
                ].map(([term, def]) => (
                  <div key={term} className="grid sm:grid-cols-[8rem_1fr] gap-1 sm:gap-4 py-3">
                    <dt className="text-sm font-medium text-gray-900">{term}</dt>
                    <dd className="text-sm text-gray-600 leading-relaxed break-keep">{def}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* 연동 확인 */}
            <section id="verify" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-primary" /></span>
                연동 확인
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                연동이 끝나면 대시보드의 구매 전환율 리포트에서 방문자 수 대비 매출 데이터가 함께 표시되는지 확인합니다.
                숫자가 이상하게 보인다면 기간·필터를 먼저 확인하고, 그래도 다르다면 담당 매니저에게 문의하세요.
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
                  ['POS 연동 없이도 서비스를 쓸 수 있나요?', '네. POS 연동은 선택 사항이며, 연동하지 않아도 방문·동선 관련 대부분의 리포트를 이용할 수 있습니다.'],
                  ['모든 POS 시스템과 연동할 수 있나요?', '많은 POS 시스템과 연동한 경험이 있지만, 시스템에 따라 연동 가능 여부와 방식이 다를 수 있습니다. 사용 중인 POS를 알려주시면 확인해 드립니다.'],
                  ['매출 데이터도 익명화되나요?', '매출 데이터는 개인을 식별하는 정보가 아니라 판매 건수·금액 등 집계 데이터로 다뤄집니다.'],
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
              <Link href="/resources/docs/cctv-integration" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">← CCTV 연동</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">방문·동선 데이터의 기본이 되는 CCTV 연동을 먼저 확인하세요.</p>
              </Link>
              <Link href="/resources/docs#integration" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">대시보드 접근 →</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">연동 이후 대시보드에 누가, 어떻게 접근할 수 있는지 안내합니다.</p>
              </Link>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-3 px-5 py-5 bg-primary/5 border border-primary/10 rounded-xl">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">사용 중인 POS와 연동이 가능한지 궁금하신가요?</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 break-keep">
                  POS 종류를 알려주시면 연동 가능 여부를 확인해 드립니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/contact" className="btn-primary text-sm">도입 문의</Link>
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
