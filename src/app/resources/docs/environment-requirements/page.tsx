import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, Camera, Wifi, Monitor, Plug, Lightbulb, HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '환경 요구사항 | DEEPINGSOURCE',
  description:
    'DeepingSource 제품 도입 전에 확인해야 할 CCTV, 네트워크, 대시보드 접속 환경, POS 연동 조건을 안내합니다.',
  alternates: { canonical: '/resources/docs/environment-requirements' },
  openGraph: {
    title: '환경 요구사항 | DEEPINGSOURCE',
    description: '도입 전에 확인해야 할 CCTV, 네트워크, 대시보드 접속 환경입니다.',
    url: '/resources/docs/environment-requirements',
  },
};

type Sub = { id: string; title: string };
type Section = { id: string; icon: typeof BookOpen; title: string; subs: Sub[] };

const sections: Section[] = [
  { id: 'about', icon: BookOpen, title: '개요', subs: [{ id: 'about', title: '기본 원칙' }] },
  { id: 'cctv', icon: Camera, title: 'CCTV·카메라', subs: [{ id: 'cctv', title: '기존 CCTV 활용' }] },
  { id: 'network', icon: Wifi, title: '네트워크', subs: [{ id: 'network', title: '연결 환경' }] },
  { id: 'dashboard', icon: Monitor, title: '대시보드 접속', subs: [{ id: 'dashboard', title: '브라우저 환경' }] },
  { id: 'pos', icon: Plug, title: 'POS 연동(선택)', subs: [{ id: 'pos', title: '연동을 원하는 경우' }] },
  { id: 'faq', icon: HelpCircle, title: 'FAQ', subs: [{ id: 'faq', title: '자주 묻는 질문' }] },
];

export default function EnvironmentRequirementsDoc() {
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
                <span className="text-sm font-bold text-gray-900">환경 요구사항</span>
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
              환경 요구사항
            </h1>
            <p className="text-gray-500 leading-relaxed max-w-2xl mb-12 break-keep">
              도입 전에 확인해 두면 사전 점검과 설치가 빨라지는 CCTV·네트워크·대시보드 접속 환경을 안내합니다.
              정확한 최소 사양은 매장마다 달라, 도입 절차의 현장 실측·사전 점검 단계에서 담당 매니저가 함께 확인합니다.
            </p>

            {/* 개요 */}
            <section id="about" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-primary" /></span>
                기본 원칙
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                DeepingSource 제품은 <strong className="text-gray-700">매장에 이미 있는 CCTV와 인터넷 연결을 그대로 활용</strong>하는 것을
                기본 전제로 합니다. 새로운 전용 장비를 대규모로 설치하기보다, 기존 환경이 분석에 활용 가능한 수준인지 확인하고
                필요한 부분만 보완하는 방식으로 진행됩니다.
              </p>
            </section>

            {/* CCTV */}
            <section id="cctv" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Camera className="w-5 h-5 text-primary" /></span>
                CCTV·카메라
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-600 break-keep list-disc list-inside marker:text-primary">
                <li>대부분의 경우 <strong className="text-gray-700">기존에 설치된 CCTV를 그대로 활용</strong>합니다. 분석을 위한 신규 카메라 설치가 필수는 아닙니다.</li>
                <li>분석하려는 영역(입구·매대·계산대 등)을 카메라가 실제로 비추고 있는지, 화각과 설치 위치가 적절한지가 화질보다 중요합니다.</li>
                <li>카메라가 너무 오래되었거나 특정 영역이 사각지대라면, 사전 점검에서 보완이 필요한 지점을 안내해 드립니다.</li>
              </ul>
            </section>

            {/* 네트워크 */}
            <section id="network" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Wifi className="w-5 h-5 text-primary" /></span>
                네트워크
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-600 break-keep list-disc list-inside marker:text-primary">
                <li>카메라 영상이 분석 시스템까지 안정적으로 전달될 수 있는 인터넷 연결이 필요합니다.</li>
                <li>매장이 폐쇄망(외부 인터넷 미연결)을 사용 중이거나 별도 방화벽 정책이 있다면, 사전 점검에서 연동 방식을 별도로 협의합니다.</li>
                <li>다매장이라면 매장별로 네트워크 구성이 다를 수 있어, 매장 단위로 확인이 필요합니다.</li>
              </ul>
            </section>

            {/* 대시보드 접속 */}
            <section id="dashboard" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Monitor className="w-5 h-5 text-primary" /></span>
                대시보드 접속
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                대시보드(예: store insight)는 별도 프로그램 설치 없이 <strong className="text-gray-700">웹 브라우저</strong>로 접속합니다.
                최신 버전의 일반적인 브라우저(Chrome 등)와 인터넷 연결이 되는 PC라면 추가 준비 없이 이용할 수 있습니다.
              </p>
            </section>

            {/* POS 연동 */}
            <section id="pos" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Plug className="w-5 h-5 text-primary" /></span>
                POS 연동(선택)
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                구매 전환율처럼 매출 데이터와 함께 보는 리포트를 원하신다면 POS 연동을 추가할 수 있습니다. 사용 중인 POS
                시스템의 종류와 데이터 연동 가능 여부를 사전 점검 시 함께 확인하며, 자세한 절차는 POS 연동 문서에서 다룰 예정입니다.
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
                  ['우리 매장 CCTV로도 가능한지 어떻게 확인하나요?', '사전 점검 단계에서 담당 매니저가 카메라 대수·화각·설치 위치를 확인하고 활용 가능 여부를 안내해 드립니다.'],
                  ['인터넷이 불안정한 매장은 어떻게 하나요?', '네트워크 상태에 따라 연동 방식을 조정할 수 있습니다. 사전 점검 시 함께 확인해 대안을 안내해 드립니다.'],
                  ['대시보드를 모바일에서도 볼 수 있나요?', '웹 브라우저 기반이라 모바일 브라우저로도 접속할 수 있습니다. 다만 세부 화면 구성은 PC 환경에 최적화되어 있습니다.'],
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
              <Link href="/resources/docs/deployment-steps" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">← 도입 절차</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">환경 점검이 도입 절차의 어느 단계에 해당하는지 확인하세요.</p>
              </Link>
              <Link href="/resources/docs#getting-started" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">첫 리포트 받기 →</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">설치 후 첫 리포트가 나오기까지의 과정입니다.</p>
              </Link>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-3 px-5 py-5 bg-primary/5 border border-primary/10 rounded-xl">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">우리 매장 환경이 맞는지 확인하고 싶으신가요?</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 break-keep">
                  CCTV·네트워크 현황을 알려주시면 도입 가능 여부를 미리 확인해 드립니다.
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
