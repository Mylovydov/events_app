// import { z } from 'zod';
// import { baseOutputSchema } from '../utils/index.js';

import { z } from 'zod';
import { baseOutputSchema } from '../../utils/index.js';

export const mainSmtpSettingsSchema = z.object({
	_id: z.string().uuid({ message: 'Invalid UUID format' }),
	server: z.string()
});

// // CREATE
export const addSmtpSettingsInput = z.object({
	userId: z.string().uuid({ message: 'Invalid UUID format' }),
	server: z.string()
});

export const addSmtpSettingsOutput = baseOutputSchema.extend({
	data: mainSmtpSettingsSchema
});
