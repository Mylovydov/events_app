import { homeRoutes, loginRoute } from 'src/routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const AppRouterProvider = () => {
	return (
		<RouterProvider router={createBrowserRouter([loginRoute, homeRoutes])} />
	);
};

export default AppRouterProvider;
