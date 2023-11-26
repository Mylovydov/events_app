import { z } from 'zod';
import { baseOutputSchema } from '../utils/index.js';

export const mainEmailTemplateSchema = z.object({
	template: z.string()
});

export const emailTemplateSchemaDb = mainEmailTemplateSchema.extend({
	_id: z.string().uuid(),
	createdAt: z.any(),
	updatedAt: z.any()
});

export const addEmailTemplateInput = z.object({
	template: z.string(),
	userId: z.string().uuid()
});

export const addEmailTemplateOutput = baseOutputSchema.extend({
	data: emailTemplateSchemaDb
});

export const getEmailTemplateByUserIdInput = z.object({
	userId: z.string().uuid()
});

export const getEmailTemplateByUserIdOutput = baseOutputSchema.extend({
	data: emailTemplateSchemaDb
});
