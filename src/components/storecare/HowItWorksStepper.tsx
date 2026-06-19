'use client';

import {
  Eye,
  Cloud,
  Brain,
  Bell,
  CheckCircle2,
  Camera,
  Wifi,
  Shield,
  Lock,
  Zap,
  ThermometerSnowflake,
  ShoppingBag,
  AlertTriangle,
  UserX,
  Smartphone,
  Mail,
  MessageCircle,
  TrendingUp,
} from 'lucide-react';
import StepperShell from '@/components/shared/StepperShell';
import type { StepData } from '@/components/shared/StepperShell';

/* ─── Step 시각화 컴포넌트 ─── */

/** Step 1: CCTV가 매장 구역을 촬영 */
function VisualCapture() {
  const zones = [
    { name: '진열대 A', cam: 'CAM 1', status: 'active' },
    { name: '냉장 코너', cam: 'CAM 2', status: 'active' },
    { name: '바닥·통로', cam: 'CAM 3', status: 'active' },
    { name: '출입구', cam: 'CAM 4', status: 'standby' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 w-full">
      {/* 매장 평면도 스타일 */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 w-full max-w-[300px]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xs font-bold text-gray-500 uppercase tracking-wider">매장 모니터링 구역</span>
          <span className="text-[9px] text-emerald-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            4개 구역
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {zones.map((z) => (
            <div
              key={z.name}
              className={`rounded-lg border p-3 flex flex-col items-center gap-1.5 ${
                z.status === 'active'
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <Camera className={`w-5 h-5 ${z.status === 'active' ? 'text-emerald-500' : 'text-gray-500'}`} />
              <span className="text-3xs font-bold text-gray-700">{z.name}</span>
              <span className="text-[9px] text-gray-500">{z.cam}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 연결 장치 */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-gray-500">
          <div className="w-10 h-px bg-gray-300" />
          <Wifi className="w-4 h-4 animate-pulse text-emerald-500" />
          <div className="w-10 h-px bg-gray-300" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="w-24 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 flex items-center justify-center gap-1.5 shadow-lg relative">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[9px] font-bold text-white tracking-wider">SAAI BOX</span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <span className="text-[9px] text-gray-500">소형 AI 분석 장치 연결</span>
      </div>
    </div>
  );
}

/** Step 2: 데이터 전송 흐름 */
function VisualUpload() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 w-full">
      <div className="flex items-center gap-4">
        {/* 장치 */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center gap-1">
            <div className="w-12 h-7 rounded bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
              <Zap className="w-3 h-3 text-emerald-400" />
            </div>
            <span className="text-4xs font-bold text-slate-500">SAAI BOX</span>
          </div>
          <span className="text-[9px] text-slate-500 font-medium">On-Device AI</span>
          <span className="text-4xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">1차 분석 완료</span>
        </div>

        {/* 전송 화살표 */}
        <div className="flex flex-col items-center gap-1.5">
          <Lock className="w-4 h-4 text-emerald-500" />
          <div className="flex items-center gap-1">
            <div className="w-8 h-px bg-emerald-300" />
            <div className="w-2 h-2 border-t border-r border-emerald-400 rotate-45" />
          </div>
          <span className="text-4xs text-emerald-600 font-medium">암호화 전송</span>
        </div>

        {/* 클라우드 */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-xl bg-sky-50 border border-sky-200 flex flex-col items-center justify-center gap-1">
            <Cloud className="w-8 h-8 text-sky-500" />
          </div>
          <span className="text-[9px] text-sky-600 font-medium">SAAI Cloud</span>
          <span className="text-4xs text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">AI 정밀 분석</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-1">
        <div className="flex items-center gap-1.5 text-3xs text-emerald-700 font-medium bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <Shield className="w-3 h-3" />
          영상 원본 외부 전송 없음
        </div>
        <div className="flex items-center gap-1.5 text-3xs text-slate-600 font-medium bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
          <Lock className="w-3 h-3" />
          메타데이터만 전송
        </div>
      </div>
    </div>
  );
}

/** Step 3: AI 분석 — 감지 유형 */
function VisualAnalyze() {
  const detections = [
    { icon: ThermometerSnowflake, label: '냉장고 온도 이상', confidence: 97, status: 'alert', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
    { icon: ShoppingBag, label: '진열대 빈 곳 발생', confidence: 94, status: 'alert', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    { icon: AlertTriangle, label: '바닥 오염 감지', confidence: 91, status: 'warning', color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
    { icon: UserX, label: '야간 비정상 체류', confidence: 88, status: 'normal', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 w-full">
      <div className="w-full max-w-[300px] space-y-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-3xs font-bold text-gray-500 uppercase tracking-wider">AI 감지 항목</span>
          <span className="text-[9px] text-emerald-600 font-medium flex items-center gap-1">
            <Brain className="w-3 h-3" />
            실시간 분석 중
          </span>
        </div>
        {detections.map((d) => {
          const Icon = d.icon;
          return (
            <div key={d.label} className={`${d.bg} border ${d.border} rounded-xl p-3 flex items-center gap-3`}>
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                <Icon className={`w-5 h-5 ${d.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-2xs font-bold text-gray-700">{d.label}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex-1 h-1.5 bg-white rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${d.status === 'alert' ? 'bg-red-400' : d.status === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'}`} style={{ width: `${d.confidence}%` }} />
                  </div>
                  <span className="text-[9px] font-bold text-gray-500 tabular-nums">{d.confidence}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-1.5 text-3xs text-gray-500">
        <TrendingUp className="w-3 h-3 text-emerald-500" />
        학습이 쌓일수록 정확도 향상
      </div>
    </div>
  );
}

/** Step 4: 알림 채널 */
function VisualAlert() {
  const channels = [
    { icon: MessageCircle, name: '카카오톡', time: '실시간', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
    { icon: Smartphone, name: '앱 푸시', time: '실시간', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { icon: Mail, name: '이메일', time: '요약', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 w-full">
      {/* 알림 메시지 예시 */}
      <div className="w-full max-w-[280px] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-red-500 px-4 py-2 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-white" />
          <span className="text-2xs font-bold text-white">긴급 알림</span>
          <span className="text-[9px] text-red-200 ml-auto">방금 전</span>
        </div>
        <div className="p-4 space-y-2">
          <p className="text-sm font-bold text-gray-800">냉장고 #2 온도 이상 감지</p>
          <p className="text-xs text-gray-500">강남역점 · 냉장코너 · 설정온도 -18°C → 현재 -8°C</p>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-3xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full font-medium">즉시 점검 필요</span>
          </div>
        </div>
      </div>

      {/* 채널 선택지 */}
      <div className="flex items-center gap-3">
        {channels.map((ch) => {
          const Icon = ch.icon;
          return (
            <div key={ch.name} className={`flex flex-col items-center gap-1.5 ${ch.bg} border ${ch.border} rounded-xl px-4 py-3`}>
              <Icon className={`w-5 h-5 ${ch.color}`} />
              <span className="text-3xs font-bold text-gray-700">{ch.name}</span>
              <span className="text-4xs text-gray-500">{ch.time}</span>
            </div>
          );
        })}
      </div>

      <span className="text-3xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
        알림 시간대 · 항목 · 채널 직접 설정 가능
      </span>
    </div>
  );
}

/** Step 5: 완벽한 매장 유지 결과 */
function VisualPerfect() {
  const metrics = [
    { label: '매장 점검 횟수', before: '주 5회', after: '주 1회', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: '문제 감지 시간', before: '평균 4시간', after: '평균 3분', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: '야간 사고 발생', before: '월 2.3건', after: '월 0.1건', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  ];

  const statusItems = [
    { name: '진열 상태', pct: 98 },
    { name: '청결도', pct: 95 },
    { name: '설비 정상', pct: 100 },
    { name: '보안', pct: 100 },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 w-full">
      {/* 매장 건강 점수 */}
      <div className="bg-white rounded-xl border border-emerald-200 p-4 w-full max-w-[280px]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xs font-bold text-emerald-600 uppercase tracking-wider">매장 건강 점수</span>
          <span className="text-lg font-bold text-emerald-600">98점</span>
        </div>
        <div className="space-y-2">
          {statusItems.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="text-[9px] text-gray-600 w-14">{item.name}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${item.pct}%` }} />
              </div>
              <span className="text-[9px] font-bold text-emerald-600 tabular-nums w-8 text-right">{item.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Before/After 지표 */}
      <div className="space-y-2 w-full max-w-[280px]">
        {metrics.map((m) => (
          <div key={m.label} className={`${m.bg} border ${m.border} rounded-lg px-3 py-2 flex items-center justify-between`}>
            <span className="text-3xs text-gray-500">{m.label}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-3xs text-gray-500 line-through">{m.before}</span>
              <span className="text-3xs text-gray-300">→</span>
              <span className={`text-xs font-bold ${m.color}`}>{m.after}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Step 데이터 ─── */

const steps: StepData[] = [
  {
    step: 1,
    title: '지금 CCTV를 그대로 쓰면 됩니다',
    detail: '새 카메라를 설치할 필요 없습니다. 기존 CCTV에 소형 AI 장치를 연결하면, 매장 구역별 모니터링이 30분 안에 시작됩니다.',
    highlight: '추가 공사 없이 30분 설치',
    icon: Eye,
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    iconBg: 'bg-slate-100',
    Visual: VisualCapture,
  },
  {
    step: 2,
    title: '영상 원본은 밖으로 나가지 않습니다',
    detail: '장치 안에서 AI가 1차 분석을 마친 뒤, 필요한 메타데이터만 암호화하여 클라우드로 전송합니다. 고객 영상은 외부에 저장되지 않습니다.',
    highlight: '개인정보 보호 · 암호화 전송',
    icon: Cloud,
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
    iconBg: 'bg-sky-100',
    Visual: VisualUpload,
  },
  {
    step: 3,
    title: '문제가 생기면 AI가 먼저 압니다',
    detail: '냉장고 온도 이상, 진열대 빈 곳, 바닥 오염, 야간 비정상 체류 — AI가 매장 상태를 24시간 분석하고, 학습이 쌓일수록 정확도가 높아집니다.',
    highlight: '24시간 실시간 감지 · 자동 학습',
    icon: Brain,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    Visual: VisualAnalyze,
  },
  {
    step: 4,
    title: '문제가 생기면 바로 알려줍니다',
    detail: '카카오톡, 앱 푸시, 이메일 — 원하는 채널로 실시간 알림을 받으세요. 어떤 시간대에, 어떤 항목을, 어떤 채널로 받을지 직접 설정할 수 있습니다.',
    highlight: '카카오톡 · 앱 푸시 · 이메일 실시간 알림',
    icon: Bell,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconBg: 'bg-red-100',
    Visual: VisualAlert,
  },
  {
    step: 5,
    title: '매장에 덜 가도, 매장은 더 좋아집니다',
    detail: '문제 상황만 골라서 알려주니까 매일 방문할 필요가 없습니다. 야간에도, 휴일에도 AI가 지키고 있습니다. 점주님은 확인만 하세요.',
    highlight: '매장 점검 주 5회 → 주 1회',
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    Visual: VisualPerfect,
  },
];

/* ─── 메인 컴포넌트 ─── */

export default function HowItWorksStepper() {
  return <StepperShell steps={steps} />;
}
