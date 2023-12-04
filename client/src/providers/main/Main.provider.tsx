import { Provider } from 'react-redux';
import { store } from '@/store';
import { RouterProvider } from 'react-router-dom';
import { useMemo } from 'react';
import { SnackbarProviderProps } from 'notistack';
import { NotifyProvider } from '@/providers';
import { appRouter } from '@/router';

const MainProvider = () => {
	const notifyOpt = useMemo(
		(): SnackbarProviderProps => ({
			maxSnack: 3,
			autoHideDuration: 3000,
			preventDuplicate: true,
			anchorOrigin: {
				vertical: 'top',
				horizontal: 'center'
			},
			style: {
				fontSize: '1.6rem',
				fontWeight: 600
			}
		}),
		[]
	);

	return (
		<NotifyProvider {...notifyOpt}>
			<Provider store={store}>
				<RouterProvider router={appRouter} />
			</Provider>
		</NotifyProvider>
	);
};

export default MainProvider;
