import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routes/index.js';
import { createContext } from './trpc/index.js';
import cookiesParser from 'cookie-parser';
import { createOpenApiExpressMiddleware } from 'trpc-openapi';
import swaggerUi from 'swagger-ui-express';
import openApiDocument from './swaggerDocument/openApi.js';
import { setResponseHeaders } from './utils/index.js';
import { config } from './config/index.js';
// TODO: hashing pass in schema
// TODO: add global env config

const app = express();
app.use(cookiesParser());
app.use(cors({ origin: config.get('CLIENT_URL'), credentials: true }));
app.use(
	setResponseHeaders({
		'Access-Control-Allow-Origin': config.get('CLIENT_URL'),
		'Access-Control-Request-Method': '*',
		'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, DELETE',
		'Access-Control-Allow-Headers': '*'
	})
);

app.use(
	'/api/trpc',
	createExpressMiddleware({
		router: appRouter,
		createContext,
		onError(opts) {
			const { error, input, ctx, req } = opts;

			// TODO: add logger
		}
	})
);
app.use(
	'/api/',
	createOpenApiExpressMiddleware({
		router: appRouter,
		createContext,
		responseMeta: undefined,
		onError: undefined,
		maxBodySize: undefined
	})
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

export { app };
