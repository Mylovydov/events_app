import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
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
import MainProvider from './providers/main/Main.provider.tsx';

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
		<MainProvider />
	</React.StrictMode>
);
