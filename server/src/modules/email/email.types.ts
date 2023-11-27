import { z } from 'zod';
import { addEmailSettingsInput } from './email.dto.js';

export type TAddEmailSettingsInputSchema = z.infer<
	typeof addEmailSettingsInput
>;
