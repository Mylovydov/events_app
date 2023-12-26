import {
	TUseSendInvitationToEventsReturn,
	useHandleError,
	useNotify
} from '@/hooks';
import {
	TSendInvitationToEventsInput,
	useSendInvitationToEventsMutation
} from '@/services';
import { useCallback } from 'react';

const useSendInvitationToEvents = (): TUseSendInvitationToEventsReturn => {
	const { successNotify } = useNotify();
	const handleError = useHandleError();
	const [
		sendInvitationToEventsTrigger,
		{ isLoading: isInvitationToEventsSending }
	] = useSendInvitationToEventsMutation();

	const sendInvitationToEvents = useCallback(
		(args: TSendInvitationToEventsInput) => {
			sendInvitationToEventsTrigger(args)
				.unwrap()
				.then(data => successNotify(data.message))
				.catch(handleError);
		},
		[sendInvitationToEventsTrigger, successNotify, handleError]
	);

	return {
		sendInvitationToEvents,
		isInvitationToEventsSending
	};
};

export default useSendInvitationToEvents;
