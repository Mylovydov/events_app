import { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import type { TAppRouter } from '../../../../server/src/types/shared.types';

export type TAddAppSettingsInput = inferProcedureInput<
	TAppRouter['appSettings']['addEmailSettings']
>;
export type TAddAppSettingsOutput = inferProcedureOutput<
	TAppRouter['appSettings']['addEmailSettings']
>;
