import { z } from 'zod';

export const uploadInput = z.object({
	file: z.string()
});
