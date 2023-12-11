import { z } from 'zod';
import {
	addEmailTemplateInput,
	addEmailTemplateOutput,
	emailTemplateSchemaDb,
	getEmailTemplateInput,
	mainEmailTemplateSchema
} from './emailTemplate.dto';

export type TEmailTemplateSchema = z.infer<typeof mainEmailTemplateSchema>;
export type TEmailTemplateSchemaDb = z.infer<typeof emailTemplateSchemaDb>;
export type TAddEmailTemplateInput = z.infer<typeof addEmailTemplateInput>;
export type TCreateOrUpdateEmailTemplateOutput = z.infer<
	typeof addEmailTemplateOutput
>;
export type TGetEmailTemplateInput = z.infer<typeof getEmailTemplateInput>;
