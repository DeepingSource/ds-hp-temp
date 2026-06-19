import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Accordion from '@/components/ui/Accordion';
import {
  Fingerprint, ArrowRight, ShieldCheck, Cpu, Eye, Database,
} from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { JsonLd, definedTerm } from '@/lib/structured-data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import HeroBadge from '@/components/ui/HeroBadge';
import { crumb } from '@/lib/breadcrumb-labels';
import { EdgePerfMonitorMockup } from '@/components/mockups';

type Step = { title: string; desc: string };
type SpecRow = { feature: string; detail: string; note: string };
type FaqItem = { question: string; answer: string };

type Copy = {
  heroBadge: string;
  heroTitleA: string;
  heroTitleB: string;
  heroSub: string;

  mechanismEyebrow: string;
  mechanismTitle: string;
  mechanismSub: string;
  mechanismSteps: Step[];

  specEyebrow: string;
  specTitle: string;
  specColItem: string;
  specColDetail: string;
  specColNote: string;
  specRows: SpecRow[];
  specFootnote: string;

  faqEyebrow: string;
  faqTitle: string;
  faqItems: FaqItem[];

  ctaBadge: string;
  ctaTitle: string;
  ctaSub: string;
  ctaPrimary: string;
};

const stepIcons = [Eye, Fingerprint, Cpu, Database];

const ko: Copy = {
  heroBadge: 'Anonymizer Module',
  heroTitleA: '신원은 지우고,',
  heroTitleB: '분석은 그대로 — 입력 시점의 익명화',
  heroSub:
    '비전 AI는 결국 사람을 봅니다. 그 순간, 그건 개인정보가 됩니다. Anonymizer는 영상이 들어오는 첫 단계에서 얼굴과 신원을 지우고, 동선·자세·체류 같은 분석 신호는 그대로 남깁니다. 여러 사람을 동시에, 동의 없이도 보호하고 — 원본은 어디에도 남기지 않습니다.',

  mechanismEyebrow: 'Mechanism',
  mechanismTitle: '신원을 지우는 네 단계',
  mechanismSub:
    '누가인지가 아니라, 무엇을 어떻게. Anonymizer는 프레임 전체를 가리지 않습니다. 신원이 드러나는 영역만 입력 시점에 지우고, 분석에 필요한 신호는 그대로 남깁니다.',
  mechanismSteps: [
    { title: '신원 영역 찾기', desc: '프레임마다 얼굴·체형·차량 번호판처럼 사람을 특정할 수 있는 영역을 찾습니다. 누구인지 알아내기 위해서가 아니라, 지워야 할 곳을 짚기 위해서입니다.' },
    { title: '입력 시점 익명화', desc: '신원 영역만 비가역적으로 지우고, 동선·자세·체류 같은 분석 신호는 그대로 남깁니다. 영역 단위로 처리하므로 무엇이 어떻게 일어났는지는 고스란히 읽힙니다.' },
    { title: '온디바이스 처리', desc: '연산은 엣지 장치나 로컬에서 끝낼 수 있습니다. 원본 프레임을 밖으로 내보내지 않고, 이미 익명화된 결과만 다음 단계로 넘깁니다.' },
    { title: '분석 신호 전달', desc: '익명화된 스트림과 분석 신호를 공간 지능·에이전트 단계로 넘깁니다. 분석은 끝까지 이어지지만, 원본 영상은 어디에도 저장되지 않습니다.' },
  ],

  specEyebrow: 'Specification',
  specTitle: '사양 개요',
  specColItem: '항목',
  specColDetail: '내용',
  specColNote: '비고',
  specRows: [
    { feature: '입력', detail: 'RTSP / 파일 / 프레임 스트림', note: '이미 달린 CCTV 위에서' },
    { feature: '처리 단위', detail: '프레임 내 신원 영역', note: '무엇·어떻게는 그대로' },
    { feature: '보존 신호', detail: '동선·자세·체류·밀도', note: '분석은 끝까지' },
    { feature: '지우는 대상', detail: '얼굴·체형·번호판 등 신원 정보', note: '누가는 남기지 않음' },
    { feature: '배치 형태', detail: '엣지 / 온프레미스 / 서버', note: '환경에 맞게 선택' },
    { feature: '원본', detail: '저장하지 않음', note: '익명화된 결과만 전달' },
    { feature: '연동', detail: '공간 지능·에이전트 단계', note: '운영 루프의 첫 단' },
  ],
  specFootnote: '위 값은 구성 가능 범위를 설명하기 위한 개요이며, 실제 사양은 배치 환경에 따라 달라집니다.',

  faqEyebrow: 'FAQ',
  faqTitle: '자주 묻는 질문',
  faqItems: [
    { question: '원본 영상을 저장하나요?', answer: '저장하지 않습니다. 입력 시점에 신원을 지우고, 그 뒤로는 익명화된 결과 스트림과 분석 신호만 다음 단계로 넘깁니다. 원본 프레임이 저장소에 남지 않는 운영이 기본입니다.' },
    { question: '익명화된 영상에서 원본이나 신원을 복원할 수 있나요?', answer: '재식별은 불가능하도록 설계됩니다. 신원 영역은 분석 신호를 보존하면서도 되돌릴 수 없게 지웁니다. 익명화된 데이터로부터 누가였는지를 되찾을 수 없는 것이 원칙이며, 처리 강도는 적용 환경에 맞게 조정합니다.' },
    { question: '동의를 받지 않은 사람도 보호되나요?', answer: '됩니다. 화면에 잡힌 모든 사람을 동시에, 동의 여부와 무관하게 익명화합니다. 매장 앞을 지나간 수백 명까지 — 누구도 신원이 남지 않은 채 흐름만 분석됩니다.' },
    { question: '기존 CCTV·카메라와 호환되나요?', answer: 'RTSP 등 표준 영상 입력을 받으므로, 카메라를 바꾸지 않고 이미 달린 CCTV 위에서 바로 동작합니다. 구체적 호환 범위는 환경 점검 후 안내합니다.' },
    { question: '개인정보보호법·GDPR·CCPA 대응에 도움이 되나요?', answer: '신원을 입력 시점에 지우는 프라이버시 바이 디자인 접근은 GDPR·CCPA·국내 개인정보보호법이 요구하는 데이터 최소화 원칙과 정렬되며, SOC2 인증 기준도 충족합니다. 다만 최종 준수 여부는 전체 데이터 처리 체계에 따라 달라지므로 도입 시 함께 검토하길 권장합니다.' },
    { question: '처리 지연이 발생하나요?', answer: '실시간 스트림 처리를 목표로 설계되었으며, 지연 수준은 입력 해상도·프레임레이트·배치 하드웨어에 따라 달라집니다. 운영 환경 기준의 예상 지연은 사양 검토 단계에서 함께 산정합니다.' },
  ],

  ctaBadge: '익명화 사양 검토',
  ctaTitle: '당신의 환경에 맞는 익명화 구성을 함께 설계합니다',
  ctaSub: '기존 CCTV 호환, 배치 형태, 규제 요건 — 기술 팀이 직접 답변합니다.',
  ctaPrimary: '기술 검토 문의',
};

const en: Copy = {
  heroBadge: 'Anonymizer Module',
  heroTitleA: 'Erase the identity.',
  heroTitleB: 'Keep the analysis. Anonymized on input.',
  heroSub:
    'Vision AI ultimately looks at people — and the moment it does, that becomes personal data. Anonymizer erases faces and identity the instant footage comes in, while keeping the signals analysis needs: movement, posture, dwell. It protects many people at once, without consent — and keeps no original behind.',

  mechanismEyebrow: 'Mechanism',
  mechanismTitle: 'Four steps that erase identity',
  mechanismSub:
    'Not who, but what and how. Anonymizer never blurs the whole frame. It erases only the regions that reveal identity, on input, and leaves every signal analysis needs intact.',
  mechanismSteps: [
    { title: 'Find the identity', desc: 'In every frame, it locates the regions that could single out a person — faces, body shapes, license plates. Not to learn who they are, but to mark what must be erased.' },
    { title: 'Anonymize on input', desc: 'Only the identity regions are erased, irreversibly, while the signals analysis lives on — movement, posture, dwell — are preserved. Region by region, so what happened and how stays fully readable.' },
    { title: 'On-device processing', desc: 'Computation can finish on edge devices or locally. Raw frames never leave the premises; only the already-anonymized result moves to the next step.' },
    { title: 'Forward the signal', desc: 'The anonymized stream and its analytical signals pass to the spatial-intelligence and agent stages. Analysis runs all the way through — the original footage is stored nowhere.' },
  ],

  specEyebrow: 'Specification',
  specTitle: 'Specification overview',
  specColItem: 'Item',
  specColDetail: 'Detail',
  specColNote: 'Note',
  specRows: [
    { feature: 'Input', detail: 'RTSP / file / frame stream', note: 'On the CCTV you already have' },
    { feature: 'Processing unit', detail: 'Identity regions within a frame', note: 'What and how stay intact' },
    { feature: 'Preserved signal', detail: 'Movement, posture, dwell, density', note: 'Analysis runs all the way' },
    { feature: 'Erased', detail: 'Identity such as faces, body shapes, plates', note: 'Who is never kept' },
    { feature: 'Deployment', detail: 'Edge / on-premises / server', note: 'Chosen to fit the environment' },
    { feature: 'Original footage', detail: 'Never stored', note: 'Anonymized result only' },
    { feature: 'Integration', detail: 'Spatial-intelligence and agent stages', note: 'First step of the operating loop' },
  ],
  specFootnote: 'The values above describe the configurable range; actual specifications vary with the deployment environment.',

  faqEyebrow: 'FAQ',
  faqTitle: 'Frequently asked questions',
  faqItems: [
    { question: 'Do you store the raw footage?', answer: 'No. Identity is erased the moment footage comes in, and from there only the anonymized result stream and analytical signals move downstream. Raw frames never remain in storage — that is the default.' },
    { question: 'Can the original or an identity be recovered from anonymized video?', answer: 'Re-identification is impossible by design. Identity regions are erased irreversibly while analytical signal is preserved, so who someone was cannot be recovered from anonymized data. Processing strength is tuned to your environment.' },
    { question: 'Are people who never gave consent protected too?', answer: 'Yes. Everyone in frame is anonymized at once, regardless of consent — including the hundreds who pass by a storefront. No one is left identifiable; only the flow is analyzed.' },
    { question: 'Is it compatible with existing CCTV and cameras?', answer: 'It accepts standard video input such as RTSP, so it runs on the CCTV you already have — no camera replacement required. The specific compatibility scope is advised after an environment review.' },
    { question: 'Does it help with GDPR, CCPA, and PIPA compliance?', answer: 'Erasing identity on input — privacy by design — aligns with the data-minimization principles GDPR, CCPA, and Korea’s PIPA require, and meets SOC2 certification standards. Final compliance depends on your overall data-processing scheme, so we recommend reviewing it together at adoption.' },
    { question: 'Does it introduce processing latency?', answer: 'It is designed for real-time stream processing; the level of latency varies with input resolution, frame rate, and deployment hardware. Expected latency for your operating environment is estimated together during the specification review.' },
  ],

  ctaBadge: 'Anonymization review',
  ctaTitle: 'Let’s design an anonymization setup for your space',
  ctaSub: 'Compatibility with the CCTV you already have, deployment form, regulatory requirements — answered directly by our technical team.',
  ctaPrimary: 'Request a technical review',
};

const jp: Copy = {
  heroBadge: 'Anonymizer Module',
  heroTitleA: '身元は消し、',
  heroTitleB: '分析はそのまま — 入力時点で匿名化',
  heroSub:
    'ビジョンAIは結局、人を見ます。その瞬間、それは個人情報になります。Anonymizerは映像が入ってくる最初の段階で顔と身元を消し、動線・姿勢・滞在といった分析信号はそのまま残します。複数の人を同時に、同意なしでも保護し — 原本はどこにも残しません。',

  mechanismEyebrow: 'Mechanism',
  mechanismTitle: '身元を消す4ステップ',
  mechanismSub:
    '誰かではなく、何をどう。Anonymizerはフレーム全体を覆いません。身元が現れる領域だけを入力時点で消し、分析に必要な信号はそのまま残します。',
  mechanismSteps: [
    { title: '身元領域を見つける', desc: 'フレームごとに、顔・体型・車両ナンバープレートなど人を特定し得る領域を見つけます。誰かを知るためではなく、消すべき場所を捉えるためです。' },
    { title: '入力時点で匿名化', desc: '身元領域だけを不可逆的に消し、動線・姿勢・滞在といった分析信号はそのまま残します。領域単位で処理するため、何がどう起きたかはそのまま読み取れます。' },
    { title: 'オンデバイス処理', desc: '演算はエッジ機器やローカルで完結できます。原本フレームを外部へ送らず、すでに匿名化された結果だけを次のステップへ渡します。' },
    { title: '分析信号の受け渡し', desc: '匿名化されたストリームと分析信号を、空間知能・エージェントのステップへ受け渡します。分析は最後まで続きますが、原本映像はどこにも保存されません。' },
  ],

  specEyebrow: 'Specification',
  specTitle: '仕様の概要',
  specColItem: '項目',
  specColDetail: '内容',
  specColNote: '備考',
  specRows: [
    { feature: '入力', detail: 'RTSP / ファイル / フレームストリーム', note: 'すでにあるCCTVの上で' },
    { feature: '処理単位', detail: 'フレーム内の身元領域', note: '何を・どうはそのまま' },
    { feature: '保持する信号', detail: '動線・姿勢・滞在・密度', note: '分析は最後まで' },
    { feature: '消す対象', detail: '顔・体型・ナンバープレートなどの身元情報', note: '誰かは残さない' },
    { feature: '配置形態', detail: 'エッジ / オンプレミス / サーバー', note: '環境に合わせて選択' },
    { feature: '原本映像', detail: '保存しない', note: '匿名化された結果のみ受け渡し' },
    { feature: '連携', detail: '空間知能・エージェントのステップ', note: '運営ループの最初の段' },
  ],
  specFootnote: '上記の値は構成可能な範囲を説明するための概要であり、実際の仕様は配置環境によって異なります。',

  faqEyebrow: 'FAQ',
  faqTitle: 'よくあるご質問',
  faqItems: [
    { question: '原本映像を保存しますか？', answer: '保存しません。入力時点で身元を消し、その後は匿名化された結果ストリームと分析信号だけを次へ渡します。原本フレームがストレージに残らない運用が基本です。' },
    { question: '匿名化された映像から原本や身元を復元できますか？', answer: '再識別は不可能になるよう設計されています。身元領域は分析信号を保持しつつ不可逆的に消すため、匿名化されたデータから誰だったかを復元できません。処理強度は適用環境に合わせて調整します。' },
    { question: '同意を得ていない人も保護されますか？', answer: '保護されます。画面に写るすべての人を同時に、同意の有無にかかわらず匿名化します。店頭を通り過ぎた数百人まで — 誰も身元を残さず、流れだけを分析します。' },
    { question: '既存のCCTV・カメラと互換性はありますか？', answer: 'RTSPなどの標準的な映像入力を受け取るため、カメラを交換せず、すでにあるCCTVの上でそのまま動作します。具体的な互換範囲は環境確認後にご案内します。' },
    { question: 'GDPR・CCPA・個人情報保護法への対応に役立ちますか？', answer: '入力時点で身元を消すプライバシー・バイ・デザインのアプローチは、GDPR・CCPA・国内の個人情報保護法が求めるデータ最小化の原則と整合し、SOC2認証の基準も満たします。ただし最終的な準拠の可否はデータ処理体系全体によって変わるため、導入時に併せて検討することを推奨します。' },
    { question: '処理の遅延は発生しますか？', answer: 'リアルタイムのストリーム処理を目標に設計されており、遅延の水準は入力解像度・フレームレート・配置ハードウェアによって異なります。運用環境を基準とした想定遅延は、仕様検討の段階で併せて算定します。' },
  ],

  ctaBadge: '匿名化仕様の検討',
  ctaTitle: 'あなたの空間に合わせた匿名化構成を一緒に設計します',
  ctaSub: 'すでにあるCCTVとの互換性、配置形態、規制要件——技術チームが直接お答えします。',
  ctaPrimary: '技術検討のお問い合わせ',
};

const C: Record<Locale, Copy> = { ko, en, jp };

export default function AnonymizerView({ locale }: { locale: Locale }) {
  const t = C[locale];
  const mechanismSteps = t.mechanismSteps.map((s, i) => ({ ...s, icon: stepIcons[i] }));

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={definedTerm({ name: t.heroBadge, description: t.heroSub, path: '/technology/anonymizer', locale })} />

      {/* Hero */}
      <section className="relative pt-28 pb-20 lg:pt-36 bg-slate-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: crumb('technology', locale), path: '/technology' }, { name: crumb('anonymizer', locale), path: '/technology/anonymizer' }]} locale={locale} tone="light" className="mb-6" />
          <HeroBadge tone="light">
            <Fingerprint className="w-3.5 h-3.5" />
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

      {/* Mechanism */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">{t.mechanismEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 break-keep">
              {t.mechanismTitle}
            </h2>
            <p className="text-gray-600 leading-relaxed break-keep">
              {t.mechanismSub}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {mechanismSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="card p-7 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-lighter flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-mono font-semibold text-gray-500">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed break-keep">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Spec table */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">{t.specEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep">
              {t.specTitle}
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">{t.specColItem}</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">{t.specColDetail}</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">{t.specColNote}</th>
                </tr>
              </thead>
              <tbody>
                {t.specRows.map((row) => (
                  <tr key={row.feature} className="border-b border-gray-100 last:border-b-0">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">{row.feature}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{row.detail}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-4 break-keep">
            {t.specFootnote}
          </p>
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
          <Accordion items={t.faqItems} idPrefix="anonymizer-faq" />
        </div>
      </AnimatedSection>

      {/* Edge performance monitor */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <EdgePerfMonitorMockup locale={locale} />
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="py-20 lg:py-28 bg-slate-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-lighter rounded-full text-sm text-primary font-semibold mb-7">
            <ShieldCheck className="w-3.5 h-3.5" />
            {t.ctaBadge}
          </div>
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
