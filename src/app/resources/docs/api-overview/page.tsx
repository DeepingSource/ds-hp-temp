import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, Code2, Compass, MessageCircle, Lightbulb, HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'API 개요 | DEEPINGSOURCE',
  description:
    'DeepingSource 공개 API 현황과 데이터 연동이 필요할 때 확인할 수 있는 방법을 안내합니다.',
  alternates: { canonical: '/resources/docs/api-overview' },
  openGraph: {
    title: 'API 개요 | DEEPINGSOURCE',
    description: '공개 API 현황과 데이터 연동 문의 방법을 안내합니다.',
    url: '/resources/docs/api-overview',
  },
};

type Sub = { id: string; title: string };
type Section = { id: string; icon: typeof BookOpen; title: string; subs: Sub[] };

const sections: Section[] = [
  { id: 'status', icon: BookOpen, title: '현재 상태', subs: [{ id: 'status', title: '공개 API 준비 중' }] },
  { id: 'now', icon: Compass, title: '지금은 이렇게', subs: [{ id: 'now', title: '대시보드로 확인' }] },
  { id: 'planned', icon: Code2, title: '예정 범위', subs: [{ id: 'planned', title: '앞으로 다룰 내용(예정)' }] },
  { id: 'contact', icon: MessageCircle, title: '데이터 연동 문의', subs: [{ id: 'contact', title: '커스텀 연동이 필요하다면' }] },
  { id: 'faq', icon: HelpCircle, title: 'FAQ', subs: [{ id: 'faq', title: '자주 묻는 질문' }] },
];

export default function ApiOverviewDoc() {
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
                <span className="text-sm font-bold text-gray-900">API 개요</span>
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
              API 개요
            </h1>
            <p className="text-gray-500 leading-relaxed max-w-2xl mb-12 break-keep">
              공개 API 현황과, 데이터 연동이 필요할 때 지금 확인할 수 있는 방법을 안내합니다.
            </p>

            {/* 현재 상태 */}
            <section id="status" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-primary" /></span>
                공개 API 준비 중
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                현재 DeepingSource는 <strong className="text-gray-700">외부에 공개된 API를 별도로 제공하고 있지 않습니다.</strong> 리포트
                데이터 조회 등을 API 형태로 여는 것은 로드맵에 있는 항목으로, 준비되는 대로 이 문서에 구체적인 엔드포인트와
                인증 방식을 안내할 예정입니다.
              </p>
            </section>

            {/* 지금은 이렇게 */}
            <section id="now" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Compass className="w-5 h-5 text-primary" /></span>
                지금은 이렇게
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                지금은 대시보드에 로그인해 리포트를 직접 확인하는 것이 기본적인 방법입니다. 매출 데이터를 함께 보고 싶다면
                POS 연동을, 여러 담당자가 함께 접근해야 한다면 대시보드 접근 문서를 참고하세요.
              </p>
            </section>

            {/* 예정 범위 */}
            <section id="planned" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Code2 className="w-5 h-5 text-primary" /></span>
                앞으로 다룰 내용(예정)
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                공개 API가 준비되면 이 문서에서 리포트 데이터 조회처럼 대시보드에서 확인하는 지표를 프로그램으로 가져오는
                방법을 중심으로 다룰 계획입니다. 정확한 범위와 일정은 아직 확정되지 않았습니다.
              </p>
            </section>

            {/* 데이터 연동 문의 */}
            <section id="contact" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><MessageCircle className="w-5 h-5 text-primary" /></span>
                데이터 연동 문의
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                사내 시스템에 리포트 데이터를 연동해야 하는 등 API가 필요한 상황이라면, 담당 매니저에게 요구사항을
                알려주세요. 공개 API 출시 전이라도 상황에 따라 별도로 연동 방법을 논의할 수 있습니다.
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
                  ['API 출시 일정이 있나요?', '아직 확정된 일정은 없습니다. 준비되는 대로 이 문서와 공지를 통해 안내해 드립니다.'],
                  ['API가 없는데 데이터를 자동으로 가져올 방법이 있나요?', '상황에 따라 담당 매니저와 별도 연동 방법을 논의할 수 있습니다. 필요하신 데이터와 용도를 문의해 주세요.'],
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
              <Link href="/resources/docs/dashboard-access" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">← 대시보드 접근</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">지금은 대시보드를 통해 리포트를 확인합니다.</p>
              </Link>
              <Link href="/resources/docs#privacy" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">익명화 동작 원리 →</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">데이터가 어떻게 처리되는지 더 자세히 알아보세요.</p>
              </Link>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-3 px-5 py-5 bg-primary/5 border border-primary/10 rounded-xl">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">데이터 연동이 필요하신가요?</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 break-keep">
                  필요하신 데이터와 용도를 알려주시면 현재 가능한 연동 방법을 안내해 드립니다.
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
