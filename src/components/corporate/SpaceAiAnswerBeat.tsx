'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ArrowRight, Bot, CheckCircle2, XCircle } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SaaiSymbol from '@/components/ui/SaaiSymbol';
import { type Locale } from '@/lib/i18n';

const GenericAiMockup = dynamic(() => import('@/components/mockups/GenericAiMockup'), {
  loading: () => <div className="h-64 animate-pulse rounded-2xl bg-slate-800/40" />,
});

const StoreInsightMockup = dynamic(() => import('@/components/mockups/StoreInsightMockup'), {
  // MockupViewport(phone 390×844) 자리 예약과 동일 비율 — 로드 전후 CLS 0
  loading: () => <div className="aspect-[390/844] animate-pulse rounded-2xl bg-slate-800/40" />,
});

type Pillar = { letter: string; name: string; title: string; desc: string };

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

  pillarsEyebrow: string;
  pillarsTitle: string;
  pillarsSub: string;
  pillars: Pillar[];
}> = {
  ko: {
    eyebrow: '공간의 해답',
    headline: '공간엔, 공간의 AI.',
    sub: '같은 질문을 던져도, 답은 다릅니다. SAAI는 공간을 직접 읽고, 일반론이 아니라 당신 매장의 답을 내놓습니다.',
    generalAiTitle: '범용 AI (ChatGPT · Claude 등)',
    generalAiDesc: '텍스트와 정적 이미지에는 강하지만, 매장 안의 물리적 동선과 현장 상황을 알지 못합니다.',
    generalAiPoints: [
      '지금 매장에 몇 명이 있는지 모릅니다',
      '어느 매장에나 통하는 일반론을 답합니다',
      '오늘 무엇을 옮길지는 말하지 못합니다',
    ],
    spatialAiTitle: '공간 AI SAAI (Spatial AI)',
    spatialAiDesc: '얼굴을 지운 익명화 비전 기술로 매장의 모든 순간과 동선을 실시간으로 읽고 학습합니다.',
    spatialAiPoints: [
      '동선·결제·재고를 한 데이터로 묶어 봅니다',
      '오늘 실행할 행동 1가지를 짚어 줍니다',
      '한 매장의 성공을 전 매장의 표준으로 만듭니다',
    ],
    ctaText: '공간 AI의 3단계 작동 방식 보기',

    pillarsEyebrow: '멈추지 않는 순환',
    pillarsTitle: '네 글자에 담은 약속',
    pillarsSub: '네 글자가 하나의 순환으로 맞물립니다.',
    pillars: [
      { letter: 'S', name: 'Spatial', title: '공간 지능', desc: '매장에 이미 달린 CCTV로 사람과 사물의 위치·동선·체류를 정확한 좌표로 정합합니다.' },
      { letter: 'A', name: 'Anonymized', title: '실시간 익명화', desc: '얼굴과 신원 정보는 들어오는 순간 지웁니다. 규제 걱정 없이 동선만 남습니다.' },
      { letter: 'A', name: 'Agentic', title: '자율적 실행', desc: '관측에서 그치지 않고, 오늘 매장 직원이 당장 옮겨야 할 매대와 진열 행동을 직접 안내합니다.' },
      { letter: 'I', name: 'Intelligence', title: '지능 체계', desc: '한 매장에서 통한 방법을 전 매장의 표준으로 만듭니다.' },
    ],
  },
  en: {
    eyebrow: 'THE SPATIAL ANSWER',
    headline: 'For spaces, spatial AI.',
    sub: "Ask the same question — the answers differ. SAAI reads your space directly and gives your store's answer, not generic advice.",
    generalAiTitle: 'General AI (ChatGPT, Claude)',
    generalAiDesc: 'Powerful for text & static images, but blind to live store dynamics and physical footfall.',
    generalAiPoints: [
      "Doesn't know how many people are in your store right now",
      'Gives generic advice that fits any store',
      "Can't tell you what to move today",
    ],
    spatialAiTitle: 'Spatial AI — SAAI',
    spatialAiDesc: 'Anonymized vision technology reading live store movements without capturing identities.',
    spatialAiPoints: [
      'Reads movement, payment, and stock as one dataset',
      'Points to the one action to take today',
      "Turns one store's success into the standard for all",
    ],
    ctaText: 'Explore the 3-step operation loop',

    pillarsEyebrow: 'THE OPERATING LOOP',
    pillarsTitle: 'A Promise in Four Letters',
    pillarsSub: 'Four letters interlock into one loop.',
    pillars: [
      { letter: 'S', name: 'Spatial', title: 'Spatial Intelligence', desc: 'Maps people and objects into precise spatial coordinates using existing store CCTVs.' },
      { letter: 'A', name: 'Anonymized', title: 'Real-time Anonymization', desc: 'Faces and identity are erased the moment footage enters. Only flow remains — no compliance worries.' },
      { letter: 'A', name: 'Agentic', title: 'Autonomous Action', desc: 'Does not stop at seeing; directly guides staff on daily display and layout actions.' },
      { letter: 'I', name: 'Intelligence', title: 'System Intelligence', desc: 'Turns what worked in one store into the standard for every store.' },
    ],
  },
  jp: {
    eyebrow: '空間の回答',
    headline: '空間には、空間のAI。',
    sub: '同じ質問を投げても、答えは違います。SAAIは空間を直接読み取り、一般論ではなく貴店の答えを出します。',
    generalAiTitle: '汎用 AI (ChatGPT · Claude 等)',
    generalAiDesc: 'テキストや静止画には強いものの、店舗内の物理的動線や現場の状況を把握できません。',
    generalAiPoints: [
      '今店舗に何人いるのか分からない',
      'どの店舗にも当てはまる一般論を答える',
      '今日何を動かすべきかは言えない',
    ],
    spatialAiTitle: '空間 AI SAAI (Spatial AI)',
    spatialAiDesc: '顔を消去した匿名化ビジョン技術で、店舗のすべての瞬間と動線をリアルタイムで読み取ります。',
    spatialAiPoints: [
      '動線・決済・在庫をひとつのデータとして見る',
      '今日実行すべき行動を1つ示す',
      '1店舗の成功を全店舗の標準にする',
    ],
    ctaText: '空間AIの3ステップ運用ループを見る',

    pillarsEyebrow: '止まらない循環',
    pillarsTitle: '4つの文字に込めた約束',
    pillarsSub: '4つの文字がひとつの循環に噛み合います。',
    pillars: [
      { letter: 'S', name: 'Spatial', title: '空間知能', desc: '店舗の既存CCTVで人やモノの位置・動線・滞在を正確な座標に整合します。' },
      { letter: 'A', name: 'Anonymized', title: 'リアルタイム匿名化', desc: '顔や身元情報は入った瞬間に消去。規制の心配なく、動線だけが残ります。' },
      { letter: 'A', name: 'Agentic', title: '自律的実行', desc: '見るにとどまらず、今日スタッフが実行すべき陳列や行動を直接案内します。' },
      { letter: 'I', name: 'Intelligence', title: '知能体系', desc: '1店舗で通用した方法を、全店舗の標準にします。' },
    ],
  },
};

export default function SpaceAiAnswerBeat({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  // 순차 재생(모션 정책 D4-3): 좌측 범용 AI 데모가 끝난 뒤 우측 SAAI 데모가 시작
  const [leftDone, setLeftDone] = useState(false);

  return (
    <AnimatedSection className="py-16 lg:py-20 section-dark noise-overlay text-white relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* General AI vs SAAI Comparison */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10">
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

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Left: General AI */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 lg:p-8 backdrop-blur-sm flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400">
                    <Bot className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-300">{t.generalAiTitle}</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed break-keep">
                  {t.generalAiDesc}
                </p>
                <ul className="space-y-3">
                  {t.generalAiPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                      <XCircle className="w-4 h-4 text-error/80 shrink-0 mt-0.5" />
                      <span className="break-keep">{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Left card demo — 매장을 볼 수 없는 범용 AI 챗봇 (같은 질문, 다른 대답) */}
                <div className="pt-3 mx-auto w-full max-w-[400px]">
                  <GenericAiMockup locale={locale} onComplete={() => setLeftDone(true)} />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-2xs text-slate-500 uppercase tracking-wider">
                Generic Text Model
              </div>
            </div>

            {/* Right: Spatial AI (SAAI) */}
            <div className="rounded-3xl border border-primary/40 bg-primary/10 p-6 lg:p-8 backdrop-blur-sm flex flex-col justify-between relative shadow-2xl shadow-primary/10">
              <div className="absolute top-4 right-4 bg-primary text-white text-2xs px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5">
                <SaaiSymbol className="w-3 h-3 text-white" />
                SAAI Native
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                    <SaaiSymbol className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{t.spatialAiTitle}</h3>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed break-keep">
                  {t.spatialAiDesc}
                </p>
                <ul className="space-y-3">
                  {t.spatialAiPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white font-medium">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span className="break-keep">{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Right card demo — 같은 질문에 실데이터·행동으로 답하는 SAAI (좌측 재생 완료 후 시작).
                    크기는 MockupViewport 비율 스케일 소관 — 호출부는 폭만 지정(v2 계약).
                    폭 240/255는 구 scale-[0.85] 해킹 시절의 실효 크기를 승계한 값. */}
                <div className="pt-3 max-w-[240px] sm:max-w-[255px] mx-auto">
                  <StoreInsightMockup locale={locale} active={leftDone} playMode="once" />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-primary/20 flex items-center justify-between">
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

        {/* 5. 네 글자에 담은 약속 (S · A · A · I) */}
        <div className="pt-10 border-t border-slate-800">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary-light mb-3">
              <SaaiSymbol className="w-3.5 h-3.5 text-primary" />
              {t.pillarsEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 font-display break-keep">
              {t.pillarsTitle}
            </h2>
            <p className="text-slate-400 text-base sm:text-lg break-keep">
              {t.pillarsSub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Wave connection line behind cards */}
            <div className="hidden lg:block absolute top-20 left-10 right-10 h-0.5 bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20 pointer-events-none z-0" />

            {t.pillars.map((p, i) => (
              <div
                key={p.letter + i}
                className="relative z-10 rounded-2xl bg-slate-900/80 border border-slate-800 p-5 lg:p-6 flex flex-col justify-between hover:border-primary/50 transition-colors group"
              >
                <div>
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-5xl sm:text-6xl font-extrabold text-primary-light group-hover:text-primary transition-colors tracking-tight font-display">
                      {p.letter}
                    </span>
                    <span className="font-mono text-2xs uppercase tracking-widest text-slate-500 font-semibold">
                      {p.name}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 break-keep">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed break-keep">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
