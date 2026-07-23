'use client';

import Link from 'next/link';
import { ArrowRight, Bot, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SaaiSymbol from '@/components/ui/SaaiSymbol';
import { localeHref, type Locale } from '@/lib/i18n';

const COPY: Record<Locale, {
  eyebrow: string;
  headline: string;
  sub: string;
  generalAiTitle: string;
  generalAiDesc: string;
  generalAiPoints: string[];
  spatialAiTitle: string;
  spatialAiDesc: string;
  spatialAiPoints: string[];
  ctaText: string;
}> = {
  ko: {
    eyebrow: '공간의 해답',
    headline: '공간엔, 공간의 AI.',
    sub: '범용 텍스트/이미지 AI는 당신 매장의 동선과 매대를 보지 못합니다. SAAI는 매장의 공간과 흐름을 있는 그대로 읽어, 일반론이 아닌 당신 매장만을 위한 답을 제시합니다.',
    generalAiTitle: '범용 AI (ChatGPT · Claude 등)',
    generalAiDesc: '텍스트와 정적 이미지에는 강하지만, 매장 안의 물리적 동선과 현장 상황을 알지 못합니다.',
    generalAiPoints: [
      '매장 동선과 재고 상태를 실시간으로 인지하지 못함',
      '교과서적인 이론과 일반론적인 조언에 그침',
      '현장 직원이 당장 실행할 수 있는 행동 가이드 부재',
    ],
    spatialAiTitle: '공간 AI SAAI (Spatial AI)',
    spatialAiDesc: '얼굴을 지운 익명화 비전 기술로 매장의 모든 순간과 동선을 실시간으로 읽고 학습합니다.',
    spatialAiPoints: [
      'CCTV 동선 · 결제 · 재고를 통합한 매장 전용 지식 구조',
      '현장에서 오늘 바로 실행할 수 있는 1가지 행동 제안',
      '단 1개 매장에서의 성공 패턴을 전국 매장으로 전파',
    ],
    ctaText: '공간 AI의 3단계 작동 방식 보기',
  },
  en: {
    eyebrow: 'THE SPATIAL ANSWER',
    headline: 'For spaces, spatial AI.',
    sub: 'General text/image AI cannot see your aisles or footfall. SAAI reads your physical store space as it is, providing immediate operational answers tailored specifically to your store.',
    generalAiTitle: 'General AI (ChatGPT, Claude)',
    generalAiDesc: 'Powerful for text & static images, but blind to live store dynamics and physical footfall.',
    generalAiPoints: [
      'Cannot sense real-time floor movement or inventory state',
      'Limited to textbook theories and generic recommendations',
      'Lacks immediate, actionable guides for store staff',
    ],
    spatialAiTitle: 'Spatial AI — SAAI',
    spatialAiDesc: 'Anonymized vision technology reading live store movements without capturing identities.',
    spatialAiPoints: [
      'Store-native ontology combining CCTV, POS, and stock state',
      'Direct, single daily action guide for staff on duty',
      'Propagates proven store intelligence across 50+ locations',
    ],
    ctaText: 'Explore the 3-step operation loop',
  },
  jp: {
    eyebrow: '空間の回答',
    headline: '空間には、空間のAI。',
    sub: '汎用テキスト/画像AIは店舗の動線や棚を見ることができません。SAAIは店舗の空間と流れをそのまま読み取り、一般論ではなく貴社店舗専用の回答を提示します。',
    generalAiTitle: '汎用 AI (ChatGPT · Claude 等)',
    generalAiDesc: 'テキストや静止画には強いものの、店舗内の物理的動線や現場の状況を把握できません。',
    generalAiPoints: [
      '店舗の動線や在庫状態をリアルタイムで認識できない',
      '教科書的な理論や一般論的な助言にとどまる',
      '現場スタッフが今すぐ実行できる行動ガイドがない',
    ],
    spatialAiTitle: '空間 AI SAAI (Spatial AI)',
    spatialAiDesc: '顔を消去した匿名化ビジョン技術で、店舗のすべての瞬間と動線をリアルタイムで読み取ります。',
    spatialAiPoints: [
      'CCTV動線・POS・在庫を統合した店舗専用ナレッジ構造',
      '現場で今日すぐ実行できる1つの行動提案',
      '1店舗での successful パターンを全店舗へ波及',
    ],
    ctaText: '空間AIの3ステップ運用ル-プを見る',
  },
};

export default function SpaceAiAnswerBeat({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <AnimatedSection className="py-20 lg:py-28 section-dark noise-overlay text-white relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary-light mb-4">
            <SaaiSymbol className="w-3.5 h-3.5 text-primary-light" />
            {t.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 font-display break-keep">
            {t.headline}
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed break-keep">
            {t.sub}
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: General AI */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 lg:p-10 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-300">{t.generalAiTitle}</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 break-keep">
                {t.generalAiDesc}
              </p>
              <ul className="space-y-3">
                {t.generalAiPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span className="break-keep">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800 text-2xs text-slate-500 uppercase tracking-wider">
              Generic Text Model
            </div>
          </div>

          {/* Right: Spatial AI (SAAI) */}
          <div className="rounded-3xl border border-primary/40 bg-primary/10 p-8 lg:p-10 backdrop-blur-sm flex flex-col justify-between relative shadow-2xl shadow-primary/10">
            <div className="absolute top-4 right-4 bg-primary text-white text-2xs px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5">
              <SaaiSymbol className="w-3 h-3 text-white" />
              SAAI Native
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                  <SaaiSymbol className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{t.spatialAiTitle}</h3>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed mb-6 break-keep">
                {t.spatialAiDesc}
              </p>
              <ul className="space-y-3">
                {t.spatialAiPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="break-keep">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-primary/20 flex items-center justify-between">
              <span className="text-2xs text-primary-light uppercase tracking-wider font-bold">
                Spatial Anonymized Agentic Intelligence
              </span>
              <a
                href="#plan-section"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-light hover:text-white transition-colors"
              >
                <span>{t.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
