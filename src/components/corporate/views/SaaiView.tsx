import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ShoppingBag, ArrowUpRight, Sparkles, Archive, CalendarDays } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { JsonLd, softwareApplication } from '@/lib/structured-data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import { IntegratedLoopDiagram } from '@/components/mockups';

/**
 * SaaiView — shared SAAI product-detail composition.
 * Rendered by `/products/saai` (en), `/ko/products/saai`, `/jp/products/saai`
 * with the locale prop. Product name stays identical. External CTAs keep saai.store.
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
    heroSub: '매대 앞을 지나는 그 몇 초. SAAI가 지금 이 매장에 맞는 광고와 홍보물을 대신 만들어, 손님의 시선을 붙잡아 드립니다.',
    heroCta: 'SAAI 시작하기',
    heroNote: 'saai.store에서 운영돼요',
    features: [
      { title: '매장 맞춤 POP 메이커', desc: '품명과 가격, 이벤트만 알려주면 1분 만에 시안이 여러 장. 마음에 드는 걸 골라 출력만 하세요.' },
      { title: '트렌드Fit', desc: '쏟아지는 신상, 우리 매장엔 맞을까. 우리 상권과 단골에 맞춰 적합도를 점수로 매겨, 뭘 들일지 미리 짚어드려요.' },
      { title: '콘텐츠 아카이브', desc: '한번 만든 광고와 시즌 콘텐츠를 모아두고, 필요한 때 다시 꺼내 써요.' },
    ],
    featureCta: 'saai.store 바로가기',
    featureNote: 'SAAI는 Deeping Source의 공간 지능(Spatial Agentic AI)에서 출발한 B2C 매장 마케팅 서비스로, 별도 사이트 saai.store에서 운영됩니다.',
    otherProducts: '다른 제품 보기',
  },
  en: {
    heroTitle: 'Catch the eye, make the sale.',
    heroSub: 'You get a few seconds as shoppers pass the shelf. SAAI builds the in-store ads and signage that fit this store, right now — so the eye stops, and they buy.',
    heroCta: 'Get started with SAAI',
    heroNote: 'Operated on saai.store',
    features: [
      { title: 'Store-fit POP maker', desc: 'Just give us the product, price, and promo — get several drafts in a minute. Pick your favorite and print.' },
      { title: 'TrendFit', desc: 'New products flood in — but will they sell here? We score each one for fit with your neighborhood and your regulars, so you know what to stock before you order.' },
      { title: 'Content archive', desc: 'Keep every ad and seasonal piece you’ve made in one place, ready to pull up whenever you need it.' },
    ],
    featureCta: 'Go to saai.store',
    featureNote: 'SAAI is Deeping Source’s B2C store-marketing service, born from our spatial agentic AI and operated on the separate site saai.store.',
    otherProducts: 'See other products',
  },
  jp: {
    heroTitle: '視線をつかめば、売れる。',
    heroSub: '棚の前を通り過ぎる、ほんの数秒。SAAI が今この店舗に合った広告と販促物を代わりに作り、お客様の視線をつかみます。',
    heroCta: 'SAAI を始める',
    heroNote: 'saai.store で運営しています',
    features: [
      { title: '店舗に合わせたPOPメーカー', desc: '品名と価格、イベントを伝えるだけで、1分で複数のデザイン案。気に入ったものを選んで、あとは出力するだけです。' },
      { title: 'トレンドFit', desc: '次々と出る新商品、うちの店で売れる? 商圏と常連客に合わせて適合度を点数化し、何を仕入れるか前もってお知らせします。' },
      { title: 'コンテンツアーカイブ', desc: '一度作った広告や季節のコンテンツをまとめて保存し、必要なときにまた取り出して使えます。' },
    ],
    featureCta: 'saai.store へ',
    featureNote: 'SAAI は Deeping Source の空間知能(Spatial Agentic AI)から生まれた B2C 店舗マーケティングサービスで、別サイトの saai.store で運営しています。',
    otherProducts: '他の製品を見る',
  },
};

export default function SaaiView({ locale }: { locale: Locale }) {
  const t = C[locale];

  const featureIcons = [Sparkles, Archive, CalendarDays];

  return (
    <>
      <JsonLd data={softwareApplication({ name: 'SAAI', description: t.heroSub, path: '/products/saai', locale })} />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-16 lg:pt-40 lg:pb-20 text-center">
          <Breadcrumb items={[{ name: crumb('products', locale), path: '/products' }, { name: 'SAAI', path: '/products/saai' }]} locale={locale} tone="light" className="mb-6" />
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-lighter border border-primary/10 rounded-full text-sm text-primary font-medium mb-6">
            <ShoppingBag className="w-4 h-4" />
            SAAI · saai.store
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
