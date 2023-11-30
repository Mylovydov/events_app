import { z } from 'zod';
import { baseOutputSchema } from '../utils/index.js';

export const mainEmailSettingsSchema = z.object({
	service: z.string().optional(),
	serviceEmail: z.string(),
	servicePassword: z.string(),
	isSettingsVerified: z.boolean().optional()
});

export const emailSettingsSchemaDb = mainEmailSettingsSchema.extend({
	_id: z.string().uuid()
});

export const addEmailSettingsInput = mainEmailSettingsSchema.extend({
	userId: z.string().uuid()
});

export const addEmailSettingsOutput = baseOutputSchema.extend({
	data: emailSettingsSchemaDb
});

export const getEmailSettingsInput = z.object({
	emailSettingsId: z.string().uuid()
});

export const getEmailSettingsOutput = baseOutputSchema.extend({
	data: emailSettingsSchemaDb
});

export const resetEmailSettingsInput = z.object({
	userId: z.string().uuid()
});

export const resetEmailSettingsOutput = baseOutputSchema.extend({
	data: emailSettingsSchemaDb
});
