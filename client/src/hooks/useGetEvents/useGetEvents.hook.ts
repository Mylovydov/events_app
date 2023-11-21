import { TGetEventsInput, useGetEventsQuery } from '@/services';
import { TUseGetEventsReturn, useNotify } from '@/hooks';
import { isTErrorResponse } from '@/utils';

const useGetEvents = (
	args: TGetEventsInput,
	opt?: { [key: string]: unknown }
): TUseGetEventsReturn => {
	const { errorNotify } = useNotify();
	const {
		data: eventsData,
		isLoading: isEventsLoading,
		error
	} = useGetEventsQuery({ ...args, limit: 5 }, opt);

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
