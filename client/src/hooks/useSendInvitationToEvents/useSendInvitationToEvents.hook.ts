import { TUseSendInvitationToEventsReturn, useNotify } from '@/hooks';
import {
	TSendInvitationToEventsInput,
	useSendInvitationToEventsMutation
} from '@/services';
import { useCallback } from 'react';

const useSendInvitationToEvents = (): TUseSendInvitationToEventsReturn => {
	const { errorNotify, successNotify } = useNotify();
	const [
		sendInvitationToEventsTrigger,
		{ isLoading: isInvitationToEventsSending }
	] = useSendInvitationToEventsMutation();

	const sendInvitationToEvents = useCallback(
		(args: TSendInvitationToEventsInput) => {
			sendInvitationToEventsTrigger(args)
				.unwrap()
				.then(data => successNotify(data.message))
				.catch(err => errorNotify(err.message));
		},
		[sendInvitationToEventsTrigger, successNotify, errorNotify]
	);

	return {
		sendInvitationToEvents,
		isInvitationToEventsSending
	};
};

export default useSendInvitationToEvents;
