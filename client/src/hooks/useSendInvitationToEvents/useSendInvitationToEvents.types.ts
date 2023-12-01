import { TSendInvitationToEventsInput } from '@/services';

export type TUseSendInvitationToEventsReturn = {
	sendInvitationToEvents: (args: TSendInvitationToEventsInput) => void;
	isInvitationToEventsSending: boolean;
};
