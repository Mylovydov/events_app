import { createBrowserRouter } from 'react-router-dom';

import { ErrorPage } from '@/pages';
import { AppLayout } from '@/layouts';
import {
	EmailLayoutPageContainer,
	EventsPageContainer,
	SettingsPageContainer,
	UploadPageContainer
} from '@/containers';
import {
	EMAIL_LAYOUT_PATH,
	EVENTS_PATH,
	HOME_PATH,
	SETTINGS_PATH
} from '@/router';

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
]);

export default appRouter;
