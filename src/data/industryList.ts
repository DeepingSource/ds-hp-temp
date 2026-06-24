import {
  Store, Coffee, MonitorOff, Pill, ShoppingCart, Landmark, Warehouse, Shirt,
  type LucideIcon,
} from 'lucide-react';
import { industryThumbs } from '@/data/siteImages';

export interface IndustryMeta {
  slug: string;
  label: string;
  icon: LucideIcon;
  desc: string;
  color: string;
  metric: string;
  heroImage?: string;
}

export const industryList: IndustryMeta[] = [
  {
    slug: 'convenience',
    label: '편의점',
    icon: Store,
    desc: '결제 데이터는 모르는 "집었다 내려놓는" 행동까지 분석하여 매대 기회 손실을 잡습니다.',
    color: 'emerald',
    metric: '평균 매출 +18%',
    heroImage: industryThumbs.convenience[1],
  },
  {
    slug: 'cafe',
    label: '카페·음식점',
    icon: Coffee,
    desc: '실시간 좌석 점유율과 체류 패턴을 분석하여 피크타임 회전율과 인력 배치를 최적화합니다.',
    color: 'amber',
    metric: '좌석 회전율 +22%',
    heroImage: industryThumbs.cafe[0],
  },
  {
    slug: 'unmanned',
    label: '무인매장',
    icon: MonitorOff,
    desc: '24시간 AI 상황 감지로 도난·기물 파손·장기 체류 등 무인 매장의 리스크를 실시간 관리합니다.',
    color: 'blue',
    metric: '손실율 -35%',
    heroImage: industryThumbs.unmanned[1],
  },
  {
    slug: 'drugstore',
    label: '드럭스토어',
    icon: Pill,
    desc: '상품 관여도와 성별·연령별 동선 분석으로 VMD 효과를 극대화하고 구매 전환을 높입니다.',
    color: 'rose',
    metric: '단가 상승 +12%',
    heroImage: industryThumbs.drugstore[1],
  },
  {
    slug: 'mart',
    label: '대형마트',
    icon: ShoppingCart,
    desc: '광범위한 구역별 트래픽과 카트 동선을 분석하여 병목 구간 해소와 데드존 활성화를 지원합니다.',
    color: 'violet',
    metric: '체류시간 +20%',
    heroImage: industryThumbs.mart[1],
  },
  {
    slug: 'exhibition',
    label: '전시 공간',
    icon: Landmark,
    desc: '작품별 체류 시간과 관람객 흐름을 정밀 측정하여 큐레이션 성과를 데이터로 증명합니다.',
    color: 'indigo',
    metric: '관람 만족도 +28%',
    heroImage: industryThumbs.exhibition[1],
  },
  {
    slug: 'logistics',
    label: '물류·창고',
    icon: Warehouse,
    desc: '작업 동선 효율과 안전 규정 준수 여부를 자동으로 모니터링하여 사고 예방과 생산성을 높입니다.',
    color: 'slate',
    metric: '운영 효율 +15%',
    heroImage: industryThumbs.logistics[1],
  },
  {
    slug: 'fashion',
    label: '패션·의류',
    icon: Shirt,
    desc: '피팅룸 활용률과 디스플레이 반응도를 분석하여 시즌별 VMD 전략의 객관적 근거를 제공합니다.',
    color: 'pink',
    metric: 'VMD 전환율 +24%',
  },
];

export const industryColorMap: Record<string, {
  bg: string;
  text: string;
  border: string;
  badge: string;
  glow: string;
}> = {
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-100 hover:border-emerald-300',
    badge: 'bg-emerald-100 text-emerald-700',
    glow: 'hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)]',
  },
  amber: {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-100 hover:border-amber-300',
    badge: 'bg-amber-100 text-amber-700',
    glow: 'hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)]',
  },
  blue: {
    bg: 'bg-primary-lighter',
    text: 'text-primary',
    border: 'border-primary-lighter hover:border-primary-light',
    badge: 'bg-primary-lighter text-primary-dark',
    glow: 'hover:shadow-[0_8px_30px_rgb(var(--primary-rgb)_/_0.12)]',
  },
  rose: {
    bg: 'bg-rose-50',
    text: 'text-rose-600',
    border: 'border-rose-100 hover:border-rose-300',
    badge: 'bg-rose-100 text-rose-700',
    glow: 'hover:shadow-[0_8px_30px_rgba(244,63,94,0.12)]',
  },
  violet: {
    bg: 'bg-violet-50',
    text: 'text-violet-600',
    border: 'border-violet-100 hover:border-violet-300',
    badge: 'bg-violet-100 text-violet-700',
    glow: 'hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)]',
  },
  indigo: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    border: 'border-indigo-100 hover:border-indigo-300',
    badge: 'bg-indigo-100 text-indigo-700',
    glow: 'hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)]',
  },
  slate: {
    bg: 'bg-slate-50',
    text: 'text-slate-600',
    border: 'border-slate-100 hover:border-slate-300',
    badge: 'bg-slate-100 text-slate-700',
    glow: 'hover:shadow-[0_8px_30px_rgba(100,116,139,0.12)]',
  },
  pink: {
    bg: 'bg-pink-50',
    text: 'text-pink-600',
    border: 'border-pink-100 hover:border-pink-300',
    badge: 'bg-pink-100 text-pink-700',
    glow: 'hover:shadow-[0_8px_30px_rgba(236,72,153,0.12)]',
  },
};
