import { z } from 'zod';
import { authInput } from './auth.dto';

export type TAuthDto = z.infer<typeof authInput>;
