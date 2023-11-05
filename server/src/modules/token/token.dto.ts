import { z } from 'zod';
import { mainUserSchema } from '../user/dto/index.js';

export const mainTokenSchema = z.string();

export const generateTokenPairOutput = z.object({
	accessToken: mainTokenSchema,
	refreshToken: mainTokenSchema
});

export const generateTokenPairInput = z.object({
	userId: mainUserSchema.shape._id
});
