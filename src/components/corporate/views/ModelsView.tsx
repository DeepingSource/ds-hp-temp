import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Boxes, ArrowRight } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { JsonLd, definedTerm } from '@/lib/structured-data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';
import { ModelCatalogMockup } from '@/components/mockups';

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
    '사람 검출, 자세 추정, 재식별, 군중 밀도 — SOTA급 비전 모델들이 이미 달린 CCTV 한 대에서 공간을 읽습니다. 누가가 아니라, 무엇을 어떻게.',
  categoryNote:
    '익명화 위에서 인식 · 공간 · 흐름 · 변화 · 생성으로 — 각 모델은 단독으로, 또는 파이프라인 단계로 조합해 공간 지능을 만듭니다.',
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
  models: [
    { name: 'face-anon', promise: 'フレーム内の顔領域を非識別化', stage: 'Live' },
    { name: 'body-anon', promise: '体型の識別信号を非識別化', stage: 'Live' },
    { name: 'plate-anon', promise: '車両ナンバープレート領域を非識別化', stage: 'Live' },
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
            {t.heroTitle}
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

      {/* Catalog grid */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.models.map((m) => (
              <div key={m.name} className="card p-6 h-full flex flex-col">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <code className="text-sm font-mono font-semibold text-gray-900">{m.name}</code>
                  <span className={`text-2xs font-semibold px-2 py-0.5 rounded-full ${stageStyle[m.stage]}`}>
                    {m.stage}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed break-keep">{m.promise}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-6 break-keep">
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
