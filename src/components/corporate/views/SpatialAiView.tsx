import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Layers, Grid3x3, ArrowRight, TrendingUp, ShieldCheck, MessageSquareText, BrainCircuit } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { contactEnterpriseHref } from '@/lib/cta-canon';
import { JsonLd, definedTerm } from '@/lib/structured-data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import WordRise from '@/components/ui/WordRise';
import { crumb } from '@/lib/breadcrumb-labels';
import { SpatialTrajectoryMockup } from '@/components/mockups';
import LoopVideo from '@/components/ui/LoopVideo';

type Section = { label: string; title: string; body: string };

type Copy = {
  heroBadge: string;
  heroTitleA: string;
  heroTitleB: string;
  heroSub: string;

  mechanismSections: Section[];

  impactEyebrow: string;
  impactTitle: string;
  impactBody: string;

  whyEyebrow: string;
  whyTitle: string;
  whyBody: string;
  whyLink: string;

  demo1Title: string;
  demo1Body: string;
  demo1Caption: string;
  demo1Aria: string;

  referencesEyebrow: string;
  referencesBody: string;

  ctaTitle: string;
  ctaSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

// 역량 4카드(②3-1): CV · MTMC · VLM · Domain Knowledge. 개념('누구인지가 아니라')은
// 히어로 서브가 이미 담당 — 카드에서 제거. VLM·DK는 agentic-ai와 같은 어휘로 잇는다.
const mechanismIcons = [Layers, Grid3x3, MessageSquareText, BrainCircuit];

// models 임시 숨김(② D1) 흡수 — CV 카드 하단 대표 모델 칩(②3-2). 데이터는 src/data/models.ts 보존.
const CV_MODEL_CHIPS = ['person-detect', 'pose-estimate', 'reid-embed', 'mtmc-track', 'shelf-state'];

const ko: Copy = {
  heroBadge: 'Spatial AI · 공간 지능',
  heroTitleA: '공간을 읽는 것이,',
  heroTitleB: '먼저입니다',
  heroSub:
    '물리 공간에서 일하려면, 먼저 그 공간을 읽고 흐름을 이해해야 합니다. 딥핑소스는 이미 매장에 달린 CCTV를 하나의 좌표로 묶어, 사람과 사물이 공간에서 무엇을 어떻게 하는지 읽어냅니다.',

  mechanismSections: [
    {
      label: 'Computer Vision',
      title: '검출·자세·재식별·밀도를 한 영상에서',
      body: '사람 검출, 자세 추정, 재식별, 군중 밀도 — SOTA급 비전 모델들이 하나의 영상에서 이만큼을 읽습니다. 매장에 이미 달린 카메라로, 공간 위에서 일어나는 일을 그대로 봅니다.',
    },
    {
      label: 'MTMC',
      title: 'MTMC — 흩어진 카메라를 하나로',
      body: '한 대의 카메라만으로는 공간의 한 조각밖에 보지 못합니다. MTMC(Multi-Target Multi-Camera)가 흩어진 카메라들을 하나의 공간 좌표로 정합합니다. 카메라가 바뀌어도, 한 사람으로 이어 추적합니다.',
    },
    {
      label: 'VLM',
      title: '장면을 언어로 이해합니다',
      body: 'VLM(비전-언어 모델)이 화면 속 장면을 문장으로 설명하고 질문에 답합니다. "지금 진열대 앞에서 무슨 일이 일어나고 있나" — 좌표 너머의 맥락을 언어로 읽습니다.',
    },
    {
      label: 'Domain Knowledge',
      title: '매장을 아는 지식층',
      body: '같은 움직임도 매장에서는 다른 의미가 됩니다. 어떤 신호가 유의미한지 아는 도메인 지식층이 관측을 운영의 언어로 바꿉니다 — 에이전트 AI의 Domain Knowledge와 같은 어휘로 이어집니다.',
    },
  ],

  impactEyebrow: 'Output · 운영 임팩트',
  impactTitle: '하나의 공간 좌표로, 매장이 데이터가 됩니다',
  impactBody:
    '여러 카메라의 관측이 하나의 좌표계로 모이면, 입장부터 퇴장까지의 동선과 구역별 체류·밀도 패턴이 통째로 드러납니다. 감으로 판단하던 레이아웃·인력·캠페인 결정이 근거를 갖게 됩니다. 보는 것에서 그치지 않고, 매장을 운영하는 AI로 이어지는 첫 단계입니다.',

  whyEyebrow: '이게 가능한 이유',
  whyTitle: '2018년부터 영상 익명화만 파온 회사이기 때문입니다',
  whyBody:
    '신원을 지우는 기술이 먼저 있었기에, 공간 분석이 동의 절차나 규제 리스크 없이 가능합니다 — GDPR·CCPA·국내 개인정보보호법 기준을 충족하며, 신원은 입력 시점에 사라지고 분석 신호만 남습니다.',
  whyLink: '익명화 기술 자세히 보기',

  demo1Title: '얼굴은 지워도, 맥락은 읽습니다',
  demo1Body: '신원은 되돌릴 수 없게 지우고, 장면 이해에 필요한 최소 특징만 남깁니다.',
  demo1Caption: '얼굴은 노이즈. 그래도 읽히는 것 — 연령대·시선·발화. 신원은 없습니다.',
  demo1Aria: '얼굴이 노이즈로 익명화된 인물에서 나이·성별·시선·발화 같은 속성을 읽어내는 데모 영상',

  referencesEyebrow: 'References',
  referencesBody:
    '2018년부터 영상 익명화 기술을 다듬어 온 딥핑소스는, 그 위에서 공간 지능을 CES 전시, KDDI와의 협업, NVIDIA 생태계 등에서 소개·검증해 왔습니다. 관련 발표·협업 내역은 참고 자료로 안내해 드립니다.',

  ctaTitle: '공간을 읽는 방식을, 함께 설계합니다',
  ctaSub: '카메라 배치, 좌표화 요건, 분석 목표 — 기술 팀이 직접 답변합니다. 지금 있는 CCTV 그대로, 도입 가능 여부부터 확인해 드립니다.',
  ctaPrimary: '기술 검토 문의',
  ctaSecondary: 'saai insight 보기',
};

const en: Copy = {
  heroBadge: 'Spatial AI · Spatial Intelligence',
  heroTitleA: 'Reading the space',
  heroTitleB: 'comes first',
  heroSub:
    'To work in physical space, you must first read the space and understand its flow. DeepingSource ties existing store CCTVs into a single coordinate system to read what people and objects do in the space and how.',

  mechanismSections: [
    {
      label: 'Computer Vision',
      title: 'Detection, pose, re-ID, density — from one feed',
      body: 'Person detection, pose estimation, re-identification, crowd density — SOTA vision models read all of this from a single video feed, straight through the cameras already on the ceiling.',
    },
    {
      label: 'MTMC',
      title: 'MTMC — scattered cameras into one',
      body: 'A single camera sees only a slice of the space. MTMC (Multi-Target Multi-Camera) merges scattered cameras into a single spatial coordinate system, tracking one person seamlessly across cameras.',
    },
    {
      label: 'VLM',
      title: 'Understanding the scene in language',
      body: 'A vision-language model describes what is happening in a scene and answers questions about it. "What is going on in front of that shelf right now" — reading context beyond coordinates.',
    },
    {
      label: 'Domain Knowledge',
      title: 'A knowledge layer that knows stores',
      body: 'The same movement means different things in a store. A domain-knowledge layer that knows which signals matter turns observation into the language of operations — the same vocabulary as Agentic AI’s Domain Knowledge.',
    },
  ],

  impactEyebrow: 'Output · Operational Impact',
  impactTitle: 'With a single spatial coordinate, the store becomes data',
  impactBody:
    'When observations from multiple cameras converge into a single coordinate system, the full path from entry to exit and zone-by-zone dwell and density patterns are revealed. Layout, staffing, and campaign decisions once made on intuition gain data-driven evidence. It is the first step toward AI that doesn’t just view the store, but operates it.',

  whyEyebrow: 'Why This Is Possible',
  whyTitle: 'Because we’ve specialized in video anonymization since 2018',
  whyBody:
    'Because identity-erasing technology came first, spatial analysis is possible without consent procedures or compliance risks — meeting GDPR, CCPA, and Korean Privacy Act standards, identity disappears at input while only analysis signals remain.',
  whyLink: 'More on the anonymization technology',

  demo1Title: 'Faces erased, context preserved',
  demo1Body: 'Identity is permanently erased, retaining only minimum features needed for scene understanding.',
  demo1Caption: 'Faces masked as noise. Still readable — age, gaze, speech. Zero identity.',
  demo1Aria: 'A demo reading attributes like age, gender, gaze, and speech from a person whose face is anonymized to noise',

  referencesEyebrow: 'References',
  referencesBody:
    'DeepingSource, refining video anonymization technology since 2018, has presented and validated spatial intelligence at CES, in collaboration with KDDI, and within the NVIDIA ecosystem. Relevant presentation and collaboration records are available as reference materials.',

  ctaTitle: 'Let’s design how your space is read',
  ctaSub: 'Camera placement, coordinate mapping requirements, analysis goals — answered directly by our technical team. We’ll verify feasibility right away using your existing CCTVs.',
  ctaPrimary: 'Request technical review',
  ctaSecondary: 'See saai insight',
};

const jp: Copy = {
  heroBadge: 'Spatial AI · 空間知能',
  heroTitleA: '空間を読むことが、',
  heroTitleB: '先です',
  heroSub:
    '物理空間で働くには、まずその空間を読み、流れを理解する必要があります。ディーピングソースは店舗にすでにあるCCTVを一つの座標にまとめ、人やモノが空間で何をどうしているかを読み取ります。',

  mechanismSections: [
    {
      label: 'Computer Vision',
      title: '検出・姿勢・再識別・密度を一つの映像から',
      body: '人物検出、姿勢推定、再識別、群衆密度——SOTA級のビジョンモデルが、一つの映像からこれだけを読みます。店舗にすでにあるカメラで、空間の上で起きていることをそのまま見ます。',
    },
    {
      label: 'MTMC',
      title: 'MTMC — 散らばったカメラを一つに',
      body: '一台のカメラでは空間の一片しか見えません。MTMC（Multi-Target Multi-Camera）が、散らばったカメラを一つの空間座標へ整合し、カメラが変わっても一人として追跡を引き継ぎます。',
    },
    {
      label: 'VLM',
      title: '場面を言語で理解します',
      body: 'VLM（ビジョン・ランゲージモデル）が画面の中の場面を文章で説明し、質問に答えます。「いま陳列棚の前で何が起きているか」——座標の先にある文脈を言語で読みます。',
    },
    {
      label: 'Domain Knowledge',
      title: '店舗を知る知識レイヤー',
      body: '同じ動きでも、店舗では違う意味になります。どの信号が有意味かを知るドメイン知識レイヤーが、観測を運営の言葉に変えます——エージェントAIの Domain Knowledge と同じ語彙でつながります。',
    },
  ],

  impactEyebrow: 'Output · 運営インパクト',
  impactTitle: '一つの空間座標で、店舗がデータになります',
  impactBody:
    '複数カメラの観測が一つの座標系に集まると、入店から退店までの動線やエリアごとの滞在・密度パターンが丸ごと可視化されます。勘で判断していたレイアウト・人員・キャンペーンの決定に根拠が生まれます。見るにとどまらず、店舗を運営するAIへとつながる第一歩です。',

  whyEyebrow: 'これが可能な理由',
  whyTitle: '2018年から映像匿名化を一筋に追求してきた会社だからです',
  whyBody:
    '身元を消す技術が先行していたからこそ、同意手続きや規制リスクなしに空間分析が可能です——GDPR・CCPA・個人情報保護法等の基準を満たし、身元は入力時点で消去され、分析シグナルだけが残ります。',
  whyLink: '匿名化技術を詳しく見る',

  demo1Title: '顔は消しても、文脈は読みます',
  demo1Body: '身元は復元不可能な形で消去し、場面の理解に必要な最小限の特徴だけを残します。',
  demo1Caption: '顔はノイズ。それでも読めるもの——年代・視線・発話。身元はありません。',
  demo1Aria: '顔がノイズに匿名化された人物から、年齢・性別・視線・発話などの属性を読み取るデモ映像',

  referencesEyebrow: 'References',
  referencesBody:
    '2018年から映像匿名化技術を磨いてきたディーピングソースは、その上で空間知能をCES展示、KDDIとの協業、NVIDIAエコシステムなどで紹介・検証してきました。関連する発表・協業実績は参考資料としてご案内いたします。',

  ctaTitle: '空間の読み方を、一緒に設計します',
  ctaSub: 'カメラ配置、座標化要件、分析目標——技術チームが直接お答えします。既存のCCTVのまま、導入可能性からご確認いただけます。',
  ctaPrimary: '技術検討のお問い合わせ',
  ctaSecondary: 'saai insight を見る',
};

const C: Record<Locale, Copy> = { ko, en, jp };

export default function SpatialAiView({ locale }: { locale: Locale }) {
  const t = C[locale];
  const mechanisms = t.mechanismSections.map((s, i) => ({ ...s, icon: mechanismIcons[i] }));

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={definedTerm({ name: t.heroBadge, description: t.heroSub, path: '/technology/spatial-ai', locale })} />

      {/* 1. 공간을 이해할 수 있다 — Hero */}
      <section className="relative pt-28 pb-20 lg:pt-36 bg-slate-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: crumb('technology', locale), path: '/technology' }, { name: crumb('spatial-ai', locale), path: '/technology/spatial-ai' }]} locale={locale} tone="light" className="mb-6" />
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <HeroBadge tone="light">
                <Layers className="w-3.5 h-3.5" />
                {t.heroBadge}
              </HeroBadge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-[1.15] mb-6 break-keep">
                <WordRise text={t.heroTitleA} /><br className="hidden sm:block" />
                <WordRise text={t.heroTitleB} />
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed break-keep">
                {t.heroSub}
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card">
              <Image
                src="/images/diagrams/spatial-ai-concept.webp"
                alt={t.heroBadge}
                fill
                priority
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. 이런 기술로 가능하다 — MTMC Mockup + 3 Mechanism Cards */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-12">
          {/* MTMC trajectory centerpiece */}
          <SpatialTrajectoryMockup locale={locale} />

          {/* 역량 4카드 — CV · MTMC · VLM · Domain Knowledge (②3-1) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mechanisms.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="rounded-2xl bg-slate-950 p-6 ring-1 ring-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary-light" />
                      </div>
                      <span className="font-mono text-xs text-primary-light font-medium uppercase tracking-wider">
                        0{i + 1} · {s.label}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 break-keep">{s.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed break-keep">{s.body}</p>

                    {/* models 축약 흡수(②3-2) — CV 카드 하단 대표 모델 칩 */}
                    {s.label === 'Computer Vision' && (
                      <div className="mt-5 pt-4 border-t border-slate-800">
                        <div className="flex flex-wrap gap-1.5">
                          {CV_MODEL_CHIPS.map((chip) => (
                            <span key={chip} className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-2xs font-semibold text-slate-300 font-mono">
                              {chip}
                            </span>
                          ))}
                        </div>
                        <p className="mt-2.5 text-2xs text-slate-500 break-keep">
                          {locale === 'ko'
                            ? '익명화 · 인식 · 공간 · 흐름 · 변화 — 5분류 모델 카탈로그의 축약입니다.'
                            : locale === 'jp'
                            ? '匿名化・認識・空間・フロー・変化 — 5分類モデルカタログの要約です。'
                            : 'Anonymize · recognize · space · flow · change — a digest of the 5-category model catalog.'}
                        </p>
                      </div>
                    )}

                    {/* Task 3-5: Pipeline strip for MTMC card */}
                    {s.label === 'MTMC' && (
                      <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-1 text-2xs font-semibold text-slate-300 font-mono">
                        <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700">{locale === 'ko' ? '픽셀' : locale === 'jp' ? 'ピクセル' : 'Pixels'}</span>
                        <span className="text-primary-light font-bold">→</span>
                        <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700">{locale === 'ko' ? '카메라' : locale === 'jp' ? 'カメラ' : 'Camera'}</span>
                        <span className="text-primary-light font-bold">→</span>
                        <span className="px-2.5 py-1 rounded bg-primary/20 border border-primary/40 text-primary-light font-bold">{locale === 'ko' ? '공간 좌표' : locale === 'jp' ? '空間座標' : 'Coordinates'}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* 3. 이건 이래서 중요하다 — Output · 운영 임팩트 (신설) */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="card p-8 lg:p-12 border-primary/20 bg-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 rounded-lg bg-primary/10 text-primary">
                <TrendingUp className="w-5 h-5" />
              </span>
              <p className="text-sm font-semibold text-primary tracking-wider uppercase">{t.impactEyebrow}</p>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 break-keep leading-snug">
              {t.impactTitle}
            </h2>
            
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed break-keep">
              {t.impactBody}
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* 4. 왜 가능한가 — 익명화 근거 1블록 + 데모 1개로 축소(②3-3).
          자세한 메커니즘은 anonymizer 상세로 위임 — spatial 서사가 익명화로 새지 않게. */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <p className="text-sm font-semibold text-primary tracking-wider uppercase">{t.whyEyebrow}</p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-keep">
                {t.whyTitle}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed break-keep mb-6">
                {t.whyBody}
              </p>
              <Link
                href={localeHref(locale, '/technology/anonymizer')}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-dark transition-colors group"
              >
                {t.whyLink}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </Link>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-slate-50 p-6 flex flex-col justify-between shadow-sm">
              <div className="space-y-4 mb-6">
                <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-900">
                  <LoopVideo
                    mp4="/videos/pete-anon-demo.mp4"
                    webm="/videos/pete-anon-demo.webm"
                    poster="/images/technology/pete-anon-poster.webp"
                    ariaLabel={t.demo1Aria}
                    className="w-full h-auto block"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 break-keep">{t.demo1Title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed break-keep">{t.demo1Body}</p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed break-keep border-l-2 border-primary pl-3">
                {t.demo1Caption}
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 5. 우리를 믿고 연락달라 — References + CTA */}
      <AnimatedSection className="py-16 bg-slate-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">{t.referencesEyebrow}</p>
          <p className="text-gray-600 leading-relaxed break-keep">
            {t.referencesBody}
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5 break-keep">
            {t.ctaTitle}
          </h2>
          <p className="text-gray-600 text-lg mb-9 break-keep">
            {t.ctaSub}
          </p>
          {/* 이중 CTA(② D4·A-2): 주=상담(트랙 E 표준 목적지), 보조=대표 제품 saai insight */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={localeHref(locale, contactEnterpriseHref('spatial-ai'))} className="btn-primary btn-lg gap-2">
              {t.ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={localeHref(locale, '/products/saai-insight')}
              className="inline-flex items-center justify-center gap-2 px-9 py-4 text-base font-medium text-gray-900 bg-white border border-gray-200 rounded-[14px] hover:border-primary-light transition-colors"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
