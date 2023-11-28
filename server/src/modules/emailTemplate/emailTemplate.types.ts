import { z } from 'zod';
import {
	addEmailTemplateInput,
	addEmailTemplateOutput,
	emailTemplateSchemaDb,
	mainEmailTemplateSchema
} from './emailTemplate.dto.js';

export type TEmailTemplateSchema = z.infer<typeof mainEmailTemplateSchema>;
export type TEmailTemplateSchemaDb = z.infer<typeof emailTemplateSchemaDb>;
export type TAddEmailTemplateInput = z.infer<typeof addEmailTemplateInput>;
export type TCreateOrUpdateEmailTemplateOutput = z.infer<
	typeof addEmailTemplateOutput
>;