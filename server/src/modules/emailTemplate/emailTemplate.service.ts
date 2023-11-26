import {
	TAddEmailTemplateInput,
	TGetEmailTemplateByUserIdInput
} from './emailTemplate.types.js';
import userService from '../user/user.service.js';
import { EmailTemplateModel } from './emailTemplates.model.js';
import { ApiError } from '../../error/index.js';

class EmailTemplateService {
	async addEmailTemplate({ template, userId }: TAddEmailTemplateInput) {
		const user = await userService.getByIdWithoutFlatten(userId);

		if (!user) {
			throw ApiError.notFound(`User with id: ${userId} not found!`);
		}

		let emailTemplateDb = await EmailTemplateModel.findByIdAndUpdate(
			user.emailTemplate,
			{ template },
			{ new: true }
		);

		if (!emailTemplateDb) {
			emailTemplateDb = await EmailTemplateModel.create({
				template
			});
			user.emailTemplate = emailTemplateDb._id;
			await user.save();
		}

		return emailTemplateDb.toJSON();
	}

	async getEmailTemplateByUserId({ userId }: TGetEmailTemplateByUserIdInput) {
		const user = await userService.getById(userId);
		const emailTemplate = await EmailTemplateModel.findById(user.emailTemplate);
		if (!emailTemplate) {
			throw ApiError.notFound(
				`Email template with id: ${user.emailTemplate} not found!`
			);
		}
		return emailTemplate.toJSON();
	}
}

export default new EmailTemplateService();
