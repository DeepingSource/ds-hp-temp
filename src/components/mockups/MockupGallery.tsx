'use client';

/**
 * 목업 데모 리뷰 갤러리 (내부용)
 *
 * 모든 인터랙티브 목업을 한 페이지에서 동시에 렌더링하여
 * 콘텐츠·디자인·애니메이션을 한 번에 검토하기 위한 페이지입니다.
 *
 * - 로케일 토글(en/ko/jp): 모든 목업 문자열을 동시에 전환
 * - 애니메이션 재생/정지: active prop 전역 제어
 * - 제품 필터: StoreAgent / StoreCare / StoreInsight / 공통
 */

import { useState } from 'react';
import { type Locale, locales } from '@/lib/i18n';
import { areaTypes } from '@/data/briefingData';

import { BriefingMockup } from './BriefingMockup';
import ActionCardMockup from './ActionCardMockup';
import ChatMockup from './ChatMockup';
import GenericAiMockup from './GenericAiMockup';
import PushNotificationMockup from './PushNotificationMockup';
import StoreCareMockup from './StoreCareMockup';
import StoreInsightMockup from './StoreInsightMockup';
import StoreInsightDesktopMockup from './StoreInsightDesktopMockup';
import MultiStoreDashboardMockup from './MultiStoreDashboardMockup';
import AnonymizationMockup from './AnonymizationMockup';
// S1 다이어그램 + S2 기술 목업 (MOCKUP_PROPOSALS_v4)
import IntegratedLoopDiagram from './IntegratedLoopDiagram';
import AutonomyLadderTimeline from './AutonomyLadderTimeline';
import PriorityEngineDiagram from './PriorityEngineDiagram';
import FunnelDiagram from './FunnelDiagram';
import SpatialTrajectoryMockup from './SpatialTrajectoryMockup';
import SealSdkMockup from './SealSdkMockup';
import EdgePerfMonitorMockup from './EdgePerfMonitorMockup';
// S3~S5 목업 (MOCKUP_PROPOSALS_v4 §5)
import KakaoAlertMockup from './KakaoAlertMockup';
import HqMapDashboardMockup from './HqMapDashboardMockup';
import OrderFlowMockup from './OrderFlowMockup';
import ModelCatalogMockup from './ModelCatalogMockup';
import CaseStudyChartMockup from './CaseStudyChartMockup';
import FiveQuestionsMockup from './FiveQuestionsMockup';
import VisionCoordinatesMockup from './VisionCoordinatesMockup';
import RoiCalculatorWidget from './RoiCalculatorWidget';
// 체험형 데모 (MOCKUP_PROPOSALS_v5)
import AlertFatigueComparison from './AlertFatigueComparison';
import PrivacyJourneyMockup from './PrivacyJourneyMockup';
import AgentDaySimulator from './AgentDaySimulator';
import StoreDayTimelapse from './StoreDayTimelapse';

type Product = 'StoreAgent' | 'StoreCare' | 'StoreInsight' | '공통';
type Device = 'phone' | 'desktop' | 'diagram' | 'tech' | 'experience';

export interface DemoItem {
  id: string;
  label: string;
  product: Product;
  device: Device;
  description: string;
  render: (props: { active: boolean; locale: Locale }) => React.ReactNode;
}

const defaultArea = areaTypes[0];

// DEMOS는 /demo 갤러리와 /demo/harness(3폭×3로케일 검증, MM 0-6)가 공유한다.
export const DEMOS: DemoItem[] = [
  {
    id: 'briefing',
    label: '데일리 브리핑',
    product: 'StoreAgent',
    device: 'phone',
    description: '시간대별 상권·날씨 기반 아침 브리핑. 카드 순차 등장 + 체크리스트 애니메이션.',
    render: ({ locale }) => (
      <BriefingMockup area={defaultArea} scenario={defaultArea.scenarios.morning} locale={locale} />
    ),
  },
  {
    id: 'action-card',
    label: '액션 카드',
    product: 'StoreAgent',
    device: 'phone',
    description: '실행 권장 항목을 카드로 제시. 우선순위·완료 상태 전환 애니메이션.',
    render: ({ active, locale }) => <ActionCardMockup active={active} locale={locale} />,
  },
  {
    id: 'chat',
    label: 'AI 채팅 상담',
    product: 'StoreAgent',
    device: 'phone',
    description: '점주 질문에 대한 AI 응답 흐름. 메시지 타이핑·순차 등장 루프.',
    render: ({ active, locale }) => <ChatMockup active={active} locale={locale} />,
  },
  {
    id: 'generic-ai',
    label: '범용 AI 챗봇 (대비용)',
    product: '공통',
    device: 'desktop',
    description: '홈 비교 섹션 좌측 데모 — 매장을 볼 수 없어 일반론만 답하는 무채색 데스크톱 챗봇. 1회 재생 후 정지 + ↻.',
    render: ({ active, locale }) => <GenericAiMockup active={active} locale={locale} />,
  },
  {
    id: 'push',
    label: '푸시 알림',
    product: 'StoreAgent',
    device: 'phone',
    description: '잠금화면 푸시 알림 시퀀스. 알림 슬라이드 인/아웃 루프.',
    render: ({ active, locale }) => <PushNotificationMockup active={active} locale={locale} />,
  },
  {
    id: 'storecare',
    label: '이상 감지·알림',
    product: 'StoreCare',
    device: 'phone',
    description: '평온 → 감지 → 알림 → 해결 4단계 위상 전환 루프.',
    render: ({ active, locale }) => <StoreCareMockup active={active} locale={locale} />,
  },
  {
    id: 'storeinsight-mobile',
    label: '모바일 인사이트',
    product: 'StoreInsight',
    device: 'phone',
    description: '모바일 매장 분석 요약. 지표 카운트업·차트 등장 애니메이션.',
    render: ({ active, locale }) => <StoreInsightMockup active={active} locale={locale} />,
  },
  {
    id: 'storeinsight-desktop',
    label: '데스크톱 대시보드',
    product: 'StoreInsight',
    device: 'desktop',
    description: '데스크톱 매장 분석 대시보드. 위젯·차트 종합 뷰.',
    render: ({ active, locale }) => <StoreInsightDesktopMockup active={active} locale={locale} />,
  },
  {
    id: 'multistore',
    label: '멀티 매장 대시보드',
    product: 'StoreInsight',
    device: 'desktop',
    description: '여러 매장 통합 모니터링 뷰 (MacBook 프레임).',
    render: ({ active, locale }) => (
      <MultiStoreDashboardMockup active={active} locale={locale} device="macbook" />
    ),
  },
  {
    id: 'anonymization',
    label: '익명화 데모',
    product: '공통',
    device: 'phone',
    description: '영상 내 인물 익명화 처리 전/후 시퀀스.',
    render: ({ active, locale }) => <AnonymizationMockup active={active} locale={locale} />,
  },

  // ── S1 다이어그램 4종 (회색조+브랜드블루) ──
  {
    id: 'integrated-loop',
    label: '#1 통합 신호 루프',
    product: '공통',
    device: 'diagram',
    description: 'CCTV·POS·컨텍스트 → SEAL → 이벤트 허브 → Insight·Care·Agent → 사람 되먹임. 신호 펄스 순환.',
    render: ({ active, locale }) => <IntegratedLoopDiagram active={active} locale={locale} />,
  },
  {
    id: 'autonomy-ladder',
    label: '#2 자율도 사다리 L0→L5',
    product: 'StoreAgent',
    device: 'diagram',
    description: '자율 주행 매장 진화 타임라인. 노드 클릭 → 대표 카테고리·진화 조건. 현재 위치 마커 없음.',
    render: ({ active, locale }) => <AutonomyLadderTimeline active={active} locale={locale} />,
  },
  {
    id: 'priority-engine',
    label: '#3 우선순위 엔진',
    product: 'StoreAgent',
    device: 'diagram',
    description: '입력→점수→클래스 P1~P4→1~3순위→사람→학습 되먹임. 본사向 영문 라벨.',
    render: ({ active, locale }) => <PriorityEngineDiagram active={active} locale={locale} />,
  },
  {
    id: 'funnel',
    label: '#4 전환 퍼널',
    product: 'StoreInsight',
    device: 'diagram',
    description: 'visit→stay→gaze→pick→buy 퍼널 + 단계별 이탈. 캐노니컬 파생, 가설 카드 1장.',
    render: ({ active, locale }) => <FunnelDiagram active={active} locale={locale} />,
  },

  // ── S2 기술 페이지 다크 목업 3종 ──
  {
    id: 'spatial-trajectory',
    label: '#5 MTMC 멀티캠 궤적',
    product: '공통',
    device: 'tech',
    description: '카메라 3대를 잇는 한 사람의 점선 궤적 + 공유 ID. 얼굴은 익명화 도형. (다크)',
    render: ({ active, locale }) => <SpatialTrajectoryMockup active={active} locale={locale} />,
  },
  {
    id: 'seal-sdk',
    label: '#6 SEAL SDK 에디터',
    product: '공통',
    device: 'tech',
    description: '다크 IDE 의사코드 타이핑 → 터미널 로그 → 익명화 프레임. Example 뱃지. (MacBook·다크)',
    render: ({ active, locale }) => <SealSdkMockup active={active} locale={locale} />,
  },
  {
    id: 'edge-perf',
    label: '#7 온디바이스 성능 모니터',
    product: '공통',
    device: 'tech',
    description: 'FPS·지연·대역폭 절감 게이지 + 24h 스파크라인 + "원본 영상은 장치를 떠나지 않습니다". (다크)',
    render: ({ active, locale }) => <EdgePerfMonitorMockup active={active} locale={locale} />,
  },

  // ── S3~S5 신규 목업 ──
  {
    id: 'kakao-alert',
    label: '#8 알림톡 알림 피드',
    product: 'StoreCare',
    device: 'phone',
    description: 'ko 알림톡 / jp LINE / en iOS 푸시 스킨. 30자 본문 + [승인] + 요금 카드(시급 34원).',
    render: ({ active, locale }) => <KakaoAlertMockup active={active} locale={locale} />,
  },
  {
    id: 'hq-map',
    label: '#9 본부 217점 지도',
    product: '공통',
    device: 'desktop',
    description: '한국 지도 217점(203/10/4) + KPI 1,353건·89%·2.4h. "모든 공간을, 완벽하게."',
    render: ({ active, locale }) => <HqMapDashboardMockup active={active} locale={locale} />,
  },
  {
    id: 'order-flow',
    label: '#10 발주 플로우',
    product: 'StoreAgent',
    device: 'phone',
    description: '[승인] → 발주서 생성 → 전송·입고 타임라인 3스텝 + 효과 환류 카운터(캐노니컬).',
    render: ({ active, locale }) => <OrderFlowMockup active={active} locale={locale} />,
  },
  {
    id: 'model-catalog',
    label: '#11 모델 카탈로그',
    product: '공통',
    device: 'desktop',
    description: '13종 모델 표 ↔ CCTV 스틸 오버레이 교체(모자이크·포즈·동선·결품). 행 클릭 전환.',
    render: ({ active, locale }) => <ModelCatalogMockup active={active} locale={locale} />,
  },
  {
    id: 'case-study-chart',
    label: '#12 케이스 before/after',
    product: 'StoreCare',
    device: 'diagram',
    description: '도입 시점 세로선 + CCTV 확인 45→15분(−67%) 라인차트 + 델타 칩 3개. (실측 53명)',
    render: ({ active, locale }) => <CaseStudyChartMockup active={active} locale={locale} />,
  },
  {
    id: 'five-questions',
    label: '#13a 다섯 질문',
    product: '공통',
    device: 'diagram',
    description: '헌장 행동 강령 5카드 + ✓통과/✗탈락 2열. A1 확정 카피.',
    render: ({ active, locale }) => <FiveQuestionsMockup active={active} locale={locale} />,
  },
  {
    id: 'roi-calculator',
    label: '#14 ROI 계산기',
    product: '공통',
    device: 'diagram',
    description: '입력 3(매장 수·일매출·운영시간) → 출력 3(결품·인건비 절감·회수). 박람회 §4 산식.',
    render: ({ active, locale }) => <RoiCalculatorWidget active={active} locale={locale} />,
  },
  {
    id: 'vision-coordinates',
    label: '#13b Vision 2031 좌표',
    product: '공통',
    device: 'tech',
    description: '5년 후 5좌표 카드. A4 확정 카피. (다크 비전 톤)',
    render: ({ active, locale }) => <VisionCoordinatesMockup active={active} locale={locale} />,
  },

  // ── 체험형 데모 (v5 Experience) ──
  {
    id: 'day-timelapse',
    label: '#16 강남역점의 하루 (타임랩스)',
    product: '공통',
    device: 'experience',
    description: '24종이 공유하는 세계관 종합. 스크럽/재생 + 시간대 차트·히트맵·이벤트 피드·KPI. 슬라이더로 직접 조작.',
    render: ({ active, locale }) => <StoreDayTimelapse active={active} locale={locale} />,
  },
  {
    id: 'alert-fatigue',
    label: '#17 알림 피로 비교',
    product: 'StoreAgent',
    device: 'experience',
    description: '"하루 1,353건 vs 3장" — 좌 소란(블러 노이즈) / 우 고요(우선순위 3장) 대비.',
    render: ({ active, locale }) => <AlertFatigueComparison active={active} locale={locale} />,
  },
  {
    id: 'privacy-journey',
    label: '#18 프라이버시 여정',
    product: '공통',
    device: 'experience',
    description: '프레임 한 장의 생애주기 5단계. ④ 원본 폐기(픽셀 디졸브) 클라이맥스. (다크)',
    render: ({ active, locale }) => <PrivacyJourneyMockup active={active} locale={locale} />,
  },
  {
    id: 'agent-simulator',
    label: '#19 에이전트와 하루 운영',
    product: 'StoreAgent',
    device: 'experience',
    description: '카드 3장을 방문자가 직접 승인/보류 → 저녁 결산. 8조합 분기, 보류도 의미. [승인]=사람의 자리.',
    render: ({ active, locale }) => <AgentDaySimulator active={active} locale={locale} />,
  },
];

const PRODUCTS: (Product | '전체')[] = ['전체', 'StoreAgent', 'StoreCare', 'StoreInsight', '공통'];

const PRODUCT_BADGE: Record<Product, string> = {
  StoreAgent: 'bg-primary-lighter text-primary ring-primary/20',
  StoreCare: 'bg-rose-50 text-rose-700 ring-rose-200',
  StoreInsight: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  공통: 'bg-gray-100 text-gray-600 ring-gray-200',
};

export default function MockupGallery() {
  const [locale, setLocale] = useState<Locale>('ko');
  const [active, setActive] = useState(true);
  const [filter, setFilter] = useState<Product | '전체'>('전체');

  const visible = DEMOS.filter((d) => filter === '전체' || d.product === filter);
  const phones = visible.filter((d) => d.device === 'phone');
  const desktops = visible.filter((d) => d.device === 'desktop');
  const diagrams = visible.filter((d) => d.device === 'diagram');
  const techs = visible.filter((d) => d.device === 'tech');
  const experiences = visible.filter((d) => d.device === 'experience');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ── 상단 컨트롤 바 (sticky) ── */}
      <header className="sticky top-16 z-20 border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-bold">목업 데모 리뷰</h1>
              <p className="text-xs text-gray-500">
                콘텐츠 · 디자인 · 애니메이션을 한 페이지에서 검토 · 총 {visible.length}종
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* 로케일 토글 */}
              <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`rounded-md px-3 py-1 text-xs font-medium uppercase transition-colors ${
                      locale === l ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              {/* 애니메이션 재생/정지 */}
              <button
                onClick={() => setActive((v) => !v)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium ring-1 transition-colors ${
                  active
                    ? 'bg-primary/10 text-primary ring-primary/20'
                    : 'bg-gray-100 text-gray-500 ring-gray-200'
                }`}
              >
                {active ? '⏸ 애니메이션 정지' : '▶ 애니메이션 재생'}
              </button>
            </div>
          </div>

          {/* 제품 필터 */}
          <div className="mt-3 flex flex-wrap gap-2">
            {PRODUCTS.map((p) => (
              <button
                key={p}
                onClick={() => setFilter(p)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  filter === p
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {/* ── 체험형 데모 (v5): 풀폭 스택, 최상단 간판 ── */}
        {experiences.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-primary">
              ✦ Experience · {experiences.length}
            </h2>
            <div className="space-y-10">
              {experiences.map((demo) => (
                <DemoCard key={demo.id} demo={demo} locale={locale} active={active} wide />
              ))}
            </div>
          </section>
        )}

        {/* ── 폰 목업: 카드 그리드 ── */}
        {phones.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-gray-400">
              Phone · {phones.length}
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {phones.map((demo) => (
                <DemoCard key={demo.id} demo={demo} locale={locale} active={active} />
              ))}
            </div>
          </section>
        )}

        {/* ── 데스크톱/와이드 목업: 풀폭 스택 ── */}
        {desktops.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-gray-400">
              Desktop · {desktops.length}
            </h2>
            <div className="space-y-10">
              {desktops.map((demo) => (
                <DemoCard key={demo.id} demo={demo} locale={locale} active={active} wide />
              ))}
            </div>
          </section>
        )}

        {/* ── S1 다이어그램: 풀폭 스택 ── */}
        {diagrams.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-gray-400">
              Diagram · {diagrams.length}
            </h2>
            <div className="space-y-10">
              {diagrams.map((demo) => (
                <DemoCard key={demo.id} demo={demo} locale={locale} active={active} wide />
              ))}
            </div>
          </section>
        )}

        {/* ── S2 기술 페이지 목업 (다크): 풀폭 스택 ── */}
        {techs.length > 0 && (
          <section>
            <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-gray-400">
              Dark · Technology / Vision · {techs.length}
            </h2>
            <div className="space-y-10">
              {techs.map((demo) => (
                <DemoCard key={demo.id} demo={demo} locale={locale} active={active} wide />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function DemoCard({
  demo,
  locale,
  active,
  wide = false,
}: {
  demo: DemoItem;
  locale: Locale;
  active: boolean;
  wide?: boolean;
}) {
  return (
    <article
      id={demo.id}
      className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      <div className="flex items-start justify-between gap-3 border-b border-gray-100 px-5 py-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">{demo.label}</h3>
          <p className="mt-1 text-xs leading-relaxed text-gray-500">{demo.description}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-2xs font-medium ring-1 ${PRODUCT_BADGE[demo.product]}`}
        >
          {demo.product}
        </span>
      </div>

      <div
        className={`flex flex-1 items-center justify-center bg-gray-100 p-6 ${
          wide ? 'min-h-[420px]' : 'min-h-[560px]'
        }`}
      >
        <div className={wide ? 'w-full max-w-4xl' : 'w-full max-w-[380px]'}>
          {demo.render({ active, locale })}
        </div>
      </div>
    </article>
  );
}
