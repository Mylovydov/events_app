import uploadProcedures from './upload.procedures.js';
import uploadService from './upload.service.js';

const uploadController = {
	upload: uploadProcedures.upload.mutation(async ({ input }) => {
		return await uploadService.upload(input.file);
	})
};

export default uploadController;
