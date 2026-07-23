'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import TimelineSpine from '@/components/ui/TimelineSpine';
import { type Locale } from '@/lib/i18n';

type Item = { phase: string; title: string; description: string; year: string };

const C: Record<Locale, { items: Item[] }> = {
  ko: {
    items: [
      {
        phase: '출발',
        title: '데이터 장벽',
        description:
          '규제와 기술의 한계로 잠들어 있던 데이터를 깨우는 것이 첫 번째 과제였습니다. 오프라인 공간은 데이터가 넘쳐 흐르지만, 그 누구도 활용할 수 없었습니다.',
        year: '2018',
      },
      {
        phase: '발견',
        title: 'CCTV라는 가능성',
        description:
          '이미 모든 공간에 설치되어 있지만 활용되지 못하던 CCTV. 컴퓨터 비전 기술과 만나 공간을 이해하는 열쇠가 되었습니다. 추가 장치 없이, 지금 있는 것으로 시작할 수 있었습니다.',
        year: '2019',
      },
      {
        phase: '확장',
        title: '현장이 AI를 검증하다',
        description:
          'NVIDIA Inception 합류, Series A1 투자 유치. 익명화 기술이 실제 매장에서 작동한다는 것을 수십 개 현장이 증명했습니다.',
        year: '2020',
      },
      {
        phase: '증명',
        title: '100개 매장이 데이터를 증명했다',
        description:
          '익명화 히트맵 대시보드를 상용화했습니다. 파일럿이 아닌 실제 운영 매장 100개가 넘어선 시점 — AI는 이제 현장 언어로 말하기 시작했습니다.',
        year: '2021',
      },
      {
        phase: '현실',
        title: '데이터만으로는 부족했다',
        description:
          '“그래서 뭘 해야 하는데요?” — 데이터를 보여주는 것만으로는 현장이 바뀌지 않았습니다. 진짜 문제는 데이터가 아니라 실행이었습니다.',
        year: '2022',
      },
      {
        phase: '완성',
        title: '고객과 함께 만든 답',
        description:
          'SAAI의 에이전트 AI는 탁상공론의 코드가 아니라, 치열한 현장의 파트너십에서 탄생했습니다. 수백 개의 매장, 수천 번의 검증을 거친 진짜 솔루션입니다.',
        year: '2025',
      },
    ],
  },
  en: {
    items: [
      {
        phase: 'Start',
        title: 'The Data Barrier',
        description:
          'Our first challenge was waking the data left dormant by regulatory and technical limits. Offline spaces overflow with data, yet no one could put it to use.',
        year: '2018',
      },
      {
        phase: 'Discovery',
        title: 'CCTV as Opportunity',
        description:
          'CCTV was already installed everywhere but went unused. Paired with computer vision, it became the key to understanding space — no extra hardware, starting with what was already there.',
        year: '2019',
      },
      {
        phase: 'Expansion',
        title: 'The Field Validates the AI',
        description:
          'Joined NVIDIA Inception and closed a Series A1 round. Dozens of sites proved that anonymization technology works in real stores.',
        year: '2020',
      },
      {
        phase: 'Proof',
        title: '100 Stores Proved the Data',
        description:
          'We commercialized the anonymized heatmap dashboard. Past 100 live operating stores — not pilots — the AI began to speak the language of the field.',
        year: '2021',
      },
      {
        phase: 'Reality',
        title: 'Data Alone Was Not Enough',
        description:
          '“So what should we actually do?” — showing the data alone did not change the field. The real problem was not data, but execution.',
        year: '2022',
      },
      {
        phase: 'Realization',
        title: 'An Answer Built With Customers',
        description:
          'SAAI’s agentic AI was not born from theoretical code, but from intense partnership in the field — a real solution forged across hundreds of stores and thousands of validations.',
        year: '2025',
      },
    ],
  },
  jp: {
    items: [
      {
        phase: '出発',
        title: 'データの壁',
        description:
          '規制と技術の限界によって眠っていたデータを呼び覚ますことが、最初の課題でした。オフライン空間はデータであふれていながら、誰も活用できずにいました。',
        year: '2018',
      },
      {
        phase: '発見',
        title: 'CCTVという可能性',
        description:
          'すでにあらゆる空間に設置されながら活用されていなかったCCTV。コンピュータービジョン技術と出会い、空間を理解する鍵となりました。追加の機器なしに、今あるもので始めることができました。',
        year: '2019',
      },
      {
        phase: '拡大',
        title: '現場がAIを検証する',
        description:
          'NVIDIA Inceptionへの参加、Series A1の資金調達。匿名化技術が実際の店舗で機能することを、数十の現場が証明しました。',
        year: '2020',
      },
      {
        phase: '証明',
        title: '100店舗がデータを証明した',
        description:
          '匿名化ヒートマップダッシュボードを商用化しました。パイロットではなく実運用の店舗が100を超えた時点で — AIは現場の言葉で語り始めました。',
        year: '2021',
      },
      {
        phase: '現実',
        title: 'データだけでは足りなかった',
        description:
          '「で、何をすればいいの?」 — データを見せるだけでは現場は変わりませんでした。本当の課題はデータではなく、実行でした。',
        year: '2022',
      },
      {
        phase: '完成',
        title: 'お客様と共につくった答え',
        description:
          'SAAIのエージェントAIは、机上のコードではなく、熾烈な現場のパートナーシップから生まれました。数百の店舗、数千回の検証を経た本物のソリューションです。',
        year: '2025',
      },
    ],
  },
};

function TimelineItem({ item, index }: { item: Item; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // AB §1-A A1: '-60px' 마진 + index 비례 지연 누적이 보통 스크롤에서도 항목을
  // 빈 영역으로 남겼다 — 마진 0(뷰포트 걸침 즉시 발화) + 지연 상한 0.3s.
  const isInView = useInView(ref, { once: true, margin: '0px' });
  const reducedMotion = usePrefersReducedMotion();
  const cardDelay = Math.min(0.05 + index * 0.08, 0.3);
  const nodeDelay = Math.min(0.1 + index * 0.08, 0.3);

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? {} : { opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.55, ease: 'easeOut' as const, delay: cardDelay }}
      className="relative flex gap-6 sm:gap-8 group"
    >
      {/* 타임라인 노드 */}
      <div className="relative z-10 flex-shrink-0">
        <motion.div
          initial={reducedMotion ? {} : { scale: 0.6, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.4, ease: 'easeOut' as const, delay: nodeDelay }}
          className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 group-hover:border-gray-400 flex items-center justify-center transition-colors duration-300 shadow-sm"
        >
          <span className="text-xs font-bold text-gray-500">{String(index + 1).padStart(2, '0')}</span>
        </motion.div>
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 pb-2 pt-0.5">
        <div className="flex items-center gap-3 flex-wrap mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-gray-200 bg-gray-50 text-gray-600">
            {item.phase}
          </span>
          <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
          <span className="text-xs text-gray-500 font-mono ml-auto">{item.year}</span>
        </div>
        <p className="text-gray-500 leading-relaxed break-keep">{item.description}</p>
      </div>
    </motion.div>
  );
}

export function OriginStoryTimeline({ locale = 'en' }: { locale?: Locale }) {
  const items = C[locale].items;

  return (
    <div className="relative">
      {/* 수직 라인 — scroll-in 시 위→아래로 draw */}
      <TimelineSpine className="absolute left-5 top-5 bottom-5 w-px hidden sm:block" lineClassName="bg-gray-100" />
      <div className="space-y-6">
        {items.map((item, i) => (
          <TimelineItem key={item.year} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}
