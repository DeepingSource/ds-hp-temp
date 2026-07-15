import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, EyeOff, ShieldCheck, Route, Scale, Lightbulb, HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '익명화 동작 원리 | DEEPINGSOURCE',
  description:
    'DeepingSource가 CCTV 영상을 어떻게 실시간으로 익명화하고, 그 위에서 어떻게 분석이 이루어지는지 원리를 설명합니다.',
  alternates: { canonical: '/resources/docs/how-anonymization-works' },
  openGraph: {
    title: '익명화 동작 원리 | DEEPINGSOURCE',
    description: 'CCTV 영상을 실시간으로 익명화하는 원리를 설명합니다.',
    url: '/resources/docs/how-anonymization-works',
  },
};

type Sub = { id: string; title: string };
type Section = { id: string; icon: typeof BookOpen; title: string; subs: Sub[] };

const sections: Section[] = [
  { id: 'principle', icon: BookOpen, title: '원칙', subs: [{ id: 'principle', title: '읽기 전에 지운다' }] },
  { id: 'before-after', icon: Scale, title: '왜 필요한가', subs: [{ id: 'before-after', title: '원본을 그대로 두면' }] },
  { id: 'how', icon: EyeOff, title: '어떻게 지우는가', subs: [{ id: 'how', title: '3가지 원칙' }] },
  { id: 'after', icon: Route, title: '익명화 위의 분석', subs: [{ id: 'after', title: 'Spatial AI가 읽는 것' }] },
  { id: 'compliance', icon: ShieldCheck, title: '규제 대응', subs: [{ id: 'compliance', title: '왜 안전한가' }] },
  { id: 'faq', icon: HelpCircle, title: 'FAQ', subs: [{ id: 'faq', title: '자주 묻는 질문' }] },
];

const howItems = [
  ['입력 시점 익명화', '영상이 들어오는 순간, 읽기 전에 신원을 지웁니다. 그 이후의 모든 분석은 익명화된 데이터 위에서만 이루어집니다.'],
  ['동의 없이도 보호', '한 화면에 여러 사람이 함께 있어도 동시에 익명화됩니다. 개별 동의 절차 없이도 매장을 지나는 모든 사람이 보호됩니다.'],
  ['원본 미보존', '익명화 이전의 원본 영상은 시스템 어디에도 저장되지 않습니다.'],
];

export default function HowAnonymizationWorksDoc() {
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
                <span className="text-sm font-bold text-gray-900">익명화 동작 원리</span>
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
              익명화 동작 원리
            </h1>
            <p className="text-gray-500 leading-relaxed max-w-2xl mb-12 break-keep">
              CCTV 영상을 실시간으로 익명화하고, 그 위에서 어떻게 분석이 이루어지는지 설명합니다.
              기술적 배경은 기술 소개 페이지의 Anonymizer 섹션에서도 확인할 수 있습니다.
            </p>

            {/* 원칙 */}
            <section id="principle" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-primary" /></span>
                읽기 전에 지운다
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                비전 AI는 결국 사람을 봅니다. 사람을 보는 순간 그 정보는 개인정보가 되고, GDPR·CCPA·한국 개인정보보호법 같은
                규제의 대상이 됩니다. DeepingSource는 이 문제를 <strong className="text-gray-700">입력 시점에 신원을 지우는 것</strong>으로
                해결합니다. 모든 분석은 익명화된 데이터 위에서만 시작됩니다.
              </p>
            </section>

            {/* 왜 필요한가 */}
            <section id="before-after" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Scale className="w-5 h-5 text-primary" /></span>
                원본을 그대로 두면
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="card p-5 border-red-100 bg-red-50/30">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">원본을 그대로 둘 경우</h3>
                  <ul className="space-y-1.5 text-xs text-gray-600 break-keep list-disc list-inside marker:text-red-400">
                    <li>얼굴과 신원이 원본 영상에 그대로 남습니다.</li>
                    <li>동의 없이 다수의 사람이 노출됩니다.</li>
                    <li>보관 기간이 길어질수록 규제 리스크가 커집니다.</li>
                    <li>결국 분석을 포기하거나, 원본을 계속 떠안게 됩니다.</li>
                  </ul>
                </div>
                <div className="card p-5 border-primary/20 bg-primary/5">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">익명화를 적용할 경우</h3>
                  <ul className="space-y-1.5 text-xs text-gray-600 break-keep list-disc list-inside marker:text-primary">
                    <li>입력 시점에 신원이 제거됩니다.</li>
                    <li>동의 절차 없이도 다수를 동시에 보호합니다.</li>
                    <li>원본은 보관되지 않습니다.</li>
                    <li>분석에 필요한 움직임 정보는 원본 품질로 유지됩니다.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 어떻게 지우는가 */}
            <section id="how" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><EyeOff className="w-5 h-5 text-primary" /></span>
                어떻게 지우는가
              </h2>
              <dl className="divide-y divide-gray-100 border-y border-gray-100">
                {howItems.map(([term, def]) => (
                  <div key={term} className="grid sm:grid-cols-[10rem_1fr] gap-1 sm:gap-4 py-3">
                    <dt className="text-sm font-medium text-gray-900">{term}</dt>
                    <dd className="text-sm text-gray-600 leading-relaxed break-keep">{def}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* 익명화 위의 분석 */}
            <section id="after" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Route className="w-5 h-5 text-primary" /></span>
                익명화 위의 분석
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                익명화 이후에는 <strong className="text-gray-700">&ldquo;누구인지&rdquo;가 아니라 &ldquo;무엇을 어떻게&rdquo;</strong>를 봅니다.
                검출·자세·군중 밀도 같은 행동 정보를 하나의 영상에서 읽고, 여러 대의 카메라에 흩어진 정보를 하나의 매장 공간으로
                정합해 카메라가 바뀌어도 같은 사람의 동선을 익명 상태 그대로 이어서 추적합니다. 이 과정 전체에서 신원이 다시
                복원되는 단계는 없습니다.
              </p>
            </section>

            {/* 규제 대응 */}
            <section id="compliance" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><ShieldCheck className="w-5 h-5 text-primary" /></span>
                왜 안전한가
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                개인 식별이 가능한 정보 자체가 만들어지지 않기 때문에, GDPR(EU)·CCPA(미국 캘리포니아)·개인정보보호법(한국) 등
                주요 규제가 다루는 위험을 원천적으로 줄입니다. 지역별 규제와의 관계는 컴플라이언스 문서에서 더 자세히 다룹니다.
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
                  ['익명화 이전 원본을 나중에 다시 볼 수 있나요?', '아니요. 원본은 익명화 과정에서 저장되지 않으므로 이후에 복원해서 볼 수 없습니다.'],
                  ['익명화된 상태에서도 같은 사람을 계속 추적할 수 있나요?', '네. 신원을 알지 못하는 상태에서도 동일 인물의 동선을 익명 상태 그대로 추적할 수 있습니다.'],
                  ['직원과 고객을 구분해서 익명화하나요?', '분석 목적에 따라 구역·역할 기반으로 데이터를 구분할 수 있습니다. 매장별 설정은 도입 시 함께 협의합니다.'],
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
              <Link href="/resources/docs#privacy" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">데이터 보관 정책 →</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">익명화된 데이터는 얼마나, 어떻게 보관되는지 확인하세요.</p>
              </Link>
              <Link href="/technology/anonymizer" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">기술 소개: Anonymizer →</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">익명화 기술에 대한 제품 소개 페이지입니다.</p>
              </Link>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-3 px-5 py-5 bg-primary/5 border border-primary/10 rounded-xl">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">내부 검토를 위한 자료가 필요하신가요?</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 break-keep">
                  개인정보보호 담당자·법무팀 검토용 자료가 필요하면 요청해 주세요.
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
