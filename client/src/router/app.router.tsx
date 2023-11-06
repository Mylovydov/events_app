import { createBrowserRouter } from 'react-router-dom';
import {
	EMAIL_LAYOUT_PATH,
	HOME_PATH,
	SETTINGS_PATH
} from '@/router/constants.ts';
import { ErrorPage } from '@/pages';
import { AppLayout } from '@/layouts';

const appRouter = createBrowserRouter([
	{
		path: HOME_PATH,
		element: <AppLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						index: true,
						element: <div>EVENTS_PATH</div>
					},
					{
						path: SETTINGS_PATH,
						element: <div>SETTINGS_PATH</div>
					},
					{
						path: EMAIL_LAYOUT_PATH,
						element: <div>EMAIL_LAYOUT_PATH</div>
					}
				]
			}
		]
	}
]);

export default appRouter;
