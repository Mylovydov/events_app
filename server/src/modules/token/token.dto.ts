import { z } from 'zod';

export const token = z.string();

export const generateTokenPairOutput = z.object({
	accessToken: token,
	refreshToken: token
});

export const generateTokenPairInput = z.object({
	userId: z.string()
});
