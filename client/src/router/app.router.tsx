import { createBrowserRouter } from 'react-router-dom';

import { ErrorPage } from '@/pages';
import { AppLayout } from '@/layouts';
import {
	EmailLayoutPageContainer,
	EventsPageContainer,
	LoginPageContainer,
	SettingsPageContainer,
	UploadPageContainer
} from '@/containers';
import {
	EMAIL_LAYOUT_PATH,
	EVENTS_PATH,
	HOME_PATH,
	LOGIN_PATH,
	SETTINGS_PATH
} from '@/router';

const routes = [
	{
		path: LOGIN_PATH,
		element: <LoginPageContainer />,
		errorElement: <ErrorPage />
	},
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
						element: <UploadPageContainer />
					},
					{
						path: EVENTS_PATH,
						element: <EventsPageContainer />
					},
					{
						path: SETTINGS_PATH,
						element: <SettingsPageContainer />
					},
					{
						path: EMAIL_LAYOUT_PATH,
						element: <EmailLayoutPageContainer />
					}
				]
			}
		]
	}
];

const appRouter = createBrowserRouter(routes);

export default appRouter;
