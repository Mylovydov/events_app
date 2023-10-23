import { z } from 'zod';
import { createUserInput, updateUserInput } from './user.dto.js';

export type TCreateUserDto = z.infer<typeof createUserInput>;
export type TUpdateUserDto = z.infer<typeof updateUserInput>;
