import { z } from 'zod';
import { baseOutputSchema } from '../utils/index.js';
import { zodErrorMessage } from '../../utils/index.js';

export const mainEmailSettingsSchema = z.object({
	service: z.string().optional(),
	serviceEmail: z.string(),
	servicePassword: z.string(),
	isSettingsVerified: z.boolean().optional()
});

export const emailSettingsSchemaDb = mainEmailSettingsSchema.extend({
	_id: z.string().uuid(zodErrorMessage.id)
});

export const addEmailSettingsInput = mainEmailSettingsSchema.extend({
	userId: z.string().uuid(zodErrorMessage.id)
});

export const addEmailSettingsOutput = baseOutputSchema.extend({
	data: emailSettingsSchemaDb
});

export const getEmailSettingsInput = z.object({
	emailSettingsId: z.string().uuid(zodErrorMessage.id)
});

export const getEmailSettingsOutput = baseOutputSchema.extend({
	data: emailSettingsSchemaDb
});

export const resetEmailSettingsInput = z.object({
	userId: z.string().uuid(zodErrorMessage.id)
});

export const resetEmailSettingsOutput = baseOutputSchema.extend({
	data: emailSettingsSchemaDb
});
