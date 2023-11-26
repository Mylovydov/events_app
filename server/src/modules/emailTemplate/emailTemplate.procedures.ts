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
		.output(addEmailTemplateOutput)
};

export default emailTemplateProcedures;
