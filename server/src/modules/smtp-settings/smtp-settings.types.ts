import { addSmtpSettingsInput } from './smtp-settings.dto.js';
import { z } from 'zod';

export type TAddSmtpSettingsDto = z.infer<typeof addSmtpSettingsInput>;
