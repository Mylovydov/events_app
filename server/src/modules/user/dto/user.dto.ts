import { z } from 'zod';
import { baseOutputSchema } from '../../utils/index.js';
import { mainAppSettingsSchema } from './app-settings.dto.js';
import {
	addEmailTemplateInput,
	mainEmailTemplateSchema
} from '../../emailTemplate/index.js';
import { emailSettingsSchemaDb } from '../../email/index.js';

export const mainUserSchema = z.object({
	_id: z.string().uuid({ message: 'Invalid UUID format' }),
	email: z.string().email({ message: 'Invalid email address' }),
	name: z.string().max(25, 'Name must be less than 25 characters').optional(),
	emailSettings: z.optional(z.string().uuid().or(emailSettingsSchemaDb)),
	emailTemplate: z.optional(z.string().uuid().or(mainEmailTemplateSchema)),
	appSettings: mainAppSettingsSchema.or(z.string().uuid()),
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

// APP SETTINGS
export const addAppSettingsInput = mainAppSettingsSchema
	.omit({ _id: true })
	.extend({
		userId: mainUserSchema.shape._id
	});

export const addEmailTemplateByUserIdInput = addEmailTemplateInput;
export const addEmailTemplateByUserIdOutput = baseOutputSchema.extend({
	data: baseUserSchema
});

// EMAIL SETTINGS
export const addEmailSettingsInput = emailSettingsSchemaDb
	.omit({ _id: true })
	.extend({
		userId: mainUserSchema.shape._id
	});
