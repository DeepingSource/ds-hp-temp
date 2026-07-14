import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '편의점 운영 인사이트 | STOREAGENT',
  description: '매주 업데이트되는 발주 전략, 시즌 가이드, 데이터 분석으로 편의점 운영을 최적화하세요.',
  keywords: ['편의점 운영 노하우', '편의점 발주 전략', '매장 운영 인사이트', '시즌 가이드', '편의점 AI', '매출 분석', '사장님 노하우', '편의점 데이터'],
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
