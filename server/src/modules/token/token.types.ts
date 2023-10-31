import { z } from 'zod';
import {
	generateTokenPairInput,
	generateTokenPairOutput,
	token
} from './token.dto.js';

export type TToken = z.infer<typeof token>;

export type TPayload = z.infer<typeof generateTokenPairInput>;

export type TGenerateResult = z.infer<typeof generateTokenPairOutput>;
