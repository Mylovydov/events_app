import { EventsPage } from '@/pages';
import useGetEvents from '../hooks/useGetEvents/useGetEvents.hook.ts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import EventsTableRow from '../components/eventsTable/components/eventsTableRow/EventsTableRow.tsx';
import { TSortDirection } from '@/components/baseTable/baseTable.types.ts';
import { TEventUnionKeys } from '@/components/eventsTable/components/eventsTableRow/eventsTableRow.types.ts';
import { useSortTable } from '@/hooks';
import { useSearchParams } from 'react-router-dom';

export const SORT_DIRECTION_PARAM_KEY = 'direction';
export const SORT_KEY_PARAM_KEY = 'key';

const columns = [
	{ label: 'First Name', accessor: 'inviteeFirstName', sortable: true },
	{ label: 'Last Name', accessor: 'inviteeLastName', sortable: true },
	{ label: 'Email', accessor: 'inviteeEmail', sortable: true },
	{ label: 'Location', accessor: 'location', sortable: true },
	{ label: 'Start Date Time', accessor: 'startDateTime', sortable: true },
	{ label: 'End Date Time', accessor: 'endDateTime', sortable: true },
	{ label: 'Event UUID', accessor: 'eventUUID' },
	{ label: 'Invitee UUID', accessor: 'inviteeUUID' }
];

const defaultDirection: TSortDirection = 'desc';
const defaultSortKey: TEventUnionKeys = 'startDateTime';

const EventsPageContainer = () => {
	const { setSortParams } = useSortTable();
	const { events, isEventsLoading } = useGetEvents();
	const [searchParams, setSearchParams] = useSearchParams();

	const [sortDirection, setSortDirection] =
		useState<TSortDirection>(defaultDirection);
	const [sortKey, setSortKey] = useState<TEventUnionKeys>(defaultSortKey);

	useEffect(() => {
		const sortDirection = searchParams.get(SORT_DIRECTION_PARAM_KEY);
		const sortKey = searchParams.get(SORT_KEY_PARAM_KEY);

		sortDirection && setSortDirection(sortDirection as TSortDirection);
		sortKey && setSortKey(sortKey as TEventUnionKeys);
	}, [searchParams, setSearchParams]);

	const onSortDirectionChange = useCallback(
		(accessor: string, sortDirection: TSortDirection) => {
			console.log('accessor', accessor);
			console.log('sortDirection', sortDirection);
			setSortParams({
				sortKeyName: SORT_KEY_PARAM_KEY,
				sortKeyValue: accessor,
				sortDirectionKeyName: SORT_DIRECTION_PARAM_KEY,
				sortDirectionValue: sortDirection
			});
		},
		[setSortParams]
	);

	const tableRows = useMemo(
		() =>
			events.map(item => (
				<EventsTableRow
					key={item._id}
					columns={columns}
					item={item}
					actionBtnLabel="Send"
				/>
			)),
		[events]
	);

	const tableColumns = useMemo(
		() => [...columns, { label: 'Action', accessor: '' }],
		[]
	);

	return (
		<EventsPage
			title="Events"
			emptyLabel="No events found"
			rows={tableRows}
			columns={tableColumns}
			onSortDirectionChange={onSortDirectionChange}
			sortDirection={sortDirection}
			sortKey={sortKey}
			isLoading={isEventsLoading}
		/>
	);
};

export default EventsPageContainer;
