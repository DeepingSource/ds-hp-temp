import Link from 'next/link';
import { ArrowUpRight, History, Radio, Sparkles } from 'lucide-react';
import ParallaxThumb from '@/components/corporate/ParallaxThumb';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { localeHref, type Locale } from '@/lib/i18n';
import { solutionTaglines, productFunction, productPrimary } from '@/lib/brand-canon';

/**
 * SolutionTimeline — the 3 SOLUTION products as one flow (NEXTRISE launch film 00:11–14).
 * store insight reads yesterday · store care flags the now · store agent acts on next
 * (taglines lifted from brand-canon). Product labels intentionally keep the "store"
 * framing here — this section's narrative anchor is "three stores, one flow".
 * Each card carries a functional product thumbnail (show-don't-tell).
 */

type Node = {
  key: 'insight' | 'care' | 'agent';
  icon: typeof History;
  product: string;
  desc: string;
  img: string;
  alt: string;
  href: string;
  external?: boolean;
};

const newTabHint: Record<Locale, string> = {
  ko: '(새 탭에서 열림)',
  en: '(opens in a new tab)',
  jp: '(新しいタブで開く)',
};

const dict: Record<Locale, { eyebrow: string; heading: string; sub: string; nodes: Node[] }> = {
  ko: {
    eyebrow: '어제 · 지금 · 다음',
    heading: '세 store, 하나의 흐름',
    sub: '어제를 읽고, 지금을 알리고, 다음을 실행합니다 — 셋이 맞물려 하나의 루프로.',
    nodes: [
      { key: 'insight', icon: History, product: productPrimary('insight'), desc: 'ANALYZE — 어제를 읽어, 오늘의 판단 재료를 만듭니다.', img: '/images/storeinsight-heatmap.webp', alt: '매장 히트맵 — 고객 체류·동선 분석', href: '/products/saai-insight' },
      { key: 'care', icon: Radio, product: productPrimary('care'), desc: 'DETECT — 지금을 감지해, 놓치면 안 될 순간을 띄웁니다.', img: '/images/storecare-contamination-detection.webp', alt: 'store care — 매장 오염·이상 상황 실시간 감지 (익명화)', href: 'https://storecare.ai', external: true },
      { key: 'agent', icon: Sparkles, product: productPrimary('agent'), desc: 'ACT — 다음을 실행하고, 다시 내일의 데이터로 돌아옵니다.', img: '/images/storeagent-ai-pop-mockup.webp', alt: 'store agent — 매장 운영 제안 화면', href: '/products/saai-agent' },
    ],
  },
  en: {
    eyebrow: 'Yesterday · Now · Next',
    heading: 'Three stores, one flow',
    sub: 'Read yesterday, flag the now, act on next — three interlocking parts, one loop.',
    nodes: [
      { key: 'insight', icon: History, product: productPrimary('insight'), desc: 'ANALYZE — read yesterday and shape today’s call.', img: '/images/storeinsight-heatmap.webp', alt: 'Store heatmap — dwell and pathway analysis', href: '/products/saai-insight' },
      { key: 'care', icon: Radio, product: productPrimary('care'), desc: 'DETECT — catch the now and surface what you can’t miss.', img: '/images/storecare-contamination-detection.webp', alt: 'store care — real-time detection of spills and store issues (anonymized)', href: 'https://storecare.ai', external: true },
      { key: 'agent', icon: Sparkles, product: productPrimary('agent'), desc: 'ACT — act on next, then loop back to tomorrow’s data.', img: '/images/storeagent-ai-pop-mockup.webp', alt: 'store agent — store operations proposal screen', href: '/products/saai-agent' },
    ],
  },
  jp: {
    eyebrow: '昨日 · 今 · 次',
    heading: '三つのstore、ひとつの流れ',
    sub: '昨日を読み、今を知らせ、次を動かす — 3つが噛み合い、ひとつのループに。',
    nodes: [
      { key: 'insight', icon: History, product: productPrimary('insight'), desc: 'ANALYZE — 昨日を読み、今日の判断材料をつくります。', img: '/images/storeinsight-heatmap.webp', alt: '店舗ヒートマップ — 滞在・動線分析', href: '/products/saai-insight' },
      { key: 'care', icon: Radio, product: productPrimary('care'), desc: 'DETECT — 今を感知し、見逃せない瞬間を浮かび上がらせます。', img: '/images/storecare-contamination-detection.webp', alt: 'store care — 汚れ・異常をリアルタイム検知（匿名化）', href: 'https://storecare.ai', external: true },
      { key: 'agent', icon: Sparkles, product: productPrimary('agent'), desc: 'ACT — 次を動かし、また明日のデータへ戻ります。', img: '/images/storeagent-ai-pop-mockup.webp', alt: 'store agent — 店舗運営の提案画面', href: '/products/saai-agent' },
    ],
  },
};

export default function SolutionTimeline({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <Section variant="dark" className="relative overflow-hidden">
      <Container className="relative">
        <div className="mb-14 max-w-2xl">
          <Eyebrow tone="light" className="mb-3">{t.eyebrow}</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold text-white break-keep font-display">{t.heading}</h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300 break-keep">{t.sub}</p>
        </div>
        <div className="relative grid sm:grid-cols-3 gap-6">
          {t.nodes.map((n) => {
            const Icon = n.icon;
            const inner = (
              <>
                <div className="flex items-center gap-3 mb-5">
                  <span className="relative z-10 w-11 h-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary-light" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-bold uppercase tracking-[0.15em] text-primary-light">
                    {solutionTaglines[n.key][locale]}
                  </span>
                </div>
                <ParallaxThumb src={n.img} alt={n.alt} />
                <p className="text-xl font-bold text-white mb-2 inline-flex items-center gap-1.5 font-display">
                  {n.product}
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-primary-light transition-colors" aria-hidden="true" />
                </p>
                <p className="text-2xs font-bold uppercase tracking-[0.15em] text-primary-light mb-1">
                  {productFunction[n.key][locale]}
                </p>
                <p className="text-sm text-gray-300 leading-relaxed break-keep">{n.desc}</p>
              </>
            );
            const cls =
              'group stagger-child relative p-7 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-primary/40 transition-colors';
            return n.external ? (
              <a key={n.key} href={n.href} target="_blank" rel="noopener noreferrer" className={cls}>
                {inner}
                <span className="sr-only">{newTabHint[locale]}</span>
              </a>
            ) : (
              <Link key={n.key} href={localeHref(locale, n.href)} className={cls}>
                {inner}
              </Link>
            );
          })}
          <span
            className="draw-line hidden sm:block absolute top-[3.125rem] left-[16.66%] right-[16.66%] h-px bg-primary/30"
            style={{ animationDelay: '250ms' }}
            aria-hidden="true"
          />
        </div>
      </Container>
    </Section>
  );
}
