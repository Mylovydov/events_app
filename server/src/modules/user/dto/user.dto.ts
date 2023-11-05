import { z } from 'zod';
import { mainSmtpSettingsSchema } from './smtp-settings.dto.js';
import { baseOutputSchema } from '../../utils/index.js';

export const mainUserSchema = z.object({
	_id: z.string().uuid({ message: 'Invalid UUID format' }),
	email: z.string().email({ message: 'Invalid email address' }),
	name: z.string().max(25, 'Name must be less than 25 characters').optional(),
	smtpSettings: z.optional(z.string().uuid().or(mainSmtpSettingsSchema)),
	autoEmailSending: z.boolean(),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters long')
		.max(25, 'Password must be less than 25 characters')
});

// BASE SCHEMA
export const baseUserSchema = mainUserSchema.omit({ password: true });

// CREATE
export const createUserInput = mainUserSchema.pick({
	email: true,
	name: true,
	password: true
});
export const createUserOutput = baseOutputSchema.extend({
	data: baseUserSchema
});

// GET / DELETE
export const userIdInput = z.object({
	userId: mainUserSchema.shape._id
});

// UPDATE
export const updateUserInput = baseUserSchema.omit({ _id: true }).extend({
	userId: userIdInput
});
export const updateUserOutput = baseOutputSchema.extend({
	data: baseUserSchema
});

// GET USER BY ID
export const getUserOutput = baseOutputSchema.extend({
	data: baseUserSchema
});

// GET ALL
export const getUsersOutput = baseOutputSchema.extend({
	data: z.array(baseUserSchema)
});

// DELETE
export const deleteUserOutput = baseOutputSchema.extend({
	data: baseUserSchema
});
