import { TCreateEventsInput, useCreateEventsMutation } from '@/services';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { EVENTS_PATH } from '@/routes/constants.ts';
import { TUseCreateEventsReturn, useHandleError, useNotify } from '@/hooks';

const useCreateEvents = (): TUseCreateEventsReturn => {
	const navigate = useNavigate();
	const { successNotify } = useNotify();
	const handleError = useHandleError();
	const [createEventsTrigger, { isLoading: isEventsCreating }] =
		useCreateEventsMutation();

	const uploadEvents = useCallback(
		(arg: TCreateEventsInput) => {
			createEventsTrigger(arg)
				.unwrap()
				.then(data => {
					successNotify(data.message);
					navigate(EVENTS_PATH);
				})
				.catch(handleError);
		},
		[createEventsTrigger, successNotify, navigate, handleError]
	);

	return {
		uploadEvents,
		isEventsCreating
	};
};

export default useCreateEvents;
