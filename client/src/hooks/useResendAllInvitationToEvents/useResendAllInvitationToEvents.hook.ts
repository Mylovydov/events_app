import {
	TUseResendAllInvitationToEventReturn,
	useHandleError,
	useNotify
} from '@/hooks';
import {
	TResendInvitationToEventsInput,
	useResendAllInvitationToEventsMutation
} from '@/services';
import { useCallback } from 'react';

const useResendAllInvitationToEvents =
	(): TUseResendAllInvitationToEventReturn => {
		const { successNotify } = useNotify();
		const handleError = useHandleError();
		const [
			resendAllInvitationToEventTrigger,
			{ isLoading: isInvitationToAllEventResending }
		] = useResendAllInvitationToEventsMutation();

		const resendAllInvitationToEvent = useCallback(
			(args: TResendInvitationToEventsInput) => {
				resendAllInvitationToEventTrigger(args)
					.unwrap()
					.then(data => successNotify(data.message))
					.catch(handleError);
			},
			[resendAllInvitationToEventTrigger, successNotify, handleError]
		);

		return {
			resendAllInvitationToEvent,
			isInvitationToAllEventResending
		};
	};

export default useResendAllInvitationToEvents;
