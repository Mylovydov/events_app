import { FC } from 'react';
import EventsTable from '../../components/eventsTable/EventsTable.tsx';
import { TBaseTableProps } from '@/components/baseTable/baseTable.types.ts';

export type TEventsPageProps = {
	title: string;
} & TBaseTableProps;

const EventsPage: FC<TEventsPageProps> = ({ title, ...tableProps }) => {
	return (
		<div>
			<EventsTable {...tableProps} />
		</div>
	);
};

export default EventsPage;
