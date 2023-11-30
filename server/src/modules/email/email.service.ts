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

class EmailService {
	async sendEmailInvitationToEvent({ eventId, userId }: TSendEmailInput) {
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

	async sendEmailInvitationToUserEvents({ userId }: TSendEmailsInput) {
		const user = await userService.getByIdWithoutFlatten(userId);
		if (!user) {
			throw ApiError.notFound(`User with id: ${userId} not found!`);
		}
	}

	private prepareEmailTemplateToSent({
		template,
		keys = [],
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
