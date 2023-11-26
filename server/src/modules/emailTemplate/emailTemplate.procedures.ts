import { publicProcedure } from '../../trpc/index.js';
import {
	addEmailTemplateInput,
	addEmailTemplateOutput,
	getEmailTemplateByUserIdInput,
	getEmailTemplateByUserIdOutput
} from './emailTemplate.dto.js';

const emailTemplateProcedures = {
	addEmailTemplate: publicProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/emailTemplate',
				tags: ['emailTemplate'],
				summary: 'Create or update email template',
				protect: true,
				example: {
					request: {},
					response: {
						message: '',
						data: {}
					}
				}
			}
		})
		.input(addEmailTemplateInput)
		.output(addEmailTemplateOutput),

	getEmailTemplateByUserId: publicProcedure
		.meta({
			openapi: {
				method: 'GET',
				path: '/emailTemplate',
				tags: ['emailTemplate'],
				summary: 'Get email template by user id',
				protect: true,
				example: {
					request: {},
					response: {
						message: '',
						data: {}
					}
				}
			}
		})
		.input(getEmailTemplateByUserIdInput)
		.output(getEmailTemplateByUserIdOutput)
};

export default emailTemplateProcedures;
