import { z } from 'zod';
import { baseOutputSchema } from '../utils';
import { zodErrorMessage } from '../../utils';

export const mainAppSettingsSchema = z.object({
	highlightColor: z.string().optional(),
	isAutoSendEnabled: z.boolean()
});

export const appSettingsDb = mainAppSettingsSchema.extend({
	_id: z.string().uuid({ message: zodErrorMessage.id })
});

export const addAppSettingsInput = mainAppSettingsSchema.extend({
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
