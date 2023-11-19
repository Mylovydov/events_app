import { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import type { TAppRouter } from '../../../../server/src/types/shared.types';

export type TCreateEventsOutput = inferProcedureOutput<
	TAppRouter['events']['create']
>;

export type TCreateEventsInput = inferProcedureInput<
	TAppRouter['events']['create']
>;

export type TGetEventsInput = inferProcedureInput<
	TAppRouter['events']['getEvents']
>;

export type TGetEventsOutput = inferProcedureOutput<
	TAppRouter['events']['getEvents']
>;

export type TEvent = TCreateEventsOutput['data'][0];
