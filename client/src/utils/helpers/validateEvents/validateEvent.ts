import { TEvent } from '@/services';
import { exampleEvent, TOmitEvent } from '@/utils';

const validateEvent = (event: TEvent) => {
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

export default validateEvent;
