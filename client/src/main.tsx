import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import appRouter from '@/router/app.router.tsx';
import 'normalize.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faArrowRightFromBracket,
	faBell,
	faCalendarDays,
	faFileCsv,
	faGear,
	faHouse,
	faRectangleList,
	faUser
} from '@fortawesome/free-solid-svg-icons';

import { Provider } from 'react-redux';
import { store } from '@/store';

library.add(
	faUser,
	faBell,
	faCalendarDays,
	faRectangleList,
	faGear,
	faArrowRightFromBracket,
	faHouse,
	faFileCsv
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={appRouter} />
		</Provider>
	</React.StrictMode>
);
