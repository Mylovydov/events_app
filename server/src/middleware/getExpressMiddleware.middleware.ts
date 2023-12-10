import { appRouter } from '../routes/index.js';
import { createContext } from '../trpc/index.js';
import { appLogger } from '../logger/index.js';
import getLoggerError from '../utils/helpers/getLoggerError.js';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

const getExpressMiddleware = () => {
	return createExpressMiddleware({
		router: appRouter,
		createContext,
		onError({ error, path, type }) {
			appLogger.log(
				getLoggerError({ message: error.message, code: error.code, path, type })
			);
		}
	});
};

export default getExpressMiddleware;
