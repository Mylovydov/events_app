import { z } from 'zod';
import {
	baseUserSchema,
	createUserInput,
	mainUserSchema,
	updateUserInput
} from './user.dto.js';

export type TCreateUserDto = z.infer<typeof createUserInput>;
export type TUpdateUserDto = z.infer<typeof updateUserInput>;
export type TMainUserSchema = z.infer<typeof mainUserSchema>;
export type TBaseUserSchema = z.infer<typeof baseUserSchema>;
