import { z } from 'zod';
import { addAppSettingsInput } from './appSettings.dto.js';

export type TAddAppSettingsDto = z.infer<typeof addAppSettingsInput>;
