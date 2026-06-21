import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, BarChart3, Megaphone, TrendingUp, Cpu } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { localeHref, type Locale } from '@/lib/i18n';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import { JsonLd, itemList, softwareApplication } from '@/lib/structured-data';

/**
 * ProductsView — product hub (Brand Map v3.0 IA).
 * SAAI is the umbrella (not a product). Two public groups:
 *   SOLUTION (Live)  — store insight · store care · store agent  (어제·지금·다음)
 *   SOURCE  (Building) — store count · AI POP · trend fit         (곧 출시)
 * SEED (tech foundation) is summarized with a link to /technology.
 */

type LiveItem = { name: string; kicker: string; func: string; desc: string; href: string; external?: boolean; badge?: string; img: string; alt: string };
type ToolItem = { id: string; name: string; desc: string; live?: boolean; href?: string };

const C: Record<Locale, {
  eyebrow: string;
  heroTitle: string;
  umbrella: string;
  solutionEyebrow: string;
  live: LiveItem[];
  toolEyebrow: string;
  toolBadge: string;
  toolLive: string;
  detail: string;
  visit: string;
  tools: ToolItem[];
  seedLine: string;
  seedCta: string;
  cta: string;
}> = {
  ko: {
    eyebrow: 'PRODUCTS',
    heroTitle: '관찰 · 분석 · 제안 · 학습',
    umbrella: '모든 제품은 익명화 공간 AI, SAAI 아래에서 하나로 움직입니다.',
    solutionEyebrow: '매일 받는 답 · SOLUTION',
    live: [
      { name: 'store insight', kicker: '어제를 읽다', func: '공간 분석 AI', desc: 'POS가 못 센 것까지 — 어제 매장에서 무슨 일이 있었는지 데이터로 읽습니다.', href: '/products/store-insight', img: '/images/storeinsight-heatmap.webp', alt: 'store insight 히트맵 — 고객 체류·동선 분석' },
      { name: 'store care', kicker: '지금을 알리다', func: '이상 감지 AI', desc: '24시간 매장을 대신 보는 눈 — 정작 필요한 순간만 골라 실시간으로 알립니다.', href: 'https://storecare.ai', external: true, badge: 'storecare.ai', img: '/images/storecare-contamination-detection.webp', alt: 'store care — 매장 이상 상황 실시간 감지 (익명화)' },
      { name: 'store agent', kicker: '다음을 실행하다', func: '운영 제안 AI', desc: '다음 한 수를 권고하고 발주까지 — 권고는 AI가, 결정은 사람이.', href: '/products/store-agent', img: '/images/storeagent-ai-pop-mockup.webp', alt: 'store agent — 다음 한 수 제안 화면' },
    ],
    toolEyebrow: '확장 도구 · SOURCE',
    toolBadge: '곧 출시',
    toolLive: '운영 중',
    detail: '자세히 보기',
    visit: '바로가기',
    tools: [
      { id: 'store-count', name: 'store count', desc: '카메라 한 대로, 상권과 유입을 매일.' },
      { id: 'ai-pop', name: 'AI POP', desc: '이 매장에 맞춘 POP·시즌 콘텐츠를 1분 만에.', live: true, href: '/products/saai' },
      { id: 'trend-fit', name: 'trend fit', desc: '트렌드 적합도로 다음 발주를 돕습니다.' },
    ],
    seedLine: 'SEAL · anonymizer · spatial AI · vision models — 모든 제품을 떠받치는 익명화 기술 기반.',
    seedCta: '기술 보기',
    cta: '어떤 제품이 맞을지 상담하기',
  },
  en: {
    eyebrow: 'PRODUCTS',
    heroTitle: 'Observe · Analyze · Suggest · Learn',
    umbrella: 'Every product moves as one — under SAAI, anonymized spatial AI.',
    solutionEyebrow: 'Your daily answer · SOLUTION',
    live: [
      { name: 'store insight', kicker: 'Reads yesterday', func: 'Spatial analytics AI', desc: 'Beyond what the POS counted — it reads what happened in your store yesterday, as data.', href: '/products/store-insight', img: '/images/storeinsight-heatmap.webp', alt: 'store insight heatmap — dwell and pathway analysis' },
      { name: 'store care', kicker: 'Flags the now', func: 'Anomaly detection AI', desc: 'A pair of eyes on your store 24/7 — only the moments that matter, flagged in real time.', href: 'https://storecare.ai', external: true, badge: 'storecare.ai', img: '/images/storecare-contamination-detection.webp', alt: 'store care — real-time detection of store issues (anonymized)' },
      { name: 'store agent', kicker: 'Acts on next', func: 'Operations copilot AI', desc: 'Recommends the next move and turns it into orders — AI recommends, you decide.', href: '/products/store-agent', img: '/images/storeagent-ai-pop-mockup.webp', alt: 'store agent — next-move proposal screen' },
    ],
    toolEyebrow: 'Expansion tools · SOURCE',
    toolBadge: 'Coming soon',
    toolLive: 'Live',
    detail: 'Learn more',
    visit: 'Visit',
    tools: [
      { id: 'store-count', name: 'store count', desc: 'Trade area and footfall, daily, from one camera.' },
      { id: 'ai-pop', name: 'AI POP', desc: 'On-brand POP and seasonal content for this store in a minute.', live: true, href: '/products/saai' },
      { id: 'trend-fit', name: 'trend fit', desc: 'Trend-fit scoring to guide your next order.' },
    ],
    seedLine: 'SEAL · anonymizer · spatial AI · vision models — the anonymization tech that powers every product.',
    seedCta: 'See the tech',
    cta: 'Talk to us about the right product',
  },
  jp: {
    eyebrow: 'PRODUCTS',
    heroTitle: '観察 · 分析 · 提案 · 学習',
    umbrella: 'すべての製品は、匿名化空間AI・SAAIの下でひとつに動きます。',
    solutionEyebrow: '毎日受け取る答え · SOLUTION',
    live: [
      { name: 'store insight', kicker: '昨日を読む', func: '空間分析AI', desc: 'POSが数え切れなかったものまで — 昨日の店舗で何が起きたかをデータで読み解きます。', href: '/products/store-insight', img: '/images/storeinsight-heatmap.webp', alt: 'store insight ヒートマップ — 滞在・動線分析' },
      { name: 'store care', kicker: '今を知らせる', func: '異常検知AI', desc: '24時間、店舗を代わりに見守る目 — 本当に必要な瞬間だけをリアルタイムでお知らせ。', href: 'https://storecare.ai', external: true, badge: 'storecare.ai', img: '/images/storecare-contamination-detection.webp', alt: 'store care — 店舗の異常をリアルタイム検知（匿名化）' },
      { name: 'store agent', kicker: '次を動かす', func: '運営提案AI', desc: '次の一手を提案し、発注まで — 提案はAI、決定は人。', href: '/products/store-agent', img: '/images/storeagent-ai-pop-mockup.webp', alt: 'store agent — 次の一手の提案画面' },
    ],
    toolEyebrow: '拡張ツール · SOURCE',
    toolBadge: '近日公開',
    toolLive: '運営中',
    detail: '詳しく見る',
    visit: '開く',
    tools: [
      { id: 'store-count', name: 'store count', desc: 'カメラ1台で、商圏と流入を毎日。' },
      { id: 'ai-pop', name: 'AI POP', desc: 'この店舗に合わせたPOP・季節コンテンツを1分で。', live: true, href: '/products/saai' },
      { id: 'trend-fit', name: 'trend fit', desc: 'トレンド適合度で次の発注をサポート。' },
    ],
    seedLine: 'SEAL · anonymizer · spatial AI · vision models — すべての製品を支える匿名化技術基盤。',
    seedCta: '技術を見る',
    cta: 'どの製品が最適かご相談する',
  },
};

const toolIcons = [BarChart3, Megaphone, TrendingUp] as const;

export default function ProductsView({ locale }: { locale: Locale }) {
  const t = C[locale];
  const livePaths = ['/products/store-insight', 'https://storecare.ai', '/products/store-agent'];

  return (
    <>
      <JsonLd
        data={itemList(
          t.live.map((p, i) =>
            softwareApplication({ name: p.name, description: p.desc, path: livePaths[i], locale }),
          ),
        )}
      />

      {/* ── Hero (짧게) + 우산 프레임 ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-14 lg:pt-36 lg:pb-16 text-center">
          <Breadcrumb items={[{ name: crumb('products', locale), path: '/products' }]} locale={locale} tone="light" className="mb-6 justify-center" />
          <p className="text-sm font-medium text-primary mb-4 tracking-wide">{t.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight break-keep mb-5 font-display">
            {t.heroTitle}
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto break-keep">
            {t.umbrella}
          </p>
        </div>
      </section>

      {/* ── 매일 받는 답 (SOLUTION · Live) ── */}
      <Section variant="default">
        <Container>
          <Eyebrow className="mb-7">{t.solutionEyebrow}</Eyebrow>
          <AnimatedSection>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.live.map((p) => {
                const inner = (
                  <>
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                      <Image src={p.img} alt={p.alt} fill sizes="(max-width: 640px) 100vw, 380px" className="object-cover" />
                      {p.badge && (
                        <span className="absolute top-3 right-3 text-2xs font-medium text-primary bg-white/90 px-2.5 py-1 rounded-full shadow-card">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <p className="text-2xs font-bold uppercase tracking-[0.18em] text-gray-500 mb-1">{p.kicker} · {p.func}</p>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{p.name}</h3>
                      <p className="text-base text-gray-500 leading-relaxed mb-5 break-keep">{p.desc}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        {p.external ? t.visit : t.detail}
                        {p.external ? <ArrowUpRight className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </span>
                    </div>
                  </>
                );
                const cls = 'stagger-child group flex flex-col h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card hover:border-primary-light transition-colors no-underline';
                return p.external ? (
                  <li key={p.name}>
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
                  </li>
                ) : (
                  <li key={p.name}>
                    <Link href={localeHref(locale, p.href)} className={cls}>{inner}</Link>
                  </li>
                );
              })}
            </ul>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── 확장 도구 (SOURCE · 곧 출시) ── */}
      <Section variant="alt">
        <Container>
          <Eyebrow className="mb-7">{t.toolEyebrow}</Eyebrow>
          <div className="grid sm:grid-cols-3 gap-5">
            {t.tools.map((tool, i) => {
              const Icon = toolIcons[i];
              const inner = (
                <>
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${tool.live ? 'bg-primary-lighter' : 'bg-gray-100'}`}>
                      <Icon className={`w-5 h-5 ${tool.live ? 'text-primary' : 'text-gray-500'}`} aria-hidden="true" />
                    </div>
                    <span className={`text-2xs font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full ${tool.live ? 'text-primary bg-primary-lighter' : 'text-gray-500 bg-gray-100'}`}>
                      {tool.live ? t.toolLive : t.toolBadge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1.5">{tool.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed break-keep">{tool.desc}</p>
                  {tool.live && (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      {t.detail}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </>
              );
              const base = 'scroll-mt-24 flex flex-col rounded-2xl border border-gray-200 bg-white p-6';
              return tool.live && tool.href ? (
                <Link key={tool.id} id={tool.id} href={localeHref(locale, tool.href)} className={`${base} hover:border-primary-light transition-colors no-underline`}>
                  {inner}
                </Link>
              ) : (
                <div key={tool.id} id={tool.id} className={base}>
                  {inner}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── 기술 기반 (SEED) 한 줄 ── */}
      <Section variant="default">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-5">
            <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center shrink-0">
              <Cpu className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <p className="flex-1 text-base text-gray-600 leading-relaxed break-keep">{t.seedLine}</p>
            <Link
              href={localeHref(locale, '/technology')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors shrink-0"
            >
              {t.seedCta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Link
            href={localeHref(locale, '/contact')}
            className="inline-flex items-center gap-1.5 text-base font-medium text-primary hover:text-primary-dark transition-colors"
          >
            {t.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AnimatedSection>
    </>
  );
}
