import { z } from 'zod';
import { baseOutputSchema } from '../utils/index.js';

export const mainAppSettingsSchema = z.object({
	highlightColor: z.string().optional(),
	isAutoSendEnabled: z.boolean()
});

export const appSettingsDb = mainAppSettingsSchema.extend({
	_id: z.string().uuid({ message: 'Invalid UUID format' })
});

export const addAppSettingsInput = appSettingsDb.omit({ _id: true }).extend({
	userId: z.string().uuid({ message: 'Invalid UUID format' })
});

export const addAppSettingsOutput = baseOutputSchema.extend({
	data: appSettingsDb
});
