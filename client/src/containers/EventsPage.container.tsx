import { EventsPage } from '@/pages';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
	useGetEvents,
	usePagination,
	useSortTable,
	useUserContext
} from '@/hooks';
import {
	defaultDirection,
	defaultHighlightColor,
	defaultSortKey,
	isStringType,
	PAGE_PARAM_KEY,
	SORT_DIRECTION_PARAM_KEY,
	SORT_KEY_PARAM_KEY
} from '@/utils';
import { EventsTableRow, TBaseSortDirection } from '@/components';

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

const EventsPageContainer = () => {
	const { user, isUserLoading } = useUserContext();
	const { setSortParams, sortKey, sortDirection } = useSortTable({
		sortKeyName: SORT_KEY_PARAM_KEY,
		sortDirectionKeyName: SORT_DIRECTION_PARAM_KEY,
		defaultDirection,
		defaultSortKey,
		pageParamKey: PAGE_PARAM_KEY,
		resetPageAfterSort: true
	});
	const { changePaginationPage, page } = usePagination(PAGE_PARAM_KEY);

	const { events, isEventsLoading, pageCount } = useGetEvents({
		sortDirection,
		sortKey,
		page,
		userId: user?._id
	});

	const [highlightColor, setHighlightColor] = useState<string | undefined>(
		undefined
	);

	useEffect(() => {
		if (!user) {
			return;
		}

		if (!isStringType(user.appSettings)) {
			setHighlightColor(
				user.appSettings.highlightColor || defaultHighlightColor
			);
		}
	}, [user]);

	const onSortDirectionChange = useCallback(
		(accessor: string, sortDirection: TBaseSortDirection) => {
			setSortParams({
				sortKeyValue: accessor,
				sortDirectionValue: sortDirection
			});
		},
		[setSortParams]
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
					highlightColor={highlightColor}
					columns={columns}
					item={item}
					actionBtnLabel="Send"
				/>
			)),
		[events, highlightColor]
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
			isLoading={isEventsLoading || isUserLoading}
			onPageChange={onPageChange}
			pageCount={pageCount}
			forcePage={page}
		/>
	);
};

export default EventsPageContainer;
