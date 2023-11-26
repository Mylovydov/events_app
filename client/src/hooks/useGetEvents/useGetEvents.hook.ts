import { TGetModifyEventsInput, useGetEventsQuery } from '@/services';
import { TUseGetEventsReturn, useNotify } from '@/hooks';
import { isTErrorResponse } from '@/utils';

const useGetEvents = ({
	userId,
	...restArgs
}: TGetModifyEventsInput): TUseGetEventsReturn => {
	const { errorNotify } = useNotify();

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

	if (error) {
		if (isTErrorResponse(error)) {
			errorNotify(error.message);
		} else {
			errorNotify('Something went wrong');
		}
	}

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
