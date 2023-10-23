import { z } from 'zod';
import { authInput } from './auth.dto.js';

export type TAuthDto = z.infer<typeof authInput>;
