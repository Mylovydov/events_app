import { authProcedure } from '../../trpc/index.js';
import {
	addAppSettingsInput,
	addAppSettingsOutput,
	resetAppSettingsInput,
	resetAppSettingsOutput
} from './appSettings.dto.js';

const appSettingsProcedures = {
	addAppSettings: authProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/app-settings',
				tags: ['app-settings'],
				protect: true,
				summary: 'Add app settings to user by id',
				example: {
					response: {},
					request: {
						userId: '10db6a2d-0dd8-44f8-a603-b5a69723e751',
						highlightColor: '#fbf1e6',
						isAutoSendEnabled: true
					}
				}
			}
		})
		.input(addAppSettingsInput)
		.output(addAppSettingsOutput),

	resetAppSettings: authProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/app-settings/reset',
				tags: ['app-settings'],
				protect: true,
				summary: 'Reset app settings to default',
				example: {
					response: {},
					request: {
						userId: '10db6a2d-0dd8-44f8-a603-b5a69723e751'
					}
				}
			}
		})
		.input(resetAppSettingsInput)
		.output(resetAppSettingsOutput)
};

export default appSettingsProcedures;
