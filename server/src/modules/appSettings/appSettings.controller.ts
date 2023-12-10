import { appSettingsProcedures, appSettingsService } from './index.js';

const appSettingsController = {
	addEmailSettings: appSettingsProcedures.addAppSettings.mutation(
		async ({ input }) => {
			const emailSettings = await appSettingsService.addAppSettings(input);

			return {
				message: 'App settings successfully added!',
				data: emailSettings
			};
		}
	),

	resetAppSettings: appSettingsProcedures.resetAppSettings.mutation(
		async ({ input }) => {
			const emailSettings = await appSettingsService.resetAppSettings(input);
			return {
				message: 'App settings successfully reset!',
				data: emailSettings
			};
		}
	)
};

export default appSettingsController;
