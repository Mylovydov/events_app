import { z } from 'zod';

import {
	addAppSettingsInput,
	addEmailSettingsToUserInput,
	baseUserSchema,
	createUserInput,
	mainUserSchema,
	updateUserInput
} from './dto/index.js';

export type TCreateUserDto = z.infer<typeof createUserInput>;
export type TUpdateUserDto = z.infer<typeof updateUserInput>;
export type TMainUserSchema = z.infer<typeof mainUserSchema>;
export type TBaseUserSchema = z.infer<typeof baseUserSchema>;
export type TAddEmailSettingsDto = z.infer<typeof addEmailSettingsToUserInput>;
export type TAddAppSettingsDto = z.infer<typeof addAppSettingsInput>;
