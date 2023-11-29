import { z } from 'zod';
import { sendEmailInput } from './email.dto.js';
import { TEventSchema } from '../events/index.js';

export type TSendEmailInput = z.infer<typeof sendEmailInput>;

export type TEventToSend = keyof Omit<
	TEventSchema,
	'eventUUID' | 'inviteeUUID' | 'inviteeEmail'
>;

export type TPrepareEmailTemplateToSentParams = {
	template: string;
	keys: TEventToSend[];
	event: TEventSchema;
};
