import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Accordion from '@/components/ui/Accordion';
import { Package, ArrowRight, Plug, Code2 } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { JsonLd, definedTerm } from '@/lib/structured-data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';
import { SealSdkMockup } from '@/components/mockups';

type Promise = { letter: string; word: string; desc: string };
type Step = { title: string; desc: string };
type FaqItem = { question: string; answer: string };

type Copy = {
  heroBadge: string;
  heroTitleA: string;
  heroTitleB: string;
  heroSub: string;

  promiseEyebrow: string;
  promiseTitle: string;
  promise: Promise[];

  integrationEyebrow: string;
  integrationTitle: string;
  integrationSub: string;
  integrationSteps: Step[];
  stepLabel: (n: number) => string;

  faqEyebrow: string;
  faqTitle: string;
  faqItems: FaqItem[];

  ctaTitle: string;
  ctaSub: string;
  ctaPrimary: string;
};

const ko: Copy = {
  heroBadge: 'SEAL SDK',
  heroTitleA: '비전 AI는 사람을 봅니다.',
  heroTitleB: '그 순간, 신원을 지우는 SDK',
  heroSub:
    'GDPR도, CCPA도, 국내 개인정보보호법도 얼굴과 신원을 그냥 두지 않습니다. SEAL SDK는 입력 시점에 신원을 지우고, 누가가 아니라 무엇을 어떻게만 남깁니다. 익명화·인식·공간 분석을 모듈로 제공해, 기존 시스템에 그대로 내장합니다.',

  promiseEyebrow: 'The SEAL Promise',
  promiseTitle: '네 글자에 담은 설계 원칙',
  promise: [
    { letter: 'S', word: 'Secure', desc: '입력 시점에 신원을 지웁니다. 원본 영상은 시스템 어디에도 남지 않고, 익명화된 데이터에서 신원을 되찾을 수 없습니다.' },
    { letter: 'E', word: 'Embeddable', desc: '엣지 장치·온프레미스 서버·기존 애플리케이션에 모듈 단위로 그대로 내장합니다. 영상은 밖으로 나가지 않습니다.' },
    { letter: 'A', word: 'Adaptable', desc: '여러 사람을 동시에, 동의 없이도 보호합니다. 입력 소스와 보호 강도를 현장에 맞춰 조정합니다.' },
    { letter: 'L', word: 'Lightweight', desc: '실시간 스트림을 그 자리에서 익명화하는 경량 런타임. 제약된 환경에서도 그대로 돌아갑니다.' },
  ],

  integrationEyebrow: 'Integration',
  integrationTitle: '통합 개요',
  integrationSub:
    '입력 연결부터 결과 소비까지 단계별 모듈로 구성되어, 필요한 단계만 골라 조합합니다. 익명화가 항상 첫 단계입니다.',
  integrationSteps: [
    { title: 'SDK 설치', desc: '대상 런타임에 SDK를 추가하고 처리 노드를 초기화합니다.' },
    { title: '입력 연결', desc: 'RTSP·파일·프레임 스트림 등 표준 입력 소스를 연결합니다.' },
    { title: '익명화 우선', desc: '입력 시점에 신원을 지운 뒤, 인식·공간 분석을 필요에 맞게 잇습니다.' },
    { title: '결과 소비', desc: '원본 없이, 익명화된 스트림과 분석 신호만 애플리케이션에서 받아 활용합니다.' },
  ],
  stepLabel: (n) => `step ${n}`,

  faqEyebrow: 'FAQ',
  faqTitle: '자주 묻는 질문',
  faqItems: [
    { question: 'SEAL은 무엇의 약자인가요?', answer: 'Secure, Embeddable, Adaptable, Lightweight — SDK의 4가지 설계 원칙을 나타냅니다.' },
    { question: '신원은 언제 제거되나요?', answer: '입력 시점에 제거됩니다. 분석 이전, 데이터가 시스템에 들어오는 첫 순간에 얼굴과 신원을 지우고 — 그 뒤 단계는 익명화된 데이터만 다룹니다.' },
    { question: '동의 없이도 보호되나요?', answer: '네. 화면 안 여러 사람을 동시에, 개별 동의 없이 익명화하도록 설계되어 GDPR·CCPA·국내 개인정보보호법 요건에 맞춥니다.' },
    { question: '원본 영상을 보관하나요?', answer: '보관하지 않습니다. 원본은 시스템 어디에도 남지 않고, 익명화된 결과와 분석 신호만 전달합니다.' },
    { question: '익명화된 데이터로 신원을 다시 알 수 있나요?', answer: '없습니다. 재식별이 불가능하도록 설계되어, 익명화된 데이터에서 신원을 되찾을 수 없습니다.' },
    { question: '익명화 외에 다른 단계도 연결되나요?', answer: '익명화를 첫 단계로 두고, 그 뒤에 인식·공간 분석 모듈을 파이프라인으로 잇습니다. 누가가 아니라, 무엇을 어떻게.' },
    { question: '실시간 처리가 가능한가요?', answer: '실시간 스트림을 그 자리에서 익명화하도록 설계되었으며, 처리 성능은 입력 해상도와 배치 하드웨어에 따라 달라집니다.' },
    { question: '보안·인증은 어떻게 되나요?', answer: 'Privacy by Design을 기본으로, SOC 2 인증을 충족합니다. 어디에 배치하든 같은 프라이버시 기준이 적용됩니다.' },
  ],

  ctaTitle: '익명화를 처음부터, 설계에 넣습니다',
  ctaSub: '운영 환경과 연동 요건을 공유해 주시면, 신원 보호를 내장한 적합한 구성을 함께 설계합니다.',
  ctaPrimary: 'SDK 도입 문의',
};

const en: Copy = {
  heroBadge: 'SEAL SDK',
  heroTitleA: 'Vision AI sees people.',
  heroTitleB: 'SEAL erases identity the instant it does.',
  heroSub:
    'GDPR, CCPA, and privacy law won’t leave faces and identities alone. SEAL SDK strips identity at the moment of input and keeps only what and how — never who. Anonymization, recognition, and spatial analytics ship as modules you embed straight into your existing systems.',

  promiseEyebrow: 'The SEAL Promise',
  promiseTitle: 'Design principles in four letters',
  promise: [
    { letter: 'S', word: 'Secure', desc: 'Identity is removed at the moment of input. The original footage is left nowhere in the system, and identity cannot be recovered from anonymized data.' },
    { letter: 'E', word: 'Embeddable', desc: 'Embed it as discrete modules in edge devices, on-prem servers, and existing apps. The video never leaves your environment.' },
    { letter: 'A', word: 'Adaptable', desc: 'Protect many people at once, with no individual consent required. Tune input sources and protection strength to the site.' },
    { letter: 'L', word: 'Lightweight', desc: 'A lightweight runtime that anonymizes live streams in place — running even in constrained environments.' },
  ],

  integrationEyebrow: 'Integration',
  integrationTitle: 'Integration overview',
  integrationSub:
    'Stage-by-stage modules from input connection to result consumption — pick and combine only what you need. Anonymization is always the first stage.',
  integrationSteps: [
    { title: 'Install the SDK', desc: 'Add the SDK to the target runtime and initialize the processing node.' },
    { title: 'Connect inputs', desc: 'Connect standard input sources such as RTSP, files, and frame streams.' },
    { title: 'Anonymize first', desc: 'Strip identity at the moment of input, then chain recognition and spatial analytics as needed.' },
    { title: 'Consume results', desc: 'No original kept — your app receives only the anonymized stream and analytical signals.' },
  ],
  stepLabel: (n) => `step ${n}`,

  faqEyebrow: 'FAQ',
  faqTitle: 'Frequently asked questions',
  faqItems: [
    { question: 'What does SEAL stand for?', answer: 'Secure, Embeddable, Adaptable, Lightweight — the SDK’s four design principles.' },
    { question: 'When is identity removed?', answer: 'At the moment of input. Before any analysis, faces and identity are stripped the instant data enters the system — every stage after that handles only anonymized data.' },
    { question: 'Does it work without consent?', answer: 'Yes. It’s designed to anonymize many people in frame at once, with no individual consent required, to meet GDPR, CCPA, and local privacy-law requirements.' },
    { question: 'Is the original footage retained?', answer: 'No. The original is left nowhere in the system; only anonymized results and analytical signals move forward.' },
    { question: 'Can identity be recovered from anonymized data?', answer: 'No. It’s built so re-identification is impossible — identity cannot be recovered from anonymized data.' },
    { question: 'Can stages beyond anonymization be connected?', answer: 'Anonymization comes first, then recognition and spatial-analytics modules chain after it as a pipeline. Not who — what and how.' },
    { question: 'Is real-time processing possible?', answer: 'It’s designed to anonymize live streams in place; performance varies with input resolution and deployment hardware.' },
    { question: 'What about security and certification?', answer: 'Privacy by Design by default, and SOC 2 certified. The same privacy standard applies wherever you deploy.' },
  ],

  ctaTitle: 'We design anonymization in from the start',
  ctaSub: 'Share your operating environment and integration requirements, and we’ll design a fit with identity protection built in.',
  ctaPrimary: 'Inquire about SDK adoption',
};

const jp: Copy = {
  heroBadge: 'SEAL SDK',
  heroTitleA: 'ビジョンAIは、人を見ます。',
  heroTitleB: 'その瞬間に身元を消すSDK',
  heroSub:
    'GDPRもCCPAも、国内の個人情報保護法も、顔と身元をそのままにはしません。SEAL SDKは入力の時点で身元を消し、誰かではなく、何をどうだけを残します。匿名化・認識・空間分析をモジュールとして提供し、既存システムにそのまま組み込みます。',

  promiseEyebrow: 'The SEAL Promise',
  promiseTitle: '4つの文字に込めた設計原則',
  promise: [
    { letter: 'S', word: 'Secure', desc: '入力の時点で身元を消します。原本映像はシステムのどこにも残らず、匿名化されたデータから身元を復元することはできません。' },
    { letter: 'E', word: 'Embeddable', desc: 'エッジ機器・オンプレミスサーバー・既存アプリケーションにモジュール単位でそのまま組み込みます。映像は外に出ません。' },
    { letter: 'A', word: 'Adaptable', desc: '複数の人を同時に、同意なしでも保護します。入力ソースと保護の強度を現場に合わせて調整できます。' },
    { letter: 'L', word: 'Lightweight', desc: 'リアルタイムのストリームをその場で匿名化する軽量ランタイム。制約のある環境でもそのまま動きます。' },
  ],

  integrationEyebrow: 'Integration',
  integrationTitle: '統合の概要',
  integrationSub:
    '入力接続から結果の利用まで段階ごとのモジュールで構成され、必要な段階だけを選んで組み合わせられます。匿名化が常に最初の段階です。',
  integrationSteps: [
    { title: 'SDKのインストール', desc: '対象ランタイムにSDKを追加し、処理ノードを初期化します。' },
    { title: '入力の接続', desc: 'RTSP・ファイル・フレームストリームなど標準的な入力ソースを接続します。' },
    { title: 'まず匿名化', desc: '入力の時点で身元を消し、その後に認識・空間分析を必要に応じてつなぎます。' },
    { title: '結果の利用', desc: '原本を残さず、匿名化されたストリームと分析信号だけをアプリケーションで受け取り活用します。' },
  ],
  stepLabel: (n) => `step ${n}`,

  faqEyebrow: 'FAQ',
  faqTitle: 'よくあるご質問',
  faqItems: [
    { question: 'SEALは何の略ですか？', answer: 'Secure, Embeddable, Adaptable, Lightweight——SDKの4つの設計原則を表します。' },
    { question: '身元はいつ消されますか？', answer: '入力の時点です。分析の前、データがシステムに入る最初の瞬間に顔と身元を消し——その後の段階は匿名化されたデータのみを扱います。' },
    { question: '同意なしでも保護されますか？', answer: 'はい。画面内の複数の人を同時に、個別の同意なしで匿名化するよう設計され、GDPR・CCPA・国内の個人情報保護法の要件に適合します。' },
    { question: '原本映像を保管しますか？', answer: '保管しません。原本はシステムのどこにも残さず、匿名化された結果と分析信号のみを受け渡します。' },
    { question: '匿名化されたデータから身元を再び特定できますか？', answer: 'できません。再識別が不可能になるよう設計され、匿名化されたデータから身元を復元することはできません。' },
    { question: '匿名化以外の段階も接続されますか？', answer: '匿名化を最初の段階に置き、その後に認識・空間分析モジュールをパイプラインとしてつなぎます。誰かではなく、何をどう。' },
    { question: 'リアルタイム処理は可能ですか？', answer: 'リアルタイムのストリームをその場で匿名化するよう設計されており、処理性能は入力解像度や配置ハードウェアによって異なります。' },
    { question: 'セキュリティ・認証はどうなっていますか？', answer: 'Privacy by Designを基本とし、SOC 2認証を満たします。どこに配置しても同じプライバシー基準が適用されます。' },
  ],

  ctaTitle: '匿名化を、最初から設計に組み込みます',
  ctaSub: '運用環境と連携要件を共有いただければ、身元保護を内蔵した適切な構成を一緒に設計します。',
  ctaPrimary: 'SDK導入のお問い合わせ',
};

const C: Record<Locale, Copy> = { ko, en, jp };

export default function SealView({ locale }: { locale: Locale }) {
  const t = C[locale];

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={definedTerm({ name: t.heroBadge, description: t.heroSub, path: '/technology/seal', locale })} />

      {/* Hero */}
      <section className="relative pt-28 pb-20 lg:pt-36 bg-slate-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: crumb('technology', locale), path: '/technology' }, { name: crumb('seal', locale), path: '/technology/seal' }]} locale={locale} tone="light" className="mb-6" />
          <HeroBadge tone="light">
            <Package className="w-3.5 h-3.5" />
            {t.heroBadge}
          </HeroBadge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-[1.15] mb-6 break-keep">
            {t.heroTitleA}<br className="hidden sm:block" />
            {t.heroTitleB}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl break-keep">
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* SDK code-editor showcase */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SealSdkMockup locale={locale} />
        </div>
      </AnimatedSection>

      {/* S/E/A/L promise */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">{t.promiseEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep">
              {t.promiseTitle}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.promise.map((p) => (
              <div key={p.letter} className="card p-7 h-full">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-black text-primary font-mono leading-none">{p.letter}</span>
                  <span className="text-base font-bold text-gray-900">{p.word}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed break-keep">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Integration overview */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">{t.integrationEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-keep">
              {t.integrationTitle}
            </h2>
            <p className="text-gray-600 leading-relaxed break-keep">
              {t.integrationSub}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.integrationSteps.map((step, i) => (
              <div key={step.title} className="card p-7 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-primary-lighter flex items-center justify-center shrink-0">
                    {i === 0 ? <Code2 className="w-4 h-4 text-primary" /> : <Plug className="w-4 h-4 text-primary" />}
                  </div>
                  <span className="text-xs font-mono font-semibold text-gray-500">{t.stepLabel(i + 1)}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed break-keep">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">{t.faqEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep">
              {t.faqTitle}
            </h2>
          </div>
          <Accordion items={t.faqItems} idPrefix="seal-faq" />
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5 break-keep">
            {t.ctaTitle}
          </h2>
          <p className="text-gray-600 text-lg mb-9 break-keep">
            {t.ctaSub}
          </p>
          <Link href={localeHref(locale, '/contact')} className="btn-primary btn-lg gap-2">
            {t.ctaPrimary}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
