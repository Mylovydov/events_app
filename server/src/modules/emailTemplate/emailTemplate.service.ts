import { TAddEmailTemplateInput } from './emailTemplate.types.js';
import userService from '../user/user.service.js';
import { EmailTemplateModel } from './emailTemplates.model.js';
import { ApiError } from '../../error/index.js';

class EmailTemplateService {
	async addEmailTemplate({
		userId,
		...restEmailTemplate
	}: TAddEmailTemplateInput) {
		const user = await userService.getByIdWithoutFlatten(userId);

		if (!user) {
			throw ApiError.notFound(`User with id: ${userId} not found!`);
		}

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
}

export default new EmailTemplateService();
