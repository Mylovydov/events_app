import { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import type { TAppRouter } from '../../../../server/src/types/shared.types';

export type TAddEmailSettingsInput = inferProcedureInput<
	TAppRouter['emailSettings']['addEmailSettings']
>;
export type TAddEmailSettingsOutput = inferProcedureOutput<
	TAppRouter['emailSettings']['addEmailSettings']
>;
