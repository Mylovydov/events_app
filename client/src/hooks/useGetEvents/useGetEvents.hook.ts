import { useGetEventsQuery } from '@/services';
import useNotify from '@/hooks/useNotify/useNotify.hook.ts';

const useGetEvents = () => {
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
		events,
		isEventsLoading
	};
};

export default useGetEvents;
