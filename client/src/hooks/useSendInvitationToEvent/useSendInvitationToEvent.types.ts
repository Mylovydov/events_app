import { TResendInvitationToEventsInput } from '@/services';

export type TUseResendAllInvitationToEventReturn = {
	resendAllInvitationToEvent: (args: TResendInvitationToEventsInput) => void;
	isInvitationToAllEventResending: boolean;
};
