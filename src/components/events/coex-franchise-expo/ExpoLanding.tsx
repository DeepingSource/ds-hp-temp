import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { type Event } from '@/data/events/types';
import { localeHref, type Locale } from '@/lib/i18n';
import ExpoHero from './sections/ExpoHero';
import ProductStory from './sections/ProductStory';
import DetectionGrid from './sections/DetectionGrid';
import PopBeforeAfter from './sections/PopBeforeAfter';
import OnsiteProgram from './sections/OnsiteProgram';
import BoothCta from './sections/BoothCta';
import { CountMockup } from './mockups';
import { count } from './data';

/**
 * COEX 프랜차이즈 창업박람회 전용 랜딩 오케스트레이터 (계획 §3·§4).
 * 날짜·부스·CTA는 Event(프론트매터)를 그대로 props로 전달 — SoT 단일 유지.
 * eventRoutes.tsx가 ko + 이 slug에서만 이 뷰를 태운다(다른 이벤트/로케일은 기존 템플릿).
 */
const BACK: Record<Locale, string> = { ko: '이벤트 목록으로', en: 'Back to events', jp: 'イベント一覧へ' };

export default function ExpoLanding({ event, locale }: { event: Event; locale: Locale }) {
  const DownloadIcon = count.download.icon;
  const PrivacyIcon = count.privacy.icon;

  const countFootnote = (
    <>
      <div className="flex items-start gap-2 text-sm text-gray-600">
        <DownloadIcon className="w-4 h-4 mt-0.5 text-primary shrink-0" aria-hidden="true" />
        <span className="break-keep">{count.download.text}</span>
      </div>
      <div className="flex items-start gap-2 rounded-xl bg-primary/5 border border-primary/10 px-4 py-3 text-sm text-gray-600">
        <PrivacyIcon className="w-4 h-4 mt-0.5 text-primary shrink-0" aria-hidden="true" />
        <span className="break-keep">{count.privacy.text}</span>
      </div>
    </>
  );

  return (
    <div className="bg-white min-h-screen">
      <ExpoHero event={event} locale={locale} />

      {/* 섹션 2 — saai count (상권분석) */}
      <ProductStory
        id="count"
        eyebrow={count.eyebrow}
        eyebrowSub={count.eyebrowSub}
        question={count.question}
        lead={count.lead}
        media={<CountMockup locale={locale} />}
        mediaSide="right"
        features={count.features}
        footnote={countFootnote}
      />

      {/* 섹션 3 — saai care (이상 상황 알림) */}
      <DetectionGrid locale={locale} />

      {/* 섹션 4 — saai store (POP메이커) */}
      <PopBeforeAfter />

      {/* 섹션 5 — 현장 프로그램 */}
      <OnsiteProgram />

      {/* 섹션 6 — 방문 예약 */}
      <BoothCta event={event} locale={locale} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href={localeHref(locale, '/events')}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {BACK[locale]}
        </Link>
      </div>
    </div>
  );
}
