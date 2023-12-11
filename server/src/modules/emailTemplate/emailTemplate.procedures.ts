import { authProcedure } from '../../trpc';
import {
	addEmailTemplateInput,
	addEmailTemplateOutput,
	getEmailTemplateInput,
	getEmailTemplateOutput
} from './emailTemplate.dto';
import { emailTemplateExample } from '../../utils';

const emailTemplateProcedures = {
	addEmailTemplate: authProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/email-template',
				tags: ['email-template'],
				summary: 'Add email template',
				protect: true,
				example: {
					request: {
						template: '',
						design: '',
						userId: '284a4e92-57b2-414f-8757-4d6e1462a347'
					},
					response: {
						message: 'Email template successfully added!',
						data: emailTemplateExample
					}
				}
			}
		})
		.input(addEmailTemplateInput)
		.output(addEmailTemplateOutput),

	getEmailTemplate: authProcedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/email-template',
				tags: ['email-template'],
				summary: 'Get email template by id',
				protect: true,
				example: {
					request: {
						emailTemplateId: '284a4e92-57b2-414f-8757-4d6e1462a347'
					},
					response: {
						message: 'Email template successfully found!',
						data: emailTemplateExample
					}
				}
			}
		})
		.input(getEmailTemplateInput)
		.output(getEmailTemplateOutput)
};

export default emailTemplateProcedures;
