import emailTemplateProcedures from './emailTemplate.procedures.js';
import { emailTemplateService } from './index.js';

const emailTemplatesController = {
	addEmailTemplate: emailTemplateProcedures.addEmailTemplate.mutation(
		async ({ input }) => {
			const emailTemplate = await emailTemplateService.addEmailTemplate(input);
			return {
				message: 'Email template successfully created or updated!',
				data: emailTemplate
			};
		}
	)
};

export default emailTemplatesController;