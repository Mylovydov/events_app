import emailTemplateProcedures from './emailTemplate.procedures';
import { emailTemplateService } from './index';

const emailTemplatesController = {
	addEmailTemplate: emailTemplateProcedures.addEmailTemplate.mutation(
		async ({ input }) => {
			const emailTemplate = await emailTemplateService.addEmailTemplate(input);
			return {
				message: 'Email template successfully added!',
				data: emailTemplate
			};
		}
	),

	getEmailTemplate: emailTemplateProcedures.getEmailTemplate.query(
		async ({ input }) => {
			const emailTemplate = await emailTemplateService.getEmailTemplate(input);
			return {
				message: 'Email template successfully found!',
				data: emailTemplate
			};
		}
	)
};

export default emailTemplatesController;
