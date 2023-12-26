import { LOGIN_PATH } from '@/routes/constants.ts';
import { ErrorPage } from '@/pages';
import { LoginPageContainer } from '@/containers';

const publicRoutes = [
	{
		path: LOGIN_PATH,
		element: <LoginPageContainer />,
		errorElement: <ErrorPage />
	}
];

export default publicRoutes;
