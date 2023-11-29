import { z } from 'zod';
import {
	addEmailSettingsInput,
	getEmailSettingsInput,
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
export type TGetEmailSettingsInput = z.infer<typeof getEmailSettingsInput>;

export type TChangeVerifyStatusArgs = {
	transporterDto: TCreateTransporterDto;
	emailSettingsId: string;
	appSettingsId: string;
};
