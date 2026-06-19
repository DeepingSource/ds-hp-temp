import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '1주일 브리핑 미리보기 | STOREAGENT',
  description:
    '매일 아침 상권에 맞춘 실제 브리핑 사례를 확인해 보세요. 오피스, 주택, 대학가, 유흥가 상권별 1주일 브리핑.',
  alternates: {
    canonical: '/storeagent/sample',
  },
  openGraph: {
    title: '1주일 브리핑 미리보기 | STOREAGENT',
    description:
      '매일 아침 상권에 맞춘 실제 브리핑 사례를 확인해 보세요.',
    type: 'website',
  },
};

export default function SampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
