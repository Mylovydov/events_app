import { authProcedure } from '../../trpc/index.js';
import { uploadInput, uploadOutput } from './upload.dto.js';
import { exampleBase64CSV, exampleEvents } from '../../utils/index.js';

const uploadProcedures = {
	upload: authProcedure
		.meta({
			openapi: {
				method: 'POST',
				path: '/upload',
				tags: ['upload'],
				summary: 'Upload file in base64 format',
				protect: true,
				example: {
					request: {
						file: exampleBase64CSV
					},
					response: {
						message: '',
						data: exampleEvents
					}
				}
			}
		})
		.input(uploadInput)
		.output(uploadOutput)
};

export default uploadProcedures;
