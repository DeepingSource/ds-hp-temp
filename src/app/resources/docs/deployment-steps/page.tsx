import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, ListChecks, ClipboardCheck, Lightbulb,
  FileSignature, Camera, KeyRound, GraduationCap, BarChart3, HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '도입 절차 | DEEPINGSOURCE',
  description:
    '계약부터 첫 리포트까지, DeepingSource 제품 도입이 진행되는 단계를 안내합니다. 현장 점검, 설치, 계정 발급, 대시보드 교육까지 한곳에서 확인하세요.',
  alternates: { canonical: '/resources/docs/deployment-steps' },
  openGraph: {
    title: '도입 절차 | DEEPINGSOURCE',
    description: '계약부터 첫 리포트까지, 도입이 진행되는 단계를 안내합니다.',
    url: '/resources/docs/deployment-steps',
  },
};

type Sub = { id: string; title: string };
type Section = { id: string; icon: typeof BookOpen; title: string; subs: Sub[] };

const sections: Section[] = [
  { id: 'about', icon: BookOpen, title: '개요', subs: [{ id: 'about', title: '전체 흐름' }] },
  { id: 'steps', icon: ListChecks, title: '도입 단계', subs: [
    { id: 'step-1', title: '1. 계약 및 킥오프' },
    { id: 'step-2', title: '2. 현장 실측·사전 점검' },
    { id: 'step-3', title: '3. 설치' },
    { id: 'step-4', title: '4. 계정 발급' },
    { id: 'step-5', title: '5. 대시보드 교육' },
    { id: 'step-6', title: '6. 첫 리포트 확인' },
  ] },
  { id: 'checklist', icon: ClipboardCheck, title: '준비물 체크리스트', subs: [{ id: 'checklist', title: '매장에서 미리 확인할 것' }] },
  { id: 'faq', icon: HelpCircle, title: 'FAQ', subs: [{ id: 'faq', title: '자주 묻는 질문' }] },
];

const steps: { icon: typeof FileSignature; title: string; desc: string }[] = [
  {
    icon: FileSignature, title: '계약 및 킥오프',
    desc: '계약 체결 후 담당 매니저가 배정됩니다. 매장 수·업종·목표를 바탕으로 도입 일정과 필요한 제품 구성(store insight·store care·store agent 등)을 함께 확정합니다.',
  },
  {
    icon: ClipboardCheck, title: '현장 실측·사전 점검',
    desc: '매장 도면, 기존 CCTV 대수·화각·설치 위치, 네트워크 환경(인터넷 대역폭, 폐쇄망 여부)을 점검합니다. 확인이 필요한 항목은 환경 요구사항 문서를 참고하세요.',
  },
  {
    icon: Camera, title: '설치',
    desc: '새 카메라를 추가로 달지 않고, 매장에 이미 설치된 CCTV에 익명화 분석을 연동합니다. 매장·네트워크 환경에 따라 온사이트 또는 원격으로 진행됩니다.',
  },
  {
    icon: KeyRound, title: '계정 발급',
    desc: '설치가 끝나면 매장별 대시보드 접속 주소(URL)와 관리자 계정(아이디·비밀번호)이 발급됩니다.',
  },
  {
    icon: GraduationCap, title: '대시보드 교육',
    desc: '담당자를 대상으로 리포트 읽는 법과 대시보드 설정(라인·구역, 행사 일정 등)을 안내하는 온보딩 세션을 진행합니다.',
  },
  {
    icon: BarChart3, title: '첫 리포트 확인',
    desc: '데이터 수집이 시작된 뒤 첫 리포트를 확인합니다. 소요 기간은 매장 환경에 따라 달라지며, 자세한 안내는 첫 리포트 받기 문서에서 다룰 예정입니다.',
  },
];

const checklist = [
  ['기존 CCTV 현황', '매장 내 CCTV 대수, 설치 위치, 화각(입구·매대·계산대 등 촬영 범위)을 정리해 두면 사전 점검이 빨라집니다.'],
  ['네트워크 환경', '카메라·서버가 연결된 네트워크 구성과 인터넷 대역폭, 폐쇄망 여부를 확인해 주세요.'],
  ['담당자 지정', '설치 일정 조율과 대시보드 교육을 받을 매장·본사 담당자를 미리 지정해 두면 원활합니다.'],
];

const faqs = [
  ['카메라를 새로 설치해야 하나요?', '아니요. 대부분의 경우 매장에 이미 있는 CCTV를 그대로 활용합니다. 화각이나 대수가 분석에 충분하지 않은 특수한 경우에만 추가·조정을 안내드립니다.'],
  ['도입 기간은 얼마나 걸리나요?', '매장 수, 기존 CCTV·네트워크 환경에 따라 달라집니다. 정확한 일정은 사전 점검 후 담당 매니저가 안내해 드립니다.'],
  ['여러 매장을 한 번에 도입할 수 있나요?', '가능합니다. 다매장 도입 시에는 매장별 사전 점검과 순차 설치 일정을 함께 조율합니다.'],
];

export default function DeploymentStepsDoc() {
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
                <span className="text-sm font-bold text-gray-900">도입 절차</span>
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
              도입 절차
            </h1>
            <p className="text-gray-500 leading-relaxed max-w-2xl mb-12 break-keep">
              계약부터 첫 리포트까지, 도입이 진행되는 단계를 안내합니다. 정확한 일정은 매장 환경과 CCTV 대수에 따라 달라지며,
              담당 매니저가 사전 점검 이후 구체적으로 안내해 드립니다.
            </p>

            {/* 개요 */}
            <section id="about" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-primary" /></span>
                전체 흐름
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                도입은 <strong className="text-gray-700">계약 및 킥오프 → 현장 실측·사전 점검 → 설치 → 계정 발급 → 대시보드 교육 → 첫 리포트 확인</strong>의
                6단계로 진행됩니다. 새 카메라를 설치하지 않고 기존 CCTV를 활용하는 만큼, 준비의 핵심은 카메라 신규 설치가 아니라
                현재 CCTV·네트워크 환경을 정확히 파악하는 데 있습니다.
              </p>
            </section>

            {/* 도입 단계 */}
            <section id="steps" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><ListChecks className="w-5 h-5 text-primary" /></span>
                도입 단계
              </h2>
              <div className="space-y-6">
                {steps.map((s, i) => (
                  <div key={s.title} id={`step-${i + 1}`} className="scroll-mt-24 flex gap-4">
                    <div className="flex flex-col items-center shrink-0">
                      <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><s.icon className="w-5 h-5 text-primary" /></span>
                      {i < steps.length - 1 && <span className="w-px flex-1 bg-gray-100 mt-2" />}
                    </div>
                    <div className="pb-2">
                      <p className="text-2xs font-bold text-primary uppercase tracking-wider mb-1">Step {i + 1}</p>
                      <h3 className="text-base font-bold text-gray-900 mb-1">{s.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed break-keep">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 준비물 체크리스트 */}
            <section id="checklist" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><ClipboardCheck className="w-5 h-5 text-primary" /></span>
                준비물 체크리스트
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 break-keep">
                사전 점검(2단계) 전에 아래를 미리 확인해 두면 일정이 빨라집니다. 자세한 기준은 환경 요구사항 문서를 참고하세요.
              </p>
              <dl className="divide-y divide-gray-100 border-y border-gray-100">
                {checklist.map(([term, def]) => (
                  <div key={term} className="grid sm:grid-cols-[10rem_1fr] gap-1 sm:gap-4 py-3">
                    <dt className="text-sm font-medium text-gray-900">{term}</dt>
                    <dd className="text-sm text-gray-600 leading-relaxed break-keep">{def}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><HelpCircle className="w-5 h-5 text-primary" /></span>
                자주 묻는 질문
              </h2>
              <div className="space-y-3">
                {faqs.map(([q, a]) => (
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
              <Link href="/resources/docs/product-overview" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">← 제품 개요</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">SAAI 제품군이 어떻게 연결되는지 먼저 확인하세요.</p>
              </Link>
              <Link href="/resources/docs#getting-started" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">환경 요구사항 →</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">CCTV·네트워크·POS 등 도입 전 확인할 조건입니다.</p>
              </Link>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-3 px-5 py-5 bg-primary/5 border border-primary/10 rounded-xl">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">도입 일정이 궁금하신가요?</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 break-keep">
                  매장 수와 환경을 알려주시면 담당 매니저가 구체적인 일정을 안내해 드립니다.
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
