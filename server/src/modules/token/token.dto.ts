import { z } from 'zod';

export const generateTokenPairOutput = z.object({
	accessToken: z.string(),
	refreshToken: z.string()
});

export const generateTokenPairInput = z.object({
	userId: z.string()
});
