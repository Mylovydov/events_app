import { z } from 'zod';

import {
	addSmtpSettingsInput,
	baseUserSchema,
	createUserInput,
	mainUserSchema,
	updateUserInput
} from './dto/index.js';

export type TCreateUserDto = z.infer<typeof createUserInput>;
export type TUpdateUserDto = z.infer<typeof updateUserInput>;
export type TMainUserSchema = z.infer<typeof mainUserSchema>;
export type TBaseUserSchema = z.infer<typeof baseUserSchema>;
export type TAddSmtpSettingsDto = z.infer<typeof addSmtpSettingsInput>;
