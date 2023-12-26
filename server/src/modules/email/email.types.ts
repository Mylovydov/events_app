import { z } from 'zod';
import { sendEmailInput, sendEmailsInput } from './email.dto';
import { TEventSchema } from '../events';

export type TSendEmailInput = z.infer<typeof sendEmailInput>;
export type TSendEmailsInput = z.infer<typeof sendEmailsInput>;

export type TEventToSend = keyof Omit<
	TEventSchema,
	'eventUUID' | 'inviteeUUID' | 'inviteeEmail'
>;

export type TPrepareEmailTemplateToSentParams = {
	template: string;
	keys?: TEventToSend[];
	event: TEventSchema;
};
