import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, SlidersHorizontal, UserCheck, ShieldAlert, Lightbulb, HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '접근 권한 관리 | DEEPINGSOURCE',
  description:
    '대시보드 접근 권한을 누구에게, 어느 범위까지 부여할지 설계하는 원칙과 관리자의 책임, 보안 권장 사항을 안내합니다.',
  alternates: { canonical: '/resources/docs/access-control' },
  openGraph: {
    title: '접근 권한 관리 | DEEPINGSOURCE',
    description: '대시보드 접근 권한 설계 원칙과 관리자의 책임을 안내합니다.',
    url: '/resources/docs/access-control',
  },
};

type Sub = { id: string; title: string };
type Section = { id: string; icon: typeof BookOpen; title: string; subs: Sub[] };

const sections: Section[] = [
  { id: 'principle', icon: BookOpen, title: '기본 원칙', subs: [{ id: 'principle', title: '필요한 만큼만' }] },
  { id: 'scope', icon: SlidersHorizontal, title: '접근 범위 설정', subs: [{ id: 'scope', title: '매장·역할별 구분' }] },
  { id: 'admin', icon: UserCheck, title: '관리자의 책임', subs: [{ id: 'admin', title: '계정 관리' }] },
  { id: 'practices', icon: ShieldAlert, title: '보안 권장 사항', subs: [{ id: 'practices', title: '계정 사용 원칙' }] },
  { id: 'faq', icon: HelpCircle, title: 'FAQ', subs: [{ id: 'faq', title: '자주 묻는 질문' }] },
];

export default function AccessControlDoc() {
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
                <span className="text-sm font-bold text-gray-900">접근 권한 관리</span>
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
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">Docs · Privacy & Security</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              접근 권한 관리
            </h1>
            <p className="text-gray-500 leading-relaxed max-w-2xl mb-12 break-keep">
              대시보드에 누가, 어느 범위까지 접근할 수 있는지 설계하는 원칙을 안내합니다.
              계정을 발급받고 로그인하는 기본적인 방법은 대시보드 접근 문서를 참고하세요.
            </p>

            {/* 기본 원칙 */}
            <section id="principle" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-primary" /></span>
                필요한 만큼만
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                접근 권한은 <strong className="text-gray-700">업무에 필요한 범위만큼만</strong> 부여하는 것을 원칙으로 합니다.
                본사 담당자는 여러 매장을 함께 봐야 할 수 있고, 매장 담당자는 소속 매장만 보면 충분한 경우가 많습니다.
                조직 구조에 맞는 접근 범위는 도입 시 함께 설계합니다.
              </p>
            </section>

            {/* 접근 범위 설정 */}
            <section id="scope" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><SlidersHorizontal className="w-5 h-5 text-primary" /></span>
                접근 범위 설정
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-600 break-keep list-disc list-inside marker:text-primary">
                <li><strong className="text-gray-700">매장 단위</strong> — 계정마다 조회 가능한 매장(들)을 지정할 수 있습니다.</li>
                <li><strong className="text-gray-700">역할 단위</strong> — 팀원의 업무 범위에 맞춰 접근 가능한 매장이나 리포트 범위를 다르게 구성할 수 있습니다.</li>
                <li>세부 설정 방법이나 지원 범위는 계약·제품 구성에 따라 다를 수 있어, 정확한 내용은 담당 매니저를 통해 확인하는 것을 권장합니다.</li>
              </ul>
            </section>

            {/* 관리자의 책임 */}
            <section id="admin" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><UserCheck className="w-5 h-5 text-primary" /></span>
                관리자의 책임
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-600 break-keep list-disc list-inside marker:text-primary">
                <li>새로운 팀원의 계정 발급과, 퇴사·인사이동 시 계정 비활성화를 관리합니다.</li>
                <li>필요 이상으로 넓은 권한이 부여된 계정이 없는지 주기적으로 점검하는 것을 권장합니다.</li>
                <li>계정 관련 이상 징후(비정상적인 로그인 시도 등)를 발견하면 담당 매니저에게 알려주세요.</li>
              </ul>
            </section>

            {/* 보안 권장 사항 */}
            <section id="practices" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><ShieldAlert className="w-5 h-5 text-primary" /></span>
                보안 권장 사항
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-600 break-keep list-disc list-inside marker:text-primary">
                <li>계정을 여러 사람이 공유하지 말고, 개인별로 발급받아 사용하는 것을 권장합니다.</li>
                <li>비밀번호는 다른 서비스와 다르게, 유추하기 어렵게 설정하세요.</li>
                <li>공용 PC에서 로그인했다면 사용 후 반드시 로그아웃하세요.</li>
                <li>퇴사·역할 변경이 있으면 지체 없이 관리자에게 알려 계정을 정리해 주세요.</li>
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
                  ['매장별로 접근 범위를 다르게 설정할 수 있나요?', '네. 계정마다 조회 가능한 매장을 다르게 구성할 수 있습니다. 필요한 구성을 담당 매니저에게 요청하세요.'],
                  ['외부 협력사(대행사 등)에도 계정을 줄 수 있나요?', '필요한 범위로 제한한 계정을 발급하는 방식으로 가능한 경우가 많습니다. 목적과 필요한 범위를 알려주시면 안내해 드립니다.'],
                  ['접근 기록을 확인할 수 있나요?', '계정별 접근 기록 제공 여부는 제품 구성에 따라 다를 수 있습니다. 필요하시면 담당 매니저에게 문의해 주세요.'],
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
                <p className="text-xs text-gray-500 leading-relaxed break-keep">계정을 처음 발급받고 로그인하는 방법입니다.</p>
              </Link>
              <Link href="/resources/docs#privacy" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">컴플라이언스 →</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">지역별 개인정보 규제와의 관계를 안내합니다.</p>
              </Link>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-3 px-5 py-5 bg-primary/5 border border-primary/10 rounded-xl">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">우리 조직에 맞는 권한 구조가 궁금하신가요?</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 break-keep">
                  조직 구조와 필요한 접근 범위를 알려주시면 적절한 계정 구성을 제안해 드립니다.
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
