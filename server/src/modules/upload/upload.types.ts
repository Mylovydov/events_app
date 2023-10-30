import { z } from 'zod';
import { TEventsSchema } from '../events/index.js';
import { uploadInput } from './upload.dto.js';

export type TUploadFileDto = z.infer<typeof uploadInput.shape.file>;

export type TValidateCSVResult = {
	error: string | null;
	events: TEventsSchema | null;
};
