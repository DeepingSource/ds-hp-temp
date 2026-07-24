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
  // ①1-7 — BA 토글 표준 패턴을 리테일에도 도입 (결품 맥락, 3로케일)
  retail: {
    ko: {
      eyebrow: '전 · 후 비교',
      heading: '비고 나서 채우기에서, 비기 전에 아는 진열로',
      before: {
        label: '지켜보던 운영',
        lead: '빈 매대는 손님이 먼저 발견합니다. 팔릴 상품이 없던 시간만큼 매출이 빠져나갑니다.',
        points: ['매대가 빈 걸 순회 때에야 발견', '지점마다 다른 점검 기준', '야간 이상은 다음 날 아침에야 확인'],
      },
      after: {
        label: '먼저 아는 운영',
        lead: '결품·이상 신호를 먼저 받아, 전 지점이 같은 기준으로 채우고 대응합니다.',
        points: ['결품 신호를 채워야 할 순간에 알림', '본사 기준으로 정렬된 지점 점검', '야간 이상도 실시간 감지'],
        tag: 'saai care · store count',
      },
    },
    en: {
      eyebrow: 'Before · After',
      heading: 'From refilling after it empties, to knowing before it does',
      before: {
        label: 'Watching',
        lead: 'Customers find the empty shelf first. Revenue leaks for every minute the product is gone.',
        points: ['Empty shelves found only on rounds', 'Check standards differ by store', 'Overnight anomalies seen next morning'],
      },
      after: {
        label: 'Knowing first',
        lead: 'Out-of-stock and anomaly signals arrive first — every store restocks and responds by the same standard.',
        points: ['Stock-out alert at the moment to refill', 'Store checks aligned to the HQ standard', 'Overnight anomalies detected live'],
        tag: 'saai care · store count',
      },
    },
    jp: {
      eyebrow: 'Before · After',
      heading: '空いてから補充から、空く前に分かる陳列へ',
      before: {
        label: '見守る運営',
        lead: '空いた棚はお客様が先に見つけます。商品がなかった時間の分だけ、売上が逃げていきます。',
        points: ['棚の欠品は巡回時にようやく発見', '店舗ごとに異なる点検基準', '夜間の異常は翌朝にしか分からない'],
      },
      after: {
        label: '先に気づく運営',
        lead: '欠品・異常のサインを先に受け取り、全店舗が同じ基準で補充・対応します。',
        points: ['補充すべき瞬間に欠品アラート', '本部基準に揃った店舗点検', '夜間の異常もリアルタイム検知'],
        tag: 'saai care · store count',
      },
    },
  },
  'food-beverage': {
    ko: {
      eyebrow: '전 · 후 비교',
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
  'drug-store': {
    ko: {
      eyebrow: '전 · 후 비교',
      heading: '항의받고 채우기에서, 비기 전에 채우기로',
      before: {
        label: '지켜보던 운영',
        lead: '결품도 흐트러짐도 손님이 말해줘야 압니다. 어느 매대가 팔리는지는 감으로.',
        points: ['결품은 항의받은 뒤에야 확인', '진열·가격표 오류를 놓침', '잘 팔리는 매대는 감으로 판단'],
      },
      after: {
        label: '먼저 아는 운영',
        lead: '결품·매대 이상을 실시간 감지하고, 구역별 관심으로 진열을 바꿉니다.',
        points: ['빈 매대·흐트러짐 실시간 감지', '가격표 오류·오염까지 확인', '구역 관심(HOT ZONE)으로 진열 최적화'],
        tag: 'saai care · saai insight',
      },
    },
    en: {
      eyebrow: 'Before · After',
      heading: 'From restocking after a complaint, to restocking before it runs out',
      before: {
        label: 'Watching',
        lead: 'You learn of an out-of-stock or a mess only when a customer points it out — and which aisle sells is a guess.',
        points: ['Out-of-stocks caught only after a complaint', 'Misplacements and price-tag errors missed', 'Best-selling aisles judged by gut'],
      },
      after: {
        label: 'Knowing first',
        lead: 'Out-of-stocks and shelf issues sensed live, and zone interest reshapes the display.',
        points: ['Empty shelves and disarray sensed live', 'Price-tag errors and spills caught too', 'Zone interest (HOT ZONE) optimises the display'],
        tag: 'saai care · saai insight',
      },
    },
    jp: {
      eyebrow: 'Before · After',
      heading: 'クレームを受けてから補充から、切れる前に補充へ',
      before: {
        label: '見守る運営',
        lead: '欠品も乱れも、お客様に言われて初めて分かります。どの棚が売れるかは勘で。',
        points: ['欠品はクレーム後にしか分からない', '陳列・値札の誤りを見落とす', '売れる棚は勘で判断'],
      },
      after: {
        label: '先に気づく運営',
        lead: '欠品・棚の異常をリアルタイムで検知し、ゾーン別の関心で陳列を変えます。',
        points: ['空き棚・乱れをリアルタイム検知', '値札の誤り・汚れまで確認', 'ゾーン関心(HOT ZONE)で陳列最適化'],
        tag: 'saai care · saai insight',
      },
    },
  },
  'large-space': {
    ko: {
      eyebrow: '전 · 후 비교',
      heading: '카메라마다 따로 보기에서, 공간을 하나로 보기로',
      before: {
        label: '지켜보던 운영',
        lead: '여러 대의 카메라를 따로 봅니다. 넓은 공간의 혼잡과 동선은 사각지대에 남죠.',
        points: ['카메라별로 따로 모니터링', '층·구역 혼잡은 사후에 파악', '넓은 공간의 이상 동선을 놓침'],
      },
      after: {
        label: '먼저 아는 운영',
        lead: 'MTMC로 여러 카메라를 하나의 좌표로 이어, 혼잡·이상 동선을 먼저 감지합니다.',
        points: ['여러 카메라 → 하나의 공간 좌표', '구역별 혼잡·체류를 실시간으로', '이상 동선을 임계 전에 감지'],
        tag: 'saai care · MTMC',
      },
    },
    en: {
      eyebrow: 'Before · After',
      heading: 'From watching each camera apart, to seeing the space as one',
      before: {
        label: 'Watching',
        lead: 'You watch many cameras separately — and crowding and flow across a large space stay in the blind spots.',
        points: ['Monitored camera by camera', 'Floor and zone crowding grasped after the fact', 'Unusual paths across a large space missed'],
      },
      after: {
        label: 'Knowing first',
        lead: 'MTMC links many cameras into one coordinate — sensing crowding and unusual paths first.',
        points: ['Many cameras → one spatial coordinate', 'Zone crowding and dwell, live', 'Unusual paths sensed before the threshold'],
        tag: 'saai care · MTMC',
      },
    },
    jp: {
      eyebrow: 'Before · After',
      heading: 'カメラごとに見るから、空間を一つで見るへ',
      before: {
        label: '見守る運営',
        lead: '複数のカメラを別々に見ます。広い空間の混雑や動線は死角に残ります。',
        points: ['カメラごとに別々に監視', 'フロア・ゾーンの混雑は事後に把握', '広い空間の異常動線を見落とす'],
      },
      after: {
        label: '先に気づく運営',
        lead: 'MTMCで複数のカメラを一つの座標につなぎ、混雑・異常動線を先に検知。',
        points: ['複数カメラ → 一つの空間座標', 'ゾーン別の混雑・滞在をリアルタイムで', '異常動線を閾値前に検知'],
        tag: 'saai care · MTMC',
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
