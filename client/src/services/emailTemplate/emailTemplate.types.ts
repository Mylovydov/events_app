import { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import type { TAppRouter } from '../../../../server/src/types/shared.types';

export type TAddEmailTemplateInput = inferProcedureInput<
	TAppRouter['emailTemplate']['addEmailTemplate']
>;
export type TAddEmailTemplateOutput = inferProcedureOutput<
	TAppRouter['emailTemplate']['addEmailTemplate']
>;
