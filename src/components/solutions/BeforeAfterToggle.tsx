'use client';

import { useState } from 'react';
import { Eye, Sparkles, Check } from 'lucide-react';
import { type Locale } from '@/lib/i18n';

/**
 * BeforeAfterToggle — "지켜보던 운영 ↔ 먼저 아는 운영" (솔루션 작업문서 v1 §0·§3, V2).
 * A two-state toggle contrasting reactive vs. proactive operation. The "after" state
 * carries a light product tag. Content is per-category and self-contained (no CMS
 * coupling); add a category to CONTENT to reuse the toggle elsewhere.
 */

type SideCopy = { label: string; lead: string; points: string[] };
type ToggleCopy = { eyebrow: string; heading: string; before: SideCopy; after: SideCopy & { tag: string } };

const UI: Record<Locale, { beforeTab: string; afterTab: string }> = {
  ko: { beforeTab: '지켜보던 운영', afterTab: '먼저 아는 운영' },
  en: { beforeTab: 'Watching', afterTab: 'Knowing first' },
  jp: { beforeTab: '見守る運営', afterTab: '先に気づく運営' },
};

const CONTENT: Record<string, Record<Locale, ToggleCopy>> = {
  'food-beverage': {
    ko: {
      eyebrow: 'Before · After',
      heading: '붐비고 나서 대응에서, 붐비기 전에 준비로',
      before: {
        label: '지켜보던 운영',
        lead: '줄이 길어진 뒤에야 인력을 부릅니다. 대기에 지친 손님은 이미 나간 뒤죠.',
        points: ['줄이 길어진 뒤에야 인력 투입', '피크 시간은 매번 감으로', '대기 이탈은 사후에야 확인'],
      },
      after: {
        label: '먼저 아는 운영',
        lead: '대기·혼잡을 미리 감지해, 붐비기 전에 인력을 옮기고 좌석을 돌립니다.',
        points: ['혼잡 임계 전 알림', '요일·시간대 피크 주기 예측', '대기 손님을 놓치기 전에 응대'],
        tag: 'store queue · saai care',
      },
    },
    en: {
      eyebrow: 'Before · After',
      heading: 'From reacting once it is busy, to being ready before it is',
      before: {
        label: 'Watching',
        lead: 'You call for staff only after the line grows — and the customer worn out by the wait has already left.',
        points: ['Staff added only after the line grows', 'Peak hours guessed each time', 'Walk-outs seen only after the fact'],
      },
      after: {
        label: 'Knowing first',
        lead: 'Queues and crowding sensed early — move staff and turn seats before it gets busy.',
        points: ['Alert before the crowding threshold', 'Peak cycles by weekday and hour, forecast', 'Reach waiting customers before you lose them'],
        tag: 'store queue · saai care',
      },
    },
    jp: {
      eyebrow: 'Before · After',
      heading: '混んでから対応から、混む前に備えるへ',
      before: {
        label: '見守る運営',
        lead: '列が伸びてから人員を呼びます。待ちに疲れたお客様は、もう帰った後です。',
        points: ['列が伸びてから人員投入', 'ピーク時間は毎回、勘で', '離脱は事後にしか分からない'],
      },
      after: {
        label: '先に気づく運営',
        lead: '待ち・混雑を先に検知し、混む前に人員を動かし席を回します。',
        points: ['混雑の閾値前にアラート', '曜日・時間帯のピーク周期を予測', '待つお客様を逃す前に応対'],
        tag: 'store queue · saai care',
      },
    },
  },
};

export default function BeforeAfterToggle({ category, locale }: { category: string; locale: Locale }) {
  const copy = CONTENT[category]?.[locale];
  const ui = UI[locale];
  const [after, setAfter] = useState(true);
  if (!copy) return null;
  const side = after ? copy.after : copy.before;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <p className="text-sm font-medium text-primary mb-3 tracking-wide">{copy.eyebrow}</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 break-keep">{copy.heading}</h2>
      </div>

      {/* toggle */}
      <div className="mx-auto mb-6 inline-flex rounded-full border border-gray-200 bg-gray-50 p-1 w-full max-w-xs">
        <button
          type="button"
          aria-pressed={!after}
          onClick={() => setAfter(false)}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
            !after ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'
          }`}
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
          {ui.beforeTab}
        </button>
        <button
          type="button"
          aria-pressed={after}
          onClick={() => setAfter(true)}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
            after ? 'bg-primary text-white shadow-sm' : 'text-gray-400'
          }`}
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          {ui.afterTab}
        </button>
      </div>

      {/* panel */}
      <div className={`rounded-3xl border p-6 sm:p-8 transition-colors ${after ? 'border-primary/20 bg-primary-lighter/30' : 'border-gray-200 bg-white'}`}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className={`text-lg font-bold ${after ? 'text-primary' : 'text-gray-900'}`}>{side.label}</p>
          {after && (
            <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-2xs font-semibold text-primary lowercase">{copy.after.tag}</span>
          )}
        </div>
        <p className="text-gray-600 leading-relaxed break-keep mb-5">{side.lead}</p>
        <ul className="space-y-2.5">
          {side.points.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm text-gray-700 break-keep">
              <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${after ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
                {after ? <Check className="h-2.5 w-2.5" aria-hidden="true" /> : <span className="block h-1.5 w-1.5 rounded-full bg-current" />}
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
