import type { Metadata } from 'next';
import NotFoundView from '@/components/NotFoundView';

export const metadata: Metadata = {
  title: 'Page not found · 페이지를 찾을 수 없습니다 | DEEPINGSOURCE',
};

export default function NotFound() {
  return <NotFoundView />;
}
