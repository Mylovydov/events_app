import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';
import {
	TAddEmailSettingsInputSchema,
	TCreateTransporterDto
} from './emailSettings.types.js';
import userService from '../user/user.service.js';
import { ApiError } from '../../error/index.js';
import { EmailSettingsModel } from './emailSettings.model.js';

class EmailSettingsService {
	transporter: Transporter<SMTPTransport.SentMessageInfo>;

	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				pass: process.env.EMAIL_PASSWORD,
				user: process.env.EMAIL_USER
			}
		});
	}
	async addEmailSettings({
		userId,
		...restEmailSettings
	}: TAddEmailSettingsInputSchema) {
		if (restEmailSettings.servicePassword && restEmailSettings.serviceEmail) {
			const isEmailSettingsVerified = await this.verifyEmailSettings({
				...restEmailSettings
			});
			if (!isEmailSettingsVerified) {
				throw ApiError.badRequest('Email settings are not verified!');
			}
		}

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
			user.emailSettings = emailSettingsDb._id;
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

	async verifyEmailSettings(dto: TCreateTransporterDto) {
		try {
			return await this.createTransporter(dto).verify();
		} catch {
			return false;
		}
	}

	private createTransporter({
		service = 'gmail',
		servicePassword,
		serviceEmail
	}: TCreateTransporterDto) {
		return nodemailer.createTransport({
			service,
			auth: {
				pass: servicePassword,
				user: serviceEmail
			}
		});
	}
}

export default new EmailSettingsService();
