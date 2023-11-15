import { EventsPage } from '@/pages';
import useGetEvents from '../hooks/useGetEvents/useGetEvents.hook.ts';

// const data = {
// 	createdAt: '2023-11-12T20:01:51.711Z',
// 	isEmailSend: false,
// 	updatedAt: '2023-11-12T20:01:51.711Z'
// };

const mockColumns = [
	{ label: 'ID', accessor: '_id', sortable: true },
	{ label: 'First Name', accessor: 'inviteeFirstName', sortable: true },
	{ label: 'Last Name', accessor: 'inviteeLastName', sortable: true },
	{ label: 'Email', accessor: 'inviteeEmail', sortable: true },
	{ label: 'Location', accessor: 'location', sortable: true },
	{ label: 'Start Date Time', accessor: 'startDateTime', sortable: true },
	{ label: 'End Date Time', accessor: 'endDateTime', sortable: true },
	{ label: 'Event UUID', accessor: 'eventUUID' },
	{ label: 'Invitee UUID', accessor: 'inviteeUUID' }
];

// const mockEvents: TEvent[] = [];

const EventsPageContainer = () => {
	const { events, isEventsLoading } = useGetEvents();

	console.log('events', events);

	return (
		<EventsPage
			title="Events"
			tableData={[]}
			columns={mockColumns}
			onSortDirectionChange={() => {}}
			sortDirection="desc"
			sortKey="last"
			isLoading={isEventsLoading}
		/>
	);
};

export default EventsPageContainer;
