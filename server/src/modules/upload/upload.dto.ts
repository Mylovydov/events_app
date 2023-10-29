import { z } from 'zod';
import { eventsSchema } from '../events/events.dto.js';

export const uploadInput = z.object({
	file: z.string()
});

export const uploadOutput = z.object({
	message: z.string(),
	data: eventsSchema
});
