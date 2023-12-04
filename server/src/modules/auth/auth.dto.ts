import { z } from 'zod';
import { generateTokenPairOutput } from '../token/token.dto.js';
import { baseOutputSchema } from '../utils/index.js';
import { mainUserSchema } from '../user/index.js';

export const authInput = mainUserSchema.pick({ email: true, password: true });
export const authOutput = baseOutputSchema.extend({
	data: generateTokenPairOutput
});

export const logoutOutput = baseOutputSchema.extend({
	data: z.object({})
});
