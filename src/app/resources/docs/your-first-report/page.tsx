import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, Database, ListChecks, Eye, AlertCircle, Lightbulb, HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '첫 리포트 받기 | DEEPINGSOURCE',
  description:
    '설치 후 데이터 수집이 시작되고 첫 리포트를 확인하기까지의 과정, 첫 리포트에서 무엇을 봐야 하는지 안내합니다.',
  alternates: { canonical: '/resources/docs/your-first-report' },
  openGraph: {
    title: '첫 리포트 받기 | DEEPINGSOURCE',
    description: '설치 후 첫 리포트를 확인하기까지의 과정을 안내합니다.',
    url: '/resources/docs/your-first-report',
  },
};

type Sub = { id: string; title: string };
type Section = { id: string; icon: typeof BookOpen; title: string; subs: Sub[] };

const sections: Section[] = [
  { id: 'about', icon: BookOpen, title: '개요', subs: [{ id: 'about', title: '설치 이후 흐름' }] },
  { id: 'collecting', icon: Database, title: '데이터 수집', subs: [{ id: 'collecting', title: '수집이 시작되는 시점' }] },
  { id: 'checking', icon: ListChecks, title: '리포트 확인하는 법', subs: [{ id: 'checking', title: '로그인부터 확인까지' }] },
  { id: 'what-to-look', icon: Eye, title: '무엇을 봐야 하는가', subs: [{ id: 'what-to-look', title: '첫 리포트 읽기' }] },
  { id: 'empty', icon: AlertCircle, title: '데이터가 비어 보인다면', subs: [{ id: 'empty', title: '점검 순서' }] },
  { id: 'faq', icon: HelpCircle, title: 'FAQ', subs: [{ id: 'faq', title: '자주 묻는 질문' }] },
];

const lookFor = [
  ['방문자 분석', '방문자 수와 성별/연령 추정, 체류시간으로 매장의 기본 활력을 확인합니다.'],
  ['라인 분석', '입구 등에 설정한 라인을 기준으로 통행객·방문자 수와 입점률을 확인합니다.'],
  ['구역별 분석', '매대·코너별 방문자 유입과 체류시간을 비교해 어느 공간이 반응이 좋은지 봅니다.'],
  ['히트맵', '이동·체류가 몰리는 영역을 색으로 확인해 매장 전체 흐름을 한눈에 파악합니다.'],
];

export default function YourFirstReportDoc() {
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
                <span className="text-sm font-bold text-gray-900">첫 리포트 받기</span>
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
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">Docs · Getting Started</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              첫 리포트 받기
            </h1>
            <p className="text-gray-500 leading-relaxed max-w-2xl mb-12 break-keep">
              설치가 끝난 뒤 데이터가 쌓이고 첫 리포트를 확인하기까지의 과정을 안내합니다.
              대시보드 리포트 전체를 자세히 읽는 법은 제품별 사용자 매뉴얼에서 다룹니다.
            </p>

            {/* 개요 */}
            <section id="about" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-primary" /></span>
                설치 이후 흐름
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                도입 절차의 설치·계정 발급 단계가 끝나면, 별도 조작 없이 매장 CCTV 영상을 기반으로 데이터 수집이 자동으로 시작됩니다.
                수집된 데이터가 리포트로 정리되기까지 다소 시간이 걸리며, 정확한 시점은 대시보드 교육 시 담당 매니저가 안내해 드립니다.
              </p>
            </section>

            {/* 데이터 수집 */}
            <section id="collecting" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Database className="w-5 h-5 text-primary" /></span>
                데이터 수집
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                설치가 완료되면 매장 영업 중 발생하는 방문·동선 데이터가 익명화된 상태로 계속 쌓입니다. 리포트는 이 데이터를 바탕으로
                계산되므로, 영업일 기준으로 데이터가 어느 정도 쌓인 뒤에 확인하는 것이 가장 정확합니다. 특정 요일·시간대의 특징을 보려면
                그만큼 더 여러 날의 데이터가 필요할 수 있습니다.
              </p>
            </section>

            {/* 리포트 확인하는 법 */}
            <section id="checking" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><ListChecks className="w-5 h-5 text-primary" /></span>
                리포트 확인하는 법
              </h2>
              <ol className="list-decimal list-inside space-y-1.5 text-sm text-gray-600 marker:text-primary marker:font-bold">
                <li>발급받은 접속 주소로 이동해 아이디·비밀번호로 로그인합니다.</li>
                <li>좌측 리포트 메뉴에서 &ldquo;매장 현황&rdquo;을 선택합니다 — 방문자 수·체류시간 등 가장 기본적인 지표부터 확인할 수 있습니다.</li>
                <li>상단의 기간 선택으로 데이터가 쌓인 날짜 범위를 지정합니다. 설치 직후라면 우선 짧은 기간부터 확인해 보세요.</li>
              </ol>
            </section>

            {/* 무엇을 봐야 하는가 */}
            <section id="what-to-look" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Eye className="w-5 h-5 text-primary" /></span>
                무엇을 봐야 하는가
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 break-keep">
                처음에는 아래 네 가지부터 확인하는 것을 추천합니다. 전체 리포트 구성과 각 지표의 자세한 의미는 store insight 사용자
                매뉴얼에서 다룹니다.
              </p>
              <dl className="divide-y divide-gray-100 border-y border-gray-100">
                {lookFor.map(([term, def]) => (
                  <div key={term} className="grid sm:grid-cols-[8rem_1fr] gap-1 sm:gap-4 py-3">
                    <dt className="text-sm font-medium text-gray-900">{term}</dt>
                    <dd className="text-sm text-gray-600 leading-relaxed break-keep">{def}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* 데이터가 비어 보인다면 */}
            <section id="empty" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><AlertCircle className="w-5 h-5 text-primary" /></span>
                데이터가 비어 보인다면
              </h2>
              <ol className="list-decimal list-inside space-y-1.5 text-sm text-gray-600 marker:text-primary marker:font-bold">
                <li>상단의 기간 선택이 실제로 데이터가 쌓인 날짜와 겹치는지 확인합니다.</li>
                <li>요일·시간대 등 필터가 걸려 있다면 해제하고 다시 확인합니다.</li>
                <li>그래도 비어 있다면 설치·연동 상태에 문제가 있을 수 있으니 담당 매니저에게 문의합니다.</li>
              </ol>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><HelpCircle className="w-5 h-5 text-primary" /></span>
                자주 묻는 질문
              </h2>
              <div className="space-y-3">
                {[
                  ['첫 리포트는 언제 확인할 수 있나요?', '설치 완료 후 영업일 기준으로 데이터가 쌓이는 대로 확인할 수 있습니다. 정확한 시점은 대시보드 교육 때 안내받으실 수 있습니다.'],
                  ['특정 기간만 이상하게 비어 있어요.', '휴무일이거나 카메라·네트워크에 일시적인 문제가 있었을 수 있습니다. 반복된다면 담당 매니저에게 문의하세요.'],
                  ['설치 전 데이터도 볼 수 있나요?', '아니요. 리포트는 익명화 분석이 시작된 시점 이후의 데이터만 다룹니다.'],
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
              <Link href="/resources/docs/environment-requirements" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">← 환경 요구사항</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">데이터가 잘 쌓이지 않는다면 환경 조건부터 다시 확인해 보세요.</p>
              </Link>
              <Link href="/resources/docs/store-insight" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">store insight 사용자 매뉴얼 →</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">리포트 전체를 처음부터 자세히 읽는 법을 안내합니다.</p>
              </Link>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-3 px-5 py-5 bg-primary/5 border border-primary/10 rounded-xl">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">첫 리포트가 예상과 다른가요?</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 break-keep">
                  화면을 캡처해 문의해 주시면 원인을 함께 확인해 드립니다.
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
