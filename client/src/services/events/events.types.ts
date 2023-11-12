import { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import type { TAppRouter } from '../../../../server/src/types/shared.types';

export type TUploadOutput = inferProcedureOutput<
	TAppRouter['upload']['create']
>;
export type TUploadInput = inferProcedureInput<TAppRouter['upload']['create']>;
