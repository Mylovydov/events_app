import { z } from 'zod';
import { baseOutputSchema } from '../utils/index.js';
import { zodErrorMessage } from '../../utils/index.js';

export const sendEmailInput = z.object({
	eventId: z.string().uuid(zodErrorMessage.id),
	userId: z.string().uuid(zodErrorMessage.id)
});

export const sendEmailsInput = z.object({
	userId: z.string().uuid(zodErrorMessage.id)
});

export const sendEmailOutput = baseOutputSchema.extend({
	data: z.object({})
});
