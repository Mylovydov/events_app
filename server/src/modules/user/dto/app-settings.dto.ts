import { z } from 'zod';

export const mainAppSettingsSchema = z.object({
	_id: z.string().uuid({ message: 'Invalid UUID format' }),
	highlightColor: z.string()
});
