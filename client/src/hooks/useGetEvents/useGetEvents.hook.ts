import { useGetEventsQuery } from '@/services';
import useNotify from '@/hooks/useNotify/useNotify.hook.ts';
import { TUseGetEventsReturn } from '@/hooks/useGetEvents/useGetEvents.types.ts';

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
