'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import TimelineSpine from '@/components/ui/TimelineSpine';
import { type Locale } from '@/lib/i18n';
import { COMPANY } from '@/lib/company-data';

// B5 2층 구조(AB §1-B): 기본 노출 = 연도 + 제목 + 한 줄(lead), 나머지 본문(more)은
// 항목 펼침으로 강등 — 제목만 읽어도 창업→집중→확장→정립 서사가 완결된다.
// 연혁 내용은 ①8-1 정정안(2026-07-24)이 정본 — 구 서사('2019 CCTV라는 가능성',
// '2021 100개 매장 상용화' 등)는 사실 오류로 폐기. 투자·인증 팩트(시리즈 A·SOC 2·
// 특허)는 milestones.yaml 요약 카드가 담당한다(J4 검증 완료).
type Item = { phase: string; title: string; year: string; lead: string; more?: string };

const MORE_LABEL: Record<Locale, string> = { ko: '자세히', en: 'More', jp: '詳しく' };

const C: Record<Locale, { items: Item[] }> = {
  ko: {
    items: [
      {
        phase: '출발',
        title: '창업 — 익명화에서 출발',
        year: '2018',
        lead: 'AI에는 데이터가 필요하지만, 그 데이터는 익명화가 전제되어야 한다는 문제의식에서 출발했습니다.',
        more: '창업부터 2020년까지는 공간 AI를 포함한 익명화 데이터에 집중했습니다.',
      },
      {
        phase: '집중',
        title: '공간 AI 본격화',
        year: '2020',
        lead: '익명화 데이터가 AI 학습을 넘어 실제로 필요한 공간 — 리테일에 집중하기 시작했습니다.',
      },
      {
        phase: '기술',
        title: '엣지 처리',
        year: '2021',
        lead: '동선 데이터를 엣지 디바이스에서 처리할 수 있도록 구현했습니다.',
        more: '원본 영상을 밖으로 내보내지 않는 지금의 구조가 이때 자리를 잡았습니다.',
      },
      {
        phase: '확장',
        title: '사업 확장 · 행동 인식',
        year: '2022',
        lead: '본격적인 사업 확장과 함께 Action Recognition을 도입해, 동선을 넘어 행동까지 읽기 시작했습니다.',
        more: 'SEAL을 기반으로 익명화를 더 쉽게 적용할 수 있도록 개발을 마치고 판매를 시작했습니다.',
      },
      {
        phase: '전환',
        title: '에이전틱 AI 도입',
        year: '2023',
        lead: '데이터 제공만으로는 고객이 활용하기 어려웠습니다 — 공간 확장을 더 쉽게 하기 위해 Agentic AI를 도입하기 시작했습니다.',
      },
      {
        phase: '제품',
        title: 'Store Care — 현 saai care',
        year: '2024',
        lead: '공간과 사람을 넘어, 공간 안의 객체 중심으로 Store Care를 개발했습니다.',
        more: '기본 플랫폼 위에 구현해 Store Care 브랜드로 공급을 시작했습니다.',
      },
      {
        phase: '정립',
        title: 'SAAI 정립',
        year: '2025',
        lead: 'Physical AI·로보틱스 연계를 고민하며 SAAI를 정립했습니다.',
        more: 'Agent를 제품에 본격 탑재하며 care · insight · agent 체계를 완성했습니다.',
      },
    ],
  },
  en: {
    items: [
      {
        phase: 'Start',
        title: 'Founded — Starting From Anonymization',
        year: '2018',
        lead: 'AI needs data — and we started from the conviction that such data must be anonymized first.',
        more: 'From founding through 2020, we focused on anonymized data, including spatial AI.',
      },
      {
        phase: 'Focus',
        title: 'Spatial AI in Earnest',
        year: '2020',
        lead: 'We turned to the space where anonymized data is needed beyond AI training — retail.',
      },
      {
        phase: 'Technology',
        title: 'Edge Processing',
        year: '2021',
        lead: 'We made movement data processable on edge devices.',
        more: 'The architecture that keeps raw footage from ever leaving the site took shape here.',
      },
      {
        phase: 'Expansion',
        title: 'Business Growth · Action Recognition',
        year: '2022',
        lead: 'Alongside full-scale expansion, we adopted Action Recognition — reading behavior beyond movement.',
        more: 'Built on SEAL, we finished making anonymization easier to apply and began selling it.',
      },
      {
        phase: 'Turn',
        title: 'Introducing Agentic AI',
        year: '2023',
        lead: 'Providing data alone was often not enough for customers — we began adopting Agentic AI to make spatial expansion easier.',
      },
      {
        phase: 'Product',
        title: 'Store Care — Now saai care',
        year: '2024',
        lead: 'Beyond spaces and people, we built Store Care around the objects inside a space.',
        more: 'Implemented on our core platform and supplied under the Store Care brand.',
      },
      {
        phase: 'Foundation',
        title: 'SAAI Established',
        year: '2025',
        lead: 'Exploring links to Physical AI and robotics, we established SAAI.',
        more: 'With agents shipping in the product, the care · insight · agent system was completed.',
      },
    ],
  },
  jp: {
    items: [
      {
        phase: '出発',
        title: '創業 — 匿名化から出発',
        year: '2018',
        lead: 'AIにはデータが必要ですが、そのデータは匿名化が前提であるべきだという問題意識から出発しました。',
        more: '創業から2020年までは、空間AIを含む匿名化データに集中しました。',
      },
      {
        phase: '集中',
        title: '空間AIの本格化',
        year: '2020',
        lead: '匿名化データがAIの学習を超えて実際に必要とされる空間 — リテールへの集中を始めました。',
      },
      {
        phase: '技術',
        title: 'エッジ処理',
        year: '2021',
        lead: '動線データをエッジデバイスで処理できるように実装しました。',
        more: '元映像を外に出さない現在の構造が、この時期に固まりました。',
      },
      {
        phase: '拡大',
        title: '事業拡大 · 行動認識',
        year: '2022',
        lead: '本格的な事業拡大とともにAction Recognitionを導入し、動線を超えて行動まで読み始めました。',
        more: 'SEALを基盤に、匿名化をより簡単に適用できるよう開発を終え、販売を開始しました。',
      },
      {
        phase: '転換',
        title: 'エージェンティックAIの導入',
        year: '2023',
        lead: 'データ提供だけではお客様が活用しづらいことも多く、空間拡張をより容易にするためAgentic AIの導入を始めました。',
      },
      {
        phase: '製品',
        title: 'Store Care — 現 saai care',
        year: '2024',
        lead: '空間と人を超えて、空間内のオブジェクト中心のStore Careを開発しました。',
        more: '基盤プラットフォーム上に実装し、Store Careブランドとして供給を開始しました。',
      },
      {
        phase: '確立',
        title: 'SAAIの確立',
        year: '2025',
        lead: 'Physical AI・ロボティクスとの連携を見据え、SAAIを確立しました。',
        more: 'エージェントを製品に本格搭載し、care · insight · agent の体系を完成させました。',
      },
    ],
  },
};

const sub = (text: string) => text.replace('{patents}', String(COMPANY.patents));

function TimelineItem({ item, index, moreLabel }: { item: Item; index: number; moreLabel: string }) {
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

      {/* 콘텐츠 — 스캔 레이어(제목+한 줄) / 읽기 레이어(펼침) */}
      <div className="flex-1 pb-2 pt-0.5">
        <div className="flex items-center gap-3 flex-wrap mb-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-gray-200 bg-gray-50 text-gray-600">
            {item.phase}
          </span>
          <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
          <span className="text-xs text-gray-500 font-mono ml-auto">{item.year}</span>
        </div>
        <p className="text-gray-500 leading-relaxed break-keep">{sub(item.lead)}</p>
        {item.more && (
          <details className="mt-1 group/more">
            <summary className="cursor-pointer list-none text-xs font-bold text-primary inline-flex items-center gap-1">
              {moreLabel}
              <span className="transition-transform group-open/more:rotate-90" aria-hidden="true">›</span>
            </summary>
            <p className="mt-1 text-sm text-gray-500 leading-relaxed break-keep">{sub(item.more)}</p>
          </details>
        )}
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
        {/* 연도-인덱스 결합 key — 같은 연도가 복수 항목이 되어도 안전 */}
        {items.map((item, i) => (
          <TimelineItem key={`${item.year}-${i}`} item={item} index={i} moreLabel={MORE_LABEL[locale]} />
        ))}
      </div>
    </div>
  );
}
