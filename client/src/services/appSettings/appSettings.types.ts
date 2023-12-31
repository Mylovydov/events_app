import { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import type { TAppRouter } from '../../../../server/src';

export type TAddAppSettingsInput = inferProcedureInput<
	TAppRouter['appSettings']['addEmailSettings']
>;
export type TAddAppSettingsOutput = inferProcedureOutput<
	TAppRouter['appSettings']['addEmailSettings']
>;

export type TResetAppSettingsInput = inferProcedureInput<
	TAppRouter['appSettings']['resetAppSettings']
>;
export type TResetAppSettingsOutput = inferProcedureOutput<
	TAppRouter['appSettings']['resetAppSettings']
>;
