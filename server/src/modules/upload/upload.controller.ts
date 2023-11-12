import uploadProcedures from './upload.procedures.js';
import uploadService from './upload.service.js';

const uploadController = {
	upload: uploadProcedures.upload.mutation(async ({ input }) => {
		const createdEvents = await uploadService.upload(input.file);

		return {
			message: 'Events successfully created',
			data: createdEvents
		};
	})
};

export default uploadController;
