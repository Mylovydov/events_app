import { useUploadEventsMutation } from '@/services';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { EVENTS_PATH } from '@/router/constants.ts';

const useUploadEvents = () => {
	const navigate = useNavigate();
	const [uploadEventsTrigger, { isLoading: isEventsUploading }] =
		useUploadEventsMutation();

	const uploadEvents = useCallback(
		(events: string) => {
			uploadEventsTrigger(events)
				.unwrap()
				.then(data => {
					console.log('data: ', data.message);
					navigate(EVENTS_PATH);
				})
				.catch(err => {
					console.log('ERROR: ', err.message);
				});
		},
		[uploadEventsTrigger, navigate]
	);

	return {
		uploadEvents,
		isEventsUploading
	};
};

export default useUploadEvents;
