import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { StaggerContainer } from '@/components/ui/StaggerContainer';
import { StaggerItem } from '@/components/ui/StaggerItem';
import { CountUp } from '@/components/ui/CountUp';
import { AnonymizationPipeline } from '@/components/technology/AnonymizationPipeline';
import LoopVideo from '@/components/ui/LoopVideo';
import { PrivacyJourneyMockup } from '@/components/mockups';
import AutonomyLadderTimeline from '@/components/mockups/AutonomyLadderTimeline';
import IntegratedLoopDiagram from '@/components/mockups/IntegratedLoopDiagram';
import {
  Fingerprint, ShieldCheck, Grid3x3, Shield, ArrowRight,
  CheckCircle2, AlertCircle,
} from 'lucide-react';
import { COMPANY } from '@/lib/company-data';
import { localeHref, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';

type StackItem = { tag: string; title: string; desc: string };
type DemoItem = { label: string; desc: string };
type ComplianceItem = { region: string; law: string; desc: string };
type ProductItem = { name: string; desc: string };

type Copy = {
  heroBadge: string;
  heroTitleA: string;
  heroTitleB: string;
  heroSub: string;
  heroPatentsLabel: string;
  heroStackLine: string;

  problemEyebrow: string;
  problemTitle: string;
  problemSub: string;
  oldTag: string;
  oldTitle: string;
  dilemmaOld: string[];
  newTag: string;
  newTitle: string;
  dilemmaNew: string[];

  howEyebrow: string;
  howTitle: string;
  howSub: string;

  demoEyebrow: string;
  demoTitle: string;
  demoSub: string;
  demoItems: DemoItem[];
  demoCaption: string;

  coreEyebrow: string;
  coreTitle: (n: number) => string;
  coreSub: string;
  stack: StackItem[];
  learnMore: string;

  complianceEyebrow: string;
  complianceTitle: string;
  complianceSub: string;
  complianceItems: ComplianceItem[];

  patentsLabel: string;
  patentsStackLine: string;
  poweredLabel: string;
  poweredProducts: ProductItem[];

  ctaBadge: (n: number) => string;
  ctaTitle: string;
  ctaSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const stackHrefs = [
  '/technology/anonymizer',
  '/technology/seal',
  '/technology/models',
];
const stackIcons = [Fingerprint, ShieldCheck, Grid3x3];
const poweredHrefs = [
  '/products/store-insight',
  '/products/store-agent',
  '/products/store-care',
];

const ko: Copy = {
  heroBadge: 'Technology',
  heroTitleA: 'SAAI를 움직이는 건,',
  heroTitleB: '딥핑소스의 기술입니다.',
  heroSub: '익명화, 공간 지능, 그리고 에이전트 AI — 세 개의 축이 공간을 읽고, 운영합니다.',
  heroPatentsLabel: '보유 특허',
  heroStackLine: '익명화 · 공간 지능 · 에이전트 AI',

  problemEyebrow: 'Layer 1 · Anonymizer',
  problemTitle: '비전 AI는, 결국 사람을 봅니다',
  problemSub: '사람을 보는 그 순간, 그건 개인정보가 됩니다. GDPR도, CCPA도, 국내 개인정보보호법도 — 얼굴과 신원을 그냥 두지 않습니다.',
  oldTag: '그냥 두면',
  oldTitle: '얼굴과 신원이, 그대로 남는다',
  dilemmaOld: [
    '원본 영상에 얼굴과 신원이 그대로',
    '동의 없이 다수가 노출되는 구조',
    '저장될수록 규제 위험은 커진다',
    '결국 분석을 포기하거나, 원본을 떠안는다',
  ],
  newTag: 'Anonymizer',
  newTitle: '신원은 지우고, 분석은 그대로',
  dilemmaNew: [
    '입력 시점에 신원을 지운다',
    '여러 사람을 동시에, 동의 없이도 보호',
    '원본은 남기지 않는다',
    '분석에 필요한 흐름은 원본 품질로 유지',
  ],

  howEyebrow: 'How It Works',
  howTitle: '입력 시점에 신원을 지웁니다',
  howSub: '읽기 전에 먼저 지운다 — 익명화 위에서만 모든 분석이 시작됩니다.',

  demoEyebrow: 'Anonymizer Demo',
  demoTitle: '들어오는 순간, 신원을 지웁니다',
  demoSub: 'CCTV 영상이 들어오는 그 시점에 신원을 제거합니다. 여러 사람을 동시에 보호하고, 원본은 어디에도 남기지 않습니다.',
  demoItems: [
    { label: '입력 시점 익명화', desc: '읽기 전에 먼저 신원을 지웁니다' },
    { label: '동의 없이도 보호', desc: '여러 사람을 동시에 익명화' },
    { label: '원본 미보존', desc: '원본은 시스템 어디에도 남기지 않습니다' },
  ],
  demoCaption: '실제 출력입니다 — 합성 일러스트가 아니라, 제품이 만든 익명화 영상. 원본 → 익명화 → 익명 상태로 추적.',

  coreEyebrow: 'Three Axes',
  coreTitle: () => '공간을 운영하는, 세 개의 기술 축',
  coreSub: '익명화 위에 공간 지능, 그 위에 에이전트 AI — 세 축이 쌓여 공간을 운영합니다.',
  stack: [
    { tag: '① Anonymizer', title: '익명화', desc: '비전 AI는 결국 사람을 봅니다. 입력 시점에 신원을 지우고, 원본은 남기지 않습니다. 모든 분석이 그 위에서 시작됩니다.' },
    { tag: '② Spatial AI', title: '공간 지능', desc: '누구인지가 아니라, 무엇을 어떻게. 검출·자세·재식별·군중 밀도를 하나의 영상에서 읽고, MTMC로 흩어진 카메라를 한 공간으로 정합해 카메라가 바뀌어도 한 사람으로 이어 추적합니다.' },
    { tag: '③ Agentic AI', title: '에이전트 AI', desc: '범용 모델이 아니라, 공간 운영에 맞게 튜닝한 AI. 보는 데서 그치지 않고, 다음 한 수까지 판단합니다.' },
  ],
  learnMore: '자세히 보기',

  complianceEyebrow: 'Privacy by Design',
  complianceTitle: '어디서든, 프라이버시 바이 디자인',
  complianceSub: '원본은 저장하지 않고, 재식별은 불가능합니다. GDPR·CCPA·국내 개인정보보호법, 그리고 SOC2 인증까지 충족합니다.',
  complianceItems: [
    { region: 'EU', law: 'GDPR', desc: '유럽 일반 개인정보보호법' },
    { region: 'US', law: 'CCPA', desc: '캘리포니아 소비자 개인정보보호법' },
    { region: 'KR', law: '개인정보보호법', desc: '한국 개인정보보호법' },
  ],

  patentsLabel: '보유 특허',
  patentsStackLine: '익명화 · 공간 지능 · 에이전트 AI',
  poweredLabel: '이 기술이 구동하는 제품',
  poweredProducts: [
    { name: 'store insight', desc: '어제를 읽다 — 매출 너머의 공간' },
    { name: 'store agent', desc: '다음을 실행하다 — 권고는 AI, 결정은 사람' },
    { name: 'store care', desc: '지금을 알리다 — 필요한 순간만 실시간' },
  ],

  ctaBadge: () => '익명화 · 공간 지능 · 에이전트 AI',
  ctaTitle: '기술이, 공간을 운영합니다',
  ctaSub: '익명화 위에 공간 지능, 그 위에 에이전트 AI. 도입 요건과 기술 스펙, 전문 팀이 직접 설명합니다.',
  ctaPrimary: '도입 검토 상담 신청',
  ctaSecondary: '회사 소개 보기',
};

const en: Copy = {
  heroBadge: 'Technology',
  heroTitleA: 'What moves SAAI',
  heroTitleB: 'is DeepingSource technology.',
  heroSub: 'Anonymization, spatial intelligence, and agentic AI — three axes that read space and operate it.',
  heroPatentsLabel: 'Patents',
  heroStackLine: 'Anonymizer · Spatial AI · Agentic AI',

  problemEyebrow: 'Layer 1 · Anonymizer',
  problemTitle: 'Vision AI, in the end, sees people',
  problemSub: 'The moment it sees a person, that becomes personal data. GDPR, CCPA, Korea’s PIPA — none of them let faces and identities just sit there.',
  oldTag: 'Left as-is',
  oldTitle: 'Faces and identities stay in the frame',
  dilemmaOld: [
    'Faces and identities remain in the raw footage',
    'Dozens of people exposed without consent',
    'The longer it’s stored, the greater the risk',
    'You abandon the analysis, or carry the raw video',
  ],
  newTag: 'Anonymizer',
  newTitle: 'Erase identity, keep the analysis',
  dilemmaNew: [
    'Identity is removed at the moment of input',
    'Many people protected at once, no consent required',
    'The original is never kept',
    'The movement that analysis needs stays at original quality',
  ],

  howEyebrow: 'How It Works',
  howTitle: 'Identity is erased at the moment of input',
  howSub: 'Erase before you read — every analysis begins only on top of anonymization.',

  demoEyebrow: 'Anonymizer Demo',
  demoTitle: 'The instant it arrives, identity is gone',
  demoSub: 'Identity is removed the moment CCTV footage comes in. Many people are protected at once, and the original is left nowhere.',
  demoItems: [
    { label: 'Anonymized at input', desc: 'Identity erased before anything is read' },
    { label: 'Protected without consent', desc: 'Many people de-identified at once' },
    { label: 'No original kept', desc: 'The original is left nowhere in the system' },
  ],
  demoCaption: "This is real output — the product's own anonymized footage, not a synthetic illustration. Original → anonymized → tracked while anonymized.",

  coreEyebrow: 'Three Axes',
  coreTitle: () => 'Three technical axes that operate space',
  coreSub: 'Spatial intelligence on top of anonymization, agentic AI on top of that — three axes that stack up to operate space.',
  stack: [
    { tag: '① Anonymizer', title: 'Anonymization', desc: 'Vision AI ultimately sees people. Identity is erased at the moment of input and the original is never kept. Every analysis begins on top of it.' },
    { tag: '② Spatial AI', title: 'Spatial intelligence', desc: 'Not who, but what and how. Detection, pose, re-ID, crowd density from a single feed — and MTMC stitches scattered cameras into one space, tracking a person as one even across cameras.' },
    { tag: '③ Agentic AI', title: 'Agentic AI', desc: 'Not a general-purpose model — AI tuned for operating space. It doesn’t stop at seeing; it judges the next move.' },
  ],
  learnMore: 'Learn more',

  complianceEyebrow: 'Privacy by Design',
  complianceTitle: 'Privacy by design, everywhere',
  complianceSub: 'The original is never stored and re-identification is impossible. Compliant with GDPR, CCPA, Korea’s PIPA — and SOC 2 certified.',
  complianceItems: [
    { region: 'EU', law: 'GDPR', desc: 'EU General Data Protection Regulation' },
    { region: 'US', law: 'CCPA', desc: 'California Consumer Privacy Act' },
    { region: 'KR', law: 'PIPA', desc: 'Korea Personal Information Protection Act' },
  ],

  patentsLabel: 'Patents',
  patentsStackLine: 'Anonymizer · Spatial Intelligence · Agentic AI',
  poweredLabel: 'Products powered by this technology',
  poweredProducts: [
    { name: 'store insight', desc: 'Reads yesterday — the space beyond sales' },
    { name: 'store agent', desc: 'Acts on next — AI recommends, people decide' },
    { name: 'store care', desc: 'Flags the now — only the moments that matter' },
  ],

  ctaBadge: () => 'Anonymizer · Spatial AI · Agentic AI',
  ctaTitle: 'The technology that operates space',
  ctaSub: 'Spatial intelligence on top of anonymization, agentic AI on top of that. Deployment requirements and tech specs, explained directly by our team.',
  ctaPrimary: 'Request an adoption consultation',
  ctaSecondary: 'About the company',
};

const jp: Copy = {
  heroBadge: 'Technology',
  heroTitleA: 'SAAIを動かすのは、',
  heroTitleB: 'ディーピングソースの技術です。',
  heroSub: '匿名化、空間知能、そしてエージェントAI — 三つの軸が空間を読み、運営します。',
  heroPatentsLabel: '保有特許',
  heroStackLine: '匿名化 · 空間知能 · エージェントAI',

  problemEyebrow: 'Layer 1 · Anonymizer',
  problemTitle: 'ビジョンAIは、結局は人を見ます',
  problemSub: '人を見たその瞬間、それは個人情報になります。GDPRも、CCPAも、韓国の個人情報保護法も — 顔と身元をそのままにはしません。',
  oldTag: 'そのままにすると',
  oldTitle: '顔と身元が、そのまま残る',
  dilemmaOld: [
    '原本映像に顔と身元がそのまま残る',
    '同意なく多数の人がさらされる構造',
    '保存するほど、規制リスクは大きくなる',
    '結局、分析を断念するか、原本を抱え込む',
  ],
  newTag: 'Anonymizer',
  newTitle: '身元は消し、分析はそのまま',
  dilemmaNew: [
    '入力の時点で身元を消す',
    '同意がなくても、多数を同時に保護',
    '原本は残さない',
    '分析に必要な流れは原本品質で維持',
  ],

  howEyebrow: 'How It Works',
  howTitle: '入力の時点で、身元を消します',
  howSub: '読む前に、まず消す — すべての分析は匿名化の上でのみ始まります。',

  demoEyebrow: 'Anonymizer Demo',
  demoTitle: '入ってきた瞬間、身元を消します',
  demoSub: 'CCTV映像が入ってくるその時点で身元を除去します。多数の人を同時に保護し、原本はどこにも残しません。',
  demoItems: [
    { label: '入力時点で匿名化', desc: '読む前に、まず身元を消します' },
    { label: '同意がなくても保護', desc: '多数の人を同時に匿名化' },
    { label: '原本を残さない', desc: '原本はシステムのどこにも残しません' },
  ],
  demoCaption: '実際の出力です——合成イラストではなく、製品が生成した匿名化映像。原本 → 匿名化 → 匿名のまま追跡。',

  coreEyebrow: 'Three Axes',
  coreTitle: () => '空間を運営する、三つの技術の軸',
  coreSub: '匿名化の上に空間知能、その上にエージェントAI — 三つの軸が積み重なって空間を運営します。',
  stack: [
    { tag: '① Anonymizer', title: '匿名化', desc: 'ビジョンAIは結局、人を見ます。入力の時点で身元を消し、原本は残しません。すべての分析がその上で始まります。' },
    { tag: '② Spatial AI', title: '空間知能', desc: '誰かではなく、何をどう。人物検出・姿勢推定・再識別・群衆密度を一つの映像から読み取り、MTMCで散らばったカメラを一つの空間に整合し、カメラが変わっても一人として追跡し続けます。' },
    { tag: '③ Agentic AI', title: 'エージェントAI', desc: '汎用モデルではなく、空間運営に合わせてチューニングしたAI。見るだけで終わらず、次の一手まで判断します。' },
  ],
  learnMore: '詳しく見る',

  complianceEyebrow: 'Privacy by Design',
  complianceTitle: 'どこでも、プライバシー・バイ・デザイン',
  complianceSub: '原本は保存せず、再識別は不可能です。GDPR・CCPA・韓国の個人情報保護法、そしてSOC2認証まで満たします。',
  complianceItems: [
    { region: 'EU', law: 'GDPR', desc: 'EU一般データ保護規則' },
    { region: 'US', law: 'CCPA', desc: 'カリフォルニア州消費者プライバシー法' },
    { region: 'KR', law: 'PIPA', desc: '韓国個人情報保護法' },
  ],

  patentsLabel: '保有特許',
  patentsStackLine: '匿名化 · 空間知能 · エージェントAI',
  poweredLabel: 'この技術が支える製品',
  poweredProducts: [
    { name: 'store insight', desc: '昨日を読む — 売上の先にある空間' },
    { name: 'store agent', desc: '次を動かす — 推奨はAI、決定は人' },
    { name: 'store care', desc: '今を知らせる — 必要な瞬間だけリアルタイム' },
  ],

  ctaBadge: () => '匿名化 · 空間知能 · エージェントAI',
  ctaTitle: '技術が、空間を運営します',
  ctaSub: '匿名化の上に空間知能、その上にエージェントAI。導入要件と技術仕様、専門チームが直接ご説明します。',
  ctaPrimary: '導入検討のご相談',
  ctaSecondary: '会社紹介を見る',
};

const C: Record<Locale, Copy> = { ko, en, jp };

export default function TechnologyView({ locale }: { locale: Locale }) {
  const t = C[locale];

  const stack = t.stack.map((s, i) => ({ ...s, icon: stackIcons[i], href: stackHrefs[i] }));
  const poweredProducts = t.poweredProducts.map((p, i) => ({ ...p, href: poweredHrefs[i] }));

  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-24 lg:pt-36 overflow-hidden section-dark">
        <div className="absolute inset-0 bg-surface-dark" aria-hidden="true" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <Breadcrumb items={[{ name: crumb('technology', locale), path: '/technology' }]} locale={locale} tone="dark" className="mb-6" />
            <HeroBadge tone="dark">
              <Fingerprint className="w-3.5 h-3.5" />
              {t.heroBadge}
            </HeroBadge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12] mb-6 break-keep">
              {t.heroTitleA}<br className="hidden sm:block" />
              <span className="text-primary-light">{t.heroTitleB}</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl break-keep">
              {t.heroSub}
            </p>
            <div className="inline-flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/15 rounded-2xl backdrop-blur-sm">
              <div className="text-center">
                <CountUp to={COMPANY.patents} className="text-4xl font-bold text-white tabular-nums" />
                <p className="text-xs text-slate-300 font-medium mt-0.5">{t.heroPatentsLabel}</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-left">
                <p className="text-sm font-medium text-white">{t.heroStackLine}</p>
                <p className="text-xs text-slate-300 mt-0.5">{COMPANY.patentsLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 딜레마와 해법 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.problemEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.problemTitle}</h2>
            <p className="text-lg text-gray-500 max-w-xl break-keep">
              {t.problemSub}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <div className="p-8 bg-red-50 rounded-3xl border border-red-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-sm font-bold text-red-600 uppercase tracking-wide">{t.oldTag}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.oldTitle}</h3>
              <div className="space-y-3">
                {t.dilemmaOld.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-red-200 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-0.5 bg-red-500 rounded" />
                    </div>
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 bg-primary-lighter rounded-3xl border border-primary/15">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                  <Fingerprint className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-bold text-primary uppercase tracking-wide">{t.newTag}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.newTitle}</h3>
              <div className="space-y-3">
                {t.dilemmaNew.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── 3단계 프로세스 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.howEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.howTitle}</h2>
            <p className="text-lg text-gray-500 max-w-xl break-keep">{t.howSub}</p>
          </div>
          <AnonymizationPipeline locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── 통합 신호 루프 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <IntegratedLoopDiagram locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── Anonymizer 데모 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.demoEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.demoTitle}</h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-6 break-keep">
              {t.demoSub}
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {t.demoItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <figure className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-900 shadow-card">
            <div className="overflow-x-auto">
              <LoopVideo
                mp4="/videos/anon-3panel-demo.mp4"
                poster="/images/technology/anon-3panel-poster.webp"
                ariaLabel={t.demoCaption}
                className="block h-auto w-full min-w-[680px]"
              />
            </div>
            <figcaption className="px-5 py-3 text-xs text-gray-300 break-keep">{t.demoCaption}</figcaption>
          </figure>
        </div>
      </AnimatedSection>

      {/* ── Privacy Journey (원본은 절대 남지 않는다) ── */}
      <AnimatedSection className="py-20 lg:py-28 section-dark bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <PrivacyJourneyMockup locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── 기술 스택 갤러리 (4 서브) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">{t.coreEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">{t.coreTitle(COMPANY.patents)}</h2>
            <p className="text-lg text-gray-500 max-w-xl break-keep">{t.coreSub}</p>
          </div>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stack.map((s) => {
              const Icon = s.icon;
              return (
                <StaggerItem key={s.tag}>
                  <Link href={s.href} className="group flex flex-col h-full p-7 bg-white rounded-2xl border border-gray-200 hover:border-primary-light hover:shadow-[0_8px_30px_rgba(55,106,226,0.08)] transition-[border-color,box-shadow]">
                    <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    <p className="text-2xs font-bold uppercase tracking-wider text-gray-500 mb-1">{s.tag}</p>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed flex-1 break-keep">{s.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      {t.learnMore}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* ── 자율성 사다리 (성숙 단계) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AutonomyLadderTimeline locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── 규제 준수 + 특허 + 제품 연결 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="p-10 bg-gray-50 rounded-3xl border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary-lighter flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">{t.complianceEyebrow}</p>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 break-keep">{t.complianceTitle}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 break-keep">
                {t.complianceSub}
              </p>
              <div className="space-y-4">
                {t.complianceItems.map((item) => (
                  <div key={item.law} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-gray-900">{item.region}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.law}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-primary ml-auto shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="p-10 section-dark rounded-3xl text-center flex-1 flex flex-col justify-center">
                <p className="text-5xl sm:text-7xl font-bold mb-2 text-white">{COMPANY.patents}</p>
                <p className="text-lg font-bold mb-1 text-white">{t.patentsLabel}</p>
                <p className="text-sm text-slate-300 font-medium mb-1">{COMPANY.patentsLabel}</p>
                <p className="text-slate-400 text-sm">{t.patentsStackLine}</p>
              </div>
              <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                <p className="text-sm font-bold text-gray-500 mb-4">{t.poweredLabel}</p>
                <div className="flex flex-col gap-2">
                  {poweredProducts.map((p) => (
                    <Link key={p.name} href={p.href} className="flex items-center justify-between p-3 rounded-xl hover:bg-white transition-colors group">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full text-primary bg-primary-lighter">{p.name}</span>
                        <span className="text-sm text-gray-600">{p.desc}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 transition-[color,transform]" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── CTA ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-lighter border border-primary/15 rounded-full text-sm text-primary font-medium mb-8">
            <Fingerprint className="w-3.5 h-3.5" />
            {t.ctaBadge(COMPANY.patents)}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 break-keep">
            {t.ctaTitle}
          </h2>
          <p className="text-gray-500 text-lg mb-10 break-keep">{t.ctaSub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={localeHref(locale, '/contact')} className="btn-primary btn-lg">{t.ctaPrimary}</Link>
            <Link href={localeHref(locale, '/company/about')} className="inline-flex items-center justify-center px-9 py-4 text-base font-medium text-gray-900 bg-white border border-gray-200 rounded-[14px] hover:border-primary-light transition-colors">{t.ctaSecondary}</Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
