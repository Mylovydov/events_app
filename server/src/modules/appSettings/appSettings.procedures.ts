import { publicProcedure } from '../../trpc/index.js';
import {
	addAppSettingsInput,
	addAppSettingsOutput
} from './appSettings.dto.js';

const appSettingsProcedures = {
	addAppSettings: publicProcedure
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
		.output(addAppSettingsOutput)
};

export default appSettingsProcedures;
