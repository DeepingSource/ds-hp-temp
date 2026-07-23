'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Award, Building2 } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SaaiSymbol from '@/components/ui/SaaiSymbol';
import { COMPANY } from '@/lib/company-data';
import { localeHref, type Locale } from '@/lib/i18n';

const COPY: Record<Locale, {
  eyebrow: string;
  headline: string;
  sub: string;
  patentsLabel: string;
  nvidiaLabel: string;
  partnersLabel: string;
  aboutLinkText: string;
}> = {
  ko: {
    eyebrow: 'DEEPINGSOURCE · 가이드의 자격',
    headline: '2018년부터, 오프라인을 읽는 컴퓨터비전을 만들어 왔습니다.',
    sub: '얼굴과 신원은 지우고, 오직 의미 있는 매장의 흐름만 남깁니다. 기술 보안 특허 103건과 글로벌 파트너십이 입증하는 오프라인 전용 AI 전문성.',
    patentsLabel: '기술 특허 (KR 48 / US 41)',
    nvidiaLabel: 'NVIDIA Inception Premier 파트너',
    partnersLabel: '전국 주요 리테일·프랜차이즈 파트너',
    aboutLinkText: '딥핑소스 철학 및 미션 자세히 보기',
  },
  en: {
    eyebrow: 'DEEPINGSOURCE · YOUR GUIDE',
    headline: 'Since 2018, we have built computer vision that reads offline spaces.',
    sub: 'Erasing faces and identity on the spot — retaining only meaningful store dynamics. Backed by 103 patents and global enterprise partnerships.',
    patentsLabel: 'Tech Patents (KR 48 / US 41)',
    nvidiaLabel: 'NVIDIA Inception Premier Partner',
    partnersLabel: 'National Retail & Franchise Partners',
    aboutLinkText: 'Learn about DEEPINGSOURCE mission',
  },
  jp: {
    eyebrow: 'DEEPINGSOURCE · ガイドの資格',
    headline: '2018年から、オフラインを読み解くコンピュータビジョンを開発してきました。',
    sub: '顔と身元はその場で消去し、価値ある店舗の動線と流れだけを残します。103件の特許とグローバルパートナーシップが証明する技術。',
    patentsLabel: '技術特許 (KR 48 / US 41)',
    nvidiaLabel: 'NVIDIA Inception Premier パートナー',
    partnersLabel: '全国主要リテール・フランチャイズパートナー',
    aboutLinkText: 'DEEPINGSOURCE のミッション詳細',
  },
};

const PARTNERS = [
  'CU / BGF리테일',
  '올리브영',
  'GS25',
  '이마트24',
  '롯데쇼핑',
  '현대백화점',
  '신세계',
  '교보문고',
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
            {t.headline}
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
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">NVIDIA Inception</p>
              <p className="text-xs font-semibold text-gray-700">{t.nvidiaLabel}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">8+ Major Brands</p>
              <p className="text-xs font-semibold text-gray-700">{t.partnersLabel}</p>
            </div>
          </div>
        </div>

        {/* Partner Logo Ribbon */}
        <div className="pt-6 border-t border-gray-100">
          <p className="text-2xs font-bold uppercase tracking-widest text-gray-400 mb-4">
            TRUSTED BY LEADING ENTERPRISES
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {PARTNERS.map((brand, i) => (
              <span key={i} className="text-xs font-bold text-gray-400 tracking-wide hover:text-gray-700 transition-colors">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
