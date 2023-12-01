import { TUseResendAllInvitationToEventReturn, useNotify } from '@/hooks';
import {
	TResendInvitationToEventsInput,
	useResendAllInvitationToEventsMutation
} from '@/services';
import { useCallback } from 'react';

const useResendAllInvitationToEvents =
	(): TUseResendAllInvitationToEventReturn => {
		const { errorNotify, successNotify } = useNotify();
		const [
			resendAllInvitationToEventTrigger,
			{ isLoading: isInvitationToAllEventResending }
		] = useResendAllInvitationToEventsMutation();

		const resendAllInvitationToEvent = useCallback(
			(args: TResendInvitationToEventsInput) => {
				resendAllInvitationToEventTrigger(args)
					.unwrap()
					.then(data => successNotify(data.message))
					.catch(err => errorNotify(err.message));
			},
			[resendAllInvitationToEventTrigger, successNotify, errorNotify]
		);

		return {
			resendAllInvitationToEvent,
			isInvitationToAllEventResending
		};
	};

export default useResendAllInvitationToEvents;
