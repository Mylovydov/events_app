import { readCsvFile } from '@/utils';
import { TEvent } from '@/services';

export type TOmitEvent = Omit<
	TEvent,
	'_id' | 'isEmailSend' | 'createdAt' | 'updatedAt'
>;

const exampleEvent: Record<keyof TOmitEvent, string> = {
	endDateTime: 'string',
	eventUUID: 'string',
	inviteeEmail: 'string',
	inviteeFirstName: 'string',
	inviteeLastName: 'string',
	inviteeUUID: 'string',
	location: 'string',
	startDateTime: 'string'
};

export const validateEvent = (event: TEvent) => {
	for (const key in exampleEvent) {
		const isKeyExist = key in event;
		const isValidType =
			typeof event[key as keyof TEvent] ===
			exampleEvent[key as keyof TOmitEvent];

		if (!(isKeyExist && isValidType)) {
			return false;
		}
	}
	return true;
};

export const validateEvents = async (file: File): Promise<boolean> => {
	try {
		const events = await readCsvFile(file);
		return (events as TEvent[]).every(validateEvent);
	} catch (err) {
		return false;
	}
};
