import { TEventsSchema } from './events.types.js';
import { eventsSchema } from './events.dto.js';
import { prepareValidationErrors } from '../upload/upload.utils.js';
import { TValidateCSVResult } from '../upload/upload.types.js';
import { EventModel } from './events.model.js';

class EventsService {
	async uploadEventsToDb(eventsToUpload: TEventsSchema) {
		const filteredEvents = await this.filterExistingEvents(eventsToUpload);
		return await EventModel.insertMany(filteredEvents);
	}

	async filterExistingEvents(events: TEventsSchema) {
		const dbEvents = await EventModel.find();
		return events.filter(event => {
			const isEventExist = dbEvents.some(
				dbEvent =>
					dbEvent.eventUUID === event.eventUUID &&
					dbEvent.inviteeUUID === event.inviteeUUID
			);

			return !isEventExist;
		});
	}

	validateEventsBySchema(events: TEventsSchema): TValidateCSVResult {
		const parseResult = eventsSchema.safeParse(events);

		if (parseResult.success) {
			return {
				events: parseResult.data,
				error: null
			};
		}

		return {
			events: null,
			error: prepareValidationErrors(parseResult.error.issues)
		};
	}
}

export default new EventsService();
