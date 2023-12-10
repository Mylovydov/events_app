import { TGetModifyEventsInput, useGetEventsQuery } from '@/services';
import { TUseGetEventsReturn, useHandleError } from '@/hooks';
import { useEffect } from 'react';

const useGetEvents = ({
	userId,
	...restArgs
}: TGetModifyEventsInput): TUseGetEventsReturn => {
	const handleError = useHandleError();

	const {
		data: eventsData,
		isLoading: isEventsLoading,
		error
	} = useGetEventsQuery(
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		{ ...restArgs, limit: 5, userId },
		{
			skip: !userId
		}
	);

	useEffect(() => handleError(error), [error, handleError]);

	return {
		events: eventsData?.data.events || [],
		total: eventsData?.data.total || 0,
		limit: eventsData?.data.limit || 0,
		skip: eventsData?.data.skip || 0,
		pageCount: eventsData?.data.pageCount || 0,
		isEventsLoading
	};
};

export default useGetEvents;
