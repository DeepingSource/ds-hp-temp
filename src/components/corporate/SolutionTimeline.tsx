import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, History, Radio, Sparkles } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { localeHref, type Locale } from '@/lib/i18n';
import { solutionTaglines, readAlertAct, productFunction } from '@/lib/brand-canon';

/**
 * SolutionTimeline — the 3 SOLUTION products as one flow (NEXTRISE launch film 00:11–14).
 * Store Insight reads yesterday · Store Care flags the now · Store Agent acts on next.
 * Read · Alert · Act; taglines lifted from brand-canon.
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
    eyebrow: readAlertAct.ko,
    heading: '읽고, 알리고, 실행한다',
    sub: '세 개의 store가 하나의 흐름으로 — 어제를 읽고, 지금을 알리고, 다음을 실행합니다.',
    nodes: [
      { key: 'insight', icon: History, product: 'Store Insight', desc: '어제를 읽습니다 — 매출이 미처 보지 못한 것을.', img: '/images/storeinsight-heatmap.webp', alt: '매장 히트맵 — 고객 체류·동선 분석', href: '/products/store-insight' },
      { key: 'care', icon: Radio, product: 'Store Care', desc: '지금을 짚어 알립니다 — 필요한 순간만 모아서.', img: '/images/storecare-contamination-detection.webp', alt: 'StoreCare — 매장 오염·이상 상황 실시간 감지 (익명화)', href: 'https://storecare.ai', external: true },
      { key: 'agent', icon: Sparkles, product: 'Store Agent', desc: '다음을 제안하고 운영합니다 — 권고는 AI가, 결정은 사람이.', img: '/images/storeagent-ai-pop-mockup.webp', alt: 'StoreAgent — 다음 한 수 제안 화면', href: '/products/store-agent' },
    ],
  },
  en: {
    eyebrow: readAlertAct.en,
    heading: 'Read. Alert. Act.',
    sub: 'Three stores, one flow — read yesterday, flag the now, act on next.',
    nodes: [
      { key: 'insight', icon: History, product: 'Store Insight', desc: 'Reads yesterday — what your sales numbers never showed you.', img: '/images/storeinsight-heatmap.webp', alt: 'Store heatmap — dwell and pathway analysis', href: '/products/store-insight' },
      { key: 'care', icon: Radio, product: 'Store Care', desc: 'Flags the now — only the moments that matter, in real time.', img: '/images/storecare-contamination-detection.webp', alt: 'StoreCare — real-time detection of spills and store issues (anonymized)', href: 'https://storecare.ai', external: true },
      { key: 'agent', icon: Sparkles, product: 'Store Agent', desc: 'Proposes and runs the next move — AI recommends, you decide.', img: '/images/storeagent-ai-pop-mockup.webp', alt: 'StoreAgent — next-move proposal screen', href: '/products/store-agent' },
    ],
  },
  jp: {
    eyebrow: readAlertAct.jp,
    heading: '読み、知らせ、動かす。',
    sub: '三つのstoreがひとつの流れに — 昨日を読み、今を知らせ、次を動かします。',
    nodes: [
      { key: 'insight', icon: History, product: 'Store Insight', desc: '昨日を読みます — 売上が見落としていたものまで。', img: '/images/storeinsight-heatmap.webp', alt: '店舗ヒートマップ — 滞在・動線分析', href: '/products/store-insight' },
      { key: 'care', icon: Radio, product: 'Store Care', desc: '今を捉えて知らせます — 必要な瞬間だけを、リアルタイムで。', img: '/images/storecare-contamination-detection.webp', alt: 'StoreCare — 汚れ・異常をリアルタイム検知（非識別）', href: 'https://storecare.ai', external: true },
      { key: 'agent', icon: Sparkles, product: 'Store Agent', desc: '次を提案し、運営します — 推奨はAI、判断は人。', img: '/images/storeagent-ai-pop-mockup.webp', alt: 'StoreAgent — 次の一手の提案画面', href: '/products/store-agent' },
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
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10 mb-5 bg-white/[0.03]">
                  <Image
                    src={n.img}
                    alt={n.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 360px"
                    className="object-cover"
                  />
                </div>
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
            className="draw-line hidden sm:block absolute top-[3.125rem] left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20"
            style={{ animationDelay: '250ms' }}
            aria-hidden="true"
          />
        </div>
      </Container>
    </Section>
  );
}
