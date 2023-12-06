import { generateOpenApiDocument } from 'trpc-openapi';
import { appRouter } from '../routes/index.js';
import { config } from '../config/index.js';

const openApiDocument = generateOpenApiDocument(appRouter, {
	title: 'Events-App API',
	description: 'API for the Events-App',
	version: '1.0.0',
	baseUrl: `http://localhost:${config.get('APP_PORT')}/api`
});

export default openApiDocument;
