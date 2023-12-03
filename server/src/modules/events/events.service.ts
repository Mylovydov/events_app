import {
	TChangeEmailSentStatusInput,
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
import { QueryOptions } from 'mongoose';
import { userService } from '../user/index.js';
import isStringType from '../utils/isStringType.js';
import { emailService } from '../email/index.js';
import { prepareValidationError } from '../../utils/helpers/index.js';

const defaultDirection = 'desc';
const defaultSortKey = 'startDateTime';

class EventsService {
	async create({ userId, file }: TCreateFileDto) {
		const { appSettings } = await userService.getById(userId);
		const csvString = this.getCSVDataFromBase64(file);

		const { errors, data: events } = this.parseCSV(csvString);
		if (errors.length) {
			throw ApiError.badRequest('Invalid CSV file');
		}

		const validationResult = this.validateEventsBySchema(events);
		if (validationResult.error) {
			throw ApiError.badRequest(validationResult.error);
		}

		const uploadedEvents = await this.uploadEventsToDb(
			validationResult.events!,
			userId
		);

		if (!isStringType(appSettings) && appSettings.isAutoSendEnabled) {
			await emailService.sendInvitationToEvents({ userId });
		}

		return uploadedEvents;
	}

	async getEventsByUserId(userId: string, opt?: QueryOptions) {
		return EventModel.find({ userId }, null, opt);
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

		const opt = {
			sort: {
				[sortKey || defaultSortKey]: sortDirection || defaultDirection
			},
			skip,
			limit
		};

		const events = await this.getEventsByUserId(userId, opt);
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

	async changeEmailSentStatus({
		eventId,
		isEmailSend
	}: TChangeEmailSentStatusInput) {
		const event = await EventModel.findById(eventId);
		if (!event) {
			throw ApiError.notFound(`Event with id: ${eventId} not found!`);
		}

		event.isEmailSend = isEmailSend;
		await event.save();

		return event.toJSON();
	}

	private addUserIdToEvent(events: TEventsSchema, userId: string) {
		return events.map(event => ({
			...event,
			userId
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
