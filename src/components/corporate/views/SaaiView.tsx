import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ShoppingBag, ArrowUpRight, Sparkles, Archive, CalendarDays } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { JsonLd, softwareApplication } from '@/lib/structured-data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import { IntegratedLoopDiagram } from '@/components/mockups';

/**
 * SaaiView — AI POP product-detail composition (route kept at /products/saai).
 * AI POP is the SOURCE-family content product; SAAI stays the umbrella brand.
 * Operated on the separate consumer site saai.store.
 */

const C: Record<Locale, {
  heroTitle: string;
  heroSub: string;
  heroCta: string;
  heroNote: string;
  features: { title: string; desc: string }[];
  featureCta: string;
  featureNote: string;
  otherProducts: string;
}> = {
  ko: {
    heroTitle: '시선을 잡아야, 팔린다.',
    heroSub: '매대 앞을 지나는 그 몇 초. AI POP이 지금 이 매장에 맞는 광고와 홍보물을 대신 만들어, 손님의 시선을 붙잡아 드립니다.',
    heroCta: 'AI POP 시작하기',
    heroNote: 'saai.store에서 운영돼요',
    features: [
      { title: '매장 맞춤 POP 메이커', desc: '품명과 가격, 이벤트만 알려주면 1분 만에 시안이 여러 장. 마음에 드는 걸 골라 출력만 하세요.' },
      { title: '시즌·이벤트 콘텐츠', desc: '명절·신상·할인까지, 시즌에 맞는 홍보물을 매장 톤 그대로 한 번에 만들어 드려요.' },
      { title: '콘텐츠 아카이브', desc: '한번 만든 광고와 시즌 콘텐츠를 모아두고, 필요한 때 다시 꺼내 써요.' },
    ],
    featureCta: 'saai.store 바로가기',
    featureNote: 'AI POP은 SAAI(익명화 공간 AI)의 콘텐츠 제품으로, 별도 사이트 saai.store에서 운영됩니다.',
    otherProducts: '다른 제품 보기',
  },
  en: {
    heroTitle: 'Catch the eye, make the sale.',
    heroSub: 'You get a few seconds as shoppers pass the shelf. AI POP builds the in-store ads and signage that fit this store, right now — so the eye stops, and they buy.',
    heroCta: 'Get started with AI POP',
    heroNote: 'Operated on saai.store',
    features: [
      { title: 'Store-fit POP maker', desc: 'Just give us the product, price, and promo — get several drafts in a minute. Pick your favorite and print.' },
      { title: 'Seasonal & event content', desc: 'Holidays, new arrivals, sales — make on-brand promo pieces for any season in one go.' },
      { title: 'Content archive', desc: 'Keep every ad and seasonal piece you’ve made in one place, ready to pull up whenever you need it.' },
    ],
    featureCta: 'Go to saai.store',
    featureNote: 'AI POP is the content product within SAAI (anonymized spatial AI), operated on the separate site saai.store.',
    otherProducts: 'See other products',
  },
  jp: {
    heroTitle: '視線をつかめば、売れる。',
    heroSub: '棚の前を通り過ぎる、ほんの数秒。AI POP が今この店舗に合った広告と販促物を代わりに作り、お客様の視線をつかみます。',
    heroCta: 'AI POP を始める',
    heroNote: 'saai.store で運営しています',
    features: [
      { title: '店舗に合わせたPOPメーカー', desc: '品名と価格、イベントを伝えるだけで、1分で複数のデザイン案。気に入ったものを選んで、あとは出力するだけです。' },
      { title: '季節・イベントコンテンツ', desc: '年中行事・新商品・セールまで、季節に合った販促物を店舗のトーンそのままに一度に作成します。' },
      { title: 'コンテンツアーカイブ', desc: '一度作った広告や季節のコンテンツをまとめて保存し、必要なときにまた取り出して使えます。' },
    ],
    featureCta: 'saai.store へ',
    featureNote: 'AI POP は SAAI（匿名化空間AI）のコンテンツ製品で、別サイトの saai.store で運営しています。',
    otherProducts: '他の製品を見る',
  },
};

export default function SaaiView({ locale }: { locale: Locale }) {
  const t = C[locale];

  const featureIcons = [Sparkles, CalendarDays, Archive];

  return (
    <>
      <JsonLd data={softwareApplication({ name: 'AI POP', description: t.heroSub, path: '/products/saai', locale })} />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-16 lg:pt-40 lg:pb-20 text-center">
          <Breadcrumb items={[{ name: crumb('products', locale), path: '/products' }, { name: 'AI POP', path: '/products/saai' }]} locale={locale} tone="light" className="mb-6" />
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-lighter border border-primary/10 rounded-full text-sm text-primary font-medium mb-6">
            <ShoppingBag className="w-4 h-4" />
            AI POP · saai.store
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight break-keep mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-xl mx-auto break-keep mb-10">
            {t.heroSub}
          </p>
          <a
            href="https://saai.store"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-lg"
          >
            {t.heroCta}
            <ArrowUpRight className="w-5 h-5 ml-2" />
          </a>
          <p className="mt-4 text-sm text-gray-500">{t.heroNote}</p>
        </div>
      </section>

      {/* ── Integrated signal loop (hero-adjacent showcase) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <IntegratedLoopDiagram locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── Features (3 cards) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {t.features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <div key={f.title} className="card flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center shrink-0 mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed break-keep">{f.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://saai.store"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-lg"
            >
              {t.featureCta}
              <ArrowUpRight className="w-5 h-5 ml-2" />
            </a>
            <p className="mt-6 text-sm text-gray-500 break-keep">
              {t.featureNote}{' '}
              <Link href={localeHref(locale, '/products')} className="text-primary hover:text-primary-dark transition-colors">
                {t.otherProducts}
              </Link>
            </p>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
