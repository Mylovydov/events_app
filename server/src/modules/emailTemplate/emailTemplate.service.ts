import {
	TAddEmailTemplateInput,
	TGetEmailTemplateInput
} from './emailTemplate.types';
import { userService } from '../user';
import { EmailTemplateModel } from './emailTemplates.model';
import { ApiError } from '../../error';

class EmailTemplateService {
	async addEmailTemplate({
		userId,
		...restEmailTemplate
	}: TAddEmailTemplateInput) {
		const user = await userService.getByIdWithoutFlatten(userId);

		let emailTemplateDb = await EmailTemplateModel.findByIdAndUpdate(
			user.emailTemplate,
			{ ...restEmailTemplate },
			{ new: true }
		);

		if (!emailTemplateDb) {
			emailTemplateDb = await EmailTemplateModel.create({
				...restEmailTemplate
			});
			user.emailTemplate = emailTemplateDb._id;
			await user.save();
		}

		return emailTemplateDb.toJSON();
	}

	async getEmailTemplate({ emailTemplateId }: TGetEmailTemplateInput) {
		const emailTemplate = await EmailTemplateModel.findById(emailTemplateId);
		if (!emailTemplate) {
			throw ApiError.notFound(
				`Email template with id: ${emailTemplateId} not found!`
			);
		}
		return emailTemplate.toJSON();
	}
}

export default new EmailTemplateService();
