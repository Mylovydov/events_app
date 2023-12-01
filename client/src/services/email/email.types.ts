import { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import type { TAppRouter } from '../../../../server/src/types/shared.types';

export type TSendInvitationToEventInput = inferProcedureInput<
	TAppRouter['email']['sendInvitationToEvent']
>;
export type TSendInvitationToEventOutput = inferProcedureOutput<
	TAppRouter['email']['sendInvitationToEvent']
>;

export type TSendInvitationToEventsInput = inferProcedureInput<
	TAppRouter['email']['sendInvitationToEvents']
>;
export type TSendInvitationToEventsOutput = inferProcedureOutput<
	TAppRouter['email']['sendInvitationToEvents']
>;

export type TResendInvitationToEventsInput = inferProcedureInput<
	TAppRouter['email']['resendAllInvitationToEvents']
>;
export type TResendInvitationToEventsOutput = inferProcedureOutput<
	TAppRouter['email']['resendAllInvitationToEvents']
>;
