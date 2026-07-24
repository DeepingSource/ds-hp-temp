import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, ShieldCheck, Eye, Bell, CheckCircle2, Lock, HelpCircle, Layers } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import StoreCareDeviceTabs from '@/components/corporate/views/StoreCareDeviceTabs';
import HqRollupDashboardMockup from '@/components/mockups/HqRollupDashboardMockup';
import SaaiSymbol from '@/components/ui/SaaiSymbol';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import ModeFunctionSection from '@/components/corporate/ModeFunctionSection';
import RelatedGlossary from '@/components/corporate/RelatedGlossary';
import { localeHref, type Locale } from '@/lib/i18n';
import { solutionTaglines, productNaming, productPrimary } from '@/lib/brand-canon';
import { crumb } from '@/lib/breadcrumb-labels';
import { JsonLd, softwareApplication } from '@/lib/structured-data';
import siteContent from '@/data/generated/site-content.json';

const COPY: Record<Locale, {
  badge: string;
  heroTitle: string;
  heroSub: string;
  heroCta: string;
  ownerLink: string;
  threatEyebrow: string;
  threatTitle: string;
  threatBody: string;
  ladderEyebrow: string;
  ladderTitle: string;
  ladderSub: string;
  ladderItems: { b2c: string; b2b: string; desc: string }[];
  /** 사다리 카드 좌/우 열 라벨 — 이전엔 한국어 하드코딩이라 en/jp에도 노출됐다. */
  ladderB2cLabel: string;
  ladderB2bLabel: string;
  dashEyebrow: string;
  dashTitle: string;
  dashSub: string;
  dashPillars: { title: string; desc: string }[];
  deviceLabels: { store: string; phone: string };
  privacyEyebrow: string;
  privacyTitle: string;
  privacySub: string;
  /** SEAL 3서약 카드 — 이전엔 한국어 하드코딩. */
  privacyPledges: { title: string; desc: string }[];
  faqEyebrow: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaSub: string;
  ctaButton: string;
  /** 하단 storecare.ai 셀프 서비스 버튼 — 이전엔 한국어 하드코딩. */
  ownerSelfCta: string;
}> = {
  ko: {
    badge: 'DETECT · 24시간 실시간 이상 감지',
    heroTitle: '모든 매장을, 한 매장처럼 지켜봅니다.',
    heroSub: '누가 근무하든 같은 기준으로 — 도난·위생·설비 이상을 전 매장에서 실시간 감지해 본사 한 화면으로 모읍니다. 기존 CCTV 그대로, 원본 영상은 남기지 않고.',
    heroCta: '본사 도입 상담하기',
    ownerLink: '한 매장만 운영하시나요? storecare.ai 셀프 서비스 바로가기 ↗',
    threatEyebrow: '규모의 리스크 · 본사 관측의 한계',
    threatTitle: '매장이 100개면, 사고와 위험도 100가지 편차.',
    threatBody: '본사는 매장에서 일어나는 개별 사건만 겨우 전달받을 뿐, 전체 추세는 보이지 않습니다. 작은 실수가 리콜이나 브랜드 손상으로 번지기 전에, 지금 전 매장을 누가 동일하게 보고 있습니까?',
    ladderEyebrow: '가치 사다리 · B2C→B2B 번역',
    ladderTitle: '사장님의 안심을, 본사의 강력한 통제력으로.',
    ladderSub: 'storecare.ai가 1개 매장 사장님을 지키는 방식 그대로 — 본사 규모의 표준화된 운영 체계로 승격합니다.',
    ladderItems: [
      { b2c: '24시간 안심', b2b: '전국 매장에 동일한 눈', desc: '누가 근무하든 브랜드 전 매장에서 같은 기준으로 도난과 이탈을 감지합니다.' },
      { b2c: '새벽 3시 냉장고 알림', b2b: '폐기·클레임·리콜 체인 사전 차단', desc: '개별 매장의 설비 이상이 프랜차이즈 전체의 대형 리콜이나 위생 파문으로 번지는 것을 예방합니다.' },
      { b2c: 'CCTV 확인 45분 → 15분', b2b: '본사 관측 부담 & 인건비 대폭 절감', desc: '매장당 절감된 대응 시간이 N개 매장 전체로 누적되어 본사의 현장 점검 인건비를 줄여줍니다.' },
      { b2c: '필요한 알림만 골라 받기', b2b: '알림 수만 건 → 손쓸 곳 3곳 매장 랭킹', desc: 'SV 한 명이 담당하는 수십 개 매장의 알림 데이터 중 실제 개입이 필요한 순서로 매장을 정돈합니다.' },
      { b2c: '매장 사진 본사 미공유 약속', b2b: 'SEAL 원본 미보존 — 프라이버시 컴플라이언스', desc: '본사는 사건과 추세 데이터만 봅니다. 가맹점 감시가 아닌, 원본 미보존으로 가맹점 반발을 해결합니다.' },
    ],
    ladderB2cLabel: 'storecare.ai · 사장님 1개 매장',
    ladderB2bLabel: 'saai care for 프랜차이즈 · 본사 전 매장',
    dashEyebrow: '본사 롤업',
    dashTitle: '전 매장을 한 화면에서 — 관측의 회복',
    dashSub: '전국 매장의 이상 감지·위생/온도 컴플라이언스·매장 랭킹·실시간 알림을 종합 롤업합니다.',
    dashPillars: [
      { title: '표준화된 손실예방', desc: '도난과 영업 외 시간 이상 징후를 그날 누가 근무하든 같은 기준으로 감지합니다. 반복 패턴을 본사 화면에서 가려내어 추세에 대응합니다.' },
      { title: '위생·설비, 감사 증빙 기록', desc: '냉장 온도, 바닥 누수, 비상구 상태를 24시간 점검하고 시각을 남깁니다. "아마 괜찮겠지"를 보여줄 수 있는 감사 증빙으로 바꿉니다.' },
      { title: '수만 건 알림 대신, 손쓸 매장 3곳', desc: '사고 건수와 긴급도로 전 매장을 자동으로 정돈하고, 현장 SV가 즉시 방문해야 할 우선순위를 추천합니다.' },
    ],
    deviceLabels: { store: '매장이 보는 것', phone: '본사 손에 오르는 것' },
    privacyEyebrow: '프라이버시 컴플라이언스',
    privacyTitle: '본사는 감시가 아니라, 브랜드 품질 표준을 지킵니다.',
    privacySub: 'SEAL이 촬영하는 순간 익명화합니다. 원본 비디오는 남지 않으며 신원은 즉시 지워집니다. 가맹점주는 자기 매장을 자기 콘솔(storecare.ai)에서 보고, 본사는 사건과 컴플라이언스 지표만 관측하여 가맹점과의 프라이버시 갈등을 해소합니다.',
    privacyPledges: [
      { title: '원본 비디오 미보존', desc: '촬영 즉시 익명화 후 원본 영상을 삭제하여 서버에 남지 않습니다.' },
      { title: '가맹점 전용 콘솔 분리', desc: '가맹점주는 storecare.ai에서 자기 매장 알림만 봅니다.' },
      { title: '본사 사건·지표 롤업', desc: '본사는 감시가 아닌, 위생·설비 이상과 브랜드 지표만 봅니다.' },
    ],
    faqEyebrow: 'B2B FAQ',
    faqTitle: '본사 도입에 관한 자주 묻는 질문 (B2B FAQ)',
    faqs: [
      { q: '기존 매장에 설치된 CCTV를 그대로 사용할 수 있나요?', a: '네, 기존에 설치된 RTSP/IP CCTV 카메라를 교체 없이 100% 그대로 활용할 수 있어 추가 장비 구축 비용을 최소화합니다.' },
      { q: '가맹점주가 "매장 감시"라며 반발하지 않을까요?', a: 'SEAL 기술이 엣지 단계에서 영상 원본을 실시간 삭제하고 익명화합니다. 본사에는 사건 및 지표만 롤업되어 가맹점주의 프라이버시를 안전하게 보호합니다.' },
      { q: '오알림이 너무 많이 발생해서 현장에서 무시하면 어쩌나요?', a: 'saai care의 다단계 노이즈 필터링은 수천 건의 알림 대신 실제 손쓸 순간만을 정밀 필터링하여 알려드립니다.' },
      { q: '이상 발생 시 누가 대응하나요?', a: '매장 근무자 휴대폰 앱 알림과 본사 SV 대시보드로 동시 전송되어, 1차는 매장 자율 해결, 2차는 본사 지원 체계로 이원화 대응합니다.' },
      { q: '시범 도입(Pilot) 후 확장도 가능한가요?', a: '권장 드리는 방식입니다. 직영점 5~10개 매장에서 먼저 4주간 실증을 거친 후 전 매장으로 확산할 수 있습니다.' },
      { q: '개인정보보호법 컴플라이언스 문제는 없나요?', a: '촬영 순간 사람의 얼굴과 신원이 픽셀 단위로 불가역 익명화되어 개인정보보호법 규제를 완벽히 준수합니다.' },
    ],
    ctaTitle: '전 매장의 손실을 막고, 품질 표준을 세우세요.',
    ctaSub: '직영점 5개 매장 파일럿부터 전 매장 인프라 확장까지, 딥핑소스 엔터프라이즈 팀이 함께합니다.',
    ctaButton: '본사 맞춤 파일럿 & 도입 상담',
    ctaEyebrow: '엔터프라이즈 케어',
    ownerSelfCta: 'storecare.ai 사장님 셀프 ↗',
  },
  en: {
    badge: 'DETECT · 24/7 Real-Time Anomaly Sensing',
    heroTitle: 'Oversee every store — as one floor.',
    heroSub: 'No matter who is on shift — detect stock-outs, sanitation, and after-hours anomalies across all locations live on one dashboard. Zero video retained.',
    heroCta: 'Request HQ Consultation',
    ownerLink: 'Operating a single store? Visit storecare.ai self-service ↗',
    threatEyebrow: 'SCALE RISK · Limits of HQ Visibility',
    threatTitle: 'With 100 stores comes 100 different operational risks.',
    threatBody: 'Headquarters only gets isolated incident reports, never the big picture. Before small mistakes turn into brand-damaging recalls, who is keeping a consistent watch across all your locations?',
    ladderEyebrow: 'VALUE LADDER · Translation of Care',
    ladderTitle: 'From single-store peace of mind to enterprise-grade control.',
    ladderSub: 'Translating the value of storecare.ai into a standardized operational system for retail franchises.',
    ladderItems: [
      { b2c: '24/7 Peace of mind', b2b: 'Equal eyes across nationwide stores', desc: 'Enforcing identical standards for theft and safety detection regardless of who is working.' },
      { b2c: '3 AM Fridge Alert', b2b: 'Preventing chain-wide recall & claims', desc: 'Stopping equipment failures from escalating into brand-wide hygiene scandals or massive inventory write-offs.' },
      { b2c: 'CCTV Check: 45 min → 15 min', b2b: 'Drastic reduction in HQ audit costs', desc: 'Saved response time per store accumulates across N stores to lower field audit labor costs.' },
      { b2c: 'Filter out noise', b2b: '10,000 alerts → Top 3 priority store ranking', desc: 'Ranking stores by urgency so field supervisors visit the exact locations needing immediate intervention.' },
      { b2c: 'Private store data', b2b: 'SEAL zero-video — Privacy Compliance', desc: 'HQ only sees events and trend metrics. Zero raw video is stored, eliminating franchise privacy friction.' },
    ],
    ladderB2cLabel: 'storecare.ai · a single owner-operated store',
    ladderB2bLabel: 'saai care for franchises · every store, from HQ',
    dashEyebrow: 'Headquarters rollup',
    dashTitle: 'All stores on one screen — Restoring visibility',
    dashSub: 'Consolidating live anomaly detection, hygiene compliance, store rankings, and alerts in one HQ view.',
    dashPillars: [
      { title: 'Standardized Loss Prevention', desc: 'Detect after-hours anomalies and theft using identical standards regardless of floor staff.' },
      { title: 'Audit-ready Records', desc: '24/7 inspection of fridge temperatures, leaks, and exit doors transformed into verifiable audit proofs.' },
      { title: 'Top 3 Actionable Stores', desc: 'Automatically sort store urgency so field supervisors spend time where it matters most.' },
    ],
    deviceLabels: { store: 'What the store sees', phone: 'What reaches HQ' },
    privacyEyebrow: 'Privacy compliance',
    privacyTitle: 'HQ enforces brand standards, not employee surveillance.',
    privacySub: 'SEAL anonymizes footage at the instant of capture. Raw video is destroyed immediately, and franchisees view their own store on storecare.ai while HQ monitors compliance metrics.',
    privacyPledges: [
      { title: 'No source video retained', desc: 'Footage is anonymized on capture and the original is deleted — nothing lands on the server.' },
      { title: 'A separate console for franchisees', desc: 'Owners see only their own store’s alerts, in their own console at storecare.ai.' },
      { title: 'HQ sees events and metrics', desc: 'Not surveillance — HQ sees sanitation and equipment anomalies and brand metrics, nothing more.' },
    ],
    faqEyebrow: 'B2B FAQ',
    faqTitle: 'Frequently Asked Questions for Franchise HQ (B2B FAQ)',
    faqs: [
      { q: 'Can we use our existing CCTV cameras?', a: 'Yes. Existing RTSP/IP CCTV cameras work 100% as-is without equipment replacement.' },
      { q: 'Will franchisees oppose this as employee surveillance?', a: 'No. SEAL destroys raw video instantly at the edge. HQ only receives anonymous metric events.' },
      { q: 'How do you prevent false alert fatigue?', a: 'saai care multi-stage noise filters eliminate false alarms and only deliver actionable incidents.' },
      { q: 'Who responds when an anomaly occurs?', a: 'Alerts are dispatched to both floor staff mobile apps and HQ supervisor dashboards for multi-tiered resolution.' },
      { q: 'Can we start with a pilot program?', a: 'Yes, we recommend a 4-week pilot across 5-10 flagship locations before nationwide rollout.' },
      { q: 'Does this comply with privacy regulations?', a: 'Yes. Irreversible pixel-level anonymization ensures complete compliance with global privacy laws.' },
    ],
    ctaTitle: 'Prevent store loss and establish brand-wide standards.',
    ctaSub: 'From 5-store pilots to enterprise rollout, DeepingSource Enterprise Team is here to help.',
    ctaButton: 'Request Enterprise Pilot',
    ctaEyebrow: 'Enterprise care',
    ownerSelfCta: 'storecare.ai self-service ↗',
  },
  jp: {
    badge: 'DETECT · 24時間リアルタイム異常検知',
    heroTitle: 'すべての店舗を、ひとつの店舗のように。',
    heroSub: '誰が働いていても同じ基準で — 万引き・衛生・設備異常を全店舗でリアルタイム検知し、本部一画面に集約。既存CCTVそのまま、動画は残さず。',
    heroCta: '本部導入のご相談',
    ownerLink: '1店舗のみお持ちですか？ storecare.ai セルフサービス ↗',
    threatEyebrow: 'SCALE RISK · 本部視界の限界',
    threatTitle: '店舗が100あれば、事故とリスクも100のバラツキ。',
    threatBody: '本部は個別の事故報告を後から受けるだけで、全体のトレンドは見えません。小さなミスがブランド毀損になる前に、誰が全店舗を同じ目で見ていますか？',
    ladderEyebrow: 'VALUE LADDER · 価値の翻訳',
    ladderTitle: 'オーナーの安心を、本部の強力な統制力へ。',
    ladderSub: 'storecare.aiが1店舗のオーナーを守る仕組みそのままに — フランチャイズ規模の標準化された運用体系へと昇華。',
    ladderItems: [
      { b2c: '24時間安心', b2b: '全国店舗に同じ目', desc: '誰が働いていても全店舗で同じ基準で異常を検知します。' },
      { b2c: '深夜3時の冷蔵庫アラート', b2b: '回収・クレーマー・リコールの事前遮断', desc: '設備の異常がチェーン全体の巨大リコールや衛生問題へ発展するのを防ぎます。' },
      { b2c: 'CCTV確認 45分 → 15分', b2b: '本部観測負担 & 人件費の大幅削減', desc: '店舗あたりの削減時間が全店舗で蓄積され、臨店点検コストを抑えます。' },
      { b2c: '必要な通知だけ', b2b: '数万件の通知 → 介入すべき店舗3箇所のランキング', desc: 'SVが担当する数十店舗のデータから、今すぐ訪問すべき店舗を自動整理。' },
      { b2c: '店舗写真の非共有約束', b2b: 'SEAL動画未保存 — プライバシーコンプライアンス', desc: '本部は事件と指標のみ観測。加盟店の反発を動画非保存で解消します。' },
    ],
    ladderB2cLabel: 'storecare.ai · オーナーの1店舗',
    ladderB2bLabel: 'saai care for フランチャイズ · 本部の全店舗',
    dashEyebrow: '本部ロールアップ',
    dashTitle: '全店舗を一画面で — 観測の回復',
    dashSub: '全国店舗の異常検知・コンプライアンス・店舗ランキングを一画面に統合。',
    dashPillars: [
      { title: '標準化された損失予防', desc: '夜間異常や万引きの兆候を勤務者に関わらず同一基準で検知。' },
      { title: '監査証跡としての記録', desc: '冷蔵温度や非常口の状態を24時間点検し、確かな記録として残します。' },
      { title: '介入すべき3店舗の推奨', desc: '緊急度で全店舗を自動整列し、SVが訪問すべき優先順位を提示。' },
    ],
    deviceLabels: { store: '店舗が見るもの', phone: '本部に届くもの' },
    privacyEyebrow: 'プライバシーコンプライアンス',
    privacyTitle: '本部は監視ではなく、品質標準を守ります。',
    privacySub: 'SEALが撮影した瞬間匿名化。動画は残らず、加盟店は自店を自分のコンソール(storecare.ai)で確認し、本部はコンプライアンス指標のみ観測します。',
    privacyPledges: [
      { title: '元映像は保存しない', desc: '撮影と同時に匿名化し、元映像は削除するためサーバーに残りません。' },
      { title: '加盟店専用コンソールを分離', desc: '加盟店オーナーは storecare.ai で自店舗の通知だけを見ます。' },
      { title: '本部は事象と指標のみ', desc: '監視ではなく、衛生・設備の異常とブランド指標だけを見ます。' },
    ],
    faqEyebrow: 'B2B FAQ',
    faqTitle: '本部導入に関するよくある質問 (B2B FAQ)',
    faqs: [
      { q: '既存のCCTVカメラをそのまま使えますか？', a: 'はい、既存のRTSP/IPカメラを100%そのまま活用可能です。' },
      { q: '加盟店から「監視」だと反発されませんか？', a: 'SEAL技術がエッジ段階で動画を即座に破棄するため、本部は匿名イベントのみを受信します。' },
      { q: '誤検知が多くて現場で無視されませんか？', a: 'saai careのマルチノイズフィルタが誤アラートを排除し、必要な瞬間のみを伝えます。' },
      { q: '異常発生時は誰が対応しますか？', a: '店舗スタッフのアプリと本部のSVダッシュボードへ同時送信され、二段構えで対応します。' },
      { q: 'パイロット導入からの開始は可能ですか？', a: 'はい、直営5〜10店舗での4週間実証を経てからの全体展開を推奨しています。' },
      { q: '個人情報保護法のコンプライアンスは問題ありませんか？', a: '撮影の瞬間にピクセル単位で不可逆匿名化されるため、完全に対応しています。' },
    ],
    ctaTitle: '全店舗の損失を防ぎ、品質標準を確立しましょう。',
    ctaSub: '5店舗のパイロットから全店舗展開まで、エンタープライズチームがサポートします。',
    ctaButton: '本部パイロット & 導入相談',
    ctaEyebrow: 'エンタープライズケア',
    ownerSelfCta: 'storecare.ai セルフサービス ↗',
  },
};

export default function StoreCareView({ locale }: { locale: Locale }) {
  const c = COPY[locale];

  return (
    <div className="bg-white min-h-screen">
      <JsonLd
        data={softwareApplication({
          name: productNaming.care.saai ?? 'saai care',
          description: c.heroSub,
          path: '/products/saai-care',
          locale,
        })}
      />

      {/* ── Beat 1 — Hero (Franchise HQ First Frame) ── */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 bg-slate-900 text-white noise-overlay overflow-hidden">
        <Container className="relative z-10">
          <Breadcrumb items={[{ name: crumb('products', locale), path: '/products' }, { name: productNaming.care.saai ?? 'saai care', path: '/products/saai-care' }]} locale={locale} tone="dark" className="mb-6" />

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-light mb-4">
                <SaaiSymbol className="w-3.5 h-3.5 text-primary-light" />
                {c.badge}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight font-display break-keep mb-6">
                <WordRise text={c.heroTitle} />
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed break-keep mb-8">
                {c.heroSub}
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
                <Link
                  href={localeHref(locale, '/contact?product=saai-care')}
                  className="btn-primary btn-lg inline-flex items-center justify-center gap-2"
                >
                  <span>{c.heroCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://storecare.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  <span>{c.ownerLink}</span>
                </a>
              </div>
            </div>

            {/* HQ Rollup Dashboard Preview in Hero */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-slate-800/80 p-2 shadow-2xl backdrop-blur-md">
                {/* Hero = 항상 최초 뷰포트 → 스크롤-리빌 게이팅 제외 (immediate) */}
                <HqRollupDashboardMockup locale={locale} ariaLabel={c.dashTitle} immediate />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Beat 2 — Scale Risk (Agitation).
             Hero와 같은 slate-900 + 구분선 없음 = 하나의 연속 다크 블록. ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-slate-900 text-white noise-overlay">
        <Container className="max-w-4xl text-center">
          <Eyebrow tone="light" className="mb-3 justify-center">{c.threatEyebrow}</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-display break-keep">
            "{c.threatTitle}"
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed break-keep">
            {c.threatBody}
          </p>
        </Container>
      </AnimatedSection>

      {/* ── Beat 3 — Value Ladder Translation (Signature Table) ── */}
      <Section variant="default" pad="default">
        <Container>
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <Eyebrow className="mb-2 justify-center">{c.ladderEyebrow}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display break-keep mb-4">
              {c.ladderTitle}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 break-keep">
              {c.ladderSub}
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {c.ladderItems.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-primary-light hover:shadow-card transition-all grid sm:grid-cols-12 gap-4 items-center"
              >
                <div className="sm:col-span-4 p-3 rounded-xl bg-slate-50 border border-gray-100">
                  <span className="text-2xs font-bold uppercase text-gray-400 block mb-1">{c.ladderB2cLabel}</span>
                  <p className="text-sm font-bold text-gray-700 break-keep">{item.b2c}</p>
                </div>
                <div className="hidden sm:flex sm:col-span-1 justify-center text-primary">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <div className="sm:col-span-7 p-4 rounded-xl bg-primary/5 border border-primary/15">
                  <span className="text-2xs font-bold uppercase text-primary block mb-1">{c.ladderB2bLabel}</span>
                  <h3 className="text-base font-bold text-gray-900 mb-1 break-keep">{item.b2b}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed break-keep">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Beat 4 — HQ Rollup & Pillars ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50 border-y border-gray-100">
        <Container>
          <div className="mb-12 max-w-3xl">
            <Eyebrow className="mb-2">{c.dashEyebrow}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display break-keep mb-3">
              {c.dashTitle}
            </h2>
            <p className="text-base text-gray-600 break-keep">
              {c.dashSub}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {c.dashPillars.map((p, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white border border-gray-200 shadow-card">
                <div className="w-10 h-10 rounded-xl bg-primary-lighter text-primary font-bold text-sm flex items-center justify-center mb-6">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 break-keep">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed break-keep">{p.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </AnimatedSection>

      {/* Interactive Device & Scene Mockups */}
      <AnimatedSection className="py-16 lg:py-24 bg-white">
        <Container>
          <StoreCareDeviceTabs locale={locale} labels={c.deviceLabels} />
        </Container>
      </AnimatedSection>

      {/* ── Beat 6 — Privacy & Franchise Harmony (SEAL 3 Pledges) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-900 text-white noise-overlay">
        <Container className="max-w-4xl text-center">
          <Eyebrow tone="light" className="mb-4 inline-flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            {c.privacyEyebrow}
          </Eyebrow>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 font-display break-keep">
            {c.privacyTitle}
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-10 break-keep">
            {c.privacySub}
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-left">
            {c.privacyPledges.map((p) => (
              <div key={p.title} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-primary-light mb-2" />
                <p className="text-sm font-bold text-white mb-1 break-keep">{p.title}</p>
                <p className="text-xs text-slate-400 leading-relaxed break-keep">{p.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </AnimatedSection>
      {/* ── Beat 7 — B2B FAQ ── */}
      <Section variant="alt" pad="default">
        <Container className="max-w-4xl">
          <div className="mb-12 text-center">
            <Eyebrow className="mb-2 justify-center">{c.faqEyebrow}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-display break-keep">
              {c.faqTitle}
            </h2>
          </div>
          <div className="grid gap-4">
            {c.faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-card">
                <h3 className="text-base font-bold text-gray-900 mb-2 flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed pl-7 break-keep">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <ModeFunctionSection mode="care" locale={locale} />
      <RelatedGlossary
        slugs={['stockout-detection', 'store-operations-automation', 'anonymized-cctv', 'retail-ai']}
        locale={locale}
      />

      {/* ── Final HQ CTA ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-900 text-white noise-overlay">
        <Container className="text-center max-w-3xl">
          <Eyebrow tone="light" className="mb-4 inline-flex items-center justify-center gap-1.5">
            <SaaiSymbol className="w-3.5 h-3.5 text-primary-light" />
            {c.ctaEyebrow}
          </Eyebrow>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 font-display break-keep">
            {c.ctaTitle}
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-xl mx-auto break-keep">
            {c.ctaSub}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={localeHref(locale, '/contact?product=saai-care')}
              className="btn-primary btn-lg inline-flex items-center gap-2"
            >
              <span>{c.ctaButton}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://storecare.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl transition-colors"
            >
              <span>{c.ownerSelfCta}</span>
            </a>
          </div>
        </Container>
      </AnimatedSection>
    </div>
  );
}
