import { z } from 'zod';
import { baseOutputSchema } from '../utils/index.js';

export const mainEmailSettingsSchema = z.object({
	service: z.string(),
	user: z.string(),
	pass: z.string()
});

export const emailSettingsSchemaDb = mainEmailSettingsSchema.extend({
	_id: z.string().uuid()
});

export const addEmailSettingsInput = emailSettingsSchemaDb
	.omit({ _id: true })
	.extend({
		userId: z.string().uuid()
	});

export const addEmailSettingsOutput = baseOutputSchema.extend({
	data: emailSettingsSchemaDb
});
