import { z } from 'zod';
import { token } from './token.dto.js';

export type TToken = z.infer<typeof token>;

export type TPayload = {
	userId: string;
};

export type TGenerateResult = {
	accessToken: TToken;
	refreshToken: TToken;
};
