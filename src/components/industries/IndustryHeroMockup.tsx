'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { prefersReducedMotion } from '@/lib/prefersReducedMotion';
import { Store, Coffee, MonitorOff, Pill, ShoppingCart, Landmark, Warehouse, Activity, AlertTriangle, type LucideIcon } from 'lucide-react';
import { industryColorMap } from '@/data/industryList';
import { industryThumbs } from '@/data/siteImages';
import ScanlineOverlay from '@/components/mockups/ScanlineOverlay';

const IndustryIconMap: Record<string, LucideIcon> = {
  convenience: Store,
  cafe: Coffee,
  unmanned: MonitorOff,
  drugstore: Pill,
  mart: ShoppingCart,
  exhibition: Landmark,
  logistics: Warehouse,
};

/** 업종별 실시간 감지 알림 피드 (2건) */
const alertsBySlug: Record<string, { msg: string; cam: string; ago: string; urgent: boolean }[]> = {
  convenience: [
    { msg: '진열 결품 감지', cam: 'CAM 03', ago: '방금 전', urgent: true },
    { msg: '야간 이상 행동', cam: 'CAM 01', ago: '8분 전',  urgent: false },
  ],
  cafe: [
    { msg: '테이블 잔여물', cam: 'CAM 02', ago: '방금 전', urgent: true },
    { msg: '혼잡 임계치 초과', cam: '홀',    ago: '4분 전',  urgent: false },
  ],
  unmanned: [
    { msg: '냉장 문 열림 4분', cam: 'CAM 02', ago: '방금 전', urgent: true },
    { msg: '무인 구역 진입', cam: 'CAM 05', ago: '11분 전', urgent: false },
  ],
  drugstore: [
    { msg: '가격 라벨 누락', cam: 'CAM 04', ago: '방금 전', urgent: true },
    { msg: '진열 상품 미정돈', cam: 'CAM 07', ago: '6분 전',  urgent: false },
  ],
  mart: [
    { msg: '결품 경고 — 신선식품', cam: 'CAM 09', ago: '방금 전', urgent: true },
    { msg: '청소 필요 구역', cam: 'CAM 12',  ago: '9분 전',  urgent: false },
  ],
  exhibition: [
    { msg: '혼잡도 위험 — B관', cam: 'CAM 06', ago: '방금 전', urgent: true },
    { msg: '체류 시간 이탈', cam: 'CAM 03',    ago: '3분 전',  urgent: false },
  ],
  logistics: [
    { msg: '안전 구역 이탈', cam: 'CAM 08', ago: '방금 전', urgent: true },
    { msg: '처리량 지연 감지', cam: 'CAM 11', ago: '7분 전',  urgent: false },
  ],
};

interface Stat {
  icon: string;
  stat: string;
  label: string;
}

interface Props {
  slug: string;
  color: string;
  label: string;
  stats: Stat[];
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

export default function IndustryHeroMockup({ slug, color, label, stats }: Props) {
  const colors = industryColorMap[color] ?? industryColorMap.slate;
  const IndustryIcon = IndustryIconMap[slug] ?? Store;
  const thumbs = industryThumbs[slug] ?? industryThumbs.convenience;
  const alerts = alertsBySlug[slug] ?? alertsBySlug.convenience;

  const [timeStr, setTimeStr] = useState('--:--');
  useEffect(() => {
    const now = new Date();
    setTimeStr(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
  }, []);

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay: 0.1 }}
      className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50"
    >
      {/* 브라우저 크롬 헤더 */}
      <div className="bg-slate-800/80 backdrop-blur-sm px-5 py-3.5 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-400/70" />
          <span className="w-3 h-3 rounded-full bg-amber-400/70" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <div className={`w-6 h-6 rounded-lg ${colors.bg} flex items-center justify-center`}>
            <IndustryIcon className={`w-3.5 h-3.5 ${colors.text}`} />
          </div>
          <span>SAAI · {label} 분석 현황</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE
        </div>
      </div>

      {/* 대시보드 본문 */}
      <div className="bg-slate-800/60 backdrop-blur-sm p-5 sm:p-6">

        {/* 핵심 지표 3개 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 gap-3 mb-5"
        >
          {stats.map((item) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className="bg-white/5 rounded-xl p-3.5 border border-white/10"
            >
              <p className={`text-xl sm:text-2xl font-black tabular-nums mb-0.5 ${colors.text}`}>
                {item.stat}
              </p>
              <p className="text-2xs text-slate-400 leading-snug break-keep">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CCTV 피드 + 알림 피드 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-3 mb-4"
        >
          {/* CCTV 썸네일 2장 */}
          <motion.div variants={itemVariants} className="space-y-2">
            <p className="text-3xs font-bold text-slate-500 uppercase tracking-wider">Live Feed</p>
            {thumbs.map((src, i) => (
              <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <Image
                  src={src}
                  alt={`${label} CCTV CAM 0${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 40vw, 200px"
                  className="object-cover"
                  loading="lazy"
                />
                {/* 스캔라인 오버레이 */}
                <ScanlineOverlay />
                {/* CAM 라벨 */}
                <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-black/60 rounded text-[9px] font-bold text-white font-mono">
                  CAM 0{i + 1}
                </div>
                {/* LIVE 닷 */}
                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            ))}
          </motion.div>

          {/* 실시간 알림 피드 */}
          <motion.div variants={itemVariants} className="space-y-2">
            <p className="text-3xs font-bold text-slate-500 uppercase tracking-wider">Alerts</p>
            <div className="bg-white/5 rounded-xl border border-white/10 p-3 space-y-3">
              {alerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-2">
                  <AlertTriangle
                    className={`w-3 h-3 mt-0.5 flex-shrink-0 ${alert.urgent ? 'text-amber-400' : 'text-slate-500'}`}
                  />
                  <div className="min-w-0">
                    <p className="text-2xs font-semibold text-slate-200 leading-snug break-keep">{alert.msg}</p>
                    <p className="text-3xs text-slate-500 font-mono">{alert.cam} · {alert.ago}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-1.5 pt-1 border-t border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                <p className="text-3xs text-emerald-400 font-semibold">AI 분석 정상 운영 중</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 활동 인디케이터 바 */}
        <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-xs text-slate-400">
            <Activity className="w-3.5 h-3.5 text-slate-500" />
            <span>오늘 {timeStr} · 실시간 분석 중</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="hidden sm:inline">카메라</span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')} opacity-70`}
                />
              ))}
            </div>
            <span>3대 연결됨</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
