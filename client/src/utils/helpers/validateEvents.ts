import { TEvent } from '@/types';
import { readCsvFile } from '@/utils';

const exampleEvent: Record<keyof TEvent, string> = {
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
		const isValidTYpe =
			typeof event[key as keyof TEvent] === exampleEvent[key as keyof TEvent];

		if (!(isKeyExist && isValidTYpe)) {
			return false;
		}
	}
	return true;
};

export const validateEvents = async (file: File): Promise<boolean> => {
	const events = await readCsvFile(file);
	return (events as TEvent[]).every(validateEvent);
};
