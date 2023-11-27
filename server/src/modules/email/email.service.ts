import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';
import { TAddEmailSettingsInputSchema } from './email.types.js';
import userService from '../user/user.service.js';
import { ApiError } from '../../error/index.js';
import { EmailSettingsModel } from './email-settings.model.js';

class EmailService {
	transporter: Transporter<SMTPTransport.SentMessageInfo>;

	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				pass: process.env.EMAIL_PASSWORD,
				user: process.env.EMAIL_USER
			}
		});
		this.verifyEmailSettings();
	}
	async addEmailSettings({
		userId,
		...restEmailSettings
	}: TAddEmailSettingsInputSchema) {
		const user = await userService.getByIdWithoutFlatten(userId);
		if (!user) {
			throw ApiError.notFound(`User with id: ${userId} not found!`);
		}

		let emailSettingsDb = await EmailSettingsModel.findByIdAndUpdate(
			user.emailSettings,
			{ ...restEmailSettings },
			{ new: true }
		);

		if (!emailSettingsDb) {
			emailSettingsDb = await EmailSettingsModel.create({
				...restEmailSettings
			});
			user.appSettings = emailSettingsDb._id;
			await user.save();
		}

		return emailSettingsDb.toJSON();
	}

	async sendInvitationToEvent() {
		await this.transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: 'den.milovidov.91@gmail.com',
			subject: 'Invitation to event',
			html: '<h1>Invitation to event</h1>'
		});
	}

	async verifyEmailSettings() {
		try {
			return await this.transporter.verify();
		} catch {
			return false;
		}
	}
}

export default new EmailService();
