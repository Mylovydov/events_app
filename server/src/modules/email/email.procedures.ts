import { publicProcedure } from '../../trpc/index.js';
import { z } from 'zod';
import { addEmailSettingsInput, addEmailSettingsOutput } from './email.dto.js';

const emailProcedures = {
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

	sendInvitationToEvent: publicProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/email/send-invitation',
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

export default emailProcedures;
