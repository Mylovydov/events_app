import papaParse, { ParseConfig } from 'papaparse';
import { ApiError } from '../../error/index.js';
import { eventsService, TEventsSchema } from '../events/index.js';
import { TUploadFileDto } from './upload.types.js';

class UploadService {
	private eventsService = eventsService;
	async upload(data: TUploadFileDto) {
		const csvString = this.getCSVDataFromBase64(data);

		const { errors, data: events } = this.parseCSV(csvString);
		if (errors.length) {
			throw ApiError.badRequest('Invalid CSV file');
		}

		const preparedEvents = this.prepareFileData(events);

		const validationResult =
			this.eventsService.validateEventsBySchema(preparedEvents);
		if (validationResult.error) {
			throw ApiError.badRequest(validationResult.error);
		}

		const createdEvents = await this.eventsService.uploadEventsToDb(
			validationResult.events!
		);

		return createdEvents;
	}

	parseCSV(stringToParse: string, opt?: ParseConfig) {
		return papaParse.parse(stringToParse, {
			header: true,
			dynamicTyping: true,
			...opt
		});
	}

	getCSVDataFromBase64(base64Data: string) {
		return Buffer.from(base64Data, 'base64').toString('utf-8');
	}

	prepareFileData(events: TEventsSchema) {
		return events.map(({ startDateTime, endDateTime, ...restEvent }) => ({
			...restEvent,
			startDateTime: new Date(`${startDateTime} UTC`).toISOString(),
			endDateTime: new Date(`${endDateTime} UTC`).toISOString()
		}));
	}
}

export default new UploadService();
