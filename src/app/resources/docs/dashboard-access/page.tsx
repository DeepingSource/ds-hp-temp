import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, KeyRound, LogIn, Users, RotateCcw, Lightbulb, HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '대시보드 접근 | DEEPINGSOURCE',
  description:
    'DeepingSource 대시보드 계정을 발급받고, 로그인하고, 팀원을 추가하고, 비밀번호를 재설정하는 방법을 안내합니다.',
  alternates: { canonical: '/resources/docs/dashboard-access' },
  openGraph: {
    title: '대시보드 접근 | DEEPINGSOURCE',
    description: '대시보드 계정 발급부터 로그인, 팀원 추가까지 안내합니다.',
    url: '/resources/docs/dashboard-access',
  },
};

type Sub = { id: string; title: string };
type Section = { id: string; icon: typeof BookOpen; title: string; subs: Sub[] };

const sections: Section[] = [
  { id: 'about', icon: BookOpen, title: '개요', subs: [{ id: 'about', title: '계정 구조' }] },
  { id: 'getting', icon: KeyRound, title: '계정 받기', subs: [{ id: 'getting', title: '최초 발급' }] },
  { id: 'login', icon: LogIn, title: '로그인', subs: [{ id: 'login', title: '접속 방법' }] },
  { id: 'team', icon: Users, title: '팀원 추가', subs: [{ id: 'team', title: '여러 사람이 함께 쓰려면' }] },
  { id: 'reset', icon: RotateCcw, title: '비밀번호 재설정', subs: [{ id: 'reset', title: '잊어버렸을 때' }] },
  { id: 'faq', icon: HelpCircle, title: 'FAQ', subs: [{ id: 'faq', title: '자주 묻는 질문' }] },
];

export default function DashboardAccessDoc() {
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
                <span className="text-sm font-bold text-gray-900">대시보드 접근</span>
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
              대시보드 접근
            </h1>
            <p className="text-gray-500 leading-relaxed max-w-2xl mb-12 break-keep">
              대시보드 계정을 발급받고, 로그인하고, 팀원을 추가하는 방법을 안내합니다.
              권한 범위와 데이터 접근 정책은 접근 권한 관리 문서에서 더 자세히 다룹니다.
            </p>

            {/* 개요 */}
            <section id="about" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-primary" /></span>
                계정 구조
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                대시보드는 <strong className="text-gray-700">매장 단위 또는 본사(다매장) 단위</strong>로 계정이 발급됩니다.
                본사 계정은 여러 매장의 리포트를 함께 조회할 수 있고, 매장 계정은 해당 매장의 데이터만 확인할 수 있도록
                구성하는 것이 일반적입니다. 구체적인 구성은 도입 시 논의된 계약·조직 구조에 따라 달라질 수 있습니다.
              </p>
            </section>

            {/* 계정 받기 */}
            <section id="getting" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><KeyRound className="w-5 h-5 text-primary" /></span>
                계정 받기
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                도입 절차의 계정 발급 단계에서 매장·본사별 접속 주소(URL)와 최초 관리자 계정(아이디·비밀번호)이 발급됩니다.
                이후 추가로 필요한 계정은 최초 관리자를 통해 요청할 수 있습니다.
              </p>
            </section>

            {/* 로그인 */}
            <section id="login" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><LogIn className="w-5 h-5 text-primary" /></span>
                로그인
              </h2>
              <ol className="list-decimal list-inside space-y-1.5 text-sm text-gray-600 marker:text-primary marker:font-bold">
                <li>발급받은 접속 주소로 이동합니다.</li>
                <li>아이디와 비밀번호를 입력합니다.</li>
                <li>로그인하면 권한 범위에 맞는 매장(또는 여러 매장)의 대시보드로 진입합니다.</li>
              </ol>
            </section>

            {/* 팀원 추가 */}
            <section id="team" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Users className="w-5 h-5 text-primary" /></span>
                팀원 추가
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                매장·본사에서 여러 명이 대시보드를 함께 사용해야 한다면, 최초 발급받은 관리자 계정을 통해 팀원 계정 추가를
                요청할 수 있습니다. 팀원별로 조회 가능한 매장 범위를 다르게 설정할 수도 있습니다 — 세부 권한 설계는
                접근 권한 관리 문서를 참고하세요.
              </p>
            </section>

            {/* 비밀번호 재설정 */}
            <section id="reset" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><RotateCcw className="w-5 h-5 text-primary" /></span>
                비밀번호 재설정
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                비밀번호를 잊어버렸다면 담당 관리자 또는 DeepingSource 담당 매니저에게 문의해 재설정을 요청하세요.
                로그인이 안 될 때는 먼저 아이디·비밀번호가 정확한지, Caps Lock이 켜져 있지 않은지 확인하고, 그래도
                안 되면 브라우저 캐시를 비운 뒤 다시 시도해 보세요.
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
                  ['본사 계정과 매장 계정의 차이는 무엇인가요?', '본사 계정은 여러 매장의 리포트를 함께 조회할 수 있고, 매장 계정은 해당 매장 데이터만 볼 수 있도록 구성하는 것이 일반적입니다.'],
                  ['퇴사자·인사이동 시 계정은 어떻게 하나요?', '담당 관리자를 통해 계정을 비활성화하거나 접근 범위를 조정할 수 있습니다.'],
                  ['접속 주소를 모르겠어요.', '접속 주소(URL)와 계정은 매장·본사별로 관리자가 발급합니다. 담당 관리자에게 문의하세요.'],
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
              <Link href="/resources/docs/pos-integration" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">← POS 연동</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">매출 데이터를 함께 보고 싶다면 확인하세요.</p>
              </Link>
              <Link href="/resources/docs#integration" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">API 개요 →</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">직접 데이터를 연동하고 싶다면 API 문서를 확인하세요.</p>
              </Link>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-3 px-5 py-5 bg-primary/5 border border-primary/10 rounded-xl">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">계정 관련 문의가 있으신가요?</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 break-keep">
                  계정 추가·재설정 등 계정 관련 요청은 담당 매니저에게 연락해 주세요.
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
