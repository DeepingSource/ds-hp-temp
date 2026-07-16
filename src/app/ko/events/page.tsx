import { eventsIndexMetadata, EventsIndexPage } from '@/components/events/eventRoutes';

export const metadata = eventsIndexMetadata('ko');

export default function Page() {
  return EventsIndexPage('ko');
}
