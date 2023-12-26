import { z } from 'zod';
import {
	generateTokenPairInput,
	generateTokenPairOutput,
	mainTokenSchema
} from './token.dto';
import jwt from "jsonwebtoken";

export type TToken = z.infer<typeof mainTokenSchema>;

export type TPayload = z.infer<typeof generateTokenPairInput>;

export type TGenerateResult = z.infer<typeof generateTokenPairOutput>;

export type TJwtPayloadWithUserId = {
	userId: string;
} & jwt.JwtPayload
