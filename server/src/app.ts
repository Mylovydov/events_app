import express from 'express';
import cors from 'cors';
import cookiesParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import openApiDocument from './swaggerDocument/openApi.js';
import { config } from './config/index.js';
import {
	getExpressMiddleware,
	getOpenApiExpressMiddleware,
	setResponseHeaders
} from './middleware/index.js';

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

app.use('/api/trpc', getExpressMiddleware());
app.use('/api/', getOpenApiExpressMiddleware());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

export { app };
