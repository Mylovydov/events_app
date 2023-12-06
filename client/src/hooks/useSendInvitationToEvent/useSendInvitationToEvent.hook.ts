import { TUseSendInvitationToEventReturn, useNotify } from '@/hooks';
import {
	TSendInvitationToEventInput,
	useSendInvitationToEventMutation
} from '@/services';
import { useCallback } from 'react';

const useSendInvitationToEvent = (): TUseSendInvitationToEventReturn => {
	const { errorNotify, successNotify } = useNotify();
	const [
		sendInvitationToEventTrigger,
		{ isLoading: isInvitationToEventSending }
	] = useSendInvitationToEventMutation();

	const sendInvitationToEvent = useCallback(
		(args: TSendInvitationToEventInput) => {
			sendInvitationToEventTrigger(args)
				.unwrap()
				.then(data => successNotify(data.message))
				.catch(({ message, zodError }) => errorNotify(zodError || message));
		},
		[sendInvitationToEventTrigger, successNotify, errorNotify]
	);

	return {
		sendInvitationToEvent,
		isInvitationToEventSending
	};
};

export default useSendInvitationToEvent;
