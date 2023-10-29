import { authProcedure } from '../../trpc/index.js';
import { uploadInput, uploadOutput } from './upload.dto.js';
import exampleBase64CSV from '../../utils/exampleCSV.js';

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
					}
				}
			}
		})
		.input(uploadInput)
		.output(uploadOutput)
};

export default uploadProcedures;
