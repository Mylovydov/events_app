import { TCreateEventsInput, useCreateEventsMutation } from '@/services';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { EVENTS_PATH } from '@/router/constants.ts';
import { useNotify } from '@/hooks';

const useCreateEvents = () => {
	const navigate = useNavigate();
	const { successNotify, errorNotify } = useNotify();
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
				.catch(err => errorNotify(err.message));
		},
		[createEventsTrigger, successNotify, navigate, errorNotify]
	);

	return {
		uploadEvents,
		isEventsCreating
	};
};

export default useCreateEvents;
