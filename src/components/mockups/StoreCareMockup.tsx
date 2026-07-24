'use client';

import Image from 'next/image';
import {
  Camera, AlertCircle, ThermometerSnowflake, UserX, CheckCircle2, Store,
  Package, Trash2,
} from 'lucide-react';
import { cctvImages } from '@/data/cctvImages';
import { storeCareScenarios } from '@/data/storeCareScenarios';
import type { StoreCareScenario } from '@/data/storeCareScenarios';
import { useEffect, memo } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useMockupLoop } from '@/hooks/useMockupLoop';
import { motion, useAnimate } from 'framer-motion';
import TapIndicator from '@/components/ui/TapIndicator';
import PhoneFrame from './PhoneFrame';
import PhoneScreen from './PhoneScreen';
import MockupViewport from './MockupViewport';
import ScanlineOverlay from './ScanlineOverlay';
import { MOCKUP_SCHEME, PRODUCT_THEME, MOCKUP_DEVICE } from '@/lib/mockup-tokens';
import { SAAI_COLORS } from '@/lib/mockup-tokens.gen';
import { type Locale } from '@/lib/i18n';

interface ScenarioText {
  cameraLabel: string;
  calmMsg: string;
  detectingTitle: string;
  detectingDesc: string;
  alertTitle: string;
  alertDesc: string;
  resolvedDesc: string;
}

const C: Record<Locale, {
  monitoring: string;
  statusCalm: string;
  statusDetecting: string;
  statusAlerting: string;
  statusResolved: string;
  timeJustChecked: string;
  timeResolved: string;
  timeJustNow: string;
  allZonesNormal: string;
  eventResolved: string;
  btnCheckCamera: string;
  btnCheckStatus: string;
  watchZone: string;
  counterStay: string;
  counterStaySub: string;
  kioskClean: string;
  kioskCleanSub: string;
  frontEntrance: string;
  badgeDetecting: string;
  badgeAlerting: string;
  storeNames: Record<string, string>;
  scenarios: Record<string, ScenarioText>;
}> = {
  ko: {
    monitoring: '실시간 모니터링',
    statusCalm: '정상 운영 중',
    statusDetecting: '이상 감지',
    statusAlerting: '긴급 알림',
    statusResolved: '해결됨',
    timeJustChecked: '방금 확인',
    timeResolved: '처리 완료',
    timeJustNow: '방금 전',
    allZonesNormal: '모든 구역 정상',
    eventResolved: '이벤트 해결됨',
    btnCheckCamera: '카메라 확인',
    btnCheckStatus: '상태 확인하기',
    watchZone: '주의 관찰 구역',
    counterStay: '카운터 장기 체류 감지',
    counterStaySub: '야간 무인 모드 (15분 전)',
    kioskClean: '결제 키오스크 앞 청결',
    kioskCleanSub: '양호 상태 확인 (30분 전)',
    frontEntrance: '전면 입구',
    badgeDetecting: '감지 중',
    badgeAlerting: '이상 감지',
    storeNames: { '강남역점': '강남역점' },
    scenarios: {
      'fridge-open': {
        cameraLabel: '음료 냉장고',
        calmMsg: '4개 카메라 모두 정상 모니터링 중입니다.',
        detectingTitle: '음료 냉장고 이상 감지 중',
        detectingDesc: '냉장고 문 열림 패턴 분석 중. 잠시 후 알림이 발생할 수 있습니다.',
        alertTitle: '음료 냉장고 문 열림 감지',
        alertDesc: '냉장고 문 3분째 열림. 내부 12°C 상승 중.',
        resolvedDesc: '내부 온도가 정상 범위로 복구됐습니다. 이벤트가 기록되었습니다.',
      },
      'shelf-empty': {
        cameraLabel: '음료 진열대',
        calmMsg: '매대 진열 상태 정상, 4개 구역 모니터링 중입니다.',
        detectingTitle: '진열대 결품 패턴 분석 중',
        detectingDesc: '음료 진열대 빈 공간이 감지됩니다. 재고 보충이 필요할 수 있습니다.',
        alertTitle: '음료 진열대 결품 감지',
        alertDesc: '음료 진열 1시간째 보충 필요. 전면 30% 미만.',
        resolvedDesc: '진열 보충 완료 확인. 정상 재고 수준으로 복구됐습니다.',
      },
      'contamination': {
        cameraLabel: '쓰레기통',
        calmMsg: '청결 상태 양호, 전 구역 정상입니다.',
        detectingTitle: '청결 이상 패턴 감지 중',
        detectingDesc: '쓰레기통 주변 오염이 감지됩니다. 청소 담당자 확인이 필요할 수 있습니다.',
        alertTitle: '쓰레기통 과적 감지',
        alertDesc: '쓰레기통 50분째 미확인. 즉시 정리 필요.',
        resolvedDesc: '청결 처리 완료. 해당 구역이 정상 상태로 복구됐습니다.',
      },
      'intrusion': {
        cameraLabel: '야간 IR',
        calmMsg: '야간 무인 모드 정상 작동 중입니다.',
        detectingTitle: '야간 이상 동선 분석 중',
        detectingDesc: '야간 무인 구역에서 이상 체류 패턴이 감지됩니다. 확인 중입니다.',
        alertTitle: '야간 이상 체류 감지',
        alertDesc: '야간 무인 구역 20분째 체류. 즉시 확인.',
        resolvedDesc: '체류 종료 확인. 야간 무인 모드 정상 복귀됐습니다.',
      },
    },
  },
  en: {
    monitoring: 'live monitoring',
    statusCalm: 'Operating normally',
    statusDetecting: 'Anomaly detected',
    statusAlerting: 'Urgent alert',
    statusResolved: 'Resolved',
    timeJustChecked: 'Just checked',
    timeResolved: 'Handled',
    timeJustNow: 'Just now',
    allZonesNormal: 'All zones normal',
    eventResolved: 'Event resolved',
    btnCheckCamera: 'View camera',
    btnCheckStatus: 'Check status',
    watchZone: 'Zones to watch',
    counterStay: 'Long stay at counter detected',
    counterStaySub: 'Unmanned night mode (15 min ago)',
    kioskClean: 'Checkout kiosk area clean',
    kioskCleanSub: 'Good condition confirmed (30 min ago)',
    frontEntrance: 'Front entrance',
    badgeDetecting: 'Detecting',
    badgeAlerting: 'Anomaly',
    storeNames: { '강남역점': 'Gangnam' },
    scenarios: {
      'fridge-open': {
        cameraLabel: 'Beverage fridge',
        calmMsg: 'All 4 cameras monitoring normally.',
        detectingTitle: 'Beverage fridge anomaly detecting',
        detectingDesc: 'Analyzing fridge door-open pattern. An alert may follow shortly.',
        alertTitle: 'Beverage fridge door open',
        alertDesc: 'The fridge door has been open for over 3 min. Internal temperature (12°C) is rising.',
        resolvedDesc: 'Internal temperature back to normal range. Event logged.',
      },
      'shelf-empty': {
        cameraLabel: 'Beverage shelf',
        calmMsg: 'Shelf stocking normal, monitoring 4 zones.',
        detectingTitle: 'Analyzing shelf out-of-stock pattern',
        detectingDesc: 'Empty space detected on the beverage shelf. Restock may be needed.',
        alertTitle: 'Beverage shelf out of stock',
        alertDesc: 'The beverage shelf has needed restocking for 1 hour. Front display is below 30%.',
        resolvedDesc: 'Restock confirmed. Back to normal inventory level.',
      },
      'contamination': {
        cameraLabel: 'Trash bin',
        calmMsg: 'Cleanliness good, all zones normal.',
        detectingTitle: 'Detecting cleanliness anomaly',
        detectingDesc: 'Contamination detected around the trash bin. Staff check may be needed.',
        alertTitle: 'Trash bin overflow detected',
        alertDesc: 'Trash bin cleanliness unconfirmed for 50 min. Immediate cleanup required.',
        resolvedDesc: 'Cleanup complete. The zone is back to normal.',
      },
      'intrusion': {
        cameraLabel: 'Night IR',
        calmMsg: 'Unmanned night mode operating normally.',
        detectingTitle: 'Analyzing abnormal night movement',
        detectingDesc: 'Abnormal stay pattern detected in the unmanned night zone. Verifying.',
        alertTitle: 'Abnormal night stay detected',
        alertDesc: 'A stay of over 20 min confirmed in the unmanned night zone. Check immediately.',
        resolvedDesc: 'Stay ended. Unmanned night mode back to normal.',
      },
    },
  },
  jp: {
    monitoring: 'リアルタイム監視',
    statusCalm: '正常に稼働中',
    statusDetecting: '異常検知',
    statusAlerting: '緊急アラート',
    statusResolved: '解決済み',
    timeJustChecked: '先ほど確認',
    timeResolved: '処理完了',
    timeJustNow: 'たった今',
    allZonesNormal: '全エリア正常',
    eventResolved: 'イベント解決済み',
    btnCheckCamera: 'カメラを確認',
    btnCheckStatus: '状態を確認する',
    watchZone: '要注意エリア',
    counterStay: 'カウンターでの長時間滞在を検知',
    counterStaySub: '夜間無人モード（15分前）',
    kioskClean: '決済キオスク前の清潔',
    kioskCleanSub: '良好な状態を確認（30分前）',
    frontEntrance: '正面入口',
    badgeDetecting: '検知中',
    badgeAlerting: '異常検知',
    storeNames: { '강남역점': '江南駅店' },
    scenarios: {
      'fridge-open': {
        cameraLabel: '飲料冷蔵庫',
        calmMsg: '4台のカメラすべてが正常に監視中です。',
        detectingTitle: '飲料冷蔵庫の異常を検知中',
        detectingDesc: '冷蔵庫のドア開放パターンを分析中です。まもなくアラートが発生する場合があります。',
        alertTitle: '飲料冷蔵庫のドア開放を検知',
        alertDesc: '3分以上冷蔵庫のドアが開いています。庫内温度（12°C）が上昇しています。',
        resolvedDesc: '庫内温度が正常範囲に復旧しました。イベントが記録されました。',
      },
      'shelf-empty': {
        cameraLabel: '飲料陳列棚',
        calmMsg: '陳列状態は正常、4エリアを監視中です。',
        detectingTitle: '陳列棚の欠品パターンを分析中',
        detectingDesc: '飲料陳列棚に空きスペースを検知しました。在庫補充が必要な場合があります。',
        alertTitle: '飲料陳列棚の欠品を検知',
        alertDesc: '1時間にわたり飲料陳列棚の補充が必要です。前面陳列が30%未満です。',
        resolvedDesc: '補充完了を確認しました。正常な在庫水準に復旧しました。',
      },
      'contamination': {
        cameraLabel: 'ゴミ箱',
        calmMsg: '清潔状態は良好、全エリア正常です。',
        detectingTitle: '清潔異常パターンを検知中',
        detectingDesc: 'ゴミ箱周辺の汚れを検知しました。清掃担当者の確認が必要な場合があります。',
        alertTitle: 'ゴミ箱の過積載を検知',
        alertDesc: '50分間ゴミ箱の清潔が確認されていません。直ちに整理が必要です。',
        resolvedDesc: '清掃処理が完了しました。該当エリアが正常状態に復旧しました。',
      },
      'intrusion': {
        cameraLabel: '夜間IR',
        calmMsg: '夜間無人モードが正常に作動中です。',
        detectingTitle: '夜間の異常動線を分析中',
        detectingDesc: '夜間無人エリアで異常な滞在パターンを検知しました。確認中です。',
        alertTitle: '夜間の異常滞在を検知',
        alertDesc: '夜間無人エリアで20分以上の滞在を確認しました。直ちにご確認ください。',
        resolvedDesc: '滞在の終了を確認しました。夜間無人モードに正常復帰しました。',
      },
    },
  },
};

const S = MOCKUP_SCHEME.light;
const P = PRODUCT_THEME.StoreCare;
const D = MOCKUP_DEVICE.phone;

type AlertPhase = 'calm' | 'detecting' | 'alerting' | 'resolved';

function AlertIcon({ type, className }: { type: StoreCareScenario['alertIcon']; className?: string }) {
  if (type === 'temperature') return <ThermometerSnowflake className={className} aria-hidden="true" />;
  if (type === 'display')     return <Package className={className} aria-hidden="true" />;
  if (type === 'contamination') return <Trash2 className={className} aria-hidden="true" />;
  return <UserX className={className} aria-hidden="true" />;
}

interface Props {
  active?: boolean;
  storeName?: string;
  locale?: Locale;
  /** 특정 시나리오 고정 (없으면 자동 순환) */
  scenarios?: StoreCareScenario[];
}

const PHASES: AlertPhase[] = ['calm', 'detecting', 'alerting', 'resolved'];
const PHASE_INTERVALS = [1500, 1700, 3600, 2200]; // 누적: 0→1500→3200→6800→9000

function StoreCareMockup({ active = true, storeName = '강남역점', locale = 'en', scenarios }: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const t = C[locale] ?? C.en;
  const list = scenarios ?? storeCareScenarios;
  const localizedStoreName = t.storeNames[storeName] ?? storeName;

  const { ref: containerRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  // Phase 순환을 useMockupLoop로 관리
  const { step: phaseIndex, hoverProps, loopKey } = useMockupLoop({
    steps: PHASES.length,
    intervals: PHASE_INTERVALS,
    active: isVisible && active && !reducedMotion,
    pauseOnHover: true,
  });

  const phase = reducedMotion ? 'alerting' : PHASES[phaseIndex];

  // 시나리오 인덱스를 루프 사이클 수(loopKey)에서 파생 — 별도 setInterval 제거로
  // phase 루프와 시나리오 전환의 타이머 드리프트 해소 (MOCKUP_REVIEW_v1 §3-2).
  const scenarioIndex = reducedMotion ? 0 : loopKey % list.length;
  const scenario = list[scenarioIndex];
  const st = t.scenarios[scenario.id] ?? {
    cameraLabel: scenario.cameraLabel,
    calmMsg: scenario.calmMsg,
    detectingTitle: scenario.detectingTitle,
    detectingDesc: scenario.detectingDesc,
    alertTitle: scenario.alertTitle,
    alertDesc: scenario.alertDesc,
    resolvedDesc: scenario.resolvedDesc,
  };

  const isCalm      = phase === 'calm';
  const isDetecting = phase === 'detecting';
  const isAlerting  = phase === 'alerting';
  const isResolved  = phase === 'resolved';

  const [alertScope, animateAlert] = useAnimate<HTMLDivElement>();
  useEffect(() => {
    if (!reducedMotion && phase === 'alerting' && alertScope.current) {
      animateAlert(alertScope.current, { x: [0, -5, 5, 0] }, { duration: 0.32, ease: 'easeInOut' });
    }
  }, [phase, reducedMotion, animateAlert]);

  // [1-⑦/A6] 콘텐츠 4번째 블록 — 직전 순환 시나리오를 '처리 완료' 상태로 승격해
  // 하단 여백을 채운다. 신규 카피 0: 기존 로케일 문자열(statusResolved·timeResolved·
  // alertTitle·resolvedDesc)만 재사용. 시나리오 1개 고정 시 현재 알림과 모순되므로 미표시.
  const prevScenario = list[(scenarioIndex + list.length - 1) % list.length];
  const pst = t.scenarios[prevScenario.id];
  const prevTitle = pst?.alertTitle ?? prevScenario.alertTitle;
  const prevDesc = pst?.resolvedDesc ?? prevScenario.resolvedDesc;

  return (
    // v2 계약: MockupViewport 고정 캔버스(phone 390×844) + --saai-* 토큰(.saai-scope 해석)
    <div ref={containerRef} {...hoverProps}>
    <MockupViewport design="phone">
    <PhoneFrame>
    <PhoneScreen statusBarBg="bg-white" homeBg="bg-gray-50">

      {/* App Header */}
      <div className={`${S.headerBg} ${D.headerPadding} border-b-2 ${P.headerBorder}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`${D.headerTitle} flex items-center gap-2 ${S.textPrimary}`}>
              <Store className="w-5 h-5 text-(--saai-chart-positive)" aria-hidden="true" />
              <span className="lowercase tracking-tight">
                <span className="font-normal opacity-50">saai</span><span className="opacity-30 mx-1">|</span>store care
              </span>
            </h3>
            <p className={`${S.textSecondary} ${D.headerSub} mt-1`}>{localizedStoreName} {t.monitoring}</p>
          </div>
          <div className="relative">
            <Camera className="w-6 h-6 text-gray-700" aria-hidden="true" />
            <span className={`absolute -top-1 -right-1 flex h-3 w-3 transition-opacity duration-300 ${isAlerting ? 'opacity-100' : 'opacity-0'}`}>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-(--saai-red-400) opacity-75" aria-hidden="true" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-(--saai-status-error) border-2 border-white" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3">
        {/* Alert Card — phase-driven */}
        <motion.div
          ref={alertScope}
          /* 컬러 섀도우(shadow-amber-50/red-100) → shadow-card 통일 (D2) */
          className={`bg-white rounded-xl shadow-card overflow-hidden transition-[border-color] duration-500 ${
            isDetecting
              ? 'border border-(--saai-yellow-300)'
              : isAlerting
              ? 'border border-(--saai-red-200)'
              : 'border border-gray-100'
          }`}
        >
          <div
            className={`px-4 py-2 border-b flex items-center justify-between transition-colors duration-500 ${
              isDetecting ? 'bg-(--saai-yellow-50) border-(--saai-yellow-100)'
              : isAlerting ? 'bg-(--saai-red-50) border-(--saai-red-100)'
              : 'bg-(--saai-green-50) border-(--saai-green-100)'
            }`}
          >
            <span className={`text-sm font-bold flex items-center gap-1.5 transition-colors duration-300 ${
              isDetecting ? 'text-(--saai-yellow-700)'
              : isAlerting ? 'text-(--saai-red-600)'
              : 'text-(--saai-chart-positive)'
            }`}>
              {isAlerting
                ? <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                : <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              }
              {isCalm ? t.statusCalm : isDetecting ? t.statusDetecting : isAlerting ? t.statusAlerting : t.statusResolved}
            </span>
            <span className={`text-xs font-medium ${
              isDetecting ? 'text-(--saai-yellow-600)'
              : isAlerting ? 'text-(--saai-red-500)'
              : 'text-(--saai-green-500)'
            }`}>
              {isCalm ? t.timeJustChecked : isResolved ? t.timeResolved : t.timeJustNow}
            </span>
          </div>

          <div className="p-4 flex gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500 ${
              isDetecting ? 'bg-(--saai-yellow-100)'
              : isAlerting ? 'bg-(--saai-red-100)'
              : 'bg-(--saai-green-100)'
            }`}>
              {isAlerting || isDetecting
                ? <AlertIcon
                    type={scenario.alertIcon}
                    className={`w-5 h-5 ${isDetecting ? 'text-(--saai-yellow-700)' : 'text-(--saai-red-600)'}`}
                  />
                : <CheckCircle2 className="w-5 h-5 text-(--saai-chart-positive)" aria-hidden="true" />
              }
            </div>
            <div>
              <p className="font-medium text-gray-900 text-base">
                {isCalm ? t.allZonesNormal
                : isDetecting ? st.detectingTitle
                : isAlerting ? st.alertTitle
                : t.eventResolved}
              </p>
              <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                {isCalm ? st.calmMsg
                : isDetecting ? st.detectingDesc
                : isAlerting ? st.alertDesc
                : st.resolvedDesc}
              </p>
              {(isAlerting || isDetecting) && (
                <div className="relative inline-block mt-2">
                  <TapIndicator visible={isAlerting} x={50} y={50} size={28} label="" />
                  <button type="button" tabIndex={-1} className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                    isDetecting ? 'text-(--saai-yellow-700) bg-(--saai-yellow-50)' : 'text-(--saai-chart-positive) bg-(--saai-green-50)'
                  }`}>
                    {isDetecting ? t.btnCheckCamera : t.btnCheckStatus}
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Regular Status */}
        <div className={`${S.cardClass} ${D.cardRadius} ${D.cardPadding}`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-sm font-bold ${S.textSecondary}`}>{t.watchZone}</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-(--saai-yellow-50) flex items-center justify-center shrink-0 mt-0.5">
                <UserX className="w-4 h-4 text-(--saai-yellow-600)" aria-hidden="true" />
              </div>
              <div>
                <p className={`text-base font-medium ${S.textPrimary}`}>{t.counterStay}</p>
                <p className={`text-sm ${S.textSecondary}`}>{t.counterStaySub}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-(--saai-status-success)" aria-hidden="true" />
              </div>
              <div>
                <p className={`text-base font-medium ${S.textPrimary}`}>{t.kioskClean}</p>
                <p className={`text-sm ${S.textSecondary}`}>{t.kioskCleanSub}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Camera Grid — 현재 시나리오 이미지 강조 */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          {/* Camera 1: 항상 정상 */}
          <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
            <Image
              src={cctvImages.heroCvsTopdown.src}
              alt=""
              fill
              className="object-cover opacity-75"
              sizes="120px"
              aria-hidden="true"
            />
            <ScanlineOverlay />
            <div className="absolute top-1.5 left-1.5 text-3xs text-white bg-black/50 px-2 py-0.5 rounded flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-(--saai-status-success)" aria-hidden="true" />
              {t.frontEntrance}
            </div>
          </div>

          {/* Camera 2: 현재 시나리오 CCTV */}
          <div className={`aspect-video bg-gray-900 rounded-lg relative overflow-hidden transition-[box-shadow] duration-500 ${
            isDetecting ? 'ring-1 ring-(--saai-status-warning)/70' : isAlerting ? 'ring-1 ring-(--saai-status-error)/70' : ''
          }`}>
            <Image
              src={scenario.cctv.src}
              alt=""
              fill
              className="object-cover opacity-75"
              sizes="120px"
              aria-hidden="true"
            />
            <ScanlineOverlay />
            {/* Phase tint overlay */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                isDetecting ? 'opacity-100 bg-(--saai-status-warning)/15'
                : isAlerting ? 'opacity-100 bg-(--saai-status-error)/15'
                : 'opacity-0 bg-transparent'
              }`}
              aria-hidden="true"
            />
            {/* Bounding box corner markers */}
            {(isDetecting || isAlerting) && (
              <motion.div
                className="absolute pointer-events-none"
                style={{ top: '14%', left: '8%', width: '58%', height: '66%' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                aria-hidden="true"
              >
                <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${isAlerting ? 'border-(--saai-red-400)' : 'border-(--saai-status-warning)'}`} />
                <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${isAlerting ? 'border-(--saai-red-400)' : 'border-(--saai-status-warning)'}`} />
                <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${isAlerting ? 'border-(--saai-red-400)' : 'border-(--saai-status-warning)'}`} />
                <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${isAlerting ? 'border-(--saai-red-400)' : 'border-(--saai-status-warning)'}`} />
              </motion.div>
            )}
            <div className="absolute top-1.5 left-1.5 text-3xs text-white bg-black/50 px-2 py-0.5 rounded flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                isDetecting ? 'bg-(--saai-status-warning) animate-pulse motion-reduce:animate-none'
                : isAlerting ? 'bg-(--saai-status-error) animate-pulse motion-reduce:animate-none'
                : 'bg-(--saai-status-success)'
              }`} aria-hidden="true" />
              {st.cameraLabel}
            </div>
            <div className={`absolute bottom-1.5 right-1.5 text-3xs px-2 py-0.5 rounded font-bold transition-opacity duration-300 ${
              isDetecting ? 'opacity-100 text-(--saai-yellow-300) bg-(--saai-yellow-900)/70'
              : isAlerting ? 'opacity-100 text-(--saai-red-300) bg-(--saai-red-900)/70'
              : 'opacity-0 text-(--saai-red-300) bg-(--saai-red-900)/70'
            }`}>
              {isDetecting ? t.badgeDetecting : t.badgeAlerting}
            </div>
            {/* Pulsing alert ring */}
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              /* raw rgba → SAAI_COLORS color-mix (D2 인라인 규칙) */
              style={{ boxShadow: `inset 0 0 0 2px color-mix(in srgb, ${SAAI_COLORS['status-error']} 90%, transparent)` }}
              animate={isAlerting ? { opacity: reducedMotion ? 0.7 : [0.9, 0.25, 0.9] } : { opacity: 0 }}
              transition={isAlerting && !reducedMotion
                ? { duration: 1.3, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.3 }
              }
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Recently Resolved — [1-⑦/A6] 4번째 블록: 직전 시나리오를 완료 상태로 표시 */}
        {list.length > 1 && (
          <div className={`${S.cardClass} ${D.cardRadius} ${D.cardPadding}`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm font-bold ${S.textSecondary}`}>{t.statusResolved}</span>
              <span className="text-xs font-medium text-(--saai-green-500)">{t.timeResolved}</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-(--saai-green-50) flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-(--saai-status-success)" aria-hidden="true" />
              </div>
              <div>
                <p className={`text-base font-medium ${S.textPrimary}`}>{prevTitle}</p>
                <p className={`text-sm ${S.textSecondary}`}>{prevDesc}</p>
              </div>
            </div>
          </div>
        )}
      </div>

    </PhoneScreen>
    </PhoneFrame>
    </MockupViewport>
    </div>
  );
}

export default memo(StoreCareMockup);
