import SaaiSymbol from '@/components/ui/SaaiSymbol';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, ShieldCheck, Star } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Breadcrumb from '@/components/ui/Breadcrumb';
import WordRise from '@/components/ui/WordRise';
import { crumb } from '@/lib/breadcrumb-labels';
import { localeHref, type Locale } from '@/lib/i18n';
import { MODE_ORDER } from '@/lib/brand-canon';
import { MODE_COPY } from '@/data/function-matrix-i18n';
import { JsonLd, softwareApplication } from '@/lib/structured-data';

/**
 * SaaiAdsInsightView — the new saai ads insight product page (기능페이지 작업문서 v1 §6,
 * "gaze 승격"). Signage·displays·shelf products measured for traffic → approach →
 * attention(gaze) → action, framed through care/insight/agent. Same 8-part skeleton as
 * the tool pages, but this is a saai-grammar PRODUCT (not in the function library), so it
 * breadcrumbs to /products and carries bespoke 3-mode copy. Mockup figures are 예시.
 */

const PATH = '/products/saai-ads-insight';

type ModeKey = (typeof MODE_ORDER)[number];

type Copy = {
  eyebrow: string; moduleBadge: string; noInstall: string; h1: string; sub: string; privacy: string;
  limitsLabel: string; limits: string;
  solutionLabel: string; solution: string; grounding: string;
  whatLabel: string; what: string[];
  scenariosLabel: string; audience: string; scenarios: { title: string; desc: string }[];
  modesLabel: string; modesSub: string; cells: Record<ModeKey, string>;
  demoLabel: string; example: string;
  funnel: { label: string; value: string }[];
  rankLabel: string; ranks: { name: string; pct: number; tag?: string }[];
  connectLabel: string; connectSub: string; connect: { label: string; href: string }[]; cta: string;
  backToProducts: string;
};

const C: Record<Locale, Copy> = {
  ko: {
    eyebrow: '제품 · saai ads insight · 사이니지·전시물 반응',
    moduleBadge: 'saai 제품 모듈 · 단독 도입 가능',
    noInstall: '쓰던 CCTV로, 새 장비 없이',
    h1: '걸어둔 광고가, 시선을 잡고 있을까요?',
    sub: '사이니지·전시물·매대 앞의 반응(통행·접근·주목·행동)을 익명으로 측정합니다. 무엇을 어디에 걸지, 데이터로.',
    privacy: '개인 식별 없이, 시선·반응만',
    limitsLabel: '한계',
    limits: '광고와 전시물은 걸고 나면 효과를 모릅니다. 몇 명이 앞을 지났는지, 눈길이 멈췄는지, 행동으로 이어졌는지 — POS엔 없습니다.',
    solutionLabel: '해결',
    solution: '대상물 앞의 통행 → 접근 → 주목 → 행동을 익명으로 측정해, 광고 한 편·전시물 하나의 실제 효과를 숫자로.',
    grounding: '범용 리포트가 아니라, 이 대상물 앞을 직접 봅니다.',
    whatLabel: '무엇을 측정하나',
    what: ['통행 (앞을 지난 수)', '접근 (다가온 비율)', '주목 (시선이 멈춘 비율)', '행동 (집어듦·상호작용, opt)'],
    scenariosLabel: '이런 자리에서',
    audience: '브랜드·리테일 광고·VMD 담당, 사이니지·매대 운영자를 위해.',
    scenarios: [
      { title: '드럭스토어 테스터존', desc: '어떤 테스터가 손을 부르는지 — 주목에서 시연으로 이어지는 전환까지.' },
      { title: '편의점 엔드캡', desc: '엔드캡·행사 매대의 실제 흡인력을, 게시물 하나하나 단위로.' },
      { title: '전시 부스', desc: '부스·전시물 앞의 체류와 시선을, 관람 동선 위에서.' },
    ],
    modesLabel: '세 모드로',
    modesSub: '같은 대상물 — care는 지금으로, insight는 어제로, agent는 다음으로 읽습니다.',
    cells: {
      care: '진열·POP·사이니지 앞 시선 반응을 실시간으로 확인',
      insight: '대상물별 주목도(gaze→pick·접근 전환)를 분석',
      agent: '골든존·게시 위치·노출 우선순위를 제안',
    },
    demoLabel: '이런 화면으로',
    example: '예시',
    funnel: [
      { label: '통행', value: '1,240' },
      { label: '접근', value: '420' },
      { label: '주목', value: '180' },
      { label: '행동', value: '44' },
    ],
    rankLabel: '대상물별 주목 · 추천 위치',
    ranks: [
      { name: '사이니지 A · 입구', pct: 71, tag: '골든존' },
      { name: '엔드캡 전시대 B', pct: 44 },
      { name: '벽면 POP C', pct: 22 },
    ],
    connectLabel: '이어지는 제품',
    connectSub: 'store pop이 무엇이 걸려 있는지(게시 상태)를, saai insight가 시선이 어떻게 반응하는지를 봅니다 — ads insight는 그 둘을 대상물 단위로 잇습니다.',
    connect: [
      { label: 'saai agent', href: '/products/saai-agent' },
      { label: 'store pop', href: '/products/store-pop' },
      { label: 'saai insight', href: '/products/saai-insight' },
      { label: '도입 상담', href: '/contact' },
    ],
    cta: '도입 상담',
    backToProducts: '제품 전체 보기',
  },
  en: {
    eyebrow: 'Product · saai ads insight · signage & display response',
    moduleBadge: 'saai product module · adopt on its own',
    noInstall: 'On the CCTV you already have',
    h1: 'Is that ad actually catching eyes?',
    sub: 'Traffic, approach, attention (gaze) and action in front of signage, displays and shelf products — measured anonymously, so what goes where is a decision on data.',
    privacy: 'No identification — only gaze and response',
    limitsLabel: 'The limit',
    limits: 'Once an ad or display is up, its effect is a mystery. How many walked past, whose eyes stopped, whether it led to action — none of that is in the POS.',
    solutionLabel: 'The fix',
    solution: 'Traffic → approach → attention → action in front of each piece, measured anonymously — the real effect of one ad or display, as numbers.',
    grounding: 'Not a generic report — it looks right in front of the piece itself.',
    whatLabel: 'What it measures',
    what: ['Traffic (passed by)', 'Approach (drew closer)', 'Attention (gaze stopped)', 'Action (pick-up / interaction, opt)'],
    scenariosLabel: 'Where it fits',
    audience: 'For brand & retail advertising / VMD teams, and signage & shelf operators.',
    scenarios: [
      { title: 'Drugstore tester zone', desc: 'Which tester draws a hand — from attention to try-out conversion.' },
      { title: 'Convenience endcap', desc: 'The real pull of endcaps and promo shelves, piece by piece.' },
      { title: 'Exhibition booth', desc: 'Dwell and gaze in front of a booth or exhibit, along the visitor path.' },
    ],
    modesLabel: 'Through the three modes',
    modesSub: 'The same piece — care reads it as now, insight as yesterday, agent as next.',
    cells: {
      care: 'Live gaze response in front of displays, POP and signage',
      insight: 'Attention per piece analysed (gaze→pick, approach conversion)',
      agent: 'Golden-zone, placement and exposure priority suggested',
    },
    demoLabel: 'What it looks like',
    example: 'example',
    funnel: [
      { label: 'Traffic', value: '1,240' },
      { label: 'Approach', value: '420' },
      { label: 'Attention', value: '180' },
      { label: 'Action', value: '44' },
    ],
    rankLabel: 'Attention per piece · suggested placement',
    ranks: [
      { name: 'Signage A · entrance', pct: 71, tag: 'golden zone' },
      { name: 'Endcap display B', pct: 44 },
      { name: 'Wall POP C', pct: 22 },
    ],
    connectLabel: 'Where it leads',
    connectSub: 'store pop tells you what’s posted (its status), saai insight tells you how gaze responds — ads insight ties the two together, per piece.',
    connect: [
      { label: 'saai agent', href: '/products/saai-agent' },
      { label: 'store pop', href: '/products/store-pop' },
      { label: 'saai insight', href: '/products/saai-insight' },
      { label: 'Talk to us', href: '/contact' },
    ],
    cta: 'Talk to us',
    backToProducts: 'All products',
  },
  jp: {
    eyebrow: '製品 · saai ads insight · サイネージ・展示物の反応',
    moduleBadge: 'saai 製品モジュール · 単独導入OK',
    noInstall: 'すでにあるCCTVで、新しい機器なしで',
    h1: '掲げた広告は、視線を掴んでいますか？',
    sub: 'サイネージ・展示物・棚の商品前の通行・接近・注目（視線）・行動を匿名で計測 — 何をどこに掲げるかを、データで。',
    privacy: '個人を識別せず、視線・反応だけ',
    limitsLabel: '限界',
    limits: '広告も展示物も、掲げた後は効果が分かりません。何人が前を通ったか、視線が止まったか、行動につながったか — POSにはありません。',
    solutionLabel: '解決',
    solution: '対象物前の通行 → 接近 → 注目 → 行動を匿名で計測、広告一枚・展示物一つの実際の効果を数字に。',
    grounding: '汎用のレポートではなく、この対象物の前を直接見ます。',
    whatLabel: '何を計測するか',
    what: ['通行（前を通った数）', '接近（近づいた割合）', '注目（視線が止まった割合）', '行動（手に取る・相互作用、opt）'],
    scenariosLabel: 'こんな場所で',
    audience: 'ブランド・リテールの広告・VMD担当、サイネージ・棚の運営者のために。',
    scenarios: [
      { title: 'ドラッグストアのテスターゾーン', desc: 'どのテスターが手を招くか — 注目から試用への転換まで。' },
      { title: 'コンビニのエンドキャップ', desc: 'エンドキャップ・催事棚の実際の引きを、掲出ひとつずつ。' },
      { title: '展示ブース', desc: 'ブース・展示物前の滞在と視線を、観覧動線の上で。' },
    ],
    modesLabel: '三つのモードで',
    modesSub: '同じ対象物 — careは今として、insightは昨日として、agentは次として読む。',
    cells: {
      care: '陳列・POP・サイネージ前の視線反応をリアルタイム確認',
      insight: '対象物ごとの注目度（gaze→pick・接近転換）を分析',
      agent: 'ゴールデンゾーン・掲出位置・露出優先度を提案',
    },
    demoLabel: 'こんな画面で',
    example: '例',
    funnel: [
      { label: '通行', value: '1,240' },
      { label: '接近', value: '420' },
      { label: '注目', value: '180' },
      { label: '行動', value: '44' },
    ],
    rankLabel: '対象物別の注目 · 推奨位置',
    ranks: [
      { name: 'サイネージA · 入口', pct: 71, tag: 'ゴールデンゾーン' },
      { name: 'エンドキャップ展示台B', pct: 44 },
      { name: '壁面POP C', pct: 22 },
    ],
    connectLabel: 'つながる製品',
    connectSub: 'store popが何が掲出されているか（状態）を、saai insightが視線がどう反応するかを見ます — ads insightがその二つを対象物単位でつなぎます。',
    connect: [
      { label: 'saai agent', href: '/products/saai-agent' },
      { label: 'store pop', href: '/products/store-pop' },
      { label: 'saai insight', href: '/products/saai-insight' },
      { label: '導入のご相談', href: '/contact' },
    ],
    cta: '導入のご相談',
    backToProducts: 'すべての製品',
  },
};

function AdsMockup({ t }: { t: Copy }) {
  const heights = [100, 60, 38, 16];
  return (
    <div>
      {/* traffic → action funnel */}
      <div className="flex items-end gap-2">
        {t.funnel.map((f, i) => (
          <div key={f.label} className="flex-1 text-center">
            <div className="flex h-24 items-end justify-center">
              <div
                className={`w-full rounded-t-md ${i === t.funnel.length - 1 ? 'bg-primary' : 'bg-primary/30'}`}
                style={{ height: `${heights[i]}%` }}
              />
            </div>
            <p className="mt-2 text-sm font-bold text-gray-900 font-mono leading-none">{f.value}</p>
            <p className="mt-1 text-2xs text-gray-500">{f.label}</p>
          </div>
        ))}
      </div>

      {/* attention ranking + suggested placement */}
      <p className="mt-6 mb-3 text-2xs font-medium text-gray-400">{t.rankLabel}</p>
      <ul className="space-y-2">
        {t.ranks.map((r) => (
          <li key={r.name} className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white px-3 py-2">
            <span className="flex-1 truncate text-sm text-gray-700">{r.name}</span>
            {r.tag && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-2xs font-semibold text-primary">
                <Star className="h-2.5 w-2.5" aria-hidden="true" />
                {r.tag}
              </span>
            )}
            <span className="w-24 shrink-0">
              <span className="mb-0.5 block text-right text-2xs font-mono text-gray-500">{r.pct}%</span>
              <span className="block h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <span className="block h-full rounded-full bg-primary" style={{ width: `${r.pct}%` }} />
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SaaiAdsInsightView({ locale }: { locale: Locale }) {
  const t = C[locale];
  const modes = MODE_COPY[locale];

  return (
    <>
      <JsonLd data={softwareApplication({ name: 'saai ads insight', description: t.sub, path: PATH, locale })} />

      {/* ── ① Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[26rem] h-[26rem] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-14 lg:pt-36 text-center">
          <Breadcrumb
            items={[
              { name: crumb('products', locale), path: '/products' },
              { name: 'saai ads insight', path: PATH },
            ]}
            locale={locale}
            tone="light"
            className="mb-6 justify-center"
          />
          <p className="text-sm font-medium text-primary mb-4 tracking-wide">{t.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight break-keep mb-5 font-display">
            <WordRise text={t.h1} />
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-xl mx-auto break-keep mb-4">{t.sub}</p>
          <p className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            {t.privacy}
          </p>
          {/* Module positioning — a saai product you can adopt on its own, on existing CCTV (§4-1·§4-4) */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary-lighter/40 px-3 py-1 text-xs font-semibold text-primary">{t.moduleBadge}</span>
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-500">{t.noInstall}</span>
          </div>
        </div>
      </section>

      {/* ── ② Limits · ③ Solution ── */}
      <AnimatedSection className="py-16 lg:py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-slate-50 p-7">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t.limitsLabel}</p>
            <p className="text-gray-600 leading-relaxed break-keep">{t.limits}</p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary-lighter/30 p-7">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">{t.solutionLabel}</p>
            <p className="text-gray-700 leading-relaxed break-keep">{t.solution}</p>
            <p className="mt-3 text-sm font-semibold text-primary break-keep">{t.grounding}</p>
          </div>
        </div>
      </AnimatedSection>

      {/* ── ④ What it measures ── */}
      <Section variant="alt">
        <Container>
          <div className="mb-8 max-w-2xl">
            <Eyebrow className="mb-4">{t.whatLabel}</Eyebrow>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {t.what.map((w) => (
              <li key={w} className="rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm font-medium text-gray-700 break-keep">
                {w}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── ⑤ Through the three modes ── */}
      <Section variant="default">
        <Container>
          <div className="mb-8 max-w-2xl">
            <Eyebrow className="mb-4">{t.modesLabel}</Eyebrow>
            <p className="text-gray-500 break-keep">{t.modesSub}</p>
          </div>
          <ul className="grid gap-5 lg:grid-cols-3">
            {MODE_ORDER.map((mode) => (
              <li key={mode} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-sm font-bold text-gray-900">{modes[mode].name}</span>
                  <span className="text-2xs font-mono text-primary">{modes[mode].mode} · {modes[mode].tense}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed break-keep">{t.cells[mode]}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── Where it fits — concrete scenarios + audience (§4-2·§4-3) ── */}
      <Section variant="alt">
        <Container>
          <div className="mb-8 max-w-2xl">
            <Eyebrow className="mb-4">{t.scenariosLabel}</Eyebrow>
            <p className="text-gray-500 break-keep">{t.audience}</p>
          </div>
          <ul className="grid gap-5 lg:grid-cols-3">
            {t.scenarios.map((s) => (
              <li key={s.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
                <h3 className="text-base font-bold text-gray-900 mb-2 break-keep">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed break-keep">{s.desc}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ── ⑥ Mockup (예시) ── */}
      <Section variant="default">
        <Container>
          <div className="mb-8 max-w-2xl">
            <Eyebrow className="mb-4">{t.demoLabel}</Eyebrow>
          </div>
          <div className="mx-auto max-w-lg rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-card">
            <div className="mb-5 flex justify-end">
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-2xs font-medium text-gray-500">{t.example}</span>
            </div>
            <AdsMockup t={t} />
          </div>
        </Container>
      </Section>

      {/* ── ⑧ Connect · CTA ── */}
      <AnimatedSection className="py-14 lg:py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Eyebrow className="mb-4 justify-center">{t.connectLabel}</Eyebrow>
          <p className="mx-auto max-w-2xl text-sm text-gray-500 leading-relaxed break-keep mb-7">{t.connectSub}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {t.connect.map((c) => {
              const isCta = c.href === '/contact';
              return (
                <Link
                  key={c.label}
                  href={localeHref(locale, c.href)}
                  className={isCta
                    ? 'btn-primary btn-lg inline-flex items-center gap-2'
                    : 'inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:border-primary-light transition-colors no-underline'}
                >
                  {c.label}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
          <Link
            href={localeHref(locale, '/products')}
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-primary transition-colors no-underline"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {t.backToProducts}
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}
