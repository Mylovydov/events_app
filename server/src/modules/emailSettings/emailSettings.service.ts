import nodemailer from 'nodemailer';
import {
	TAddEmailSettingsInputSchema,
	TChangeVerifyStatusArgs,
	TCreateTransporterDto,
	TGetEmailSettingsInput,
	TResetEmailSettingsDto
} from './emailSettings.types.js';
import userService from '../user/user.service.js';
import { ApiError } from '../../error/index.js';
import { defaultEmailSettings } from '../../utils/index.js';
import { EmailSettingsModel } from '../emailSettings/index.js';

class EmailSettingsService {
	async getEmailSettingsById({ emailSettingsId }: TGetEmailSettingsInput) {
		const emailSettings = await EmailSettingsModel.findById(emailSettingsId);
		if (!emailSettings) {
			throw ApiError.notFound(
				`Email settings with id: ${emailSettingsId} not found!`
			);
		}
		return emailSettings.toJSON();
	}

	async addEmailSettings({
		userId,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		isSettingsVerified,
		...restEmailSettings
	}: TAddEmailSettingsInputSchema) {
		const user = await userService.getByIdWithoutFlatten(userId);

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

	async resetEmailSettings({ userId }: TResetEmailSettingsDto) {
		const user = await userService.getByIdWithoutFlatten(userId);

		const emailSettingsDb = await this.setDefaultEmailSettings(
			user.emailSettings as string
		);

		return emailSettingsDb.toJSON();
	}

	createTransporter({
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

	private async setDefaultEmailSettings(emailSettingsId: string) {
		const emailSettingsDb = await EmailSettingsModel.findByIdAndUpdate(
			emailSettingsId,
			defaultEmailSettings,
			{ new: true }
		);

		if (!emailSettingsDb) {
			throw ApiError.notFound(
				`Email settings with id: ${emailSettingsId} not found!`
			);
		}

		return emailSettingsDb;
	}
}

export default new EmailSettingsService();
