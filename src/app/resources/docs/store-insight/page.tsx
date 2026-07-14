import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen, Rocket, SlidersHorizontal, BarChart3, Map, Route, Target,
  Users, ScanLine, HelpCircle, ExternalLink, ArrowLeft, Lightbulb, Layers,
} from 'lucide-react';

type Fig = { src: string; alt: string; caption: string; w: number; h: number };

function Figure({ src, alt, caption, w, h }: Fig) {
  return (
    <figure className="my-5">
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        sizes="(max-width: 768px) 100vw, 720px"
        className="w-full h-auto rounded-lg border border-gray-200 shadow-sm"
        style={{ height: 'auto' }}
      />
      <figcaption className="mt-2 text-xs text-gray-400 break-keep">{caption}</figcaption>
    </figure>
  );
}

// 화면 캡처 출처: 공식 사용자 가이드 v3.5 (guide.storeinsight.ai)
type Item = { name: string; desc: string; img: string; h: number };
const SI = (slug: string) => `/images/si-guide/${slug}.png`;

export const metadata: Metadata = {
  title: 'store insight 사용자 매뉴얼 | DEEPINGSOURCE',
  description:
    'store insight 공간 분석 대시보드 사용 매뉴얼. 로그인·기간 설정부터 방문자 분석, 히트맵, 동선, 퍼널, 구매 전환율까지 리포트 읽는 법을 한곳에서 안내합니다.',
  alternates: { canonical: '/resources/docs/store-insight' },
  openGraph: {
    title: 'store insight 사용자 매뉴얼 | DEEPINGSOURCE',
    description: '로그인부터 리포트 해석까지, store insight 대시보드 사용 매뉴얼.',
    url: '/resources/docs/store-insight',
  },
};

const GUIDE_URL = 'https://guide.storeinsight.ai/v35/';

type Sub = { id: string; title: string };
type Section = { id: string; icon: typeof Rocket; title: string; subs: Sub[] };

const sections: Section[] = [
  { id: 'overview', icon: BookOpen, title: '개요', subs: [{ id: 'overview', title: 'store insight란' }] },
  { id: 'getting-started', icon: Rocket, title: '시작하기', subs: [
    { id: 'login', title: '로그인' },
    { id: 'dashboard', title: '대시보드 둘러보기' },
    { id: 'period', title: '기간 선택과 필터' },
  ] },
  { id: 'setup', icon: SlidersHorizontal, title: '대시보드 설정', subs: [
    { id: 'line-zone', title: '라인·구역 설정' },
    { id: 'events', title: '행사 일정 등록' },
  ] },
  { id: 'reports', icon: BarChart3, title: '리포트 읽는 법', subs: [
    { id: 'status', title: 'Part 1 · 매장 현황' },
    { id: 'space', title: 'Part 2 · 공간 가치' },
    { id: 'journey', title: 'Part 3 · 고객 여정' },
    { id: 'diagnosis', title: 'Part 4 · 진단·최적화' },
    { id: 'custom', title: 'Part 5 · 맞춤 리포트' },
    { id: 'addons', title: 'Part 6 · 부가 리포트' },
  ] },
  { id: 'glossary', icon: Users, title: '용어 정리', subs: [{ id: 'glossary', title: '핵심 지표 용어' }] },
  { id: 'faq', icon: HelpCircle, title: 'FAQ', subs: [{ id: 'faq', title: '자주 묻는 질문' }] },
];

const reports: { id: string; icon: typeof BarChart3; part: string; title: string; desc: string; items: Item[] }[] = [
  {
    id: 'status', icon: BarChart3, part: 'Part 1', title: '매장 현황',
    desc: '지금 우리 매장에 누가, 얼마나 오는지 한눈에 봅니다.',
    items: [
      { name: '방문자 분석', desc: '방문자 수·성별/연령 추정·체류시간을 종합해 매장의 기본 활력을 보여줍니다.', img: '02-visitor-analysis', h: 150 },
      { name: '라인 분석', desc: '매장 입구 등에 설정한 가상의 라인을 통과한 통행객·방문자 수를 집계해 입점률을 계산합니다.', img: 'line-analysis', h: 182 },
    ],
  },
  {
    id: 'space', icon: Map, part: 'Part 2', title: '공간 가치 발견',
    desc: '어느 공간이 일하고, 어느 공간이 쉬고 있는지 진단합니다.',
    items: [
      { name: '구역별 분석', desc: '구역(Zone)별 방문자 유입과 체류시간을 비교해 매대·진열 공간의 가치를 평가합니다.', img: 'zone-analysis', h: 874 },
      { name: '히트맵 분석', desc: '고객의 이동·체류가 집중된 영역을 색의 농담으로 시각화합니다.', img: '03-heatmap', h: 400 },
      { name: '시간대별 히트맵', desc: '오전·점심·저녁 등 시간대에 따라 집중 구역이 어떻게 달라지는지 비교합니다.', img: 'time-heatmap', h: 590 },
    ],
  },
  {
    id: 'journey', icon: Route, part: 'Part 3', title: '고객 여정',
    desc: '고객이 매장 안에서 어떻게 움직이는지 따라갑니다.',
    items: [
      { name: '구역간 통행량', desc: '구역과 구역 사이의 이동량을 측정해 동선의 연결 고리를 파악합니다.', img: 'inter-zone-traffic', h: 580 },
      { name: '방문자 동선', desc: '개별 방문자의 이동 경로를 추적합니다.', img: 'visitor-trajectory', h: 425 },
      { name: '대표 동선 분석', desc: '가장 많이 반복되는 대표 경로를 추출해 주 동선을 식별합니다.', img: '04-representative-path', h: 314 },
    ],
  },
  {
    id: 'diagnosis', icon: Target, part: 'Part 4', title: '진단·최적화',
    desc: '노출이 매출로 이어지는지, 어디서 새는지 짚어냅니다.',
    items: [
      { name: '구역 관심도 분석', desc: '구역의 노출(지나간 사람) 대비 실제 관심(접근·체류)을 비교해 효율을 진단합니다.', img: 'zone-interest', h: 454 },
      { name: '퍼널 분석', desc: '방문 → 구역 진입 → 관심 → 구매의 단계별 이탈 지점을 진단합니다.', img: '05-funnel', h: 634 },
      { name: '구매 전환율', desc: '방문자 대비 실제 구매로 이어진 비율을 측정합니다.', img: '06-conversion-rate', h: 788 },
    ],
  },
  {
    id: 'custom', icon: ScanLine, part: 'Part 5', title: '맞춤 리포트',
    desc: '필요한 조건만 떼어내 우리 매장에 맞춘 시각으로 봅니다.',
    items: [
      { name: '세그먼트 분석', desc: '성별·연령·시간대 등 조건으로 방문자를 나눠 분석합니다.', img: 'segment-analysis', h: 1759 },
      { name: '맞춤 리포트', desc: '자주 보는 지표를 모아 매장 운영 목적에 맞는 리포트를 구성합니다.', img: 'custom-report', h: 568 },
    ],
  },
  {
    id: 'addons', icon: Layers, part: 'Part 6', title: '부가 리포트',
    desc: '업종·환경에 따라 선택해 추가하는 확장 리포트입니다.',
    items: [
      { name: '유입률 (Inflow Rate)', desc: '매장 앞 통행 인구 대비 실제 입점 비율을 외부 유동까지 포함해 분석합니다.', img: 'inflow-rate', h: 1208 },
      { name: '좌석 점유율 (Seat Occupancy)', desc: '카페·식음 매장의 좌석 사용률과 회전을 측정합니다.', img: 'seat-occupancy', h: 1041 },
      { name: '진열대 히트맵', desc: '특정 매대·진열대 단위로 고객의 접근·체류 집중도를 시각화합니다.', img: 'shelf-heatmap', h: 430 },
      { name: '진열대 분석', desc: '진열대별 접근·관심 지표를 비교해 진열 효율을 진단합니다.', img: 'shelf-analysis', h: 329 },
      { name: '행사 일정 리포트', desc: '등록한 프로모션·행사 기간의 방문·전환 변화를 비교해 효과를 검증합니다.', img: 'event-schedule', h: 569 },
      { name: '광고 시청 분석', desc: '매장 내 디지털 사이니지·광고의 노출과 시청 반응을 측정합니다.', img: 'ad-viewing', h: 373 },
    ],
  },
];

const glossary = [
  ['통행객', '매장 앞을 지나갔으나 입장하지 않은 사람.'],
  ['방문자', '실제로 매장에 입장한 고객.'],
  ['입점률', '통행객 대비 방문자 비율 — 입구·외부 매력도를 가늠하는 지표.'],
  ['체류시간', '방문자가 매장 또는 특정 구역에 머문 시간.'],
  ['라인(Line)', '통행량 측정을 위해 화면에 설정하는 가상의 선.'],
  ['구역(Zone)', '분석 단위로 설정한 매장 내 영역(매대·코너 등).'],
  ['동선', '방문자가 매장 안에서 이동한 경로.'],
  ['구역 관심도', '구역 노출 대비 실제 접근·체류를 비교한 효율 지표.'],
  ['퍼널', '방문에서 구매까지의 단계별 전환 흐름.'],
  ['구매 전환율', '방문자 대비 구매자 비율.'],
];

const faqs = [
  ['로그인이 안 될 경우', '아이디·비밀번호가 정확한지, Caps Lock이 켜져 있지 않은지 확인하세요. 그래도 안 되면 브라우저 캐시를 비우고 다시 시도하고, 계정은 관리자에게 문의하세요.'],
  ['접속 주소를 모르겠어요', '접속 주소(URL)와 계정은 매장별로 관리자가 발급합니다. 담당 관리자에게 문의하세요.'],
  ['데이터가 보이지 않아요', '상단의 기간 선택과 필터 조건을 확인하세요. 선택한 기간에 수집된 데이터가 없으면 비어 보일 수 있습니다.'],
];

export default function StoreInsightManual() {
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
                <span className="text-sm font-bold text-gray-900">store insight 매뉴얼</span>
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
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">Docs · store insight</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              store insight 사용자 매뉴얼
            </h1>
            <p className="text-gray-500 leading-relaxed max-w-2xl mb-6 break-keep">
              store insight는 매장의 <strong className="text-gray-700">방문 → 둘러보기 → 고민 → 구매</strong>로 이어지는
              고객 여정을 데이터로 보여주는 공간 분석 대시보드입니다. 로그인부터 리포트 해석까지, 일상 운영에 필요한 사용법을 안내합니다.
            </p>
            <a
              href={GUIDE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mb-12"
            >
              공식 사용자 가이드 (v3.5) 원문 보기 <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* 개요 */}
            <section id="overview" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-primary" /></span>
                store insight란
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 break-keep">
                CCTV 영상을 익명화해 분석하므로 개인을 식별하지 않고도 매장 공간에서 일어나는 일을 이해할 수 있습니다.
                store insight는 다음 네 가지 방식으로 매장 의사결정을 돕습니다.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  ['운영 효율', '사람이 몰리는 구역을 근거로 인력과 진열을 배치합니다.'],
                  ['마케팅 성과', '관심 구역과 방문자 특성에 맞춰 캠페인을 설계합니다.'],
                  ['고객 경험', '동선과 체류 데이터로 쇼핑 피로를 줄이는 배치를 찾습니다.'],
                  ['데이터 기반 의사결정', '감이 아니라 근거로, 빠르게 결정합니다.'],
                ].map(([t, d]) => (
                  <div key={t} className="card p-5">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{t}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed break-keep">{d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 시작하기 */}
            <section id="getting-started" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Rocket className="w-5 h-5 text-primary" /></span>
                시작하기
              </h2>

              <h3 id="login" className="scroll-mt-24 text-base font-bold text-gray-900 mb-2">로그인</h3>
              <p className="text-gray-600 leading-relaxed mb-3 break-keep">
                store insight는 웹 브라우저로 접속합니다. 접속 주소(URL)와 계정은 매장별로 관리자가 발급합니다.
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-sm text-gray-600 mb-8 marker:text-primary marker:font-bold">
                <li>관리자에게 받은 접속 주소로 이동합니다.</li>
                <li>아이디와 비밀번호를 입력합니다.</li>
                <li>로그인 버튼을 누르면 메인 대시보드로 진입합니다.</li>
              </ol>
              <div className="max-w-sm mb-8">
                <Figure src="/images/si-guide/01-login.png" alt="스토어인사이트 로그인 화면" caption="로그인 화면 — 관리자가 발급한 아이디·비밀번호로 접속" w={610} h={623} />
              </div>

              <h3 id="dashboard" className="scroll-mt-24 text-base font-bold text-gray-900 mb-2">대시보드 둘러보기</h3>
              <p className="text-gray-600 leading-relaxed mb-8 break-keep">
                로그인하면 매장 현황 요약과 함께 좌측에서 리포트 메뉴(매장 현황 · 공간 가치 · 고객 여정 · 진단·최적화 · 맞춤 리포트)를
                선택할 수 있습니다. 각 리포트는 카드·차트·히트맵 형태로 표시됩니다.
              </p>

              <h3 id="period" className="scroll-mt-24 text-base font-bold text-gray-900 mb-2">기간 선택과 필터</h3>
              <p className="text-gray-600 leading-relaxed break-keep">
                상단의 기간 선택(날짜 피커)으로 분석 기간을 지정하고, 필터로 요일·시간대 등 조건을 좁혀 볼 수 있습니다.
                대부분의 리포트는 선택한 기간·필터 기준으로 즉시 다시 계산됩니다. 데이터가 비어 보이면 먼저 기간과 필터를 확인하세요.
              </p>
            </section>

            {/* 대시보드 설정 */}
            <section id="setup" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><SlidersHorizontal className="w-5 h-5 text-primary" /></span>
                대시보드 설정
              </h2>
              <h3 id="line-zone" className="scroll-mt-24 text-base font-bold text-gray-900 mb-2">라인·구역 설정</h3>
              <p className="text-gray-600 leading-relaxed mb-8 break-keep">
                분석의 기준이 되는 <strong className="text-gray-700">라인</strong>(통행량을 세는 가상의 선)과
                <strong className="text-gray-700"> 구역</strong>(매대·코너 등 분석 영역)을 매장 도면 위에 설정합니다.
                입구에 라인을 두면 입점률을, 매대마다 구역을 두면 구역별 관심도를 측정할 수 있습니다.
              </p>
              <h3 id="events" className="scroll-mt-24 text-base font-bold text-gray-900 mb-2">행사 일정 등록</h3>
              <p className="text-gray-600 leading-relaxed break-keep">
                프로모션·행사 일정을 등록해 두면 해당 기간의 방문·전환 변화를 함께 비교할 수 있어, 행사 효과를 사후에 검증하기 쉽습니다.
              </p>
            </section>

            {/* 리포트 */}
            <section id="reports" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><BarChart3 className="w-5 h-5 text-primary" /></span>
                리포트 읽는 법
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8 break-keep">
                리포트는 매장을 이해하는 다섯 단계로 구성됩니다 — 현황을 보고, 공간 가치를 발견하고, 고객 여정을 따라가며, 새는 곳을 진단하고, 우리 매장에 맞게 맞춥니다. 여기에 업종·환경에 맞춰 부가 리포트를 더할 수 있습니다. 각 화면은 공식 가이드 v3.5 기준 캡처입니다.
              </p>
              <div className="space-y-10">
                {reports.map((r) => (
                  <div key={r.id} id={r.id} className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><r.icon className="w-4 h-4 text-primary" /></span>
                      <span className="text-2xs font-bold text-primary uppercase tracking-wider">{r.part}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{r.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 break-keep">{r.desc}</p>
                    <div className="space-y-7">
                      {r.items.map((it) => (
                        <div key={it.img} className="border-l-2 border-gray-100 pl-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">{it.name}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed break-keep">{it.desc}</p>
                          <Figure src={SI(it.img)} alt={`${it.name} 화면`} caption={`${it.name} · 공식 가이드 v3.5 화면`} w={610} h={it.h} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 용어 정리 */}
            <section id="glossary" className="scroll-mt-24 mb-14">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Users className="w-5 h-5 text-primary" /></span>
                용어 정리
              </h2>
              <dl className="divide-y divide-gray-100 border-y border-gray-100">
                {glossary.map(([term, def]) => (
                  <div key={term} className="grid sm:grid-cols-[8rem_1fr] gap-1 sm:gap-4 py-3">
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

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-3 px-5 py-5 bg-primary/5 border border-primary/10 rounded-xl">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">더 자세한 내용이 필요하신가요?</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 break-keep">
                  전체 화면 설명과 최신 기능은 공식 가이드에서 확인하실 수 있습니다. 도입·계정 관련 문의는 언제든 연락 주세요.
                </p>
                <div className="flex flex-wrap gap-2">
                  <a href={GUIDE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">공식 가이드 보기</a>
                  <Link href="/contact" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-xl hover:border-primary-light transition-colors">도입 문의</Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
