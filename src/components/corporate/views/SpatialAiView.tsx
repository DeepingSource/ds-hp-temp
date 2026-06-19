import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Layers, Map, Grid3x3, Route, ArrowRight } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { JsonLd, definedTerm } from '@/lib/structured-data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';
import { SpatialTrajectoryMockup } from '@/components/mockups';

type Section = { label: string; title: string; body: string };

type Copy = {
  heroBadge: string;
  heroTitleA: string;
  heroTitleB: string;
  heroSub: string;

  sections: Section[];

  referencesEyebrow: string;
  referencesBody: string;

  ctaTitle: string;
  ctaSub: string;
  ctaPrimary: string;
};

const sectionIcons = [Layers, Map, Grid3x3, Route];

const ko: Copy = {
  heroBadge: 'Spatial AI · 공간 지능',
  heroTitleA: '공간을 읽는 것이,',
  heroTitleB: '먼저입니다',
  heroSub:
    '물리 공간에서 일하려면, 먼저 그 공간을 읽고 흐름을 이해해야 합니다. 익명화 위에서 공간 지능이 일합니다 — 누구인지가 아니라, 무엇을 어떻게 하는지를.',

  sections: [
    { label: 'Spatial AI', title: '누구인지가 아니라, 무엇을 어떻게', body: '비전 AI는 결국 사람을 봅니다. 공간 지능은 그 시선을 바꿉니다 — 누구인지를 가려내는 대신, 사람들이 무엇을 어떻게 하는지를 읽습니다. 신원은 익명화 단계에서 이미 지워졌고, 남은 건 공간의 흐름뿐입니다.' },
    { label: 'Vision Models', title: 'SOTA급 비전 모델', body: '사람 검출, 자세 추정, 재식별, 군중 밀도 — SOTA급 비전 모델들이 하나의 영상에서 이만큼을 읽습니다. 어디서 멈추고, 어떻게 움직이고, 얼마나 모이는지. 공간 위에서 일어나는 일을, 매장에 이미 달린 카메라로 그대로 봅니다.' },
    { label: 'MTMC', title: 'MTMC — 흩어진 카메라를 하나로', body: '한 대의 카메라만으로는 공간의 한 조각밖에 보지 못합니다. MTMC(Multi-Target Multi-Camera)가 흩어진 카메라들을 하나의 공간 좌표로 정합합니다. 카메라가 바뀌어도, 한 사람으로 이어 추적합니다 — 사각지대를 가로질러, 끊김 없이.' },
    { label: 'Output', title: '하나의 공간 좌표로', body: '여러 카메라의 관측이 하나의 좌표계로 모이면, 입장부터 퇴장까지의 연속 동선과 공간 단위의 체류·밀도·이동 패턴이 드러납니다. 보는 것을 넘어 매장을 운영하는 AI — 그 첫 단계가, 공간을 정확히 읽는 일입니다.' },
  ],

  referencesEyebrow: 'References',
  referencesBody:
    '딥핑소스의 공간 지능은 CES 전시, KDDI와의 협업, NVIDIA 생태계 등에서 소개·참조된 바 있습니다. 관련 발표·협업 내역은 참고 자료로 안내해 드립니다.',

  ctaTitle: '공간을 읽는 방식을, 함께 설계합니다',
  ctaSub: '카메라 배치, 좌표화 요건, 분석 목표 — 기술 팀이 직접 답변합니다.',
  ctaPrimary: '기술 검토 문의',
};

const en: Copy = {
  heroBadge: 'Spatial AI · Spatial Intelligence',
  heroTitleA: 'Reading the space',
  heroTitleB: 'comes first',
  heroSub:
    'To work in the physical world, you first have to read the space and understand how it flows. Spatial AI works on top of anonymization — not who is there, but what people do and how.',

  sections: [
    { label: 'Spatial AI', title: 'Not who, but what and how', body: 'Vision AI ultimately looks at people. Spatial intelligence changes what it looks for: instead of singling out who someone is, it reads what people do and how they move. Identity is already erased at the anonymization stage — all that remains is the flow of the space.' },
    { label: 'Vision Models', title: 'State-of-the-art vision models', body: 'Person detection, pose estimation, re-identification, crowd density — a stack of SOTA vision models reads all of this from a single feed. Where people pause, how they move, how densely they gather. Everything happening on the floor, read on the cameras already mounted in your store.' },
    { label: 'MTMC', title: 'MTMC — scattered cameras, one space', body: 'A single camera only ever sees a sliver of the space. MTMC (Multi-Target Multi-Camera) registers scattered cameras into one spatial coordinate system. When the camera changes, the person stays one person — tracked across blind spots, without a break.' },
    { label: 'Output', title: 'Into one spatial coordinate', body: 'Once observations from many cameras converge into one coordinate system, you get the full path from entry to exit, plus space-level dwell, density, and movement patterns. The first step toward AI that goes beyond seeing to operate the space — reading it precisely.' },
  ],

  referencesEyebrow: 'References',
  referencesBody:
    'DeepingSource’s spatial intelligence has been presented and referenced at venues such as CES exhibitions, the collaboration with KDDI, and the NVIDIA ecosystem. Related presentations and collaboration records are available as reference materials.',

  ctaTitle: 'Let’s design how your space gets read',
  ctaSub: 'Camera placement, coordinatization requirements, analysis goals — answered directly by our technical team.',
  ctaPrimary: 'Request a technical review',
};

const jp: Copy = {
  heroBadge: 'Spatial AI · 空間知能',
  heroTitleA: '空間を読むことが、',
  heroTitleB: '先です',
  heroSub:
    '物理空間で働くには、まずその空間を読み、流れを理解する必要があります。匿名化の上で空間知能が働きます——誰かではなく、何をどうしているのかを。',

  sections: [
    { label: 'Spatial AI', title: '誰かではなく、何をどう', body: 'ビジョンAIは結局、人を見ます。空間知能はその視点を変えます——誰かを特定するのではなく、人々が何をどう動いているのかを読みます。身元は匿名化の段階ですでに消されており、残るのは空間の流れだけです。' },
    { label: 'Vision Models', title: 'SOTA級のビジョンモデル', body: '人物検出、姿勢推定、再識別、群衆密度——SOTA級のビジョンモデルが、一つの映像からこれだけを読みます。どこで止まり、どう動き、どれだけ集まるか。空間の上で起きていることを、店舗にすでにあるカメラでそのまま見ます。' },
    { label: 'MTMC', title: 'MTMC — 散らばったカメラを一つに', body: '一台のカメラでは空間の一片しか見えません。MTMC（Multi-Target Multi-Camera）が、散らばったカメラを一つの空間座標へ整合します。カメラが変わっても、一人として追跡を引き継ぎます——死角を横断し、途切れることなく。' },
    { label: 'Output', title: '一つの空間座標へ', body: '複数カメラの観測が一つの座標系に集まると、入店から退店までの連続した動線、そして空間単位の滞在・密度・移動パターンが見えてきます。見ることを超えて空間を運営するAI——その第一歩が、空間を正確に読むことです。' },
  ],

  referencesEyebrow: 'References',
  referencesBody:
    'ディーピングソースの空間知能は、CES展示、KDDIとの協業、NVIDIAエコシステムなどで紹介・参照されてきました。関連する発表・協業の実績は参考資料としてご案内します。',

  ctaTitle: '空間の読み方を、一緒に設計します',
  ctaSub: 'カメラ配置、座標化の要件、分析目標——技術チームが直接お答えします。',
  ctaPrimary: '技術検討のお問い合わせ',
};

const C: Record<Locale, Copy> = { ko, en, jp };

export default function SpatialAiView({ locale }: { locale: Locale }) {
  const t = C[locale];
  const sections = t.sections.map((s, i) => ({ ...s, icon: sectionIcons[i] }));

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={definedTerm({ name: t.heroBadge, description: t.heroSub, path: '/technology/spatial-ai', locale })} />

      {/* Hero */}
      <section className="relative pt-28 pb-20 lg:pt-36 bg-slate-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: crumb('technology', locale), path: '/technology' }, { name: crumb('spatial-ai', locale), path: '/technology/spatial-ai' }]} locale={locale} tone="light" className="mb-6" />
          <HeroBadge tone="light">
            <Layers className="w-3.5 h-3.5" />
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

      {/* MTMC trajectory mockup — centerpiece visual */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-900">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SpatialTrajectoryMockup locale={locale} />
        </div>
      </AnimatedSection>

      {/* 4 mechanism sections */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="space-y-6">
            {sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="card p-8 lg:p-10">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex items-center gap-4 lg:w-64 shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-primary-lighter flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-mono font-semibold text-gray-500 mb-1">0{i + 1} · {s.label}</p>
                        <h2 className="text-lg font-bold text-gray-900">{s.title}</h2>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed break-keep flex-1">{s.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Citations / references */}
      <AnimatedSection className="py-16 bg-slate-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">{t.referencesEyebrow}</p>
          <p className="text-gray-600 leading-relaxed break-keep">
            {t.referencesBody}
          </p>
        </div>
      </AnimatedSection>

      {/* CTA */}
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
