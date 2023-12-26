import { generateOpenApiDocument } from 'trpc-openapi';
import { appRouter } from '../routes';
import { config } from '../config';

const openApiDocument = generateOpenApiDocument(appRouter, {
	title: 'Events-App API',
	description: 'API for the Events-App',
	version: '1.0.0',
	baseUrl: `http://localhost:${config.get('API_PORT')}/api`
});

export default openApiDocument;
