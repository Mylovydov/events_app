import { z } from 'zod';
import { baseOutputSchema } from '../utils/index.js';
import { zodErrorMessage } from '../../utils/index.js';

export const mainAppSettingsSchema = z.object({
	highlightColor: z.string().optional(),
	isAutoSendEnabled: z.boolean()
});

export const appSettingsDb = mainAppSettingsSchema.extend({
	_id: z.string().uuid({ message: zodErrorMessage.id })
});

export const addAppSettingsInput = appSettingsDb.omit({ _id: true }).extend({
	userId: z.string().uuid({ message: zodErrorMessage.id })
});

export const addAppSettingsOutput = baseOutputSchema.extend({
	data: appSettingsDb
});

export const resetAppSettingsInput = z.object({
	userId: z.string().uuid(zodErrorMessage.id)
});

export const resetAppSettingsOutput = baseOutputSchema.extend({
	data: appSettingsDb
});
