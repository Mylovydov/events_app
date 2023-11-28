import { publicProcedure } from '../../trpc/index.js';
import { z } from 'zod';
import {
	addEmailSettingsInput,
	addEmailSettingsOutput
} from './emailSettings.dto.js';

const emailSettingsProcedures = {
	addEmailSettings: publicProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/emailSettings-settings',
				tags: ['emailSettings-settings'],
				summary: 'Add emailSettings settings',
				protect: true,
				example: {
					request: {},
					response: {}
				}
			}
		})
		.input(addEmailSettingsInput)
		.output(addEmailSettingsOutput),

	sendInvitationToEvent: publicProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/emailSettings/send-invitation',
				tags: ['email'],
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
