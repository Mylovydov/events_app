import { EventsPage } from '@/pages';
import useGetEvents from '../hooks/useGetEvents/useGetEvents.hook.ts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import EventsTableRow from '../components/eventsTable/components/eventsTableRow/EventsTableRow.tsx';
import { TSortDirection } from '@/components/baseTable/baseTable.types.ts';
import { TEventUnionKeys } from '@/components/eventsTable/components/eventsTableRow/eventsTableRow.types.ts';
import { useSortTable } from '@/hooks';
import { useSearchParams } from 'react-router-dom';
import usePagination from '../hooks/usePagination/usePagination.ts';

export const SORT_DIRECTION_PARAM_KEY = 'direction';
export const SORT_KEY_PARAM_KEY = 'key';
export const PAGE_PARAM_KEY = 'page';

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
	const { setSortParams } = useSortTable({
		sortKeyName: SORT_KEY_PARAM_KEY,
		sortDirectionKeyName: SORT_DIRECTION_PARAM_KEY
	});
	const { changePaginationPage, page, setPage } = usePagination(PAGE_PARAM_KEY);
	const [searchParams, setSearchParams] = useSearchParams();

	const [sortDirection, setSortDirection] =
		useState<TSortDirection>(defaultDirection);
	const [sortKey, setSortKey] = useState<TEventUnionKeys>(defaultSortKey);

	const { events, isEventsLoading, pageCount } = useGetEvents({
		sortDirection,
		sortKey,
		page
	});

	useEffect(() => {
		const page = parseInt(searchParams.get(PAGE_PARAM_KEY) || '1', 10);
		console.log('page', page);
		const sortDirection = (searchParams.get(SORT_DIRECTION_PARAM_KEY) ||
			defaultDirection) as TSortDirection;
		const sortKey = (searchParams.get(SORT_KEY_PARAM_KEY) ||
			defaultSortKey) as TEventUnionKeys;

		page > 1
			? searchParams.set(PAGE_PARAM_KEY, String(page))
			: searchParams.delete(PAGE_PARAM_KEY);

		setSearchParams(searchParams);
		setSortDirection(sortDirection);
		setSortKey(sortKey);
		setPage(page);
	}, [searchParams, setPage, setSearchParams]);

	const onSortDirectionChange = useCallback(
		(accessor: string, sortDirection: TSortDirection) => {
			setSortParams({
				sortKeyValue: accessor,
				sortDirectionValue: sortDirection
			});
			searchParams.set(PAGE_PARAM_KEY, '1');
		},
		[searchParams, setSortParams]
	);

	const onPageChange = useCallback(
		(newPage: number) => {
			changePaginationPage(newPage);
		},
		[changePaginationPage]
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
			onPageChange={onPageChange}
			pageCount={pageCount}
			forcePage={page}
		/>
	);
};

export default EventsPageContainer;
