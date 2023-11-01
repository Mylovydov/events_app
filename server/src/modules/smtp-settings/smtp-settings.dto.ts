// import { z } from 'zod';
// import { baseOutputSchema } from '../utils/index.js';

import { z } from 'zod';
import { baseUserSchema, mainUserSchema } from '../user/user.dto.js';
import { baseOutputSchema } from '../utils/index.js';

export const mainSmtpSettingsSchema = z.object({
	_id: z.string().uuid({ message: 'Invalid UUID format' }),
	user: mainUserSchema.shape._id,
	server: z.string()
});

export const smtpSettingsSchemaWithoutId = mainSmtpSettingsSchema.omit({
	_id: true
});

// // CREATE
export const addSmtpSettingsInput = z.object({
	userId: mainUserSchema.shape._id,
	server: z.string()
});

export const addSmtpSettingsOutput = baseOutputSchema.extend({
	data: smtpSettingsSchemaWithoutId.extend({
		user: mainUserSchema.shape._id.or(baseUserSchema)
	})
});
