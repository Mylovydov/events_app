import { ZodIssue } from 'zod';

export const prepareValidationErrors = (errors: ZodIssue[]): string => {
	return errors
		.map(({ path, message }) => {
			const objIndex = +path[0] + 1;
			const field = path[1];
			return `Error ${message.toLowerCase()} in row ${objIndex}: field - ${field}`;
		})
		.join('\n');
};
