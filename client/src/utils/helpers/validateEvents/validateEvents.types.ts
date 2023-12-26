import { TEvent } from '@/services';

export type TOmitEvent = Omit<
	TEvent,
	'_id' | 'isEmailSend' | 'createdAt' | 'updatedAt' | 'userId'
>;
