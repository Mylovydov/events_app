import { useUploadEventsMutation } from '@/services';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { EVENTS_PATH } from '@/router/constants.ts';
import useNotify from '@/hooks/useNotify/useNotify.hook.ts';

const useUploadEvents = () => {
	const navigate = useNavigate();
	const { successNotify, errorNotify } = useNotify();
	const [uploadEventsTrigger, { isLoading: isEventsUploading }] =
		useUploadEventsMutation();

	const uploadEvents = useCallback(
		(events: string) => {
			uploadEventsTrigger(events)
				.unwrap()
				.then(data => {
					successNotify(data.message);
					navigate(EVENTS_PATH);
				})
				.catch(err => {
					errorNotify(err.message);
				});
		},
		[uploadEventsTrigger, successNotify, navigate, errorNotify]
	);

	return {
		uploadEvents,
		isEventsUploading
	};
};

export default useUploadEvents;
