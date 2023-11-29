import { z } from 'zod';
import {
	addEmailSettingsInput,
	resetEmailSettingsInput
} from './emailSettings.dto.js';

export type TAddEmailSettingsInputSchema = z.infer<
	typeof addEmailSettingsInput
>;

export type TCreateTransporterDto = Omit<
	TAddEmailSettingsInputSchema,
	'userId'
>;

export type TResetEmailSettingsDto = z.infer<typeof resetEmailSettingsInput>;
