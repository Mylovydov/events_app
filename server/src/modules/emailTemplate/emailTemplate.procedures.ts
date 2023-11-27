import { publicProcedure } from '../../trpc/index.js';
import {
	addEmailTemplateInput,
	addEmailTemplateOutput
} from './emailTemplate.dto.js';

const emailTemplateProcedures = {
	addEmailTemplate: publicProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/email-template',
				tags: ['email-template'],
				summary: 'Create or update email template',
				protect: true,
				example: {
					request: {
						template: '',
						design: '',
						userId: '284a4e92-57b2-414f-8757-4d6e1462a347'
					},
					response: {
						message: 'Email template successfully created or updated!',
						data: {}
					}
				}
			}
		})
		.input(addEmailTemplateInput)
		.output(addEmailTemplateOutput)
};

export default emailTemplateProcedures;
