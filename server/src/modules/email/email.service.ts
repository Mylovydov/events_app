import {
	TPrepareEmailTemplateToSentParams,
	TSendEmailInput,
	TSendEmailsInput
} from './email.types.js';
import { emailSettingsService } from '../emailSettings/index.js';
import { userService } from '../user/index.js';
import { ApiError } from '../../error/index.js';
import { eventsService } from '../events/index.js';
import { emailTemplateService } from '../emailTemplate/index.js';
import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';
import Mail from 'nodemailer/lib/mailer/index.js';
import { getSubjectText, getUnsentEvents } from '../../utils/helpers/index.js';

export type TSendEmail = {
	transporter: Transporter<SMTPTransport.SentMessageInfo>;
} & Omit<Mail.Options, 'to'> & {
		to: string;
	};

class EmailService {
	async sendInvitationToEvent({ eventId, userId }: TSendEmailInput) {
		const user = await userService.getByIdWithoutFlatten(userId);

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
			event
		});

		const transporter =
			emailSettingsService.createTransporter(restEmailSettings);

		await this.sendEmail({
			transporter,
			from: restEmailSettings.serviceEmail,
			to: event.inviteeEmail,
			subject: getSubjectText(event.inviteeFirstName),
			html: preparedEmailTemplate,
			messageId: event._id
		});

		await eventsService.changeEmailSentStatus({
			eventId,
			isEmailSend: true
		});
	}

	async sendInvitationToEvents(
		{ userId }: TSendEmailsInput,
		isUnsentOnly = true
	) {
		const user = await userService.getByIdWithoutFlatten(userId);

		const { isSettingsVerified, _id, ...restEmailSettings } =
			await emailSettingsService.getEmailSettingsById({
				emailSettingsId: user.emailSettings as string
			});
		if (!isSettingsVerified) {
			throw ApiError.badRequest(`Email settings with id: ${_id} not verified!`);
		}

		const transporter =
			emailSettingsService.createTransporter(restEmailSettings);
		let events = await eventsService.getEventsByUserId(userId);
		if (isUnsentOnly) {
			events = getUnsentEvents(events);
		}

		const emailTemplate = await emailTemplateService.getEmailTemplate({
			emailTemplateId: user.emailTemplate as string
		});

		for (const event of events) {
			try {
				const preparedEmailTemplate = this.prepareEmailTemplateToSent({
					template: emailTemplate.template,
					event
				});

				await this.sendEmail({
					transporter,
					from: restEmailSettings.serviceEmail,
					to: event.inviteeEmail,
					subject: getSubjectText(event.inviteeFirstName),
					html: preparedEmailTemplate,
					messageId: event._id
				});

				await eventsService.changeEmailSentStatus({
					eventId: event._id,
					isEmailSend: true
				});
			} catch (err) {
				// TODO: add logging
			}
		}
	}

	private async sendEmail({ transporter, ...restOpt }: TSendEmail) {
		const { rejected } = await transporter.sendMail({
			replyTo: restOpt.from,
			...restOpt
		});

		if (rejected.includes(restOpt.to)) {
			throw ApiError.badRequest(
				`The invitation for the ${restOpt.to} address has not been delivered!`
			);
		}
	}

	private prepareEmailTemplateToSent({
		template,
		keys = [
			'inviteeLastName',
			'inviteeFirstName',
			'startDateTime',
			'endDateTime',
			'location'
		],
		event
	}: TPrepareEmailTemplateToSentParams) {
		let preparedTemplate = template;
		keys.forEach(key => {
			preparedTemplate = preparedTemplate.replace(
				new RegExp(`{{${key}}}`, 'g'),
				event[key as keyof typeof event]
			);
		});
		return preparedTemplate;
	}
}

export default new EmailService();
