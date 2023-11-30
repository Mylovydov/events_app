import { z } from 'zod';
import { baseOutputSchema } from '../utils/index.js';

export const sendEmailInput = z.object({
	eventId: z.string().uuid(),
	userId: z.string().uuid()
});

export const sendEmailsInput = z.object({
	userId: z.string().uuid()
});

export const sendEmailOutput = baseOutputSchema.extend({
	data: z.object({})
});
