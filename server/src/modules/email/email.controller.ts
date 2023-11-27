import { emailProcedures, emailService } from './index.js';

const emailController = {
	addEmailSettings: emailProcedures.addEmailSettings.mutation(
		async ({ input }) => {
			const createdEvents = await emailService.addEmailSettings();
			return {
				message: 'Email settings successfully added!',
				data: createdEvents
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
