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
	eventsPage,
	isStringType,
	PAGE_PARAM_KEY,
	SORT_DIRECTION_PARAM_KEY,
	SORT_KEY_PARAM_KEY
} from '@/utils';
import { EventsTableRow, TBaseSortDirection } from '@/components';
import { useNavigate } from 'react-router-dom';
import { EMAIL_LAYOUT_PATH, SETTINGS_PATH } from 'src/routes';
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

	const sentActionData = useMemo(() => {
		const defaultLabel = 'Send';
		if (!user || isStringType(user?.emailSettings)) {
			return {
				label: defaultLabel,
				action: () => {}
			};
		}

		const {
			emailSettings: { isSettingsVerified },
			emailTemplate,
			_id: userId
		} = user;

		if (!emailTemplate) {
			return {
				label: 'Add template',
				action: () => navigate(EMAIL_LAYOUT_PATH)
			};
		}

		if (!isSettingsVerified) {
			return {
				label: 'Add settings',
				action: () => navigate(SETTINGS_PATH)
			};
		}

		return {
			label: defaultLabel,
			action: (eventId: string) => sendInvitationToEvent({ eventId, userId })
		};
	}, [user, sendInvitationToEvent, navigate]);

	const tableRows = useMemo(
		() =>
			events.map(item => (
				<EventsTableRow
					key={item._id}
					highlightColor={highlightColor}
					onSendButtonClick={sentActionData.action}
					columns={columns}
					item={item}
					actionBtnLabel={sentActionData.label}
					isInvitationSending={isInvitationToEventSending}
				/>
			)),
		[
			events,
			highlightColor,
			isInvitationToEventSending,
			sentActionData.action,
			sentActionData.label
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
			!user.emailSettings.isSettingsVerified ||
			!user.emailTemplate
		) {
			return [];
		}

		const isUnsentInvitationsExist = events.some(e => !e.isEmailSend);
		const isResendAllInvitationToEventDisabled =
			isInvitationToAllEventResending || isEventsLoading;
		const isUnsentInvitationsDisabled =
			isInvitationToEventsSending ||
			!isUnsentInvitationsExist ||
			isEventsLoading;

		return [
			{
				label: 'Re-send all invitations',
				disabled: isResendAllInvitationToEventDisabled,
				onClick: () => resendAllInvitationToEvent({ userId: user._id })
			},
			{
				label: 'Send unsent invitations',
				disabled: isUnsentInvitationsDisabled,
				onClick: () => sendInvitationToEvents({ userId: user._id })
			}
		];
	}, [
		events,
		isEventsLoading,
		isInvitationToAllEventResending,
		isInvitationToEventsSending,
		resendAllInvitationToEvent,
		sendInvitationToEvents,
		user
	]);

	return (
		<EventsPage
			title={eventsPage.pageTitle}
			emptyLabel={eventsPage.emptyLabel}
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
