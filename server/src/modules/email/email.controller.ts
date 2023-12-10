import { emailProcedures, emailService } from './index.js';

const emailController = {
	sendInvitationToEvent: emailProcedures.sendInvitationToEvent.mutation(
		async ({ input }) => {
			await emailService.sendInvitationToEvent(input);
			return {
				message: 'Email successfully sent!',
				data: {}
			};
		}
	),

	sendInvitationToEvents: emailProcedures.sendInvitationToEvents.mutation(
		async ({ input }) => {
			await emailService.sendInvitationToEvents(input);
			return {
				message: 'Emails successfully sent!',
				data: {}
			};
		}
	),

	resendAllInvitationToEvents:
		emailProcedures.resendAllInvitationToEvents.mutation(async ({ input }) => {
			await emailService.sendInvitationToEvents(input, false);
			return {
				message: 'Invitations successfully resent!',
				data: {}
			};
		})
};

export default emailController;
