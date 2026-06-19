'use client';

import { useState, useCallback, useMemo, useRef, memo } from 'react';
import Link from 'next/link';
import { MapPin, CheckSquare, Lightbulb, Calendar, ChevronLeft } from 'lucide-react';
import { areaTypes } from '@/data/briefingData';
import { buildWeeklySamples } from '@/data/seasonal';
import type { DailyBriefing } from '@/data/seasonal';
import { BriefingMockup } from '@/components/mockups/BriefingMockup';

const DayInsightPanel = memo(function DayInsightPanel({ daily }: { daily: DailyBriefing }) {
  const { scenario } = daily;

  return (
    <div className="space-y-6">
      {/* Day Theme */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {daily.date} 브리핑
        </h3>
        <p className="text-sm text-gray-500">{daily.theme}</p>
      </div>

      {/* Key Events */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-500 shrink-0" aria-hidden="true" /> 오늘의 핵심 포인트
        </h4>
        <div className="space-y-3">
          {scenario.events.map((event, idx) => (
            <div key={`evt-${idx}`} className="flex items-start gap-3">
              <span className="text-lg shrink-0" aria-hidden="true">{event.icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-800">{event.title}</p>
                <p className="text-xs text-gray-500">{event.detail}</p>
                <p className="text-xs text-primary font-medium mt-0.5">&rarr; {event.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist Preview */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" /> SA가 정리해 준 체크리스트
        </h4>
        <div className="space-y-2">
          {scenario.checklist.map((item, idx) => (
            <div key={`chk-${idx}`} className="flex items-start gap-2">
              <div className="w-4 h-4 border-2 border-primary/30 rounded mt-0.5 shrink-0 bg-primary/5" aria-hidden="true" />
              <span className="text-sm text-gray-600">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Tip */}
      {scenario.tips[0] && (
        <div className="bg-primary-lighter rounded-xl p-5 border border-primary/10">
          <h4 className="text-sm font-bold text-primary-dark mb-2 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" /> 핵심 준비 팁
          </h4>
          <p className="text-sm text-gray-700">{scenario.tips[0].text}</p>
          <p className="text-sm text-primary font-semibold mt-1">&rarr; {scenario.tips[0].action}</p>
        </div>
      )}

      {/* Week Preview */}
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
        <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary shrink-0" aria-hidden="true" /> 이번 주 미리보기
        </h4>
        <div className="space-y-1.5">
          {scenario.weekPreview.map((item, idx) => (
            <p key={`wp-${idx}`} className="text-sm text-gray-600 flex items-start gap-1.5">
              <span className="text-gray-300 shrink-0" aria-hidden="true">&bull;</span>
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
});

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

export default function SamplePageClient() {
  const [areaIndex, setAreaIndex] = useState(0);
  const [dayIndex, setDayIndex] = useState(0);

  const weeklySamples = useMemo(() => buildWeeklySamples(), []);

  const activeArea = areaTypes[areaIndex] ?? areaTypes[0];
  const activeSample = weeklySamples[areaIndex] ?? weeklySamples[0];
  const activeDaily = activeSample.days[dayIndex] ?? activeSample.days[0];

  const contentRef = useRef<HTMLElement>(null);

  const handleAreaChange = useCallback((index: number) => {
    setAreaIndex(index);
    setDayIndex(0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 pt-8 pb-12 sm:pb-16">
          {/* 뒤로가기 */}
          <div className="mb-6">
            <Link
              href="/storeagent/blog"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              블로그로 돌아가기
            </Link>
          </div>
          <div className="text-center">
            <p className="text-sm text-primary font-medium mb-3">
              {weeklySamples[0]?.weekTitle}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              1주일 브리핑 미리보기
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              매일 아침, 상권에 맞춘 브리핑을 받아보세요.
              <br className="hidden sm:block" />
              요일마다 달라지는 예시 브리핑을 체험해 보세요.
            </p>
          </div>
        </div>
      </section>

      {/* Controls — sticky on md+, scrollable on mobile */}
      <div className="md:sticky md:top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-2 space-y-2">
          {/* Area Tabs */}
          <div className="flex justify-center gap-2 sm:gap-3">
            {areaTypes.map((area, index) => (
              <button
                key={area.id}
                onClick={() => handleAreaChange(index)}
                aria-label={`${area.label} 상권 선택`}
                aria-pressed={areaIndex === index}
                className={`flex items-center gap-1.5 px-3 sm:px-5 py-2 min-w-[44px] min-h-[44px] rounded-full text-sm font-medium cursor-pointer transition-colors ${
                  areaIndex === index
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span aria-hidden="true">{area.icon}</span>
                <span className="hidden sm:inline">{area.label}</span>
              </button>
            ))}
          </div>

          {/* Day Selector — compact pills with date */}
          <div className="flex justify-center gap-1 sm:gap-1.5 overflow-x-auto pb-0.5 snap-x snap-mandatory">
            {DAYS.map((day, index) => {
              const daily = activeSample.days[index];
              const dateShort = daily.date.replace(/\s*\(.*\)/, '');
              return (
                <button
                  key={day}
                  onClick={() => setDayIndex(index)}
                  aria-label={`${day}요일 ${daily.date} 선택`}
                  aria-pressed={dayIndex === index}
                  className={`min-w-[3rem] min-h-[44px] px-3 py-2 rounded-lg text-center cursor-pointer transition-colors snap-center ${
                    dayIndex === index
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="block text-xs font-bold">{day}</span>
                  <span className={`block text-3xs mt-0.5 ${dayIndex === index ? 'text-white/80' : 'text-gray-500'}`}>{dateShort}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section ref={contentRef} className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Current Selection Summary */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">
            {activeArea.icon} {activeArea.location} &middot; {activeDaily.date} &middot; {activeDaily.theme}
          </p>
        </div>
        <div
          key={`${activeArea.id}-${dayIndex}`}
          className="animate-fade-switch"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left: Briefing Mockup */}
            <div className="w-full lg:w-5/12">
              <BriefingMockup
                area={activeArea}
                scenario={activeDaily.scenario}
                dateOverride={activeDaily.date}
                timeOverride="오전 7:00"
              />
            </div>

            {/* Right: Day Insight Panel */}
            <div className="w-full lg:w-7/12">
              <DayInsightPanel daily={activeDaily} />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 max-w-2xl mx-auto">
            매일 아침, 맞춤 브리핑을 받아보세요
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            날씨, 주변 이벤트, 오늘 체크할 것들을 매일 정리해 드립니다.
            <br className="hidden sm:block" />
            본사 연동 없이 바로 시작하세요.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              무료 상담 신청
            </Link>
            <Link href="/" className="btn-secondary">
              서비스 더 알아보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
