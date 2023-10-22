import { generateOpenApiDocument } from 'trpc-openapi';
import { appRouter } from '../routes/index.js';

const openApiDocument = generateOpenApiDocument(appRouter, {
	title: 'Events-App API',
	description: 'API for the Events-App',
	version: '1.0.0',
	baseUrl: `http://localhost:${process.env.APP_PORT}/api`
});

export default openApiDocument;
