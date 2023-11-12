import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routes/index.js';
import { createContext } from './trpc/index.js';
import cookiesParser from 'cookie-parser';
import { createOpenApiExpressMiddleware } from 'trpc-openapi';
import swaggerUi from 'swagger-ui-express';
import openApiDocument from './swaggerDocument/openApi.js';

const app = express();

app.use(cookiesParser());
app.use(cors({ origin: '*', credentials: true }));
app.use(
	'/api/trpc',
	createExpressMiddleware({
		router: appRouter,
		createContext
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
