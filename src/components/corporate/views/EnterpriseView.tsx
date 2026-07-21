import Link from 'next/link';
import {
  ArrowRight, Building2, Mail, Award, ShieldCheck, ScanEye, Eye, Search, Share2,
  SearchCheck, Languages, RefreshCw, CheckCircle2,
} from 'lucide-react';
import { COMPANY } from '@/lib/company-data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import Accordion from '@/components/ui/Accordion';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import AnimatedSection from '@/components/ui/AnimatedSection';
import MasterPair from '@/components/corporate/MasterPair';
import MultiStoreDashboardMockup from '@/components/mockups/MultiStoreDashboardMockup';
import { HqMapDashboardMockup } from '@/components/mockups';

type Step = { title: string; desc: string };
type Copy = {
  badge: string;
  category: string;
  heroTitleA: string;
  heroTitleB: string;
  heroSub: string;
  ctaProposal: string;
  ctaEmail: string;
  emailSubject: string;
  trustLine: string;
  trustBrands: string[];
  // pain
  challengesTitle: string;
  challengesSub: string;
  challenges: { title: string; desc: string }[];
  challengesRoot: string;
  // spine — tailored proposal
  spineEyebrow: string;
  spineTitle: string;
  spineBody: string;
  spineSteps: Step[];
  spineConnect: string;
  // golden
  goldenEyebrow: string;
  goldenTitle: string;
  goldenSub: string;
  golden: { en: string; title: string; desc: string }[];
  goldenLink: string;
  // dashboard
  dashboardEyebrow: string;
  dashboardTitle: string;
  dashboardSub: string;
  // process
  processTitle: string;
  processSub: string;
  process: Step[];
  processNoteStrong: string;
  processNoteRest: string;
  // faq
  faqEyebrow: string;
  faqTitle: string;
  faqSub: string;
  faq: { question: string; answer: string }[];
  // final cta
  ctaTitleA: string;
  ctaTitleB: string;
  ctaSub: string;
  ctaReassure: string;
};

const ko: Copy = {
  badge: 'Enterprise',
  category: '익명화 공간 AI',
  heroTitleA: '전국 매장을 읽고 —',
  heroTitleB: '당신의 비즈니스에 맞춘 제안.',
  heroSub: '프랜차이즈 본사를 위한 익명화 공간 AI. 매뉴얼이 아니라, 전국 매장을 읽어 잘되는 운영을 찾고 당신의 브랜드에 맞춰 전 매장에 옮깁니다. 쓰던 CCTV로, 얼굴 없이.',
  ctaProposal: '맞춤 제안 요청',
  ctaEmail: '이메일 문의',
  emailSubject: '[본사·다점포 도입] 맞춤 제안 문의',
  trustLine: '국내 1위 H&B · BGF CU · 코리아세븐 · CJ푸드빌 — 이미 함께합니다.',
  trustBrands: ['국내 1위 H&B', 'BGF CU', '코리아세븐', 'CJ푸드빌'],
  challengesTitle: '본사가 겪는 핵심 과제',
  challengesSub: '매장이 늘수록 관리는 복잡해지고, 편차는 커집니다.',
  challenges: [
    { title: '운영 편차', desc: '같은 매뉴얼을 줘도 매장마다 결과가 다릅니다. 원인을 파악하기 어렵습니다.' },
    { title: '현장 파악 지연', desc: 'SV가 직접 방문하지 않으면 매장 상태를 알 수 없습니다.' },
    { title: '감에 의존하는 의사결정', desc: '데이터 없이 경험에 의존하는 의사결정이 반복됩니다.' },
  ],
  challengesRoot: '세 가지의 뿌리는 하나입니다 — 본사가 매장 안에서 실제로 무슨 일이 일어나는지 읽지 못하기 때문입니다.',
  spineEyebrow: '왜 맞춤인가',
  spineTitle: '범용 제안은, 당신의 매장을 본 적이 없습니다.',
  spineBody: '컨설팅 리포트도, 범용 AI도 일반론을 줍니다 — 당신의 동선도, 진열도, 손님도 본 적이 없으니까요. 딥핑소스는 전국 매장을 직접 읽어 잘되는 이유를 찾고, 당신의 브랜드 기준에 맞춰 제안합니다.',
  spineSteps: [
    { title: '읽습니다', desc: '전국 매장의 공간 신호 — 동선·체류·진열·이상을 익명으로 읽습니다.' },
    { title: '찾습니다', desc: '잘되는 매장의 패턴을, 당신의 매장 데이터 안에서 찾습니다.' },
    { title: '맞춥니다', desc: '그 패턴을 당신의 브랜드 표준으로 번역해 전 매장에 옮깁니다.' },
  ],
  spineConnect: '이 세 단계를 실제로 돌리는 엔진이, 아래 Golden Case 5단계입니다.',
  goldenEyebrow: 'Golden Case · 맞춤 엔진',
  goldenTitle: '한 매장의 성공을, 전국으로',
  goldenSub: '잘 되는 매장 하나를 찾아 전 매장으로 옮기는 본사 운영 사이클 — 발견에서 재측정까지 다섯 단계로 돕습니다.',
  golden: [
    { en: 'Discover', title: '발견', desc: '한 매장의 성공·문제를 store insight가 Golden Case 후보로 자동 표시합니다.' },
    { en: 'Verify', title: '검증', desc: "본사가 '왜 그런가'를 가설과 Case 기반 비교로 확인합니다." },
    { en: 'Translate', title: '번역', desc: "본사의 한 줄을 점주 언어로 옮깁니다 — '진열을 옮기면 객단가 +8%'." },
    { en: 'Sync', title: '전파', desc: '검증된 운영 패턴을 전 매장에 동시 적용·동기화합니다.' },
    { en: 'Re-measure', title: '재측정', desc: '성과를 다시 측정해 다음 Golden Case로 순환합니다.' },
  ],
  goldenLink: '5단계를 대표하는 도입 사례 5건 보기',
  dashboardEyebrow: '본사 대시보드',
  dashboardTitle: '전 매장을, 한눈에',
  dashboardSub: '본사 슈퍼바이저는 전체 매장의 매출·방문자·알림을 한 화면에서 파악하고, 문제 매장을 바로 식별합니다.',
  processTitle: '도입 방식 — 리스크 없이',
  processSub: '파일럿부터 시작해, 검증된 모델만 확산합니다.',
  process: [
    { title: '도입 상담', desc: '운영 환경과 목표를 파악합니다.' },
    { title: '파일럿 운영', desc: '소수 매장에서 효과를 검증합니다.' },
    { title: '전체 확산', desc: '검증된 모델을 전 매장에 적용합니다.' },
  ],
  processNoteStrong: '기존 CCTV 그대로 시작합니다.',
  processNoteRest: ' 별도 하드웨어 교체 없이 소프트웨어만 연동하면 됩니다. 파일럿 기간 중 전담 컨설턴트가 함께합니다.',
  faqEyebrow: 'FAQ',
  faqTitle: '결정 전에, 자주 묻는 것들',
  faqSub: '개인정보·장비·비용·기간 — 본사가 가장 먼저 확인하는 네 가지.',
  faq: [
    {
      question: '개인정보는 안전한가요? 매장에 손님 얼굴이 찍히는데요.',
      answer: '촬영되는 순간 익명화되어 개인을 식별할 수 있는 정보는 남지 않고, 원본 영상도 보존하지 않습니다(SEAL). 공간의 흐름만 데이터로 남습니다. 익명화 특허 기반 기술로 입력 단계에서 보호합니다.',
    },
    {
      question: '새 카메라나 장비를 설치해야 하나요?',
      answer: '아니요. 매장에 이미 달린 CCTV 위에서 동작합니다. 하드웨어 교체 없이 소프트웨어만 연동하면 되고, 파일럿도 기존 장비로 바로 시작합니다.',
    },
    {
      question: '파일럿 비용과 기간은 어떻게 되나요?',
      answer: '소수 매장으로 시작하는 파일럿부터 제안합니다. 매장 수·운영 환경에 따라 범위가 달라지므로, 상담 후 브랜드에 맞춘 파일럿 범위와 비용을 제안해 드립니다.',
    },
    {
      question: '전 매장 확산과 계약은 어떻게 진행되나요?',
      answer: '파일럿에서 효과를 검증한 뒤에만 확산합니다. 검증된 운영 패턴을 브랜드 표준으로 번역해 전 매장에 동기화하고, 확산 규모에 맞춘 계약을 제안합니다.',
    },
  ],
  ctaTitleA: '전국 매장을 읽어,',
  ctaTitleB: '당신의 비즈니스에 맞춥니다.',
  ctaSub: '운영 환경에 맞는 맞춤 제안을 드립니다. 먼저 제안을 받아보세요.',
  ctaReassure: '무료 상담 · 영업일 1–2일 내 연락',
};

const en: Copy = {
  badge: 'Enterprise',
  category: 'Anonymized Spatial AI',
  heroTitleA: 'Read every store —',
  heroTitleB: 'a proposal built for your business.',
  heroSub: 'Anonymized Spatial AI for franchise HQ. Not a playbook — we read every store, find what works, and roll it out tuned to your brand. On the CCTV you already have, without faces.',
  ctaProposal: 'Request a tailored proposal',
  ctaEmail: 'Email us',
  emailSubject: '[HQ & multi-store] Tailored proposal inquiry',
  trustLine: 'A top H&B retailer · BGF CU · Korea Seven · CJ Foodville — already with us.',
  trustBrands: ['Top H&B retailer', 'BGF CU', 'Korea Seven', 'CJ Foodville'],
  challengesTitle: 'The core challenges HQ faces',
  challengesSub: 'As stores multiply, management grows complex and variance widens.',
  challenges: [
    { title: 'Operational variance', desc: 'Even with the same playbook, results differ store by store — and the cause is hard to pin down.' },
    { title: 'Delayed visibility', desc: "Without a supervisor on-site, there's no way to know a store's true state." },
    { title: 'Gut-feel decisions', desc: 'Decisions keep relying on experience instead of data.' },
  ],
  challengesRoot: 'All three share one root — HQ can’t read what actually happens inside the store.',
  spineEyebrow: 'Why tailored',
  spineTitle: 'A generic proposal has never seen your store.',
  spineBody: 'Consulting decks and general AI give you generalities — because they’ve never seen your paths, your displays, your shoppers. DeepingSource reads every store directly, finds why the best ones work, and proposes to your brand’s standard.',
  spineSteps: [
    { title: 'We read', desc: 'The spatial signals of every store — flow, dwell, merchandising, anomalies — anonymously.' },
    { title: 'We find', desc: 'The pattern behind the best stores, inside your own store data.' },
    { title: 'We tailor', desc: 'We translate that pattern into your brand standard and carry it to every store.' },
  ],
  spineConnect: 'The engine that actually runs these three steps is the Golden Case cycle below.',
  goldenEyebrow: 'Golden Case · the tailoring engine',
  goldenTitle: 'One store’s success, across the network',
  goldenSub: 'The HQ operating cycle that finds one thriving store and replicates it everywhere — five stages from discovery to re-measurement.',
  golden: [
    { en: 'Discover', title: 'Discover', desc: 'store insight automatically flags a store’s success or problem as a Golden Case candidate.' },
    { en: 'Verify', title: 'Verify', desc: 'HQ confirms the "why" through hypotheses and case-based comparison.' },
    { en: 'Translate', title: 'Translate', desc: 'HQ turns one finding into the owner’s language — "move the display, lift basket size +8%".' },
    { en: 'Sync', title: 'Sync', desc: 'Roll out and sync the verified operating pattern to every store at once.' },
    { en: 'Re-measure', title: 'Re-measure', desc: 'Measure performance again and cycle into the next Golden Case.' },
  ],
  goldenLink: 'See 5 case studies, one per stage',
  dashboardEyebrow: 'HQ dashboard',
  dashboardTitle: 'Every store, at a glance',
  dashboardSub: 'HQ supervisors see sales, visitors, and alerts across all stores on one screen — and pinpoint problem stores instantly.',
  processTitle: 'How you adopt it — without the risk',
  processSub: 'Start with a pilot, and scale only what’s proven.',
  process: [
    { title: 'Consultation', desc: 'We map your operating environment and goals.' },
    { title: 'Pilot', desc: 'We validate impact across a small set of stores.' },
    { title: 'Full rollout', desc: 'We apply the proven model to every store.' },
  ],
  processNoteStrong: 'Start with your existing CCTV.',
  processNoteRest: ' No hardware swap required — just connect the software. A dedicated consultant works alongside you throughout the pilot.',
  faqEyebrow: 'FAQ',
  faqTitle: 'Before you decide — the questions we hear most',
  faqSub: 'Privacy, hardware, cost, timeline — the four HQ checks first.',
  faq: [
    {
      question: 'Is personal data safe? Customer faces are on our store cameras.',
      answer: 'Footage is anonymized the moment it’s captured, so no personally identifiable information remains, and the original footage is not retained (SEAL). Only the flow of the space remains as data, protected at the input stage by patented anonymization.',
    },
    {
      question: 'Do we need to install new cameras or hardware?',
      answer: 'No. It runs on the CCTV already installed in your stores. There’s no hardware swap — you connect the software, and the pilot starts on your existing equipment.',
    },
    {
      question: 'What’s the pilot cost and timeline?',
      answer: 'We propose a pilot on a small set of stores first. Scope depends on store count and operating environment, so after a consultation we tailor the pilot scope and cost to your brand.',
    },
    {
      question: 'How does full rollout and contracting work?',
      answer: 'We scale only after the pilot proves out. We translate the verified operating pattern into your brand standard, sync it across every store, and propose a contract matched to the rollout scale.',
    },
  ],
  ctaTitleA: 'We read every store,',
  ctaTitleB: 'and tune it to your business.',
  ctaSub: 'We’ll tailor a proposal to your operating environment. Start by getting one.',
  ctaReassure: 'Free consultation · reply within 1–2 business days',
};

const jp: Copy = {
  badge: 'Enterprise',
  category: '匿名化空間AI',
  heroTitleA: '全店舗を読み、',
  heroTitleB: 'あなたのビジネスに合う提案を。',
  heroSub: 'フランチャイズ本部のための匿名化空間AI。マニュアルではなく — 全店舗を読み、うまくいく運営を見つけ、御社ブランドに合わせて全店へ展開します。すでにあるCCTVで、顔なしで。',
  ctaProposal: '最適なご提案を相談',
  ctaEmail: 'メールでお問い合わせ',
  emailSubject: '【本部・多店舗導入】最適なご提案のお問い合わせ',
  trustLine: '国内トップのH&B · BGF CU · コリアセブン · CJフードビル — すでに共に。',
  trustBrands: ['国内トップH&B', 'BGF CU', 'コリアセブン', 'CJフードビル'],
  challengesTitle: '本部が抱える主な課題',
  challengesSub: '店舗が増えるほど管理は複雑になり、ばらつきも大きくなります。',
  challenges: [
    { title: '運営のばらつき', desc: '同じマニュアルを渡しても店舗ごとに結果が異なり、原因の把握が難しくなります。' },
    { title: '現場把握の遅れ', desc: 'スーパーバイザーが直接訪問しなければ、店舗の状態を知ることができません。' },
    { title: '勘に頼る意思決定', desc: 'データのないまま経験に依存した意思決定が繰り返されます。' },
  ],
  challengesRoot: '三つの根はひとつ — 本部が店内で実際に何が起きているかを読めないからです。',
  spineEyebrow: 'なぜ最適化か',
  spineTitle: '汎用の提案は、あなたの店舗を見たことがありません。',
  spineBody: 'コンサルの資料も汎用AIも一般論を返します — あなたの動線も、陳列も、お客様も見たことがないからです。ディーピングソースは全店舗を直接読み、うまくいく理由を見つけ、御社ブランドの基準に合わせて提案します。',
  spineSteps: [
    { title: '読む', desc: '全店舗の空間信号 — 動線・滞在・陳列・異常を匿名で読み取ります。' },
    { title: '見つける', desc: 'うまくいく店舗のパターンを、御社の店舗データの中から見つけます。' },
    { title: '合わせる', desc: 'そのパターンを御社ブランドの標準に翻訳し、全店へ展開します。' },
  ],
  spineConnect: 'この三段階を実際に回すエンジンが、下のGolden Case 5段階です。',
  goldenEyebrow: 'Golden Case · 最適化エンジン',
  goldenTitle: '一店舗の成功を、全国へ',
  goldenSub: 'うまくいっている一店舗を見つけ、全店舗へ広げる本部の運営サイクル — 発見から再測定まで五つの段階でお手伝いします。',
  golden: [
    { en: 'Discover', title: '発見', desc: '一店舗の成功・課題を、store insightがGolden Case候補として自動的に表示します。' },
    { en: 'Verify', title: '検証', desc: '本部が「なぜそうなのか」を、仮説とCaseに基づく比較で確認します。' },
    { en: 'Translate', title: '翻訳', desc: '本部の一言を店主の言葉に置き換えます — 「陳列を変えれば客単価+8%」。' },
    { en: 'Sync', title: '展開', desc: '検証済みの運営パターンを全店舗へ同時に適用・同期します。' },
    { en: 'Re-measure', title: '再測定', desc: '成果を改めて測定し、次のGolden Caseへと循環させます。' },
  ],
  goldenLink: '5つの段階を代表する導入事例5件を見る',
  dashboardEyebrow: '本部ダッシュボード',
  dashboardTitle: '全店舗を、ひと目で',
  dashboardSub: '本部のスーパーバイザーは全店舗の売上・来店者・通知をひとつの画面で把握し、問題のある店舗をすぐに特定できます。',
  processTitle: '導入の進め方 — リスクなく',
  processSub: 'パイロットから始め、検証できたモデルのみを展開します。',
  process: [
    { title: '導入相談', desc: '運営環境と目標を把握します。' },
    { title: 'パイロット運用', desc: '少数の店舗で効果を検証します。' },
    { title: '全店展開', desc: '検証済みのモデルを全店舗へ適用します。' },
  ],
  processNoteStrong: '既存のCCTVのまま始められます。',
  processNoteRest: ' ハードウェアの入れ替えは不要で、ソフトウェアを連携するだけです。パイロット期間中は専任コンサルタントが伴走します。',
  faqEyebrow: 'FAQ',
  faqTitle: '決める前に、よく聞かれること',
  faqSub: 'プライバシー・機器・費用・期間 — 本部が最初に確認する四つ。',
  faq: [
    {
      question: '個人情報は安全ですか？店舗にお客様の顔が映ります。',
      answer: '撮影された瞬間に匿名化され、個人を識別できる情報は残らず、原本映像も保存しません(SEAL)。空間の流れだけがデータとして残り、特許に基づく匿名化技術で入力段階から保護します。',
    },
    {
      question: '新しいカメラや機器の設置は必要ですか？',
      answer: 'いいえ。店舗にすでにあるCCTVの上で動作します。ハードウェアの入れ替えは不要で、ソフトウェアを連携するだけ。パイロットも既存の機器ですぐに始められます。',
    },
    {
      question: 'パイロットの費用と期間はどのくらいですか？',
      answer: '少数店舗から始めるパイロットをご提案します。店舗数や運営環境により範囲が変わるため、ご相談のうえブランドに合わせたパイロット範囲と費用をご提案します。',
    },
    {
      question: '全店展開と契約はどう進みますか？',
      answer: 'パイロットで効果を検証してから展開します。検証済みの運営パターンをブランド標準に翻訳して全店へ同期し、展開規模に合わせた契約をご提案します。',
    },
  ],
  ctaTitleA: '全店舗を読み、',
  ctaTitleB: 'あなたのビジネスに合わせます。',
  ctaSub: '運営環境に合わせた最適なご提案を差し上げます。まずはご提案を受け取ってください。',
  ctaReassure: '無料相談・営業日1〜2日以内に連絡',
};

const C: Record<Locale, Copy> = { ko, en, jp };

const challengeIcons = [Building2, Eye, Search];
const spineIcons = [ScanEye, Search, Share2];
const goldenIcons = [Search, SearchCheck, Languages, Share2, RefreshCw];

export default function EnterpriseView({ locale }: { locale: Locale }) {
  const t = C[locale];
  const proposalHref = localeHref(locale, '/contact') + '?type=enterprise';
  const emailHref = `mailto:${COMPANY.contactEmail}?subject=${encodeURIComponent(t.emailSubject)}`;
  const credChips = [
    { icon: Award, label: 'NVIDIA Inception Partner' },
    { icon: ShieldCheck, label: locale === 'ko' ? `특허 ${COMPANY.patents}건` : locale === 'jp' ? `特許 ${COMPANY.patents}件` : `${COMPANY.patents} patents` },
    { icon: ScanEye, label: locale === 'ko' ? '촬영 순간 익명화 · 원본 미보존' : locale === 'jp' ? '撮影の瞬間に匿名化・原本非保存' : 'Anonymized at capture · no footage kept' },
  ];

  return (
    <>
      {/* 1 — Hero: the tailored-proposal promise + two-track CTA */}
      <section className="relative overflow-hidden bg-surface-dark noise-overlay">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20 lg:pt-40 lg:pb-24 text-center">
          <Breadcrumb items={[{ name: crumb('enterprise', locale), path: '/enterprise' }]} locale={locale} tone="dark" className="mb-6" />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-300 uppercase tracking-wider mb-8">
            <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
            {t.badge} · {t.category}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 tracking-tight break-keep">
            <WordRise text={t.heroTitleA} />
            <br className="hidden sm:block" />
            {' '}
            <WordRise text={t.heroTitleB} className="text-primary-light" />
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-9 break-keep">
            {t.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={proposalHref}
              className="btn-primary btn-lg shadow-[0_0_20px_theme(colors.primary/0.3)] hover:shadow-[0_0_30px_theme(colors.primary/0.5)] transition-[box-shadow] inline-flex items-center gap-2"
            >
              {t.ctaProposal}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href={emailHref}
              className="btn-secondary btn-lg !bg-white/5 hover:!bg-white/10 !text-white !border-white/10 backdrop-blur-sm transition-colors inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              {t.ctaEmail}
            </a>
          </div>
          <p className="mt-8 text-sm text-gray-400 break-keep">{t.trustLine}</p>
        </div>
      </section>

      {/* 2 — Trust band: social proof surfaced early (brands + hard credentials) */}
      <AnimatedSection className="border-b border-gray-100 bg-white py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {t.trustBrands.map((b) => (
              <li key={b} className="text-base font-bold text-gray-400 tracking-tight break-keep">{b}</li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {credChips.map((c) => {
              const Icon = c.icon;
              return (
                <li key={c.label} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-medium text-gray-600 shadow-card">
                  <Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                  <span className="break-keep">{c.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </AnimatedSection>

      {/* 3 — Pain: the three symptoms, then the one root cause (can't read inside the store) */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.challengesTitle}</h2>
            <p className="text-gray-500 break-keep">{t.challengesSub}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {t.challenges.map((item, i) => {
              const Icon = challengeIcons[i];
              return (
                <div key={item.title} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 break-keep">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed break-keep">{item.desc}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-8 border-l-2 border-primary pl-4 text-lg font-semibold text-gray-900 break-keep max-w-3xl">
            {t.challengesRoot}
          </p>
        </div>
      </AnimatedSection>

      {/* 4 — Spine: the tailored-proposal promise + how we tailor (read · find · tailor) */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.spineEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.spineTitle}</h2>
            <p className="text-lg text-gray-600 leading-relaxed break-keep">{t.spineBody}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {t.spineSteps.map((s, i) => {
              const Icon = spineIcons[i];
              return (
                <div key={s.title} className="relative flex flex-col p-6 bg-white rounded-2xl border border-gray-200 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <span className="text-2xs font-bold uppercase tracking-[0.15em] text-gray-400">{`0${i + 1}`}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 break-keep">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed break-keep">{s.desc}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm font-medium text-gray-500 break-keep">
            <ArrowRight className="w-4 h-4 text-primary shrink-0 rotate-90 sm:rotate-0" aria-hidden="true" />
            {t.spineConnect}
          </p>
        </div>
      </AnimatedSection>

      {/* 5 — Golden Case: the tailoring engine (five stages) */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12 lg:mb-14 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.goldenEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.goldenTitle}</h2>
            <p className="text-lg text-gray-500 break-keep">{t.goldenSub}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {t.golden.map((g, i) => {
              const Icon = goldenIcons[i];
              const n = String(i + 1).padStart(2, '0');
              return (
                <div key={n} className="relative flex flex-col p-6 bg-gray-50 rounded-2xl border border-gray-200 h-full">
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </span>
                    <span className="text-2xl font-bold text-gray-200 tabular-nums">{n}</span>
                  </div>
                  <p className="text-2xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">{g.en}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 break-keep">{g.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed break-keep flex-1">{g.desc}</p>
                  {i < t.golden.length - 1 && (
                    <span className="hidden lg:block absolute top-1/2 -right-2.5 w-5 h-px bg-gray-300" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-10">
            <Link href={localeHref(locale, '/resources/case-studies')} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              {t.goldenLink}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* 6 — Dashboard: visibility restored, every store on one screen */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-12 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.dashboardEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.dashboardTitle}</h2>
            <p className="text-gray-500 break-keep">{t.dashboardSub}</p>
          </div>
          <MultiStoreDashboardMockup locale={locale} />
          <div className="mx-auto max-w-6xl mt-8">
            <HqMapDashboardMockup locale={locale} />
          </div>
        </div>
      </AnimatedSection>

      {/* 7 — HQ ↔ store promise mirror (relocated from About) */}
      <MasterPair locale={locale} />

      {/* 8 — Adoption: pilot → prove → scale, on existing CCTV (risk removal) */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.processTitle}</h2>
            <p className="text-gray-500 break-keep">{t.processSub}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {t.process.map((item, i) => (
              <div key={item.title} className="p-6 rounded-2xl border border-gray-200 bg-gray-50">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-sm font-bold text-primary tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 break-keep">{item.title}</h3>
                <p className="text-sm text-gray-500 break-keep">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 bg-primary-lighter/50 rounded-2xl border border-primary/15">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-gray-700 leading-relaxed break-keep">
                <strong className="text-gray-900">{t.processNoteStrong}</strong>{t.processNoteRest}
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 9 — Objection handling FAQ (shared Accordion primitive) */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.faqEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.faqTitle}</h2>
            <p className="text-gray-500 break-keep">{t.faqSub}</p>
          </div>
          <Accordion idPrefix="enterprise-faq" items={t.faq.map((f) => ({ question: f.question, answer: f.answer }))} />
        </div>
      </AnimatedSection>

      {/* 10 — Final CTA: two-track (request a proposal + email), lead pipeline */}
      <AnimatedSection className="relative py-20 lg:py-28 bg-surface-dark noise-overlay overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight break-keep">
            {t.ctaTitleA}
            <br className="hidden sm:block" />
            {' '}
            <span className="text-primary-light">{t.ctaTitleB}</span>
          </h2>
          <p className="text-lg text-gray-300 mb-10 break-keep">{t.ctaSub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={proposalHref}
              className="btn-primary btn-lg shadow-[0_0_20px_theme(colors.primary/0.3)] hover:shadow-[0_0_30px_theme(colors.primary/0.5)] transition-[box-shadow]"
            >
              {t.ctaProposal}
            </Link>
            <a
              href={emailHref}
              className="btn-secondary btn-lg !bg-white/5 hover:!bg-white/10 !text-white !border-white/10 backdrop-blur-sm transition-colors inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              {t.ctaEmail}
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-400 break-keep">{t.ctaReassure}</p>
        </div>
      </AnimatedSection>
    </>
  );
}
