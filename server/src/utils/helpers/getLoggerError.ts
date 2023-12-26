export type TGetLoggerError = {
	message: string;
	code?: string;
	path?: string;
	type?: string;
};

const getLoggerError = ({
	message,
	code = '',
	path = '',
	type = ''
}: TGetLoggerError) => ({
	level: 'error',
	message,
	code,
	path,
	type
});

export default getLoggerError;
