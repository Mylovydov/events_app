import {
	EMAIL_LAYOUT_PATH,
	EVENTS_PATH,
	HOME_PATH,
	SETTINGS_PATH
} from '@/routes/constants.ts';
import { PrivateRoutesGuard } from '@/components';
import { ErrorPage } from '@/pages';
import {
	EmailLayoutPageContainer,
	EventsPageContainer,
	SettingsPageContainer,
	UploadPageContainer
} from '@/containers';

const privateRoutes = [
	{
		path: HOME_PATH,
		element: <PrivateRoutesGuard />,
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

export default privateRoutes;
