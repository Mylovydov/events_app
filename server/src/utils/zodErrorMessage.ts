const zodErrorMessage = {
	id: 'Invalid UUID format!',
	email: 'Invalid email address!',
	maxLength: (field: string, length: number) =>
		`${field} must be less than ${length} characters`,
	min: (field: string, length: number) =>
		`${field} must be at least ${length} characters long`,
	max: (field: string, length: number) =>
		`${field}  length should be no more than ${length} characters`
};

export default zodErrorMessage;
