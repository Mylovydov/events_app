import { emailProcedures, emailService } from './index.js';

const emailController = {
	addEmailSettings: emailProcedures.addEmailSettings.mutation(
		async ({ input }) => {
			const emailSettings = await emailService.addEmailSettings(input);
			return {
				message: 'Email settings successfully added!',
				data: emailSettings
			};
		}
	),

	sendInvitationToEvent: emailProcedures.sendInvitationToEvent.mutation(
		async ({ input }) => {
			const createdEvents = await emailService.sendInvitationToEvent();
			return {
				message: 'Invitation successfully sent!',
				data: createdEvents
			};
		}
	)
};

export default emailController;
