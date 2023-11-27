import { publicProcedure } from '../../trpc/index.js';
import { z } from 'zod';

const emailProcedures = {
	addEmailSettings: publicProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/email',
				tags: ['email'],
				summary: 'Add email settings',
				protect: true,
				example: {
					request: {},
					response: {}
				}
			}
		})
		.input(z.void())
		.output(z.any()),

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
