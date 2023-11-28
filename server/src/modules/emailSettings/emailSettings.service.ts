import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';
import {
	TAddEmailSettingsInputSchema,
	TCreateTransporterDto
} from './emailSettings.types.js';
import userService from '../user/user.service.js';
import { ApiError } from '../../error/index.js';
import { EmailSettingsModel } from './emailSettings.model.js';

export type TChangeVerifyStatusArgs = {
	transporterDto: TCreateTransporterDto;
	emailSettingsId: string;
	appSettingsId: string;
};

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
		isSettingsVerified,
		...restEmailSettings
	}: TAddEmailSettingsInputSchema) {
		const user = await userService.getByIdWithoutFlatten(userId);
		if (!user) {
			throw ApiError.notFound(`User with id: ${userId} not found!`);
		}

		if (restEmailSettings.servicePassword && restEmailSettings.serviceEmail) {
			await this.changeSettingsStatus({
				transporterDto: restEmailSettings,
				emailSettingsId: user.emailSettings as string,
				appSettingsId: user.appSettings as string
			});
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

	async toggleEmailSettingsVerify(
		isSettingsVerified: boolean,
		emailSettingsId: string
	) {
		return EmailSettingsModel.findByIdAndUpdate(
			{
				_id: emailSettingsId
			},
			{
				isSettingsVerified
			},
			{
				new: true
			}
		);
	}

	async changeSettingsStatus(args: TChangeVerifyStatusArgs) {
		const { transporterDto, emailSettingsId, appSettingsId } = args;
		const isEmailSettingsVerified = await this.verifyEmailSettings({
			...transporterDto
		});
		await this.toggleEmailSettingsVerify(
			isEmailSettingsVerified,
			emailSettingsId
		);

		const userAppSettings = await userService.getAppSettingsById(appSettingsId);
		const isAutoSendEnabled = isEmailSettingsVerified
			? userAppSettings.isAutoSendEnabled
			: false;
		await userService.toggleAppSettingsAutoSend(
			isAutoSendEnabled,
			appSettingsId
		);
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
