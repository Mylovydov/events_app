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
				message: 'Email successfully sent!',
				data: {}
			};
		}
	)
};

export default emailController;
