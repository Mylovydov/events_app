import { z } from 'zod';

export const mainEmailSettingsSchema = z.object({
	service: z.string(),
	user: z.string(),
	pass: z.string()
});

export const emailSettingsSchemaDb = mainEmailSettingsSchema.extend({
	_id: z.string().uuid()
});
