import { emailSettingsProcedures, emailSettingsService } from './index.js';

const emailSettingsController = {
	addEmailSettings: emailSettingsProcedures.addEmailSettings.mutation(
		async ({ input }) => {
			const emailSettings = await emailSettingsService.addEmailSettings(input);
			return {
				message: 'Email settings successfully added!',
				data: emailSettings
			};
		}
	),

	getEmailSettingsById: emailSettingsProcedures.getEmailSettingsById.query(
		async ({ input }) => {
			const emailSettings =
				await emailSettingsService.getEmailSettingsById(input);
			return {
				message: 'Email settings successfully found!',
				data: emailSettings
			};
		}
	),

	resetEmailSettings: emailSettingsProcedures.resetEmailSettings.mutation(
		async ({ input }) => {
			const emailSettings =
				await emailSettingsService.resetEmailSettings(input);
			return {
				message: 'Email settings successfully reset!',
				data: emailSettings
			};
		}
	)
};

export default emailSettingsController;
