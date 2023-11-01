import uploadProcedures from './upload.procedures.js';
import uploadService from './upload.service.js';

const uploadController = {
	upload: uploadProcedures.upload.mutation(async ({ input }) => {
		const createdEvents = await uploadService.upload(input.file);
		// console.log('createdEvents', createdEvents);
		//
		// const datetime = z.date();
		//
		// createdEvents.forEach(event => {
		// 	const res = datetime.safeParse(event.startDateTime);
		// 	console.log('res', res);
		// 	if (!res.success) {
		// 		console.log('error', res.error);
		// 	}
		// });

		return {
			message: 'Events successfully created',
			data: createdEvents
		};
	})
};

export default uploadController;
