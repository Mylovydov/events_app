import { z } from 'zod';
import { baseOutputSchema } from '../utils';
import { mainUserSchema } from '../user';
import { generateTokenPairOutput } from '../token/token.dto';

export const authInput = mainUserSchema.pick({ email: true, password: true });
export const authOutput = baseOutputSchema.extend({
	data: generateTokenPairOutput
});

export const logoutOutput = baseOutputSchema.extend({
	data: z.object({})
});
