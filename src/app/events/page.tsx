import { eventsIndexMetadata, EventsIndexPage } from '@/components/events/eventRoutes';

export const metadata = eventsIndexMetadata('en');

export default function Page() {
  return EventsIndexPage('en');
}
