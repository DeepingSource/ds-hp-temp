import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import AgentMockupShowcase from '@/components/sections/AgentMockupShowcase';
import LiveDemoSection from '@/components/sections/LiveDemoSection';
import {
  BrainCircuit,
  ArrowRight,
  ClipboardCheck,
  Lightbulb,
  TrendingUp,
} from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { solutionTaglines } from '@/lib/brand-canon';
import { JsonLd, softwareApplication } from '@/lib/structured-data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import { AutonomyLadderTimeline, PriorityEngineDiagram, OrderFlowMockup, AlertFatigueComparison } from '@/components/mockups';

/**
 * StoreAgentView — shared Store Agent product-detail composition.
 * Rendered by `/products/store-agent` (en), `/ko/products/store-agent`,
 * `/jp/products/store-agent` with the locale prop. Product name stays identical.
 */

const C: Record<Locale, {
  heroTitle: string;
  heroSub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stepsHeading: string;
  stepsSub: string;
  steps: { title: string; desc: string }[];
  ladderHeading: string;
  ladderSub: string;
  levels: { name: string; desc: string }[];
  ladderNote: string;
  pricingHeading: string;
  pricingSub: string;
  pricingCta: string;
  finalHeading: string;
  finalSub: string;
  finalCta: string;
}> = {
  ko: {
    heroTitle: '보는 AI를 넘어, 운영하는 AI.',
    heroSub: '대시보드는 숫자를 보여줍니다. Store Agent는 그 숫자로 무엇을 할지까지 말합니다 — 매장의 다음 한 수를 함께 결정합니다.',
    ctaPrimary: '도입 상담 신청',
    ctaSecondary: '제안 예시 보기',
    stepsHeading: '숫자에서, 다음 한 수까지',
    stepsSub: '매장을 완벽하게 하려면 봐야 할 게 너무 많습니다. Store Agent가 그 짐을 나눠, 지금 무엇을 할지 짚어줍니다.',
    steps: [
      { title: '지금, 매대부터 채울까요?', desc: '점심 학생 방문이 평소보다 18% 많습니다. 인기 음료 세 종이 한 시간 안에 동날 것 같아요. 지금 백룸 재고로 매대부터 채울지 짚어드립니다.' },
      { title: '말이 아니라, 발주서로', desc: '반복되는 패턴은 발주로 잇습니다. 내일 점심 수요까지 내다보고 삼각김밥 40개를 오픈 전 입고로 — 발주서를 바로 만들어 드립니다.' },
      { title: '권고는 AI, 결정은 사람', desc: '권고하고, 승인받고, 실행하고, 결과로 학습합니다. 권고는 AI가, 결정은 언제나 사람이.' },
    ],
    ladderHeading: '매장 자율 운영의 사다리',
    ladderSub: '권고에서 시작해, 매장이 스스로 운영하는 단계까지 함께 올라갑니다. 권고는 AI가, 결정은 사람이.',
    levels: [
      { name: '수동', desc: '사람이 모든 결정을 내립니다.' },
      { name: '제안', desc: 'AI가 데이터를 보여주고 사람이 판단합니다.' },
      { name: '권고', desc: 'AI가 근거와 함께 다음 한 수를 제안합니다.' },
      { name: '조건부 실행', desc: '승인 범위 안에서 AI가 일부를 실행합니다.' },
      { name: '감독 자율', desc: '사람은 예외만 확인, 나머지는 AI가 운영합니다.' },
      { name: '완전 자율', desc: '매장이 스스로 판단하고 운영합니다.' },
    ],
    ladderNote: '* 단계는 개념적 모델이며, 도입 매장의 환경에 맞춰 조정됩니다.',
    pricingHeading: '한 매장이 아니라, 브랜드 전체가',
    pricingSub: '본부에서는 전국 모든 매장이 한 화면에 — 방문·구매·전환율로, 실시간으로. 단일 매장부터 다점포 본사까지 운영 규모에 맞춰 구성합니다.',
    pricingCta: '요금 안내 보기',
    finalHeading: '지켜보는 데서, 운영하는 데로.',
    finalSub: '이 모든 걸 영상 없이 합니다 — 사람과 얼굴은 즉시 익명화하고, 동선과 전환만 기록합니다. Store Agent가 매장의 다음을 함께 결정합니다.',
    finalCta: '도입 상담 신청',
  },
  en: {
    heroTitle: 'Beyond seeing. AI that operates.',
    heroSub: 'A dashboard shows you the numbers. Store Agent tells you what to do with them — and makes the next move with you.',
    ctaPrimary: 'Request a consultation',
    ctaSecondary: 'See sample recommendations',
    stepsHeading: 'From the number to the next move',
    stepsSub: 'Running a perfect store means watching far too much for one person. Store Agent shoulders the load and tells you what to do right now.',
    steps: [
      { title: 'Restock the shelf now?', desc: 'Lunchtime student traffic is up 18%. Three top drinks will sell out within the hour. Store Agent asks: pull from the backroom and restock now?' },
      { title: 'Not a note — a PO', desc: 'Recurring patterns become orders. Looking ahead to tomorrow’s lunch demand, 40 rice balls in before open — the purchase order is drafted for you.' },
      { title: 'AI recommends, people decide', desc: 'Recommend, approve, act, learn from the outcome. The AI advises; the call is always yours.' },
    ],
    ladderHeading: 'The ladder of autonomous store operations',
    ladderSub: 'Start with recommendations and climb together to a store that runs itself. The AI advises; people decide.',
    levels: [
      { name: 'Manual', desc: 'People make every decision.' },
      { name: 'Suggest', desc: 'AI surfaces the data; people decide.' },
      { name: 'Recommend', desc: 'AI proposes the next move, with reasoning.' },
      { name: 'Conditional action', desc: 'Within approved limits, AI executes part of it.' },
      { name: 'Supervised autonomy', desc: 'People review only exceptions; AI runs the rest.' },
      { name: 'Full autonomy', desc: 'The store decides and operates on its own.' },
    ],
    ladderNote: '* The levels are a conceptual model, adjusted to each store’s environment.',
    pricingHeading: 'Not one store — your whole brand',
    pricingSub: 'At HQ, every store across the country on one screen — footfall, purchases, and conversion, in real time. From a single store to a multi-location headquarters, configured to your scale.',
    pricingCta: 'See pricing',
    finalHeading: 'From watching to operating.',
    finalSub: 'All of it, with no video kept — people and faces de-identified on the spot, only movement and conversion recorded. Store Agent decides your store’s next move with you.',
    finalCta: 'Request a consultation',
  },
  jp: {
    heroTitle: '見るAIを超え、運営するAIへ。',
    heroSub: 'ダッシュボードは数字を見せます。Store Agent は、その数字で何をすべきかまで伝え、店舗の次の一手をともに決めます。',
    ctaPrimary: '導入のご相談',
    ctaSecondary: 'ご提案の例を見る',
    stepsHeading: '数字から、次の一手まで',
    stepsSub: '店舗を完璧にするには、見るべきものが多すぎます。Store Agent がその負担を分かち合い、今すべきことを示します。',
    steps: [
      { title: '今、棚から補充しますか？', desc: 'ランチタイムの学生来店が普段より18%多めです。人気ドリンク3種が1時間以内に品切れしそうです。バックルームの在庫で今すぐ補充するか、お知らせします。' },
      { title: '言葉ではなく、発注書で', desc: '繰り返すパターンは発注へつなげます。明日のランチ需要まで見越して、おにぎり40個を開店前入荷に — 発注書をその場で作成します。' },
      { title: '推奨はAI、決定は人', desc: '推奨し、承認を受け、実行し、結果から学びます。推奨はAIが、決定はいつも人が。' },
    ],
    ladderHeading: '店舗の自律運営のはしご',
    ladderSub: '推奨から始め、店舗が自ら運営する段階まで、ともに上っていきます。推奨はAIが、決定は人が。',
    levels: [
      { name: '手動', desc: '人がすべての決定を下します。' },
      { name: '提案', desc: 'AI がデータを示し、人が判断します。' },
      { name: '推奨', desc: 'AI が根拠とともに次の一手をご提案します。' },
      { name: '条件付き実行', desc: '承認の範囲内で、AI が一部を実行します。' },
      { name: '監督下の自律', desc: '人は例外のみを確認し、残りは AI が運営します。' },
      { name: '完全自律', desc: '店舗が自ら判断し、運営します。' },
    ],
    ladderNote: '※ 段階は概念的なモデルであり、導入店舗の環境に合わせて調整されます。',
    pricingHeading: '一店舗ではなく、ブランド全体が',
    pricingSub: '本部では、全国すべての店舗を一画面に — 来店・購入・転換率を、リアルタイムで。単一店舗から多店舗の本部まで、運営規模に合わせて構成します。',
    pricingCta: '料金のご案内を見る',
    finalHeading: '見守るだけから、運営する側へ。',
    finalSub: 'これらすべてを、映像を残さずに行います — 人と顔はその場で非識別化し、動線と転換だけを記録します。Store Agent が店舗の次を、ともに決めます。',
    finalCta: '導入のご相談',
  },
};

export default function StoreAgentView({ locale }: { locale: Locale }) {
  const t = C[locale];

  const stepIcons = [ClipboardCheck, Lightbulb, TrendingUp];

  return (
    <>
      <JsonLd data={softwareApplication({ name: 'Store Agent', description: t.heroSub, path: '/products/store-agent', locale })} />
      {/* ── Hero (Executive 판단체) ── */}
      <section className="section-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-20 lg:pt-40 lg:pb-28 text-center">
          <Breadcrumb items={[{ name: crumb('products', locale), path: '/products' }, { name: 'Store Agent', path: '/products/store-agent' }]} locale={locale} tone="dark" className="mb-6" />
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-primary-light font-medium mb-6">
            <BrainCircuit className="w-4 h-4" />
            Store Agent
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight break-keep mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-light mb-4">
            {solutionTaglines.agent[locale]}
          </p>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto break-keep mb-10">
            {t.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={localeHref(locale, '/contact') + '?product=StoreAgent'} className="btn-primary btn-lg">
              {t.ctaPrimary}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="#demo" className="btn-ghost-dark">
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">
              {t.stepsHeading}
            </h2>
            <p className="text-lg text-gray-500 break-keep">
              {t.stepsSub}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {t.steps.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={s.title} className="card flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-bold text-gray-500">0{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed break-keep">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ── Autonomy Ladder L0→L5 ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 break-keep">
              {t.ladderHeading}
            </h2>
            <p className="text-lg text-gray-500 break-keep">
              {t.ladderSub}
            </p>
          </div>

          {/* L0→L5 인터랙티브 타임라인 (인라인 사다리 대체 — 노드 클릭 시 대표 카테고리·진화 조건) */}
          <AutonomyLadderTimeline locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── Alert fatigue comparison (알림 피로 · 우선순위 문제 제기) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <AlertFatigueComparison locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── Priority engine diagram (우선순위 엔진 · 다음 행동 제안) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <PriorityEngineDiagram locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── Agent mockups (액션 카드·AI 채팅·푸시 알림) ── */}
      <AgentMockupShowcase locale={locale} />

      {/* ── Order flow mockup (승인→발주→배송, 폰 목업) ── */}
      <AnimatedSection className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-md mx-auto px-4">
          <OrderFlowMockup locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── Live demo (실제 브리핑 목업, briefingData) ── */}
      <LiveDemoSection locale={locale} />

      {/* ── Pricing teaser ── */}
      <AnimatedSection className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">
            {t.pricingHeading}
          </h2>
          <p className="text-gray-500 mb-6 break-keep">
            {t.pricingSub}
          </p>
          <Link
            href={localeHref(locale, '/pricing')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            {t.pricingCta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AnimatedSection>

      {/* ── CTA ── */}
      <AnimatedSection className="section-dark relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight break-keep">
            {t.finalHeading}
          </h2>
          <p className="text-lg text-gray-300 mb-10 break-keep">
            {t.finalSub}
          </p>
          <Link href={localeHref(locale, '/contact') + '?product=StoreAgent'} className="btn-primary btn-lg">
            {t.finalCta}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}
