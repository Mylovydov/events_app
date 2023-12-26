import emailTemplateProcedures from './emailTemplate.procedures';
import emailTemplateService from './emailTemplate.service';
import {
	addEmailTemplateInput,
	addEmailTemplateOutput,
	getEmailTemplateInput,
	getEmailTemplateOutput
} from './emailTemplate.dto';

const emailTemplatesController = {
	addEmailTemplate: emailTemplateProcedures.addEmailTemplate
		.input(addEmailTemplateInput)
		.output(addEmailTemplateOutput)
		.mutation(async ({ input }) => {
			const emailTemplate = await emailTemplateService.addEmailTemplate(input);
			return {
				message: 'Email template successfully added!',
				data: emailTemplate
			};
		}),

	getEmailTemplate: emailTemplateProcedures.getEmailTemplate
		.input(getEmailTemplateInput)
		.output(getEmailTemplateOutput)
		.query(async ({ input }) => {
			const emailTemplate = await emailTemplateService.getEmailTemplate(input);
			return {
				message: 'Email template successfully found!',
				data: emailTemplate
			};
		})
};

export default emailTemplatesController;
