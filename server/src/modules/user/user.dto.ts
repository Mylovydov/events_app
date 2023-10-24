import { z } from 'zod';

const baseUserSchema = z.object({
	name: z.string().max(25, 'Name must be less than 25 characters').optional(),
	email: z.string().email({ message: 'Invalid email address' })
});

export const userSchema = baseUserSchema.extend({
	id: z.string().uuid()
});

export const createUserInput = baseUserSchema.extend({
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters long')
		.max(25, 'Password must be less than 25 characters')
});
export const userIdInput = z.object({
	userId: z.string().uuid({ message: 'Invalid UUID format' })
});

export const updateUserInput = baseUserSchema.extend({
	userId: z.string().uuid({ message: 'Invalid UUID format' })
});
