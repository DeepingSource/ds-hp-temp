'use client';

import { COMPANY } from '@/lib/company-data';

import {
  Camera,
  Fingerprint,
  Brain,
  BarChart3,
  TrendingUp,
  Wifi,
  Shield,
  Users,
  ArrowRight,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import StepperShell from '@/components/shared/StepperShell';
import type { StepData } from '@/components/shared/StepperShell';

/* ─── Step 시각화 컴포넌트 ─── */

/** Step 1: CCTV → 분석 장치 연결 */
function VisualCCTVConnect() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 w-full">
      {/* 카메라 그리드 */}
      <div className="flex gap-4">
        {[
          { name: 'CAM 1', angle: '정면', status: 'on' },
          { name: 'CAM 2', angle: '좌측', status: 'on' },
          { name: 'CAM 3', angle: '출입구', status: 'on' },
          { name: 'CAM 4', angle: '후면', status: 'off' },
        ].map((cam) => (
          <div key={cam.name} className="flex flex-col items-center gap-1.5">
            <div className={`w-16 h-16 rounded-xl border flex items-center justify-center relative ${
              cam.status === 'on'
                ? 'bg-slate-100 border-slate-200'
                : 'bg-gray-50 border-gray-200 opacity-50'
            }`}>
              <Camera className="w-7 h-7 text-slate-500" />
              {cam.status === 'on' && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400" />
              )}
            </div>
            <span className="text-3xs font-bold text-slate-500 tracking-wider">{cam.name}</span>
            <span className="text-[9px] text-slate-400">{cam.angle}</span>
          </div>
        ))}
      </div>

      {/* 연결선 */}
      <div className="flex items-center gap-3 text-slate-400">
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-300 to-slate-300" />
        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
          <Wifi className="w-4 h-4 animate-pulse text-slate-500" />
        </div>
        <div className="w-16 h-px bg-gradient-to-r from-slate-300 via-slate-300 to-transparent" />
      </div>

      {/* 분석 장치 */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-28 h-14 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 flex items-center justify-center gap-2 shadow-lg relative">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span className="text-3xs font-bold text-white tracking-wider">SAAI BOX</span>
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <span className="text-3xs text-slate-500">소형 AI 분석 장치</span>
      </div>

      <div className="flex items-center gap-3 mt-1">
        <span className="text-3xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
          설치 30분 이내
        </span>
        <span className="text-3xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
          기존 CCTV 그대로 사용
        </span>
      </div>
    </div>
  );
}

/** Step 2: 익명화 Before/After */
function VisualAnonymize() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 w-full">
      <div className="flex items-center gap-6">
        {/* Before */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-28 h-28 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center relative overflow-hidden">
            <Users className="w-12 h-12 text-red-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-red-100/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-red-400" />
          </div>
          <span className="text-3xs font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
            원본 영상
          </span>
        </div>

        {/* 변환 화살표 */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-200">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <ArrowRight className="w-5 h-5 text-violet-400" />
          <span className="text-[9px] text-violet-500 font-medium">장치 내 처리</span>
        </div>

        {/* After */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-28 h-28 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center relative overflow-hidden">
            {/* 스켈레톤 실루엣 */}
            <div className="flex gap-2.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-emerald-300" />
                  <div className="w-0.5 h-4 bg-emerald-200 mt-0.5" />
                  <div className="flex gap-2 mt-0.5">
                    <div className="w-0.5 h-5 bg-emerald-200 -rotate-6" />
                    <div className="w-0.5 h-5 bg-emerald-200 rotate-6" />
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-100/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-emerald-400" />
          </div>
          <span className="text-3xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            완전 익명화
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-1">
        <div className="flex items-center gap-1.5 text-xs text-violet-700 font-medium bg-violet-50 px-3 py-1.5 rounded-full border border-violet-200">
          <Shield className="w-3 h-3" />
          {COMPANY.patentsLabel} 국내외 특허 보유
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <CheckCircle2 className="w-3 h-3" />
          영상 원본 외부 전송 없음
        </div>
      </div>
    </div>
  );
}

/** Step 3: 히트맵 + 동선 분석 */
function VisualBehaviorAnalysis() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 w-full">
      {/* 히트맵 */}
      <div className="bg-white rounded-xl border border-indigo-200 p-4 shadow-sm w-full max-w-[280px]">
        <div className="flex items-center justify-between mb-3">
          <p className="text-3xs font-bold text-indigo-500 uppercase tracking-wider">Customer Heatmap</p>
          <span className="text-[9px] text-emerald-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>
        <div className="grid grid-cols-8 gap-0.5">
          {[
            0.1, 0.2, 0.3, 0.5, 0.7, 0.8, 0.6, 0.3,
            0.2, 0.3, 0.5, 0.7, 0.9, 1.0, 0.8, 0.5,
            0.1, 0.3, 0.4, 0.6, 0.8, 0.9, 0.7, 0.4,
            0.1, 0.2, 0.3, 0.5, 0.7, 0.8, 0.6, 0.3,
            0.0, 0.1, 0.2, 0.4, 0.5, 0.6, 0.4, 0.2,
          ].map((v, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm"
              style={{ backgroundColor: `rgba(99, 102, 241, ${v})` }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-4xs text-gray-500">낮음</span>
          <div className="flex gap-0.5">
            {[0.15, 0.3, 0.5, 0.7, 0.9].map((v) => (
              <div key={v} className="w-4 h-2 rounded-sm" style={{ backgroundColor: `rgba(99, 102, 241, ${v})` }} />
            ))}
          </div>
          <span className="text-4xs text-gray-500">높음</span>
        </div>
      </div>

      {/* 핵심 수치 */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-[280px]">
        {[
          { label: '동선 분석', value: 'MTMC', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
          { label: '카메라 연동', value: '최대 64대', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
          { label: '정확도', value: '98.7%', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
        ].map((item) => (
          <div key={item.label} className={`${item.bg} border ${item.border} rounded-lg p-2 text-center`}>
            <p className="text-[9px] text-gray-500">{item.label}</p>
            <p className={`text-xs font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Step 4: 대시보드 인사이트 */
function VisualDashboard() {
  const bars = [35, 42, 55, 48, 72, 68, 85, 62, 78, 90, 75, 82];
  const months = ['1월', '', '', '4월', '', '', '7월', '', '', '10월', '', ''];

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 w-full">
      <div className="bg-white rounded-xl border border-sky-200 p-4 shadow-sm w-full max-w-[320px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xs font-bold text-sky-600 uppercase tracking-wider">매출 기여 분석</span>
          <span className="text-3xs text-sky-500 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">이번 분기</span>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: '방문 → 구매', value: '34%', change: '+8%', color: 'text-sky-600' },
            { label: '평균 체류', value: '8.2분', change: '+1.3분', color: 'text-violet-600' },
            { label: '매출 증가', value: '+15%', change: 'vs 전분기', color: 'text-emerald-600' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-gray-50 rounded-lg p-2 text-center">
              <p className="text-[9px] text-gray-500">{kpi.label}</p>
              <p className={`text-sm font-bold ${kpi.color}`}>{kpi.value}</p>
              <p className="text-4xs text-emerald-500 font-medium">{kpi.change}</p>
            </div>
          ))}
        </div>

        {/* 바 차트 */}
        <div className="flex items-end gap-[3px] h-20">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
              <div
                className="w-full rounded-t-sm bg-gradient-to-t from-sky-500 to-sky-300"
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          {months.map((m, i) => (
            <span key={i} className="text-[7px] text-gray-500 flex-1 text-center">{m}</span>
          ))}
        </div>

        {/* 교차 분석 태그 */}
        <div className="flex items-center gap-1.5 mt-3 flex-wrap">
          {['POS 매출', '날씨', '방문자 동선', '이벤트'].map((tag) => (
            <span key={tag} className="text-[9px] text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Step 5: 성과 결과 */
function VisualResults() {
  const metrics = [
    { label: '매출 변화', before: '100', after: '115', unit: '%', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', arrow: '▲', arrowColor: 'text-emerald-500' },
    { label: '고객 이탈률', before: '42', after: '18', unit: '%', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', arrow: '▼', arrowColor: 'text-emerald-500' },
    { label: '좌석 회전율', before: '3.2', after: '3.8', unit: '회/일', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', arrow: '▲', arrowColor: 'text-emerald-500' },
    { label: '프로모션 전환', before: '12', after: '23', unit: '%', color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100', arrow: '▲', arrowColor: 'text-violet-500' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 w-full">
      <div className="space-y-2.5 w-full max-w-[300px]">
        {metrics.map((m) => (
          <div key={m.label} className={`${m.bg} rounded-xl px-4 py-3 border ${m.border}`}>
            <div className="flex items-center justify-between">
              <p className="text-3xs text-gray-500 font-medium">{m.label}</p>
              <span className={`text-3xs font-bold ${m.arrowColor}`}>{m.arrow}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500 line-through">{m.before}{m.unit}</span>
              <ArrowRight className="w-3 h-3 text-gray-300" />
              <span className={`text-xl font-bold ${m.color}`}>{m.after}{m.unit}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
        <TrendingUp className="w-3.5 h-3.5" />
        평균 매출 15% 향상
      </div>
    </div>
  );
}

/* ─── Step 데이터 ─── */

const steps: StepData[] = [
  {
    step: 1,
    title: '기존 CCTV에 연결만 하면 됩니다',
    icon: Camera,
    detail: '새 장비를 설치할 필요 없습니다. 지금 사용 중인 CCTV에 소형 분석 장치를 연결하면 30분 안에 데이터 수집이 시작됩니다.',
    highlight: '추가 공사 없이 30분 설치',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    iconBg: 'bg-slate-100',
    Visual: VisualCCTVConnect,
  },
  {
    step: 2,
    title: '고객 얼굴은 저장하지 않습니다',
    icon: Fingerprint,
    detail: '영상 원본은 외부로 나가지 않습니다. 장치 안에서 즉시 익명 스켈레톤으로 변환되며, 분석에 필요한 움직임 데이터만 추출합니다.',
    highlight: `${COMPANY.patentsLabel} · 세계 최초 원천 기술`,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    iconBg: 'bg-violet-100',
    Visual: VisualAnonymize,
  },
  {
    step: 3,
    title: '여러 카메라의 동선을 하나로 연결합니다',
    icon: Brain,
    detail: 'MTMC(Multi-Target Multi-Camera) 기술로 카메라가 바뀌어도 동일 고객의 전체 동선을 파악합니다. 어디서 오래 머물고, 어디서 떠나는지 보입니다.',
    highlight: '카메라 간 동선 연결 정확도 98.7%',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    iconBg: 'bg-indigo-100',
    Visual: VisualBehaviorAnalysis,
  },
  {
    step: 4,
    title: 'POS·날씨·동선을 한 화면에서 봅니다',
    icon: BarChart3,
    detail: '매출이 왜 올랐는지, 왜 떨어졌는지 — 동선과 POS, 날씨 데이터를 교차하면 원인이 보입니다. 추측이 아닌 근거를 얻으세요.',
    highlight: 'POS × 날씨 × CCTV 교차 분석',
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
    iconBg: 'bg-sky-100',
    Visual: VisualDashboard,
  },
  {
    step: 5,
    title: '데이터가 매출로 바뀌기 시작합니다',
    icon: TrendingUp,
    detail: '진열 위치를 바꾸고, 프로모션을 조정하고, 병목 구간을 해소합니다. 데이터가 행동을 바꾸면, 매출은 따라옵니다.',
    highlight: '도입 매장 평균 매출 15% 향상',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    Visual: VisualResults,
  },
];

/* ─── 메인 컴포넌트 ─── */

export default function HowItWorksInsightStepper() {
  return <StepperShell steps={steps} />;
}
