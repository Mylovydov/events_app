import { createBrowserRouter } from 'react-router-dom';
import {
	EMAIL_LAYOUT_PATH,
	EVENTS_PATH,
	HOME_PATH,
	SETTINGS_PATH
} from '@/router/constants.ts';
import { ErrorPage } from '@/pages';
import { AppLayout } from '@/layouts';
import {
	EventsPageContainer,
	SettingsPageContainer,
	UploadPageContainer
} from '@/containers';

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
						element: <div>EMAIL_LAYOUT_PATH</div>
					}
				]
			}
		]
	}
]);

export default appRouter;
