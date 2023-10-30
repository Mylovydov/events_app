import { z } from 'zod';
import { mainUserSchema } from '../user/user.dto.js';

export const token = z.string();

export const generateTokenPairOutput = z.object({
	accessToken: token,
	refreshToken: token
});

export const generateTokenPairInput = z.object({
	userId: mainUserSchema.shape._id
});
