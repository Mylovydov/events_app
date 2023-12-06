import { authProcedure } from '../../trpc/index.js';
import {
	addEmailTemplateInput,
	addEmailTemplateOutput,
	getEmailTemplateInput,
	getEmailTemplateOutput
} from './emailTemplate.dto.js';

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
						data: {}
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
						template: '',
						design: '',
						userId: '284a4e92-57b2-414f-8757-4d6e1462a347'
					},
					response: {
						message: 'Email template successfully found!',
						data: {}
					}
				}
			}
		})
		.input(getEmailTemplateInput)
		.output(getEmailTemplateOutput)
};

export default emailTemplateProcedures;
