import { z } from 'zod';
import { eventSchemaDb, eventsSchema, mainEventSchema } from './events.dto.js';

export type TEventSchema = z.infer<typeof mainEventSchema>;
export type TEventsSchema = z.infer<typeof eventsSchema>;
export type TEventsSchemaDb = z.infer<typeof eventSchemaDb>;
