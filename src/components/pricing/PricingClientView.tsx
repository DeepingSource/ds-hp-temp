'use client';

import { useState } from 'react';
import { Building2, Store } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import Link from 'next/link';
import B2cPlans from './B2cPlans';
import B2bQuoteSimulator from './B2bQuoteSimulator';

interface PricingClientViewProps {
  locale?: Locale;
}

/* ─── i18n content ─── */
export interface Content {
  toggleB2c: string;
  toggleB2b: string;
  // B2C
  b2cHeading: string;
  b2cSub: string;
  careStep: string;
  careDesc: string;
  carePerMonth: string; // ~/월
  careFeatures: string[];
  insightStep: string;
  insightDesc: string;
  insightPerMonth: string;
  insightBasis: string; // 카메라 8대 기준
  insightFeatures: string[];
  agentStep: string;
  agentDesc: string;
  agentFree: string; // 무료
  agentPriceTail: string; // ~25,000원/월
  agentFeatures: string[];
  freeConsult: string;
  startFree: string;
  diffTitle: string;
  freeBadge: string;
  paidBadge: string;
  saaiBasic: string;
  storeCare: string;
  saaiFeatures: string[];
  careDiffFeatures: string[];
  diffFooterPre: string;
  diffFooterInfo: string;
  diffFooterMid: string;
  diffFooterMonitor: string;
  diffFooterPost: string;
  simLink: string;
  agentCompareLink: string;
  // B2B
  b2bHeading: string;
  b2bSub: string;
  b2bSimTitle: string;
  b2bSimSub: string;
  b2bCamLabel: string;
  unitDevice: string;
  b2bSmall: string; b2bMid: string; b2bLarge: string;
  b2bStoreLabel: string;
  unitStore: string;
  b2b3: string; b2b50: string; b2b100: string;
  discountLabel: string;
  perStoreCost: string;
  perStoreBasis: string;
  totalMonthly: string;
  totalBasis: (count: number) => string;
  won: string;
  estimateDisclaimer: string;
  tiers: { range: string; rate: string }[];
  b2bEmailLabel: string;
  emailPlaceholder: string;
  getQuote: string;
  b2bEmailNote: string;
  submittedTitle: string;
  submittedSub: string;
  recalc: string;
  entBadge: string;
  entTitle: string;
  entDesc: string;
  entFeatures: string[];
  entCta: string;
  backToB2c: string;
  // Inline simulator
  simHeading: string;
  simSub: string;
  simSelectLabel: string;
  simCamLabel: string;
  simSmall: string; simLarge: string;
  simEmailLabel: string;
  simEmailNote: string;
  simResultLabel: string;
  simPerDay: (n: string) => string;
  simEmptyHint: string;
  simResultDisclaimer: string;
  detailSimLink: string;
  // Bundle CTA
  bundleHeading: string;
  bundleBodyPre: string;
  bundleBodyStrong: string;
  bundleBodyPost: string;
  bundleCta: string;
  bundleSimLink: string;
  // form-request strings
  simReqName: string;
  simReqInquiry: string;
  simReqMessage: (args: { cam: number; cost: string }) => string;
  b2bReqName: string;
  b2bReqInquiry: string;
  b2bReqMessage: (count: number, cameras: number) => string;
  // quote-form submit error copy
  errSubmitFailed: string;
  errGeneric: string;
}

const C: Record<Locale, Content> = {
  ko: {
    toggleB2c: '개별 매장',
    toggleB2b: '프랜차이즈 / 다점포',
    b2cHeading: '매장에 맞는 솔루션을 선택하세요',
    b2cSub: '아르바이트 야간 근무 1회 비용보다 낮은 금액으로 시작할 수 있습니다.',
    careStep: '01 관찰',
    careDesc: 'CCTV 기반 실시간 매장 모니터링',
    carePerMonth: '~/월',
    careFeatures: ['오염·진열 이상 감지', '비정상 체류 알림', '온도 모니터링 (플러스)'],
    insightStep: '02 분석',
    insightDesc: '고객 행동 분석 및 인사이트 대시보드',
    insightPerMonth: '~/월',
    insightBasis: '카메라 8대 기준',
    insightFeatures: ['구역별 방문자 객수', '동선·체류 분석', '재방문·성별 연계 데이터'],
    agentStep: '03 실행',
    agentDesc: 'AI 기반 매장 운영 자동화 비서',
    agentFree: '무료',
    agentPriceTail: '~25,000원/월',
    agentFeatures: ['매일 모닝 브리핑 (무료)', 'POS 연동 분석 (15,000원~)', '대화형 AI 채팅 (25,000원~)'],
    freeConsult: '무료 상담 신청',
    startFree: '무료로 시작하기',
    diffTitle: 'store agent 기본(무료) vs store care(유료) — 무엇이 다른가요?',
    freeBadge: '무료',
    paidBadge: '유료',
    saaiBasic: 'store agent 기본형',
    storeCare: 'store care',
    saaiFeatures: ['매일 아침 브리핑 (날씨·이벤트·운영 팁)', 'AI 기반 체크리스트', '주간 뉴스레터'],
    careDiffFeatures: ['실시간 이상 상황 감지', '냉장고 온도·진열 상태·청결 알림', '카카오톡/앱 푸시 실시간 알림'],
    diffFooterPre: 'store agent 기본형은 ',
    diffFooterInfo: '정보 제공',
    diffFooterMid: ' 서비스 · store care는 ',
    diffFooterMonitor: '매장 모니터링·알림',
    diffFooterPost: ' 서비스',
    simLink: '요금 시뮬레이션 해보기',
    agentCompareLink: 'store agent 상세 플랜 비교',
    b2bHeading: '가맹점 전체를 데이터로 관리하세요',
    b2bSub: '규모에 따른 시너지 할인과 전용 기능을 제공합니다.',
    b2bSimTitle: '다점포 견적 시뮬레이션',
    b2bSimSub: '매장 수에 따른 할인율과 예상 비용을 확인하세요.',
    b2bCamLabel: '매장당 평균 카메라 수',
    unitDevice: '대',
    b2bSmall: '소형 (1대)', b2bMid: '중형 (8대)', b2bLarge: '대형 (20대)',
    b2bStoreLabel: '운영 매장 수',
    unitStore: '개 매장',
    b2b3: '3개', b2b50: '50개', b2b100: '100개',
    discountLabel: '시너지 할인율',
    perStoreCost: '매장당 예상 비용',
    perStoreBasis: 'store care 플러스 기준/월',
    totalMonthly: '전체 예상 월 비용',
    totalBasis: (count) => `${count}개 매장 합계`,
    won: '원',
    estimateDisclaimer: '※ 위 금액은 참고용 예시이며, 실제 환경(카메라 규격·네트워크·설치 조건 등)에 따라 달라질 수 있습니다.',
    tiers: [
      { range: '5~9개', rate: '10%' },
      { range: '10~19개', rate: '15%' },
      { range: '20~49개', rate: '20%' },
      { range: '50개 이상', rate: '30%' },
    ],
    b2bEmailLabel: '맞춤 견적서를 이메일로 받아보세요',
    emailPlaceholder: '이메일 주소',
    getQuote: '견적 받기',
    b2bEmailNote: '영업일 기준 1일 내 전문 담당자가 상세 견적을 보내드립니다.',
    submittedTitle: '견적 요청이 접수되었습니다!',
    submittedSub: '담당자가 확인 후 연락드리겠습니다.',
    recalc: '다시 계산하기',
    entBadge: '본사 전용',
    entTitle: '엔터프라이즈 맞춤 솔루션',
    entDesc: '전국 가맹점 통합 관제, 커스텀 API 연동, 전담 CS 팀 배정',
    entFeatures: ['수백 개 매장 실시간 대시보드', 'ERP/POS 커스텀 연동 API', '도입 규모별 맞춤 단가'],
    entCta: '맞춤 견적 받기',
    backToB2c: '개별 매장 요금 보기',
    simHeading: '우리 매장 요금이 궁금하신가요?',
    simSub: '원하는 솔루션과 카메라 대수를 선택하면 예상 월 비용을 바로 확인할 수 있습니다.',
    simSelectLabel: '솔루션 선택 (복수 선택 가능)',
    simCamLabel: '카메라 대수',
    simSmall: '소형 (2대)', simLarge: '대형 (32대)',
    simEmailLabel: '견적 결과를 이메일로 받기',
    simEmailNote: '견적 산출 용도로만 사용됩니다.',
    simResultLabel: '선택 솔루션 예상 월 비용',
    simPerDay: (n) => `하루 약 ${n}원`,
    simEmptyHint: '솔루션을 선택하면 비용이 계산됩니다',
    simResultDisclaimer: '※ 참고용 예시이며 실제 계약 조건에 따라 달라집니다.',
    detailSimLink: '상세 시뮬레이션 하기',
    bundleHeading: '관찰 + 분석 + 실행을 하나로',
    bundleBodyPre: '세 가지 제품을 묶어 도입하시면 ',
    bundleBodyStrong: '최대 30% 시너지 할인',
    bundleBodyPost: '이 적용됩니다. 매장 운영을 하나의 흐름으로 잇습니다.',
    bundleCta: '시너지 패키지 상담받기',
    bundleSimLink: '요금 시뮬레이션',
    simReqName: '요금 시뮬레이터',
    simReqInquiry: '견적 요청',
    simReqMessage: ({ cam, cost }) => `카메라 ${cam}대 기준 store insight 예상 비용 ${cost}원/월 견적 요청`,
    b2bReqName: '프랜차이즈 견적',
    b2bReqInquiry: '엔터프라이즈 견적',
    b2bReqMessage: (count, cameras) => `프랜차이즈 ${count}개 매장(매장당 카메라 ${cameras}대) 견적 요청. 시너지 할인 적용 문의.`,
    errSubmitFailed: '견적 요청에 실패했습니다. 다시 시도해주세요.',
    errGeneric: '일시적인 오류입니다. 잠시 후 다시 시도해 주세요.',
  },
  en: {
    toggleB2c: 'Single store',
    toggleB2b: 'Franchise / multi-store',
    b2cHeading: 'Choose the solution that fits your store',
    b2cSub: 'You can start for less than the cost of a single overnight part-time shift.',
    careStep: '01 Observe',
    careDesc: 'Real-time, CCTV-based store monitoring',
    carePerMonth: '~/mo',
    careFeatures: ['Hygiene & display anomaly detection', 'Abnormal dwell alerts', 'Temperature monitoring (Plus)'],
    insightStep: '02 Analyze',
    insightDesc: 'Customer-behavior analytics and insight dashboard',
    insightPerMonth: '~/mo',
    insightBasis: 'Based on 8 cameras',
    insightFeatures: ['Visitor count by zone', 'Flow & dwell analysis', 'Revisit & gender-linked data'],
    agentStep: '03 Act',
    agentDesc: 'AI-powered store-operations automation assistant',
    agentFree: 'Free',
    agentPriceTail: '~25,000 KRW/mo',
    agentFeatures: ['Daily morning briefing (free)', 'POS-integrated analysis (from 15,000 KRW)', 'Conversational AI chat (from 25,000 KRW)'],
    freeConsult: 'Request a free consultation',
    startFree: 'Start for free',
    diffTitle: 'store agent basic (free) vs store care (paid) — what is the difference?',
    freeBadge: 'Free',
    paidBadge: 'Paid',
    saaiBasic: 'store agent basic',
    storeCare: 'store care',
    saaiFeatures: ['Daily morning briefing (weather, events, operating tips)', 'AI-powered checklist', 'Weekly newsletter'],
    careDiffFeatures: ['Real-time anomaly detection', 'Refrigerator temperature, display & cleanliness alerts', 'Real-time KakaoTalk / app push alerts'],
    diffFooterPre: 'store agent basic is an ',
    diffFooterInfo: 'information',
    diffFooterMid: ' service · store care is a ',
    diffFooterMonitor: 'store monitoring & alerts',
    diffFooterPost: ' service',
    simLink: 'Try the pricing simulator',
    agentCompareLink: 'Compare store agent plans in detail',
    b2bHeading: 'Manage your entire network with data',
    b2bSub: 'Scale-based synergy discounts and dedicated features included.',
    b2bSimTitle: 'Multi-store quote simulation',
    b2bSimSub: 'See the discount rate and estimated cost based on your store count.',
    b2bCamLabel: 'Average cameras per store',
    unitDevice: '',
    b2bSmall: 'Small (1)', b2bMid: 'Medium (8)', b2bLarge: 'Large (20)',
    b2bStoreLabel: 'Number of stores',
    unitStore: ' stores',
    b2b3: '3', b2b50: '50', b2b100: '100',
    discountLabel: 'Synergy discount',
    perStoreCost: 'Estimated cost per store',
    perStoreBasis: 'Based on store care Plus / mo',
    totalMonthly: 'Estimated total monthly cost',
    totalBasis: (count) => `Total for ${count} stores`,
    won: ' KRW',
    estimateDisclaimer: '※ The figures above are illustrative; actual cost may vary by environment (camera specs, network, installation conditions, etc.).',
    tiers: [
      { range: '5–9 stores', rate: '10%' },
      { range: '10–19 stores', rate: '15%' },
      { range: '20–49 stores', rate: '20%' },
      { range: '50+ stores', rate: '30%' },
    ],
    b2bEmailLabel: 'Get a custom quote by email',
    emailPlaceholder: 'Email address',
    getQuote: 'Get quote',
    b2bEmailNote: 'A specialist will send a detailed quote within one business day.',
    submittedTitle: 'Your quote request has been received!',
    submittedSub: 'A specialist will review it and get in touch.',
    recalc: 'Recalculate',
    entBadge: 'Headquarters only',
    entTitle: 'Enterprise custom solution',
    entDesc: 'Nationwide store control, custom API integration, and a dedicated CS team',
    entFeatures: ['Real-time dashboard for hundreds of stores', 'Custom ERP/POS integration API', 'Tiered pricing by deployment scale'],
    entCta: 'Get a custom quote',
    backToB2c: 'View single-store pricing',
    simHeading: 'Curious about pricing for your store?',
    simSub: 'Select the solutions and camera count you want to see your estimated monthly cost instantly.',
    simSelectLabel: 'Select solutions (multiple allowed)',
    simCamLabel: 'Number of cameras',
    simSmall: 'Small (2)', simLarge: 'Large (32)',
    simEmailLabel: 'Get the quote result by email',
    simEmailNote: 'Used only to produce your quote.',
    simResultLabel: 'Estimated monthly cost of selected solutions',
    simPerDay: (n) => `About ${n} KRW/day`,
    simEmptyHint: 'Select a solution to calculate the cost',
    simResultDisclaimer: '※ Illustrative only; actual cost depends on contract terms.',
    detailSimLink: 'Run the detailed simulation',
    bundleHeading: 'Observe + Analyze + Act, all in one',
    bundleBodyPre: 'Deploy all three products together and ',
    bundleBodyStrong: 'a synergy discount of up to 30%',
    bundleBodyPost: ' applies — connecting your store operations into one flow.',
    bundleCta: 'Talk to us about the synergy package',
    bundleSimLink: 'Pricing simulator',
    simReqName: 'Pricing simulator',
    simReqInquiry: 'Quote request',
    simReqMessage: ({ cam, cost }) => `store insight quote request — estimated ${cost} KRW/mo based on ${cam} cameras`,
    b2bReqName: 'Franchise quote',
    b2bReqInquiry: 'Enterprise quote',
    b2bReqMessage: (count, cameras) => `Franchise quote request for ${count} stores (${cameras} cameras per store). Inquiry about synergy discount.`,
    errSubmitFailed: 'Quote request failed. Please try again.',
    errGeneric: 'A temporary error occurred. Please try again shortly.',
  },
  jp: {
    toggleB2c: '個別店舗',
    toggleB2b: 'フランチャイズ / 多店舗',
    b2cHeading: '店舗に合ったソリューションをお選びください',
    b2cSub: 'アルバイトの夜勤1回分よりも低い金額で始められます。',
    careStep: '01 観察',
    careDesc: 'CCTVベースのリアルタイム店舗モニタリング',
    carePerMonth: '〜/月',
    careFeatures: ['汚れ・陳列の異常検知', '異常滞留の通知', '温度モニタリング（プラス）'],
    insightStep: '02 分析',
    insightDesc: '顧客行動分析とインサイトダッシュボード',
    insightPerMonth: '〜/月',
    insightBasis: 'カメラ8台を基準',
    insightFeatures: ['エリア別の来店客数', '動線・滞留分析', '再来店・性別連携データ'],
    agentStep: '03 実行',
    agentDesc: 'AIベースの店舗運営自動化アシスタント',
    agentFree: '無料',
    agentPriceTail: '〜25,000円/月',
    agentFeatures: ['毎朝のモーニングブリーフィング（無料）', 'POS連携分析（15,000円〜）', '対話型AIチャット（25,000円〜）'],
    freeConsult: '無料相談を申し込む',
    startFree: '無料で始める',
    diffTitle: 'store agent 基本（無料）vs store care（有料） — 何が違いますか？',
    freeBadge: '無料',
    paidBadge: '有料',
    saaiBasic: 'store agent 基本型',
    storeCare: 'store care',
    saaiFeatures: ['毎朝のブリーフィング（天気・イベント・運営のヒント）', 'AIベースのチェックリスト', '週刊ニュースレター'],
    careDiffFeatures: ['リアルタイム異常検知', '冷蔵庫の温度・陳列状態・清潔さの通知', 'カカオトーク／アプリプッシュのリアルタイム通知'],
    diffFooterPre: 'store agent 基本型は',
    diffFooterInfo: '情報提供',
    diffFooterMid: 'サービス・store care は',
    diffFooterMonitor: '店舗モニタリング・通知',
    diffFooterPost: 'サービスです',
    simLink: '料金シミュレーションを試す',
    agentCompareLink: 'store agent 詳細プラン比較',
    b2bHeading: '加盟店全体をデータで管理しましょう',
    b2bSub: '規模に応じたシナジー割引と専用機能をご提供します。',
    b2bSimTitle: '多店舗見積もりシミュレーション',
    b2bSimSub: '店舗数に応じた割引率と想定費用をご確認ください。',
    b2bCamLabel: '店舗あたり平均カメラ台数',
    unitDevice: '台',
    b2bSmall: '小型（1台）', b2bMid: '中型（8台）', b2bLarge: '大型（20台）',
    b2bStoreLabel: '運営店舗数',
    unitStore: '店舗',
    b2b3: '3店舗', b2b50: '50店舗', b2b100: '100店舗',
    discountLabel: 'シナジー割引率',
    perStoreCost: '店舗あたり想定費用',
    perStoreBasis: 'store care プラス基準/月',
    totalMonthly: '全体の想定月額費用',
    totalBasis: (count) => `${count}店舗の合計`,
    won: '円',
    estimateDisclaimer: '※ 上記の金額は参考例であり、実際の環境（カメラ規格・ネットワーク・設置条件など）により異なる場合があります。',
    tiers: [
      { range: '5〜9店舗', rate: '10%' },
      { range: '10〜19店舗', rate: '15%' },
      { range: '20〜49店舗', rate: '20%' },
      { range: '50店舗以上', rate: '30%' },
    ],
    b2bEmailLabel: 'カスタム見積もりをメールで受け取る',
    emailPlaceholder: 'メールアドレス',
    getQuote: '見積もりを受け取る',
    b2bEmailNote: '営業日基準1日以内に専門担当者が詳細なお見積りをお送りします。',
    submittedTitle: '見積もり依頼を受け付けました！',
    submittedSub: '担当者が確認後、ご連絡いたします。',
    recalc: '再計算する',
    entBadge: '本社専用',
    entTitle: 'エンタープライズ向けカスタムソリューション',
    entDesc: '全国加盟店の統合管制、カスタムAPI連携、専任CSチームの配置',
    entFeatures: ['数百店舗のリアルタイムダッシュボード', 'ERP/POSカスタム連携API', '導入規模に応じた段階単価'],
    entCta: 'カスタム見積もりを受け取る',
    backToB2c: '個別店舗の料金を見る',
    simHeading: '自店舗の料金が気になりますか？',
    simSub: 'ご希望のソリューションとカメラ台数を選択すると、想定月額費用がすぐに確認できます。',
    simSelectLabel: 'ソリューション選択（複数選択可）',
    simCamLabel: 'カメラ台数',
    simSmall: '小型（2台）', simLarge: '大型（32台）',
    simEmailLabel: '見積もり結果をメールで受け取る',
    simEmailNote: '見積もり算出の用途にのみ使用します。',
    simResultLabel: '選択ソリューションの想定月額費用',
    simPerDay: (n) => `1日あたり約${n}円`,
    simEmptyHint: 'ソリューションを選択すると費用が計算されます',
    simResultDisclaimer: '※ 参考例であり、実際の契約条件により異なります。',
    detailSimLink: '詳細シミュレーションを行う',
    bundleHeading: '観察 + 分析 + 実行をひとつに',
    bundleBodyPre: '3つの製品をまとめて導入されると、',
    bundleBodyStrong: '最大30%のシナジー割引',
    bundleBodyPost: 'が適用されます。店舗運営をひとつの流れにつなぎます。',
    bundleCta: 'シナジーパッケージを相談する',
    bundleSimLink: '料金シミュレーション',
    simReqName: '料金シミュレーター',
    simReqInquiry: '見積もり依頼',
    simReqMessage: ({ cam, cost }) => `カメラ${cam}台を基準とした store insight 想定費用 ${cost}円/月の見積もり依頼`,
    b2bReqName: 'フランチャイズ見積もり',
    b2bReqInquiry: 'エンタープライズ見積もり',
    b2bReqMessage: (count, cameras) => `フランチャイズ${count}店舗（1店舗あたりカメラ${cameras}台）の見積もり依頼。シナジー割引適用のお問い合わせ。`,
    errSubmitFailed: 'お申し込みに失敗しました。もう一度お試しください。',
    errGeneric: '一時的なエラーが発生しました。しばらくしてからもう一度お試しください。',
  },
};

export default function PricingClientView({ locale = 'en' }: PricingClientViewProps) {
  const t = C[locale];
  const [persona, setPersona] = useState<'b2c' | 'b2b'>('b2c');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Persona View Toggle */}
      <section className="pt-8 pb-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
          <Breadcrumb items={[{ name: crumb('pricing', locale), path: '/pricing' }]} locale={locale} tone="light" />
        </div>
        <div className="max-w-md mx-auto px-4">
          <div className="flex p-1.5 bg-gray-200/50 rounded-2xl shadow-inner border border-gray-200/60">
            <button
              type="button"
              aria-pressed={persona === 'b2c'}
              onClick={() => setPersona('b2c')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-[color,background-color,box-shadow] duration-300 cursor-pointer ${persona === 'b2c'
                ? 'bg-white text-gray-900 shadow-md ring-1 ring-black/5'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              <Store className="w-4 h-4" />
              {t.toggleB2c}
            </button>
            <button
              type="button"
              aria-pressed={persona === 'b2b'}
              onClick={() => setPersona('b2b')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-[color,background-color,box-shadow] duration-300 cursor-pointer ${persona === 'b2b'
                ? 'bg-white text-gray-900 shadow-md ring-1 ring-black/5'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              <Building2 className="w-4 h-4" />
              {t.toggleB2b}
            </button>
          </div>
        </div>
      </section>

      {persona === 'b2c' ? (
        /* ════════════════════════════════════════
           B2C View — 개별 매장 점주용
           ════════════════════════════════════════ */
        <B2cPlans t={t} locale={locale} />
      ) : (
        /* ════════════════════════════════════════
           B2B View — 프랜차이즈 본사 / 다점포용
           ════════════════════════════════════════ */
        <B2bQuoteSimulator t={t} locale={locale} onBackToB2c={() => setPersona('b2c')} />
      )}

      {/* ════════════════════════════════
         Bundle Synergy CTA
         ════════════════════════════════ */}
      <AnimatedSection className="py-20 bg-gray-950 overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.05]" aria-hidden="true" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-block mb-5 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-sm font-bold text-primary-light uppercase tracking-wider">
              Synergy Package
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
            {t.bundleHeading}
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed max-w-xl mx-auto">
            {t.bundleBodyPre}<strong className="text-white font-medium">{t.bundleBodyStrong}</strong>{t.bundleBodyPost}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={localeHref(locale, '/contact')} className="btn-primary px-8 py-4 shadow-[0_0_20px_rgb(var(--primary-rgb)_/_0.3)] hover:shadow-[0_0_30px_rgb(var(--primary-rgb)_/_0.5)] transition-[box-shadow]">
              {t.bundleCta}
            </Link>
            <Link
              href={localeHref(locale, '/pricing/simulator')}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-medium hover:bg-white/20 transition-colors text-sm"
            >
              {t.bundleSimLink}
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
