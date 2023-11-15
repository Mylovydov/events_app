import {
	TCreateFileDto,
	TEventsSchema,
	TValidateCSVResult
} from './events.types.js';
import { eventsSchema } from './events.dto.js';
import { EventModel } from './events.model.js';
import { ApiError } from '../../error/index.js';
import papaParse, { ParseConfig } from 'papaparse';
import { prepareValidationErrors } from './events.utils.js';

class EventsService {
	async create(data: TCreateFileDto) {
		const csvString = this.getCSVDataFromBase64(data);

		const { errors, data: events } = this.parseCSV(csvString);
		if (errors.length) {
			throw ApiError.badRequest('Invalid CSV file');
		}

		const preparedEvents = this.prepareFileData(events);

		const validationResult = this.validateEventsBySchema(preparedEvents);
		if (validationResult.error) {
			throw ApiError.badRequest(validationResult.error);
		}

		return await this.uploadEventsToDb(validationResult.events!);
	}

	async getEvents() {
		const events = await EventModel.find();
		return events.map(event => event.toJSON());
	}

	private prepareFileData(events: TEventsSchema) {
		return events.map(({ startDateTime, endDateTime, ...restEvent }) => ({
			...restEvent,
			startDateTime: new Date(`${startDateTime} UTC`).toISOString(),
			endDateTime: new Date(`${endDateTime} UTC`).toISOString()
		}));
	}

	private async uploadEventsToDb(eventsToUpload: TEventsSchema) {
		const filteredEvents = await this.filterExistingEvents(eventsToUpload);
		const createdEvents = await EventModel.create(filteredEvents);
		return createdEvents.map(event => event.toJSON());
	}

	private validateEventsBySchema(events: TEventsSchema): TValidateCSVResult {
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

	private parseCSV(stringToParse: string, opt?: ParseConfig) {
		return papaParse.parse(stringToParse, {
			header: true,
			dynamicTyping: true,
			...opt
		});
	}

	private getCSVDataFromBase64(base64Data: string) {
		return Buffer.from(base64Data, 'base64').toString('utf-8');
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
