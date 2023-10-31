import { z } from 'zod';
import { eventSchema, eventSchemaDb, eventsSchema } from './events.dto.js';

export type TEventSchema = z.infer<typeof eventSchema>;
export type TEventsSchema = z.infer<typeof eventsSchema>;
export type TEventsSchemaDb = z.infer<typeof eventSchemaDb>;
