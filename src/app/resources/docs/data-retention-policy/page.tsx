import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, Database, FileClock, UserCog, Lightbulb, HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '데이터 보관 정책 | DEEPINGSOURCE',
  description:
    'DeepingSource가 어떤 데이터를 얼마나 보관하는지, 원본 영상은 왜 보관되지 않는지, 데이터 삭제를 요청하는 방법을 안내합니다.',
  alternates: { canonical: '/resources/docs/data-retention-policy' },
  openGraph: {
    title: '데이터 보관 정책 | DEEPINGSOURCE',
    description: '어떤 데이터를 얼마나, 왜 보관하는지 안내합니다.',
    url: '/resources/docs/data-retention-policy',
  },
};

type Sub = { id: string; title: string };
type Section = { id: string; icon: typeof BookOpen; title: string; subs: Sub[] };

const sections: Section[] = [
  { id: 'what', icon: Database, title: '무엇을 보관하는가', subs: [{ id: 'what', title: '원본 vs 익명화 데이터' }] },
  { id: 'how-long', icon: FileClock, title: '얼마나 보관하는가', subs: [{ id: 'how-long', title: '보관 기간' }] },
  { id: 'rights', icon: UserCog, title: '삭제 요청', subs: [{ id: 'rights', title: '정보주체의 권리' }] },
  { id: 'faq', icon: HelpCircle, title: 'FAQ', subs: [{ id: 'faq', title: '자주 묻는 질문' }] },
];

export default function DataRetentionPolicyDoc() {
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
                <span className="text-sm font-bold text-gray-900">데이터 보관 정책</span>
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
              데이터 보관 정책
            </h1>
            <p className="text-gray-500 leading-relaxed max-w-2xl mb-12 break-keep">
              어떤 데이터를 얼마나 보관하는지, 그리고 삭제를 요청하는 방법을 안내합니다.
              계약별 세부 보관 기간은 개인정보처리방침과 계약서에 따르며, 정확한 내용은 담당 매니저를 통해 확인할 수 있습니다.
            </p>

            {/* 무엇을 보관하는가 */}
            <section id="what" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Database className="w-5 h-5 text-primary" /></span>
                무엇을 보관하는가
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 break-keep">
                DeepingSource가 다루는 데이터는 크게 두 종류로 나뉩니다. 자세한 익명화 원리는 익명화 동작 원리 문서를 참고하세요.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="card p-5">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">원본 CCTV 영상</h3>
                  <p className="text-xs text-gray-500 leading-relaxed break-keep">익명화 처리 과정에서만 잠시 거치며, <strong className="text-gray-700">DeepingSource 시스템에 저장되지 않습니다.</strong></p>
                </div>
                <div className="card p-5">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">익명화된 행동 데이터</h3>
                  <p className="text-xs text-gray-500 leading-relaxed break-keep">방문·동선·체류시간 등 개인을 식별할 수 없는 형태로 정리된 데이터로, 리포트 제공을 위해 보관됩니다.</p>
                </div>
              </div>
            </section>

            {/* 얼마나 보관하는가 */}
            <section id="how-long" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><FileClock className="w-5 h-5 text-primary" /></span>
                얼마나 보관하는가
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                익명화된 데이터는 기간 비교 리포트(전월 대비, 전년 대비 등)를 제공할 수 있을 만큼 보관됩니다. 구체적인 보관
                기간은 계약 내용과 개인정보처리방침에 따라 달라질 수 있으므로, 정확한 기준은 계약 문서를 확인하거나 담당
                매니저에게 문의해 주세요.
              </p>
            </section>

            {/* 삭제 요청 */}
            <section id="rights" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><UserCog className="w-5 h-5 text-primary" /></span>
                정보주체의 권리
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                개인정보보호법·GDPR 등 관련 법령에 따라 정보주체는 자신과 관련된 정보의 열람, 정정·삭제, 처리 정지를
                요구할 권리를 가집니다. 다만 DeepingSource가 보관하는 데이터는 익명화되어 특정 개인을 식별할 수 없는
                형태이므로, 개별 방문자를 특정해 정보를 조회·삭제하는 것은 구조적으로 어려울 수 있습니다. 관련 문의는
                아래 연락처로 접수해 주세요.
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
                  ['계약이 끝나면 데이터는 어떻게 되나요?', '계약 종료에 따른 데이터 처리(삭제·반환 등)는 계약서에 명시된 조건에 따릅니다. 정확한 절차는 담당 매니저에게 문의하세요.'],
                  ['보관 기간을 우리 회사 정책에 맞게 조정할 수 있나요?', '계약 조건에 따라 협의할 수 있는 부분입니다. 도입 논의 시 요구사항을 알려주세요.'],
                  ['익명화된 데이터도 개인정보로 취급되나요?', '개인을 식별할 수 없는 형태로 처리되지만, 정확한 법적 분류는 관할 법령과 처리 방식에 따라 달라질 수 있습니다. 자세한 내용은 개인정보처리방침을 참고하세요.'],
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
              <Link href="/resources/docs/how-anonymization-works" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">← 익명화 동작 원리</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">원본 영상이 왜 보관되지 않는지 원리부터 확인하세요.</p>
              </Link>
              <Link href="/resources/docs#privacy" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">접근 권한 관리 →</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">누가 어떤 데이터에 접근할 수 있는지 안내합니다.</p>
              </Link>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-3 px-5 py-5 bg-primary/5 border border-primary/10 rounded-xl">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">보관 기간·삭제 관련 문의가 있으신가요?</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 break-keep">
                  계약별 정확한 보관 기간과 삭제 절차는 담당 매니저를 통해 확인하실 수 있습니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/contact" className="btn-primary text-sm">문의하기</Link>
                  <Link href="/legal/privacy" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-xl hover:border-primary-light transition-colors">개인정보처리방침 보기</Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
