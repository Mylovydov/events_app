import { typeToFlattenedError } from 'zod';

const prepareFlattenZodError = (error: typeToFlattenedError<unknown>) => {
	if (error.formErrors.length) {
		return error.formErrors.join('/n');
	}

	if (Object.keys(error.fieldErrors).length) {
		return Object.entries(error.fieldErrors)
			.map(([key, values]) => {
				const message = (values as string[])?.join(', ') || '';
				return `Field - ${key}: ${message}`;
			})
			.join('/n');
	}
};

export default prepareFlattenZodError;
