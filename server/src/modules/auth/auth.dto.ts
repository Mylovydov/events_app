import { z } from 'zod';
import { generateTokenPairOutput } from '../token/token.dto.js';

export const authOutput = z.object({
	message: z.string(),
	data: generateTokenPairOutput
});

export const authInput = z.object({
	email: z.string().email(),
	password: z.string().min(8)
});

export const logoutInput = z.void();

export const logoutOutput = z.object({
	message: z.string(),
	data: z.object({})
});
