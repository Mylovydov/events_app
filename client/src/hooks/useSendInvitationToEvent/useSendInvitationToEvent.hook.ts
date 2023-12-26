import {
	TUseSendInvitationToEventReturn,
	useHandleError,
	useNotify
} from '@/hooks';
import {
	TSendInvitationToEventInput,
	useSendInvitationToEventMutation
} from '@/services';
import { useCallback } from 'react';

const useSendInvitationToEvent = (): TUseSendInvitationToEventReturn => {
	const { successNotify } = useNotify();
	const handleError = useHandleError();

	const [
		sendInvitationToEventTrigger,
		{ isLoading: isInvitationToEventSending }
	] = useSendInvitationToEventMutation();

	const sendInvitationToEvent = useCallback(
		(args: TSendInvitationToEventInput) => {
			sendInvitationToEventTrigger(args)
				.unwrap()
				.then(data => successNotify(data.message))
				.catch(handleError);
		},
		[sendInvitationToEventTrigger, successNotify, handleError]
	);

	return {
		sendInvitationToEvent,
		isInvitationToEventSending
	};
};

export default useSendInvitationToEvent;
