'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Circle } from 'lucide-react';
import { cctvByDetection } from '@/data/cctvImages';
import { storeCareScenarios } from '@/data/storeCareScenarios';
import type { StoreCareScenario } from '@/data/storeCareScenarios';

const StoreCareMockup = dynamic(() => import('@/components/mockups/StoreCareMockup'), {
  loading: () => <div className="min-h-[480px] bg-gray-50 animate-pulse rounded-2xl" />,
  ssr: false,
});

const tabs = [
  {
    key: 'contamination' as const,
    label: '테이블 청결',
    badge: '청결 필요',
    badgeColor: 'bg-red-500',
    images: cctvByDetection.contamination,
    scenario: storeCareScenarios.find((s) => s.id === 'contamination')!,
  },
  {
    key: 'intrusion' as const,
    label: '야간 안전',
    badge: '이상 감지',
    badgeColor: 'bg-amber-500',
    images: cctvByDetection.intrusion,
    scenario: storeCareScenarios.find((s) => s.id === 'intrusion')!,
  },
  {
    key: 'display' as const,
    label: '결품 알림',
    badge: '재고 필요',
    badgeColor: 'bg-blue-500',
    images: cctvByDetection.display,
    scenario: storeCareScenarios.find((s) => s.id === 'shelf-empty')!,
  },
  {
    key: 'equipment' as const,
    label: '온도 경고',
    badge: '온도 이상',
    badgeColor: 'bg-orange-500',
    images: cctvByDetection.equipment,
    scenario: storeCareScenarios.find((s) => s.id === 'fridge-open')!,
  },
] as const satisfies {
  key: string;
  label: string;
  badge: string;
  badgeColor: string;
  images: readonly { src: string; alt: string; cam: string; desc: string }[];
  scenario: StoreCareScenario;
}[];

type TabKey = (typeof tabs)[number]['key'];

export default function DetectionGallery() {
  const [activeTab, setActiveTab] = useState<TabKey>('contamination');

  const tab = tabs.find((t) => t.key === activeTab)!;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      {/* 섹션 헤더 */}
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-emerald-400 mb-3 tracking-wider uppercase">Detection Gallery</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 break-keep">
          문제 생기기 전에 먼저 알려드려요
        </h2>
        <p className="text-gray-300">
          24시간 AI가 매장 상황을 자동으로 감지하고, 확인이 필요한 순간에만 알림을 보내요
        </p>
      </div>

      {/* 탭 */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === t.key
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 2-column: 폰 목업 | CCTV 썸네일 그리드 */}
      <div className="flex flex-col lg:flex-row gap-8 items-center">

        {/* 왼쪽: 폰 목업 — 목업 동작이 핵심 */}
        <div className="w-full lg:w-auto lg:flex-shrink-0 flex justify-center">
          {/* Fixed size container to prevent layout shift */}
          <div className="w-full max-w-[360px]" style={{ aspectRatio: '9/19', maxHeight: '720px' }}>
            <StoreCareMockup scenarios={[tab.scenario]} active />
          </div>
        </div>

        {/* 오른쪽: CCTV 썸네일 참조 그리드 */}
        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">CCTV 참조 화면</p>
            <p className="text-sm text-gray-500">생성 이미지 예시 · 실제 화면과 다를 수 있습니다</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {tab.images.map((img) => (
              <div
                key={img.src}
                className="rounded-xl overflow-hidden bg-gray-950 border border-gray-800 relative"
              >
                {/* CCTV 상단 바 */}
                <div className="flex items-center justify-between px-3 py-2 bg-gray-900 border-b border-gray-800">
                  <span className="text-3xs font-bold text-gray-500 tracking-widest">{img.cam}</span>
                  <div className="flex items-center gap-1.5">
                    <Circle className="w-2 h-2 fill-red-500 text-red-500" />
                    <span className="text-[9px] font-bold text-red-400 tracking-wider">REC</span>
                  </div>
                </div>

                {/* 썸네일 이미지 */}
                <div className="relative aspect-video">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 45vw, 280px"
                    loading="lazy"
                  />
                  {/* 감지 배지 */}
                  <div className="absolute top-2 left-2">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded ${tab.badgeColor} text-white text-3xs font-bold`}>
                      <Circle className="w-1.5 h-1.5 fill-white animate-pulse" />
                      {tab.badge}
                    </span>
                  </div>
                  {/* 스캔라인 오버레이 */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.04]"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }}
                    aria-hidden="true"
                  />
                </div>

                {/* 구역 설명 */}
                <div className="px-3 py-2 bg-gray-900">
                  <p className="text-3xs text-gray-500 truncate">{img.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-4 flex items-start gap-1.5">
            <span className="shrink-0 mt-0.5">ⓘ</span>
            개인정보를 건드리지 않습니다. 앱에는 AI 감지 알림만 전송됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
