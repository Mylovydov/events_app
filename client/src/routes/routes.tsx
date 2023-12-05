import {
	EMAIL_LAYOUT_PATH,
	EVENTS_PATH,
	HOME_PATH,
	LOGIN_PATH,
	SETTINGS_PATH
} from 'src/routes';
import {
	AppContentContainer,
	EmailLayoutPageContainer,
	EventsPageContainer,
	LoginPageContainer,
	SettingsPageContainer,
	UploadPageContainer
} from '@/containers';
import { ErrorPage } from '@/pages';
import { createBrowserRouter } from 'react-router-dom';

export const appRouter = createBrowserRouter([
	{
		path: LOGIN_PATH,
		element: <LoginPageContainer />,
		errorElement: <ErrorPage />
	},
	{
		path: HOME_PATH,
		element: <AppContentContainer />,
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
