import { TSendInvitationToEventInput } from '@/services';

export type TUseSendInvitationToEventReturn = {
	sendInvitationToEvent: (args: TSendInvitationToEventInput) => void;
	isInvitationToEventSending: boolean;
};
