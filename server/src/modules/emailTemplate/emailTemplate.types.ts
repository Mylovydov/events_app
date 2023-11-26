import { z } from 'zod';
import {
	addEmailTemplateInput,
	addEmailTemplateOutput,
	emailTemplateSchemaDb,
	getEmailTemplateByUserIdInput,
	mainEmailTemplateSchema
} from './emailTemplate.dto.js';

export type TEmailTemplateSchema = z.infer<typeof mainEmailTemplateSchema>;
export type TEmailTemplateSchemaDb = z.infer<typeof emailTemplateSchemaDb>;
export type TAddEmailTemplateInput = z.infer<typeof addEmailTemplateInput>;
export type TGetEmailTemplateByUserIdInput = z.infer<
	typeof getEmailTemplateByUserIdInput
>;
export type TCreateOrUpdateEmailTemplateOutput = z.infer<
	typeof addEmailTemplateOutput
>;
