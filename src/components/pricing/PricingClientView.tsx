'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Eye, LayoutGrid, Zap, Calculator, ShieldCheck, Mail, Building2, Store, Users, Shield } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import { type Locale } from '@/lib/i18n';
import { RoiCalculatorWidget } from '@/components/mockups';

export interface PlanData {
  name: string;
  price: string;
  priceUnit?: string;
  pricePeriod?: string;
  features: string[];
  note?: string;
  recommended?: boolean;
}

interface PricingClientViewProps {
  locale?: Locale;
  storeCarePlans?: PlanData[];
  storeAgentPlans?: PlanData[];
}

const SIM_PRODUCT_OPTIONS = [
  { key: 'care', label: 'Store Care', color: 'blue' },
  { key: 'insight', label: 'Store Insight', color: 'blue' },
  { key: 'agent', label: 'Store Agent', color: 'blue' },
] as const;

/* ─── i18n content ─── */
interface Content {
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
  b2bReqMessage: (count: number) => string;
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
    diffTitle: 'SAAI(무료) vs Store Care(유료) — 무엇이 다른가요?',
    freeBadge: '무료',
    paidBadge: '유료',
    saaiBasic: 'SAAI 기본형',
    storeCare: 'Store Care',
    saaiFeatures: ['매일 아침 브리핑 (날씨·이벤트·운영 팁)', 'AI 기반 체크리스트', '주간 뉴스레터'],
    careDiffFeatures: ['CCTV 기반 실시간 매장 감지', '냉장고 온도·진열 상태·청결 알림', '카카오톡/앱 푸시 실시간 알림'],
    diffFooterPre: 'SAAI 기본형은 ',
    diffFooterInfo: '정보 제공',
    diffFooterMid: ' 서비스 · Store Care는 ',
    diffFooterMonitor: '매장 모니터링·알림',
    diffFooterPost: ' 서비스',
    simLink: '요금 시뮬레이션 해보기',
    agentCompareLink: 'StoreAgent 상세 플랜 비교',
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
    perStoreBasis: 'StoreCare 플러스 기준/월',
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
    entFeatures: ['수백 개 매장 실시간 대시보드', 'ERP/POS 커스텀 연동 API', '도입 규모별 B2B 파격 단가'],
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
    bundleHeading: '관찰 + 분석 + 실행 + 학습을 하나로',
    bundleBodyPre: '세 가지 제품을 묶어 도입하시면 ',
    bundleBodyStrong: '최대 30% 시너지 할인',
    bundleBodyPost: '이 적용됩니다. 매장 운영이 완전한 오토파일럿 상태가 됩니다.',
    bundleCta: '시너지 패키지 상담받기',
    bundleSimLink: '요금 시뮬레이션',
    simReqName: '요금 시뮬레이터',
    simReqInquiry: '견적 요청',
    simReqMessage: ({ cam, cost }) => `카메라 ${cam}대 기준 Store Insight 예상 비용 ${cost}원/월 견적 요청`,
    b2bReqName: '프랜차이즈 견적',
    b2bReqInquiry: '엔터프라이즈 견적',
    b2bReqMessage: (count) => `프랜차이즈 ${count}개 매장 견적 요청. 시너지 할인 적용 문의.`,
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
    diffTitle: 'SAAI (free) vs Store Care (paid) — what is the difference?',
    freeBadge: 'Free',
    paidBadge: 'Paid',
    saaiBasic: 'SAAI Basic',
    storeCare: 'Store Care',
    saaiFeatures: ['Daily morning briefing (weather, events, operating tips)', 'AI-powered checklist', 'Weekly newsletter'],
    careDiffFeatures: ['Real-time CCTV-based store detection', 'Refrigerator temperature, display & cleanliness alerts', 'Real-time KakaoTalk / app push alerts'],
    diffFooterPre: 'SAAI Basic is an ',
    diffFooterInfo: 'information',
    diffFooterMid: ' service · Store Care is a ',
    diffFooterMonitor: 'store monitoring & alerts',
    diffFooterPost: ' service',
    simLink: 'Try the pricing simulator',
    agentCompareLink: 'Compare StoreAgent plans in detail',
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
    perStoreBasis: 'Based on StoreCare Plus / mo',
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
    entFeatures: ['Real-time dashboard for hundreds of stores', 'Custom ERP/POS integration API', 'Aggressive B2B pricing by deployment scale'],
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
    bundleHeading: 'Observe + Analyze + Act + Learn, all in one',
    bundleBodyPre: 'Deploy all three products together and ',
    bundleBodyStrong: 'a synergy discount of up to 30%',
    bundleBodyPost: ' applies. Your store operations become fully autopilot.',
    bundleCta: 'Talk to us about the synergy package',
    bundleSimLink: 'Pricing simulator',
    simReqName: 'Pricing simulator',
    simReqInquiry: 'Quote request',
    simReqMessage: ({ cam, cost }) => `Store Insight quote request — estimated ${cost} KRW/mo based on ${cam} cameras`,
    b2bReqName: 'Franchise quote',
    b2bReqInquiry: 'Enterprise quote',
    b2bReqMessage: (count) => `Franchise quote request for ${count} stores. Inquiry about synergy discount.`,
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
    diffTitle: 'SAAI（無料）vs Store Care（有料） — 何が違いますか？',
    freeBadge: '無料',
    paidBadge: '有料',
    saaiBasic: 'SAAI 基本型',
    storeCare: 'Store Care',
    saaiFeatures: ['毎朝のブリーフィング（天気・イベント・運営のヒント）', 'AIベースのチェックリスト', '週刊ニュースレター'],
    careDiffFeatures: ['CCTVベースのリアルタイム店舗検知', '冷蔵庫の温度・陳列状態・清潔さの通知', 'カカオトーク／アプリプッシュのリアルタイム通知'],
    diffFooterPre: 'SAAI 基本型は',
    diffFooterInfo: '情報提供',
    diffFooterMid: 'サービス・Store Care は',
    diffFooterMonitor: '店舗モニタリング・通知',
    diffFooterPost: 'サービスです',
    simLink: '料金シミュレーションを試す',
    agentCompareLink: 'StoreAgent 詳細プラン比較',
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
    perStoreBasis: 'StoreCare プラス基準/月',
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
    entFeatures: ['数百店舗のリアルタイムダッシュボード', 'ERP/POSカスタム連携API', '導入規模別のB2B特別単価'],
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
    bundleHeading: '観察 + 分析 + 実行 + 学習をひとつに',
    bundleBodyPre: '3つの製品をまとめて導入されると、',
    bundleBodyStrong: '最大30%のシナジー割引',
    bundleBodyPost: 'が適用されます。店舗運営が完全なオートパイロット状態になります。',
    bundleCta: 'シナジーパッケージを相談する',
    bundleSimLink: '料金シミュレーション',
    simReqName: '料金シミュレーター',
    simReqInquiry: '見積もり依頼',
    simReqMessage: ({ cam, cost }) => `カメラ${cam}台を基準とした Store Insight 想定費用 ${cost}円/月の見積もり依頼`,
    b2bReqName: 'フランチャイズ見積もり',
    b2bReqInquiry: 'エンタープライズ見積もり',
    b2bReqMessage: (count) => `フランチャイズ${count}店舗の見積もり依頼。シナジー割引適用のお問い合わせ。`,
  },
};

export default function PricingClientView({ locale = 'en' }: PricingClientViewProps) {
  const t = C[locale];
  const [persona, setPersona] = useState<'b2c' | 'b2b'>('b2c');

  /* ── B2B multi-store simulator ── */
  const [b2bStoreCount, setB2bStoreCount] = useState(10);
  const [b2bCamerasPerStore, setB2bCamerasPerStore] = useState(4);
  const [b2bEmail, setB2bEmail] = useState('');
  const [b2bSubmitted, setB2bSubmitted] = useState(false);

  /* ── Inline simulator (simplified) ── */
  const [simCameras, setSimCameras] = useState<number>(8);
  const [simProducts, setSimProducts] = useState<Set<string>>(new Set(['insight']));
  const [simEmail, setSimEmail] = useState('');
  const [simSubmitted, setSimSubmitted] = useState(false);

  const toggleSimProduct = useCallback((key: string) => {
    setSimProducts((prev) => {
      const next = new Set(prev);
      if (next.has(key)) { next.delete(key); } else { next.add(key); }
      return next;
    });
  }, []);

  const simInsightCost = simProducts.has('insight') ? (simCameras <= 8 ? 100000 : 100000 + (simCameras - 8) * 10000) : 0;
  const simCareCost = simProducts.has('care') ? (simCameras <= 4 ? 14900 : 14900 + Math.ceil((simCameras - 4) / 2) * 2500) : 0;
  const simAgentCost = simProducts.has('agent') ? 15000 : 0;
  const estimatedCost = simInsightCost + simCareCost + simAgentCost;

  const handleSimulateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (simEmail) {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: t.simReqName,
            contact: simEmail,
            storeCount: '1',
            inquiryType: t.simReqInquiry,
            message: t.simReqMessage({ cam: simCameras, cost: estimatedCost.toLocaleString() }),
          }),
        });
        if (res.ok) setSimSubmitted(true);
      } catch {
        // 네트워크 오류 — 다음 시도 가능
      }
    }
  };

  const handleB2bSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (b2bEmail) {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: t.b2bReqName,
            contact: b2bEmail,
            storeCount: String(b2bStoreCount),
            inquiryType: t.b2bReqInquiry,
            message: t.b2bReqMessage(b2bStoreCount),
          }),
        });
        if (res.ok) setB2bSubmitted(true);
      } catch {
        // 네트워크 오류 — 다음 시도 가능
      }
    }
  };

  /* ── B2B 할인율 계산 ── */
  const getDiscount = (count: number) => {
    if (count >= 50) return 30;
    if (count >= 20) return 20;
    if (count >= 10) return 15;
    if (count >= 5) return 10;
    return 0;
  };

  const discount = getDiscount(b2bStoreCount);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Persona View Toggle */}
      <section className="pt-8 pb-12 bg-gradient-to-b from-white to-gray-50">
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
        <AnimatedSection className="py-12 bg-white rounded-t-3xl border-t border-gray-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {t.b2cHeading}
              </h2>
              <p className="text-gray-500">
                {t.b2cSub}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* StoreCare */}
              <div className="flex flex-col p-7 bg-white border border-blue-100 rounded-2xl hover:border-blue-300 transition-colors shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Eye className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-600">{t.careStep}</span>
                    <h3 className="text-lg font-bold text-gray-900">Store Care</h3>
                  </div>
                </div>

                <div className="mb-5 pb-5 border-b border-gray-100">
                  <span className="text-3xl font-bold text-gray-900">10,000원</span>
                  <span className="text-sm text-gray-500">{t.carePerMonth}</span>
                </div>

                <p className="text-sm text-gray-500 mb-5">{t.careDesc}</p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {t.careFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>

                <Link href="/contact" className="btn-secondary w-full text-center text-blue-700 hover:bg-blue-50 hover:border-blue-200">
                  {t.freeConsult}
                </Link>
              </div>

              {/* StoreInsight */}
              <div className="flex flex-col p-7 bg-white border border-blue-100 rounded-2xl hover:border-blue-300 transition-colors shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <LayoutGrid className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-600">{t.insightStep}</span>
                    <h3 className="text-lg font-bold text-gray-900">Store Insight</h3>
                  </div>
                </div>

                <div className="mb-5 pb-5 border-b border-gray-100">
                  <span className="text-3xl font-bold text-gray-900">100,000원</span>
                  <span className="text-sm text-gray-500">{t.insightPerMonth}</span>
                  <span className="text-xs text-gray-500 block mt-1">{t.insightBasis}</span>
                </div>

                <p className="text-sm text-gray-500 mb-5">{t.insightDesc}</p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {t.insightFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>

                <Link href="/contact" className="btn-secondary w-full text-center text-blue-700 hover:bg-blue-50 hover:border-blue-200">
                  {t.freeConsult}
                </Link>
              </div>

              {/* StoreAgent */}
              <div className="flex flex-col p-7 bg-white border border-blue-200 rounded-2xl shadow-[0_4px_20px_-4px_rgba(59,130,246,0.15)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-bl-[32px] flex items-start justify-end p-2.5">
                  <Zap className="w-4 h-4 text-white" />
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-600">{t.agentStep}</span>
                    <h3 className="text-lg font-bold text-gray-900">Store Agent</h3>
                  </div>
                </div>

                <div className="mb-5 pb-5 border-b border-gray-100">
                  <span className="text-3xl font-bold text-gray-900">{t.agentFree}</span>
                  <span className="text-sm text-gray-500">{t.agentPriceTail}</span>
                </div>

                <p className="text-sm text-gray-500 mb-5">{t.agentDesc}</p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {t.agentFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>

                <Link href="/contact" className="btn-primary w-full text-center shadow-md hover:shadow-lg">
                  {t.startFree}
                </Link>
              </div>
            </div>

            {/* SAAI(무료) vs Store Care(유료) 차이 안내 */}
            <div className="mt-10 bg-gray-50 rounded-2xl border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                {t.diffTitle}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">{t.freeBadge}</span>
                    <span className="font-bold text-gray-900">{t.saaiBasic}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    {t.saaiFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-1.5">
                        <Check className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">{t.paidBadge}</span>
                    <span className="font-bold text-gray-900">{t.storeCare}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    {t.careDiffFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-1.5">
                        <Check className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                {t.diffFooterPre}<strong>{t.diffFooterInfo}</strong>{t.diffFooterMid}<strong>{t.diffFooterMonitor}</strong>{t.diffFooterPost}
              </p>
            </div>

            {/* 상세 비교 링크 */}
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link
                href="/pricing/simulator"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                <Calculator className="w-4 h-4" />
                {t.simLink}
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/storeagent"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
              >
                {t.agentCompareLink}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      ) : (
        /* ════════════════════════════════════════
           B2B View — 프랜차이즈 본사 / 다점포용
           ════════════════════════════════════════ */
        <AnimatedSection className="py-12 bg-white rounded-t-3xl border-t border-gray-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {t.b2bHeading}
              </h2>
              <p className="text-gray-500">
                {t.b2bSub}
              </p>
            </div>

            {/* ── 다점포 견적 시뮬레이터 ── */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-6 sm:p-8 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-gray-900">{t.b2bSimTitle}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{t.b2bSimSub}</p>
                </div>

                <div className="p-6 sm:p-8">
                  {/* STEP 1: 매장당 평균 카메라 수 */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-5 h-5 rounded-full bg-primary text-white text-3xs font-black flex items-center justify-center shrink-0">1</span>
                      <label htmlFor="b2b-cameras" className="text-sm font-bold text-gray-700">{t.b2bCamLabel}</label>
                      <span className="ml-auto text-lg font-bold text-primary">{b2bCamerasPerStore}{t.unitDevice}</span>
                    </div>
                    <input
                      id="b2b-cameras"
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={b2bCamerasPerStore}
                      onChange={(e) => setB2bCamerasPerStore(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>{t.b2bSmall}</span>
                      <span>{t.b2bMid}</span>
                      <span>{t.b2bLarge}</span>
                    </div>
                  </div>

                  {/* STEP 2: 매장 수 슬라이더 */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-5 h-5 rounded-full bg-primary text-white text-3xs font-black flex items-center justify-center shrink-0">2</span>
                      <label htmlFor="b2b-store-count" className="text-sm font-bold text-gray-700">{t.b2bStoreLabel}</label>
                      <span className="ml-auto text-lg font-bold text-primary">{b2bStoreCount}{t.unitStore}</span>
                    </div>
                    <input
                      id="b2b-store-count"
                      type="range"
                      min="3"
                      max="100"
                      step="1"
                      value={b2bStoreCount}
                      onChange={(e) => setB2bStoreCount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>{t.b2b3}</span>
                      <span>{t.b2b50}</span>
                      <span>{t.b2b100}</span>
                    </div>
                  </div>

                  {/* 할인율 및 개별 매장 비용 */}
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div className="p-4 bg-primary/5 rounded-xl text-center">
                      <p className="text-xs font-medium text-gray-500 mb-1">{t.discountLabel}</p>
                      <p className="text-2xl font-extrabold text-primary">{discount}%</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl text-center">
                      <p className="text-xs font-medium text-gray-500 mb-1">{t.perStoreCost}</p>
                      <p className="text-2xl font-extrabold text-gray-900">
                        ~{(Math.round(24500 * (1 - discount / 100) / 100) * 100).toLocaleString()}{t.won}
                      </p>
                      <p className="text-xs text-gray-500">{t.perStoreBasis}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl text-center">
                      <p className="text-xs font-medium text-gray-500 mb-1">{t.totalMonthly}</p>
                      <p className="text-2xl font-extrabold text-gray-900">
                        ~{(Math.round(24500 * (1 - discount / 100) / 100) * 100 * b2bStoreCount).toLocaleString()}{t.won}
                      </p>
                      <p className="text-xs text-gray-500">{t.totalBasis(b2bStoreCount)}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-8">{t.estimateDisclaimer}</p>

                  {/* 할인 구간 안내 */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {t.tiers.map((tier) => (
                      <span
                        key={tier.range}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                          discount === parseInt(tier.rate)
                            ? 'bg-primary/10 text-primary border-primary/20'
                            : 'bg-gray-50 text-gray-500 border-gray-100'
                        }`}
                      >
                        {tier.range}: {tier.rate}
                      </span>
                    ))}
                  </div>

                  {/* 이메일 견적 요청 */}
                  {!b2bSubmitted ? (
                    <form onSubmit={handleB2bSubmit}>
                      <label htmlFor="b2b-email" className="block text-sm font-bold text-gray-700 mb-2">{t.b2bEmailLabel}</label>
                      <div className="flex gap-2">
                        <div className="flex items-center flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-[border-color,box-shadow]">
                          <Mail className="w-4 h-4 text-gray-500 shrink-0" aria-hidden="true" />
                          <input
                            id="b2b-email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder={t.emailPlaceholder}
                            value={b2bEmail}
                            onChange={(e) => setB2bEmail(e.target.value)}
                            className="w-full pl-2.5 py-3 bg-transparent text-sm focus:outline-none"
                          />
                        </div>
                        <button type="submit" className="btn-primary py-3 px-6 shrink-0 shadow-md">
                          {t.getQuote}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{t.b2bEmailNote}</p>
                    </form>
                  ) : (
                    <div className="p-5 bg-blue-50 rounded-xl border border-blue-100 text-center">
                      <Check className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <p className="text-blue-800 font-bold text-sm">{t.submittedTitle}</p>
                      <p className="text-xs text-blue-600 mt-1">{t.submittedSub}</p>
                      <button type="button" onClick={() => setB2bSubmitted(false)} className="text-xs text-blue-600 underline mt-3 hover:text-blue-700 cursor-pointer">{t.recalc}</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── 엔터프라이즈 카드 2장 ── */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* 엔터프라이즈 솔루션 */}
              <div className="relative p-7 bg-gray-900 text-white rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white mb-5 border border-white/20">
                    <Shield className="w-3.5 h-3.5" /> {t.entBadge}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{t.entTitle}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-6">
                    {t.entDesc}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {t.entFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{f}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-primary w-full text-center shadow-[0_0_20px_rgb(var(--primary-rgb)_/_0.3)]">
                    {t.entCta}
                  </Link>
                </div>
              </div>
            </div>

            {/* 개별 매장 요금 참고 링크 */}
            <div className="text-center mt-10">
              <button
                type="button"
                onClick={() => setPersona('b2c')}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              >
                {t.backToB2c} <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* ════════════════════════════════
         ROI Calculator
         ════════════════════════════════ */}
      <AnimatedSection className="py-16 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <RoiCalculatorWidget locale={locale} />
        </div>
      </AnimatedSection>

      {/* ════════════════════════════════
         Pricing Simulator Lead Gen
         ════════════════════════════════ */}
      <AnimatedSection className="py-16 bg-gray-50 border-t border-gray-100 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              {t.simHeading}
            </h2>
            <p className="text-gray-500">
              {t.simSub}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            {/* Controls */}
            <div className="p-6 sm:p-8 md:w-1/2 bg-white flex flex-col justify-center">
              {/* 제품 선택 */}
              <div className="mb-6">
                <p className="text-sm font-bold text-gray-700 mb-3">{t.simSelectLabel}</p>
                <div className="flex flex-wrap gap-2">
                  {SIM_PRODUCT_OPTIONS.map((p) => {
                    const active = simProducts.has(p.key);
                    const colors = active
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-blue-700 border-blue-200 hover:border-blue-400';
                    return (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => toggleSimProduct(p.key)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${colors}`}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="sim-insight-cameras" className="text-sm font-bold text-gray-700">{t.simCamLabel}</label>
                  <span className="text-lg font-bold text-primary">{simCameras}{t.unitDevice}</span>
                </div>
                <input
                  id="sim-insight-cameras"
                  type="range"
                  min="2"
                  max="32"
                  step="1"
                  value={simCameras}
                  onChange={(e) => setSimCameras(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{t.simSmall}</span>
                  <span>{t.simLarge}</span>
                </div>
              </div>

              {!simSubmitted ? (
                <form onSubmit={handleSimulateSubmit} className="mt-auto">
                  <label htmlFor="sim-email" className="block text-sm font-bold text-gray-700 mb-2">{t.simEmailLabel}</label>
                  <div className="flex gap-2">
                    <div className="flex items-center flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-[border-color,box-shadow]">
                      <Mail className="w-4 h-4 text-gray-500 shrink-0" aria-hidden="true" />
                      <input
                        id="sim-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder={t.emailPlaceholder}
                        value={simEmail}
                        onChange={(e) => setSimEmail(e.target.value)}
                        className="w-full pl-2.5 py-3 bg-transparent text-sm focus:outline-none"
                      />
                    </div>
                    <button type="submit" className="btn-primary py-3 px-6 shrink-0 shadow-md">{t.getQuote}</button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{t.simEmailNote}</p>
                </form>
              ) : (
                <div className="p-5 bg-blue-50 rounded-xl border border-blue-100 mt-auto text-center">
                  <Check className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-blue-800 font-bold text-sm">{t.submittedTitle}</p>
                  <button onClick={() => setSimSubmitted(false)} className="text-xs text-blue-600 underline mt-2 hover:text-blue-700 cursor-pointer">{t.recalc}</button>
                </div>
              )}
            </div>

            {/* Result */}
            <div className="relative p-6 sm:p-8 md:w-1/2 bg-gradient-to-br from-gray-900 to-slate-900 text-white flex flex-col justify-center items-center text-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-tr-full blur-2xl" />

              <Calculator className="w-8 h-8 text-primary mb-3 opacity-80" />
              <p className="text-sm text-gray-300 font-medium mb-2">{t.simResultLabel}</p>
              <div className="mb-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {estimatedCost > 0 ? estimatedCost.toLocaleString() : '0'}
                </span>
                <span className="text-lg text-gray-300 ml-1">{t.won}</span>
              </div>

              {/* 제품별 breakdown */}
              {estimatedCost > 0 && (
                <div className="w-full space-y-1.5 mb-4 text-left">
                  {simProducts.has('care') && (
                    <div className="flex justify-between text-xs text-gray-300">
                      <span>Store Care</span>
                      <span>{simCareCost.toLocaleString()}{t.won}</span>
                    </div>
                  )}
                  {simProducts.has('insight') && (
                    <div className="flex justify-between text-xs text-gray-300">
                      <span>Store Insight</span>
                      <span>{simInsightCost.toLocaleString()}{t.won}</span>
                    </div>
                  )}
                  {simProducts.has('agent') && (
                    <div className="flex justify-between text-xs text-gray-300">
                      <span>Store Agent</span>
                      <span>{simAgentCost.toLocaleString()}{t.won}</span>
                    </div>
                  )}
                </div>
              )}

              {estimatedCost > 0 ? (
                <div className="flex items-center gap-2 text-sm text-blue-400 font-medium bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 mb-3">
                  <Check className="w-4 h-4" /> {t.simPerDay(Math.round(estimatedCost / 30).toLocaleString())}
                </div>
              ) : (
                <p className="text-sm text-gray-300 mb-3">{t.simEmptyHint}</p>
              )}

              <p className="text-3xs text-gray-500 leading-relaxed">
                {t.simResultDisclaimer}
              </p>

              <Link
                href="/pricing/simulator"
                className="inline-flex items-center gap-1 text-xs text-gray-300 hover:text-gray-100 transition-colors mt-4"
              >
                {t.detailSimLink} <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ════════════════════════════════
         Bundle Synergy CTA
         ════════════════════════════════ */}
      <AnimatedSection className="py-20 bg-gray-950 overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.05]" aria-hidden="true" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-block mb-5 px-4 py-1.5 bg-gradient-to-r from-blue-500/20 to-primary/20 border border-primary/20 rounded-full">
            <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary-light uppercase tracking-wider">
              Synergy Package
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
            {t.bundleHeading}
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed max-w-xl mx-auto">
            {t.bundleBodyPre}<strong className="text-white font-semibold">{t.bundleBodyStrong}</strong>{t.bundleBodyPost}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn-primary px-8 py-4 shadow-[0_0_20px_rgb(var(--primary-rgb)_/_0.3)] hover:shadow-[0_0_30px_rgb(var(--primary-rgb)_/_0.5)] transition-[box-shadow]">
              {t.bundleCta}
            </Link>
            <Link
              href="/pricing/simulator"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-colors text-sm"
            >
              {t.bundleSimLink}
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
