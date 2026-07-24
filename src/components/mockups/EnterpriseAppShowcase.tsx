'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ThumbsUp, ThumbsDown, ListPlus, StickyNote, ChevronDown, Send,
} from 'lucide-react';
import SlidingIndicator from '@/components/ui/SlidingIndicator';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { useCountUp } from '@/hooks/useCountUp';
import { motionEnter } from '@/lib/mockup-motion';
import { ease } from '@/lib/easing';
import { SAAI_COLORS, SAAI_MOTION } from '@/lib/mockup-tokens.gen';
import { type Locale } from '@/lib/i18n';

/**
 * EnterpriseAppShowcase — store agent의 B2B 엔터프라이즈 웹앱을 사이트 디자인 시스템으로
 * "다시 그린" 목업(실제 스크린샷이 아닌 재현). 좌: 자연어 채팅 · 우: 전용 분석 화면.
 * 6탭(아침브리핑·차트질문·발주·선반·직원·CCTV). 소스: storeagent_demo_v2_20scenes.
 * 실제 앱의 초록 액센트는 사이트 One-Blue로 통일, 데모 매장명은 중립(강남역점)으로 치환.
 * 수치는 소스 스크린샷 발췌(예시).
 *
 * 웹 화면 중심 라이브 데모: 고정 크기 브라우저 프레임 + 6탭 자동 순환(hover 시 일시정지).
 * 탭 진입마다 채팅이 순차로 도착하고(질문→처리→핵심), 우측 화면이 열리며 차트가 자라고
 * 수치가 카운트업된다. 클릭하면 즉시 그 시나리오로. reduced-motion이면 정적(최종 상태).
 * SVG 라인은 이 스택에서 framer로 하이드레이션되지 않으므로 도넛은 CSS 트랜지션으로 채운다.
 *
 * MockupViewport 예외(§2-B): 섹션형 인터랙티브 데모(헤딩+6탭+내부 스크롤 페인) —
 * 유동 폭·반응형이 설계 의도이며 lg:h-[560px]는 스크롤 페인 높이라 고정 캔버스 부적합.
 * D11: 수치(3,332 등)와 '강남역점' 명칭의 canonical 재산정은 Phase 2(2-③) 소관 — 여기서 변경 금지.
 */

type Tri = { ko: string; en: string; jp: string };
const tri = (ko: string, en: string, jp: string): Tri => ({ ko, en, jp });

// reduced-motion을 다수의 하위 카드/KPI에 프롭 드릴링 없이 전달
const ReducedCtx = createContext(false);
const useReduced = () => useContext(ReducedCtx);

const HEADER = {
  eyebrow: tri('실제 제품 화면', 'The actual product', '実際の製品画面'),
  heading: tri('물어보면, 화면이 열립니다', 'Ask, and the screen opens', '尋ねれば、画面が開く'),
  sub: tri(
    '좌측에 자연어로 물으면, 우측에 전용 분석 화면이 열립니다. 발주·선반 재배치·직원 효율까지 — 대화가 곧 운영 화면이 됩니다.',
    'Ask in plain language on the left; a dedicated analysis screen opens on the right. Ordering, shelf layout, staffing — the conversation becomes the operations screen.',
    '左に自然な言葉で尋ねると、右に専用の分析画面が開きます。発注・棚replace・スタッフ効率まで — 会話がそのまま運営画面になります。',
  ),
  disclaimer: tri(
    '화면은 예시이며 실제 서비스와 다를 수 있습니다.',
    'Screens are illustrative and may differ from the actual service.',
    '画面は例であり、実際のサービスと異なる場合があります。',
  ),
};

const STORE = tri('강남역점', 'Gangnam Station', '江南駅店');
const APP = tri('store agent', 'store agent', 'store agent');

const TAB_LABELS: { key: string; label: Tri }[] = [
  { key: 'briefing', label: tri('아침 브리핑', 'Morning brief', '朝ブリーフィング') },
  { key: 'chart', label: tri('차트 질문', 'Chart → question', 'チャート質問') },
  { key: 'order', label: tri('발주 추천', 'Ordering', '発注推奨') },
  { key: 'shelf', label: tri('선반 재배치', 'Shelf layout', '棚replace') },
  { key: 'staff', label: tri('직원 효율', 'Staff', 'スタッフ効率') },
  { key: 'cctv', label: tri('실시간 CCTV', 'Live CCTV', 'リアルタイムCCTV') },
];

// 좌측 공통 추천 질문 칩
const SUGGESTIONS: Tri[] = [
  tri('지금 매장 혼잡도는?', 'How busy is the store now?', '今の店舗の混雑は?'),
  tri('선반 재배치 추천해줘', 'Suggest a shelf layout', '棚replaceを提案して'),
  tri('도시락 발주 추천해줘', 'Recommend a lunchbox order', '弁当の発注を提案して'),
  tri('어제 매출 분석해줘', "Analyze yesterday's sales", '昨日の売上を分析して'),
];

// 각 탭의 좌측 채팅(사용자 질문 + 진행상황 + AI 핵심 답변)
const CHAT: Record<string, { user: Tri; progress: Tri; core: Tri }> = {
  briefing: {
    user: tri('오늘 아침 브리핑 해줘', 'Give me the morning brief', '今朝のブリーフィングを'),
    progress: tri('매장 전체 브리핑', 'Whole-store brief', '店舗全体ブリーフィング'),
    core: tri(
      '최근 7일 매출은 +48.2%, 방문객은 −54.2% — 흐름이 엇갈렸습니다. 오늘은 폐기 상위 품목 발주를 낮추고, 상위 수익 선반부터 재배치하는 것이 우선입니다.',
      'Last 7 days: revenue +48.2% while visitors fell −54.2% — a diverging trend. Today: lower orders on high-waste items and re-lay the top-revenue shelves first.',
      '直近7日は売上+48.2%、来店−54.2%と傾向が分かれました。本日は廃棄上位品の発注を下げ、上位収益の棚から再配置するのが優先です。',
    ),
  },
  chart: {
    user: tri('전환율 차트 눌러서 왜 떨어졌는지 봐줘', 'Tap the conversion chart — why did it drop?', '転換率チャートを押して、なぜ下がったか'),
    progress: tri('전환율 하락 원인', 'Conversion drop cause', '転換率低下の原因'),
    core: tri(
      '차트를 누르면 그 지표에 대한 질문이 자동으로 만들어집니다. 전환율은 최근 3일 6.4%→2.1%로 떨어졌고, 같은 구간 방문은 늘었지만 계산대 통과가 줄었습니다. 계산대 공백 시간이 겹쳐 이탈이 커진 것으로 보입니다.',
      'Tapping a chart auto-generates a question about that metric. Conversion fell 6.4%→2.1% over 3 days; visits rose but checkout throughput dropped — checkout gaps likely drove the walk-offs.',
      'チャートを押すと、その指標に関する質問が自動生成されます。転換率は直近3日で6.4%→2.1%に低下、来店は増えたがレジ通過が減少 — レジ空白が重なり離脱が増えたとみられます。',
    ),
  },
  order: {
    user: tri('도시락 발주 추천해줘', 'Recommend a lunchbox order', '弁当の発注を提案して'),
    progress: tri('카테고리 발주량 예측', 'Category order forecast', 'カテゴリ発注量予測'),
    core: tri(
      '도시락 총 16개 발주 추천(12개 제품). 내일 비 예보(55.8mm)로 평소 대비 15% 감량 적용했습니다. 비 오는 날 도시락 판매가 평균 65%까지 떨어진 적이 있어 보수적으로 잡았습니다. 뷔페한상 11찬도시락은 기회 손실 우려가 있어 발주 상향을 검토하세요.',
      'Recommending 16 lunchboxes total (12 SKUs). Applied a −15% cut for tomorrow’s rain forecast (55.8mm) — rainy-day lunchbox sales have dropped up to 65%, so this is conservative. Consider raising the 11-side buffet box to avoid lost sales.',
      '弁当を合計16個推奨(12商品)。明日の雨予報(55.8mm)で平常比−15%を適用。雨の日は弁当販売が最大65%落ちた実績があり保守的に設定。11品幕の内弁当は機会損失の懸念があり発注上げを検討ください。',
    ),
  },
  shelf: {
    user: tri('선반 재배치 추천해줘', 'Suggest a shelf re-layout', '棚replaceを提案して'),
    progress: tri('재배치 전략 생성', 'Layout strategy', 'replace戦略生成'),
    core: tri(
      '전략 7개를 생성했습니다. 최상위는 "선반 효율 최적화"로 교환 5건에 월 +440,300원 예상입니다. 라면2 ⇄ 초콜릿2 등 인접 배치를 바꾸면 동선 상 노출과 동반 구매가 늘어납니다. 우측에서 Before/After를 시뮬레이션해 보세요.',
      'Generated 7 strategies. Top is “Shelf efficiency” — 5 swaps for ~+₩440,300/month. Swapping adjacencies like Ramen-2 ⇄ Chocolate-2 lifts exposure and basket pairing along the path. Simulate before/after on the right.',
      '戦略を7つ生成しました。最上位は「棚効率最適化」で交換5件・月+440,300ウォン見込み。ラーメン2 ⇄ チョコ2など隣接を入替えると動線上の露出と併買が増えます。右でBefore/Afterをシミュレーションできます。',
    ),
  },
  staff: {
    user: tri('직원 효율성 분석해줘', 'Analyze staff efficiency', 'スタッフ効率を分析して'),
    progress: tri('직원 효율성 분석', 'Staff efficiency', 'スタッフ効率分析'),
    core: tri(
      '최근 14일 일평균 방문 3,332명, 직원 검출 367건, 영수증 408건으로 전환율 4.5%입니다. 피크는 11·12·16시에 몰려 있어 점심 전후와 오후 초반 대응이 핵심입니다. 피크 시간대에 1인 고정보다 탄력 배치로 응대 밀도를 높이는 쪽이 맞습니다.',
      'Over 14 days: 3,332 daily visits, 367 staff detections, 408 receipts — 4.5% conversion. Peaks cluster at 11:00, 12:00, 16:00, so around-lunch and early-afternoon coverage matters most. Flexible staffing beats a fixed single at peak.',
      '直近14日で来店3,332人/日、スタッフ検出367件、レシート408件、転換率4.5%。ピークは11・12・16時に集中し、昼前後と午後前半の対応が要。ピーク帯は1人固定より弾力配置で応対密度を上げるのが適切です。',
    ),
  },
  cctv: {
    user: tri('도시락 코너는 지금 어때?', "How's the lunchbox corner now?", '弁当コーナーは今どう?'),
    progress: tri('도시락 코너 혼잡', 'Lunchbox corner load', '弁当コーナー混雑'),
    core: tri(
      '도시락/즉석식 코너는 지금 보통입니다. 현재 고객 7명 수준이고 권고는 현 인력 유지입니다. 다만 짧은 시간 변동이 있을 수 있어 10~20분만 더 지켜보면 됩니다.',
      'The lunchbox / grab-and-go corner is moderate right now — about 7 customers, and the recommendation is to keep current staffing. Short-term swings are possible, so watch for another 10–20 minutes.',
      '弁当・即席コーナーは今「普通」です。現在の客数は約7名、推奨は現行人員の維持。短時間の変動があり得るため、あと10〜20分見守れば十分です。',
    ),
  },
};

export default function EnterpriseAppShowcase({ locale = 'en' }: { locale?: Locale }) {
  const reduced = usePrefersReducedMotion();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ once: false });
  const { step, goTo, hoverProps } = useMockupLoop({
    steps: TAB_LABELS.length,
    interval: 4600,
    active: isVisible && !reduced,
    pauseOnHover: true,
  });
  const active = TAB_LABELS[step]?.key ?? 'briefing';
  const T = (t: Tri) => t[locale];

  return (
    <ReducedCtx.Provider value={reduced}>
      <section id="demo" ref={ref} className="py-20 lg:py-28 bg-slate-50 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* 헤더 */}
          <div className={`text-center mb-12 ${isVisible ? 'scroll-visible' : 'scroll-hidden'}`}>
            <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{T(HEADER.eyebrow)}</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 break-keep">{T(HEADER.heading)}</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto break-keep">{T(HEADER.sub)}</p>
          </div>

          {/* 브라우저 크롬 프레임 (hover 시 자동재생 일시정지) */}
          <div
            {...hoverProps}
            className={`rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden ${isVisible ? 'scroll-visible delay-200' : 'scroll-hidden'}`}
          >
            {/* 크롬 상단바 */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-gray-50">
              {/* 실 OS 크롬 재현 색(macOS 신호등) — SAAI 토큰 치환 대상 아님 */}
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex items-center gap-2 ml-2">
                <Image src="/images/saai-symbol.svg" alt="" width={16} height={16} aria-hidden="true" />
                <span className="text-sm font-bold text-gray-900 lowercase">{T(APP)}</span>
              </div>
              <div className="ml-auto flex items-center gap-2.5">
                <span className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-600">
                  {T(STORE)} <ChevronDown className="w-3 h-3" aria-hidden="true" />
                </span>
              </div>
            </div>

            {/* 탭 바 */}
            <div role="tablist" aria-label={T(HEADER.heading)} className="flex gap-1 px-2 sm:px-3 pt-2 border-b border-gray-100 overflow-x-auto">
              {TAB_LABELS.map((tab, i) => {
                const isActive = active === tab.key;
                return (
                  <button
                    key={tab.key}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => goTo(i)}
                    className={`relative whitespace-nowrap px-3 sm:px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                      isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {T(tab.label)}
                    {isActive && <SlidingIndicator layoutId="enterprise-tab" className="absolute left-2 right-2 bottom-0 h-0.5 rounded-full bg-primary" />}
                  </button>
                );
              })}
            </div>

            {/* 2분할 본문 — 고정 높이(웹 화면), 내부 스크롤 */}
            <div className="grid lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:h-[560px]">
              {/* 좌: 채팅 패널 (탭 진입마다 순차 도착) */}
              <div key={`chat-${active}`} className="min-h-0 lg:h-[560px] lg:overflow-y-auto border-b lg:border-b-0 border-gray-100">
                <ChatPanel tabKey={active} T={T} />
              </div>
              {/* 우: 전용 콘텐츠 패널 (화면이 열리며 빌드업) */}
              <div key={`content-${active}`} className="relative min-h-0 lg:h-[560px] lg:overflow-y-auto bg-white p-5 sm:p-6 lg:border-l border-gray-100">
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  transition={{ ...motionEnter, delay: 0.55 }}
                >
                  <ContentPanel tabKey={active} T={T} />
                </motion.div>
                {/* "화면이 열립니다" 링 플래시 */}
                {!reduced && (
                  <motion.div
                    className="pointer-events-none absolute inset-0 ring-2 ring-inset ring-primary/40"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 0.55 }}
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-4 text-center">{T(HEADER.disclaimer)}</p>
        </div>
      </section>
    </ReducedCtx.Provider>
  );
}

// ── 좌측 채팅 패널 (공통, 순차 도착) ────────────────────────────────────────────
function ChatPanel({ tabKey, T }: { tabKey: string; T: (t: Tri) => string }) {
  const reduced = useReduced();
  const c = CHAT[tabKey];
  // 질문(0) → 처리(0.5) → 핵심 답변(0.85) → 액션/추천/입력 순으로 도착
  const enter = (delay: number) =>
    reduced
      ? {}
      : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { ...motionEnter, delay } };

  return (
    <div className="h-full bg-gray-100/70 p-5 sm:p-6 flex flex-col gap-4">
      {/* 사용자 말풍선 */}
      <motion.div className="flex justify-end" {...enter(0.05)}>
        <div className="rounded-2xl border border-primary/30 bg-white px-4 py-2.5 text-sm text-gray-800 max-w-[85%] break-keep">
          {T(c.user)}
        </div>
      </motion.div>

      {/* 진행 상황 카드 */}
      <motion.div className="rounded-xl border border-gray-200 bg-white px-4 py-3" {...enter(0.5)}>
        <p className="text-2xs font-medium text-gray-400 mb-1">{T(tri('진행 상황 · 1/1 단계', 'Progress · step 1/1', '進行状況 · 1/1段階'))}</p>
        <p className="flex items-center gap-1.5 text-xs font-medium text-gray-700">
          <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xs">✓</span>
          {T(c.progress)}
        </p>
      </motion.div>

      {/* AI 핵심 답변 */}
      <motion.div {...enter(0.85)}>
        <p className="text-sm text-gray-800 leading-relaxed break-keep">
          <span className="font-bold text-primary">{T(tri('핵심', 'Key', '要点'))}: </span>
          {T(c.core)}
        </p>
        <button className="mt-3 inline-flex items-center gap-1 text-xs text-gray-400" aria-hidden="true">
          <ChevronDown className="w-3.5 h-3.5" /> {T(tri('상세', 'Details', '詳細'))}
        </button>
      </motion.div>

      {/* 피드백/실행 액션 */}
      <motion.div className="flex items-center gap-3 text-2xs text-gray-400 border-t border-gray-200 pt-3" {...enter(1.05)}>
        <span className="inline-flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" /> </span>
        <span className="inline-flex items-center gap-1"><ThumbsDown className="w-3.5 h-3.5" /> </span>
        <span className="inline-flex items-center gap-1 ml-1"><ListPlus className="w-3.5 h-3.5" /> {T(tri('Task로 등록', 'Add as task', 'タスク登録'))}</span>
        <span className="inline-flex items-center gap-1"><StickyNote className="w-3.5 h-3.5" /> {T(tri('메모', 'Note', 'メモ'))}</span>
      </motion.div>

      {/* 추천 질문 칩 */}
      <motion.div className="mt-auto flex flex-wrap gap-1.5 pt-2" {...enter(1.15)}>
        {SUGGESTIONS.map((s, i) => (
          <span key={i} className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-2xs text-gray-500">{T(s)}</span>
        ))}
      </motion.div>

      {/* 입력창 */}
      <motion.div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2" {...enter(1.2)}>
        <span className="flex-1 text-2xs text-gray-300">{T(tri('무엇이든 물어보세요…', 'Ask anything…', '何でも聞いてください…'))}</span>
        <span className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center" aria-hidden="true"><Send className="w-3 h-3 text-white" /></span>
      </motion.div>
    </div>
  );
}

// ── 우측 콘텐츠 패널 (탭별) ───────────────────────────────────────────────────
function ContentPanel({ tabKey, T }: { tabKey: string; T: (t: Tri) => string }) {
  switch (tabKey) {
    case 'briefing': return <BriefingPanel T={T} />;
    case 'chart': return <ChartQuestionPanel T={T} />;
    case 'order': return <OrderPanel T={T} />;
    case 'shelf': return <ShelfPanel T={T} />;
    case 'staff': return <StaffPanel T={T} />;
    case 'cctv': return <CctvPanel T={T} />;
    default: return null;
  }
}

// 우측 패널 공통 헤더
function PanelHead({ T, crumb, title, right }: { T: (t: Tri) => string; crumb?: Tri; title: Tri; right?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 mb-5">
      <div>
        {crumb && (
          <p className="inline-flex items-center gap-1 text-2xs text-gray-400 mb-1">
            <ArrowLeft className="w-3 h-3" aria-hidden="true" /> {T(crumb)}
          </p>
        )}
        <h3 className="text-lg font-bold text-gray-900 break-keep">{T(title)}</h3>
      </div>
      {right}
    </div>
  );
}

// 숫자 카운트업 — 정수 값만 애니메이션(소수/기호 혼합은 정적). reduced-motion이면 즉시 최종값.
function CountUp({ value }: { value: string }) {
  const reduced = useReduced();
  const m = value.match(/^([^\d.]*)(\d[\d,]*)([^\d]*)$/);
  const target = m ? parseInt(m[2].replace(/,/g, ''), 10) : 0;
  const n = useCountUp(target, !!m && !reduced, 900);
  if (!m || reduced) return <>{value}</>;
  return <>{m[1]}{n.toLocaleString()}{m[3]}</>;
}

// KPI 카드
function Kpi({ label, value, note, alert }: { label: string; value: string; note?: string; alert?: boolean }) {
  return (
    <div className={`rounded-xl border p-3.5 ${alert ? 'border-primary/40 bg-primary/5' : 'border-gray-100 bg-white'}`}>
      <p className="text-2xs text-gray-500 mb-1">{label}</p>
      <p className={`text-xl font-bold ${alert ? 'text-primary' : 'text-gray-900'}`}><CountUp value={value} /></p>
      {note && <p className="text-3xs text-gray-400 mt-0.5">{note}</p>}
    </div>
  );
}

// 자라나는 막대 하나 (scaleY, bottom origin). reduced면 즉시 최종 높이.
function Bar({ pct, className, delay = 0 }: { pct: number; className: string; delay?: number }) {
  const reduced = useReduced();
  return (
    <motion.div
      className={className}
      style={{ height: `${pct}%`, transformOrigin: 'bottom' }}
      initial={reduced ? false : { scaleY: 0 }}
      animate={reduced ? undefined : { scaleY: 1 }}
      transition={{ duration: 0.45, delay, ease: ease.outQuint }}
    />
  );
}

// 미니 차트 카드 (CSS 바, 진입 시 자라남)
function MiniCard({ title, unit, bars, accent = false }: { title: string; unit?: string; bars: number[]; accent?: boolean }) {
  const max = Math.max(...bars, 1);
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-bold text-gray-800">{title}</p>
        {unit && <p className="text-3xs text-gray-400">{unit}</p>}
      </div>
      <div className="flex items-end gap-0.5 h-14">
        {bars.map((b, i) => (
          <Bar
            key={i}
            pct={Math.max(6, (b / max) * 100)}
            delay={0.65 + i * 0.03}
            className={`flex-1 rounded-t-sm ${accent ? 'bg-primary/70' : 'bg-primary/30'}`}
          />
        ))}
      </div>
    </div>
  );
}

// 탭 A — 아침 브리핑 (8차트 오버뷰)
function BriefingPanel({ T }: { T: (t: Tri) => string }) {
  const charts: { title: Tri; unit: Tri; bars: number[]; accent?: boolean }[] = [
    { title: tri('일별 방문자수', 'Daily visitors', '日別来店数'), unit: tri('명', 'visitors', '人'), bars: [62, 78, 70, 90, 55, 84, 72, 95, 66, 88], accent: true },
    { title: tri('남녀 방문 비율', 'Gender split', '男女比'), unit: tri('%/일', '%/day', '%/日'), bars: [55, 60, 52, 58, 63, 50, 57, 61, 54, 59] },
    { title: tri('연령별 방문', 'By age', '年齢別'), unit: tri('%/일', '%/day', '%/日'), bars: [40, 45, 38, 50, 42, 48, 44, 46, 41, 47] },
    { title: tri('전환율', 'Conversion', '転換率'), unit: tri('방문→영수증', 'visit→receipt', '来店→レシート'), bars: [20, 35, 30, 48, 42, 55, 50, 62, 40, 22], accent: true },
    { title: tri('일별 품절 추세', 'Stockouts', '品切れ推移'), unit: tri('제품 수', 'SKUs', '商品数'), bars: [30, 55, 40, 70, 60, 82, 50, 74, 45, 66] },
    { title: tri('일별 청소 점수', 'Cleaning score', '清掃スコア'), unit: tri('0–100', '0–100', '0–100'), bars: [70, 68, 72, 65, 74, 66, 71, 69, 73, 67] },
    { title: tri('장바구니 분석', 'Basket pairs', 'かご分析'), unit: tri('동반 구매', 'co-purchase', '併買'), bars: [80, 60, 45, 38, 30, 25, 20, 18, 15, 12] },
    { title: tri('매대 전환율', 'Shelf pickup', '棚転換率'), unit: tri('응시→픽업', 'gaze→pickup', '注視→ピック'), bars: [12, 18, 15, 22, 20, 24, 19, 21, 17, 23], accent: true },
  ];
  return (
    <>
      <PanelHead
        T={T}
        title={tri('매장 오버뷰', 'Store overview', '店舗オーバービュー')}
        right={<span className="rounded-lg bg-primary px-2.5 py-1 text-2xs font-bold text-white">{T(tri('최근 2주', 'Last 2 weeks', '直近2週'))}</span>}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {charts.map((c) => <MiniCard key={c.title.ko} title={T(c.title)} unit={T(c.unit)} bars={c.bars} accent={c.accent} />)}
      </div>
      <p className="text-2xs text-gray-400 mt-3">{T(tri('고객 분석 4 · 매장 분석 4 — 총 8개 지표', 'Customer 4 · Store 4 — 8 metrics', '顧客4 · 店舗4 — 計8指標'))}</p>
    </>
  );
}

// 탭 B — 차트를 누르면 질문이 된다
function ChartQuestionPanel({ T }: { T: (t: Tri) => string }) {
  const bars = [22, 30, 28, 41, 38, 52, 47, 60, 55, 44, 33, 25, 21, 18];
  return (
    <>
      <PanelHead T={T} title={tri('전환율 상세', 'Conversion detail', '転換率の詳細')} right={<span className="rounded-lg border border-primary/30 bg-primary/5 px-2.5 py-1 text-2xs font-medium text-primary">{T(tri('차트 클릭됨', 'chart tapped', 'チャート選択'))}</span>} />
      {/* 확대된 차트 */}
      <div className="rounded-xl border border-primary/20 bg-white p-4 mb-3">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-gray-900">{T(tri('전환율 (최근 14일)', 'Conversion (14 days)', '転換率(14日)'))}</p>
          <p className="text-2xs text-gray-400">{T(tri('방문→영수증 비율', 'visit→receipt', '来店→レシート'))}</p>
        </div>
        <div className="flex items-end gap-1 h-28">
          {bars.map((b, i) => (
            <Bar key={i} pct={b + 20} delay={0.6 + i * 0.03} className={`flex-1 rounded-t ${i >= 10 ? 'bg-primary' : 'bg-primary/30'}`} />
          ))}
        </div>
        <p className="text-3xs text-gray-400 mt-2">{T(tri('최근 3일 하락 구간 강조 · 6.4% → 2.1%', 'Last 3 days highlighted · 6.4% → 2.1%', '直近3日の下落を強調 · 6.4% → 2.1%'))}</p>
      </div>
      {/* 관련 차트 펼침 */}
      <div className="grid grid-cols-3 gap-2.5">
        <MiniCard title={T(tri('계산대 통과', 'Checkout', 'レジ通過'))} bars={[60, 55, 48, 40, 32, 28]} />
        <MiniCard title={T(tri('계산대 공백', 'Checkout gap', 'レジ空白'))} bars={[10, 20, 35, 50, 62, 70]} accent />
        <MiniCard title={T(tri('방문 추이', 'Visits', '来店推移'))} bars={[40, 45, 50, 55, 58, 60]} />
      </div>
    </>
  );
}

// 탭 C — 발주 추천
function OrderPanel({ T }: { T: (t: Tri) => string }) {
  const rows = [
    { name: tri('한도초과 고민없는 도시락', 'No-limit lunchbox', '限度超え不要弁当'), avg: '1.5', pred: '1.6', qty: '2', waste: '16.7', margin: '29.0', profit: '2,132' },
    { name: tri('고기올인원 도시락', 'All-meat lunchbox', '肉オールイン弁当'), avg: '1.2', pred: '1.3', qty: '2', waste: '30.0', margin: '32.5', profit: '2,184' },
    { name: tri('뷔페한상 11찬 도시락', '11-side buffet box', '11品幕の内弁当'), avg: '2.1', pred: '2.4', qty: '3', waste: '8.2', margin: '31.0', profit: '2,910' },
  ];
  return (
    <>
      <PanelHead T={T} crumb={tri('매장 오버뷰', 'Overview', 'オーバービュー')} title={tri('발주 추천 — 도시락', 'Ordering — lunchboxes', '発注推奨 — 弁当')} />
      <div className="grid grid-cols-4 gap-2.5 mb-4">
        <Kpi label={T(tri('상품 수', 'SKUs', '商品数'))} value="12" />
        <Kpi label={T(tri('총 발주 수량', 'Total order', '総発注'))} value="14" />
        <Kpi label={T(tri('폐기 주의', 'Waste risk', '廃棄注意'))} value="7" note={T(tri('폐기율 ≥15%', 'waste ≥15%', '廃棄率≥15%'))} alert />
        <Kpi label={T(tri('신규 상품', 'New', '新規'))} value="0" note={T(tri('판매일수 ≤3', 'sold ≤3 days', '販売日数≤3'))} />
      </div>
      <div className="rounded-xl border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-[1.6fr_repeat(4,0.7fr)] gap-2 bg-gray-50 px-3 py-2 text-3xs font-bold text-gray-500">
          <span>{T(tri('상품', 'Item', '商品'))}</span>
          <span className="text-right">{T(tri('예측', 'Forecast', '予測'))}</span>
          <span className="text-right">{T(tri('추천', 'Qty', '推奨'))}</span>
          <span className="text-right">{T(tri('폐기율', 'Waste', '廃棄'))}</span>
          <span className="text-right">{T(tri('예상이익', 'Profit', '利益'))}</span>
        </div>
        {rows.map((r) => (
          <div key={r.name.ko} className="grid grid-cols-[1.6fr_repeat(4,0.7fr)] gap-2 px-3 py-2.5 border-t border-gray-50 text-xs items-center">
            <span className="font-medium text-gray-800 truncate">{T(r.name)}</span>
            <span className="text-right text-gray-500">{r.pred}</span>
            <span className="text-right"><span className="rounded bg-primary/10 px-1.5 py-0.5 font-bold text-primary">{r.qty}</span></span>
            <span className="text-right text-gray-500">{r.waste}%</span>
            <span className="text-right font-medium text-gray-800">{r.profit}</span>
          </div>
        ))}
        {/* 밀도 축소 placeholder 행 */}
        {[0, 1].map((i) => (
          <div key={i} className="grid grid-cols-[1.6fr_repeat(4,0.7fr)] gap-2 px-3 py-2.5 border-t border-gray-50 opacity-40">
            <span className="h-3 rounded bg-gray-200" />
            <span className="h-3 rounded bg-gray-100" /><span className="h-3 rounded bg-gray-100" />
            <span className="h-3 rounded bg-gray-100" /><span className="h-3 rounded bg-gray-100" />
          </div>
        ))}
      </div>
      <p className="text-2xs text-gray-400 mt-2">{T(tri('비 오는 날 폐기율 보정 적용 · 유통기한·마진·60일 평균 반영', 'Rainy-day waste correction · shelf-life, margin, 60-day avg', '雨日の廃棄補正 · 賞味期限・マージン・60日平均'))}</p>
    </>
  );
}

// 탭 D — 선반 재배치 시뮬레이션
function ShelfPanel({ T }: { T: (t: Tri) => string }) {
  const strategies: { name: Tri; gain: string; swaps: string }[] = [
    { name: tri('선반 효율 최적화', 'Shelf efficiency', '棚効率最適化'), gain: '+440,300', swaps: '5' },
    { name: tri('구매 전환 갭 해소', 'Close conversion gap', '転換ギャップ解消'), gain: '+430,400', swaps: '5' },
    { name: tri('동반 구매 인접 배치', 'Basket adjacency', '併買隣接配置'), gain: '+325,900', swaps: '3' },
    { name: tri('체류 시간 최적화', 'Dwell optimization', '滞在最適化'), gain: '+432,400', swaps: '5' },
  ];
  // Before/After 히트맵 셀 강도
  const before = [2, 3, 1, 0, 2, 1, 3, 0, 1];
  const after = [3, 3, 2, 2, 2, 2, 3, 1, 2];
  const cell = (v: number) => ['bg-gray-100', 'bg-primary/20', 'bg-primary/50', 'bg-primary/80'][v];
  return (
    <>
      <PanelHead T={T} title={tri('선반 효율 최적화', 'Shelf efficiency', '棚効率最適化')} right={<span className="rounded-lg bg-primary px-2.5 py-1 text-2xs font-bold text-white">{T(tri('직접 배치', 'Place', '直接配置'))}</span>} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
        <Kpi label={T(tri('예상 추가매출/월', 'Est. lift/mo', '予想増収/月'))} value="+440,300" alert />
        <Kpi label={T(tri('교환', 'Swaps', '交換'))} value="5" />
        <Kpi label={T(tri('평균 마진', 'Avg margin', '平均マージン'))} value="3,664" />
        <Kpi label={T(tri('선반 활용률', 'Shelf usage', '棚活用率'))} value="47%" />
      </div>
      {/* Before / After 히트맵 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[{ label: tri('Before', 'Before', 'Before'), cells: before }, { label: tri('After', 'After', 'After'), cells: after }].map((g) => (
          <div key={g.label.ko} className="rounded-xl border border-gray-100 bg-white p-3">
            <p className="text-2xs font-bold text-gray-500 mb-2">{T(g.label)}</p>
            <div className="grid grid-cols-3 gap-1">
              {g.cells.map((v, i) => <div key={i} className={`aspect-square rounded ${cell(v)}`} />)}
            </div>
          </div>
        ))}
      </div>
      {/* 전략 7선 리스트 */}
      <p className="text-2xs font-bold text-gray-500 mb-2">{T(tri('전략 7개 생성됨', '7 strategies generated', '戦略7つ生成'))}</p>
      <div className="space-y-1.5">
        {strategies.map((s, i) => (
          <div key={s.name.ko} className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${i === 0 ? 'border-primary/30 bg-primary/5' : 'border-gray-100 bg-white'}`}>
            <span className={`w-5 h-5 rounded-full text-3xs font-bold flex items-center justify-center ${i === 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>{i + 1}</span>
            <span className="flex-1 text-xs font-medium text-gray-800">{T(s.name)}</span>
            <span className="text-2xs text-gray-400">{T(tri('교환', 'swaps', '交換'))} {s.swaps}</span>
            <span className="text-xs font-bold text-primary">{s.gain}</span>
          </div>
        ))}
        <p className="text-2xs text-gray-400 pt-1">{T(tri('외 3개 전략 …', '+3 more …', '他3件 …'))}</p>
      </div>
    </>
  );
}

// 탭 E — 직원 효율성 대시보드
function StaffPanel({ T }: { T: (t: Tri) => string }) {
  const reduced = useReduced();
  const score = 49.7;
  const circ = 2 * Math.PI * 42;
  const full = (score / 100) * circ;
  // 도넛은 SVG라 framer 미하이드레이션 → CSS 트랜지션으로 0에서 채운다(마운트 시).
  const [dash, setDash] = useState(reduced ? full : 0);
  useEffect(() => {
    if (reduced) return;
    const id = requestAnimationFrame(() => setDash(full));
    return () => cancelAnimationFrame(id);
  }, [reduced, full]);
  return (
    <>
      <PanelHead T={T} title={tri('직원 효율성 대시보드', 'Staff efficiency', 'スタッフ効率ダッシュボード')} right={<span className="rounded-lg bg-primary px-2.5 py-1 text-2xs font-bold text-white">{T(tri('분석 실행', 'Run', '分析実行'))}</span>} />
      <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start mb-4">
        {/* 도넛 */}
        <div className="relative w-32 h-32 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {/* SVG 인라인 속성 — .saai-scope 밖이라 CSS 변수 미해석, SAAI_COLORS 직참조 */}
            <circle cx="50" cy="50" r="42" fill="none" stroke={SAAI_COLORS['blue-50']} strokeWidth="9" />
            <circle cx="50" cy="50" r="42" fill="none" stroke={SAAI_COLORS['blue-500']} strokeWidth="9" strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
              style={reduced ? undefined : { transition: `stroke-dasharray 1.1s ${SAAI_MOTION.ease['out-quint']}` }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{score}</span>
            <span className="text-2xs font-medium text-primary">Grade C</span>
          </div>
        </div>
        {/* KPI 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 flex-1">
          <Kpi label={T(tri('카운터 커버리지', 'Counter cover', 'カウンター'))} value="26%" note="50/192" />
          <Kpi label={T(tri('진열대 관리', 'Shelf mgmt', '陳列管理'))} value="49.6%" note="138/278" />
          <Kpi label={T(tri('카운터 공백', 'Counter gap', 'カウンター空白'))} value="142" note={T(tri('고객 있지만 부재', 'staff absent', 'スタッフ不在'))} alert />
          <Kpi label={T(tri('직원:고객', 'Staff:cust', 'スタッフ:客'))} value="5.9%" />
          <Kpi label={T(tri('직원 감지', 'Staff seen', 'スタッフ検出'))} value="268" />
          <Kpi label={T(tri('고객 감지', 'Cust seen', '客検出'))} value="4,538" />
          <Kpi label={T(tri('평균 체류', 'Avg dwell', '平均滞在'))} value="4.7분" />
          <Kpi label={T(tri('인력 부족', 'Understaffed', '人員不足'))} value="7" note={T(tri('고객 50+ 구간', 'cust 50+ slots', '客50+帯'))} alert />
        </div>
      </div>
      {/* Score Evidence 바 */}
      <p className="text-2xs font-bold text-gray-500 mb-2">{T(tri('SCORE EVIDENCE — 점수 근거', 'SCORE EVIDENCE', 'スコア根拠'))}</p>
      <motion.div
        className="flex h-6 rounded-lg overflow-hidden text-3xs font-bold text-white origin-left"
        initial={reduced ? false : { scaleX: 0 }}
        animate={reduced ? undefined : { scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.7, ease: ease.outQuint }}
      >
        <div className="bg-primary flex items-center justify-center" style={{ width: '10.4%' }}>10.4</div>
        <div className="bg-primary/70 flex items-center justify-center" style={{ width: '14.9%' }}>14.9</div>
        <div className="bg-primary/45 flex items-center justify-center" style={{ width: '24.4%' }}>24.4</div>
        <div className="bg-gray-200 text-gray-500 flex items-center justify-center" style={{ width: '50.3%' }}>−50.3</div>
      </motion.div>
      <p className="text-3xs text-gray-400 mt-1.5">{T(tri('카운터 10.4/40 + 진열대 14.9/30 + 활동 24.4/30 · 감점 50.3', 'Counter 10.4/40 + Shelf 14.9/30 + Activity 24.4/30 · −50.3', 'カウンター10.4/40 + 陳列14.9/30 + 活動24.4/30 · 減点50.3'))}</p>
    </>
  );
}

// 탭 F — 실시간 혼잡도 (CCTV)
function CctvPanel({ T }: { T: (t: Tri) => string }) {
  const zones: { ch: string; name: Tri }[] = [
    { ch: '101_ch4', name: tri('도시락/즉석식 코너', 'Lunchbox / grab-and-go', '弁当・即席') },
    { ch: '101_ch7', name: tri('입구/카페', 'Entrance / cafe', '入口・カフェ') },
    { ch: '101_ch8', name: tri('음료 냉장고', 'Beverage fridge', '飲料冷蔵') },
    { ch: '101_ch2', name: tri('스낵/과자/라면', 'Snacks / ramen', 'スナック・麺') },
  ];
  return (
    <>
      <PanelHead T={T} crumb={tri('돌아가기', 'Back', '戻る')} title={tri('실시간 혼잡도 — 도시락/즉석식', 'Live load — lunchbox corner', 'リアルタイム混雑 — 弁当')}
        right={<span className="rounded-lg bg-primary/10 px-2.5 py-1 text-2xs font-bold text-primary">{T(tri('보통', 'Moderate', '普通'))}</span>} />
      <div className="grid grid-cols-4 gap-2.5 mb-4">
        <Kpi label={T(tri('현재 고객', 'Customers', '現在客数'))} value="7" />
        <Kpi label={T(tri('직원', 'Staff', 'スタッフ'))} value="0" />
        <Kpi label={T(tri('평균 체류', 'Avg dwell', '平均滞在'))} value="—" />
        <Kpi label={T(tri('전주 대비', 'vs last wk', '前週比'))} value="0.0%" />
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {zones.map((z) => (
          <div key={z.ch} className="relative rounded-xl overflow-hidden bg-surface-dark aspect-video">
            {/* 익명화 실루엣 힌트 */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-25" aria-hidden="true">
              <span className="w-5 h-9 rounded-t-full bg-primary-light" />
              <span className="w-5 h-8 rounded-t-full bg-white/60" />
            </div>
            <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
              <span className="text-3xs font-medium text-white/90">{z.ch} · {T(z.name)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
