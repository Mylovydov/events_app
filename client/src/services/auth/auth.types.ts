import { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import type { TAppRouter } from '../../../../server/src/types/shared.types';

export type TRegisterInput = inferProcedureInput<
	TAppRouter['auth']['register']
>;
export type TRegisterOutput = inferProcedureOutput<
	TAppRouter['auth']['register']
>;

export type TLoginInput = inferProcedureInput<TAppRouter['auth']['login']>;
export type TLoginOutput = inferProcedureOutput<TAppRouter['auth']['login']>;

export type TLogoutInput = inferProcedureInput<TAppRouter['auth']['logout']>;
export type TLogoutOutput = inferProcedureOutput<TAppRouter['auth']['logout']>;

export type TRefreshInput = inferProcedureInput<TAppRouter['auth']['refresh']>;
export type TRefreshOutput = inferProcedureOutput<
	TAppRouter['auth']['refresh']
>;
