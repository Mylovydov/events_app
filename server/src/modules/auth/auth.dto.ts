import { z } from 'zod';
import { generateTokenPairOutput } from '../token/token.dto.js';

export const authOutput = z.object({
	message: z.string(),
	data: generateTokenPairOutput
});

export const authInput = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters long')
		.max(25, 'Password must be less than 25 characters')
});

export const logoutInput = z.void();

export const logoutOutput = z.object({
	message: z.string(),
	data: z.object({})
});
