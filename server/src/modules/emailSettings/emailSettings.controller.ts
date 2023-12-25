import emailSettingsProcedures from './emailSettings.procedures';
import {
	addEmailSettingsInput,
	addEmailSettingsOutput,
	getEmailSettingsInput,
	getEmailSettingsOutput,
	resetEmailSettingsInput,
	resetEmailSettingsOutput
} from './emailSettings.dto';
import emailSettingsService from './emailSettings.service';

const emailSettingsController = {
	addEmailSettings: emailSettingsProcedures.addEmailSettings
		.input(addEmailSettingsInput)
		.output(addEmailSettingsOutput)
		.mutation(async ({ input }) => {
			const emailSettings = await emailSettingsService.addEmailSettings(input);
			return {
				message: 'Email settings successfully added!',
				data: emailSettings
			};
		}),

	getEmailSettingsById: emailSettingsProcedures.getEmailSettingsById
		.input(getEmailSettingsInput)
		.output(getEmailSettingsOutput)
		.query(async ({ input }) => {
			const emailSettings =
				await emailSettingsService.getEmailSettingsById(input);
			return {
				message: 'Email settings successfully found!',
				data: emailSettings
			};
		}),

	resetEmailSettings: emailSettingsProcedures.resetEmailSettings
		.input(resetEmailSettingsInput)
		.output(resetEmailSettingsOutput)
		.mutation(async ({ input }) => {
			const emailSettings =
				await emailSettingsService.resetEmailSettings(input);
			return {
				message: 'Email settings successfully reset!',
				data: emailSettings
			};
		})
};

export default emailSettingsController;
