'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import TimelineSpine from '@/components/ui/TimelineSpine';
import { type Locale } from '@/lib/i18n';
import { COMPANY } from '@/lib/company-data';

// B5 2층 구조(AB §1-B): 기본 노출 = 연도 + 제목 + 한 줄(lead), 나머지 본문(more)은
// 항목 펼침으로 강등 — 제목 7개만 읽어도 창업→검증→전환→완성 서사가 완결된다.
// '유지' 판정 항목(01·02·04·05)은 문장 무손상 분할(lead+more 합치면 원문과 동일).
type Item = { phase: string; title: string; year: string; lead: string; more?: string };

const MORE_LABEL: Record<Locale, string> = { ko: '자세히', en: 'More', jp: '詳しく' };

const C: Record<Locale, { items: Item[] }> = {
  ko: {
    items: [
      {
        phase: '출발',
        title: '데이터 장벽',
        year: '2018',
        lead: '규제와 기술의 한계로 잠들어 있던 데이터를 깨우는 것이 첫 번째 과제였습니다.',
        more: '오프라인 공간은 데이터가 넘쳐 흐르지만, 그 누구도 활용할 수 없었습니다.',
      },
      {
        phase: '발견',
        title: 'CCTV라는 가능성',
        year: '2019',
        lead: '이미 모든 공간에 설치되어 있지만 활용되지 못하던 CCTV.',
        more: '컴퓨터 비전 기술과 만나 공간을 이해하는 열쇠가 되었습니다. 추가 장치 없이, 지금 있는 것으로 시작할 수 있었습니다.',
      },
      {
        phase: '확장',
        title: '현장이 AI를 검증하다',
        year: '2019',
        lead: 'NVIDIA Inception 합류, 시리즈 A 약 55억 원 투자 유치(KDDI 리드).',
        more: '익명화 기술이 실제 매장에서 작동한다는 것을 수십 개 현장이 증명했습니다.',
      },
      {
        phase: '증명',
        title: '100개 매장이 데이터를 증명했다',
        year: '2021',
        lead: '익명화 히트맵 대시보드를 상용화했습니다.',
        more: '파일럿이 아닌 실제 운영 매장 100개가 넘어선 시점 — AI는 이제 현장 언어로 말하기 시작했습니다.',
      },
      {
        phase: '현실',
        title: '데이터만으로는 부족했다',
        year: '2022',
        lead: '“그래서 뭘 해야 하는데요?” — 데이터를 보여주는 것만으로는 현장이 바뀌지 않았습니다.',
        more: '진짜 문제는 데이터가 아니라 실행이었습니다.',
      },
      {
        phase: '신뢰',
        title: '외부가 방식을 검증하다',
        year: '2024',
        lead: 'SOC 2 인증 취득, NextRise 2024 ‘Top Innovator’ 수상.',
        more: '누적 특허 {patents}건.',
      },
      {
        phase: '완성',
        title: '고객과 함께 만든 답',
        year: '2025',
        lead: '에이전트 AI는 고객 매장에서 만들어졌습니다.',
        more: '수백 개 매장, 수천 번의 검증을 거쳤습니다.',
      },
    ],
  },
  en: {
    items: [
      {
        phase: 'Start',
        title: 'The Data Barrier',
        year: '2018',
        lead: 'Our first challenge was waking the data left dormant by regulatory and technical limits.',
        more: 'Offline spaces overflow with data, yet no one could put it to use.',
      },
      {
        phase: 'Discovery',
        title: 'CCTV as Opportunity',
        year: '2019',
        lead: 'CCTV was already installed everywhere but went unused.',
        more: 'Paired with computer vision, it became the key to understanding space — no extra hardware, starting with what was already there.',
      },
      {
        phase: 'Expansion',
        title: 'The Field Validates the AI',
        year: '2019',
        lead: 'Joined NVIDIA Inception and raised a ~₩5.5B Series A led by KDDI.',
        more: 'Dozens of sites proved that anonymization technology works in real stores.',
      },
      {
        phase: 'Proof',
        title: '100 Stores Proved the Data',
        year: '2021',
        lead: 'We commercialized the anonymized heatmap dashboard.',
        more: 'Past 100 live operating stores — not pilots — the AI began to speak the language of the field.',
      },
      {
        phase: 'Reality',
        title: 'Data Alone Was Not Enough',
        year: '2022',
        lead: '“So what should we actually do?” — showing the data alone did not change the field.',
        more: 'The real problem was not data, but execution.',
      },
      {
        phase: 'Trust',
        title: 'Outside Validation of the Method',
        year: '2024',
        lead: 'Achieved SOC 2 certification and won NextRise 2024 ‘Top Innovator’.',
        more: '{patents} patents filed to date.',
      },
      {
        phase: 'Realization',
        title: 'An Answer Built With Customers',
        year: '2025',
        lead: 'Our agentic AI was built in customers’ stores.',
        more: 'Hundreds of stores, thousands of validations.',
      },
    ],
  },
  jp: {
    items: [
      {
        phase: '出発',
        title: 'データの壁',
        year: '2018',
        lead: '規制と技術の限界によって眠っていたデータを呼び覚ますことが、最初の課題でした。',
        more: 'オフライン空間はデータであふれていながら、誰も活用できずにいました。',
      },
      {
        phase: '発見',
        title: 'CCTVという可能性',
        year: '2019',
        lead: 'すでにあらゆる空間に設置されながら活用されていなかったCCTV。',
        more: 'コンピュータービジョン技術と出会い、空間を理解する鍵となりました。追加の機器なしに、今あるもので始めることができました。',
      },
      {
        phase: '拡大',
        title: '現場がAIを検証する',
        year: '2019',
        lead: 'NVIDIA Inceptionへの参加、シリーズA 約55億ウォンを調達（KDDIリード）。',
        more: '匿名化技術が実際の店舗で機能することを、数十の現場が証明しました。',
      },
      {
        phase: '証明',
        title: '100店舗がデータを証明した',
        year: '2021',
        lead: '匿名化ヒートマップダッシュボードを商用化しました。',
        more: 'パイロットではなく実運用の店舗が100を超えた時点で — AIは現場の言葉で語り始めました。',
      },
      {
        phase: '現実',
        title: 'データだけでは足りなかった',
        year: '2022',
        lead: '「で、何をすればいいの?」 — データを見せるだけでは現場は変わりませんでした。',
        more: '本当の課題はデータではなく、実行でした。',
      },
      {
        phase: '信頼',
        title: '外部が方式を検証する',
        year: '2024',
        lead: 'SOC 2認証を取得、NextRise 2024「Top Innovator」を受賞。',
        more: '累計特許{patents}件。',
      },
      {
        phase: '完成',
        title: 'お客様と共につくった答え',
        year: '2025',
        lead: 'エージェントAIは、お客様の店舗でつくられました。',
        more: '数百の店舗、数千回の検証を経ています。',
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
        {/* 2019가 두 항목(발견·시리즈 A)이라 연도 단독 key는 중복 — index 결합 */}
        {items.map((item, i) => (
          <TimelineItem key={`${item.year}-${i}`} item={item} index={i} moreLabel={MORE_LABEL[locale]} />
        ))}
      </div>
    </div>
  );
}
