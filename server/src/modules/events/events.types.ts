import { z } from 'zod';
import { eventSchema, eventsSchema } from './events.dto.js';

export type TEventSchema = z.infer<typeof eventSchema>;
export type TEventsSchema = z.infer<typeof eventsSchema>;
