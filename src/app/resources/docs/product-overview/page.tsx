import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, Layers, ShieldCheck, Lightbulb,
  Eye, BarChart3, Bot, Store,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '제품 개요 | DEEPINGSOURCE',
  description:
    'DeepingSource가 무엇을 하는 회사인지, SAAI 제품군(store count·store insight·store care·store agent)이 어떻게 하나의 오퍼레이팅 루프로 연결되는지 소개합니다.',
  alternates: { canonical: '/resources/docs/product-overview' },
  openGraph: {
    title: '제품 개요 | DEEPINGSOURCE',
    description: 'SAAI 제품군이 어떻게 하나의 오퍼레이팅 루프로 연결되는지 소개합니다.',
    url: '/resources/docs/product-overview',
  },
};

type Sub = { id: string; title: string };
type Section = { id: string; icon: typeof BookOpen; title: string; subs: Sub[] };

const sections: Section[] = [
  { id: 'about', icon: BookOpen, title: 'DeepingSource란', subs: [{ id: 'about', title: '회사 소개' }] },
  { id: 'loop', icon: Layers, title: 'SAAI 오퍼레이팅 루프', subs: [
    { id: 'loop', title: '4개 제품, 하나의 흐름' },
  ] },
  { id: 'how', icon: ShieldCheck, title: '동작 원리', subs: [{ id: 'how', title: '익명화 기반 분석' }] },
  { id: 'owner', icon: Store, title: '사장님용 별도 제품', subs: [{ id: 'owner', title: 'saai.store · storecare.ai' }] },
  { id: 'next', icon: Lightbulb, title: '다음 단계', subs: [{ id: 'next', title: '이어서 읽기' }] },
];

const loopProducts = [
  {
    step: '01 · Observe', icon: Eye, name: 'store count',
    desc: '매장 밖 유동인구를 읽습니다 — 상권, 유동 인구, 유입률.',
  },
  {
    step: '02 · Analyze', icon: BarChart3, name: 'store insight',
    desc: '매장 안을 읽습니다 — 동선, 체류, 전환. 어제 무슨 일이 있었고 왜 그랬는지.',
  },
  {
    step: '03 · Suggest', icon: ShieldCheck, name: 'store care',
    desc: '지금을 지켜봅니다 — 도난, 위생, 설비 이상을 전 매장에 걸쳐 감지합니다.',
  },
  {
    step: '04 · Learn', icon: Bot, name: 'store agent',
    desc: '다음을 결정합니다 — 추천과 발주를 하나의 엔진으로 판단합니다.',
  },
];

const nextDocs = [
  { title: '도입 절차', desc: '계약부터 매장 오픈까지, 도입이 진행되는 단계를 안내합니다.' },
  { title: '환경 요구사항', desc: 'CCTV·네트워크·POS 등 도입 전에 확인해야 할 환경 조건입니다.' },
  { title: '첫 리포트 받기', desc: '설치 후 첫 리포트가 나오기까지 걸리는 시간과 확인 방법입니다.' },
];

export default function ProductOverviewDoc() {
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
                <span className="text-sm font-bold text-gray-900">제품 개요</span>
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
              제품 개요
            </h1>
            <p className="text-gray-500 leading-relaxed max-w-2xl mb-12 break-keep">
              DeepingSource가 무엇을 하는 회사인지, <strong className="text-gray-700">SAAI</strong> 제품군이
              어떻게 하나의 운영 흐름으로 연결되는지 소개합니다. 도입을 검토 중이거나 막 시작한 담당자를 위한 첫 문서입니다.
            </p>

            {/* DeepingSource란 */}
            <section id="about" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-primary" /></span>
                DeepingSource란
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 break-keep">
                DeepingSource는 <strong className="text-gray-700">Anonymized Spatial AI</strong>(익명화 공간 AI) 기업입니다.
                매장에 이미 설치된 CCTV 영상 속 인물을 실시간으로 익명화한 뒤, 그 위에서 공간 분석과 운영 자동화를 수행합니다.
                원본 영상은 저장되지 않으므로 개인을 식별하지 않고도 매장에서 일어나는 일을 이해할 수 있습니다.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  ['특허 103건', '등록 66건 · 출원 37건. 익명화·공간 분석 기술의 기반입니다.'],
                  ['3대 기술 축', 'Anonymizer · Spatial AI · Agentic AI — 세 축이 함께 공간을 읽고 운영합니다.'],
                  ['카메라리스도 가능', '카메라 없이 운영 데이터만으로 시작하는 saai.store 제품군도 있습니다.'],
                ].map(([t, d]) => (
                  <div key={t} className="card p-5">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{t}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed break-keep">{d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SAAI 오퍼레이팅 루프 */}
            <section id="loop" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Layers className="w-5 h-5 text-primary" /></span>
                SAAI 오퍼레이팅 루프
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 break-keep">
                SAAI는 4개의 제품이 하나의 흐름으로 연결된 <strong className="text-gray-700">오퍼레이팅 루프</strong>입니다.
                매장 밖 유동인구를 읽는 것에서 시작해, 매장 안 고객 행동을 분석하고, 이상을 감지하고, 마지막으로 다음 행동을 결정합니다.
                이 문서군은 본사·관리자를 위한 문서이며, 단일 매장을 운영하는 사장님을 위한 제품은 아래 별도 섹션을 참고하세요.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {loopProducts.map((p) => (
                  <div key={p.name} className="card p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><p.icon className="w-4 h-4 text-primary" /></span>
                      <span className="text-2xs font-bold text-primary uppercase tracking-wider">{p.step}</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">{p.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed break-keep">{p.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 동작 원리 */}
            <section id="how" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><ShieldCheck className="w-5 h-5 text-primary" /></span>
                동작 원리
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3 break-keep">
                모든 제품은 같은 원칙 위에서 동작합니다 — <strong className="text-gray-700">읽기 전에 지운다</strong>.
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-sm text-gray-600 mb-3 marker:text-primary marker:font-bold">
                <li>CCTV 원본 영상이 입력됩니다.</li>
                <li>AI가 실시간으로 개인 식별 정보를 제거합니다(익명화).</li>
                <li>행동 속성만 남은 익명화 데이터가 저장됩니다 — 원본은 보관되지 않습니다.</li>
                <li>이 데이터로 모델을 학습하고, 리포트와 알림 형태의 인사이트를 출력합니다.</li>
              </ol>
              <p className="text-gray-500 text-sm leading-relaxed break-keep">
                자세한 원리는 프라이버시 & 보안 섹션의 &ldquo;익명화 동작 원리&rdquo; 문서에서 다룰 예정입니다.
              </p>
            </section>

            {/* 사장님용 별도 제품 */}
            <section id="owner" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Store className="w-5 h-5 text-primary" /></span>
                사장님용 별도 제품
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 break-keep">
                본사·다매장 운영이 아니라 매장 하나를 직접 운영하신다면, 아래 두 제품이 더 맞을 수 있습니다.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <a href="https://saai.store" target="_blank" rel="noopener noreferrer" className="card p-5 block hover:border-primary-light transition-colors">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">saai.store</h3>
                  <p className="text-xs text-gray-500 leading-relaxed break-keep">카메라 없이도 발주부터 진열까지 운영할 수 있는 사장님용 스위트입니다.</p>
                </a>
                <a href="https://storecare.ai" target="_blank" rel="noopener noreferrer" className="card p-5 block hover:border-primary-light transition-colors">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">storecare.ai</h3>
                  <p className="text-xs text-gray-500 leading-relaxed break-keep">단일 매장을 위한 보안·이상 알림 서비스입니다.</p>
                </a>
              </div>
            </section>

            {/* 다음 단계 */}
            <section id="next" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Lightbulb className="w-5 h-5 text-primary" /></span>
                다음 단계
              </h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {nextDocs.map((d) => (
                  <Link key={d.title} href="/resources/docs#getting-started" className="card p-5 block hover:border-primary-light transition-colors">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{d.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed break-keep">{d.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-3 px-5 py-5 bg-primary/5 border border-primary/10 rounded-xl">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">도입을 검토 중이신가요?</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 break-keep">
                  매장·본사 환경에 맞는 제품 구성과 도입 절차를 안내해 드립니다.
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
