import { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import type { TAppRouter } from '../../../../server/src';

export type TAddEmailSettingsInput = inferProcedureInput<
	TAppRouter['emailSettings']['addEmailSettings']
>;
export type TAddEmailSettingsOutput = inferProcedureOutput<
	TAppRouter['emailSettings']['addEmailSettings']
>;

export type TResetEmailSettingsInput = inferProcedureInput<
	TAppRouter['emailSettings']['resetEmailSettings']
>;
export type TResetEmailSettingsOutput = inferProcedureOutput<
	TAppRouter['emailSettings']['resetEmailSettings']
>;
