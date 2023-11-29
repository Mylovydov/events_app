import { z } from 'zod';
import { baseOutputSchema } from '../utils/index.js';

export const mainEmailTemplateSchema = z.object({
	template: z.string(),
	design: z.string()
});

export const emailTemplateSchemaDb = mainEmailTemplateSchema.extend({
	_id: z.string().uuid(),
	createdAt: z.any(),
	updatedAt: z.any()
});

export const addEmailTemplateInput = mainEmailTemplateSchema.extend({
	userId: z.string().uuid()
});

export const addEmailTemplateOutput = baseOutputSchema.extend({
	data: emailTemplateSchemaDb
});

export const getEmailTemplateInput = z.object({
	emailTemplateId: emailTemplateSchemaDb.shape._id
});

export const getEmailTemplateOutput = baseOutputSchema.extend({
	data: emailTemplateSchemaDb
});
