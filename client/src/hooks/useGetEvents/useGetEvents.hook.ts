import { TEvent, useGetEventsQuery } from '@/services';
import useNotify from '@/hooks/useNotify/useNotify.hook.ts';

export type TUseGetEventsReturn = {
	events: TEvent[];
	isEventsLoading: boolean;
};

const useGetEvents = (): TUseGetEventsReturn => {
	const { errorNotify } = useNotify();
	const {
		data: events,
		isLoading: isEventsLoading,
		error
	} = useGetEventsQuery();

	if (error) {
		errorNotify(JSON.stringify(error));
	}

	return {
		events: events?.data || [],
		isEventsLoading
	};
};

export default useGetEvents;
