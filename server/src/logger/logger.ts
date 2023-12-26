import { createLogger, format, transports } from 'winston';

const defaultSettings = {
	format: format.combine(
		format.timestamp({
			format: 'DD-MM-YYYY HH:mm:ss'
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	)
};

const appLogger = {
	error: createLogger({
		level: 'error',
		transports: [
			new transports.File({
				filename: 'error.log',
				level: 'error',
				dirname: 'logs'
			})
		],
		...defaultSettings
	}),
	info: createLogger({
		level: 'info',
		transports: [
			new transports.File({
				filename: 'info.log',
				level: 'info',
				dirname: 'logs'
			})
		],
		...defaultSettings
	})
};

export default appLogger;
