import { eventsIndexMetadata, EventsIndexPage } from '@/components/events/eventRoutes';

export const metadata = eventsIndexMetadata('jp');

export default function Page() {
  return EventsIndexPage('jp');
}
