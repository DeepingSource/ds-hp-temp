'use client';

import { ShoppingCart, Check, FileText, Truck, PackageCheck, CheckCircle2, TrendingUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import PhoneFrame from './PhoneFrame';
import PhoneScreen from './PhoneScreen';
import MockupBadge from './MockupBadge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { useCountUp } from '@/hooks/useCountUp';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { springGentle, springSnappy } from '@/lib/spring-config';
import { canonicalStore, formatWon } from '@/data/mockup-scenarios/canonical';
import type { Locale } from '@/lib/i18n';

interface Props {
  active?: boolean;
  locale?: Locale;
  className?: string;
}

// 효과 환류 — 캐노니컬 예상 일매출의 일부(8%)를 "오늘 승인 효과"로 환산
const APPROVALS_TODAY = 6;
const EFFECT_WON = Math.round(canonicalStore.forecastRevenueWon * 0.08); // ₩99,600

// 발주 액션 (ActionCardMockup 비주얼 톤 — 삼각김밥 추가 발주)
const PO = {
  qty: 40,
  unitWon: 1_300,
  get totalWon() {
    return this.qty * this.unitWon;
  },
};

type Copy = {
  title: string;
  sub: string;
  // step 1
  priority: string;
  cardTitle: string;
  cardReason: string;
  approve: string;
  later: string;
  // step 2
  poBadge: string;
  poTitle: string;
  itemLabel: string;
  item: string;
  qtyLabel: string;
  qtyUnit: string;
  vendorLabel: string;
  vendor: string;
  amountLabel: string;
  // step 3
  sentBadge: string;
  sentTitle: string;
  sentSub: string;
  tlOrdered: string;
  tlShipped: string;
  tlArriving: string;
  eta: string;
  // effect feedback
  effectLabel: string;
  effectUnit: string;
  effectSuffix: string;
  stepWord: (n: number) => string;
};

const COPY: Record<Locale, Copy> = {
  ko: {
    title: '자동 발주',
    sub: `${canonicalStore.name} · 승인 한 번으로`,
    priority: '재고 부족',
    cardTitle: '삼각김밥 40개 추가 발주',
    cardReason: '점심 수요 대비 재고 소진 예상 — 오후 2시 결품 위험',
    approve: '승인',
    later: '나중에',
    poBadge: '발주서 생성됨',
    poTitle: '발주서 #SA-2026-0418',
    itemLabel: '품목',
    item: '삼각김밥 (참치마요)',
    qtyLabel: '수량',
    qtyUnit: '개',
    vendorLabel: '납품처',
    vendor: '중앙물류센터',
    amountLabel: '금액',
    sentBadge: '전송 완료',
    sentTitle: '공급사로 발주 전송됨',
    sentSub: '입고 예정 알림이 등록되었습니다',
    tlOrdered: '발주',
    tlShipped: '출고',
    tlArriving: '입고',
    eta: '오늘 16:30 예정',
    effectLabel: '오늘 승인',
    effectUnit: '건',
    effectSuffix: '예상 효과',
    stepWord: (n) => `${n}단계`,
  },
  en: {
    title: 'Auto ordering',
    sub: `Gangnam Stn. · one tap to approve`,
    priority: 'Low stock',
    cardTitle: 'Reorder 40 rice balls',
    cardReason: 'Lunch demand will deplete stock — stockout risk by 2 PM',
    approve: 'Approve',
    later: 'Later',
    poBadge: 'PO created',
    poTitle: 'PO #SA-2026-0418',
    itemLabel: 'Item',
    item: 'Rice ball (tuna mayo)',
    qtyLabel: 'Qty',
    qtyUnit: '',
    vendorLabel: 'Vendor',
    vendor: 'Central DC',
    amountLabel: 'Amount',
    sentBadge: 'Sent',
    sentTitle: 'Order sent to supplier',
    sentSub: 'A delivery reminder has been scheduled',
    tlOrdered: 'Ordered',
    tlShipped: 'Shipped',
    tlArriving: 'Arriving',
    eta: 'Today 16:30',
    effectLabel: 'Approved today',
    effectUnit: '',
    effectSuffix: 'est. impact',
    stepWord: (n) => `Step ${n}`,
  },
  jp: {
    title: '自動発注',
    sub: `江南駅店 · 承認ひとつで`,
    priority: '在庫不足',
    cardTitle: 'おにぎり40個の追加発注',
    cardReason: 'ランチ需要で在庫が枯渇する見込みです — 14時に欠品の恐れ',
    approve: '承認',
    later: '後で',
    poBadge: '発注書を作成しました',
    poTitle: '発注書 #SA-2026-0418',
    itemLabel: '品目',
    item: 'おにぎり（ツナマヨ）',
    qtyLabel: '数量',
    qtyUnit: '個',
    vendorLabel: '納品先',
    vendor: '中央物流センター',
    amountLabel: '金額',
    sentBadge: '送信完了',
    sentTitle: 'サプライヤーへ発注を送信しました',
    sentSub: '入荷予定の通知を登録しました',
    tlOrdered: '発注',
    tlShipped: '出荷',
    tlArriving: '入荷',
    eta: '本日16:30予定',
    effectLabel: '本日の承認',
    effectUnit: '件',
    effectSuffix: '予想効果',
    stepWord: (n) => `ステップ${n}`,
  },
};

const STEP_ICONS = [Check, FileText, PackageCheck];

export default function OrderFlowMockup({ active = true, locale = 'en', className }: Props) {
  const t = COPY[locale] ?? COPY.en;
  const reducedMotion = usePrefersReducedMotion();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });
  const loopActive = isVisible && active;
  const { step, hoverProps } = useMockupLoop({
    steps: 3,
    intervals: [2600, 2600, 3200],
    active: loopActive,
    pauseOnHover: true,
  });

  // reduced-motion: 최종 상태(step 3 = index 2) 고정
  const activeStep = reducedMotion ? 2 : step;

  const effectWon = useCountUp(EFFECT_WON, loopActive, 1600);
  const approvals = useCountUp(APPROVALS_TODAY, loopActive, 1200);

  return (
    <div ref={ref} className={className}>
      <PhoneFrame>
        <PhoneScreen statusBarBg="bg-white" homeBg="bg-gray-50" badge={false}>
          <MockupBadge locale={locale} />

          {/* Header */}
          <div className="shrink-0 bg-white px-5 py-3 border-b-2 border-primary/15">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-primary" aria-hidden="true" />
                  {t.title}
                </h3>
                <p className="text-gray-500 text-xs mt-0.5">{t.sub}</p>
              </div>
              {/* Step indicator */}
              <ol className="flex items-center gap-1.5" aria-label={t.stepWord(activeStep + 1)}>
                {[0, 1, 2].map((i) => {
                  const Icon = STEP_ICONS[i];
                  const reached = i <= activeStep;
                  return (
                    <li key={i} className="flex items-center" aria-current={i === activeStep ? 'step' : undefined}>
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          reached ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <Icon className="w-3 h-3" aria-hidden="true" />
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 min-h-0 overflow-y-auto bg-gray-50 p-4 space-y-3" {...hoverProps}>
            {/* ── Step 1: 승인 액션 카드 (항상 표시, 첫 단계) ── */}
            <section
              aria-label={t.stepWord(1)}
              className={`bg-white rounded-xl p-4 shadow-sm border relative overflow-hidden transition-colors ${
                activeStep === 0 ? 'border-primary/30 shadow-md shadow-primary/10' : 'border-gray-100'
              }`}
            >
              <div className="flex items-start gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <ShoppingCart className="w-5 h-5 text-amber-600" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-3xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 inline-block mb-1">
                    {t.priority}
                  </span>
                  <h4 className="text-sm font-medium text-gray-900 leading-snug">{t.cardTitle}</h4>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-3 ml-12">{t.cardReason}</p>
              <div className="flex gap-2 ml-12">
                <motion.button
                  type="button"
                  className={`inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1 ${
                    activeStep > 0 ? 'opacity-90' : ''
                  } ${activeStep === 0 && !reducedMotion ? 'ring-2 ring-primary/40 ring-offset-1' : ''}`}
                  animate={
                    activeStep === 0 && !reducedMotion
                      ? { scale: [1, 0.9, 1] }
                      : { scale: 1 }
                  }
                  transition={activeStep === 0 && !reducedMotion ? { duration: 0.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.1 } : springSnappy}
                >
                  {activeStep > 0 ? <CheckCircle2 className="w-3 h-3" aria-hidden="true" /> : <Check className="w-3 h-3" aria-hidden="true" />}
                  {t.approve}
                </motion.button>
                <button
                  type="button"
                  tabIndex={-1}
                  className="px-3 py-1.5 text-gray-500 text-xs font-medium rounded-lg border border-gray-200"
                >
                  {t.later}
                </button>
              </div>
            </section>

            {/* ── Step 2: 발주서 생성 ── */}
            <AnimatePresence>
              {activeStep >= 1 && (
                <motion.section
                  key="po"
                  aria-label={t.stepWord(2)}
                  initial={reducedMotion ? false : { opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 28 }}
                  transition={springGentle}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-primary/5 border-b border-gray-100">
                    <FileText className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                    <span className="text-2xs font-bold text-primary">{t.poBadge}</span>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-xs font-bold text-gray-900 mb-2.5">{t.poTitle}</p>
                    <dl className="space-y-1.5 text-xs">
                      <div className="flex justify-between gap-2">
                        <dt className="text-gray-400">{t.itemLabel}</dt>
                        <dd className="font-medium text-gray-700 text-right truncate">{t.item}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-gray-400">{t.qtyLabel}</dt>
                        <dd className="font-medium text-gray-700 tabular-nums">{PO.qty}{t.qtyUnit}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-gray-400">{t.vendorLabel}</dt>
                        <dd className="font-medium text-gray-700">{t.vendor}</dd>
                      </div>
                      <div className="flex justify-between gap-2 pt-1.5 mt-1 border-t border-dashed border-gray-200">
                        <dt className="text-gray-500 font-medium">{t.amountLabel}</dt>
                        <dd className="font-bold text-primary tabular-nums">{formatWon(PO.totalWon)}</dd>
                      </div>
                    </dl>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* ── Step 3: 전송 완료 + 입고 타임라인 ── */}
            <AnimatePresence>
              {activeStep >= 2 && (
                <motion.section
                  key="sent"
                  aria-label={t.stepWord(3)}
                  initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                  transition={springGentle}
                  className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900">{t.sentTitle}</p>
                      <p className="text-xs text-gray-500 truncate">{t.sentSub}</p>
                    </div>
                  </div>

                  {/* 입고 타임라인 발주 → 출고 → 입고 */}
                  <ol className="flex items-stretch justify-between gap-1 mt-2" aria-label={t.sentBadge}>
                    {[
                      { Icon: Check, label: t.tlOrdered, done: true },
                      { Icon: Truck, label: t.tlShipped, done: true },
                      { Icon: PackageCheck, label: t.tlArriving, done: false },
                    ].map((node, i, arr) => (
                      <li key={node.label} className="flex-1 flex flex-col items-center relative">
                        {i < arr.length - 1 && (
                          <span
                            className={`absolute top-3 left-1/2 w-full h-0.5 ${arr[i + 1].done || node.done ? 'bg-emerald-300' : 'bg-gray-200'}`}
                            aria-hidden="true"
                          />
                        )}
                        <span
                          className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center ${
                            node.done ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-amber-300 text-amber-500'
                          }`}
                        >
                          <node.Icon className="w-3 h-3" aria-hidden="true" />
                        </span>
                        <span className="text-3xs text-gray-600 mt-1.5 font-medium">{node.label}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="text-2xs text-amber-600 font-medium text-center mt-2">{t.eta}</p>
                </motion.section>
              )}
            </AnimatePresence>
          </div>

          {/* ── 효과 환류 카운터 (footer) ── */}
          <div className="shrink-0 bg-white border-t border-gray-100 px-5 py-2.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <TrendingUp className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                {t.effectLabel}{' '}
                <span className="font-bold text-gray-900 tabular-nums">{approvals}{t.effectUnit}</span>
              </span>
              <span className="text-xs text-gray-400">
                {t.effectSuffix}{' '}
                <span className="font-bold text-primary tabular-nums">+{formatWon(effectWon)}</span>
              </span>
            </div>
          </div>
        </PhoneScreen>
      </PhoneFrame>
    </div>
  );
}
