import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ShoppingBag, ArrowUpRight, Sparkles, Mail, Compass, LayoutGrid, MessageSquare, Archive, CalendarClock } from 'lucide-react';
import { localeHref, type Locale } from '@/lib/i18n';
import { JsonLd, softwareApplication } from '@/lib/structured-data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { crumb } from '@/lib/breadcrumb-labels';
import { IntegratedLoopDiagram } from '@/components/mockups';

/**
 * SaaiView — saai.store B2C suite for store owners (route kept at /products/saai).
 * Reorganized per the SA-team AHM deck (2026-07-03): the product is ONE flow —
 * a 5-step weekly operating loop (trend-fit → letter → POP → planogram → chat),
 * a daily layer (daily coach), an operating-guide archive, and a Free/Pro/premium model.
 * AI POP is the live flagship tool within this suite. Operated on saai.store.
 */

type Stage = 'live' | 'soon' | 'research';

type LoopStep = { name: string; role: string; stage: Stage };
type Tool = { name: string; desc: string; stage: Stage };
type Plan = { tier: string; price: string; desc: string; items: string[]; highlight?: boolean };

type Copy = {
  heroBadge: string;
  heroTitle: string;
  heroSub: string;
  heroCta: string;
  heroNote: string;
  stageLabels: Record<Stage, string>;
  loopEyebrow: string;
  loopHeading: string;
  loopSub: string;
  loopFootnote: string;
  loop: LoopStep[];
  toolsEyebrow: string;
  toolsHeading: string;
  toolsSub: string;
  tools: Tool[];
  planEyebrow: string;
  planHeading: string;
  planSub: string;
  plans: Plan[];
  planNote: string;
  featureCta: string;
  featureNote: string;
  otherProducts: string;
};

const C: Record<Locale, Copy> = {
  ko: {
    heroBadge: 'saai.store · 편의점 점주를 위한 AI',
    heroTitle: '발주부터 POP까지, 한 흐름으로.',
    heroSub: '무엇을 밀지 정하고, 트렌드를 받고, POP을 만들고, 진열을 점검하고, 무엇이든 물어보세요 — 카메라 없이 동작하는 SW로, 점주의 한 주를 한 흐름으로 잇습니다. 카드 등록 없이 무료로 시작합니다.',
    heroCta: 'saai.store 시작하기',
    heroNote: 'saai.store에서 무료로 운영돼요 · 카드 등록 없이',
    stageLabels: { live: '운영 중', soon: '출시 예정', research: '연구 중' },
    loopEyebrow: '제품의 본질 · 5단계 주간 운영 루프',
    loopHeading: '4개 도구가 아니라, 하나의 흐름입니다',
    loopSub: '각 단계의 산출물이 다음 단계의 입력이 됩니다. 밀 상품이 정해진 점주는 ①②를 건너뛰고 POP부터 시작하고, 마지막 챗이 모든 맥락을 기억한 채 루프를 닫습니다.',
    loopFootnote: '카메라 없이 동작하는 SW. POS가 없으면 적합·품질 추정으로 라벨하고, 챗은 근거가 없으면 답하지 않습니다.',
    loop: [
      { name: '트렌드핏', role: '무엇을 밀지 — 우리 매장 적합도 0–100점', stage: 'soon' },
      { name: '스토어레터', role: '트렌드·신상·날씨를 한 페이지로', stage: 'live' },
      { name: 'POP 제작', role: '상품·가격·문구가 프리필된 POP 4종', stage: 'live' },
      { name: '진열 가이드', role: '4존·연관 진열·식품안전 검증', stage: 'research' },
      { name: '챗', role: '맥락 기억·근거 인용으로 루프 종료', stage: 'research' },
    ],
    toolsEyebrow: '도구 · saai.store',
    toolsHeading: '점주의 반복되는 고민을, 각각 받아내는 도구',
    toolsSub: '실제 점주 인터뷰에서 출발한 도구들. 주간 루프 위에 일상 레이어를 얹어 매일 여는 이유를 만듭니다.',
    tools: [
      { name: 'POP 메이커', desc: '상품·가격·이벤트만 입력하면 1분 만에 포스터·배지·가격표·띠지. 월 무료 크레딧, 카드 등록 없이.', stage: 'live' },
      { name: '스토어레터', desc: '매주 수요일, 신상 HOT·날씨 진열 TIP·이벤트 캘린더를 한 통에. 무료 구독.', stage: 'live' },
      { name: '트렌드핏', desc: '반경 500m 상권·고객층 기반으로 신상 적합도를 0–100점으로. 근거와 경쟁 환경까지.', stage: 'soon' },
      { name: '진열 가이드', desc: '4존·연관 진열을 직접 짜고 점수로 평가. 매대 사진 한 장으로 빈칸·개선점까지.', stage: 'research' },
      { name: 'AI 챗 · 운영 코치', desc: '무엇이든 물어보면 근거와 함께 답하고, 비 예보엔 우산·핫바 전면을 그날그날 제안.', stage: 'research' },
      { name: '운영 가이드 아카이브', desc: '발주·세무·노무·양수도까지 36개 실무 가이드. 점주의 질문에서 출발해 상시 축적.', stage: 'live' },
    ],
    planEyebrow: '요금',
    planHeading: '무료로 시작하고, 필요한 만큼 더하세요',
    planSub: '카드 등록 없이 무료로 시작해, 매장 운영에 필요한 기능만 더합니다.',
    plans: [
      { tier: 'Free', price: '₩0', desc: '무료로 시작', items: ['템플릿 POP 무제한 · 월 무료 크레딧', '일상 챗 · 데일리 코치', '스토어레터 무료 구독'] },
      { tier: 'Pro', price: '₩9,900~', desc: '한 주 운영을 끝까지', items: ['AI 포스터 · 진열 점검 · 레터 풀', 'POS 상시 분석 · 챗 한도 상향', '5단계 루프 전체'], highlight: true },
      { tier: '프리미엄 · 자매 제품', price: '₩14,900~', desc: '보안·분석까지 한 번에', items: ['store care — CCTV 도난·이상 감지·온도 알림', 'store insight — 대시보드·정기 리포트', 'store care·insight로 매장 운영 전반까지'] },
    ],
    planNote: '* 요금은 베타 운영 중이며, 실제 구성은 달라질 수 있습니다.',
    featureCta: 'saai.store 바로가기',
    featureNote: 'saai.store는 SAAI(익명화 공간 AI)의 점주용 B2C 제품군으로, 별도 사이트에서 운영됩니다.',
    otherProducts: '다른 제품 보기',
  },
  en: {
    heroBadge: 'saai.store · AI for store owners',
    heroTitle: 'From ordering to POP, in one flow.',
    heroSub: 'Decide what to push, get the trends, make the POP, check the planogram, and ask anything — a camera-less app that strings a store owner’s whole week into one flow. Start free, no card required.',
    heroCta: 'Get started on saai.store',
    heroNote: 'Operated free on saai.store · no card required',
    stageLabels: { live: 'Live', soon: 'Coming soon', research: 'In research' },
    loopEyebrow: 'The core · 5-step weekly loop',
    loopHeading: 'Not four tools — one flow',
    loopSub: 'Each step’s output is the next step’s input. Owners who already know what to push skip ① ② and start at POP; the closing chat remembers all the context and closes the loop.',
    loopFootnote: 'A camera-less app. Without POS it labels with fit/quality estimates, and the chat won’t answer without a basis.',
    loop: [
      { name: 'trend fit', role: 'What to push — a 0–100 fit score for your store', stage: 'soon' },
      { name: 'store letter', role: 'Trends, new arrivals, weather on one page', stage: 'live' },
      { name: 'POP maker', role: 'Four POP types, prefilled with product, price, copy', stage: 'live' },
      { name: 'planogram guide', role: '4-zone, adjacency and food-safety checks', stage: 'research' },
      { name: 'chat', role: 'Context memory and cited answers close the loop', stage: 'research' },
    ],
    toolsEyebrow: 'Tools · saai.store',
    toolsHeading: 'A tool for each recurring worry',
    toolsSub: 'Tools that started from real owner interviews. A daily layer sits on the weekly loop to create a reason to open it every day.',
    tools: [
      { name: 'POP maker', desc: 'Enter product, price, and promo — get posters, badges, price tags, and shelf strips in a minute. Free monthly credits, no card.', stage: 'live' },
      { name: 'store letter', desc: 'Every Wednesday: HOT new arrivals, weather-based display tips, and an event calendar in one email. Free.', stage: 'live' },
      { name: 'trend fit', desc: 'A 0–100 fit score for new products based on your 500m trade area and customer mix — with reasons and the competitive picture.', stage: 'soon' },
      { name: 'planogram guide', desc: 'Lay out 4-zone and adjacency planograms and score them. One shelf photo surfaces gaps and fixes.', stage: 'research' },
      { name: 'AI chat · ops coach', desc: 'Ask anything and get cited answers; on a rain forecast it suggests umbrellas and hot snacks up front for the day.', stage: 'research' },
      { name: 'Operating-guide archive', desc: '36 hands-on guides from ordering to tax, labor, and store transfer — started from owners’ questions, always growing.', stage: 'live' },
    ],
    planEyebrow: 'Pricing',
    planHeading: 'Start free, add what you need',
    planSub: 'Start free with no card required, then add only the features your store needs.',
    plans: [
      { tier: 'Free', price: '₩0', desc: 'Start for free', items: ['Unlimited template POP · free monthly credits', 'Daily chat · daily coach', 'Free store-letter subscription'] },
      { tier: 'Pro', price: '₩9,900+', desc: 'Run the full week', items: ['AI posters · planogram check · letter pool', 'Always-on POS analysis · higher chat limits', 'The full 5-step loop'], highlight: true },
      { tier: 'Premium · sister products', price: '₩14,900+', desc: 'Security and analytics, together', items: ['store care — CCTV theft/anomaly & temperature alerts', 'store insight — dashboards & regular reports', 'store care & insight for end-to-end store operations'] },
    ],
    planNote: '* Pricing is in beta and the lineup may change.',
    featureCta: 'Go to saai.store',
    featureNote: 'saai.store is SAAI’s (anonymized spatial AI) B2C suite for store owners, operated on a separate site.',
    otherProducts: 'See other products',
  },
  jp: {
    heroBadge: 'saai.store · 店主のためのAI',
    heroTitle: '発注からPOPまで、ひとつの流れで。',
    heroSub: '何を推すか決め、トレンドを受け取り、POPを作り、陳列を点検し、何でも聞く — カメラなしで動くアプリが、店主の一週間をひとつの流れにつなぎます。カード登録なしで無料で開始。',
    heroCta: 'saai.store を始める',
    heroNote: 'saai.store で無料運営 · カード登録なし',
    stageLabels: { live: '運営中', soon: '公開予定', research: '研究中' },
    loopEyebrow: '製品の本質 · 5段階の週次運営ループ',
    loopHeading: '4つの道具ではなく、ひとつの流れ',
    loopSub: '各段階の成果物が次の段階の入力になります。推す商品が決まっている店主は①②を飛ばしてPOPから。最後のチャットがすべての文脈を覚えたままループを閉じます。',
    loopFootnote: 'カメラなしで動くアプリ。POSがなければ適合・品質の推定でラベルし、チャットは根拠がなければ答えません。',
    loop: [
      { name: 'トレンドフィット', role: '何を推すか — 自店適合度 0〜100点', stage: 'soon' },
      { name: 'ストアレター', role: 'トレンド・新商品・天気を1ページに', stage: 'live' },
      { name: 'POP制作', role: '商品・価格・文言をプリフィルしたPOP4種', stage: 'live' },
      { name: '陳列ガイド', role: '4ゾーン・関連陳列・食品安全の検証', stage: 'research' },
      { name: 'チャット', role: '文脈記憶・根拠引用でループを終了', stage: 'research' },
    ],
    toolsEyebrow: '道具 · saai.store',
    toolsHeading: '店主の繰り返す悩みを、それぞれ受けとめる道具',
    toolsSub: '実際の店主インタビューから出発した道具。週次ループの上に日常レイヤーを重ね、毎日開く理由をつくります。',
    tools: [
      { name: 'POPメーカー', desc: '商品・価格・イベントを入力するだけで1分でポスター・バッジ・価格表・띠지。月の無料クレジット、カード登録なし。', stage: 'live' },
      { name: 'ストアレター', desc: '毎週水曜、新商品HOT・天気の陳列TIP・イベントカレンダーを1通に。無料購読。', stage: 'live' },
      { name: 'トレンドフィット', desc: '半径500mの商圏・客層をもとに新商品の適合度を0〜100点で。根拠と競合環境まで。', stage: 'soon' },
      { name: '陳列ガイド', desc: '4ゾーン・関連陳列を自分で組み、点数で評価。棚の写真1枚で空き・改善点まで。', stage: 'research' },
      { name: 'AIチャット · 運営コーチ', desc: '何でも聞けば根拠とともに回答し、雨予報には傘・ホットスナックの前面陳列をその日ごとに提案。', stage: 'research' },
      { name: '運営ガイドアーカイブ', desc: '発注・税務・労務・譲渡まで36の実務ガイド。店主の質問から出発し常時蓄積。', stage: 'live' },
    ],
    planEyebrow: '料金',
    planHeading: '無料で始め、必要な分だけ追加',
    planSub: 'カード登録なしで無料で始め、店舗運営に必要な機能だけ追加します。',
    plans: [
      { tier: 'Free', price: '₩0', desc: '無料で開始', items: ['テンプレPOP無制限 · 月の無料クレジット', '日常チャット · デイリーコーチ', 'ストアレター無料購読'] },
      { tier: 'Pro', price: '₩9,900〜', desc: '一週間の運営を最後まで', items: ['AIポスター · 陳列点検 · レタープール', 'POS常時分析 · チャット上限引き上げ', '5段階ループ全体'], highlight: true },
      { tier: 'プレミアム · 姉妹製品', price: '₩14,900〜', desc: 'セキュリティと分析をまとめて', items: ['store care — CCTV盗難・異常検知・温度アラート', 'store insight — ダッシュボード・定期レポート', 'store care・insightで店舗運営の全体まで'] },
    ],
    planNote: '* 料金はベータ運用中で、構成は変わり得ます。',
    featureCta: 'saai.store へ',
    featureNote: 'saai.store は SAAI（匿名化空間AI）の店主向けB2C製品群で、別サイトで運営しています。',
    otherProducts: '他の製品を見る',
  },
};

const stageStyle: Record<Stage, string> = {
  live: 'bg-emerald-50 text-emerald-700',
  soon: 'bg-amber-50 text-amber-700',
  research: 'bg-gray-100 text-gray-500',
};

export default function SaaiView({ locale }: { locale: Locale }) {
  const t = C[locale];
  const toolIcons = [Sparkles, Mail, Compass, LayoutGrid, MessageSquare, Archive];

  return (
    <div className="bg-white">
      <JsonLd data={softwareApplication({ name: 'saai.store', description: t.heroSub, path: '/products/saai', locale })} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-16 lg:pt-40 lg:pb-20 text-center">
          <Breadcrumb items={[{ name: crumb('products', locale), path: '/products' }, { name: 'saai.store', path: '/products/saai' }]} locale={locale} tone="light" className="mb-6 justify-center" />
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-lighter border border-primary/10 rounded-full text-sm text-primary font-medium mb-6">
            <ShoppingBag className="w-4 h-4" />
            {t.heroBadge}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight break-keep mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-xl mx-auto break-keep mb-10">
            {t.heroSub}
          </p>
          <a href="https://saai.store" target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg">
            {t.heroCta}
            <ArrowUpRight className="w-5 h-5 ml-2" />
          </a>
          <p className="mt-4 text-sm text-gray-500">{t.heroNote}</p>
          <div className="mt-12 mx-auto max-w-2xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gray-200 shadow-card">
              <Image
                src="/images/storeagent-ai-pop-mockup.webp"
                alt={t.tools[0].name}
                fill
                priority
                sizes="(min-width:768px) 672px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Integrated signal loop (hero-adjacent showcase) ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <IntegratedLoopDiagram locale={locale} />
        </div>
      </AnimatedSection>

      {/* ── 5-step weekly loop ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-3">{t.loopEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{t.loopHeading}</h2>
            <p className="text-base text-gray-500 leading-relaxed break-keep">{t.loopSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {t.loop.map((s, i) => (
              <div key={s.name} className="relative rounded-2xl border border-gray-200 bg-white p-5 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-full bg-primary-lighter text-primary text-sm font-bold flex items-center justify-center">{i + 1}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${stageStyle[s.stage]}`}>{t.stageLabels[s.stage]}</span>
                </div>
                <div className="text-base font-bold text-gray-900">{s.name}</div>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed break-keep">{s.role}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-6 break-keep">{t.loopFootnote}</p>
        </div>
      </AnimatedSection>

      {/* ── Tool suite ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-3">{t.toolsEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{t.toolsHeading}</h2>
            <p className="text-base text-gray-500 leading-relaxed break-keep">{t.toolsSub}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.tools.map((tool, i) => {
              const Icon = toolIcons[i] ?? CalendarClock;
              return (
                <div key={tool.name} className="card h-full flex flex-col">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${stageStyle[tool.stage]}`}>{t.stageLabels[tool.stage]}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.name}</h3>
                  <p className="text-base text-gray-500 leading-relaxed break-keep">{tool.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ── Business model: Free / Pro / Premium ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary mb-3">{t.planEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-keep">{t.planHeading}</h2>
            <p className="text-base text-gray-500 leading-relaxed break-keep">{t.planSub}</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-5">
            {t.plans.map((p) => (
              <div
                key={p.tier}
                className={`rounded-2xl border p-7 flex flex-col bg-white ${p.highlight ? 'border-primary ring-1 ring-primary/20' : 'border-gray-200'}`}
              >
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{p.tier}</h3>
                  <span className="text-base font-bold text-primary">{p.price}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4 break-keep">{p.desc}</p>
                <ul className="space-y-2 mt-auto">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-gray-600 break-keep">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-6 break-keep">{t.planNote}</p>
        </div>
      </AnimatedSection>

      {/* ── CTA ── */}
      <AnimatedSection className="py-16 lg:py-24 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <a href="https://saai.store" target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg">
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
      </AnimatedSection>
    </div>
  );
}
