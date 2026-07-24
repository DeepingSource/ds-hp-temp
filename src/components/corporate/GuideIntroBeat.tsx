'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, Award, Building2 } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SaaiSymbol from '@/components/ui/SaaiSymbol';
import { COMPANY } from '@/lib/company-data';
import { signature } from '@/lib/brand-canon';
import { localeHref, type Locale } from '@/lib/i18n';

/**
 * GuideIntroBeat — 해결자 자격 (home #3, 정제계획 §2-2 · D8).
 * 자격 논리 3단: ① 연차 부정(오래 한 것 자체는 자격이 아니다) → ② 필요조건(공간의
 * 문제는 Physical AI를 요구한다) → ③ 자격 주장(그것을 2018년부터 만들어 왔다).
 * 특허·NVIDIA·파트너 지표 카드와 로고 밴드는 결론의 증거로 유지.
 * 하단 브릿지 킥커(signature)가 다크 해답 섹션(SpaceAiAnswerBeat)으로 넘긴다 (§2-1 · D6).
 */
const COPY: Record<Locale, {
  eyebrow: string;
  headline: [string, string];
  sub: string;
  patentsLabel: string;
  nvidiaLabel: string;
  partnersMetric: string;
  partnersLabel: string;
  trustedByLabel: string;
  aboutLinkText: string;
}> = {
  ko: {
    eyebrow: '딥핑소스 · 왜 우리인가',
    headline: ['오래돼서 잘하는 게 아닙니다.', '이 하나만 파고들었기 때문입니다.'],
    sub: '매장의 문제는 텍스트가 아니라 공간에서 일어납니다. 동선과 체류를 좌표로 읽는 Physical AI를, 얼굴은 지운 채로 2018년부터 만들어 왔습니다. 지금 당신의 매장이 겪는 문제, 우리가 가장 먼저 답할 수 있습니다.',
    patentsLabel: '기술 특허 (KR 48 / US 41)',
    nvidiaLabel: 'NVIDIA Inception Premier 파트너',
    partnersMetric: '주요 브랜드 8+',
    partnersLabel: '전국 주요 리테일·프랜차이즈 파트너',
    trustedByLabel: '함께하는 기업들',
    aboutLinkText: '딥핑소스가 일하는 방식 보기',
  },
  en: {
    eyebrow: 'DEEPINGSOURCE · WHY US',
    headline: ["Years alone don't make us good at this.", "We're good because we've dug into only this."],
    sub: "Store problems happen in space, not in text. We've built Physical AI that reads movement and dwell as coordinates, faces erased, since 2018. Whatever your store is facing right now, we're the first ones who can answer it.",
    patentsLabel: 'Tech Patents (KR 48 / US 41)',
    nvidiaLabel: 'NVIDIA Inception Premier Partner',
    partnersMetric: '8+ Major Brands',
    partnersLabel: 'National Retail & Franchise Partners',
    trustedByLabel: 'Companies we work with',
    aboutLinkText: 'See how DEEPINGSOURCE works',
  },
  jp: {
    eyebrow: 'DEEPINGSOURCE · なぜ私たちか',
    headline: ['長くやってきたから、ではありません。', 'この一つだけを、深く掘ってきたからです。'],
    sub: '店舗の問題はテキストではなく、空間で起きています。動線と滞在を座標で読むPhysical AIを、顔を消したまま2018年から作り続けてきました。今、あなたの店舗が抱える問題に、私たちが最初に答えます。',
    patentsLabel: '技術特許 (KR 48 / US 41)',
    nvidiaLabel: 'NVIDIA Inception Premier パートナー',
    partnersMetric: '主要ブランド 8+',
    partnersLabel: '全国主要リテール・フランチャイズパートナー',
    trustedByLabel: '共に歩む企業',
    aboutLinkText: 'DEEPINGSOURCEの仕事の進め方を見る',
  },
};

const PARTNERS: { name: string; logoUrl?: string }[] = [
  { name: 'CU / BGF리테일' },
  { name: '올리브영' },
  { name: 'GS25' },
  { name: '이마트24' },
  { name: '롯데쇼핑' },
  { name: '현대백화점' },
  { name: '신세계' },
  { name: '교보문고' },
];

export default function GuideIntroBeat({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <AnimatedSection className="py-16 lg:py-24 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Message */}
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-3">
            <SaaiSymbol className="w-3.5 h-3.5 text-primary" />
            {t.eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-4 break-keep font-display">
            {t.headline[0]}
            <br />
            {t.headline[1]}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed break-keep mb-4">
            {t.sub}
          </p>
          <Link
            href={localeHref(locale, '/company/about')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            <span>{t.aboutLinkText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{COMPANY.patents}</p>
              <p className="text-xs font-semibold text-gray-700">{t.patentsLabel}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">NVIDIA Inception</p>
              <p className="text-xs font-semibold text-gray-700">{t.nvidiaLabel}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{t.partnersMetric}</p>
              <p className="text-xs font-semibold text-gray-700">{t.partnersLabel}</p>
            </div>
          </div>
        </div>

        {/* Partner Logo Ribbon */}
        <div className="pt-6 border-t border-gray-100">
          <p className="text-2xs font-bold uppercase tracking-widest text-gray-400 mb-4">
            {t.trustedByLabel}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {PARTNERS.map((brand, i) => (
              brand.logoUrl ? (
                <img
                  key={i}
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="h-6 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                />
              ) : (
                <span key={i} className="text-xs font-bold text-gray-400 tracking-wide hover:text-gray-700 transition-colors">
                  {brand.name}
                </span>
              )
            ))}
          </div>
        </div>

        {/* Bridge kicker — 자격의 결론 → 다크 해답 섹션(SpaceAiAnswerBeat) 진입 (§2-1 · D6) */}
        <p className="mt-14 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 break-keep font-display tracking-tight">
          {signature[locale]}
        </p>
      </div>
    </AnimatedSection>
  );
}
