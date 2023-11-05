import { z } from 'zod';

const baseOutputSchema = z.object({
	message: z.string()
});

export default baseOutputSchema;
