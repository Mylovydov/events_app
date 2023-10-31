import uploadProcedures from './upload.procedures.js';
import uploadService from './upload.service.js';
import { z } from 'zod';

const uploadController = {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	upload: uploadProcedures.upload.mutation(async ({ input }) => {
		const createdEvents = await uploadService.upload(input.file);
		console.log('createdEvents', createdEvents);

		const datetime = z.date();

		createdEvents.forEach(event => {
			const res = datetime.safeParse(event.startDateTime);
			console.log('res', res);
			if (!res.success) {
				console.log('error', res.error);
			}
		});

		return {
			message: 'Events successfully created',
			data: createdEvents
		};
	})
};

export default uploadController;
