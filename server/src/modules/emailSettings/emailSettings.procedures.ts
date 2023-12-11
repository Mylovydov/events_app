import { authProcedure } from '../../trpc';
import {
	addEmailSettingsInput,
	addEmailSettingsOutput,
	getEmailSettingsInput,
	getEmailSettingsOutput,
	resetEmailSettingsInput,
	resetEmailSettingsOutput
} from './emailSettings.dto';
import { emailSettingsExample } from '../../utils';

const emailSettingsProcedures = {
	addEmailSettings: authProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/email-settings',
				tags: ['email-settings'],
				summary: 'Add email settings',
				protect: true,
				example: {
					request: {
						...emailSettingsExample,
						userId: '5fe3dd3c-fd7b-4976-9692-1702878c68c4'
					},
					response: {
						message: 'Email settings successfully added!',
						data: emailSettingsExample
					}
				}
			}
		})
		.input(addEmailSettingsInput)
		.output(addEmailSettingsOutput),

	getEmailSettingsById: authProcedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/email-settings',
				tags: ['email-settings'],
				summary: 'Get email settings by id',
				protect: true,
				example: {
					request: {
						emailSettingsId: '5fe3dd3c-fd7b-4976-9692-1702878c68c4'
					},
					response: {
						message: 'Email settings successfully found!',
						data: emailSettingsExample
					}
				}
			}
		})
		.input(getEmailSettingsInput)
		.output(getEmailSettingsOutput),

	resetEmailSettings: authProcedure
		.meta({
			openapi: {
				method: 'PUT',
				path: '/email-settings/reset',
				tags: ['email-settings'],
				summary: 'Reset emailSettings settings to default',
				protect: true,
				example: {
					request: {
						userId: '5fe3dd3c-fd7b-4976-9692-1702878c68c4'
					},
					response: {
						message: 'Email settings successfully reset!',
						data: emailSettingsExample
					}
				}
			}
		})
		.input(resetEmailSettingsInput)
		.output(resetEmailSettingsOutput)
};

export default emailSettingsProcedures;
