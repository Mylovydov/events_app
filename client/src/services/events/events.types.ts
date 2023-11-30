import { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import type { TAppRouter } from '../../../../server/src/types/shared.types';

export type TCreateEventsOutput = inferProcedureOutput<
	TAppRouter['events']['create']
>;

export type TGetEventOutput = inferProcedureOutput<
	TAppRouter['events']['getEvent']
>;

export type TCreateEventsInput = inferProcedureInput<
	TAppRouter['events']['create']
>;

export type TGetEventsInput = inferProcedureInput<
	TAppRouter['events']['getEvents']
>;

export type TGetModifyEventsInput = Omit<TGetEventsInput, 'userId'> & {
	userId?: string;
};

export type TGetEventsOutput = inferProcedureOutput<
	TAppRouter['events']['getEvents']
>;

export type TEvent = TGetEventOutput['data'];
