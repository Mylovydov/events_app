import { TEventsSchema } from './events.types.js';
import { eventsSchema } from './events.dto.js';
import { prepareValidationErrors } from '../upload/upload.utils.js';
import { TValidateCSVResult } from '../upload/upload.types.js';
import { EventModel } from './events.model.js';

class EventsService {
	async uploadEventsToDb(eventsToUpload: TEventsSchema) {
		const filteredEvents = await this.filterExistingEvents(eventsToUpload);
		const createdEvents = await EventModel.create(filteredEvents);
		return createdEvents.map(event => event.toJSON());
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

	private async filterExistingEvents(events: TEventsSchema) {
		const dbEvents = await EventModel.find();
		return events.filter(({ eventUUID, inviteeUUID }) => {
			const isEventExist = dbEvents.some(
				dbEvent =>
					dbEvent.eventUUID === eventUUID && dbEvent.inviteeUUID === inviteeUUID
			);

			return !isEventExist;
		});
	}
}

export default new EventsService();
