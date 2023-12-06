import { z } from 'zod';
import { mainEmailTemplateSchema } from '../emailTemplate/index.js';
import { appSettingsDb } from '../appSettings/index.js';
import { emailSettingsSchemaDb } from '../emailSettings/index.js';
import { baseOutputSchema } from '../utils/index.js';
import { zodErrorMessage } from '../../utils/index.js';

export const mainUserSchema = z.object({
	_id: z.string().uuid({ message: zodErrorMessage.id }),
	email: z.string().email({ message: zodErrorMessage.email }),
	name: z.string().max(25, zodErrorMessage.maxLength('Name', 25)).optional(),
	emailTemplate: z.optional(
		z.string().uuid(zodErrorMessage.id).or(mainEmailTemplateSchema)
	),
	appSettings: appSettingsDb.or(z.string().uuid(zodErrorMessage.id)),
	emailSettings: emailSettingsSchemaDb.or(z.string().uuid(zodErrorMessage.id)),
	password: z
		.string()
		.min(8, zodErrorMessage.min('Password', 8))
		.max(25, zodErrorMessage.max('Password', 25))
});

// BASE SCHEMA
export const baseUserSchema = mainUserSchema.omit({ password: true });

// CREATE
export const createUserInput = mainUserSchema.pick({
	email: true,
	name: true,
	password: true
});

export const baseUserOutput = baseOutputSchema.extend({
	data: baseUserSchema
});

// GET / DELETE
// TODO: Можно было брать userId из токена, но мне кажется это повлияет на расширяемость, если нужно будет делать админку, то мы не сможем управлять всеми юзерами
export const userIdInput = z.object({
	userId: mainUserSchema.shape._id
});

// UPDATE
export const updateUserInput = baseUserSchema.omit({ _id: true }).extend({
	userId: userIdInput
});

// GET ALL
export const getUsersOutput = baseOutputSchema.extend({
	data: z.array(baseUserSchema)
});
