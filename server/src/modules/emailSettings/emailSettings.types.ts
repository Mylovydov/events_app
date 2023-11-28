import { z } from 'zod';
import { addEmailSettingsInput } from './emailSettings.dto.js';

export type TAddEmailSettingsInputSchema = z.infer<
	typeof addEmailSettingsInput
>;

export type TCreateTransporterDto = Omit<
	TAddEmailSettingsInputSchema,
	'userId'
>;
export type TAddEmailSettingsDto = Omit<TAddEmailSettingsInputSchema, 'userId'>;
