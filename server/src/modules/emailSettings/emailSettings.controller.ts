import { emailProcedures, emailService } from './index.js';

const emailSettingsController = {
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
	),

	resetEmailSettings: emailProcedures.resetEmailSettings.mutation(
		async ({ input }) => {
			const emailSettings = await emailService.resetEmailSettings(input);
			return {
				message: 'Email settings successfully added!',
				data: emailSettings
			};
		}
	)
};

export default emailSettingsController;
