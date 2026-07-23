import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Layers, Map, Grid3x3, ArrowRight, TrendingUp, ShieldCheck } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
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

  demo1Title: string;
  demo1Body: string;
  demo1Caption: string;
  demo1Aria: string;

  demo2Title: string;
  demo2Body: string;
  demo2Caption: string;
  demo2Aria: string;

  referencesEyebrow: string;
  referencesBody: string;

  ctaTitle: string;
  ctaSub: string;
  ctaPrimary: string;
};

const mechanismIcons = [Layers, Map, Grid3x3];

const ko: Copy = {
  heroBadge: 'Spatial AI · 공간 지능',
  heroTitleA: '공간을 읽는 것이,',
  heroTitleB: '먼저입니다',
  heroSub:
    '물리 공간에서 일하려면, 먼저 그 공간을 읽고 흐름을 이해해야 합니다. 딥핑소스는 이미 매장에 달린 CCTV를 하나의 좌표로 묶어, 사람과 사물이 공간에서 무엇을 어떻게 하는지 읽어냅니다.',

  mechanismSections: [
    {
      label: 'Spatial AI',
      title: '누구인지가 아니라, 무엇을 어떻게',
      body: '비전 AI는 결국 사람을 봅니다. 공간 지능은 그 시선을 바꿉니다 — 누구인지 가려내는 대신, 사람들이 무엇을 어떻게 하는지 읽습니다.',
    },
    {
      label: 'Vision Models',
      title: 'SOTA급 비전 모델',
      body: '사람 검출, 자세 추정, 재식별, 군중 밀도 — SOTA급 비전 모델들이 하나의 영상에서 이만큼을 읽습니다. 어디서 멈추고, 어떻게 움직이고, 얼마나 모이는지. 공간 위에서 일어나는 일을, 매장에 이미 달린 카메라로 그대로 봅니다.',
    },
    {
      label: 'MTMC',
      title: 'MTMC — 흩어진 카메라를 하나로',
      body: '한 대의 카메라만으로는 공간의 한 조각밖에 보지 못합니다. MTMC(Multi-Target Multi-Camera)가 흩어진 카메라들을 하나의 공간 좌표로 정합합니다. 카메라가 바뀌어도, 한 사람으로 이어 추적합니다 — 사각지대를 가로질러, 끊김 없이.',
    },
  ],

  impactEyebrow: 'Output · 운영 임팩트',
  impactTitle: '하나의 공간 좌표로, 매장이 데이터가 됩니다',
  impactBody:
    '여러 카메라의 관측이 하나의 좌표계로 모이면, 입장부터 퇴장까지의 동선과 구역별 체류·밀도·이동 패턴이 통째로 드러납니다. 어디서 사람이 머물다 돌아서는지, 어느 구역이 늘 비어 있는지, 무엇이 상품 앞에서 일어나는지 — 그동안 감으로 판단하던 것들이 근거를 갖게 됩니다. 레이아웃을 다시 짤 근거, 인력을 배치할 근거, 다음 캠페인을 설계할 근거. 보는 것에서 그치지 않고 매장을 운영하는 AI로 이어지는 첫 단계입니다.',

  whyEyebrow: '이게 가능한 이유',
  whyTitle: '2018년부터 영상 익명화만 파온 회사이기 때문입니다',
  whyBody:
    '신원을 지우는 기술이 먼저 있었기에, 공간 전체를 동의 절차나 규제 리스크 없이 분석할 수 있습니다. GDPR·CCPA·국내 개인정보보호법 기준을 충족하면서, 카메라가 사람을 담아도 신원은 입력 시점에 사라지고 분석에 필요한 신호만 남습니다.',

  demo1Title: '얼굴은 지워도, 맥락은 읽습니다',
  demo1Body: '신원은 되돌릴 수 없게 지우고, 장면 이해에 필요한 최소 특징만 남깁니다.',
  demo1Caption: '얼굴은 노이즈. 그래도 읽히는 것 — 연령대·시선·발화. 신원은 없습니다.',
  demo1Aria: '얼굴이 노이즈로 익명화된 인물에서 나이·성별·시선·발화 같은 속성을 읽어내는 데모 영상',

  demo2Title: '찾아내는 건, 지우기 위해서입니다',
  demo2Body: '얼굴의 특징점을 정밀하게 찾아내는 이유는 하나 — 어디를 지워야 하는지 짚기 위해서입니다.',
  demo2Caption: '얼굴 특징점 검출. 찾은 자리는 곧 익명화됩니다 — 신원은 남지 않습니다.',
  demo2Aria: '식탁의 두 인물 얼굴에 특징점 메시가 표시되는 얼굴 검출 데모 영상',

  referencesEyebrow: 'References',
  referencesBody:
    '2018년부터 영상 익명화 기술을 다듬어 온 딥핑소스는, 그 위에서 공간 지능을 CES 전시, KDDI와의 협업, NVIDIA 생태계 등에서 소개·검증해 왔습니다. 관련 발표·협업 내역은 참고 자료로 안내해 드립니다.',

  ctaTitle: '공간을 읽는 방식을, 함께 설계합니다',
  ctaSub: '카메라 배치, 좌표화 요건, 분석 목표 — 기술 팀이 직접 답변합니다. 지금 있는 CCTV 그대로, 도입 가능 여부부터 확인해 드립니다.',
  ctaPrimary: '기술 검토 문의',
};

const en: Copy = {
  heroBadge: 'Spatial AI · Spatial Intelligence',
  heroTitleA: 'Reading the space',
  heroTitleB: 'comes first',
  heroSub:
    'To work in physical space, you must first read the space and understand its flow. DeepingSource ties existing store CCTVs into a single coordinate system to read what people and objects do in the space and how.',

  mechanismSections: [
    {
      label: 'Spatial AI',
      title: 'Not who, but what and how',
      body: 'Vision AI ultimately looks at people. Spatial intelligence shifts that gaze — instead of identifying who someone is, it reads what people do and how they act.',
    },
    {
      label: 'Vision Models',
      title: 'State-of-the-art vision models',
      body: 'Person detection, pose estimation, re-identification, crowd density — SOTA vision models read all of this from a single video feed. Where people pause, how they move, how densely they gather. Seeing what happens on the floor directly through existing store cameras.',
    },
    {
      label: 'MTMC',
      title: 'MTMC — scattered cameras into one',
      body: 'A single camera sees only a slice of the space. MTMC (Multi-Target Multi-Camera) merges scattered cameras into a single spatial coordinate system. Even as cameras change, a person is tracked seamlessly across blind spots as one continuous subject.',
    },
  ],

  impactEyebrow: 'Output · Operational Impact',
  impactTitle: 'With a single spatial coordinate, the store becomes data',
  impactBody:
    'When observations from multiple cameras converge into a single coordinate system, the full path from entry to exit and zone-by-zone dwell, density, and movement patterns are entirely revealed. Where people pause and turn back, which zones remain empty, what happens in front of products — decisions once based on intuition now gain data-driven evidence. Rationale for layout changes, staffing allocation, and campaign design. The first step toward AI that doesn’t just view the store, but operates it.',

  whyEyebrow: 'Why This Is Possible',
  whyTitle: 'Because we’ve specialized in video anonymization since 2018',
  whyBody:
    'Because identity-erasing technology came first, we can analyze entire spaces without consent procedures or compliance risks. Meeting GDPR, CCPA, and Korean Privacy Act standards, even when cameras capture people, identity disappears at input while preserving only the signals required for analysis.',

  demo1Title: 'Faces erased, context preserved',
  demo1Body: 'Identity is permanently erased, retaining only minimum features needed for scene understanding.',
  demo1Caption: 'Faces masked as noise. Still readable — age, gaze, speech. Zero identity.',
  demo1Aria: 'A demo reading attributes like age, gender, gaze, and speech from a person whose face is anonymized to noise',

  demo2Title: 'Detected only to be erased',
  demo2Body: 'Facial keypoints are detected with precision for one single reason: to pinpoint exactly what needs to be erased.',
  demo2Caption: 'Facial keypoint detection. Detected areas are immediately anonymized — no identity remains.',
  demo2Aria: 'A face-detection demo with a keypoint mesh over two people’s faces at a table',

  referencesEyebrow: 'References',
  referencesBody:
    'DeepingSource, refining video anonymization technology since 2018, has presented and validated spatial intelligence at CES, in collaboration with KDDI, and within the NVIDIA ecosystem. Relevant presentation and collaboration records are available as reference materials.',

  ctaTitle: 'Let’s design how your space is read',
  ctaSub: 'Camera placement, coordinate mapping requirements, analysis goals — answered directly by our technical team. We’ll verify feasibility right away using your existing CCTVs.',
  ctaPrimary: 'Request technical review',
};

const jp: Copy = {
  heroBadge: 'Spatial AI · 空間知能',
  heroTitleA: '空間を読むことが、',
  heroTitleB: '先です',
  heroSub:
    '物理空間で働くには、まずその空間を読み、流れを理解する必要があります。ディーピングソースは店舗にすでにあるCCTVを一つの座標にまとめ、人やモノが空間で何をどうしているかを読み取ります。',

  mechanismSections: [
    {
      label: 'Spatial AI',
      title: '誰かではなく、何をどう',
      body: 'ビジョンAIは結局、人を見ます。空間知能はその視点を変えます——誰かを特定するのではなく、人々が何をどう動いているのかを読みます。',
    },
    {
      label: 'Vision Models',
      title: 'SOTA級のビジョンモデル',
      body: '人物検出、姿勢推定、再識別、群衆密度——SOTA級のビジョンモデルが、一つの映像からこれだけを読みます。どこで止まり、どう動き、どれだけ集まるか。空間の上で起きていることを、店舗にすでにあるカメラでそのまま見ます。',
    },
    {
      label: 'MTMC',
      title: 'MTMC — 散らばったカメラを一つに',
      body: '一台のカメラでは空間の一片しか見えません。MTMC（Multi-Target Multi-Camera）が、散らばったカメラを一つの空間座標へ整合します。カメラが変わっても、一人として追跡を引き継ぎます——死角を横断し、途切れることなく。',
    },
  ],

  impactEyebrow: 'Output · 運営インパクト',
  impactTitle: '一つの空間座標で、店舗がデータになります',
  impactBody:
    '複数カメラの観測が一つの座標系に集まると、入店から退店までの動線やエリアごとの滞在・密度・移動パターンが丸ごと可視化されます。どこで人が立ち止まって引き返すのか、どのエリアが常に空いているのか、商品の前で何が起きているのか——これまで勘で判断していたことに根拠が生まれます。レイアウトを再設計する根拠、スタッフを配置する根拠、次のキャンペーンを企画する根拠。見るにとどまらず、店舗を運営するAIへとつながる第一歩です。',

  whyEyebrow: 'これが可能な理由',
  whyTitle: '2018年から映像匿名化を一筋に追求してきた会社だからです',
  whyBody:
    '身元を消す技術が先行していたからこそ、同意手続きや規制リスクなしに空間全体を分析できます。GDPR・CCPA・日本の個人情報保護法等の基準を満たし、カメラが人を捉えても身元は入力時点で消去され、分析に必要なシグナルだけが残ります。',

  demo1Title: '顔は消しても、文脈は読みます',
  demo1Body: '身元は復元不可能な形で消去し、場面の理解に必要な最小限の特徴だけを残します。',
  demo1Caption: '顔はノイズ。それでも読めるもの——年代・視線・発話。身元はありません。',
  demo1Aria: '顔がノイズに匿名化された人物から、年齢・性別・視線・発話などの属性を読み取るデモ映像',

  demo2Title: '見つけるのは、消すためです',
  demo2Body: '顔の特徴点を精密に検出する理由は一つ——どこを消すべきかを特定するためです。',
  demo2Caption: '顔特徴点検出。見つけた場所は直ちに匿名化されます——身元は残りません。',
  demo2Aria: '食卓の二人の顔に特徴点メッシュが表示される顔検出のデモ映像',

  referencesEyebrow: 'References',
  referencesBody:
    '2018年から映像匿名化技術を磨いてきたディーピングソースは、その上で空間知能をCES展示、KDDIとの協業、NVIDIAエコシステムなどで紹介・検証してきました。関連する発表・協業実績は参考資料としてご案内いたします。',

  ctaTitle: '空間の読み方を、一緒に設計します',
  ctaSub: 'カメラ配置、座標化要件、分析目標——技術チームが直接お答えします。既存のCCTVのまま、導入可能性からご確認いただけます。',
  ctaPrimary: '技術検討のお問い合わせ',
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

          {/* 3 mechanism cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* 4. 우리는 이것 때문에 이걸 가능하게 한다 — 익명화 (공통 인트로 + 데모 2개) */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* 공통 인트로 */}
          <div className="max-w-3xl mb-14">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <p className="text-sm font-semibold text-primary tracking-wider uppercase">{t.whyEyebrow}</p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-keep">
              {t.whyTitle}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed break-keep">
              {t.whyBody}
            </p>
          </div>

          {/* 2 데모 (축소·통합 배치) */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Demo 1 */}
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

            {/* Demo 2 */}
            <div className="rounded-2xl border border-gray-200 bg-slate-50 p-6 flex flex-col justify-between shadow-sm">
              <div className="space-y-4 mb-6">
                <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-900">
                  <LoopVideo
                    mp4="/videos/face-landmark-demo.mp4"
                    webm="/videos/face-landmark-demo.webm"
                    poster="/images/technology/face-landmark-poster.webp"
                    ariaLabel={t.demo2Aria}
                    className="w-full h-auto block"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 break-keep">{t.demo2Title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed break-keep">{t.demo2Body}</p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed break-keep border-l-2 border-primary pl-3">
                {t.demo2Caption}
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
          <Link href={localeHref(locale, '/contact')} className="btn-primary btn-lg gap-2">
            {t.ctaPrimary}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
