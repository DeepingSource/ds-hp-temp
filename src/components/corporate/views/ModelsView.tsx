import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Boxes, ArrowRight } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { JsonLd, definedTerm } from '@/lib/structured-data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import WordRise from '@/components/ui/WordRise';
import { crumb } from '@/lib/breadcrumb-labels';
import { ModelCatalogMockup } from '@/components/mockups';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import LoopVideo from '@/components/ui/LoopVideo';

type Stage = 'Live' | 'Building' | 'Planned';

const stageStyle: Record<Stage, string> = {
  Live: 'bg-primary-lighter text-primary',
  Building: 'bg-amber-50 text-amber-700',
  Planned: 'bg-gray-100 text-gray-500',
};

type ModelCopy = { name: string; promise: string; stage: Stage };

type Copy = {
  heroBadge: string;
  heroTitle: string;
  heroSub: string;
  categoryNote: string;
  realEyebrow: string;
  realTitle: string;
  sliderBefore: string;
  sliderAfter: string;
  sliderCaption: string;
  sliderAlt: string;
  models: ModelCopy[];
  catalogFootnote: string;
  ctaTitle: string;
  ctaSub: string;
  ctaPrimary: string;
};

const ko: Copy = {
  heroBadge: 'Vision Models',
  heroTitle: '하나의 영상에서, 이만큼을 읽는다',
  heroSub:
    '사람 검출, 자세 추정, 재식별, 군중 밀도 — SOTA급 비전 모델들이 이미 달린 CCTV 한 대에서 공간을 읽습니다. 누구가 아니라, 무엇을 어떻게.',
  categoryNote:
    '익명화 위에서 인식 · 공간 · 흐름 · 변화 · 생성으로 — 각 모델은 단독으로, 또는 파이프라인 단계로 조합해 공간 지능을 만듭니다.',
  realEyebrow: '실제 출력',
  realTitle: 'face-anon — 합성이 아니라, 제품의 실제 출력',
  sliderBefore: '원본',
  sliderAfter: '익명화',
  sliderCaption: '같은 인물, 익명화 전과 후. 우측은 제품의 실제 출력입니다.',
  sliderAlt: '같은 인물의 익명화 전과 후 비교',
  models: [
    { name: 'face-anon', promise: '프레임 내 얼굴 영역 익명화', stage: 'Live' },
    { name: 'body-anon', promise: '체형 식별 신호 익명화', stage: 'Live' },
    { name: 'plate-anon', promise: '차량 번호판 영역 익명화', stage: 'Live' },
    { name: 'person-detect', promise: '프레임 내 사람 영역 검출', stage: 'Live' },
    { name: 'object-detect', promise: '일반 객체 영역 검출', stage: 'Live' },
    { name: 'pose-estimate', promise: '자세·키포인트 추정', stage: 'Live' },
    { name: 'reid-embed', promise: '객체 재식별 임베딩 추출', stage: 'Live' },
    { name: 'mtmc-track', promise: '다중 카메라 연속 추적', stage: 'Live' },
    { name: 'cam-calibrate', promise: '카메라 좌표 보정 추정', stage: 'Building' },
    { name: 'floor-project', promise: '화면 좌표의 평면 사상', stage: 'Building' },
    { name: 'flow-density', promise: '공간 단위 밀도·흐름 집계', stage: 'Building' },
    { name: 'dwell-estimate', promise: '구역별 체류 시간 추정', stage: 'Building' },
    { name: 'queue-detect', promise: '대기열 형성·길이 감지', stage: 'Building' },
    { name: 'change-detect', promise: '장면 변화·이상 영역 감지', stage: 'Building' },
    { name: 'shelf-state', promise: '진열·재고 상태 변화 감지', stage: 'Planned' },
    { name: 'event-classify', promise: '관심 이벤트 분류', stage: 'Planned' },
    { name: 'scene-caption', promise: '장면 설명 텍스트 생성', stage: 'Planned' },
    { name: 'synth-frame', promise: '학습용 합성 프레임 생성', stage: 'Planned' },
  ],
  catalogFootnote: '위 목록은 대표 모델을 설명하기 위한 예시이며, 공간에 따라 조합하는 모델과 단계는 달라집니다.',
  ctaTitle: '읽어야 할 것이, 목록에 없나요?',
  ctaSub: '공간과 운영 목표를 알려주시면, 그 공간을 읽어낼 모델 구성을 함께 설계합니다.',
  ctaPrimary: '모델 요청',
};

const en: Copy = {
  heroBadge: 'Vision Models',
  heroTitle: 'This much, from a single feed',
  heroSub:
    'Person detection, pose estimation, re-identification, crowd density — SOTA vision models read your space from a camera you already have. Not who, but what and how.',
  categoryNote:
    'On top of anonymization: recognition, space, flow, change, generation. Each model runs on its own or stacks as a pipeline stage to build spatial intelligence.',
  realEyebrow: 'Real output',
  realTitle: 'face-anon — real product output, not a synthetic render',
  sliderBefore: 'Original',
  sliderAfter: 'Anonymized',
  sliderCaption: "The same person, before and after anonymization. The right is the product's real output.",
  sliderAlt: 'Before-and-after comparison of the same person, anonymized',
  models: [
    { name: 'face-anon', promise: 'Anonymizes face regions within a frame', stage: 'Live' },
    { name: 'body-anon', promise: 'Anonymizes body-shape identifying signals', stage: 'Live' },
    { name: 'plate-anon', promise: 'Anonymizes license-plate regions', stage: 'Live' },
    { name: 'person-detect', promise: 'Detects person regions within a frame', stage: 'Live' },
    { name: 'object-detect', promise: 'Detects general object regions', stage: 'Live' },
    { name: 'pose-estimate', promise: 'Estimates posture and keypoints', stage: 'Live' },
    { name: 'reid-embed', promise: 'Extracts object re-identification embeddings', stage: 'Live' },
    { name: 'mtmc-track', promise: 'Continuous multi-camera tracking', stage: 'Live' },
    { name: 'cam-calibrate', promise: 'Estimates camera coordinate calibration', stage: 'Building' },
    { name: 'floor-project', promise: 'Projects image coordinates onto a plane', stage: 'Building' },
    { name: 'flow-density', promise: 'Aggregates space-level density and flow', stage: 'Building' },
    { name: 'dwell-estimate', promise: 'Estimates dwell time per zone', stage: 'Building' },
    { name: 'queue-detect', promise: 'Detects queue formation and length', stage: 'Building' },
    { name: 'change-detect', promise: 'Detects scene change and anomaly regions', stage: 'Building' },
    { name: 'shelf-state', promise: 'Detects display and stock state changes', stage: 'Planned' },
    { name: 'event-classify', promise: 'Classifies events of interest', stage: 'Planned' },
    { name: 'scene-caption', promise: 'Generates scene description text', stage: 'Planned' },
    { name: 'synth-frame', promise: 'Generates synthetic frames for training', stage: 'Planned' },
  ],
  catalogFootnote: 'The list above illustrates representative models; the right combination of models and stages depends on your space.',
  ctaTitle: 'Don’t see what you need to read?',
  ctaSub: 'Tell us your space and what you want to operate, and we’ll design the model stack that reads it.',
  ctaPrimary: 'Request a model',
};

const jp: Copy = {
  heroBadge: 'Vision Models',
  heroTitle: '一つの映像から、これだけを読む',
  heroSub:
    '人物検出、姿勢推定、再識別、群衆密度 — SOTA級のビジョンモデルが、すでにあるCCTV一台から空間を読みます。誰かではなく、何をどう。',
  categoryNote:
    '匿名化の上で、認識・空間・フロー・変化・生成へ。各モデルは単独で、またはパイプライン段階として組み合わせ、空間知能を形づくります。',
  realEyebrow: '実際の出力',
  realTitle: 'face-anon — 合成ではなく、製品の実際の出力',
  sliderBefore: '原本',
  sliderAfter: '匿名化',
  sliderCaption: '同じ人物の匿名化前と後。右は製品の実際の出力です。',
  sliderAlt: '同じ人物の匿名化前と後の比較',
  models: [
    { name: 'face-anon', promise: 'フレーム内の顔領域を匿名化', stage: 'Live' },
    { name: 'body-anon', promise: '体型の識別信号を匿名化', stage: 'Live' },
    { name: 'plate-anon', promise: '車両ナンバープレート領域を匿名化', stage: 'Live' },
    { name: 'person-detect', promise: 'フレーム内の人物領域を検出', stage: 'Live' },
    { name: 'object-detect', promise: '一般オブジェクト領域を検出', stage: 'Live' },
    { name: 'pose-estimate', promise: '姿勢・キーポイントを推定', stage: 'Live' },
    { name: 'reid-embed', promise: 'オブジェクト再識別の埋め込みを抽出', stage: 'Live' },
    { name: 'mtmc-track', promise: '複数カメラでの連続追跡', stage: 'Live' },
    { name: 'cam-calibrate', promise: 'カメラ座標の補正を推定', stage: 'Building' },
    { name: 'floor-project', promise: '画面座標を平面へ写像', stage: 'Building' },
    { name: 'flow-density', promise: '空間単位の密度・フローを集計', stage: 'Building' },
    { name: 'dwell-estimate', promise: '区域ごとの滞在時間を推定', stage: 'Building' },
    { name: 'queue-detect', promise: '待機列の形成・長さを検知', stage: 'Building' },
    { name: 'change-detect', promise: 'シーンの変化・異常領域を検知', stage: 'Building' },
    { name: 'shelf-state', promise: '陳列・在庫の状態変化を検知', stage: 'Planned' },
    { name: 'event-classify', promise: '関心イベントを分類', stage: 'Planned' },
    { name: 'scene-caption', promise: 'シーン説明テキストを生成', stage: 'Planned' },
    { name: 'synth-frame', promise: '学習用の合成フレームを生成', stage: 'Planned' },
  ],
  catalogFootnote: '上記の一覧は代表的なモデルを説明するための例であり、組み合わせるモデルと段階は空間によって異なります。',
  ctaTitle: '読みたいものが、一覧にありませんか？',
  ctaSub: '空間と運営の目標を教えていただければ、その空間を読み解くモデル構成を一緒に設計します。',
  ctaPrimary: 'モデルのリクエスト',
};

const C: Record<Locale, Copy> = { ko, en, jp };

/**
 * Per-model demo videos (#9.1). A model listed here renders a poster-first autoplay loop
 * (LoopVideo) in place of the static image; others keep the image. To enable a demo:
 *   1. drop the clip at `public/videos/models/<name>.mp4` (poster reuses the .webp still)
 *   2. add `<name>` to this set
 * Empty until video assets land — every card falls back to its static image today.
 */
const MODEL_DEMOS = new Set<string>([]);

/**
 * Model taxonomy — maps each model to a domain category so the catalog reads as a map
 * (anonymization → recognition → space → flow/change → understanding) rather than a flat
 * wall, and each category line frames when/what problem the group solves. MODEL_CATEGORY
 * is index-aligned to model names (structure); MODEL_GROUPS is localized.
 */
const MODEL_CATEGORY: Record<string, number> = {
  'face-anon': 0, 'body-anon': 0, 'plate-anon': 0,
  'person-detect': 1, 'object-detect': 1, 'pose-estimate': 1, 'reid-embed': 1, 'mtmc-track': 1,
  'cam-calibrate': 2, 'floor-project': 2,
  'flow-density': 3, 'dwell-estimate': 3, 'queue-detect': 3, 'change-detect': 3, 'shelf-state': 3,
  'event-classify': 4, 'scene-caption': 4, 'synth-frame': 4,
};

const MODEL_GROUPS: Record<Locale, { label: string; desc: string }[]> = {
  ko: [
    { label: '익명화', desc: '원본을 지우고 신원 신호를 제거 — 규제 준수와 프라이버시가 필요한 모든 곳에서.' },
    { label: '인식', desc: '무엇이 어디 있고 어떤 자세·신원인지 — 검출과 추적의 토대.' },
    { label: '공간', desc: '화면 좌표를 실제 평면으로 — 위치를 매장 지도 위에 올릴 때.' },
    { label: '흐름·변화', desc: '밀도·체류·대기·이상 변화 — 혼잡, 병목, 이상 상황을 읽을 때.' },
    { label: '이해·생성', desc: '이벤트 분류·장면 설명·합성 — 상황을 요약하고 학습 데이터를 만들 때.' },
  ],
  en: [
    { label: 'Anonymization', desc: 'Erase the original and strip identity signals — wherever compliance and privacy are required.' },
    { label: 'Recognition', desc: 'What is where, in what pose, which identity — the foundation for detection and tracking.' },
    { label: 'Space', desc: 'Image coordinates onto the real floor plane — to place positions on your store map.' },
    { label: 'Flow & change', desc: 'Density, dwell, queues, anomalies — to read congestion, bottlenecks, and unusual states.' },
    { label: 'Understanding & generation', desc: 'Classify events, describe scenes, synthesize — to summarize situations and build training data.' },
  ],
  jp: [
    { label: '匿名化', desc: '原本を消し、識別信号を除去 — 規制順守とプライバシーが必要なすべての場所で。' },
    { label: '認識', desc: '何がどこにあり、どの姿勢・身元か — 検出と追跡の土台。' },
    { label: '空間', desc: '画面座標を実際の平面へ — 位置を店舗マップ上に載せるとき。' },
    { label: 'フロー・変化', desc: '密度・滞在・待機・異常の変化 — 混雑、ボトルネック、異常を読むとき。' },
    { label: '理解・生成', desc: 'イベント分類・シーン説明・合成 — 状況を要約し、学習データをつくるとき。' },
  ],
};

export default function ModelsView({ locale }: { locale: Locale }) {
  const t = C[locale];

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={definedTerm({ name: t.heroBadge, description: t.heroSub, path: '/technology/models', locale })} />

      {/* Hero */}
      <section className="relative pt-28 pb-20 lg:pt-36 bg-slate-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: crumb('technology', locale), path: '/technology' }, { name: crumb('models', locale), path: '/technology/models' }]} locale={locale} tone="light" className="mb-6" />
          <HeroBadge tone="light">
            <Boxes className="w-3.5 h-3.5" />
            {t.heroBadge}
          </HeroBadge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-[1.15] mb-6 break-keep">
            <WordRise text={t.heroTitle} />
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl break-keep mb-4">
            {t.heroSub}
          </p>
          <p className="text-sm text-gray-500 font-mono leading-relaxed max-w-2xl break-keep">
            {t.categoryNote}
          </p>
        </div>
      </section>

      {/* Interactive catalog showcase */}
      <AnimatedSection className="py-20 lg:py-28 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ModelCatalogMockup locale={locale} />
        </div>
      </AnimatedSection>

      {/* Real output — face-anon before↔after (honesty: not a synthetic render) */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="text-sm font-medium text-primary mb-3 tracking-wider uppercase">{t.realEyebrow}</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-keep">{t.realTitle}</h2>
              <p className="text-gray-600 leading-relaxed break-keep">{t.sliderCaption}</p>
            </div>
            <BeforeAfterSlider
              beforeSrc="/images/technology/tech-anon-slider-before.webp"
              afterSrc="/images/technology/tech-anon-slider-after.webp"
              beforeLabel={t.sliderBefore}
              afterLabel={t.sliderAfter}
              alt={t.sliderAlt}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Catalog grid — grouped by domain category (model ↔ problem mapping) */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14">
          {MODEL_GROUPS[locale].map((group, gi) => {
            // Fallback: a model missing from MODEL_CATEGORY lands in the last group rather
            // than silently vanishing from the catalog.
            const lastGi = MODEL_GROUPS[locale].length - 1;
            const groupModels = t.models.filter((m) => (MODEL_CATEGORY[m.name] ?? lastGi) === gi);
            if (groupModels.length === 0) return null;
            return (
              <div key={group.label}>
                <div className="mb-5 max-w-2xl">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-1 break-keep">
                    <span className="font-mono text-sm text-primary">0{gi + 1}</span>
                    {group.label}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed break-keep">{group.desc}</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupModels.map((m) => (
                    <div key={m.name} className="card p-6 h-full flex flex-col">
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-gray-100 mb-4 bg-gray-900">
                        {MODEL_DEMOS.has(m.name) ? (
                          <LoopVideo
                            mp4={`/videos/models/${m.name}.mp4`}
                            poster={`/images/models/${m.name}.webp`}
                            ariaLabel={`${m.name} — ${m.promise}`}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : (
                          <Image
                            src={`/images/models/${m.name}.webp`}
                            alt={`${m.name} — ${m.promise}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <code className="text-sm font-mono font-medium text-gray-900">{m.name}</code>
                        <span className={`text-2xs font-medium px-2 py-0.5 rounded-full ${stageStyle[m.stage]}`}>
                          {m.stage}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed break-keep">{m.promise}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <p className="text-xs text-gray-500 break-keep">
            {t.catalogFootnote}
          </p>
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
