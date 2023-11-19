import { FC } from 'react';
import EventsTable, {
	TEventsTableProps
} from '../../components/eventsTable/EventsTable.tsx';

export type TEventsPageProps = {
	title: string;
} & TEventsTableProps;

const EventsPage: FC<TEventsPageProps> = ({ title, ...tableProps }) => {
	return (
		<div>
			<EventsTable {...tableProps} />
		</div>
	);
};

export default EventsPage;
