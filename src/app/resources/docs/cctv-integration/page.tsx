import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, Workflow, Camera, ClipboardList, CheckCircle2, Lightbulb, HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'CCTV 연동 | DEEPINGSOURCE',
  description:
    '기존 CCTV를 DeepingSource 익명화 분석 파이프라인에 연동하는 방식과 절차, 담당자가 준비해야 할 정보를 안내합니다.',
  alternates: { canonical: '/resources/docs/cctv-integration' },
  openGraph: {
    title: 'CCTV 연동 | DEEPINGSOURCE',
    description: '기존 CCTV를 분석 파이프라인에 연동하는 방식을 안내합니다.',
    url: '/resources/docs/cctv-integration',
  },
};

type Sub = { id: string; title: string };
type Section = { id: string; icon: typeof BookOpen; title: string; subs: Sub[] };

const sections: Section[] = [
  { id: 'about', icon: BookOpen, title: '개요', subs: [{ id: 'about', title: '연동의 원칙' }] },
  { id: 'flow', icon: Workflow, title: '연동 흐름', subs: [{ id: 'flow', title: '영상이 리포트가 되기까지' }] },
  { id: 'method', icon: Camera, title: '연동 방식', subs: [{ id: 'method', title: 'NVR/DVR·IP 카메라' }] },
  { id: 'prepare', icon: ClipboardList, title: '준비할 정보', subs: [{ id: 'prepare', title: '담당자 체크리스트' }] },
  { id: 'verify', icon: CheckCircle2, title: '연동 확인', subs: [{ id: 'verify', title: '정상 연동 확인 방법' }] },
  { id: 'faq', icon: HelpCircle, title: 'FAQ', subs: [{ id: 'faq', title: '자주 묻는 질문' }] },
];

export default function CctvIntegrationDoc() {
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
                <span className="text-sm font-bold text-gray-900">CCTV 연동</span>
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
              CCTV 연동
            </h1>
            <p className="text-gray-500 leading-relaxed max-w-2xl mb-12 break-keep">
              기존에 설치된 CCTV를 DeepingSource 익명화 분석 파이프라인에 연결하는 방식을 안내합니다.
              현장별 정확한 구성은 도입 절차의 사전 점검 단계에서 함께 확인합니다.
            </p>

            {/* 개요 */}
            <section id="about" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-primary" /></span>
                연동의 원칙
              </h2>
              <p className="text-gray-600 leading-relaxed break-keep">
                CCTV 연동은 <strong className="text-gray-700">신규 카메라 설치가 아니라 기존 카메라의 영상 스트림을 분석 파이프라인에
                연결</strong>하는 작업입니다. 카메라에서 나온 영상은 저장되기 전에 실시간으로 익명화되며, 원본 영상 자체는 DeepingSource
                시스템에 남지 않습니다.
              </p>
            </section>

            {/* 연동 흐름 */}
            <section id="flow" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Workflow className="w-5 h-5 text-primary" /></span>
                연동 흐름
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 break-keep">
                영상이 리포트로 이어지기까지는 아래 흐름을 거칩니다.
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-sm text-gray-600 marker:text-primary marker:font-bold">
                <li>매장 CCTV(또는 NVR/DVR)에서 영상 스트림을 가져옵니다.</li>
                <li>AI가 실시간으로 영상 속 인물을 익명화합니다 — 얼굴 등 개인 식별 정보는 제거되고, 이동·체류 같은 행동 속성만 남습니다.</li>
                <li>익명화된 데이터가 분석 서버로 전송·저장됩니다. 원본 영상은 이 과정에서 보관되지 않습니다.</li>
                <li>쌓인 데이터를 바탕으로 대시보드에 리포트가 생성됩니다.</li>
              </ol>
            </section>

            {/* 연동 방식 */}
            <section id="method" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Camera className="w-5 h-5 text-primary" /></span>
                연동 방식
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-600 break-keep list-disc list-inside marker:text-primary">
                <li>대부분의 매장은 <strong className="text-gray-700">NVR/DVR에 모인 영상</strong>이나 <strong className="text-gray-700">IP 카메라의 스트림</strong>(RTSP 등 일반적인 네트워크 카메라 스트리밍 방식)을 그대로 활용해 연동합니다.</li>
                <li>연동에 필요한 장비 구성은 카메라·NVR 제조사, 매장 네트워크 구조에 따라 달라질 수 있어, 사전 점검에서 개별적으로 확인합니다.</li>
                <li>연동 장비는 최소한으로 설치하며, 별도 대형 서버 구축 없이 진행하는 것을 원칙으로 합니다.</li>
              </ul>
            </section>

            {/* 준비할 정보 */}
            <section id="prepare" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><ClipboardList className="w-5 h-5 text-primary" /></span>
                준비할 정보
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 break-keep">
                담당자가 아래 정보를 미리 정리해 두면 연동 작업이 빨라집니다.
              </p>
              <dl className="divide-y divide-gray-100 border-y border-gray-100">
                {[
                  ['카메라·NVR 목록', '제조사·모델, 설치 위치, 대수를 정리한 목록.'],
                  ['접근 권한', 'NVR/DVR 관리자 계정 또는 카메라 스트림에 접근할 수 있는 계정 정보.'],
                  ['네트워크 구성도', '카메라·NVR과 인터넷 회선이 어떻게 연결되어 있는지에 대한 간단한 구성도나 설명.'],
                  ['현장 담당자', '설치 당일 현장에서 문을 열어주거나 장비 위치를 안내해 줄 담당자.'],
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
                연동이 끝나면 담당 매니저가 각 카메라의 스트림이 정상적으로 수신되는지 확인합니다. 이후 데이터가 쌓이기 시작하면
                대시보드에서 리포트로 확인할 수 있습니다 — 자세한 내용은 첫 리포트 받기 문서를 참고하세요.
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
                  ['오래된 아날로그 CCTV도 연동할 수 있나요?', 'NVR/DVR을 거쳐 네트워크로 영상을 내보낼 수 있다면 연동이 가능한 경우가 많습니다. 정확한 가능 여부는 사전 점검에서 확인합니다.'],
                  ['연동 작업 중 CCTV 녹화가 중단되나요?', '기존 녹화 시스템과는 별도로 동작하도록 연동하는 것이 원칙입니다. 매장별 예외 사항은 사전 점검에서 안내드립니다.'],
                  ['카메라를 교체하면 다시 연동해야 하나요?', '네, 카메라나 NVR을 교체하시면 연동 설정을 다시 확인해야 할 수 있습니다. 교체 예정이라면 미리 알려주세요.'],
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
                <p className="text-xs text-gray-500 leading-relaxed break-keep">연동 전에 확인해야 할 네트워크·카메라 조건입니다.</p>
              </Link>
              <Link href="/resources/docs#integration" className="card p-5 block hover:border-primary-light transition-colors">
                <h3 className="text-sm font-medium text-gray-900 mb-1">POS 연동 →</h3>
                <p className="text-xs text-gray-500 leading-relaxed break-keep">매출 데이터와 함께 보는 리포트를 원한다면 확인하세요.</p>
              </Link>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-3 px-5 py-5 bg-primary/5 border border-primary/10 rounded-xl">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">우리 매장 CCTV로 연동이 가능한지 궁금하신가요?</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 break-keep">
                  카메라·NVR 정보를 알려주시면 연동 가능 여부를 미리 확인해 드립니다.
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
