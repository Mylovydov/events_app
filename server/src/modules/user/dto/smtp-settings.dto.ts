// import { z } from 'zod';
// import { baseOutputSchema } from '../utils/index.js';

import { z } from 'zod';

export const mainSmtpSettingsSchema = z.object({
	_id: z.string().uuid({ message: 'Invalid UUID format' }),
	server: z.string()
});
