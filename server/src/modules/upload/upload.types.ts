import { z } from 'zod';
import { uploadInput } from './upload.dto.js';
import { TEventsSchema } from '../events/index.js';

export type TUploadFileDto = z.infer<typeof uploadInput>;

export type TValidateCSVResult = {
	error: string | null;
	events: TEventsSchema | null;
};
