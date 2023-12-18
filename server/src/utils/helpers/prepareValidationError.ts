import { ZodIssue } from 'zod';

export const prepareValidationError = (errors: ZodIssue[]): string => {
	const errorMessage = errors.map(({ path, message }) => {
		const objIndex = +(path[0] || 0) + 1;
		const field = path[1];
		return `Error ${message.toLowerCase()} in row ${objIndex}: field - ${field}`;
	});

	return errorMessage.at(0) || 'Validation error';
};

export default prepareValidationError;
