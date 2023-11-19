import { TEventsTableProps } from '@/components/eventsTable/EventsTable.tsx';

export type TEventsPageProps = {
	title: string;
	subtitle?: string;
} & TEventsTableProps;
