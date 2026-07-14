'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Calculator, Store, Camera, Thermometer, CheckCircle2, ArrowRight, Mail, Check, AlertCircle, ChevronDown } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { submitQuoteRequest } from '@/lib/contact-lead';
import { B2C_PRICING } from '@/lib/pricing-data';
import Spinner from '@/components/ui/Spinner';

/* ─── 요금 기준 ─── */
const STORECARE_BASIC = B2C_PRICING.storeCare.basic;
const STORECARE_PLUS = B2C_PRICING.storeCare.plus;
const TEMP_BASE = B2C_PRICING.tempMonitoring.base;       // 냉장고 5대까지
const TEMP_EXTRA_PER_5 = B2C_PRICING.tempMonitoring.extraPer5; // 추가 5대마다
const DEVICE_COST = B2C_PRICING.deviceCost;     // AI 분석 장치 (1회, 카메라 4대당 1대)

const INSIGHT_BASE = B2C_PRICING.storeInsight.base;
const INSIGHT_PER_CAM = B2C_PRICING.storeInsight.perCamera;

const AGENT_STANDARD = B2C_PRICING.storeAgent.standard;
const AGENT_PREMIUM = B2C_PRICING.storeAgent.premium;

type CarePlan = 'basic' | 'plus';
type AgentPlan = 'free' | 'standard' | 'premium';

/* ─── i18n content ─── */
interface SimContent {
  unitDevice: string; // 대 (camera/fridge count unit)
  won: string;        // 원
  perMonth: string;   // /월
  presets: { label: string; range: string }[];
  step1Title: string;
  cameraLabel: string;
  fridgeLabel: string;
  cam1: string; cam10: string; cam20: string;
  fri0: string; fri10: string; fri20: string;
  step2Title: string;
  step2Sub: string;
  careTag: string; insightTag: string; agentTag: string;
  careDesc: string; insightDesc: string; agentDesc: string;
  insightUnit: (cam: number) => string;
  agentFromFree: string;
  agentPickPlan: string;
  step3Title: string;
  careBasic: string; careBasicDesc: string;
  carePlus: string; carePlusDesc: string;
  recommended: string;
  agentFreeName: string; agentFreeDesc: string; agentFreeFree: string;
  agentStdName: string; agentStdDesc: string;
  agentPremName: string; agentPremDesc: string;
  step4Title: string;
  disclaimerStrong: string;
  disclaimerRest: string;
  emptyHint: string;
  careLineBasic: string; careLinePlus: string;
  tempAddBasic: string; tempAddPlus: string;
  insightLine: (cam: number) => string;
  agentLineFree: string; agentLineStd: string; agentLinePrem: string;
  free: string;
  monthlySum: string;
  perDay: (n: string) => string;
  initialDevice: string;
  selectedFeatures: string;
  featDirt: string; featStay: string; featNight: string; featTemp: string;
  featFlow: string; featDash: string;
  featBriefing: string; featAgentPrem: string; featAgentStd: string;
  upgradeMsg: (price: string) => string;
  emailTitle: string;
  emailPlaceholder: string;
  emailBtn: string;
  emailNote: string;
  submittedTitle: string;
  recalc: string;
  ctaConsult: string;
  errSubmitFailed: string;
  errGeneric: string;
  /* form-request message strings */
  reqName: string;
  reqInquiry: string;
  reqMessage: (args: { products: string; cam: number; fridge: number; monthly: string; oneTime: string }) => string;
}

const C: Record<Locale, SimContent> = {
  ko: {
    unitDevice: '대',
    won: '원',
    perMonth: '/월',
    presets: [
      { label: '소형', range: '10~20평' },
      { label: '중형', range: '20~40평' },
      { label: '대형', range: '40평 이상' },
    ],
    step1Title: '매장 규모를 알려주세요',
    cameraLabel: '카메라 수',
    fridgeLabel: '냉장/냉동고 수',
    cam1: '1대', cam10: '10대', cam20: '20대',
    fri0: '0대', fri10: '10대', fri20: '20대',
    step2Title: '도입할 제품을 선택하세요',
    step2Sub: '복수 선택 가능 · 합산 요금이 자동 계산됩니다',
    careTag: '제안', insightTag: '분석', agentTag: '학습',
    careDesc: 'CCTV 기반 매장 모니터링 · 이상 감지 · 알림',
    insightDesc: '동선·체류 패턴 분석 · 대시보드 · 인사이트',
    agentDesc: 'AI 자동 브리핑 · POS 연동 · 액션 추천',
    insightUnit: (cam) => `/월 (카메라 ${cam}대 기준)`,
    agentFromFree: '무료~',
    agentPickPlan: '플랜 선택',
    step3Title: '플랜을 선택하세요',
    careBasic: '기본', careBasicDesc: '오염·진열·체류·야간 보안',
    carePlus: '플러스', carePlusDesc: '기본 + 온도 모니터링',
    recommended: '추천',
    agentFreeName: '기본형', agentFreeDesc: '브리핑', agentFreeFree: '무료',
    agentStdName: '표준', agentStdDesc: 'POS 연동',
    agentPremName: '프리미엄', agentPremDesc: 'AI 비서',
    step4Title: '예상 비용',
    disclaimerStrong: '예시 금액입니다.',
    disclaimerRest: ' 실제 요금은 매장 환경·카메라 사양·설치 조건·계약 조건에 따라 달라질 수 있습니다. 정확한 견적은 상담을 통해 안내드립니다.',
    emptyHint: '제품을 하나 이상 선택하면\n예상 비용이 계산됩니다',
    careLineBasic: '기본', careLinePlus: '플러스',
    tempAddBasic: '온도 모니터링 추가', tempAddPlus: '추가 냉장고 요금',
    insightLine: (cam) => `store insight (카메라 ${cam}대)`,
    agentLineFree: '기본형', agentLineStd: '표준', agentLinePrem: '프리미엄',
    free: '무료',
    monthlySum: '예상 월 비용 합산',
    perDay: (n) => `하루 약 ${n}원`,
    initialDevice: '초기 장비 비용 (1회)',
    selectedFeatures: '선택된 기능',
    featDirt: '오염·진열 감지', featStay: '비정상 체류 감지', featNight: '야간 보안 감지', featTemp: '온도 모니터링 포함',
    featFlow: '동선·체류 분석', featDash: '웹 대시보드',
    featBriefing: 'AI 브리핑', featAgentPrem: 'AI 비서·자동화', featAgentStd: 'POS 연동 분석',
    upgradeMsg: (price) => `플러스 요금제(${price}원/월)로 변경하면 온도 모니터링이 포함되어 더 합리적입니다.`,
    emailTitle: '시뮬레이션 결과를 이메일로 받기',
    emailPlaceholder: '이메일 주소',
    emailBtn: '견적 받기',
    emailNote: '견적 산출 용도로만 사용됩니다.',
    submittedTitle: '견적 요청이 접수되었습니다!',
    recalc: '다시 계산하기',
    ctaConsult: '전문 상담사와 정확한 견적 받기',
    errSubmitFailed: '견적 요청에 실패했습니다. 다시 시도해주세요.',
    errGeneric: '일시적인 오류입니다. 잠시 후 다시 시도해 주세요.',
    reqName: '시뮬레이터 견적',
    reqInquiry: '견적 요청',
    reqMessage: ({ products, cam, fridge, monthly, oneTime }) =>
      `[시뮬레이션] ${products || '미선택'}, 카메라 ${cam}대, 냉장고 ${fridge}대, 예상 월 ~${monthly}원, 초기 ${oneTime}원`,
  },
  en: {
    unitDevice: '',
    won: ' KRW',
    perMonth: '/mo',
    presets: [
      { label: 'Small', range: '10–20 pyeong (33–66㎡)' },
      { label: 'Medium', range: '20–40 pyeong (66–132㎡)' },
      { label: 'Large', range: '40+ pyeong (132㎡+)' },
    ],
    step1Title: 'Tell us your store size',
    cameraLabel: 'Cameras',
    fridgeLabel: 'Refrigerators / freezers',
    cam1: '1', cam10: '10', cam20: '20',
    fri0: '0', fri10: '10', fri20: '20',
    step2Title: 'Select the products to deploy',
    step2Sub: 'Multiple selections allowed · total is calculated automatically',
    careTag: 'Suggest', insightTag: 'Analyze', agentTag: 'Learn',
    careDesc: 'CCTV-based store monitoring · anomaly detection · alerts',
    insightDesc: 'Flow & dwell-pattern analysis · dashboard · insights',
    agentDesc: 'AI auto briefing · POS integration · action recommendations',
    insightUnit: (cam) => `/mo (based on ${cam} cameras)`,
    agentFromFree: 'From free',
    agentPickPlan: 'Choose plan',
    step3Title: 'Choose your plan',
    careBasic: 'Basic', careBasicDesc: 'Hygiene · display · dwell · night security',
    carePlus: 'Plus', carePlusDesc: 'Basic + temperature monitoring',
    recommended: 'Recommended',
    agentFreeName: 'Basic', agentFreeDesc: 'Briefing', agentFreeFree: 'Free',
    agentStdName: 'Standard', agentStdDesc: 'POS integration',
    agentPremName: 'Premium', agentPremDesc: 'AI assistant',
    step4Title: 'Estimated cost',
    disclaimerStrong: 'These are sample figures.',
    disclaimerRest: ' Actual pricing may vary with store environment, camera specs, installation, and contract terms. We provide an exact quote through consultation.',
    emptyHint: 'Select at least one product\nto calculate the estimated cost',
    careLineBasic: 'Basic', careLinePlus: 'Plus',
    tempAddBasic: 'Temperature monitoring add-on', tempAddPlus: 'Additional refrigerator fee',
    insightLine: (cam) => `store insight (${cam} cameras)`,
    agentLineFree: 'Basic', agentLineStd: 'Standard', agentLinePrem: 'Premium',
    free: 'Free',
    monthlySum: 'Estimated monthly total',
    perDay: (n) => `About ${n} KRW/day`,
    initialDevice: 'Initial equipment cost (one-time)',
    selectedFeatures: 'Selected features',
    featDirt: 'Hygiene & display detection', featStay: 'Abnormal dwell detection', featNight: 'Night security detection', featTemp: 'Temperature monitoring included',
    featFlow: 'Flow & dwell analysis', featDash: 'Web dashboard',
    featBriefing: 'AI briefing', featAgentPrem: 'AI assistant & automation', featAgentStd: 'POS-integrated analysis',
    upgradeMsg: (price) => `Switching to the Plus plan (${price} KRW/mo) includes temperature monitoring and is more cost-effective.`,
    emailTitle: 'Get the simulation result by email',
    emailPlaceholder: 'Email address',
    emailBtn: 'Get quote',
    emailNote: 'Used only to produce your quote.',
    submittedTitle: 'Your quote request has been received!',
    recalc: 'Recalculate',
    ctaConsult: 'Get an exact quote from a specialist',
    errSubmitFailed: 'Quote request failed. Please try again.',
    errGeneric: 'A temporary error occurred. Please try again shortly.',
    reqName: 'Simulator quote',
    reqInquiry: 'Quote request',
    reqMessage: ({ products, cam, fridge, monthly, oneTime }) =>
      `[Simulation] ${products || 'None selected'}, ${cam} cameras, ${fridge} refrigerators, est. monthly ~${monthly} KRW, initial ${oneTime} KRW`,
  },
  jp: {
    unitDevice: '台',
    won: '円',
    perMonth: '/月',
    presets: [
      { label: '小型', range: '10〜20坪' },
      { label: '中型', range: '20〜40坪' },
      { label: '大型', range: '40坪以上' },
    ],
    step1Title: '店舗の規模をお知らせください',
    cameraLabel: 'カメラ台数',
    fridgeLabel: '冷蔵・冷凍庫の台数',
    cam1: '1台', cam10: '10台', cam20: '20台',
    fri0: '0台', fri10: '10台', fri20: '20台',
    step2Title: '導入する製品を選択してください',
    step2Sub: '複数選択が可能です・合計料金が自動で計算されます',
    careTag: '提案', insightTag: '分析', agentTag: '学習',
    careDesc: 'CCTVベースの店舗モニタリング・異常検知・通知',
    insightDesc: '動線・滞留パターン分析・ダッシュボード・インサイト',
    agentDesc: 'AI自動ブリーフィング・POS連携・アクション提案',
    insightUnit: (cam) => `/月（カメラ${cam}台を基準）`,
    agentFromFree: '無料〜',
    agentPickPlan: 'プラン選択',
    step3Title: 'プランを選択してください',
    careBasic: '基本', careBasicDesc: '汚れ・陳列・滞留・夜間防犯',
    carePlus: 'プラス', carePlusDesc: '基本＋温度モニタリング',
    recommended: 'おすすめ',
    agentFreeName: '基本型', agentFreeDesc: 'ブリーフィング', agentFreeFree: '無料',
    agentStdName: '標準', agentStdDesc: 'POS連携',
    agentPremName: 'プレミアム', agentPremDesc: 'AIアシスタント',
    step4Title: '想定費用',
    disclaimerStrong: '参考金額です。',
    disclaimerRest: ' 実際の料金は店舗環境・カメラ仕様・設置条件・契約条件により異なる場合があります。正確なお見積りはご相談にてご案内いたします。',
    emptyHint: '製品を1つ以上選択すると\n想定費用が計算されます',
    careLineBasic: '基本', careLinePlus: 'プラス',
    tempAddBasic: '温度モニタリング追加', tempAddPlus: '追加冷蔵庫料金',
    insightLine: (cam) => `store insight（カメラ${cam}台）`,
    agentLineFree: '基本型', agentLineStd: '標準', agentLinePrem: 'プレミアム',
    free: '無料',
    monthlySum: '想定月額費用の合計',
    perDay: (n) => `1日あたり約${n}円`,
    initialDevice: '初期機器費用（一回）',
    selectedFeatures: '選択された機能',
    featDirt: '汚れ・陳列検知', featStay: '異常滞留検知', featNight: '夜間防犯検知', featTemp: '温度モニタリング含む',
    featFlow: '動線・滞留分析', featDash: 'Webダッシュボード',
    featBriefing: 'AIブリーフィング', featAgentPrem: 'AIアシスタント・自動化', featAgentStd: 'POS連携分析',
    upgradeMsg: (price) => `プラスプラン（${price}円/月）に変更すると温度モニタリングが含まれ、より合理的です。`,
    emailTitle: 'シミュレーション結果をメールで受け取る',
    emailPlaceholder: 'メールアドレス',
    emailBtn: '見積もりを受け取る',
    emailNote: '見積もり算出の用途にのみ使用します。',
    submittedTitle: '見積もり依頼を受け付けました！',
    recalc: '再計算する',
    ctaConsult: '専門相談員から正確な見積もりを受け取る',
    errSubmitFailed: 'お申し込みに失敗しました。もう一度お試しください。',
    errGeneric: '一時的なエラーが発生しました。しばらくしてからもう一度お試しください。',
    reqName: 'シミュレーター見積もり',
    reqInquiry: '見積もり依頼',
    reqMessage: ({ products, cam, fridge, monthly, oneTime }) =>
      `[シミュレーション] ${products || '未選択'}、カメラ${cam}台、冷蔵庫${fridge}台、想定月額〜${monthly}円、初期${oneTime}円`,
  },
};

const ADVANCED_LABEL: Record<Locale, string> = {
  ko: '고급 옵션',
  en: 'Advanced options',
  jp: '詳細オプション',
};

export default function CameraSimulator({ locale = 'en' }: { locale?: Locale }) {
  const t = C[locale];

  /* ─── 매장 규모 프리셋 ─── */
  const storeSizePresets = useMemo(() => [
    { label: t.presets[0].label, range: t.presets[0].range, cameras: 2, fridges: 2 },
    { label: t.presets[1].label, range: t.presets[1].range, cameras: 4, fridges: 5 },
    { label: t.presets[2].label, range: t.presets[2].range, cameras: 8, fridges: 8 },
  ], [t]);

  // Step 1: 매장 규모 (중형 default)
  const [preset, setPreset] = useState({ cameraCount: 4, fridgeCount: 5, activePreset: 1 as number | null });

  // Step 2 제품 선택 + Step 3 플랜 + 고급 옵션 토글
  const [product, setProduct] = useState({ useCare: true, useInsight: false, useAgent: false, carePlan: 'plus' as CarePlan, agentPlan: 'standard' as AgentPlan, showAdvanced: false });

  // 이메일 견적
  const [email, setEmail] = useState({ quoteEmail: '', quoteSubmitted: false, isSubmitting: false, error: null as string | null });

  const handlePreset = useCallback((index: number) => {
    const sp = storeSizePresets[index];
    setPreset(s => ({ ...s, cameraCount: sp.cameras, fridgeCount: sp.fridges, activePreset: index }));
  }, [storeSizePresets]);

  const handleCameraChange = useCallback((value: number) => {
    setPreset(s => ({ ...s, cameraCount: value, activePreset: null }));
  }, []);

  const handleFridgeChange = useCallback((value: number) => {
    setPreset(s => ({ ...s, fridgeCount: value, activePreset: null }));
  }, []);

  const estimate = useMemo(() => {
    let careMonthly = 0;
    let tempMonthly = 0;
    let careDevice = 0;
    let insightMonthly = 0;
    let agentMonthly = 0;

    if (product.useCare) {
      careMonthly = product.carePlan === 'plus' ? STORECARE_PLUS : STORECARE_BASIC;
      careDevice = DEVICE_COST * Math.max(1, Math.ceil(preset.cameraCount / 4));

      if (product.carePlan === 'plus' && preset.fridgeCount > 5) {
        tempMonthly = Math.ceil((preset.fridgeCount - 5) / 5) * TEMP_EXTRA_PER_5;
      } else if (product.carePlan === 'basic' && preset.fridgeCount > 0) {
        tempMonthly = TEMP_BASE;
        if (preset.fridgeCount > 5) {
          tempMonthly += Math.ceil((preset.fridgeCount - 5) / 5) * TEMP_EXTRA_PER_5;
        }
      }
    }

    if (product.useInsight) {
      insightMonthly = INSIGHT_BASE + INSIGHT_PER_CAM * preset.cameraCount;
    }

    if (product.useAgent) {
      agentMonthly = product.agentPlan === 'premium' ? AGENT_PREMIUM : product.agentPlan === 'standard' ? AGENT_STANDARD : 0;
    }

    const monthly = careMonthly + tempMonthly + insightMonthly + agentMonthly;
    const oneTime = product.useCare ? careDevice : 0;
    const suggestUpgrade =
      product.useCare && product.carePlan === 'basic' && preset.fridgeCount > 0 && (careMonthly + tempMonthly) >= STORECARE_PLUS;

    return { careMonthly, tempMonthly, insightMonthly, agentMonthly, monthly, oneTime, suggestUpgrade };
  }, [preset.cameraCount, preset.fridgeCount, product.useCare, product.useInsight, product.useAgent, product.carePlan, product.agentPlan]);

  const fmt = (n: number) => n.toLocaleString('ko-KR');
  const noneSelected = !product.useCare && !product.useInsight && !product.useAgent;

  const selectedProducts = useMemo(
    () => [product.useCare && 'StoreCare', product.useInsight && 'StoreInsight', product.useAgent && 'StoreAgent'].filter(Boolean).join('+'),
    [product.useCare, product.useInsight, product.useAgent]
  );

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.quoteEmail || noneSelected || email.isSubmitting) return;
    setEmail(e => ({ ...e, isSubmitting: true, error: null }));
    try {
      const ok = await submitQuoteRequest({
        name: t.reqName,
        contact: email.quoteEmail,
        storeCount: '1',
        inquiryType: t.reqInquiry,
        message: t.reqMessage({
          products: selectedProducts,
          cam: preset.cameraCount,
          fridge: preset.fridgeCount,
          monthly: fmt(estimate.monthly),
          oneTime: fmt(estimate.oneTime),
        }),
      });
      if (ok) {
        setEmail(e => ({ ...e, quoteSubmitted: true }));
      } else {
        setEmail(e => ({ ...e, error: t.errSubmitFailed }));
      }
    } finally {
      setEmail(e => ({ ...e, isSubmitting: false }));
    }
  };

  return (
    <div className="space-y-6">

      {/* ── Step 1: 매장 규모 / 카메라 수 ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center text-3xs font-bold text-primary">1</span>
          {t.step1Title}
        </h3>

        {/* 프리셋 */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {storeSizePresets.map((sp, i) => (
            <button
              key={sp.label}
              type="button"
              onClick={() => handlePreset(i)}
              className={`p-3 rounded-xl text-center border cursor-pointer transition-colors ${
                preset.activePreset === i
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <p className="text-sm font-bold">{sp.label}</p>
              <p className={`text-xs mt-0.5 ${preset.activePreset === i ? 'text-primary/70' : 'text-gray-500'}`}>{sp.range}</p>
            </button>
          ))}
        </div>

        {/* 카메라 수 슬라이더 */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="sim-cameras" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-gray-500" />
              {t.cameraLabel}
            </label>
            <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded-lg">{preset.cameraCount}{t.unitDevice}</span>
          </div>
          <input
            id="sim-cameras"
            type="range"
            min={1}
            max={20}
            value={preset.cameraCount}
            onChange={(e) => handleCameraChange(Number(e.target.value))}
            aria-valuetext={`${preset.cameraCount}${t.unitDevice}`}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{t.cam1}</span>
            <span>{t.cam10}</span>
            <span>{t.cam20}</span>
          </div>
        </div>

        {/* 고급 옵션 토글 */}
        <button
          type="button"
          onClick={() => setProduct(p => ({ ...p, showAdvanced: !p.showAdvanced }))}
          aria-expanded={product.showAdvanced}
          className="mt-5 flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${product.showAdvanced ? 'rotate-180' : ''}`} />
          {ADVANCED_LABEL[locale]}
        </button>

        {/* 냉장/냉동고 슬라이더 (고급 옵션) */}
        {product.showAdvanced && (
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="sim-fridges" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-gray-500" />
                {t.fridgeLabel}
              </label>
              <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded-lg">{preset.fridgeCount}{t.unitDevice}</span>
            </div>
            <input
              id="sim-fridges"
              type="range"
              min={0}
              max={20}
              value={preset.fridgeCount}
              onChange={(e) => handleFridgeChange(Number(e.target.value))}
              aria-valuetext={`${preset.fridgeCount}${t.unitDevice}`}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{t.fri0}</span>
              <span>{t.fri10}</span>
              <span>{t.fri20}</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Step 2: 제품 선택 (독립 선택) ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
          <span className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center text-3xs font-bold text-primary">2</span>
          {t.step2Title}
        </h3>
        <p className="text-xs text-gray-500 mb-4 pl-7">{t.step2Sub}</p>
        <div className="grid grid-cols-1 gap-3">

          {/* StoreCare */}
          <button
            type="button"
            onClick={() => setProduct(p => ({ ...p, useCare: !p.useCare }))}
            className={`flex items-center gap-3 p-4 rounded-xl border text-left cursor-pointer transition-colors ${
              product.useCare ? 'border-primary-light bg-primary-lighter' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 transition-colors ${
              product.useCare ? 'bg-primary border-primary' : 'border-gray-300 bg-white'
            }`}>
              {product.useCare && <Check className="w-3 h-3 text-white" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-gray-900">store care</p>
                <span className="text-3xs font-medium px-1.5 py-0.5 rounded-full bg-primary-lighter text-primary-dark">{t.careTag}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{t.careDesc}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-primary">{fmt(STORECARE_BASIC)}{t.won}~</p>
              <p className="text-3xs text-gray-500">{t.perMonth}</p>
            </div>
          </button>

          {/* StoreInsight */}
          <button
            type="button"
            onClick={() => setProduct(p => ({ ...p, useInsight: !p.useInsight }))}
            className={`flex items-center gap-3 p-4 rounded-xl border text-left cursor-pointer transition-colors ${
              product.useInsight ? 'border-primary-light bg-primary-lighter' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 transition-colors ${
              product.useInsight ? 'bg-primary border-primary' : 'border-gray-300 bg-white'
            }`}>
              {product.useInsight && <Check className="w-3 h-3 text-white" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-gray-900">store insight</p>
                <span className="text-3xs font-medium px-1.5 py-0.5 rounded-full bg-primary-lighter text-primary-dark">{t.insightTag}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{t.insightDesc}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-primary">{fmt(INSIGHT_BASE + INSIGHT_PER_CAM * preset.cameraCount)}{t.won}</p>
              <p className="text-3xs text-gray-500">{t.insightUnit(preset.cameraCount)}</p>
            </div>
          </button>

          {/* StoreAgent */}
          <button
            type="button"
            onClick={() => setProduct(p => ({ ...p, useAgent: !p.useAgent }))}
            className={`flex items-center gap-3 p-4 rounded-xl border text-left cursor-pointer transition-colors ${
              product.useAgent ? 'border-primary-light bg-primary-lighter' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 transition-colors ${
              product.useAgent ? 'bg-primary border-primary' : 'border-gray-300 bg-white'
            }`}>
              {product.useAgent && <Check className="w-3 h-3 text-white" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-gray-900">store agent</p>
                <span className="text-3xs font-medium px-1.5 py-0.5 rounded-full bg-primary-lighter text-primary-dark">{t.agentTag}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{t.agentDesc}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-primary">{t.agentFromFree}</p>
              <p className="text-3xs text-gray-500">{t.agentPickPlan}</p>
            </div>
          </button>
        </div>
      </div>

      {/* ── Step 3: 플랜 선택 (고급 옵션 · 선택된 제품만 표시) ── */}
      {product.showAdvanced && (product.useCare || product.useAgent) && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <span className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center text-3xs font-bold text-primary">3</span>
            {t.step3Title}
            <span className="ml-1 text-3xs font-medium px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">{ADVANCED_LABEL[locale]}</span>
          </h3>

          {/* StoreCare 플랜 */}
          {product.useCare && (
            <div>
              <p className="text-xs font-bold text-primary-dark mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                store care
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setProduct(p => ({ ...p, carePlan: 'basic' }))}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-colors ${
                    product.carePlan === 'basic' ? 'border-primary-light bg-primary-lighter' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="text-sm font-bold text-gray-900">{t.careBasic}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.careBasicDesc}</p>
                  <p className="text-base font-bold text-primary mt-2">{fmt(STORECARE_BASIC)}{t.won}<span className="text-xs font-normal text-gray-500">{t.perMonth}</span></p>
                </button>
                <button
                  type="button"
                  onClick={() => setProduct(p => ({ ...p, carePlan: 'plus' }))}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-colors relative ${
                    product.carePlan === 'plus' ? 'border-primary-light bg-primary-lighter' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="absolute -top-2 right-3 px-2 py-0.5 bg-primary text-white text-3xs font-bold rounded-full">{t.recommended}</span>
                  <p className="text-sm font-bold text-gray-900">{t.carePlus}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.carePlusDesc}</p>
                  <p className="text-base font-bold text-primary mt-2">{fmt(STORECARE_PLUS)}{t.won}<span className="text-xs font-normal text-gray-500">{t.perMonth}</span></p>
                </button>
              </div>
            </div>
          )}

          {/* StoreAgent 플랜 */}
          {product.useAgent && (
            <div>
              <p className="text-xs font-bold text-primary-dark mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                store agent
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setProduct(p => ({ ...p, agentPlan: 'free' }))}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                    product.agentPlan === 'free' ? 'border-primary-light bg-primary-lighter' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="text-xs font-bold text-gray-900">{t.agentFreeName}</p>
                  <p className="text-3xs text-gray-500 mt-0.5">{t.agentFreeDesc}</p>
                  <p className="text-sm font-bold text-primary mt-1.5">{t.agentFreeFree}</p>
                </button>
                <button
                  type="button"
                  onClick={() => setProduct(p => ({ ...p, agentPlan: 'standard' }))}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-colors relative ${
                    product.agentPlan === 'standard' ? 'border-primary-light bg-primary-lighter' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="absolute -top-2 right-2 px-1.5 py-0.5 bg-primary text-white text-[9px] font-bold rounded-full">{t.recommended}</span>
                  <p className="text-xs font-bold text-gray-900">{t.agentStdName}</p>
                  <p className="text-3xs text-gray-500 mt-0.5">{t.agentStdDesc}</p>
                  <p className="text-sm font-bold text-primary mt-1.5">{fmt(AGENT_STANDARD)}{t.won}<span className="text-[9px] font-normal text-gray-500">{t.perMonth}</span></p>
                </button>
                <button
                  type="button"
                  onClick={() => setProduct(p => ({ ...p, agentPlan: 'premium' }))}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                    product.agentPlan === 'premium' ? 'border-primary-light bg-primary-lighter' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="text-xs font-bold text-gray-900">{t.agentPremName}</p>
                  <p className="text-3xs text-gray-500 mt-0.5">{t.agentPremDesc}</p>
                  <p className="text-sm font-bold text-primary mt-1.5">{fmt(AGENT_PREMIUM)}{t.won}<span className="text-[9px] font-normal text-gray-500">{t.perMonth}</span></p>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Step 4: 예상 비용 ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-bold text-gray-900">{t.step4Title}</h3>
        </div>

        {/* 예시 금액 disclaimer */}
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-bold">{t.disclaimerStrong}</span>{t.disclaimerRest}
          </p>
        </div>

        {noneSelected ? (
          <div className="text-center py-8 text-gray-500">
            <Store className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm whitespace-pre-line">{t.emptyHint}</p>
          </div>
        ) : (
          <>
            {/* 비용 상세 내역 */}
            <div className="space-y-2.5 mb-5">
              {product.useCare && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      store care {product.carePlan === 'plus' ? t.careLinePlus : t.careLineBasic}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{fmt(estimate.careMonthly)}{t.won}{t.perMonth}</span>
                  </div>
                  {estimate.tempMonthly > 0 && (
                    <div className="flex items-center justify-between pl-3.5">
                      <span className="text-xs text-gray-500">
                        {product.carePlan === 'basic' ? t.tempAddBasic : t.tempAddPlus}
                      </span>
                      <span className="text-xs font-medium text-gray-700">+{fmt(estimate.tempMonthly)}{t.won}{t.perMonth}</span>
                    </div>
                  )}
                </>
              )}
              {product.useInsight && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    {t.insightLine(preset.cameraCount)}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{fmt(estimate.insightMonthly)}{t.won}{t.perMonth}</span>
                </div>
              )}
              {product.useAgent && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    store agent {product.agentPlan === 'free' ? t.agentLineFree : product.agentPlan === 'standard' ? t.agentLineStd : t.agentLinePrem}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {estimate.agentMonthly === 0 ? t.free : `${fmt(estimate.agentMonthly)}${t.won}${t.perMonth}`}
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 pt-4">
              {/* 월 비용 합산 */}
              <div className="flex items-end justify-between mb-2">
                <span className="text-sm font-medium text-gray-500">{t.monthlySum}</span>
                <div className="text-right">
                  <span className="text-3xl font-bold text-gray-900">~{fmt(estimate.monthly)}</span>
                  <span className="text-sm font-normal text-gray-500 ml-1">{t.won}{t.perMonth}</span>
                </div>
              </div>

              {/* 일 환산 */}
              <div className="flex items-center justify-end mb-3">
                <span className="text-xs text-primary font-medium bg-primary/5 px-2 py-0.5 rounded">
                  {t.perDay(fmt(Math.round(estimate.monthly / 30)))}
                </span>
              </div>

              {/* 초기 장비비 */}
              {estimate.oneTime > 0 && (
                <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-3 mb-3">
                  <span className="text-gray-600">{t.initialDevice}</span>
                  <span className="font-medium text-gray-900">{fmt(estimate.oneTime)}{t.won}</span>
                </div>
              )}
            </div>

            {/* 포함 기능 */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{t.selectedFeatures}</p>
              <div className="grid grid-cols-2 gap-2">
                {product.useCare && (
                  <>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      {t.featDirt}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      {t.featStay}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      {t.featNight}
                    </div>
                    {product.carePlan === 'plus' && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        {t.featTemp}
                      </div>
                    )}
                  </>
                )}
                {product.useInsight && (
                  <>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      {t.featFlow}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      {t.featDash}
                    </div>
                  </>
                )}
                {product.useAgent && (
                  <>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      {t.featBriefing}
                    </div>
                    {product.agentPlan !== 'free' && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        {product.agentPlan === 'premium' ? t.featAgentPrem : t.featAgentStd}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {estimate.suggestUpgrade && (
              <div className="mt-4 p-3 bg-primary-lighter border border-primary-light rounded-lg">
                <p className="text-xs text-primary-dark font-medium">
                  {t.upgradeMsg(fmt(STORECARE_PLUS))}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── 이메일 견적 받기 ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" />
          {t.emailTitle}
        </h3>
        {!email.quoteSubmitted ? (
          <form onSubmit={handleQuoteSubmit}>
            <div className="flex gap-2">
              <div className="flex items-center flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-[border-color,box-shadow]">
                <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                <input
                  type="email"
                  required
                  placeholder={t.emailPlaceholder}
                  value={email.quoteEmail}
                  onChange={(e) => setEmail(prev => ({ ...prev, quoteEmail: e.target.value }))}
                  className="w-full pl-2.5 py-3 bg-transparent text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={email.isSubmitting}
                className="btn-primary py-3 px-5 shrink-0 shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {email.isSubmitting && <Spinner />}
                {t.emailBtn}
              </button>
            </div>
            {email.error && (
              <p className="flex items-center gap-1.5 text-xs text-error mt-2" role="alert">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {email.error}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-2">{t.emailNote}</p>
          </form>
        ) : (
          <div className="p-4 bg-primary-lighter rounded-xl border border-primary-light text-center">
            <Check className="w-7 h-7 text-primary mx-auto mb-1.5" />
            <p className="text-primary-dark font-bold text-sm">{t.submittedTitle}</p>
            <button type="button" onClick={() => setEmail(e => ({ ...e, quoteSubmitted: false }))} className="text-xs text-primary underline mt-2 hover:text-primary-dark cursor-pointer">{t.recalc}</button>
          </div>
        )}
      </div>

      {/* ── CTA ── */}
      <Link
        href={localeHref(locale, '/contact') + '?plan=enterprise'}
        className="flex items-center justify-center gap-2 w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors text-sm"
      >
        {t.ctaConsult}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
