import appSettingsProcedures from './appSettings.procedures';
import appSettingsService from './appSettings.service';
import {
	addAppSettingsInput,
	addAppSettingsOutput,
	resetAppSettingsInput,
	resetAppSettingsOutput
} from './appSettings.dto';

const appSettingsController = {
	addEmailSettings: appSettingsProcedures.addAppSettings
		.input(addAppSettingsInput)
		.output(addAppSettingsOutput)
		.mutation(async ({ input }) => {
			const emailSettings = await appSettingsService.addAppSettings(input);

			return {
				message: 'App settings successfully added!',
				data: emailSettings
			};
		}),

	resetAppSettings: appSettingsProcedures.resetAppSettings
		.input(resetAppSettingsInput)
		.output(resetAppSettingsOutput)
		.mutation(async ({ input }) => {
			const emailSettings = await appSettingsService.resetAppSettings(input);
			return {
				message: 'App settings successfully reset!',
				data: emailSettings
			};
		})
};

export default appSettingsController;
