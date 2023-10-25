import { authProcedure } from '../../trpc/index.js';
import { uploadInput } from './upload.dto.js';
import { z } from 'zod';

const uploadProcedures = {
	upload: authProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/upload',
				tags: ['upload'],
				summary: 'Upload file in base64 format',
				protect: true
			}
		})
		.input(uploadInput)
		.output(z.void())
};

export default uploadProcedures;
