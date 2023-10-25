import uploadProcedures from './upload.procedures.js';
import uploadService from './upload.service.js';

const uploadController = {
	upload: uploadProcedures.upload.mutation(async ({ input }) => {
		console.log('input.file', input.file);
		const file = input.file;

		const result = await uploadService.upload(file);
	})
};

export default uploadController;
