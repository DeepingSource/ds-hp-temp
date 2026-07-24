'use client';

import { Eye, ShieldCheck, Brain, Sparkles } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SaaiSymbol from '@/components/ui/SaaiSymbol';
import { type Locale } from '@/lib/i18n';

const COPY: Record<Locale, {
  eyebrow: string;
  headline: string;
  sub: string;
  categoryTag: string;
  pillars: {
    letter: string;
    word: string;
    label: string;
    desc: string;
  }[];
}> = {
  ko: {
    eyebrow: 'SAAI 정의 · 차별적 기술 토대',
    headline: '네 글자에, SAAI의 방법이 다 있습니다.',
    sub: '모든 것은 얼굴과 신원을 지우는 익명화에서 시작합니다. 오프라인 공간을 있는 그대로 읽고, 운영을 돕고, 쓸수록 학습하는 단 하나의 공간 AI.',
    categoryTag: '카테고리는 하나 — 익명화 공간 AI (Spatial Anonymized Agentic Intelligence)',
    pillars: [
      {
        letter: 'S',
        word: 'Spatial',
        label: '공간을 읽습니다',
        desc: '결제 너머 매장 안 사람들의 이동, 체류, 시선과 행동 동선을 3차원 공간 좌표로 실시간 인지합니다.',
      },
      {
        letter: 'A',
        word: 'Anonymized',
        label: '신원은 남기지 않습니다',
        desc: '모든 분석의 출발점. 카메라 캡처 순간 얼굴과 신원을 100% 제거하여 개인정보 걱정 없는 데이터를 확보합니다.',
      },
      {
        letter: 'A',
        word: 'Agentic',
        label: '현장의 실행을 돕습니다',
        desc: '단순 관찰에 그치지 않고, 매장에서 오늘 당장 무엇을 변경해야 할지 직접 제안하고 자율 조치를 수행합니다.',
      },
      {
        letter: 'I',
        word: 'Intelligence',
        label: '쓸수록 정확해집니다',
        desc: '단 1개 매장에서의 성공 패턴을 축적하고 프랜차이즈 50개 매장으로 학습을 확산하는 지속 진화 지능.',
      },
    ],
  },
  en: {
    eyebrow: 'SAAI DEFINITION · FOUNDATIONAL METHOD',
    headline: 'Four letters contain our entire approach.',
    sub: 'Starting from total identity erasure. Reading physical space as it is, driving daily store actions, and evolving over time.',
    categoryTag: 'One unified category — Spatial Anonymized Agentic Intelligence',
    pillars: [
      {
        letter: 'S',
        word: 'Spatial',
        label: 'Reads physical space',
        desc: 'Sensing 3D trajectories, dwell zones, and pre-purchase behaviors beyond standard POS transactions.',
      },
      {
        letter: 'A',
        word: 'Anonymized',
        label: 'Zero identity retained',
        desc: 'The starting point of everything. Erasing face and identity at capture, guaranteeing total privacy compliance.',
      },
      {
        letter: 'A',
        word: 'Agentic',
        label: 'Drives store execution',
        desc: 'Going beyond passive metrics to surface the exact single action store staff need to execute today.',
      },
      {
        letter: 'I',
        word: 'Intelligence',
        label: 'Learns continuously',
        desc: 'Accumulating proven patterns from one store and propagating ontology across 50+ fleet locations.',
      },
    ],
  },
  jp: {
    eyebrow: 'SAAI DEFINITION · 技術の基礎',
    headline: '4つの文字に、SAAIのすべての方法があります。',
    sub: 'すべては顔と身元を消去する匿名化から始まります。オフライン空間をそのまま読み解き、運営を助け、使うほど学習する空間AI。',
    categoryTag: 'カテゴリはひとつ — 匿名化空間AI (Spatial Anonymized Agentic Intelligence)',
    pillars: [
      {
        letter: 'S',
        word: 'Spatial',
        label: '空間を読み解く',
        desc: '決済データの先にある店内の移動・滞在・視線・行動動線を3次元空間座標としてリアルタイム認識。',
      },
      {
        letter: 'A',
        word: 'Anonymized',
        label: '身元は残さない',
        desc: 'すべての分析の出発点。カメラ撮影の瞬間に顔と身元を100%消去し、プライバシーの懸念をゼロに。',
      },
      {
        letter: 'A',
        word: 'Agentic',
        label: '現場の実行を助ける',
        desc: '単なる observation にとどまらず、店舗で今日変更すべき行動を直接提案・自律指示。',
      },
      {
        letter: 'I',
        word: 'Intelligence',
        label: '使うほど正確に',
        desc: '1店舗での成功パターンを蓄積し、全50店舗へと学習を伝播・拡張する進化型知能。',
      },
    ],
  },
};

const ICONS = [Eye, ShieldCheck, Brain, Sparkles];

export default function SaaiPillarsSection({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <AnimatedSection className="py-20 lg:py-28 bg-gray-50 border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-3">
            <SaaiSymbol className="w-3.5 h-3.5 text-primary" />
            {t.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4 font-display break-keep">
            {t.headline}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed break-keep mb-6">
            {t.sub}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
            <span>{t.categoryTag}</span>
          </div>
        </div>

        {/* 4 Pillars Horizontal Grid (Static Foundational Layer) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.pillars.map((item, index) => {
            const Icon = ICONS[index];
            return (
              <div
                key={item.word}
                className="rounded-3xl bg-white border border-gray-200 p-7 shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary-lighter flex items-center justify-center text-primary font-bold text-xl">
                      {item.letter}
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-primary mb-1">
                    {item.word}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 break-keep">
                    {item.label}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed break-keep">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
