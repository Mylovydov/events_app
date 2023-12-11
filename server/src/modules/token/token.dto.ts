import { z } from 'zod';
import { mainUserSchema } from '../user';

export const mainTokenSchema = z.string();

export const generateTokenPairOutput = z.object({
	accessToken: mainTokenSchema,
	refreshToken: mainTokenSchema
});

export const generateTokenPairInput = z.object({
	userId: mainUserSchema.shape._id
});
