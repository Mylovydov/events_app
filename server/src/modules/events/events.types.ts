import { z } from 'zod';
import {
	createEventsInput,
	eventSchemaDb,
	eventsSchema,
	mainEventSchema
} from './events.dto.js';

export type TEventSchema = z.infer<typeof mainEventSchema>;
export type TEventsSchema = z.infer<typeof eventsSchema>;
export type TEventsSchemaDb = z.infer<typeof eventSchemaDb>;
export type TCreateFileDto = z.infer<typeof createEventsInput.shape.file>;

export type TValidateCSVResult = {
	error: string | null;
	events: TEventsSchema | null;
};
