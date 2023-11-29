import {
	TCreateFileDto,
	TEventsSchema,
	TGetEventInput,
	TGetEventsInput,
	TValidateCSVResult
} from './events.types.js';
import { eventsSchema } from './events.dto.js';
import { EventModel } from './events.model.js';
import { ApiError } from '../../error/index.js';
import papaParse, { ParseConfig } from 'papaparse';
import { prepareValidationError } from '../../utils/index.js';

const defaultDirection = 'desc';
const defaultSortKey = 'startDateTime';

class EventsService {
	async create({ userId, file }: TCreateFileDto) {
		const csvString = this.getCSVDataFromBase64(file);

		const { errors, data: events } = this.parseCSV(csvString);
		if (errors.length) {
			throw ApiError.badRequest('Invalid CSV file');
		}

		const preparedEvents = this.prepareFileData(events);
		const validationResult = this.validateEventsBySchema(preparedEvents);
		if (validationResult.error) {
			throw ApiError.badRequest(validationResult.error);
		}

		return await this.uploadEventsToDb(validationResult.events!, userId);
	}

	async getEvents({
		sortKey,
		sortDirection,
		limit,
		page,
		userId
	}: TGetEventsInput) {
		if (!userId) {
			throw ApiError.badRequest('User id is required!');
		}
		page = page || 1;
		limit = limit || 5;
		const skip = (page - 1) * limit;

		const events = await EventModel.find({ userId })
			.sort({
				[sortKey || defaultSortKey]: sortDirection || defaultDirection
			})
			.skip(skip)
			.limit(limit);

		const totalEvents = await EventModel.countDocuments();

		return {
			events: events.map(event => event.toJSON()),
			total: totalEvents,
			skip,
			limit,
			pageCount: Math.ceil(totalEvents / limit)
		};
	}

	async getEvent({ eventId }: TGetEventInput) {
		const event = await EventModel.findById(eventId);
		if (!event) {
			throw ApiError.notFound(`Event with id: ${eventId} not found!`);
		}

		return event.toJSON();
	}

	private addUserIdToEvent(events: TEventsSchema, userId: string) {
		return events.map(event => ({
			...event,
			userId
		}));
	}

	private prepareFileData(events: TEventsSchema) {
		return events.map(({ startDateTime, endDateTime, ...restEvent }) => ({
			...restEvent,
			startDateTime: new Date(`${startDateTime} UTC`).toISOString(),
			endDateTime: new Date(`${endDateTime} UTC`).toISOString()
		}));
	}

	private async uploadEventsToDb(
		eventsToUpload: TEventsSchema,
		userId: string
	) {
		const filteredEvents = await this.filterExistingEvents(
			eventsToUpload,
			userId
		);

		const eventsWithUserId = this.addUserIdToEvent(filteredEvents, userId);
		const createdEvents = await EventModel.create(eventsWithUserId);
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
			error: prepareValidationError(parseResult.error.issues)
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

	private async filterExistingEvents(events: TEventsSchema, userId: string) {
		const dbEvents = await EventModel.find();

		return events.filter(({ eventUUID, inviteeUUID }) => {
			const isEventExist = dbEvents.some(
				dbEvent =>
					dbEvent.eventUUID === eventUUID &&
					dbEvent.inviteeUUID === inviteeUUID &&
					dbEvent.userId === userId
			);

			return !isEventExist;
		});
	}
}

export default new EventsService();
