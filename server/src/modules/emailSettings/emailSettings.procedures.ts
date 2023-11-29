import { publicProcedure } from '../../trpc/index.js';
import {
	addEmailSettingsInput,
	addEmailSettingsOutput,
	getEmailSettingsInput,
	getEmailSettingsOutput,
	resetEmailSettingsInput,
	resetEmailSettingsOutput
} from './emailSettings.dto.js';

const emailSettingsProcedures = {
	addEmailSettings: publicProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/email-settings',
				tags: ['email-settings'],
				summary: 'Add email settings',
				protect: true,
				example: {
					request: {},
					response: {}
				}
			}
		})
		.input(addEmailSettingsInput)
		.output(addEmailSettingsOutput),

	getEmailSettingsById: publicProcedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/email-settings',
				tags: ['email-settings'],
				summary: 'Get email settings by id',
				protect: true,
				example: {
					request: {},
					response: {}
				}
			}
		})
		.input(getEmailSettingsInput)
		.output(getEmailSettingsOutput),

	resetEmailSettings: publicProcedure
		.meta({
			openapi: {
				method: 'PUT',
				path: '/email-settings/reset',
				tags: ['email-settings'],
				summary: 'Reset emailSettings settings to default',
				protect: true,
				example: {
					request: {},
					response: {}
				}
			}
		})
		.input(resetEmailSettingsInput)
		.output(resetEmailSettingsOutput)
};

export default emailSettingsProcedures;
