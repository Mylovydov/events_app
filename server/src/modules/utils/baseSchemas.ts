import { z } from 'zod';

export const baseOutputSchema = z.object({
	message: z.string()
});
