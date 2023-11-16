import { FC } from 'react';
import { TBaseTableProps } from '@/components/baseTable/BaseTable.tsx';
import EventsTable from '../../components/eventsTable/EventsTable.tsx';

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
