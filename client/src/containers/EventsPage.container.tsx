import { EventsPage } from '@/pages';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
	useAppSelector,
	useGetEvents,
	usePagination,
	useResendAllInvitationToEvents,
	useSendInvitationToEvent,
	useSendInvitationToEvents,
	useSortTable
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
import { useNavigate } from 'react-router-dom';
import { SETTINGS_PATH } from '@/router';
import { getUserSelector } from '@/slices';

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
	const { user, isAppUserLoading } = useAppSelector(getUserSelector);

	const { sendInvitationToEvent, isInvitationToEventSending } =
		useSendInvitationToEvent();
	const { resendAllInvitationToEvent, isInvitationToAllEventResending } =
		useResendAllInvitationToEvents();
	const { sendInvitationToEvents, isInvitationToEventsSending } =
		useSendInvitationToEvents();

	const { setSortParams, sortKey, sortDirection } = useSortTable({
		sortKeyName: SORT_KEY_PARAM_KEY,
		sortDirectionKeyName: SORT_DIRECTION_PARAM_KEY,
		defaultDirection,
		defaultSortKey,
		pageParamKey: PAGE_PARAM_KEY,
		resetPageAfterSort: true
	});

	const navigate = useNavigate();
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

		const { appSettings } = user;
		if (!isStringType(appSettings)) {
			setHighlightColor(appSettings.highlightColor || defaultHighlightColor);
		}
	}, [user]);

	const onSendButtonClick = useCallback(
		(eventId: string) => {
			if (!user || isStringType(user?.emailSettings)) {
				return;
			}

			const {
				emailSettings: { isSettingsVerified },
				_id: userId
			} = user;

			if (isSettingsVerified) {
				return sendInvitationToEvent({
					eventId,
					userId
				});
			}

			return navigate(SETTINGS_PATH);
		},
		[user, sendInvitationToEvent, navigate]
	);

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

	const rowActionBtnLabel = useMemo(() => {
		const defaultLabel = 'Send';
		if (!user || isStringType(user?.emailSettings)) {
			return defaultLabel;
		}

		return user.emailSettings.isSettingsVerified
			? defaultLabel
			: 'Add settings';
	}, [user]);

	const tableRows = useMemo(
		() =>
			events.map(item => (
				<EventsTableRow
					key={item._id}
					highlightColor={highlightColor}
					onSendButtonClick={onSendButtonClick}
					columns={columns}
					item={item}
					actionBtnLabel={rowActionBtnLabel}
					isInvitationSending={isInvitationToEventSending}
				/>
			)),
		[
			events,
			highlightColor,
			isInvitationToEventSending,
			onSendButtonClick,
			rowActionBtnLabel
		]
	);

	const tableColumns = useMemo(
		() => [...columns, { label: 'Action', accessor: '' }],
		[]
	);

	const actionItems = useMemo(() => {
		if (
			!user ||
			isStringType(user?.emailSettings) ||
			!user.emailSettings.isSettingsVerified
		) {
			return [];
		}

		const isUnsentInvitationsExist = events.some(e => !e.isEmailSend);

		return [
			{
				label: 'Re-send all invitations',
				disabled: isInvitationToAllEventResending,
				onClick: () => resendAllInvitationToEvent({ userId: user._id })
			},
			{
				label: 'Send unsent invitations',
				disabled: isInvitationToEventsSending || !isUnsentInvitationsExist,
				onClick: () => sendInvitationToEvents({ userId: user._id })
			}
		];
	}, [
		events,
		isInvitationToAllEventResending,
		isInvitationToEventsSending,
		resendAllInvitationToEvent,
		sendInvitationToEvents,
		user
	]);

	return (
		<EventsPage
			title="Events"
			emptyLabel="No events found"
			rows={tableRows}
			columns={tableColumns}
			onSortDirectionChange={onSortDirectionChange}
			sortDirection={sortDirection}
			sortKey={sortKey}
			isLoading={isEventsLoading || isAppUserLoading}
			onPageChange={onPageChange}
			pageCount={pageCount}
			forcePage={page}
			actionItems={actionItems}
			isLastColumnSticky={true}
		/>
	);
};

export default EventsPageContainer;
