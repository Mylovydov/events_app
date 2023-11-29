import { z } from 'zod';
import {
	addAppSettingsInput,
	resetAppSettingsInput
} from './appSettings.dto.js';

export type TAddAppSettingsDto = z.infer<typeof addAppSettingsInput>;
export type TResetAppSettingsDto = z.infer<typeof resetAppSettingsInput>;
