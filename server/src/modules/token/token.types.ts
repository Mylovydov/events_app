import { z } from 'zod';
import {
	generateTokenPairInput,
	generateTokenPairOutput,
	mainTokenSchema
} from './token.dto';

export type TToken = z.infer<typeof mainTokenSchema>;

export type TPayload = z.infer<typeof generateTokenPairInput>;

export type TGenerateResult = z.infer<typeof generateTokenPairOutput>;
