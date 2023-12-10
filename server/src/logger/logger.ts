import { createLogger, format, transports } from 'winston';

const appLogger = createLogger({
	level: 'error',
	format: format.combine(
		format.timestamp({
			format: 'DD-MM-YYYY HH:mm:ss'
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	transports: [
		new transports.File({
			filename: 'error.log',
			level: 'error',
			dirname: 'logs'
		})
	]
});

export default appLogger;
