import { publicProcedure } from '../../trpc/index.js';
import { z } from 'zod';
import {
	addEmailSettingsInput,
	addEmailSettingsOutput,
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
		.output(resetEmailSettingsOutput),

	sendInvitationToEvent: publicProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/email-settings/send-invitation',
				tags: ['email-settings'],
				summary: 'Send invitation to event',
				protect: true,
				example: {
					request: {},
					response: {}
				}
			}
		})
		.input(z.void())
		.output(z.any())
};

export default emailSettingsProcedures;
