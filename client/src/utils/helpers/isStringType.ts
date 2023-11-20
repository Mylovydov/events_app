const isStringType = (value: unknown): value is string =>
	typeof value === 'string';

export default isStringType;
