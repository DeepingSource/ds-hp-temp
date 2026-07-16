import { eventStaticParams, eventDetailMetadata, EventDetailPage } from '@/components/events/eventRoutes';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return eventStaticParams();
}

export function generateMetadata({ params }: Props) {
  return eventDetailMetadata('jp', params);
}

export default function Page({ params }: Props) {
  return EventDetailPage('jp', params);
}
