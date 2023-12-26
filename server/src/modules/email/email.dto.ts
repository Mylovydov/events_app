import { z } from 'zod';
import { zodErrorMessage } from '../../utils';
import { baseOutputSchema } from '../utils';

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
