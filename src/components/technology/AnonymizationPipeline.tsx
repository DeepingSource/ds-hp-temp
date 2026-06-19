'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Camera, Fingerprint, Shield, Cpu, BarChart3, ArrowRight } from 'lucide-react';
import { type Locale } from '@/lib/i18n';

const nodeStyles = [
  { icon: Camera, color: 'bg-slate-100 text-slate-600', border: 'border-slate-200' },
  { icon: Fingerprint, color: 'bg-violet-100 text-violet-700', border: 'border-violet-200' },
  { icon: Shield, color: 'bg-indigo-100 text-indigo-700', border: 'border-indigo-200' },
  { icon: Cpu, color: 'bg-blue-100 text-blue-700', border: 'border-blue-200' },
  { icon: BarChart3, color: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-200' },
];

const C: Record<Locale, {
  nodes: { label: string; sub: string }[];
  coreLabel: string;
  coreBody: string;
}> = {
  ko: {
    nodes: [
      { label: 'CCTV 영상', sub: '원본 영상 입력' },
      { label: 'AI 익명화', sub: 'PII 실시간 제거' },
      { label: '비식별 데이터', sub: '행동 속성 보존' },
      { label: 'ML 모델 학습', sub: '원본 없이 학습' },
      { label: '인사이트 출력', sub: '실행 가능한 분석' },
    ],
    coreLabel: '핵심:',
    coreBody: 'AI는 원본 영상에서 개인 식별 정보를 제거한 비식별 데이터만 학습에 사용합니다. 원본 영상은 장치 밖으로 나가지 않으며, ML 모델은 비식별 데이터로 실제 사용 가능한 수준으로 학습됩니다.',
  },
  en: {
    nodes: [
      { label: 'CCTV Footage', sub: 'Raw video input' },
      { label: 'AI Anonymization', sub: 'Real-time PII removal' },
      { label: 'De-identified Data', sub: 'Behavioral attributes kept' },
      { label: 'ML Model Training', sub: 'Trained without raw video' },
      { label: 'Insight Output', sub: 'Actionable analysis' },
    ],
    coreLabel: 'Key:',
    coreBody: 'The AI trains only on de-identified data, with personal identifiers stripped from the raw footage. Raw video never leaves the device, and the ML model reaches production-grade accuracy on de-identified data alone.',
  },
  jp: {
    nodes: [
      { label: 'CCTV映像', sub: '元映像の入力' },
      { label: 'AI匿名化', sub: 'PIIをリアルタイム除去' },
      { label: '非識別データ', sub: '行動属性を保持' },
      { label: 'MLモデル学習', sub: '元映像なしで学習' },
      { label: 'インサイト出力', sub: '実行可能な分析' },
    ],
    coreLabel: 'ポイント:',
    coreBody: 'AIは、元映像から個人識別情報を除去した非識別データのみを学習に使用します。元映像はデバイスの外に出ることはなく、MLモデルは非識別データだけで実用レベルまで学習されます。',
  },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const nodeVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const arrowVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  show: { opacity: 1, scaleX: 1, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

const dividerVariants = {
  hidden: { opacity: 0, scaleY: 0 },
  show: { opacity: 1, scaleY: 1, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

export function AnonymizationPipeline({ locale = 'en' }: { locale?: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const t = C[locale];
  const nodes = nodeStyles.map((style, i) => ({ ...style, ...t.nodes[i] }));

  return (
    <div ref={ref}>
      {/* Desktop: horizontal flow */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        className="hidden sm:flex items-center justify-between gap-2 overflow-x-auto pb-2"
      >
        {nodes.map((node, i) => {
          const Icon = node.icon;
          return (
            <div key={node.label} className="flex items-center gap-2 flex-shrink-0">
              <motion.div
                variants={nodeVariants}
                className={`flex flex-col items-center text-center p-5 rounded-2xl border ${node.border} bg-white w-[152px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow duration-300`}
              >
                <div className={`w-12 h-12 rounded-xl ${node.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-gray-900 leading-snug">{node.label}</p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{node.sub}</p>
              </motion.div>

              {i < nodes.length - 1 && (
                <motion.div
                  variants={arrowVariants}
                  style={{ originX: 0 }}
                  className="flex-shrink-0"
                >
                  <ArrowRight className="w-5 h-5 text-gray-300" />
                </motion.div>
              )}
            </div>
          );
        })}
      </motion.div>

      {/* Mobile: vertical flow */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        className="sm:hidden flex flex-col gap-3"
      >
        {nodes.map((node, i) => {
          const Icon = node.icon;
          return (
            <div key={node.label} className="flex flex-col items-center gap-1">
              <motion.div
                variants={nodeVariants}
                className={`flex items-center gap-4 p-4 rounded-2xl border ${node.border} bg-white w-full shadow-[0_2px_8px_rgba(0,0,0,0.04)]`}
              >
                <div className={`w-10 h-10 rounded-xl ${node.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{node.label}</p>
                  <p className="text-xs text-gray-500">{node.sub}</p>
                </div>
              </motion.div>
              {i < nodes.length - 1 && (
                <motion.div
                  variants={dividerVariants}
                  style={{ originY: 0 }}
                  className="w-px h-5 bg-gray-200"
                />
              )}
            </div>
          );
        })}
      </motion.div>

      {/* 핵심 설명 */}
      <motion.div
        variants={nodeVariants}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        className="mt-8 p-5 bg-violet-50 border border-violet-100 rounded-2xl flex items-start gap-3"
      >
        <div className="w-2 h-2 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
        <p className="text-sm text-violet-800 leading-relaxed break-keep">
          <strong>{t.coreLabel}</strong> {t.coreBody}
        </p>
      </motion.div>
    </div>
  );
}
