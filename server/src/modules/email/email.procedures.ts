import { publicProcedure } from '../../trpc/index.js';
import { z } from 'zod';

const emailProcedures = {
	addEmailSettings: publicProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/email',
				tags: ['email'],
				summary: 'Upload file in base64 format',
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
