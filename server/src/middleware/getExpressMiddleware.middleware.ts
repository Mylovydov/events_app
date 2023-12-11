import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from '../routes';
import { createContext } from '../trpc';
import { appLogger } from '../logger';
import { getLoggerError } from '../utils';

const getExpressMiddleware = () => {
	return createExpressMiddleware({
		router: appRouter,
		createContext,
		onError({ error, path, type }) {
			appLogger.error.log(
				getLoggerError({ message: error.message, code: error.code, path, type })
			);
		}
	});
};

export default getExpressMiddleware;
