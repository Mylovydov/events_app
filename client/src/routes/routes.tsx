import { createBrowserRouter } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '@/routes';

export const appRouter = createBrowserRouter([
	...privateRoutes,
	...publicRoutes
]);
