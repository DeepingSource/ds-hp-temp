import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProductCard, { type ProductCardProps } from '@/components/products/ProductCard';
import MultiStoreDashboardMockup from '@/components/mockups/MultiStoreDashboardMockup';
import { BarChart3, BrainCircuit, Store, ShoppingBag, ArrowRight } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { solutionTaglines } from '@/lib/brand-canon';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import { JsonLd, itemList, softwareApplication } from '@/lib/structured-data';

/**
 * ProductsView — shared products composition.
 * Rendered by `/products` (en), `/ko/products`, `/jp/products` with the locale prop
 * (PLAN_v1.1 D6 path-prefix i18n). Product names stay identical across locales.
 */

const C: Record<Locale, {
  eyebrow: string;
  heroTitle: string;
  heroSub: [string, string];
  mockupNote: string;
  products: { name: string; tagline: string; desc: string }[];
  flowHeading: string;
  flowSub: string;
  flow: { step: string; note: string; tier: string }[];
  cta: string;
}> = {
  ko: {
    eyebrow: 'PRODUCTS',
    heroTitle: '관찰 · 분석 · 제안 · 학습',
    heroSub: [
      '매장은 창고가 아니라 무대입니다. 이미 달린 CCTV 위에서 공간을 읽고, 알리고, 실행하는',
      '세 개의 store가 하나의 흐름으로 이어집니다.',
    ],
    mockupNote: '* AI 분석 예시 화면입니다.',
    products: [
      { name: 'Store Insight', tagline: '어제를 읽다 · 엔터프라이즈 공간 분석', desc: 'POS가 미처 세지 못한 것을 봅니다. 둘러보다 그냥 나간 손님까지 — 어디서 멈추고 무엇을 놓쳤는지, 어제의 매장을 읽습니다.' },
      { name: 'Store Agent', tagline: '다음을 실행하다 · 운영하는 AI', desc: '보는 AI를 넘어, 매장을 운영하는 AI. 숫자로 무엇을 할지까지 권고하고 발주로 잇습니다. 권고는 AI가, 결정은 사람이.' },
      { name: 'Store Care', tagline: '지금을 알리다 · 점주용', desc: '24시간 매장을 대신 지켜보는 눈. 쏟아지는 알림이 아니라, 정작 필요한 순간만 골라 실시간으로 짚어드립니다.' },
      { name: 'SAAI', tagline: '매장의 콘텐츠 · B2C', desc: '손님의 시선을 잡는 매장 광고를, 이 매장에 맞춰. POP부터 시즌 콘텐츠까지 1분이면 시안 여러 장, 골라서 출력만.' },
    ],
    flowHeading: '세 개의 store, 하나의 흐름',
    flowSub: '어제를 읽고, 지금을 알리고, 다음을 실행합니다 — 같은 데이터 위에서.',
    flow: [
      { step: '알리다', note: '지금을 짚어 알립니다', tier: '점주 · SMB' },
      { step: '읽다', note: '어제를 데이터로 읽습니다', tier: '엔터프라이즈' },
      { step: '실행하다', note: '다음 한 수를 권고합니다', tier: '엔터프라이즈' },
      { step: '표현하다', note: '콘텐츠로 시선을 잡습니다', tier: 'B2C' },
    ],
    cta: '어떤 제품이 맞을지 상담하기',
  },
  en: {
    eyebrow: 'PRODUCTS',
    heroTitle: 'Observe · Analyze · Suggest · Learn',
    heroSub: [
      'A store is a stage, not a warehouse. On the CCTV you already have, three stores read,',
      'flag, and act on your space — as one flow.',
    ],
    mockupNote: '* Sample AI analysis screen.',
    products: [
      { name: 'Store Insight', tagline: 'Reads yesterday · Enterprise spatial analytics', desc: 'Sees what the POS never counted. The shoppers who browsed and left — where they stopped, what they missed. It reads yesterday in your store.' },
      { name: 'Store Agent', tagline: 'Acts on next · AI that operates space', desc: 'Beyond AI that sees, to AI that operates. It tells you what to do with the numbers and turns it into orders. The AI recommends; the human decides.' },
      { name: 'Store Care', tagline: 'Flags the now · For owners', desc: 'A pair of eyes on your store, 24/7. Not a flood of alerts — only the moments that matter, flagged in real time.' },
      { name: 'SAAI', tagline: 'Store content · B2C', desc: 'Eye-catching store ads, tuned to this store. From POP to seasonal campaigns: several drafts in a minute — just pick one and print.' },
    ],
    flowHeading: 'Three stores, one flow',
    flowSub: 'Read yesterday, flag the now, act on next — all on the same data.',
    flow: [
      { step: 'Alert', note: 'Flags the now', tier: 'Owners · SMB' },
      { step: 'Read', note: 'Reads yesterday as data', tier: 'Enterprise' },
      { step: 'Act', note: 'Recommends the next move', tier: 'Enterprise' },
      { step: 'Express', note: 'Catches the eye with content', tier: 'B2C' },
    ],
    cta: 'Talk to us about the right product',
  },
  jp: {
    eyebrow: 'PRODUCTS',
    heroTitle: '観察 · 分析 · 提案 · 学習',
    heroSub: [
      '店舗は倉庫ではなく、舞台です。すでにあるCCTVの上で、空間を読み、知らせ、動かす',
      '三つの store が、ひとつの流れでつながります。',
    ],
    mockupNote: '※ AI分析のサンプル画面です。',
    products: [
      { name: 'Store Insight', tagline: '昨日を読む · エンタープライズ空間分析', desc: 'POSが数え切れなかったものまで見ます。見て回っただけで帰った客が、どこで止まり、何を見逃したか — 昨日の店舗を読み解きます。' },
      { name: 'Store Agent', tagline: '次を動かす · 空間を運営するAI', desc: '見るAIを超え、空間を運営するAIへ。数字で何をすべきかまで提案し、発注へつなげます。提案はAIが、決定は人が。' },
      { name: 'Store Care', tagline: '今を知らせる · 店主向け', desc: '24時間、店舗を代わりに見守る目。通知の洪水ではなく、本当に必要な瞬間だけを選び、リアルタイムでお知らせします。' },
      { name: 'SAAI', tagline: '店舗のコンテンツ · B2C', desc: '客の視線を捉える店舗広告を、この店舗に合わせて。POPから季節コンテンツまで、1分で複数の案 — 選んで印刷するだけ。' },
    ],
    flowHeading: '三つの store、ひとつの流れ',
    flowSub: '昨日を読み、今を知らせ、次を動かす — 同じデータの上で。',
    flow: [
      { step: '知らせる', note: '今を捉えて知らせます', tier: '店主 · SMB' },
      { step: '読む', note: '昨日をデータで読みます', tier: 'エンタープライズ' },
      { step: '動かす', note: '次の一手を提案します', tier: 'エンタープライズ' },
      { step: '表現する', note: 'コンテンツで視線を捉えます', tier: 'B2C' },
    ],
    cta: 'どの製品が最適かご相談する',
  },
};

export default function ProductsView({ locale }: { locale: Locale }) {
  const t = C[locale];

  const icons = [BarChart3, BrainCircuit, Store, ShoppingBag];
  const productMeta: Pick<ProductCardProps, 'href' | 'external' | 'badge' | 'kicker'>[] = [
    { href: localeHref(locale, '/products/store-insight'), kicker: solutionTaglines.insight[locale] },
    { href: localeHref(locale, '/products/store-agent'), kicker: solutionTaglines.agent[locale] },
    { href: 'https://storecare.ai', external: true, badge: 'storecare.ai', kicker: solutionTaglines.care[locale] },
    { href: 'https://saai.store', external: true, badge: 'saai.store' },
  ];
  const products: ProductCardProps[] = t.products.map((p, i) => ({
    icon: icons[i],
    name: p.name,
    tagline: p.tagline,
    desc: p.desc,
    ...productMeta[i],
  }));

  const flowNames = ['Store Care', 'Store Insight', 'Store Agent', 'SAAI'];

  const productPaths = ['/products/store-insight', '/products/store-agent', '/products/store-care', '/products/saai'];

  return (
    <>
      <JsonLd
        data={itemList(
          t.products.map((p, i) =>
            softwareApplication({ name: p.name, description: p.desc, path: productPaths[i], locale }),
          ),
        )}
      />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-16 lg:pt-36 lg:pb-20 text-center">
          <Breadcrumb items={[{ name: crumb('products', locale), path: '/products' }]} locale={locale} tone="light" className="mb-6" />
          <p className="text-sm font-semibold text-primary mb-4 tracking-wide">{t.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight break-keep mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto break-keep">
            {t.heroSub[0]}
            <br className="hidden sm:block" /> {t.heroSub[1]}
          </p>
        </div>
      </section>

      {/* ── 플랫폼 미리보기 (하나의 화면에서 모든 매장) ── */}
      <AnimatedSection className="pb-12 lg:pb-16 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <MultiStoreDashboardMockup locale={locale} />
          <p className="mt-6 text-center text-xs text-gray-500 break-keep">
            {t.mockupNote}
          </p>
        </div>
      </AnimatedSection>

      {/* ── 진열대: 4 제품 그리드 ── */}
      <AnimatedSection className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-6">
            {products.map((p) => (
              <ProductCard key={p.name} {...p} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ── 포지셔닝 노트 ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">
              {t.flowHeading}
            </h2>
            <p className="text-gray-500 break-keep">
              {t.flowSub}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.flow.map((item, i) => (
              <div key={flowNames[i]} className="card flex flex-col">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  {item.step}
                </p>
                <p className="text-lg font-bold text-gray-900 mb-1">{flowNames[i]}</p>
                <p className="text-sm text-gray-500 mb-3 break-keep">{item.note}</p>
                <span className="mt-auto text-xs text-gray-500 font-medium">{item.tier}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href={localeHref(locale, '/contact')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              {t.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
