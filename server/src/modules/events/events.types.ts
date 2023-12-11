import { z } from 'zod';
import {
	changeEmailSentStatusInput,
	createEventsInput,
	eventSchemaDb,
	eventsSchema,
	getEventInput,
	getEventsInput,
	mainEventSchema
} from './events.dto';

export type TEventSchema = z.infer<typeof mainEventSchema>;
export type TEventsSchema = z.infer<typeof eventsSchema>;
export type TEventsSchemaDb = z.infer<typeof eventSchemaDb>;
export type TGetEventsInput = z.infer<typeof getEventsInput>;
export type TGetEventInput = z.infer<typeof getEventInput>;
export type TChangeEmailSentStatusInput = z.infer<
	typeof changeEmailSentStatusInput
>;
export type TCreateFileDto = z.infer<typeof createEventsInput>;

export type TValidateCSVResult = {
	error: string | null;
	events: TEventsSchema | null;
};
