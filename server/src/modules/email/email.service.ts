import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';
import {
	TPrepareEmailTemplateToSentParams,
	TSendEmailInput
} from './email.types.js';
import { emailSettingsService } from '../emailSettings/index.js';
import { userService } from '../user/index.js';
import { ApiError } from '../../error/index.js';
import { eventsService } from '../events/index.js';
import { emailTemplateService } from '../emailTemplate/index.js';
import { format, parseISO } from 'date-fns';

class EmailService {
	private transporter: Transporter<SMTPTransport.SentMessageInfo>;

	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				pass: process.env.EMAIL_PASSWORD,
				user: process.env.EMAIL_USER
			}
		});
	}

	async sendEmail({ eventId, userId }: TSendEmailInput) {
		const user = await userService.getByIdWithoutFlatten(userId);
		if (!user) {
			throw ApiError.notFound(`User with id: ${userId} not found!`);
		}

		const { isSettingsVerified, _id, ...restEmailSettings } =
			await emailSettingsService.getEmailSettingsById({
				emailSettingsId: user.emailSettings as string
			});
		if (!isSettingsVerified) {
			throw ApiError.badRequest(`Email settings with id: ${_id} not verified!`);
		}

		const event = await eventsService.getEvent({ eventId });
		const emailTemplate = await emailTemplateService.getEmailTemplate({
			emailTemplateId: user.emailTemplate as string
		});
		const preparedEmailTemplate = this.prepareEmailTemplateToSent({
			template: emailTemplate.template,
			event,
			keys: [
				'inviteeLastName',
				'inviteeFirstName',
				'startDateTime',
				'endDateTime',
				'location'
			]
		});

		const transporter =
			emailSettingsService.createTransporter(restEmailSettings);

		await transporter.sendMail({
			from: restEmailSettings.serviceEmail,
			to: event.inviteeEmail,
			subject: `Dear ${event.inviteeFirstName}, we invite you to the event!`,
			html: preparedEmailTemplate
		});
	}

	private prepareEmailTemplateToSent({
		template,
		keys = [],
		event
	}: TPrepareEmailTemplateToSentParams) {
		let preparedTemplate = template;
		const dateFormat = 'dd.MM.yyyy HH:mm';

		keys.forEach(key => {
			switch (key) {
				case 'startDateTime':
					preparedTemplate = preparedTemplate.replace(
						new RegExp(`{{${key}}}`, 'g'),
						format(parseISO(event[key]), dateFormat)
					);
					break;
				case 'endDateTime':
					preparedTemplate = preparedTemplate.replace(
						new RegExp(`{{${key}}}`, 'g'),
						format(parseISO(event[key]), dateFormat)
					);
					break;
				default:
					preparedTemplate = preparedTemplate.replace(
						new RegExp(`{{${key}}}`, 'g'),
						event[key]
					);
			}
		});
		return preparedTemplate;
	}
}

export default new EmailService();
