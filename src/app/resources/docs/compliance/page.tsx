import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, Globe2, ShieldCheck, FileCheck2, Lightbulb, HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '컴플라이언스 | DEEPINGSOURCE',
  description:
    'DeepingSource의 익명화 우선 접근 방식이 GDPR·CCPA·개인정보보호법 등 지역별 규제와 어떻게 연결되는지 안내합니다.',
  alternates: { canonical: '/resources/docs/compliance' },
  openGraph: {
    title: '컴플라이언스 | DEEPINGSOURCE',
    description: '익명화 우선 접근 방식이 지역별 규제와 어떻게 연결되는지 안내합니다.',
    url: '/resources/docs/compliance',
  },
};

type Sub = { id: string; title: string };
type Section = { id: string; icon: typeof BookOpen; title: string; subs: Sub[] };

const sections: Section[] = [
  { id: 'about', icon: BookOpen, title: '개요', subs: [{ id: 'about', title: '접근 방식' }] },
  { id: 'regions', icon: Globe2, title: '지역별 규제', subs: [{ id: 'regions', title: 'GDPR · CCPA · PIPA' }] },
  { id: 'approach', icon: ShieldCheck, title: '우리의 접근', subs: [{ id: 'approach', title: '익명화가 규제 위험을 줄이는 방식' }] },
  { id: 'docs', icon: FileCheck2, title: '검토 자료', subs: [{ id: 'docs', title: '법무·보안 검토가 필요하다면' }] },
  { id: 'faq', icon: HelpCircle, title: 'FAQ', subs: [{ id: 'faq', title: '자주 묻는 질문' }] },
];

const regions = [
  ['EU', 'GDPR', '유럽 일반 개인정보보호법(General Data Protection Regulation).'],
  ['US', 'CCPA', '캘리포니아 소비자 개인정보보호법(California Consumer Privacy Act).'],
  ['KR', 'PIPA', '한국 개인정보보호법.'],
];

export default function ComplianceDoc() {
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
                <span className="text-sm font-bold text-gray-900">컴플라이언스</span>
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
              컴플라이언스
            </h1>
            <p className="text-gray-500 leading-relaxed max-w-2xl mb-12 break-keep">
              DeepingSource의 익명화 우선 접근 방식이 주요 지역의 개인정보 규제와 어떻게 연결되는지 안내합니다.
              이 문서는 참고용 정보이며, 법적 판단이 필요한 사안은 반드시 자체 법무팀 검토를 거치시기 바랍니다.
            </p>

            {/* 개요 */}
            <section id="about" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-primary" /></span>
                접근 방식
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                비전 AI는 결국 사람을 보고, 사람을 보는 순간 그 정보는 개인정보 규제의 대상이 됩니다. DeepingSource는
                CCTV 영상이 입력되는 시점에 신원을 지우는 방식으로 이 문제에 접근합니다 — 자세한 원리는 익명화 동작
                원리 문서에서 다룹니다.
              </p>
            </section>

            {/* 지역별 규제 */}
            <section id="regions" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Globe2 className="w-5 h-5 text-primary" /></span>
                지역별 규제
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 break-keep">
                매장 CCTV 영상 분석과 관련이 깊은 대표적인 규제는 다음과 같습니다.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {regions.map(([region, law, desc]) => (
                  <div key={law} className="card p-5">
                    <p className="text-2xs font-bold text-primary uppercase tracking-wider mb-1">{region}</p>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">{law}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed break-keep">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 우리의 접근 */}
            <section id="approach" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><ShieldCheck className="w-5 h-5 text-primary" /></span>
                익명화가 규제 위험을 줄이는 방식
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                위 규제들은 대부분 개인을 식별할 수 있는 정보를 어떻게 수집·보관·이용하는지를 다룹니다. DeepingSource는
                입력 시점에 신원을 제거하고 원본 영상을 보관하지 않기 때문에, 애초에 개인 식별 정보 자체가 쌓이지 않도록
                설계되어 있습니다. 다만 최종적인 법적 준수 여부는 매장이 위치한 지역, 데이터 처리 방식, 계약 조건에 따라
                달라질 수 있으므로, 구체적인 판단은 자체 법무팀과 함께 확인하시길 권장합니다.
              </p>
            </section>

            {/* 검토 자료 */}
            <section id="docs" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><FileCheck2 className="w-5 h-5 text-primary" /></span>
                법무·보안 검토가 필요하다면
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                내부 법무·보안 검토를 위해 개인정보처리방침, 계약서, 데이터 처리 흐름에 대한 추가 자료가 필요하시면
                담당 매니저에게 요청해 주세요. 필요한 인증·문서 형식이 있다면 미리 알려주시면 확인해 드립니다.
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
                  ['CCTV 안내판 등 별도 고지 의무는 없어지나요?', '아니요. 매장 내 CCTV 운영 자체에 대한 안내·고지 의무는 별도로 존재할 수 있습니다. 지역 법령에 따른 의무는 자체적으로 확인해 주세요.'],
                  ['해외 매장에도 동일하게 적용되나요?', '익명화 원칙은 동일하게 적용되지만, 지역별로 요구되는 세부 절차나 고지 의무는 다를 수 있습니다.'],
                  ['개인정보 영향평가(DPIA) 자료를 받을 수 있나요?', '필요하신 자료 종류를 담당 매니저에게 알려주시면 제공 가능 여부를 확인해 드립니다.'],
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
              <Link href="/resources/docs/access-control" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">← 접근 권한 관리</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">누가 어떤 데이터에 접근할 수 있는지 확인하세요.</p>
              </Link>
              <Link href="/legal/privacy" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">개인정보처리방침 →</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">DeepingSource의 개인정보 처리 방침 전문입니다.</p>
              </Link>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-3 px-5 py-5 bg-primary/5 border border-primary/10 rounded-xl">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">법무·보안팀 검토 자료가 필요하신가요?</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 break-keep">
                  필요한 자료 종류와 목적을 알려주시면 담당 매니저가 안내해 드립니다.
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
